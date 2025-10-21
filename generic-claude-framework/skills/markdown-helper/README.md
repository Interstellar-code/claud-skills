# markdown-helper

> Token-efficient markdown parsing, editing, and diagram generation using native CLI tools (Windows/Mac/Linux compatible)

**Category**: Utilities | **Language**: Unknown | **Version**: 1.0.0

## Quick Info

| Property | Value |
|----------|-------|
| **Language** | Unknown |
| **Token Savings** | None% |
| **Category** | Utilities |
| **Tags** | markdown, parsing, mermaid, diagrams, linting, token-efficient |

## Overview

Token-efficient markdown parsing, editing, and diagram generation using native CLI tools (Windows/Mac/Linux compatible)

## Use Cases

- Utility operations


## Benchmarks


*No benchmarks available yet. Contributions welcome!*

### Example Benchmark Template

| Operation | Native Tool | Time | This Skill | Time | Improvement |
|-----------|-------------|------|------------|------|-------------|
| Example op | `native command` | 1000ms | `skill command` | 200ms | **80% faster** |


## Installation

### Step 1: Ensure Skill is Present

```bash
# Skill is included in the framework at:
# generic-claude-framework\skills\markdown-helper

# If not present, copy from framework:
cp -r .claude/skills/markdown-helper /your-project/.claude/skills/
```

### Step 2: Install Dependencies


### Step 3: Configure

1. Review skill documentation in the source directory
2. Set up any required environment variables
3. Test the skill with a simple operation

### Step 4: Verify Installation

```bash
# Test skill functionality (see skill-specific docs for commands)
# Example for Python skills:
python .claude/skills/{skill.name}/run.py --help

# Example for Bash skills:
bash .claude/skills/{skill.name}/skill.sh --help
```

## Usage

See the skill documentation for detailed usage instructions.

## Documentation

- **Source**: [{skill.file_path}](../../{skill.file_path})
- **Full Documentation**: See skill source directory for complete details

## Related

- [changelog-manager](changelog-manager.md) - Update project changelog with uncommitted changes, synchronize package versions, and create version releases with automatic commit, git tags, and push
- [cli-modern-tools](cli-modern-tools.md) - Auto-suggest modern CLI tool alternatives (bat, eza, fd, ripgrep) for faster, more efficient command-line operations with 50%+ speed improvements
- [lark-agent](lark-agent.md) - Create hierarchical Lark tasks from markdown test plans.

ACTIVATE THIS SKILL when user:
- Says "create lark tasks" or "process test file" or "convert test plan"
- Mentions "lark" + "test" or "test scenarios" or "test cases"
- Wants to convert markdown test documentation into Lark tasks
- Has a test file and wants it in Lark

WORKFLOW:
1. Ask user for test file path (required)
2. Ask for owner, priority, target date (optional)
3. Execute: python .claude/skills/lark-agent/run.py [file] --owner="[name]" --priority=[1-3] --target-date="YYYY-MM-DD"
4. Parse JSON output
5. Execute Lark MCP workflow to create tasks
6. Report results

DO NOT create test plans yourself - only process existing markdown files unless explicitly asked.



---

**Last Updated**: 2025-10-21
**Maintainer**: Community
**Status**: Unknown Ready
