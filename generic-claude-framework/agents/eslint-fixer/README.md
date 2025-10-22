# eslint-fixer

> Fix ESLint issues with TypeScript scripts for ultra-fast, risk-based analysis and selective fixing

**Category**: Code Quality & Linting | **Version**: 3.0.0

## Quick Info

| Property | Value |
|----------|-------|
| **Speed** | ⚡⚡⚡⚡⚡ (5/5) |
| **Complexity** |  Low |
| **Token Efficiency** | 85% improvement |
| **Tags** | javascript, typescript, linting, eslint, code-quality |

## Overview

Fix ESLint issues with TypeScript scripts for ultra-fast, risk-based analysis and selective fixing

## Use Cases

- General purpose usage


## Benchmarks


| Operation | Traditional Approach | Tokens | Framework Approach | Tokens | Improvement |
|-----------|---------------------|--------|-------------------|--------|-------------|
| Agent Load | Standard prompts | ~30,000 | Optimized scripts | ~4,500 | **85% reduction** |


## Installation

### Step 1: Copy Agent Directory

```bash
# Copy entire agent directory to your project's .claude directory
cp -r generic-claude-framework/agents/eslint-fixer /your-project/.claude/agents/
```

### Step 2: Install Dependencies

**For ESLint/TypeScript agents:**
```bash
# Install ESLint and TypeScript dependencies
npm install --save-dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin

# Copy and compile TypeScript scripts (if applicable)
cp -r .claude/scripts/eslint /your-project/.claude/scripts/
cd /your-project/.claude/scripts/eslint
npm install
npx tsc
```


### Step 3: Configure

1. Open the agent file and review configuration options
2. Update any project-specific values (URLs, paths, credentials)
3. Set up environment variables if needed (create `.claude/.env`)

### Step 4: Verify Installation

```
# In Claude Code, verify the agent is available
User: "List available agents"
```

## Usage

```
User: "[Describe what you want to do]"
Claude: I'll use the {agent.name} agent...
```

## Configuration

See the agent file for configuration options and customization points.

## Documentation

- **Source**: [{agent.file_path}](../../{agent.file_path})
- **Full Documentation**: See agent source file for complete details

## Related



---

**Last Updated**: 2025-10-22
**Maintainer**: Community
**Status**: Production Ready
