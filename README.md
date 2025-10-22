# Generic Claude Code Framework

> Production-ready Claude Code agents and skills with auto-generated documentation

[![Agents](https://img.shields.io/badge/agents-14-blue)](docs/AGENT_CATALOG.md)
[![Skills](https://img.shields.io/badge/skills-11-green)](docs/SKILL_CATALOG.md)
[![Version](https://img.shields.io/badge/version-1.9.0-orange)](CHANGELOG.md)
[![Ecosystem](https://img.shields.io/badge/ecosystem-13_repos-purple)](docs/ECOSYSTEM.md)
[![Docs](https://img.shields.io/badge/docs-auto--generated-brightgreen)](docs/)
[![Token Savings](https://img.shields.io/badge/token_savings-61--88%25-brightgreen)](docs/PRODUCTIVITY_WINS.md)
[![Speed](https://img.shields.io/badge/speed-5--18x_faster-blue)](docs/PRODUCTIVITY_WINS.md)

## 🎯 What is This?

A **comprehensive, reusable framework** for Claude Code featuring:

- **14 Production-Ready Agents** - Code quality, testing, UI/UX, project management, debugging
- **11 Productivity Skills** - **Simple, high-impact wins** (61-99.8% token savings, 5-20x faster)
- **Auto-Generated Documentation** - Individual READMEs with installation guides
- **Battle-Tested** - Used in production projects (SubsHero SaaS)
- **Unique Focus** - Only framework prioritizing **simple daily productivity wins**

**Perfect for**: JavaScript/TypeScript, PHP/Laravel, React, Python projects

---

## 🚀 Quick Navigation

<table>
<tr>
<td width="50%">

### 📚 Browse Framework

- **[Agent Catalog →](docs/AGENT_CATALOG.md)**
  13 agents categorized by type with benchmarks

- **[Skill Catalog →](docs/SKILL_CATALOG.md)**
  10 skills grouped by language and category

- **[Productivity Wins →](docs/PRODUCTIVITY_WINS.md)** ⭐
  Simple skills with 61-88% token savings

- **[Quick Start Guide →](docs/QUICKSTART.md)**
  5-minute setup for any project

</td>
<td width="50%">

### 🎓 Learn More

- **[Framework Summary →](docs/FRAMEWORK_SUMMARY.md)**
  Architecture, stats, and design principles

- **[Documentation System →](docs/DOCUMENTATION_SYSTEM.md)**
  How auto-generation works

- **[Ecosystem Reference →](docs/ECOSYSTEM.md)**
  Discover other Claude Code repositories

- **[Changelog →](CHANGELOG.md)**
  Version history and releases

</td>
</tr>
</table>

---

## ⭐ Featured Agents

<table>
<tr>
<td width="50%">

### 🔧 eslint-fixer
**Category**: Code Quality & Linting
**Speed**: ⚡⚡⚡⚡⚡ | **Efficiency**: 85% faster

Ultra-fast ESLint fixing with risk-based analysis (LOW/MEDIUM/HIGH). Feature-scoped for safer changes.

**[📖 Full Documentation](generic-claude-framework/agents/eslint-fixer/README.md)** | **[🎯 Quick Start](docs/QUICKSTART.md#fix-eslint)**

</td>
<td width="50%">

### 🎨 mockup-creation-agent
**Category**: UI/UX
**Speed**: ⚡⚡⚡⚡ | **Efficiency**: 80% faster

Generate HTML/CSS mockups with design system integration, dark/light themes, and screenshot reference.

**[📖 Full Documentation](generic-claude-framework/agents/mockup-creation-agent/README.md)** | **[🎯 Quick Start](docs/QUICKSTART.md#create-mockup)**

</td>
</tr>
<tr>
<td width="50%">

### 🧪 playwright-test-generator
**Category**: Testing & QA
**Speed**: ⚡⚡⚡ | **Complexity**: Medium

Automated browser test generation from user interactions. Creates Playwright tests with proper assertions.

**[📖 Full Documentation](generic-claude-framework/agents/playwright-test-generator/README.md)**

</td>
<td width="50%">

### 📦 changelog-version-manager
**Category**: Project Management
**Speed**: ⚡⚡⚡⚡ | **Complexity**: Low

Automated changelog updates and version releases with semantic versioning.

**[📖 Full Documentation](generic-claude-framework/agents/changelog-version-manager/README.md)**

</td>
</tr>
</table>

**[👉 View All 13 Agents →](docs/AGENT_CATALOG.md)**

---

## 📊 Framework Stats

| Metric | Value | Details |
|--------|-------|---------|
| **Agents** | 14 production-ready | [View Catalog →](docs/AGENT_CATALOG.md) |
| **Skills** | 11 utilities | [View Catalog →](docs/SKILL_CATALOG.md) |
| **Token Efficiency** | Up to 99.8% reduction | Optimized prompts & scripts |
| **Speed Improvement** | Up to 95% faster | Direct API access |
| **Documentation** | Auto-generated | [How it works →](docs/DOCUMENTATION_SYSTEM.md) |
| **Cross-Platform** | Windows, Mac, Linux | Tested on all platforms |

---

## ⚡ Quick Start (3 Steps)

### 1. Clone Framework

```bash
git clone https://github.com/yourusername/claude-code-framework.git
cd claude-code-framework
```

### 2. Copy to Your Project

```bash
# Copy generic framework to your project
cp -r generic-claude-framework/* /your-project/.claude/
```

### 3. Use in Claude Code

```
User: "Fix ESLint issues in src/"
Claude: I'll use the eslint-fixer agent...
```

**[📖 Full Setup Guide (5 minutes) →](docs/QUICKSTART.md)**

---

## 🎯 Use Cases

| I want to... | Use this | Documentation |
|--------------|----------|---------------|
| Fix ESLint issues safely | [eslint-fixer](generic-claude-framework/agents/eslint-fixer/README.md) | Risk-based fixing |
| Generate browser tests | [playwright-test-generator](generic-claude-framework/agents/playwright-test-generator/README.md) | E2E automation |
| Create UI mockups | [mockup-creation-agent](generic-claude-framework/agents/mockup-creation-agent/README.md) | Design prototyping |
| Run PHP tests | [pest-test-runner](generic-claude-framework/agents/pest-test-runner/README.md) | Coverage reports |
| Manage releases | [changelog-version-manager](generic-claude-framework/agents/changelog-version-manager/README.md) | Semantic versioning |
| Parse markdown efficiently | [markdown-helper skill](generic-claude-framework/skills/markdown-helper/README.md) | 61-85% token savings |
| Query database quickly | [sql-cli skill](generic-claude-framework/skills/sql-cli/README.md) | 87% faster than Tinker |

**[👉 Browse All Use Cases →](docs/AGENT_CATALOG.md)**

---

## 📚 Documentation

### For Users

- **[QUICKSTART.md](docs/QUICKSTART.md)** - Get started in 5 minutes
- **[AGENT_CATALOG.md](docs/AGENT_CATALOG.md)** - Complete agent reference (categorized)
- **[SKILL_CATALOG.md](docs/SKILL_CATALOG.md)** - All skills (by language & category)
- **[FRAMEWORK_SUMMARY.md](docs/FRAMEWORK_SUMMARY.md)** - Architecture & statistics

### For Contributors

- **[DOCUMENTATION_SYSTEM.md](docs/DOCUMENTATION_SYSTEM.md)** - How auto-docs work
- **[CLAUDE.md](CLAUDE.md)** - Project instructions for Claude Code
- **[CHANGELOG.md](CHANGELOG.md)** - Version history

### Individual Agent/Skill Docs

All agents and skills have **individual README files** with:
- Installation instructions
- Dependencies (npm, pip, composer, etc.)
- Benchmarks
- Usage examples
- Configuration options

**[Browse agents/](generic-claude-framework/agents/)** | **[Browse skills/](generic-claude-framework/skills/)**

---

## 🔧 Auto-Documentation System

This framework uses **Python-based auto-generation** for all documentation:

```bash
# Regenerate all documentation
npm run docs:generate

# Or use Python directly
python scripts/generate_docs.py
```

**Generates**:
- Individual README for each agent (13 files)
- Individual README for each skill (9 files)
- AGENT_CATALOG.md (categorized tables)
- SKILL_CATALOG.md (by language & category)

**[Learn more →](docs/DOCUMENTATION_SYSTEM.md)**

---

## 🎨 Agent Categories

Browse agents by category:

- **[Code Quality & Linting](docs/AGENT_CATALOG.md#code-quality--linting)** (1) - ESLint fixing
- **[Testing & QA](docs/AGENT_CATALOG.md#testing--qa)** (7) - Playwright, Pest, manual testing
- **[UI/UX & Design](docs/AGENT_CATALOG.md#uiux--design)** (2) - Mockups, design implementation
- **[Project Management](docs/AGENT_CATALOG.md#project-management)** (2) - Tasks, changelogs
- **[Development Utilities](docs/AGENT_CATALOG.md#development-utilities)** (1) - File watching

**[View Full Catalog →](docs/AGENT_CATALOG.md)**

---

## 🛠️ Skill Categories

Browse skills by category or language:

### By Category
- **[Utilities](docs/SKILL_CATALOG.md#utilities)** - General purpose tools
- **[Development Tools](docs/SKILL_CATALOG.md#development-tools)** - Dev aids
- **[Documentation](docs/SKILL_CATALOG.md#documentation)** - Doc generation

### By Language
- **[Python](docs/SKILL_CATALOG.md#python)** - Changelog manager, Lark integration
- **[JavaScript](docs/SKILL_CATALOG.md#javascript)** - Markdown helper
- **[Bash](docs/SKILL_CATALOG.md#bash)** - SQL CLI
- **[PHP](docs/SKILL_CATALOG.md#php)** - Time helper

**[View Full Catalog →](docs/SKILL_CATALOG.md)**

---

## 🚀 Performance Highlights

### Token Efficiency

| Agent/Skill | Traditional | Framework | Improvement |
|-------------|-------------|-----------|-------------|
| **eslint-fixer** | 30,000 tokens | 4,500 tokens | **85% reduction** |
| **markdown-helper** | 1,580 tokens | 270 tokens | **83% less** |
| **sql-cli** | 1,500 tokens | 200 tokens | **87% faster** |

### Speed Improvements

| Operation | Traditional | Framework | Improvement |
|-----------|-------------|-----------|-------------|
| **ESLint fixing** | 100-200s | 5-10s | **95% faster** |
| **Test generation** | Hours | Minutes | **90%+ time saved** |
| **Mockup creation** | Manual coding | Template-based | **80%+ time saved** |

---

## 🎓 Examples

### Example 1: Fix ESLint Issues

```
User: "Fix ESLint issues in the authentication module"

Agent Process:
1. Discovers authentication files using presets
2. Analyzes issues → categorizes by risk (LOW/MEDIUM/HIGH)
3. Presents options to user
4. Applies selected fixes
5. Provides testing guidance

Result: Safe, feature-scoped ESLint fixing
```

### Example 2: Generate Tests

```
User: "Generate Playwright tests for user registration"

Agent Process:
1. Navigates to registration page
2. Identifies form elements
3. Generates test scenarios
4. Creates Playwright test file
5. Validates execution

Result: Automated browser tests ready to run
```

### Example 3: Create Mockup

```
User: "Create mockup for settings page with dark mode"

Agent Process:
1. Loads design system config
2. Generates HTML/CSS with theme toggle
3. Implements light/dark modes
4. Saves to /mockups/pages/
5. Provides usage instructions

Result: Interactive mockup with theme switching
```

**[More Examples →](docs/QUICKSTART.md)**

---

## 🤝 Contributing

This framework thrives on community contributions!

### How to Contribute

1. **Add New Agents**
   - Create agent file with YAML frontmatter
   - Add to `generic-claude-framework/agents/`
   - Run `npm run docs:generate`
   - Submit PR

2. **Improve Documentation**
   - Update YAML metadata
   - Add benchmarks
   - Run doc generator
   - Submit PR

3. **Share Examples**
   - Add your project-specific implementations
   - Place in `generic-claude-framework/examples/` directory
   - Document customizations

**[Contribution Guidelines →](CONTRIBUTING.md)** (create this file)

---

## 📜 License

MIT License - See [LICENSE](LICENSE) file for details

---

## 🆘 Support

- **Documentation**: Start with [docs/](docs/) directory
- **Issues**: [GitHub Issues](https://github.com/yourusername/claude-code-framework/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/claude-code-framework/discussions)
- **Claude Code Docs**: https://docs.claude.com/en/docs/claude-code

---

## 🎯 Quick Links

| Resource | Description |
|----------|-------------|
| [Agent Catalog](docs/AGENT_CATALOG.md) | Browse all 13 agents by category |
| [Skill Catalog](docs/SKILL_CATALOG.md) | Browse all 9 skills by language |
| [Quick Start](docs/QUICKSTART.md) | 5-minute setup guide |
| [Framework Summary](docs/FRAMEWORK_SUMMARY.md) | Architecture & stats |
| [Documentation System](docs/DOCUMENTATION_SYSTEM.md) | Auto-generation details |
| [Changelog](CHANGELOG.md) | Version history |

---

**Status**: Production Ready ✅ | **Version**: 1.0.0 | **Last Updated**: 2025-10-21

**Made with** ❤️ **by the community** | **Powered by** [Claude Code](https://claude.com/claude-code)
