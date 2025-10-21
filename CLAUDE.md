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

## Contributing

When adding new agents or improving existing ones:
1. Keep generic agents in `generic-claude-framework/`
2. Add project-specific examples to `examples/`
3. Update `docs/AGENT_CATALOG.md` with new agents
4. Update this file for architectural changes
5. Maintain backward compatibility where possible
