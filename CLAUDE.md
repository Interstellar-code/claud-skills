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

### Command Execution Pattern

**❌ DON'T do this (verbose):**
```
"I'll perform a directory listing of the .claude directory using the cli-modern-tools skill with bash attribution."

🔧 [cli-modern-tools] Running: eza --long --git .claude
[output]
```

**❌ ALSO DON'T do this (announcing decision tree):**
```
🎯 Decision Tree Check:
- Does it contain "find"? → Would need find → ❌ STOP! Use Glob tool instead

Let me search for package files using the Glob tool:
```

**✅ DO this (minimal - just execute):**
```
[Silently check decision tree, then just use the tool]
[output]
```

**For bash commands with modern tools:**
```
🔧 [cli-modern-tools] Running: eza --long --git .claude
[output]
```

### Rules
- **Skip verbose announcements** like "I'll perform...", "Let me...", "I'm going to..."
- **Just show attribution prefix and execute** the command immediately
- **Only provide context** when:
  - User explicitly asks for explanation
  - Command might be unexpected or confusing
  - Error occurs and needs clarification

### Examples

**User asks: "list files in .claude"**
- ❌ Bad: "I'll use eza to list the files in the .claude directory with git status..."
- ✅ Good: `🔧 [cli-modern-tools] Running: eza --long --git .claude` (then output)

**User asks: "show me the tree view"**
- ❌ Bad: "Let me generate a tree view of the directory structure..."
- ✅ Good: `🔧 [cli-modern-tools] Running: eza --tree --level=3` (then output)

**User asks: "why did you use eza instead of ls?"**
- ✅ Good: Now provide explanation (user asked for context)

---

## 📄 File Creation Policy

**CRITICAL: Do NOT create summary/documentation files in agent/skill directories**

### ❌ Forbidden File Types

**NEVER create these types of files**:
- `ENHANCEMENT-SUMMARY.md`
- `RELEASE-VERIFICATION-v*.md`
- `INTEGRATION-COMPLETE.md`
- `IMPLEMENTATION-SUMMARY.md`
- `CHANGES-SUMMARY.md`
- Any similar summary/verification/completion documentation files

### ❌ Forbidden Locations

**NEVER create summary files in**:
- `.claude/agents/{agent-name}/` directories
- `.claude/skills/{skill-name}/` directories
- `.claude/commands/` directories

### ✅ Allowed Documentation

**Only create these files**:
- `README.md` - Agent/skill documentation (if explicitly requested by user)
- `agent.md` - Agent definition (required)
- `skill.md` - Skill definition (required)
- Architecture/flow diagrams if they already exist (update only)

### Rationale

**Why this rule exists**:
- Summary files clutter agent directories
- Information should be in agent.md/skill.md itself
- User doesn't need post-implementation summaries
- Changes should be tracked via git commits, not summary files

### Exception

**Only exception**: User explicitly asks "create a summary file" or "document these changes in a separate file"

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

### 🎯 Quick Decision Tree (Reference Before EVERY Bash Command)

```
🤔 I want to execute a bash command...

┌─ Does it contain "find"?
│  ├─ YES → ❌ STOP! Use Glob tool instead
│  └─ NO  → Continue ↓
│
┌─ Does it contain "grep" or "rg"?
│  ├─ YES → ❌ STOP! Use Grep tool instead
│  └─ NO  → Continue ↓
│
┌─ Does it contain "cat"?
│  ├─ YES → ❌ STOP! Use Read tool (or bat in bash)
│  └─ NO  → Continue ↓
│
┌─ Does it contain "ls"?
│  ├─ YES → ✅ Replace with: eza --long --git
│  └─ NO  → Continue ↓
│
└─ ✅ OK to execute (but check cli-modern-tools table!)
```

**How to use this:**
1. **SILENTLY** check this tree before EVERY `Bash` tool call (do NOT output the check to user)
2. If any condition matches, STOP and use the correct alternative
3. No exceptions - even for "quick" or "simple" commands
4. **DO NOT announce the decision** - just use the correct tool directly

**Example (WRONG - too verbose):**
```
🎯 Decision Tree Check:
- Does it contain "find"? → YES → STOP! Use Glob tool
Let me search for files using Glob tool:
```

**Example (CORRECT - silent):**
```
[Just use Glob tool directly, no announcement]
```

### Why This Matters

**Problem:** Using bash commands bypasses:
- Token-efficient Claude Code tools
- Proper permissions and access controls
- Skill recommendations (cli-modern-tools doesn't intercept tool calls)

**Solution:** Check this table BEFORE every bash command execution.

---

### 🚀 Efficient Claude Code Operations - Token Optimization

**CRITICAL: When doing multiple file searches or content analysis, use Task tool with Explore agent for token efficiency**

#### When to Use Explore Agent vs. Direct Tools

**❌ INEFFICIENT (Multiple separate tool calls):**
```
Grep(pattern="topicplan\.md", ...)     # 200 tokens, 55 results
Grep(pattern="spec/", ...)              # 150 tokens, 2 results
Grep(pattern="deliverables/", ...)      # 150 tokens, 5 results
Total: 500+ tokens, 3 separate operations
```

**✅ EFFICIENT (Single Explore agent call):**
```
Task(
  subagent_type="Explore",
  description="Find all file path references",
  prompt="Find all references to topicplan.md, spec/, and deliverables/ paths in agent.md"
)
Total: ~250 tokens, 1 consolidated operation (50% savings)
```

#### Rules for Efficient Operations

**Use Explore Agent when:**
- ✅ Searching for multiple patterns simultaneously
- ✅ Need to understand codebase structure
- ✅ Gathering context across multiple files
- ✅ Searching for related concepts (not just exact matches)
- ✅ Need consolidated, summarized results

**Use Direct Tools (Glob/Grep/Read) when:**
- ✅ Single specific file to read
- ✅ One exact pattern to find
- ✅ Quick verification of known location
- ✅ Simple one-off operation

#### Examples from CLAUDE.md

**From recent work:**
```
❌ What I did (inefficient):
  - 3 separate Grep calls for topicplan.md, spec/, deliverables/
  - Each call used tokens and showed all results

✅ What I should have done:
  Task(
    subagent_type="Explore",
    description="Find all file path references",
    prompt="Find all references to topicplan.md, spec/, and deliverables/ paths"
  )
```

**Token Savings:**
- Direct approach: ~500 tokens (multiple tool calls + all results)
- Explore agent: ~250 tokens (single coordinated search)
- **Savings: 50%**

#### Decision Guide

```
🤔 I need to search for information...

┌─ Multiple patterns or files?
│  ├─ YES → ✅ Use Task(subagent_type="Explore")
│  └─ NO  → Continue ↓
│
┌─ Need context across codebase?
│  ├─ YES → ✅ Use Task(subagent_type="Explore")
│  └─ NO  → Continue ↓
│
┌─ Single specific file/pattern?
│  └─ YES → ✅ Use direct Glob/Grep/Read tools
```

**Key Principle:** Task tool with Explore agent is MORE efficient for multi-step searches. Don't default to direct tools for complex operations.

---

### 📝 Efficient Markdown Operations - Use markdown-helper Skill

**CRITICAL: For markdown file operations, use markdown-helper skill for 68% token savings**

#### When to Use markdown-helper vs. Read/Edit Tools

**❌ INEFFICIENT (Direct Read/Edit):**
```
Read(file_path="spec.md")              # 800 tokens - loads entire file
# Extract headers manually from output
# Parse tables manually
# Extract lists manually
Total: 800+ tokens, manual parsing needed
```

**✅ EFFICIENT (markdown-helper skill):**
```bash
# Extract headers (JSON output)
node ~/.claude/skills/markdown-helper/md-helper.js extract-headers spec.md --json

# Extract tables
node ~/.claude/skills/markdown-helper/md-helper.js extract-tables spec.md --json

# Extract lists
node ~/.claude/skills/markdown-helper/md-helper.js extract-lists spec.md

Total: ~250 tokens, structured output (68% savings)
```

#### markdown-helper Capabilities

**1. Token-Efficient Parsing:**
- ✅ Extract headers without reading full file
- ✅ Extract tables as JSON/CSV
- ✅ Extract lists (bulleted, numbered)
- ✅ Get file statistics (word count, heading count)

**2. Template Operations:**
- ✅ Bulk search & replace for placeholders
- ✅ Populate templates efficiently
- ✅ Multi-file replacements

**3. Validation:**
- ✅ Lint markdown files
- ✅ Validate structure
- ✅ Auto-fix formatting issues

#### Rules for Markdown Operations

**Use markdown-helper when:**
- ✅ Parsing spec files (headers, requirements, tables)
- ✅ Extracting structured data from markdown
- ✅ Populating templates with placeholders
- ✅ Validating generated markdown files
- ✅ Bulk operations across multiple files
- ✅ Need JSON/CSV output from markdown

**Use Read/Edit tools when:**
- ✅ Need full file content for context
- ✅ Making complex, non-templated edits
- ✅ One-off specific line changes
- ✅ Reading non-markdown files

#### Examples

**Parsing Spec Files:**
```bash
# ❌ WRONG (800 tokens):
Read(file_path="project-spec.md")

# ✅ RIGHT (250 tokens):
🔧 [markdown-helper] Running: node md-helper.js extract-headers project-spec.md --json
🔧 [markdown-helper] Running: node md-helper.js extract-lists project-spec.md
🔧 [markdown-helper] Running: node md-helper.js extract-tables project-spec.md --json
```

**Populating Templates:**
```bash
# ❌ WRONG (manual Read + Write + Edit):
Read(template.md)  # 500 tokens
# Manually replace placeholders
Write(output.md, content)  # 500 tokens
Total: 1000+ tokens

# ✅ RIGHT (markdown-helper bulk replace):
🔧 [markdown-helper] Running: node md-helper.js replace template.md "{slug}" "my-topic"
Total: ~200 tokens (80% savings)
```

**Validation:**
```bash
# ✅ After generating markdown files, validate:
🔧 [markdown-helper] Running: node md-helper.js lint topicplan.md
```

#### Token Savings Impact

**Real Example from Agent Work:**
- Traditional Read approach: ~800 tokens per spec file
- markdown-helper approach: ~250 tokens
- **Savings: 550 tokens per operation (68%)**

For a project with 5 markdown files:
- Traditional: 4000 tokens
- markdown-helper: 1250 tokens
- **Total savings: 2750 tokens (69%)**

#### Integration with Bash Attribution

**MUST use bash attribution pattern:**
```bash
🔧 [markdown-helper] Running: node md-helper.js extract-headers spec.md
```

See markdown-helper skill documentation for full command reference.

---

## Autonomous Skills - Trust and Confidence Policy

**CRITICAL: Trust autonomous skills to do their job. Don't pre-check what they're designed to check.**

### When a Skill is Fully Autonomous (like changelog-manager)

**❌ DON'T do this:**
```
User: "make a release"
Claude: Let me check git status first...
Claude: Let me check git diff...
Claude: Let me stage files...
Claude: Now let me invoke the skill...
```

**✅ DO this:**
```
User: "make a release"
Claude: [Immediately invokes changelog-manager skill]
```

### Confidence Rules

1. **Trust First**: If a skill is documented as autonomous, invoke it immediately
2. **Fail Gracefully**: If the skill fails or encounters issues, THEN take over manually
3. **No Redundant Checks**: Don't run commands the skill is designed to run (git status, git diff, git add)
4. **Efficiency**: Autonomous skills save tokens and time - use them confidently

### When to Pre-Check

**Only pre-check if:**
- ❌ Skill documentation says "requires manual verification first"
- ❌ User explicitly asks you to check something first
- ❌ Previous invocation of this skill failed in this session

**Otherwise:** Invoke directly and trust the skill.

### Autonomous Skills List

Skills that should be invoked directly without pre-checking:
- **changelog-manager**: Handles git status, diff, add, commit, tag, push autonomously
- **markdown-helper**: Handles file parsing, extraction, and analysis autonomously
- **cli-modern-tools**: Suggests modern alternatives autonomously
- **time-helper**: Handles timezone conversions and calculations autonomously

### Recovery Pattern

```
1. Invoke skill directly
2. If skill succeeds → Done!
3. If skill fails → Read error message → Take over manually
```

**Philosophy**: Skills are designed to be autonomous. Trust them. You can always take over if they fail.

### Examples

**Example 1: Release Management**
```
❌ WRONG:
User: "make a patch release"
Claude: Let me check git status...
Claude: Let me check git diff...
Claude: Let me stage files...
Claude: Now invoking changelog-manager...

✅ RIGHT:
User: "make a patch release"
Claude: [Invokes changelog-manager immediately]
```

**Example 2: Markdown Operations**
```
❌ WRONG:
User: "extract headers from spec.md"
Claude: Let me read the file first to see what's there...
Claude: Now let me use markdown-helper...

✅ RIGHT:
User: "extract headers from spec.md"
Claude: [Invokes markdown-helper immediately]
```

**Example 3: Skill Failure Recovery**
```
✅ CORRECT FLOW:
User: "make a release"
Claude: [Invokes changelog-manager]
Skill: ERROR - CHANGELOG.md not found
Claude: The skill failed because CHANGELOG.md doesn't exist. Let me create it first...
Claude: [Creates CHANGELOG.md manually]
Claude: [Retries changelog-manager]
```

### Token Efficiency Impact

**Pre-checking unnecessarily wastes tokens:**
- Manual git status: ~200 tokens
- Manual git diff: ~300 tokens
- Manual git add: ~100 tokens
- **Total wasted**: ~600 tokens

**Direct skill invocation:**
- Skill does all checks internally: ~250 tokens
- **Savings**: 350 tokens (58%)

### Key Takeaway

**Trust autonomous skills. They're optimized for their job. You're the backup, not the primary.**

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

## 🎯 csprojecttask Agent Usage - MANDATORY

**CRITICAL: When user requests multi-step projects, topics, or mentions spec files - ALWAYS use csprojecttask agent**

### When to Use csprojecttask Agent (MANDATORY)

**✅ MUST use csprojecttask agent when user says:**
- "create a topic using [spec-file.md]"
- "build [project name] using spec"
- "start a project from [spec]"
- "use the PM orchestration system"
- "create a multi-step project"
- Any mention of "topic", "spec", or "multi-agent"

**❌ NEVER do these manually (always use agent):**
- Create `Project-tasks/{slug}/` directories
- Create `Project-tasks/{slug}/topicplan.md`
- Create `.claude/agents/state/csprojecttask/topics/{slug}/` directories
- Write `topic.json`, `task-*.json`, `pm-state.json` files
- Manually execute the 3-phase workflow
- Approve phases on behalf of the user

### Correct Workflow

**Step 1: Invoke Agent**
```javascript
Task(
  subagent_type="csprojecttask",
  description="Create topic from spec",
  prompt="Create a topic using the specification file: [spec-file.md]

[Brief summary of what needs to be built]

Please proceed through all phases and present each phase for user approval."
)
```

**Step 2: Present Phase 1 Results to User**
When agent returns Phase 1 analysis, Claude MUST:
- ✅ Present requirements summary to user
- ✅ Ask user: "Does this look correct? Should I proceed to Phase 2?"
- ❌ DO NOT auto-approve on behalf of user

**Step 3: User Approves → Continue to Phase 2**
Only after user says "yes", "approved", "continue":
- Invoke agent again for Phase 2 (Agent Selection)
- Present agent selection to user for approval

**Step 4: User Approves → Continue to Phase 3**
Only after user approves:
- Invoke agent again for Phase 3 (Execution Planning)
- Present execution plan to user for approval

**Step 5: User Approves → Execute**
Only after user approves:
- Invoke agent to launch sub-agents
- Monitor progress
- Report completion

### 3-Phase Approval Pattern (MANDATORY)

**CRITICAL: User must approve each phase, not Claude**

```
Phase 1: Requirements Analysis
├─ Agent analyzes spec
├─ Returns requirements summary
└─ ⚠️ STOP - Present to user for approval

User approves ✓

Phase 2: Agent Selection
├─ Agent selects sub-agents (e.g., single-page-website-builder)
├─ Returns agent list with justification
└─ ⚠️ STOP - Present to user for approval

User approves ✓

Phase 3: Execution Planning
├─ Agent prepares detailed prompts for sub-agents
├─ Returns execution plan
└─ ⚠️ STOP - Present to user for approval

User approves ✓

Execution:
├─ Agent launches sub-agents
├─ Monitors progress via state files
└─ Reports completion with deliverables
```

### What Claude MUST NOT Do

**❌ FORBIDDEN - These bypass the agent:**
1. Manually create `Project-tasks/{slug}/` structure
2. Manually write `topicplan.md`
3. Manually create state JSON files (`topic.json`, `task-*.json`)
4. Execute work that csprojecttask agent should orchestrate
5. Approve phases on behalf of user (NO "Yes, please proceed!")
6. Skip user approval between phases

### What Claude MUST Do

**✅ REQUIRED - Proper agent usage:**
1. Recognize trigger phrases (spec file, topic, multi-step)
2. Invoke `Task(subagent_type="csprojecttask", ...)`
3. Wait for agent to return Phase 1 results
4. Present Phase 1 to user and wait for approval
5. Only continue after user explicitly approves
6. Repeat for Phase 2, Phase 3, and Execution
7. Monitor state files for progress
8. Report completion with deliverables location

### Detection Pattern

```javascript
// When user message contains:
if (message.includes("create a topic") ||
    message.includes("using spec") ||
    message.includes("start a project") ||
    message.includes(".md spec") ||
    message.includes("PM orchestration")) {

    // ✅ DO THIS:
    Task(subagent_type="csprojecttask", prompt="...");

    // ❌ DO NOT DO THIS:
    // mkdir -p "Project-tasks/..."
    // Write(...topic.json...)
}
```

### Example (CORRECT)

```
User: "create a topic using test-spec-dashboard.md"

Claude: [Invokes csprojecttask agent]

Agent returns: Phase 1 complete - here's the requirements...

Claude to User: "The agent has analyzed the spec:
- Browser-based dashboard
- 6 deliverables (HTML, CSS, JS files)
- Uses single-page-website-builder agent
- MVP includes topic cards, detail view, auto-refresh

Does this look correct? Should we proceed to Phase 2 (Agent Selection)?"

User: "yes"

Claude: [Invokes agent for Phase 2]
...
```

### Example (WRONG - DO NOT DO THIS)

```
User: "create a topic using test-spec-dashboard.md"

Claude: ❌ "I'll create a topic using the dashboard spec. Starting the csprojecttask workflow now."

Claude: ❌ [Manually creates directories]
mkdir -p "Project-tasks/csprojecttask-dashboard/spec"

Claude: ❌ [Manually writes topic.json]
Write(.claude/agents/state/.../topic.json, ...)

Claude: ❌ [Auto-approves on behalf of user]
"Yes, please proceed with launching the task!"
```

### Enforcement Rules

1. **Trigger Detection**: ALWAYS check for spec file mentions
2. **Agent Invocation**: ALWAYS use Task tool with csprojecttask
3. **Manual Work**: NEVER create Project-tasks/ or state files manually
4. **User Approval**: NEVER approve phases on behalf of user
5. **Phase Separation**: ALWAYS wait for user between phases

### Why This Matters

- ✅ Tests the csprojecttask agent properly (the whole point!)
- ✅ User controls the workflow (approves each phase)
- ✅ Follows 3-phase architecture correctly
- ✅ Creates proper topic structure and state files
- ✅ Enables multi-topic management via menu system
- ✅ Self-documenting via topicplan.md

**When in doubt**: If user mentions spec files or multi-step projects → use csprojecttask agent!

## Contributing

When adding new agents or improving existing ones:
1. Keep generic agents in `generic-claude-framework/`
2. Add project-specific examples to `examples/`
3. Update `docs/AGENT_CATALOG.md` with new agents
4. Update this file for architectural changes
5. Maintain backward compatibility where possible
6. **For releases**: Use changelog-manager skill (never manual git commands)
