#!/usr/bin/env bash
# health-check.sh
# Lightweight CLI health check for the strategy project template.
# Mirrors the checks in skills/health-check/SKILL.md.
# Uses Australian English throughout.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

PASSES=0
WARNS=0
FAILS=0

pass() {
  echo "  [PASS] $1"
  PASSES=$((PASSES + 1))
}

warn() {
  echo "  [WARN] $1"
  WARNS=$((WARNS + 1))
}

fail() {
  echo "  [FAIL] $1"
  FAILS=$((FAILS + 1))
}

echo "=== Project Health Check ==="
echo "Project root: $PROJECT_ROOT"
echo ""

# -----------------------------------------------
# Check 1: Unreplaced placeholders
# -----------------------------------------------
echo "--- Check 1: Unreplaced Placeholders ---"
if "$SCRIPT_DIR/validate-placeholders.sh" > /dev/null 2>&1; then
  pass "No unreplaced placeholders found."
else
  fail "Unreplaced {{PLACEHOLDER}} tokens remain. Run: scripts/validate-placeholders.sh for details."
fi
echo ""

# -----------------------------------------------
# Check 2: project.config.json exists
# -----------------------------------------------
echo "--- Check 2: Project Configuration ---"
if [ -f "$PROJECT_ROOT/project.config.json" ]; then
  pass "project.config.json exists."
else
  warn "project.config.json is missing. Onboarding may be incomplete."
fi
echo ""

# -----------------------------------------------
# Check 3: Dashboard data freshness
# -----------------------------------------------
echo "--- Check 3: Dashboard Data Freshness ---"

# Helper: get file modification timestamp (cross-platform)
file_mtime() {
  if [[ "$(uname)" == "Darwin" ]]; then
    stat -f %m "$1" 2>/dev/null || echo 0
  else
    stat -c %Y "$1" 2>/dev/null || echo 0
  fi
}

STALE_COUNT=0
# Map source files to their corresponding dashboard JSON
declare -a SOURCES=("memory/research.md" "docs/executive-summary.md" "memory/MEMORY.md")
declare -a JSONS=("dashboard/data/competitors.json" "dashboard/data/overview.json" "dashboard/data/entities.json")

for i in "${!SOURCES[@]}"; do
  SRC="$PROJECT_ROOT/${SOURCES[$i]}"
  JSON="$PROJECT_ROOT/${JSONS[$i]}"

  if [ -f "$SRC" ] && [ -f "$JSON" ]; then
    SRC_TIME=$(file_mtime "$SRC")
    JSON_TIME=$(file_mtime "$JSON")
    if [ "$SRC_TIME" -gt "$JSON_TIME" ]; then
      warn "Dashboard data stale: ${SOURCES[$i]} is newer than ${JSONS[$i]}."
      STALE_COUNT=$((STALE_COUNT + 1))
    fi
  fi
done

if [ "$STALE_COUNT" -eq 0 ]; then
  pass "Dashboard data appears up to date (or source/JSON files not yet created)."
fi
echo ""

# -----------------------------------------------
# Check 4: Versioned files (_v2, _old, _backup)
# -----------------------------------------------
echo "--- Check 4: Versioned / Backup Files ---"
VERSIONED=$(find "$PROJECT_ROOT" \
  \( -name "*_v[0-9]*" -o -name "*_old*" -o -name "*_backup*" \) \
  -not -path "*/node_modules/*" \
  -not -path "*/.git/*" 2>/dev/null || true)

if [ -z "$VERSIONED" ]; then
  pass "No versioned or backup files found."
else
  VCOUNT=$(echo "$VERSIONED" | wc -l | tr -d ' ')
  warn "$VCOUNT versioned/backup file(s) found. Keep only the latest version."
  echo "$VERSIONED" | while read -r f; do echo "    -> $f"; done
fi
echo ""

# -----------------------------------------------
# Check 5: MEMORY.md line count
# -----------------------------------------------
echo "--- Check 5: MEMORY.md Size ---"
MEMORY_FILE="$PROJECT_ROOT/memory/MEMORY.md"
if [ -f "$MEMORY_FILE" ]; then
  LINE_COUNT=$(wc -l < "$MEMORY_FILE" | tr -d ' ')
  if [ "$LINE_COUNT" -gt 300 ]; then
    fail "MEMORY.md is $LINE_COUNT lines (limit 300). Must prune immediately."
  elif [ "$LINE_COUNT" -gt 200 ]; then
    warn "MEMORY.md is $LINE_COUNT lines (recommended limit 200). Consider pruning."
  else
    pass "MEMORY.md is $LINE_COUNT lines. Within acceptable range."
  fi
else
  warn "memory/MEMORY.md does not exist."
fi
echo ""

# -----------------------------------------------
# Summary
# -----------------------------------------------
echo "==========================================="
echo "  Health Check Summary"
echo "==========================================="
echo "  Passed : $PASSES"
echo "  Warnings: $WARNS"
echo "  Failures: $FAILS"
echo ""

if [ "$FAILS" -gt 0 ]; then
  echo "  Overall: FAIL — $FAILS critical issue(s) require attention."
  exit 1
elif [ "$WARNS" -gt 0 ]; then
  echo "  Overall: WARN — No critical issues, but $WARNS warning(s) to address."
  exit 0
else
  echo "  Overall: PASS — Project is healthy."
  exit 0
fi
