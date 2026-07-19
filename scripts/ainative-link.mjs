#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  readlinkSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const AGENT_ALERT_HOOK = "./hooks/agent-alert.sh";
const GLOBAL_HOOK_ENTRIES = {
  stop: [{ command: `${AGENT_ALERT_HOOK} stop`, timeout: 5 }],
  preToolUse: [
    {
      command: `${AGENT_ALERT_HOOK} ask`,
      matcher: "^(AskQuestion|SwitchMode)$",
      timeout: 5,
    },
  ],
};

const GITIGNORE_MARKER = "# Personal AiNative symlinks (machine-local)";
const GITIGNORE_BLOCK = `
${GITIGNORE_MARKER}
.cursor/rules/personal
docs/8. agents
docs/2. ai-workflows
`;

const scriptDir = path.dirname(fileURLToPath(import.meta.url));

function usage() {
  console.log(`Usage:
  ainative-link machine [--ainative-home <path>]
  ainative-link project [DIR] [--ainative-home <path>] [--force-workflows]
  ainative-link status [DIR] [--ainative-home <path>]

Requires AINATIVE_HOME (env var, --ainative-home, or inferred when run from AiNative).`);
}

function parseArgs(argv) {
  const positional = [];
  let ainativeHome = process.env.AINATIVE_HOME ?? "";
  let forceWorkflows = false;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--ainative-home") {
      ainativeHome = argv[i + 1] ?? "";
      i += 1;
      continue;
    }
    if (arg === "--force-workflows") {
      forceWorkflows = true;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      usage();
      process.exit(0);
    }
    positional.push(arg);
  }

  return { positional, ainativeHome, forceWorkflows };
}

function inferAinativeHome() {
  const candidate = path.resolve(scriptDir, "..");
  if (existsSync(path.join(candidate, "docs/8. agents"))) {
    return candidate;
  }
  return "";
}

function resolveAinativeHome(explicit) {
  const home = explicit || inferAinativeHome();
  if (!home) {
    console.error("error: AINATIVE_HOME is not set and could not be inferred");
    process.exit(1);
  }
  if (!existsSync(home)) {
    console.error(`error: AINATIVE_HOME not found: ${home}`);
    process.exit(1);
  }
  return path.resolve(home);
}

function ensureDir(dir) {
  mkdirSync(dir, { recursive: true });
}

function forceSymlink(target, linkPath) {
  const absoluteTarget = path.resolve(target);
  try {
    const stat = lstatSync(linkPath);
    if (stat.isSymbolicLink() || stat.isFile() || stat.isDirectory()) {
      rmSync(linkPath, { recursive: true, force: true });
    }
  } catch (err) {
    if (err && typeof err === "object" && "code" in err && err.code !== "ENOENT") {
      throw err;
    }
  }
  symlinkSync(absoluteTarget, linkPath);
}

function readGitCommit(ainativeHome) {
  try {
    return execFileSync("git", ["log", "-1", "--format=%h %s"], {
      cwd: ainativeHome,
      encoding: "utf8",
    }).trim();
  } catch {
    return "unknown";
  }
}

function hookUsesAgentAlert(entry) {
  return typeof entry?.command === "string" && entry.command.includes("agent-alert.sh");
}

function mergeGlobalHooks(existingHooks) {
  const merged = { ...(existingHooks ?? {}) };

  for (const [event, entries] of Object.entries(GLOBAL_HOOK_ENTRIES)) {
    const current = Array.isArray(merged[event]) ? [...merged[event]] : [];
    if (!current.some(hookUsesAgentAlert)) {
      current.push(...entries);
    }
    merged[event] = current;
  }

  return merged;
}

function linkMachineHooks(ainativeHome) {
  const scriptSource = path.join(ainativeHome, ".cursor", "hooks", "agent-alert.sh");
  const hooksDir = path.join(homedir(), ".cursor", "hooks");
  const hooksJsonPath = path.join(homedir(), ".cursor", "hooks.json");

  if (!existsSync(scriptSource)) {
    console.error(`error: hook script not found: ${scriptSource}`);
    process.exit(1);
  }

  ensureDir(hooksDir);
  forceSymlink(scriptSource, path.join(hooksDir, "agent-alert.sh"));

  let hooksConfig = { version: 1, hooks: {} };
  if (existsSync(hooksJsonPath)) {
    try {
      hooksConfig = JSON.parse(readFileSync(hooksJsonPath, "utf8"));
    } catch (err) {
      console.error(`error: could not parse ${hooksJsonPath}`);
      throw err;
    }
  }

  hooksConfig.version = hooksConfig.version ?? 1;
  hooksConfig.hooks = mergeGlobalHooks(hooksConfig.hooks);
  writeFileSync(hooksJsonPath, `${JSON.stringify(hooksConfig, null, 2)}\n`, "utf8");

  console.log(`Linked agent alert hook → ${hooksDir}`);
  console.log(`Updated global hooks → ${hooksJsonPath}`);
}

function countGlobalCommands() {
  const globalCommandsDir = path.join(homedir(), ".cursor", "commands");
  if (!existsSync(globalCommandsDir)) {
    return 0;
  }
  return readdirSync(globalCommandsDir).filter((name) => {
    const fullPath = path.join(globalCommandsDir, name);
    try {
      return name.endsWith(".md") && lstatSync(fullPath).isSymbolicLink();
    } catch {
      return false;
    }
  }).length;
}

function ensureGitignore(projectRoot) {
  const gitignorePath = path.join(projectRoot, ".gitignore");
  const existing = existsSync(gitignorePath) ? readFileSync(gitignorePath, "utf8") : "";

  if (existing.includes(GITIGNORE_MARKER)) {
    return false;
  }

  const separator = existing.length > 0 && !existing.endsWith("\n") ? "\n" : "";
  writeFileSync(gitignorePath, `${existing}${separator}${GITIGNORE_BLOCK.trimStart()}\n`, "utf8");
  return true;
}

function isGitRepo(projectRoot) {
  return existsSync(path.join(projectRoot, ".git"));
}

function showStatus(projectRoot, ainativeHome) {
  const commit = readGitCommit(ainativeHome);
  console.log(`AiNative: ${commit}`);

  const rulesLink = path.join(projectRoot, ".cursor", "rules", "personal");
  const agentsLink = path.join(projectRoot, "docs", "8. agents");

  if (existsSync(rulesLink) && lstatSync(rulesLink).isSymbolicLink()) {
    console.log(`  rules:    .cursor/rules/personal → ${readlinkSync(rulesLink)}`);
  } else if (isGitRepo(projectRoot)) {
    console.log("  rules:    missing — run: node $AINATIVE_HOME/scripts/ainative-link.mjs project");
  }

  if (existsSync(agentsLink) && lstatSync(agentsLink).isSymbolicLink()) {
    console.log(`  agents:   docs/8. agents → ${readlinkSync(agentsLink)}`);
  } else if (isGitRepo(projectRoot)) {
    console.log("  agents:   missing — run: node $AINATIVE_HOME/scripts/ainative-link.mjs project");
  }

  const hooksJsonPath = path.join(homedir(), ".cursor", "hooks.json");
  const hookScriptPath = path.join(homedir(), ".cursor", "hooks", "agent-alert.sh");

  console.log(`  commands: ${countGlobalCommands()} global (in ~/.cursor/commands/)`);

  if (existsSync(hookScriptPath) && lstatSync(hookScriptPath).isSymbolicLink()) {
    console.log(`  hooks:    ~/.cursor/hooks/agent-alert.sh → ${readlinkSync(hookScriptPath)}`);
  } else if (existsSync(hookScriptPath)) {
    console.log(`  hooks:    ~/.cursor/hooks/agent-alert.sh (present)`);
  } else {
    console.log("  hooks:    missing — run: node $AINATIVE_HOME/scripts/ainative-link.mjs machine");
  }

  if (existsSync(hooksJsonPath)) {
    try {
      const hooksConfig = JSON.parse(readFileSync(hooksJsonPath, "utf8"));
      const events = Object.entries(hooksConfig.hooks ?? {}).filter(([, entries]) =>
        Array.isArray(entries) && entries.some(hookUsesAgentAlert),
      );
      if (events.length > 0) {
        console.log(`  alerts:   ${events.map(([name]) => name).join(", ")}`);
      }
    } catch {
      console.log("  alerts:   ~/.cursor/hooks.json present (could not parse)");
    }
  }
}

function linkMachine(ainativeHome) {
  const commandsSource = path.join(ainativeHome, ".cursor", "commands");
  const commandsTarget = path.join(homedir(), ".cursor", "commands");

  if (!existsSync(commandsSource)) {
    console.error(`error: commands directory not found: ${commandsSource}`);
    process.exit(1);
  }

  ensureDir(commandsTarget);

  const files = readdirSync(commandsSource).filter((name) => name.endsWith(".md"));
  for (const name of files) {
    forceSymlink(path.join(commandsSource, name), path.join(commandsTarget, name));
  }

  console.log(`Linked ${files.length} global commands → ${commandsTarget}`);
  linkMachineHooks(ainativeHome);
}

function linkProject(projectRoot, ainativeHome, forceWorkflows) {
  const resolvedRoot = path.resolve(projectRoot);
  ensureDir(path.join(resolvedRoot, ".cursor", "rules"));
  ensureDir(path.join(resolvedRoot, "docs"));

  const aiRulesTarget = path.join(resolvedRoot, ".cursor", "rules", "ai-rules.mdc");
  const aiRulesTemplate = path.join(
    ainativeHome,
    "docs/2. ai-workflows/ai-rules-template.md",
  );

  if (!existsSync(aiRulesTarget)) {
    if (!existsSync(aiRulesTemplate)) {
      console.error(`error: template not found: ${aiRulesTemplate}`);
      process.exit(1);
    }
    copyFileSync(aiRulesTemplate, aiRulesTarget);
    console.log("Created .cursor/rules/ai-rules.mdc (edit for this project)");
  } else {
    console.log("Kept existing .cursor/rules/ai-rules.mdc");
  }

  forceSymlink(
    path.join(ainativeHome, ".cursor", "rules"),
    path.join(resolvedRoot, ".cursor", "rules", "personal"),
  );
  forceSymlink(
    path.join(ainativeHome, "docs", "8. agents"),
    path.join(resolvedRoot, "docs", "8. agents"),
  );

  const workflowsLink = path.join(resolvedRoot, "docs", "2. ai-workflows");
  const workflowsSource = path.join(ainativeHome, "docs", "2. ai-workflows");

  if (existsSync(workflowsLink) && !lstatSync(workflowsLink).isSymbolicLink()) {
    if (forceWorkflows) {
      rmSync(workflowsLink, { recursive: true, force: true });
      forceSymlink(workflowsSource, workflowsLink);
      console.log("Replaced docs/2. ai-workflows with symlink (--force-workflows)");
    } else {
      console.warn(
        "warn: docs/2. ai-workflows exists as a real folder — skipped (use --force-workflows to replace)",
      );
    }
  } else {
    forceSymlink(workflowsSource, workflowsLink);
  }

  if (ensureGitignore(resolvedRoot)) {
    console.log("Updated .gitignore");
  }

  showStatus(resolvedRoot, ainativeHome);
}

function main() {
  const { positional, ainativeHome: explicitHome, forceWorkflows } = parseArgs(
    process.argv.slice(2),
  );
  const command = positional[0];

  if (!command) {
    usage();
    process.exit(1);
  }

  const ainativeHome = resolveAinativeHome(explicitHome);
  const targetDir = positional[1] ? path.resolve(positional[1]) : process.cwd();

  switch (command) {
    case "machine":
      linkMachine(ainativeHome);
      break;
    case "project":
      linkProject(targetDir, ainativeHome, forceWorkflows);
      break;
    case "status":
      showStatus(targetDir, ainativeHome);
      break;
    default:
      usage();
      process.exit(1);
  }
}

main();
