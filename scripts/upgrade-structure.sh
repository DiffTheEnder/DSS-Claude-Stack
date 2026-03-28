#!/usr/bin/env bash
# upgrade-structure.sh
# Upgrades a Minimal or Essentials project to Full by adding missing directories
# and enabling disabled modules. Run from the project root.
#
# Usage: bash scripts/upgrade-structure.sh [full|essentials]

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
TARGET="${1:-full}"

echo "=== Structure Upgrade ==="
echo "Upgrading to: $TARGET"
echo "Project root: $PROJECT_ROOT"
echo ""

ensure_dir() {
  local dir="$PROJECT_ROOT/$1"
  if [ ! -d "$dir" ]; then
    mkdir -p "$dir"
    # Add .gitkeep so empty dirs are tracked
    touch "$dir/.gitkeep"
    echo "  + Created $1/"
  else
    echo "  . $1/ already exists"
  fi
}

ensure_file() {
  local file="$PROJECT_ROOT/$1"
  local content="$2"
  if [ ! -f "$file" ]; then
    echo "$content" > "$file"
    echo "  + Created $1"
  else
    echo "  . $1 already exists"
  fi
}

# Common directories needed for Essentials and Full
echo "--- Core directories ---"
ensure_dir "research/competitors"
ensure_dir "research/market"
ensure_dir "research/technical"
ensure_dir "docs/memos"
ensure_dir "docs/output"
ensure_dir "docs/decks"
ensure_dir "data"

if [ "$TARGET" = "essentials" ] || [ "$TARGET" = "full" ]; then
  echo ""
  echo "--- Essentials modules ---"
  ensure_dir "discovery/calls"
  ensure_dir "discovery/prep"
  ensure_dir "discovery/outreach"
  ensure_dir "context"

  ensure_file "memory/discovery.md" "# Discovery Log

## Call Log

| Date | Entity | Key Takeaways |
|------|--------|---------------|

## Pain Points Heard

## WTP Signals
"

  ensure_file "context/project-state.md" "# Project State Snapshot

_Run /rebuild-snapshots to populate this file._
"
  ensure_file "context/competitor-snapshot.md" "# Competitor Snapshot

_Run /rebuild-snapshots to populate this file._
"
  ensure_file "context/market-snapshot.md" "# Market Snapshot

_Run /rebuild-snapshots to populate this file._
"
  ensure_file "context/pipeline-state.md" "# Pipeline State Snapshot

_Run /rebuild-snapshots to populate this file._
"
fi

if [ "$TARGET" = "full" ]; then
  echo ""
  echo "--- Full modules ---"

  ensure_file "memory/scoring.md" "# Scoring Matrix

## Options

| Option | Description |
|--------|-------------|

## Scoring Matrix

| Option | Dim 1 | Dim 2 | Dim 3 | Dim 4 | Dim 5 | Total |
|--------|-------|-------|-------|-------|-------|-------|

## Recommended Strategy

**Option**: TBD
**Rationale**: TBD
**Risks**: TBD
**Fallback**: TBD
"

  ensure_file "data/entities.csv" "name,slug,status,tier,category,last_contact,next_action,channel,notes"
fi

echo ""
echo "Done. Update project.config.json to enable the modules you've added,"
echo "then run /health-check to verify project integrity."
