#!/usr/bin/env bash
# validate-placeholders.sh
# Scans the project for unreplaced {{PLACEHOLDER}} tokens.
# Exits 0 if none found, 1 if any remain.
# Uses Australian English throughout.

set -euo pipefail

# Determine the project root (one level up from scripts/)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# If a directory argument is provided, search only that path
SEARCH_PATH="${1:-$PROJECT_ROOT}"

echo "=== Placeholder Validation ==="
echo "Searching: $SEARCH_PATH"
echo ""

# Find all matching files, excluding node_modules and .git
MATCHES=$(grep -rn '{{[A-Z_]*}}' \
  --include="*.md" \
  --include="*.js" \
  --include="*.html" \
  --include="*.json" \
  "$SEARCH_PATH" 2>/dev/null \
  | grep -v 'node_modules' \
  | grep -v '\.git/' \
  | grep -v 'project.config.example.json' \
  || true)

if [ -z "$MATCHES" ]; then
  echo "No unreplaced placeholders found. All clear."
  exit 0
fi

# Count the total number of placeholder occurrences
TOTAL=$(echo "$MATCHES" | wc -l | tr -d ' ')

echo "Found $TOTAL unreplaced placeholder(s):"
echo ""
echo "$MATCHES"
echo ""
echo "FAIL: $TOTAL placeholder(s) still need replacing."
echo "Run /onboard or manually replace each {{PLACEHOLDER}} with the correct value."

exit 1
