#!/usr/bin/env bash
# Verify agent folder ↔ command file parity.
# Exits non-zero on missing or orphan commands.

set -euo pipefail

AGENTS_DIR="docs/8. agents"
COMMANDS_DIR=".cursor/commands"
EXCLUDE_DIRS=("template" "_skills")
FRAMEWORK_OWNED=("specs-planner")

missing=()
orphans=()

is_excluded() {
  local name="$1"
  for d in "${EXCLUDE_DIRS[@]}"; do
    [[ "$name" == "$d" ]] && return 0
  done
  for d in "${FRAMEWORK_OWNED[@]}"; do
    [[ "$name" == "$d" ]] && return 0
  done
  return 1
}

# Check each agent folder has a command
for dir in "$AGENTS_DIR"/*/; do
  name=$(basename "$dir")
  is_excluded "$name" && continue
  if [[ ! -f "$COMMANDS_DIR/$name.md" ]]; then
    missing+=("$name")
  fi
done

# Check each command has an agent folder (excluding specsmd-agent)
for cmd in "$COMMANDS_DIR"/*.md; do
  name=$(basename "$cmd" .md)
  [[ "$name" == "specsmd-agent" ]] && continue
  if is_excluded "$name"; then
    continue
  fi
  if [[ ! -d "$AGENTS_DIR/$name" ]]; then
    orphans+=("$name")
  fi
done

if [[ ${#missing[@]} -gt 0 ]]; then
  echo "Missing commands (agent folder exists, no command file):"
  printf '  - %s → expected %s/%s.md\n' "${missing[@]}" "$COMMANDS_DIR" "${missing[@]}"
fi

if [[ ${#orphans[@]} -gt 0 ]]; then
  echo "Orphan commands (command file exists, no agent folder):"
  printf '  - %s\n' "${orphans[@]}"
fi

if [[ ${#missing[@]} -gt 0 || ${#orphans[@]} -gt 0 ]]; then
  exit 1
fi

echo "OK: all agent commands in parity (framework-owned agents excluded)."
