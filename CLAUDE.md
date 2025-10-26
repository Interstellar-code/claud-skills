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

## 💬 Communication Style

**CRITICAL: Minimal commentary when executing commands**

### Rules
- **Skip verbose announcements** like "I'll perform...", "Let me...", "I'm going to..."
- **Just show attribution prefix and execute** immediately: `🔧 [cli-modern-tools] Running: eza --long --git .claude`
- **Silently check decision trees** - never announce the check to user
- **Only provide context** when user asks, command is unexpected, or error occurs

---

## 📄 File Creation Policy

**CRITICAL: Do NOT create summary/documentation files in agent/skill directories**

**❌ NEVER create**: `ENHANCEMENT-SUMMARY.md`, `RELEASE-VERIFICATION-v*.md`, `INTEGRATION-COMPLETE.md`, `IMPLEMENTATION-SUMMARY.md`, `CHANGES-SUMMARY.md` or similar files

**❌ NEVER create summary files in**: `.claude/agents/`, `.claude/skills/`, `.claude/commands/` directories

**✅ Only create**: `README.md` (if user requests), `agent.md`, `skill.md`, existing diagrams (update only)

**Why**: Summary files clutter directories. Information belongs in agent.md/skill.md. Track changes via git commits.

**Exception**: User explicitly asks "create a summary file"

---

## Task Prefix System

**CRITICAL: When creating tasks with TodoWrite, prefix content with skill/agent identifier**

This helps users understand which skill/agent is creating which task in the Claude CLI.

### Prefix Format
- Skills: `[S:xxx]` where xxx is 3-letter abbreviation
- Agents: `[A:xxx]` where xxx is 3-letter abbreviation

### Complete Mapping Table

**Skills:**
- `[S:chn]` - changelog-manager
- `[S:cli]` - cli-modern-tools
- `[S:clr]` - colored-output
- `[S:mrk]` - markdown-helper
- `[S:crt]` - skill-creator
- `[S:skl]` - skill-manager
- `[S:tmp]` - template-skill
- `[S:tim]` - time-helper

**Agents:**
- `[A:chn]` - changelog-version-manager
- `[A:esf]` - eslint-fixer
- `[A:flw]` - file-watcher-automation
- `[A:lgn]` - log-analyzer
- `[A:mck]` - mockup-creation-agent
- `[A:peg]` - pest-test-generator
- `[A:per]` - pest-test-runner
- `[A:pwg]` - playwright-test-generator
- `[A:pwh]` - playwright-test-healer
- `[A:pwp]` - playwright-test-planner
- `[A:tsk]` - task-creator
- `[A:tst]` - test-steps-generator
- `[A:dsg]` - ui-design-implementer
- `[A:wbp]` - web-app-testing-agent

### Usage Examples

```python
# Skill creating tasks
TodoWrite(todos=[{
    "content": "[S:cli] Check if eza is installed",
    "status": "pending",
    "activeForm": "Checking eza installation"
}])

# Agent creating tasks
TodoWrite(todos=[{
    "content": "[A:esf] Fix ESLint errors in src/",
    "status": "in_progress",
    "activeForm": "Fixing ESLint errors"
}])
```

### Rules
- **ALWAYS prefix** task content when skill/agent creates task
- **Use exact prefix** from mapping table above
- **Pad with underscore** if abbreviation < 3 chars (e.g., `[S:sql_]`)
- **User-created tasks** don't need prefix (only skill/agent tasks)

## 🔧 Tool Usage Guidelines (CRITICAL)

**🚨 MANDATORY PRE-FLIGHT CHECK - CANNOT BE SKIPPED! 🚨**

**BEFORE executing ANY bash command, Claude MUST:**
1. ✅ **Check**: Does this command appear in the replacement table below?
2. ✅ **Replace**: Use the correct alternative from the table
3. ✅ **Verify**: Did I use Glob/Grep tool instead of bash find/grep?

**This check is MANDATORY and CANNOT BE BYPASSED - not even for "simple" or "quick" commands!**

---

**⚠️ MANDATORY: Bash Command Replacement Table:**

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

---

### 🎯 Quick Decision Tree (SILENT - Check Before EVERY Bash Command)

```
"find" in command? → Use Glob tool
"grep"/"rg" in command? → Use Grep tool
"cat" in command? → Use Read tool (or bat in bash)
"ls" in command? → Use eza --long --git
```

**Rules**: Check SILENTLY before every Bash call. NO announcements. Just use correct tool.

---

### 🚀 Efficient Claude Code Operations - Token Optimization

**CRITICAL: Use Task(subagent_type="Explore") for multiple searches - 50% token savings**

**Use Explore Agent when:**
- Multiple patterns/files simultaneously
- Understanding codebase structure
- Gathering context across files
- Need consolidated results

**Use Direct Tools (Glob/Grep/Read) when:**
- Single specific file/pattern
- Quick verification of known location
- Simple one-off operation

**Example**: 3 separate Grep calls = 500 tokens. Single Explore agent = 250 tokens (50% savings)

---

### 📝 Efficient Markdown Operations - Use markdown-helper Skill

**CRITICAL: Use markdown-helper for 68% token savings vs Read/Edit**

**Capabilities:**
1. Extract headers/tables/lists as JSON without reading full file
2. Bulk search & replace for templates
3. Lint and validate markdown structure

**Use markdown-helper when:**
- Parsing spec files (headers, requirements, tables)
- Extracting structured data from markdown
- Populating templates with placeholders
- Bulk operations across multiple files

**Use Read/Edit when:**
- Need full file content for context
- Complex, non-templated edits
- One-off specific line changes

**Commands:**
```bash
🔧 [markdown-helper] Running: node md-helper.js extract-headers spec.md --json
🔧 [markdown-helper] Running: node md-helper.js replace template.md "{slug}" "my-topic"
```

**Savings**: Read approach = 800 tokens. markdown-helper = 250 tokens (68% savings)

---

## Autonomous Skills - Trust and Confidence Policy

**CRITICAL: Trust autonomous skills. Invoke immediately, no pre-checks.**

### Rules

1. **Trust First**: Invoke immediately if skill is autonomous
2. **Fail Gracefully**: If skill fails, THEN take over manually
3. **No Redundant Checks**: Don't run commands the skill handles (git status, git diff, etc.)
4. **Token Efficiency**: Pre-checking wastes ~600 tokens. Direct invocation = 250 tokens (58% savings)

### Autonomous Skills List

**Invoke directly without pre-checking:**
- **changelog-manager**: git status, diff, add, commit, tag, push
- **markdown-helper**: file parsing, extraction, analysis
- **cli-modern-tools**: suggests modern alternatives
- **time-helper**: timezone conversions, calculations

### When to Pre-Check

**Only if:**
- Skill docs say "requires manual verification first"
- User explicitly asks to check first
- Previous invocation failed in this session

**Recovery Pattern**: Invoke → Success? Done! → Failure? Read error → Take over manually

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

### 🚨 MANDATORY PRE-COMMIT CHECKS

**Before ANY `git commit`, run:**
```bash
git diff --name-only                    # What files changed?
git diff | grep "^[+-]version:"         # Version changes?
git diff --name-only | wc -l            # File count
```

**If ANY true → Use changelog-manager (NOT git commit):**
- 3+ files modified
- version: line changed in skill.md/agent.md
- CHANGELOG.md/package.json/README.md badge modified

### Release Management Rules

**🔴 CRITICAL**: All releases MUST use changelog-manager skill

**Auto-Activation Triggers** (skill auto-activates, don't invoke again):
- "release", "bump version", "update changelog", "tag version", "push to GitHub"

**When auto-activated**: Proceed with workflow immediately. DO NOT ask for confirmation or re-invoke.

**changelog-manager handles**:
1. Analyzes changes, generates CHANGELOG entries
2. Determines version bump (patch/minor/major)
3. Updates version in package.json, README badges
4. Auto-generates agent/skill documentation
5. Creates commit + annotated tag + pushes

**Direct Git Commands - When to Use:**
- ✅ WIP commits (single file, work in progress)
- ✅ Typo fixes (one-line changes)
- ✅ After confirming: "This is NOT a release"

**Direct Git Commands - NEVER for:**
- ❌ Version releases
- ❌ Multiple feature files
- ❌ CHANGELOG/version bumps

## Colored Output Guidelines

**⚠️ PROBLEM**: Excessive colored bash calls cause screen flickering (each appears as separate task)

**✅ SOLUTION**: Use SPARINGLY - 2-3 calls maximum per operation

**DO Use:**
- Initial header (once at start)
- Final result (once at end)
- Critical alerts (errors, warnings)

**DON'T Use** (causes flickering):
- Progress updates, info messages, intermediate steps (use regular text instead)

**Pattern**: Header (1 call) → Regular text (0 calls) → Result (1 call)

**Enforcement**: Maximum 3-4 calls, target 2, forbidden 5+

## 🎯 agenthero-ai Agent Usage - MANDATORY

**CRITICAL: When user mentions spec files, topics, or multi-step projects → ALWAYS use agenthero-ai agent**

### 🚨 DO NOT TAKE OVER - LET THE AGENT RUN!

**When agenthero-ai invoked, Claude MUST:**
1. Invoke `Skill(command: "agenthero-ai")` or `Task(subagent_type="agenthero-ai", ...)`
2. STOP and WAIT for agent response
3. Present agent output to user
4. Wait for user input before continuing

**❌ FORBIDDEN after invoking:**
- DO NOT run manual Python scripts (`topic_manager.py`, etc.)
- DO NOT create directories/files manually (`Project-tasks/`, state JSON files)
- DO NOT use TodoWrite immediately
- DO NOT approve phases on behalf of user

### Triggers for agenthero-ai

**Use when user says:**
- "create a topic using [spec-file.md]"
- "build [project name] using spec"
- "start a project from [spec]"
- Any mention of "topic", "spec", or "multi-agent"

### 3-Phase Workflow

```
Phase 1: Requirements Analysis → Present to user → Wait for approval
Phase 2: Agent Selection → Present to user → Wait for approval
Phase 3: Execution Planning → Present to user → Wait for approval
Execution: Launch sub-agents → Monitor → Report completion
```

**CRITICAL**: User must approve each phase. NEVER auto-approve or skip user approval.

### What Claude MUST NOT Do

**❌ NEVER manually:**
- Create `Project-tasks/{slug}/` or state directories
- Write `topicplan.md`, `topic.json`, `task-*.json`
- Execute 3-phase workflow manually
- Approve phases (NO "Yes, please proceed!")

### What Claude MUST Do

**✅ REQUIRED:**
1. Recognize triggers (spec file, topic, multi-step)
2. Invoke agent via Task/Skill tool
3. Present each phase to user for approval
4. Only continue after user explicitly approves
5. Monitor state files, report completion

**Detection**: If message includes "create a topic"/"using spec"/"PM orchestration" → `Task(subagent_type="agenthero-ai", ...)`

**Why**: Tests agent properly, user controls workflow, follows 3-phase architecture

## Contributing

When adding new agents or improving existing ones:
1. Keep generic agents in `generic-claude-framework/`
2. Add project-specific examples to `examples/`
3. Update `docs/AGENT_CATALOG.md` with new agents
4. Update this file for architectural changes
5. Maintain backward compatibility where possible
6. **For releases**: Use changelog-manager skill (never manual git commands)
- no you cannot create the topic manually for agenthero-ai, you are not allowed to do that