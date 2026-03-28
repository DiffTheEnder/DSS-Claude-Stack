#!/usr/bin/env bash
# check-snapshot-freshness.sh
# Compares context snapshot modification times against their raw source files.
# Warns if any snapshot is older than its sources, suggesting a rebuild.
# Exits 0 always (advisory only — not a blocking check).

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

CONTEXT_DIR="$PROJECT_ROOT/context"

if [ ! -d "$CONTEXT_DIR" ]; then
  echo "No context/ directory found — snapshots not enabled."
  exit 0
fi

echo "=== Snapshot Freshness Check ==="
echo ""

STALE_COUNT=0

# Map each snapshot to its primary source directories/files
check_freshness() {
  local snapshot="$1"
  shift
  local sources=("$@")

  if [ ! -f "$snapshot" ]; then
    return
  fi

  local snapshot_mtime
  snapshot_mtime=$(stat -f %m "$snapshot" 2>/dev/null || stat -c %Y "$snapshot" 2>/dev/null || echo 0)
  local snapshot_name
  snapshot_name=$(basename "$snapshot")

  for source in "${sources[@]}"; do
    local full_source="$PROJECT_ROOT/$source"
    if [ -d "$full_source" ]; then
      # Check all files in directory
      while IFS= read -r file; do
        local file_mtime
        file_mtime=$(stat -f %m "$file" 2>/dev/null || stat -c %Y "$file" 2>/dev/null || echo 0)
        if [ "$file_mtime" -gt "$snapshot_mtime" ]; then
          echo "  STALE: $snapshot_name is older than $source"
          STALE_COUNT=$((STALE_COUNT + 1))
          return
        fi
      done < <(find "$full_source" -name "*.md" -not -path "*/node_modules/*" 2>/dev/null)
    elif [ -f "$full_source" ]; then
      local file_mtime
      file_mtime=$(stat -f %m "$full_source" 2>/dev/null || stat -c %Y "$full_source" 2>/dev/null || echo 0)
      if [ "$file_mtime" -gt "$snapshot_mtime" ]; then
        echo "  STALE: $snapshot_name is older than $source"
        STALE_COUNT=$((STALE_COUNT + 1))
        return
      fi
    fi
  done

  echo "  FRESH: $snapshot_name"
}

check_freshness "$CONTEXT_DIR/project-state.md" \
  "docs/executive-summary.md" "memory/MEMORY.md" "memory/decisions.md"

check_freshness "$CONTEXT_DIR/competitor-snapshot.md" \
  "memory/research.md" "research/competitors"

check_freshness "$CONTEXT_DIR/market-snapshot.md" \
  "memory/research.md" "research/market"

check_freshness "$CONTEXT_DIR/pipeline-state.md" \
  "memory/discovery.md" "data/entities.csv"

echo ""
if [ "$STALE_COUNT" -gt 0 ]; then
  echo "WARNING: $STALE_COUNT snapshot(s) may be stale. Run /rebuild-snapshots to refresh."
else
  echo "All snapshots are up to date."
fi

exit 0
