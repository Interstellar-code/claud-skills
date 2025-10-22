# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Generic Claude Code Framework** - A comprehensive, reusable framework for Claude Code that provides production-ready agents, commands, skills, and scripts designed to accelerate development across any project.

### Purpose
- Provide generic, project-agnostic Claude Code agents and utilities
- Enable rapid customization for specific project needs
- Share battle-tested development workflows
- Accelerate development through automation

### Key Technologies
- **TypeScript** - For high-performance scripts (ESLint, testing utilities)
- **Bash** - For cross-platform automation
- **Markdown** - For agent and documentation formats
- **Git** - Version control and change management

### Project Structure
```
claud-skills/
├── generic-claude-framework/  # Reusable framework (main export)
│   ├── agents/                # Generic Claude Code agents
│   ├── commands/              # Reusable slash commands
│   ├── scripts/               # Utility scripts
│   └── skills/                # Claude Code skills
│
├── examples/                  # Real-world implementations
│   ├── agents/                # Example agent configurations (SubsHero)
│   └── ...
│
├── docs/                      # Documentation
│   ├── AGENT_CATALOG.md       # Complete agent reference
│   └── ...
│
└── README.md                  # Getting started guide
```

## 🔧 Tool Usage Guidelines (CRITICAL)

**⚠️ MANDATORY: Before using ANY bash command, Claude MUST check this replacement table:**

### Bash Command Replacement Rules

**File Operations:**

| ❌ Traditional Command | ✅ Correct Tool | When to Use |
|---|---|---|
| `find . -name "*.js"` | **Glob** tool with `pattern="**/*.js"` | ALWAYS in Claude Code for file pattern matching |
| `find . -type f` | **Glob** tool with `pattern="**/*"` | ALWAYS in Claude Code for finding files |
| `grep -r "pattern"` | **Grep** tool with `pattern="pattern"` | ALWAYS in Claude Code for content search |
| `cat file.txt` | `bat file.txt` (in bash) OR **Read** tool | Read tool for Claude Code, bat for user-facing |
| `ls -la` | `eza --long --git` (in bash) | When user asks to list files |

**Detection Pattern for Claude:**

```javascript
// BEFORE executing bash command, check:
if (command.includes("find")) {
    → Use Glob tool instead (pattern matching)
    → NEVER use bash find in Claude Code
}

if (command.includes("grep") || command.includes("rg")) {
    → Use Grep tool instead
    → NEVER use bash grep/ripgrep in Claude Code
}

if (command.includes("cat")) {
    → Use Read tool for file reading
    → OR use bat in bash if showing to user
}

if (command.includes("ls")) {
    → Use eza in bash if available
    → Fallback to ls if eza not installed
}
```

**Enforcement Priority:**

1. **HIGHEST**: Glob tool (file patterns) - NEVER use bash find
2. **HIGHEST**: Grep tool (content search) - NEVER use bash grep/rg
3. **HIGH**: Read tool (file reading) - Prefer over cat
4. **MEDIUM**: Modern CLI tools (bat, eza, fd) - Use when appropriate

**Exception Cases:**

✅ **Can use bash find** only when:
- Glob tool doesn't support the operation (very rare)
- Need advanced find features like `-exec`, `-mtime`, etc.
- **BUT** - Must justify in comment why Glob won't work

✅ **Can use bash grep** only when:
- Piping output from another command (e.g., `git log | grep "pattern"`)
- Grep tool doesn't support the operation
- **BUT** - Must justify in comment why Grep tool won't work

### Why This Matters

**Problem:** Using bash commands bypasses:
- Token-efficient Claude Code tools
- Proper permissions and access controls
- Skill recommendations (cli-modern-tools doesn't intercept tool calls)

**Solution:** Check this table BEFORE every bash command execution.

---

## Development Commands

### Documentation
- **View Agent Catalog**: See `docs/AGENT_CATALOG.md` for complete agent reference
- **Read README**: See `README.md` for quick start guide

### Agent Management
- **Copy Generic Agent**: `cp generic-claude-framework/agents/<agent>.md .claude/agents/`
- **View Example**: `cat examples/agents/<example>.md`

### Directory Operations
- **List Generic Agents**: `ls -la generic-claude-framework/agents/`
- **List Examples**: `ls -la examples/agents/`
- **Create Docs Directory**: `mkdir -p docs/`

## Architecture

### Framework Philosophy

**Generic First, Customize Second**
1. Framework provides generic, reusable agents
2. Users copy to their project's `.claude/` directory
3. Customize with project-specific values
4. Maintain generic framework for updates

### Directory Organization

**generic-claude-framework/**
- Contains **project-agnostic** implementations
- No hardcoded URLs, credentials, or project names
- Uses configuration placeholders
- Designed for maximum reusability

**examples/**
- Contains **real-world implementations** from actual projects
- Shows how to customize generic agents
- Provides templates for common scenarios
- Documents best practices

**.claude/** (Not in this repo)
- Where users copy and customize agents
- Project-specific configurations
- Active Claude Code workspace

### Agent Categories

1. **Code Quality** - eslint-fixer
2. **Testing** - playwright-test-*, pest-test-*, web-app-testing-agent
3. **UI/UX** - mockup-creation-agent, ui-design-implementer
4. **Project Management** - task-creator, changelog-version-manager
5. **Development Utilities** - file-watcher-automation, test-steps-generator

### Key Patterns

**Configuration Driven**
- Agents use configuration files (JSON, env vars)
- Clear customization points documented
- Environment-specific values externalized

**Token Efficiency**
- Optimized agent sizes (85% reduction in some cases)
- TypeScript scripts for heavy lifting
- Minimal prompt overhead

**Risk-Based Workflows**
- Operations categorized by risk level
- User control over automation scope
- Safe defaults with opt-in advanced features

## Usage Workflow

### For Framework Developers

1. **Adding New Agents**:
   - Create in `generic-claude-framework/agents/`
   - Use configuration placeholders
   - Document customization points
   - Add example to `examples/agents/`

2. **Updating Documentation**:
   - Update `README.md` for user-facing changes
   - Update `docs/AGENT_CATALOG.md` for new agents
   - Update this `CLAUDE.md` for architecture changes

### For Framework Users

1. **Adopting Framework**:
   - Clone this repository
   - Copy `generic-claude-framework/` to project
   - Customize agents for your needs
   - Reference `examples/` for guidance

2. **Customizing Agents**:
   - Copy generic agent to `.claude/agents/`
   - Replace placeholder values
   - Test in your environment
   - Iterate and refine

## Important Conventions

### Naming
- **Agents**: `kebab-case.md` (e.g., `eslint-fixer.md`)
- **Commands**: `kebab-case.md` (e.g., `git-workflow.md`)
- **Scripts**: `kebab-case.ts|sh` (e.g., `analyze.ts`)

### Configuration
- Use **environment variables** for secrets
- Use **JSON files** for complex configurations
- Use **inline placeholders** for simple values (URLs, paths)

### Documentation
- Every agent must document **customization points**
- Provide **usage examples** for common scenarios
- Include **performance metrics** where relevant

## Notes

- This framework is **generic and reusable** - designed to be forked
- **Examples directory** shows real-world implementations
- **Documentation** is comprehensive and maintained
- **Performance optimized** - agents use minimal tokens
- **Security conscious** - no hardcoded credentials
- **Community driven** - contributions welcome

## Git Workflow for This Project

### 🚨 BEFORE ANY `git commit` COMMAND - READ THIS! 🚨

**⚠️ MANDATORY CHECK - CANNOT BE SKIPPED:**

```bash
# MUST RUN THESE 3 COMMANDS BEFORE git commit:
git diff --name-only                    # What files changed?
git diff | grep "^[+-]version:"         # Any version changes?
git diff --name-only | wc -l            # How many files?
```

**If ANY of these are true → USE changelog-manager (NOT git commit):**
- ✋ 3+ files modified
- ✋ version: line changed in skill.md or agent.md
- ✋ CHANGELOG.md modified
- ✋ package.json version changed
- ✋ README.md badge changed

**See "MANDATORY PRE-COMMIT CHECKS" section below for full details.**

---

### Release Management
**🔴 CRITICAL**: All releases MUST use the changelog-manager skill

**🛡️ GIT COMMAND GUARD (Built-in Protection)**:
The changelog-manager skill v2.6.0 includes automatic git command interception!

**How it works:**
- Automatically intercepts git commit/tag/push commands BEFORE execution
- Scans for release indicators (version changes, multiple files, CHANGELOG edits)
- Blocks command and presents options to user
- Prevents bypassing proper release workflow

**⚠️ ENFORCEMENT RULE FOR CLAUDE**:
Before running ANY git commit command, Claude MUST:
1. **Check**: Are there multiple files changed OR skill/agent enhancements?
2. **Trigger**: changelog-manager git guard will auto-intercept
3. **Ask User**: "These changes look like a release. Should I use changelog-manager to create a proper release?"
4. **Wait for confirmation** before proceeding

**NEVER bypass changelog-manager for**:
- Multiple feature files changed
- Skill version updates (e.g., v2.4.0 → v2.5.0)
- Agent enhancements
- CHANGELOG.md modifications
- README.md badge updates
- Any change that affects project version

**Auto-Activation Triggers**:
- User mentions: "release", "create release", "bump version", "prepare release"
- User mentions: "update changelog", "ready to release", "tag version"
- User mentions: "push to GitHub", "push commits" (after feature work)
- User requests git commit + tag + CHANGELOG updates together

**⚡ CRITICAL: Auto-Activation Behavior**:
When changelog-manager auto-activates (user says trigger keywords), Claude MUST:
1. ✅ **DO NOT ask for confirmation** - Skill already activated, just proceed
2. ✅ **DO NOT manually invoke the skill again** - It's already running
3. ✅ **Proceed directly with the workflow** - Start analyzing changes immediately
4. ⚠️ **You'll see**: `<command-message>The "changelog-manager" skill is running</command-message>`

**Example of CORRECT behavior:**
```
User: "release update"
Claude: [Skill auto-activates]
Claude: "I'll analyze your changes and prepare the release."
Claude: [Proceeds with git status, git diff, version detection...]
```

**Example of INCORRECT behavior (DO NOT DO THIS):**
```
User: "release update"
Claude: [Skill auto-activates]
Claude: "Would you like me to use changelog-manager?" ❌ WRONG - Don't ask!
User: "yes"
Claude: [Manually invokes skill again] ❌ WRONG - Skill already running!
```

**When changelog-manager Handles Release**:
1. Analyzes uncommitted changes
2. Generates CHANGELOG.md entries
3. Determines semantic version bump (patch/minor/major)
4. Updates version in package.json, README.md badges
5. Auto-generates documentation for changed agents/skills
6. Creates comprehensive commit message
7. Creates annotated git tag (this is a public repo)
8. Pushes commit + tag to remote

**Direct Git Commands - When to Use**:
- ✅ WIP commits on feature branches (single file, work in progress)
- ✅ Typo fixes (one-line changes)
- ✅ Experimental commits (clearly marked as WIP)
- ✅ After confirming with user: "This is NOT a release"

**Direct Git Commands - NEVER for Releases**:
- ❌ Manual `git commit` for version releases
- ❌ Manual `git tag -a v...` for versions
- ❌ Manual CHANGELOG.md updates for releases
- ❌ Manual version bumps in package files
- ❌ Multiple feature files committed without changelog-manager

**Correct Workflow Examples**:
```
Scenario 1: User asks to push to GitHub after feature work
❌ WRONG: git push origin main (bypasses changelog-manager)
✅ RIGHT: "I see you have feature changes. Should I create a release with changelog-manager?"

Scenario 2: User says "prepare release v1.8.0"
✅ changelog-manager auto-activates → handles everything

Scenario 3: User says "fix typo in README"
✅ Quick direct commit is fine (single trivial change)

Scenario 4: Enhanced a skill (e.g., changelog-manager v2.4.0 → v2.5.0)
❌ WRONG: Direct commit with manual version update
✅ RIGHT: "This is a skill enhancement. Should I prepare a release?"
```

**🚨 MANDATORY PRE-COMMIT CHECKS (CANNOT BE SKIPPED!)**:

**⚠️ CRITICAL: Before executing ANY `git commit` command, Claude MUST run these checks:**

### Step 1: Check for Release Indicators

**MUST execute these commands FIRST:**

```bash
# 1. Check what files are modified
git diff --name-only

# 2. Check for version changes in skill/agent files
git diff | grep "^[+-]version:"

# 3. Count modified files
git diff --name-only | wc -l
```

### Step 2: Evaluate Release Indicators

**If ANY of these are true, STOP and use changelog-manager:**

- ✋ **3+ files modified** → RELEASE! Use changelog-manager
- ✋ **skill.md or agent.md contains version change** (grep shows +version:) → RELEASE! Use changelog-manager
- ✋ **CHANGELOG.md is modified** → RELEASE! Use changelog-manager
- ✋ **package.json version changed** → RELEASE! Use changelog-manager
- ✋ **README.md badge changed** → RELEASE! Use changelog-manager

### Step 3: Decision

**If ANY release indicator found:**
```
🛑 STOP! This is a RELEASE!

Claude MUST:
1. Output: "Detected release indicators: [list what was found]"
2. Use Skill tool to invoke changelog-manager
3. DO NOT proceed with manual git commit
4. DO NOT ask user - just invoke changelog-manager directly
```

**If NO release indicators:**
```
✅ Safe to commit manually

This appears to be a simple change (1-2 files, no version changes).
Proceed with git commit.
```

### Step 4: Automatic Detection Examples

**Example 1: skill.md version change (RELEASE)**
```bash
$ git diff | grep "^[+-]version:"
-version: 2.7.0
+version: 2.8.0

🛑 DETECTED: Version change in skill.md
→ ACTION: Use changelog-manager (automatic, no user confirmation)
```

**Example 2: Multiple files (RELEASE)**
```bash
$ git diff --name-only | wc -l
5

🛑 DETECTED: 5 files modified (threshold: 3+)
→ ACTION: Use changelog-manager (automatic, no user confirmation)
```

**Example 3: Single file typo fix (SAFE)**
```bash
$ git diff --name-only
README.md

$ git diff README.md
-This is a typo
+This is a fix

✅ SAFE: 1 file, no version change, simple fix
→ ACTION: Proceed with git commit
```

### Why This is Mandatory

**The Problem:**
- Old pattern was easy to forget (just a mental check)
- Claude could skip the check and go straight to git commit
- No actual commands were executed to verify

**The Solution:**
- MUST run actual bash commands before ANY git commit
- Commands produce concrete output Claude can analyze
- If release indicators found, changelog-manager is invoked AUTOMATICALLY
- No user confirmation needed - indicators are proof enough

**This prevents:**
- ❌ Bypassing changelog-manager when committing skill version changes
- ❌ Forgetting to run documentation generation
- ❌ Token-saving shortcuts that skip critical steps
- ❌ Manual commits for what should be releases

## Colored Output Guidelines

### 🎯 Critical Rule: Minimal Colored Output Usage

**⚠️ PROBLEM**: Excessive `bash .claude/skills/colored-output/color.sh` calls cause screen flickering and visual clutter in Claude CLI. Each bash call appears as a separate task.

**✅ SOLUTION**: Use colored output SPARINGLY - only for headers and final results.

### When to Use Colored Output

**DO Use (2-3 calls maximum per operation):**
- ✅ Initial header (once at start)
  ```bash
  bash .claude/skills/colored-output/color.sh skill-header "skill-name" "Starting..."
  ```
- ✅ Final result (once at end)
  ```bash
  bash .claude/skills/colored-output/color.sh success "" "Complete!"
  ```
- ✅ Critical alerts (errors, warnings)
  ```bash
  bash .claude/skills/colored-output/color.sh error "" "Failed!"
  ```

**DON'T Use (causes flickering):**
- ❌ Progress updates ("Step 1...", "Processing...")
- ❌ Info messages ("Found X files", "Analyzing...")
- ❌ Intermediate steps (use regular Claude text instead)

### Recommended Pattern

```
# START: Colored header (1 call)
🔧 [skill-name] Starting operation...

# MIDDLE: Regular text (0 calls)
Analyzing files...
Processing 10 items...
Updating configurations...

# END: Colored result (1-2 calls)
✅ Operation complete!
```

### Anti-Pattern (DO NOT DO THIS)

```
🔧 [skill-name] Starting...         ← Colored
▶ Step 1...                         ← Colored (unnecessary)
ℹ️ Found 10 files                   ← Colored (unnecessary)
▶ Step 2...                         ← Colored (unnecessary)
... (8 more colored calls) ...
✅ Complete!                         ← Colored
```

**Result**: 10+ bash tasks → screen flickers

### Enforcement

All skills and agents MUST follow this pattern:
- **Maximum**: 3-4 colored bash calls per operation
- **Target**: 2 colored bash calls (header + result)
- **Forbidden**: More than 5 colored calls per operation

See `.claude/skills/colored-output/skill.md` for full guidelines.

## Contributing

When adding new agents or improving existing ones:
1. Keep generic agents in `generic-claude-framework/`
2. Add project-specific examples to `examples/`
3. Update `docs/AGENT_CATALOG.md` with new agents
4. Update this file for architectural changes
5. Maintain backward compatibility where possible
6. **For releases**: Use changelog-manager skill (never manual git commands)
