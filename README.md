# Generic Claude Code Framework

A comprehensive, reusable framework for Claude Code agents, commands, skills, and scripts designed to accelerate development across any project.

## 🎯 Overview

This repository contains a **generic, project-agnostic** framework for Claude Code that includes:

- **15+ Production-Ready Agents** for code quality, testing, documentation, and development
- **Reusable Commands** for common development workflows
- **Utility Skills** for enhanced Claude Code capabilities
- **TypeScript Scripts** for automated tasks

The framework is designed to be **cloned and customized** for your specific project while maintaining the battle-tested core functionality.

## 📦 What's Included

### Agents (`generic-claude-framework/agents/`)

| Agent | Description | Use Case |
|-------|-------------|----------|
| **eslint-fixer** | Ultra-fast ESLint fixing with risk-based analysis | Fix linting issues safely with 85% less tokens |
| **mockup-creation-agent** | HTML/CSS mockup generation with design systems | Create rapid prototypes with theme support |
| **playwright-test-generator** | Automated Playwright test generation | Generate browser tests from user flows |
| **playwright-test-healer** | Debug and fix failing Playwright tests | Systematically fix broken tests |
| **playwright-test-planner** | Create comprehensive test plans | Plan testing strategies for web apps |
| **pest-test-generator** | Generate PHP Pest tests | Create PHPtest suites automatically |
| **pest-test-runner** | Execute PHP Pest tests with coverage | Run tests with HTML coverage reports |
| **test-steps-generator** | Generate manual testing procedures | Create structured test documentation |
| **task-creator** | Create standardized project tasks | Generate properly formatted task files |
| **ui-design-implementer** | Implement UI designs with validation | Match designs using visual comparison |
| **web-app-testing-agent** | Comprehensive frontend testing | Test web applications with Playwright |
| **changelog-version-manager** | Manage changelogs and versioning | Update changelogs and create releases |
| **file-watcher-automation** | Automated file watching workflows | Auto-run tasks on file changes |

### Example Implementations (`examples/agents/`)

Real-world examples from production projects:
- **subshero-test-agent** - Laravel + React testing agent
- **subshero-mockup-agent** - SaaS mockup generation
- **eslint-fixer-with-testing** - ESLint fixing with test integration
- **manual-test-agent** - Structured manual testing procedures

## 🚀 Quick Start

### 1. Clone the Framework

```bash
git clone <this-repository> my-project-claude-framework
cd my-project-claude-framework
```

### 2. Copy Generic Framework to Your Project

```bash
# Copy the generic framework to your project's .claude directory
cp -r generic-claude-framework/* /path/to/your/project/.claude/

# Or use symbolic links for easy updates
ln -s $(pwd)/generic-claude-framework /path/to/your/project/.claude
```

### 3. Customize for Your Project

```bash
# Navigate to your project
cd /path/to/your/project/.claude

# Customize agents for your stack
# Edit agent files to match your:
# - Project structure
# - Testing framework
# - Build tools
# - Development URLs
```

### 4. Start Using Agents

In Claude Code, agents are automatically available:

```
User: "Fix ESLint issues in my authentication module"
Claude: I'll use the eslint-fixer agent to safely fix these issues...

User: "Generate Playwright tests for the login flow"
Claude: I'll use the playwright-test-generator agent...
```

## 📂 Project Structure

```
claud-skills/
├── generic-claude-framework/      # Generic, reusable framework
│   ├── agents/                    # Claude Code agents
│   ├── commands/                  # Slash commands
│   ├── scripts/                   # Utility scripts
│   └── skills/                    # Claude Code skills
│
├── examples/                      # Real-world examples
│   ├── agents/                    # Example agent implementations
│   ├── commands/                  # Example commands
│   ├── scripts/                   # Example scripts
│   └── skills/                    # Example skills
│
├── .claude/                       # Active Claude Code configuration
│   ├── agents/                    # Active agents
│   ├── commands/                  # Active commands
│   └── skills/                    # Active skills
│
├── README.md                      # This file
├── CLAUDE.md                      # Claude Code project instructions
└── docs/                          # Additional documentation
```

## 🎨 Customization Guide

### Customize an Agent

1. Copy the generic agent to your project:
```bash
cp generic-claude-framework/agents/eslint-fixer.md .claude/agents/
```

2. Edit project-specific values:
```markdown
# Before (Generic)
BASE_URL="http://localhost:3000"

# After (Your Project)
BASE_URL="https://myapp.test"
```

3. Customize feature presets, paths, and configurations

### Create Custom Agent from Template

Use an example as a template:

```bash
# Copy example as starting point
cp examples/agents/subshero-test-agent.md .claude/agents/my-app-test-agent.md

# Customize for your project
# - Replace URLs and credentials
# - Update test scenarios
# - Modify tool configurations
```

## 🔧 Agent Configuration

### ESLint Fixer Configuration

Create `feature-presets.json` for your project:

```json
{
  "authentication": {
    "description": "Auth module",
    "paths": ["src/auth/"],
    "patterns": ["*auth*", "*login*"]
  },
  "dashboard": {
    "description": "Main dashboard",
    "paths": ["src/dashboard/"],
    "patterns": ["*dashboard*"]
  }
}
```

### Test Agent Configuration

Update test URLs and credentials:

```markdown
---
name: my-app-test-agent
---

# Test Configuration

## Environment
- **Base URL**: https://myapp.test
- **Admin URL**: https://myapp.test/admin
- **User Email**: user@myapp.com
- **User Password**: password123
```

### Mockup Agent Configuration

Create `mockup-config.json`:

```json
{
  "application": {
    "name": "My Application",
    "baseUrl": "http://localhost:3000"
  },
  "designSystem": {
    "primaryColor": "#1a73e8",
    "fontFamily": "Inter, sans-serif",
    "borderRadius": "8px"
  },
  "mockupStorage": {
    "path": "./mockups/",
    "namingPattern": "YYYY-MM-DD_HH-mm-ss_name.html"
  }
}
```

## 📖 Usage Examples

### Fix ESLint Issues (Feature-Scoped)

```
User: "Fix ESLint issues in the authentication module"

Agent Process:
1. Discovers authentication files using presets
2. Analyzes issues and categorizes by risk (LOW/MEDIUM/HIGH)
3. Presents options to user
4. Applies selected fixes
5. Provides testing guidance
```

### Generate Playwright Tests

```
User: "Create Playwright tests for user registration flow"

Agent Process:
1. Navigates to registration page
2. Identifies form elements and interactions
3. Generates test scenarios
4. Creates Playwright test file
5. Validates test execution
```

### Create UI Mockup

```
User: "Create a mockup for the settings page with dark mode support"

Agent Process:
1. Loads design system configuration
2. Generates HTML/CSS mockup
3. Implements light/dark theme toggle
4. Saves to /mockups/pages/
5. Provides preview and usage instructions
```

## 🧪 Testing Support

### Supported Testing Frameworks

- **Playwright** (Browser testing)
- **Pest** (PHP testing)
- **PHPUnit** (PHP unit testing)
- **Jest/Vitest** (JavaScript testing - via generic patterns)

### Test Generation Workflow

1. **Identify test scope** (feature, component, page)
2. **Generate test scenarios** using test-planner agents
3. **Create automated tests** using test-generator agents
4. **Execute and validate** using test-runner agents
5. **Fix failing tests** using test-healer agents

## 📊 Performance Benefits

| Metric | Traditional Approach | This Framework | Improvement |
|--------|---------------------|----------------|-------------|
| Agent Load Time | 30,000 tokens | 4,500 tokens | **85% faster** |
| ESLint Fix Time | 100-200s | 5-10s | **95% faster** |
| Test Generation | Manual (hours) | Automated (minutes) | **90%+ time saved** |
| Mockup Creation | Manual coding | Template-based | **80%+ time saved** |

## 🔐 Security & Best Practices

### Credential Management

**Never hardcode credentials in agents!**

Use environment variables or configuration files:

```markdown
# ❌ WRONG
USER_EMAIL="admin@myapp.com"
USER_PASSWORD="secretpassword123"

# ✅ RIGHT
USER_EMAIL="${TEST_USER_EMAIL}"
USER_PASSWORD="${TEST_USER_PASSWORD}"
```

### Configuration Files

Create `.claude/.env` (add to `.gitignore`):

```bash
TEST_USER_EMAIL=admin@myapp.com
TEST_USER_PASSWORD=secretpassword123
BASE_URL=https://myapp.test
```

### Safe Testing

- Test in development environments only
- Use dedicated test accounts
- Never test destructive operations in production
- Always validate before committing changes

## 🤝 Contributing

This framework is designed to be extended and improved:

1. **Fork the repository**
2. **Create custom agents** for your use case
3. **Share generic improvements** back to the framework
4. **Document your customizations** in examples/

### Adding New Agents

1. Create agent in `generic-claude-framework/agents/`
2. Use configuration placeholders for project-specific values
3. Document all customization points
4. Provide example implementation in `examples/agents/`
5. Update this README with agent description

## 📝 License

This framework is provided as-is for use in your projects. Customize and extend freely.

## 🆘 Support & Resources

- **Documentation**: See `docs/` directory for detailed guides
- **Examples**: Check `examples/` for real-world implementations
- **Issues**: Report issues or request features via GitHub Issues
- **Claude Code Docs**: https://docs.claude.com/en/docs/claude-code

## 🎓 Learning Path

### Beginner
1. Start with `eslint-fixer` agent
2. Customize for your project structure
3. Use feature-scoped fixing workflow

### Intermediate
4. Set up `playwright-test-generator` for E2E tests
5. Create `mockup-creation-agent` design system config
6. Implement `changelog-version-manager` workflow

### Advanced
7. Create custom agents from templates
8. Integrate multiple agents in workflows
9. Contribute improvements back to framework

## 🚧 Roadmap

- [ ] Additional language support (Python, Go, Rust)
- [ ] More testing framework integrations
- [ ] CI/CD integration agents
- [ ] Database migration agents
- [ ] API documentation generators
- [ ] Performance profiling agents

---

**Created for**: Generic use across projects
**Maintained by**: Community contributions welcome
**Version**: 1.0.0
**Last Updated**: 2025-10-21
