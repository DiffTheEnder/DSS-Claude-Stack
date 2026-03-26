#!/usr/bin/env bash
# reset-to-template.sh
# Strips project-specific data and restores the template to a clean state.
# WARNING: This is destructive — all research, discovery, and dashboard data will be deleted.
# Uses Australian English throughout.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "============================================="
echo "  TEMPLATE RESET — DESTRUCTIVE OPERATION"
echo "============================================="
echo ""
echo "This will permanently delete:"
echo "  - All files in research/competitors/, research/market/, research/technical/"
echo "  - All files in discovery/calls/, discovery/prep/, discovery/outreach/"
echo "  - data/entities.csv"
echo "  - All files in dashboard/data/ (generated JSON)"
echo "  - project.config.json"
echo "  - docs/output/weekly-report-*.md"
echo ""
echo "This action CANNOT be undone (unless you have a git history to revert to)."
echo ""

read -p "Are you sure you want to proceed? Type 'yes' to confirm: " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
  echo ""
  echo "Aborted. No files were deleted."
  exit 0
fi

echo ""
echo "Resetting project..."
DELETED_COUNT=0

# Helper: remove all files in a directory except .gitkeep
clean_directory() {
  local dir="$1"
  if [ -d "$dir" ]; then
    local files
    files=$(find "$dir" -type f -not -name ".gitkeep" 2>/dev/null || true)
    if [ -n "$files" ]; then
      echo "$files" | while read -r f; do
        echo "  Deleted: ${f#$PROJECT_ROOT/}"
        rm -f "$f"
      done
      # Ensure .gitkeep exists so the directory is preserved in git
      touch "$dir/.gitkeep"
    fi
  fi
}

# Research directories
echo ""
echo "--- Cleaning research/ ---"
clean_directory "$PROJECT_ROOT/research/competitors"
clean_directory "$PROJECT_ROOT/research/market"
clean_directory "$PROJECT_ROOT/research/technical"

# Discovery directories
echo ""
echo "--- Cleaning discovery/ ---"
clean_directory "$PROJECT_ROOT/discovery/calls"
clean_directory "$PROJECT_ROOT/discovery/prep"
clean_directory "$PROJECT_ROOT/discovery/outreach"

# Data directory
echo ""
echo "--- Cleaning data/ ---"
if [ -f "$PROJECT_ROOT/data/entities.csv" ]; then
  echo "  Deleted: data/entities.csv"
  rm -f "$PROJECT_ROOT/data/entities.csv"
fi

# Dashboard data
echo ""
echo "--- Cleaning dashboard/data/ ---"
clean_directory "$PROJECT_ROOT/dashboard/data"

# Project config
echo ""
echo "--- Removing project.config.json ---"
if [ -f "$PROJECT_ROOT/project.config.json" ]; then
  echo "  Deleted: project.config.json"
  rm -f "$PROJECT_ROOT/project.config.json"
else
  echo "  (not present, skipping)"
fi

# Weekly reports
echo ""
echo "--- Removing weekly reports ---"
REPORTS=$(find "$PROJECT_ROOT/docs/output" -name "weekly-report-*.md" 2>/dev/null || true)
if [ -n "$REPORTS" ]; then
  echo "$REPORTS" | while read -r f; do
    echo "  Deleted: ${f#$PROJECT_ROOT/}"
    rm -f "$f"
  done
else
  echo "  (none found, skipping)"
fi

echo ""
echo "============================================="
echo "  Reset Complete"
echo "============================================="
echo ""
echo "NOTE: Template placeholder values (e.g. {{PROJECT_NAME}}) have NOT been"
echo "restored in markdown files. For a fully clean template, re-clone the"
echo "repository from the original source."
echo ""
echo "Next step: Run /onboard to set up a new project."
