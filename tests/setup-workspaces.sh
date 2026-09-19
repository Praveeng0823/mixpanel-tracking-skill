#!/usr/bin/env bash
# Builds two ready-to-open folders for every test case:
#   <case>--WITHOUT-skill  (plain sample app, no skill)
#   <case>--WITH-skill     (same app, with the mixpanel-tracking skill installed)
# Usage: bash tests/setup-workspaces.sh [output_folder]
# Default output folder: ~/Documents/mixpanel-skill-tests
#
# Where the skill is installed inside each WITH-skill folder (default: .claude/skills):
#   Claude Code:  bash tests/setup-workspaces.sh
#   Cursor:       SKILL_DIR=.cursor/skills bash tests/setup-workspaces.sh
#   Codex:        SKILL_DIR=.agents/skills bash tests/setup-workspaces.sh
set -eu
HERE="$(cd "$(dirname "$0")" && pwd)"
OUT="${1:-$HOME/Documents/mixpanel-skill-tests}"
SKILL="$HERE/../skills/mixpanel-tracking"
SKILL_DIR="${SKILL_DIR:-.claude/skills}"

mkdir -p "$OUT"
for case_dir in "$HERE"/fixtures/*/; do
  name="$(basename "$case_dir")"
  for variant in WITHOUT WITH; do
    target="$OUT/$name--$variant-skill"
    rm -rf "$target"
    cp -R "$case_dir" "$target"
    if [ "$variant" = "WITH" ]; then
      mkdir -p "$target/$SKILL_DIR"
      cp -R "$SKILL" "$target/$SKILL_DIR/mixpanel-tracking"
    fi
    (
      cd "$target"
      git init -q
      git add -A
      git -c user.name=test -c user.email=test@example.com commit -q -m "starting point"
    )
  done
done
echo "Ready. Folders are in: $OUT"
ls "$OUT"
