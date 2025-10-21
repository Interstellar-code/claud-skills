# Documentation System

**Auto-Generated Documentation for Generic Claude Code Framework**

## Overview

This framework uses a **Python-based documentation generator** that automatically creates:

1. **Individual README files** for each agent (with installation instructions, benchmarks, dependencies)
2. **Individual README files** for each skill (with installation instructions, benchmarks, dependencies)
3. **AGENT_CATALOG.md** - Categorized catalog of all agents
4. **SKILL_CATALOG.md** - Categorized catalog of all skills
5. **Auto-updated statistics** for main README

## System Architecture

```
Documentation Generator (Python)
├── Scans agents/ directory
├── Scans skills/ directory
├── Extracts YAML frontmatter metadata
├── Generates individual READMEs
└── Generates categorized catalogs
```

## Quick Usage

### Generate All Documentation

```bash
# Using Python directly
python scripts/generate_docs.py

# Or using npm script
npm run docs:generate
```

### Output

```
docs/
├── agents/                    # Individual agent READMEs
│   ├── eslint-fixer.md
│   ├── mockup-creation-agent.md
│   └── ... (13 total)
│
├── skills/                    # Individual skill READMEs
│   ├── changelog-manager.md
│   ├── markdown-helper.md
│   └── ... (9 total)
│
├── AGENT_CATALOG.md          # All agents, categorized
└── SKILL_CATALOG.md          # All skills, categorized
```

## YAML Frontmatter Format

### For Agents

Add this to the top of each agent file:

```yaml
---
name: agent-name
category: Code Quality & Linting  # Or Testing & QA, UI/UX, etc.
description: Short description of what this agent does
speed: 5                          # 1-5 stars (5 = fastest)
complexity: Low                   # Low, Medium, or High
token_efficiency: 85              # Percentage improvement (optional)
featured: true                    # Show in featured section
tags: [javascript, typescript, eslint]  # Relevant tags
version: 3.0.0
---
```

### For Skills

Add this to skill.md or SKILL.md:

```yaml
---
name: skill-name
category: Utilities              # Or Development Tools, etc.
description: Short description of what this skill does
language: Python                 # Python, JavaScript, Bash, PHP
token_savings: 61                # Percentage savings (optional)
featured: true                   # Show in featured section
tags: [markdown, parsing, documentation]
version: 1.0.0
---
```

## Categories

### Agent Categories

- **Code Quality & Linting** - ESLint, code formatting, linting
- **Testing & QA** - Playwright, Pest, test generation
- **UI/UX & Design** - Mockups, design implementation
- **Project Management** - Task creation, changelog management
- **Development Utilities** - File watching, automation

### Skill Categories

- **Utilities** - General purpose tools
- **Development Tools** - Development aids
- **Documentation** - Documentation generation
- **Testing** - Testing utilities
- **Automation** - Automation scripts

## Generated README Structure

Each agent/skill README includes:

### 1. Header
- Name and description
- Category and version
- Quick info table (speed, complexity, efficiency, tags)

### 2. Overview
- Detailed description
- Use cases

### 3. Benchmarks
- Performance comparisons
- Token efficiency metrics
- Speed improvements

### 4. Installation (Comprehensive)
- **Step 1**: Copy files
- **Step 2**: Install dependencies (language-specific)
  - For TypeScript/ESLint agents: ESLint, TypeScript setup
  - For Playwright agents: Playwright installation
  - For PHP agents: Pest/Composer setup
  - For Python skills: pip requirements
  - For JavaScript skills: npm packages
  - For Bash skills: chmod permissions
- **Step 3**: Configuration steps
- **Step 4**: Verification

### 5. Usage
- Example commands
- Usage patterns

### 6. Documentation Links
- Source file path
- Related agents/skills

### 7. Metadata
- Last updated date
- Maintainer
- Status

## Benchmark System

### Adding Benchmarks

Benchmarks are automatically extracted from markdown tables in agent/skill files.

**Format**:

```markdown
## Benchmarks

| Operation | Traditional Method | Time | Framework Method | Time | Improvement |
|-----------|-------------------|------|------------------|------|-------------|
| ESLint Fix | Manual approach | 100s | Automated script | 5s | **95% faster** |
```

### Example Comparisons

```markdown
| Operation | Native Tool | Time | This Tool | Time | Improvement |
|-----------|-------------|------|-----------|------|-------------|
| File search | `find . -name "*.ts"` | 2000ms | `fd "\.ts$"` | 110ms | **94% faster** |
| Content search | `grep -r "pattern"` | 1500ms | `rg "pattern"` | 200ms | **87% faster** |
| Markdown parsing | Read entire file | 1580 tokens | Extract structure | 270 tokens | **83% less** |
```

## Catalog Features

### AGENT_CATALOG.md

**Sections**:
1. **By Category** - Grouped tables by category
2. **All Agents (Alphabetical)** - Complete sorted list
3. **Featured Agents** - Highlighted top picks
4. **Legend** - Speed rating and complexity explanations

**Auto-Generated**:
- Total agent count
- Last updated timestamp
- Category groupings
- Speed emoji ratings (⚡⚡⚡⚡⚡)
- Complexity badges (Low/Medium/High)

### SKILL_CATALOG.md

**Sections**:
1. **By Category** - Grouped by skill category
2. **By Language** - Grouped by programming language
3. **All Skills (Alphabetical)** - Complete sorted list

**Auto-Generated**:
- Total skill count
- Last updated timestamp
- Language groupings
- Token savings percentages

## Workflow Integration

### When to Regenerate

Run `npm run docs:generate` after:

1. **Adding new agents** - New agent files in `generic-claude-framework/agents/`
2. **Adding new skills** - New skill directories in `.claude/skills/`
3. **Updating frontmatter** - Changes to YAML metadata
4. **Modifying descriptions** - Updates to agent/skill descriptions
5. **Before releases** - Ensure documentation is current

### Git Integration

```bash
# Generate docs
npm run docs:generate

# Review changes
git diff docs/

# Commit if satisfied
git add docs/
git commit -m "docs: regenerate agent and skill documentation"
```

### CI/CD Integration

Add to your CI pipeline:

```yaml
# .github/workflows/docs.yml
name: Update Documentation

on:
  push:
    paths:
      - 'generic-claude-framework/agents/**'
      - '.claude/skills/**'

jobs:
  update-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Generate docs
        run: python scripts/generate_docs.py
      - name: Commit changes
        run: |
          git config --global user.name "GitHub Actions"
          git config --global user.email "actions@github.com"
          git add docs/
          git commit -m "docs: auto-update documentation" || echo "No changes"
          git push
```

## Customization

### Modifying Templates

Edit `scripts/generate_docs.py`:

1. **Agent README template**: `generate_agent_readme()` function
2. **Skill README template**: `generate_skill_readme()` function
3. **Catalog template**: `generate_agent_catalog()` and `generate_skill_catalog()`

### Adding New Metadata Fields

1. Update `@dataclass` definitions (`Agent` and `Skill` classes)
2. Update `parse_agent()` and `parse_skill()` methods
3. Update README templates to display new fields

### Custom Categories

Edit categories in frontmatter:

```yaml
category: Your Custom Category
```

The system automatically groups by any category name.

## Maintenance

### Regular Tasks

- **Monthly**: Review and update frontmatter metadata
- **Before releases**: Regenerate all documentation
- **After major changes**: Update benchmark data
- **Quarterly**: Review and update use cases

### Quality Checks

```bash
# Check for missing frontmatter
python scripts/check_frontmatter.py  # (create this script)

# Validate generated output
ls docs/agents/ | wc -l  # Should match agent count
ls docs/skills/ | wc -l  # Should match skill count
```

## Performance

**Generation Speed**:
- ~0.5 seconds per agent/skill
- Total generation time: ~10-15 seconds for entire framework

**Token Efficiency**:
- Individual READMEs: 500-1000 tokens each
- Catalogs: ~2000-3000 tokens each
- Total documentation: ~20,000 tokens (vs. ~100,000+ manually)

## Troubleshooting

### Issue: "Directory not found"

**Solution**: Run from project root directory

```bash
cd /path/to/claud-skills
python scripts/generate_docs.py
```

### Issue: "No agents/skills found"

**Solution**: Check directory paths in script

```python
self.agents_dir = self.root_dir / "generic-claude-framework" / "agents"
self.skills_dir = self.root_dir / ".claude" / "skills"
```

### Issue: Unicode errors on Windows

**Solution**: Script automatically handles Windows encoding issues

### Issue: Missing benchmarks

**Solution**: Add benchmark tables to agent/skill markdown files

## Future Enhancements

Planned features:

- [ ] Watch mode for automatic regeneration
- [ ] Benchmark extraction from actual usage data
- [ ] Integration test coverage in READMEs
- [ ] Dependency tree visualization
- [ ] Version history tracking
- [ ] Cross-referencing related agents/skills
- [ ] Search index generation
- [ ] Performance metrics dashboard

---

**Version**: 1.0.0
**Last Updated**: 2025-10-21
**Maintainer**: Community
**Status**: Production Ready
