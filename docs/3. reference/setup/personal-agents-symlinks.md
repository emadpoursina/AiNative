# Personal agents via symlinks

Use one canonical AiNative checkout on your machine (`$AINATIVE_HOME`). **Commands** live globally in `~/.cursor/commands/` (set once). Each app project symlinks **rules and agent docs** from AiNative — no submodules, no per-project bump commits, no drift.

## What this solves

- One place to improve agents and rules; every project sees updates immediately
- Slash commands (`/critic`, `/tester`, `/pr-reviewer`, etc.) available in every project without per-repo setup
- Personal AI layer stays out of the project git history (symlinks are gitignored)
- No `git submodule update`, detached HEAD, or dirty submodule status

## Layout

```
~/Projects/playground/AiNative/          ← canonical checkout (edit + push here)
├── .cursor/rules/                       ← shared rules (engineering-os, piv-gate, Commit-style)
├── .cursor/commands/                    ← agent command sources
└── docs/8. agents/                      ← agent definitions (loaded by commands)

~/.cursor/commands/                      ← global commands (symlink once per machine)
├── critic.md → AINATIVE_HOME/.cursor/commands/critic.md
└── …

~/projects/my-app/
├── .cursor/rules/
│   ├── ai-rules.mdc                     ← project-specific (committed)
│   └── personal → AINATIVE_HOME/.cursor/rules   ← symlink (gitignored)
└── docs/
    ├── 8. agents → AINATIVE_HOME/docs/8. agents       ← symlink (gitignored)
    └── 2. ai-workflows → AINATIVE_HOME/docs/2. ai-workflows   ← if needed
```

Project-specific `ai-rules.mdc` stays at `.cursor/rules/ai-rules.mdc` (committed). Shared OS rules load from `.cursor/rules/personal/` via symlink. Commands reference project-relative paths (`docs/8. agents/...`), so each project still needs those doc symlinks.

---

## One-time machine setup

### 1. Set `AINATIVE_HOME`

Add to `~/.zshrc` (or `~/.bashrc`):

```bash
export AINATIVE_HOME="$HOME/Projects/playground/AiNative"
```

Adjust the path to wherever you keep the canonical checkout. Reload: `source ~/.zshrc`.

### 2. Clone AiNative (if you have not already)

```bash
git clone <your-ainative-remote> "$AINATIVE_HOME"
```

### 3. Symlink agent commands and global hooks

Set up once — commands and the agent alert hook are then available in every project:

```bash
node "$AINATIVE_HOME/scripts/ainative-link.mjs" machine
```

This also symlinks `~/.cursor/hooks/agent-alert.sh` and merges alert hook entries into `~/.cursor/hooks.json` (plays a sound when the agent finishes or needs your input). See [cursor-setup.md](./cursor-setup.md#global-agent-alert-hook).

Manual equivalent:

```bash
mkdir -p ~/.cursor/commands
for f in "$AINATIVE_HOME/.cursor/commands/"*.md; do
  ln -sf "$f" "$HOME/.cursor/commands/$(basename "$f")"
done
mkdir -p ~/.cursor/hooks
ln -sf "$AINATIVE_HOME/.cursor/hooks/agent-alert.sh" ~/.cursor/hooks/agent-alert.sh
```

After you add a new agent command in AiNative, re-run `machine` (or symlink the single new file).

**Note:** `~/.cursor/commands/` is the documented global location. If Cursor does not list them (known issue on some SSH setups), symlink commands into the project `.cursor/commands/` as a fallback — see [Troubleshooting](#troubleshooting).

### 4. Optional: `agents` status helper

Add to the same shell config:

```bash
agents() {
  local rules_link=".cursor/rules/personal"
  local agents_link="docs/8. agents"
  local global_cmds="$HOME/.cursor/commands"

  if [ ! -d "$AINATIVE_HOME" ]; then
    echo "AINATIVE_HOME not found: $AINATIVE_HOME"
    return 1
  fi

  local commit
  commit=$(cd "$AINATIVE_HOME" && git log -1 --format="%h %s" 2>/dev/null)
  echo "AiNative: $commit"

  if [ -L "$rules_link" ]; then
    echo "  rules:    $rules_link → $(readlink "$rules_link")"
  elif [ -f ".git" ] || [ -d ".git" ]; then
    echo "  rules:    missing — run new-project symlink steps"
  fi

  if [ -L "$agents_link" ]; then
    echo "  agents:   $agents_link → $(readlink "$agents_link")"
  elif [ -f ".git" ] || [ -d ".git" ]; then
    echo "  agents:   missing — run new-project symlink steps"
  fi

  local cmd_count
  cmd_count=$(find "$global_cmds" -maxdepth 1 -type l -name '*.md' 2>/dev/null | wc -l | tr -d ' ')
  echo "  commands: ${cmd_count} global (in ~/.cursor/commands/)"
}
```

Run `agents` from any project root to confirm project symlinks and see the loaded AiNative commit.

---

## New project setup

Run from the **project root** after `git init` (or anytime you add agents to an existing repo). Assumes [one-time machine setup](#one-time-machine-setup) is done.

**Automated (recommended):**

```bash
node "$AINATIVE_HOME/scripts/ainative-link.mjs" project
# or from another directory:
node "$AINATIVE_HOME/scripts/ainative-link.mjs" project ~/projects/my-app
```

Then edit `.cursor/rules/ai-rules.mdc` for the project. Use `status` to verify:

```bash
node "$AINATIVE_HOME/scripts/ainative-link.mjs" status
```

Manual steps below if you prefer not to use the script.

### 1. Project-specific rules

```bash
mkdir -p .cursor/rules
cp "$AINATIVE_HOME/docs/2. ai-workflows/ai-rules-template.md" .cursor/rules/ai-rules.mdc
# Fill in stack, context, and out-of-scope items for this project
```

Also copy or symlink `piv-gate.mdc` if the project uses PIV — see [new-project.md](./new-project.md#agent-setup).

### 2. Symlink shared rules

```bash
ln -sf "$AINATIVE_HOME/.cursor/rules" .cursor/rules/personal
```

### 3. Symlink agent docs (required by commands)

Commands load `docs/8. agents/<agent>/agent.md`. Symlink the agents tree:

```bash
mkdir -p docs
ln -sf "$AINATIVE_HOME/docs/8. agents" "docs/8. agents"
```

Agent rules cross-reference `docs/2. ai-workflows/` — symlink that folder too if you use critic, tester, or specs-planner:

```bash
ln -sf "$AINATIVE_HOME/docs/2. ai-workflows" "docs/2. ai-workflows"
```

If the project already has its own `docs/2. ai-workflows/`, symlink only the files agents need instead of the whole folder.

### 4. Gitignore personal symlinks

Add to `.gitignore`:

```gitignore
# Personal AiNative symlinks (machine-local)
.cursor/rules/personal
docs/8. agents
docs/2. ai-workflows
```

### 5. Verify

```bash
node "$AINATIVE_HOME/scripts/ainative-link.mjs" status
# or: agents   (shell helper below)
ls -la .cursor/rules/personal docs/8.\ agents
```

Open the project in Cursor and run `/critic` or `/tester` to confirm commands resolve agent files.

### One-liner (after machine setup)

```bash
mkdir -p .cursor/rules docs && \
cp "$AINATIVE_HOME/docs/2. ai-workflows/ai-rules-template.md" .cursor/rules/ai-rules.mdc && \
ln -sf "$AINATIVE_HOME/.cursor/rules" .cursor/rules/personal && \
ln -sf "$AINATIVE_HOME/docs/8. agents" "docs/8. agents" && \
ln -sf "$AINATIVE_HOME/docs/2. ai-workflows" "docs/2. ai-workflows"
```

Then add the gitignore entries and fill in `ai-rules.mdc`.

---

## Day-to-day workflow

### Improve an agent or shared rule

```bash
cd "$AINATIVE_HOME"
# edit .cursor/rules/*.mdc, docs/8. agents/*, or .cursor/commands/*
git add -A && git commit -m "fix: …" && git push
```

Global commands and project symlinks pick up the change on the next Cursor session — no pull or bump commit in app repos. Re-run the [global commands loop](#3-symlink-agent-commands-globally) if you added a new command file.

### Start work in a project

```bash
cd ~/projects/my-app
agents
```

Optional: `cd "$AINATIVE_HOME" && git pull` if you edited agents on another machine.

### New machine

1. Clone AiNative to the same path (or update `AINATIVE_HOME`)
2. Re-run [one-time machine setup](#one-time-machine-setup) (global commands)
3. Re-run [new project setup](#new-project-setup) symlink steps in each project

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `AINATIVE_HOME not found` | Set and export `AINATIVE_HOME` in shell config; `source ~/.zshrc` |
| `/critic` not in command list | Re-run global commands symlink loop; restart Cursor |
| Global commands not detected (SSH) | Fallback: symlink into project `.cursor/commands/` per file from `$AINATIVE_HOME/.cursor/commands/` |
| Command cannot find `docs/8. agents/...` | Run step 3 — symlink `docs/8. agents` (and `docs/2. ai-workflows` if needed) |
| Duplicate or conflicting rules | Keep only one `ai-rules.mdc` at `.cursor/rules/ai-rules.mdc`; shared rules live under `personal/` |
| Symlinks committed by mistake | Add gitignore entries from step 4; `git rm --cached` any tracked symlinks |
| `readlink` shows broken path | Re-run `ln -sf` with correct `$AINATIVE_HOME` |

---

## Why symlinks over submodules

| | Symlinks | Submodules |
|---|----------|------------|
| Per-project bump commits | No | Yes, on every agent change |
| Drift across projects | No — one checkout | Yes — each repo pins a SHA |
| Personal layer in git history | No (gitignored) | Yes (committed) |
| Travels with `git clone` | No — re-link per machine | Yes |
| Detached HEAD when updating | N/A | Common pitfall |

For a personal agents layer you improve often, symlinks are lower tax. Submodules fit when teammates must pin and inherit the same agent version via git.

---

## Related

- [cursor-setup.md](./cursor-setup.md) — MCP, indexing, global vs project commands
- [new-project.md](./new-project.md) — full bootstrap checklist
- [agents/README.md](../../8.%20agents/README.md) — agent catalog and commands
