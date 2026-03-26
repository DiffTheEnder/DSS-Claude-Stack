#!/usr/bin/env bash
# Reset the example project to empty state
# Removes all populated data from examples/ while preserving directory structure

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
EXAMPLES_DIR="$PROJECT_ROOT/examples"

if [ ! -d "$EXAMPLES_DIR" ]; then
  echo "No examples/ directory found. Nothing to reset."
  exit 0
fi

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║         RESET EXAMPLE PROJECT DATA               ║"
echo "╠══════════════════════════════════════════════════╣"
echo "║  This will delete all files in examples/         ║"
echo "║  Directory structure will be preserved.          ║"
echo "╚══════════════════════════════════════════════════╝"
echo ""

# Show what will be deleted
echo "Files to be deleted:"
find "$EXAMPLES_DIR" -type f ! -name ".gitkeep" | sort
echo ""

read -p "Type 'yes' to confirm: " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
  echo "Cancelled."
  exit 0
fi

echo ""
echo "Clearing example data..."

# Delete all files except .gitkeep
find "$EXAMPLES_DIR" -type f ! -name ".gitkeep" -delete

# Add .gitkeep to empty directories
find "$EXAMPLES_DIR" -type d -empty -exec touch {}/.gitkeep \;

echo ""
echo "Done. Example directories preserved with .gitkeep files."
echo "To restore the example, re-clone the repository or run: git checkout -- examples/"
