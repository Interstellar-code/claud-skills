# Quick Start Guide

Get up and running with the Generic Claude Code Framework in 5 minutes.

## 📋 Prerequisites

- Claude Code installed and configured
- Git for version control
- Node.js and npm (for TypeScript scripts)
- Basic understanding of your project structure

## 🚀 5-Minute Setup

### Step 1: Clone the Framework (1 minute)

```bash
git clone <this-repository> my-claude-framework
cd my-claude-framework
```

### Step 2: Copy to Your Project (2 minutes)

```bash
# Navigate to your project
cd /path/to/your/project

# Create .claude directory if it doesn't exist
mkdir -p .claude

# Copy the entire framework structure
cp -r /path/to/my-claude-framework/generic-claude-framework/* .claude/

# This will copy:
# - .claude/agents/          (13 production-ready agents)
# - .claude/skills/          (10 productivity skills)
# - .claude/commands/        (Slash commands if any)
# - .claude/scripts/         (Helper scripts)
```

**Important**: After copying, all agents and skills will be available in your project's `.claude/` directory and will auto-activate based on their trigger keywords.

### Step 3: Quick Test with ESLint Fixer (2 minutes)

```bash
# Navigate to the ESLint scripts directory
cd .claude/scripts/eslint

# Install dependencies
npm install

# Compile TypeScript scripts
npx tsc

# Test with a simple report
node dist/report.js src/
```

### Step 4: Customize Your First Agent (1 minute)

Open `.claude/agents/eslint-fixer.md` and update:

```markdown
# Before
BASE_URL="http://localhost:3000"

# After (Your Project)
BASE_URL="https://myapp.test"
```

## 🎯 Your First Tasks

### Task 1: Fix ESLint Issues (Easy)

```
User: "Fix ESLint issues in my authentication module"

Claude will:
1. Discover authentication files
2. Analyze ESLint issues
3. Categorize by risk level
4. Ask which risk level to fix
5. Apply fixes safely
6. Provide testing guidance
```

**Expected Time**: 5-10 minutes

### Task 2: Generate Tests (Medium)

```
User: "Generate Playwright tests for the login page at localhost:3000/login"

Claude will:
1. Navigate to the login page
2. Identify form elements
3. Generate test scenarios
4. Create Playwright test file
5. Validate test execution
```

**Expected Time**: 10-15 minutes

### Task 3: Create UI Mockup (Medium)

```
User: "Create a mockup for a settings page with dark mode support"

Claude will:
1. Load design system configuration
2. Generate HTML/CSS mockup
3. Implement theme toggle
4. Save to /mockups/pages/
5. Provide usage instructions
```

**Expected Time**: 5-10 minutes

## 🎯 How Skills & Agents Auto-Activate

Once installed in `.claude/`, skills and agents automatically activate based on keywords:

### Productivity Skills (Auto-Activate)

| Skill | Triggers | What It Does |
|-------|----------|--------------|
| **markdown-helper** | "extract headers", "parse tables", "markdown stats" | Save 61-85% tokens on markdown operations |
| **sql-cli** | "database", "query", "show tables", "count rows" | 87% faster than Artisan Tinker for SQL queries |
| **cli-modern-tools** | "cat", "ls", "find" (when using Bash) | Auto-suggest bat, eza, fd alternatives |
| **changelog-manager** | "update changelog", "prepare release", "bump version" | Automate version releases with git tags |

### Example Auto-Activation

```
User: "Extract headers from README.md"
→ markdown-helper skill activates automatically
→ Runs: node .claude/skills/markdown-helper/md-helper.js extract-headers README.md
→ Shows headers without reading full file (85% token savings)

User: "How many active subscriptions do we have?"
→ sql-cli skill activates automatically
→ Runs: bash .claude/skills/sql-cli/sql-cli.sh count subscriptions "status='active'"
→ Shows result instantly (87% faster than Tinker)

User: "Update changelog and prepare release"
→ changelog-manager skill activates automatically
→ Analyzes changes → Updates files → Creates tag → Pushes to GitHub
```

**No manual invocation needed** - just use natural language!

## 📚 Essential Configurations

### ESLint Fixer - Feature Presets

Create `.claude/scripts/eslint/feature-presets.json`:

```json
{
  "authentication": {
    "description": "Authentication and authorization",
    "paths": ["src/auth/", "src/components/auth/"],
    "patterns": ["*auth*", "*login*", "*register*"]
  },
  "dashboard": {
    "description": "Main dashboard",
    "paths": ["src/dashboard/"],
    "patterns": ["*dashboard*", "*widget*"]
  }
}
```

### Mockup Agent - Design System

Create `.claude/mockup-config.json`:

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

### Test Agent - Environment

Create `.claude/.env` (add to .gitignore):

```bash
# Development URLs
DEV_URL=http://localhost:3000
ADMIN_URL=http://localhost:3000/admin

# Test Credentials (Use test accounts only!)
TEST_USER_EMAIL=test@example.com
TEST_USER_PASSWORD=testpassword123
TEST_ADMIN_EMAIL=admin@example.com
TEST_ADMIN_PASSWORD=adminpassword123

# Browser Configuration
DEFAULT_VIEWPORT_WIDTH=1920
DEFAULT_VIEWPORT_HEIGHT=1080
DEFAULT_TIMEOUT=30000
```

## 🎨 Common Workflows

### Workflow 1: Code Quality Improvement

```bash
# 1. Fix low-risk ESLint issues
User: "Fix ESLint low-risk issues in src/"

# 2. Run tests to ensure no breakage
User: "Run the test suite"

# 3. Fix medium-risk issues
User: "Fix ESLint medium-risk issues in src/"

# 4. Run tests again
User: "Run the test suite"

# 5. Commit changes
User: "Commit the ESLint fixes"
```

**Total Time**: 15-20 minutes

### Workflow 2: New Feature Testing

```bash
# 1. Create test plan
User: "Create a test plan for the new checkout feature"

# 2. Generate automated tests
User: "Generate Playwright tests for the checkout flow"

# 3. Create manual test steps
User: "Generate manual test steps for the checkout process"

# 4. Execute tests
User: "Run the checkout tests"
```

**Total Time**: 30-45 minutes

### Workflow 3: UI Prototype → Implementation

```bash
# 1. Create mockup
User: "Create a mockup for the user profile settings page"

# 2. Review and iterate
# Open mockup in browser, provide feedback

# 3. Implement from mockup
User: "Implement the profile settings page based on the mockup"

# 4. Generate tests
User: "Generate tests for the profile settings page"
```

**Total Time**: 45-60 minutes

## 🔧 Troubleshooting

### Issue: TypeScript Scripts Won't Compile

```bash
cd .claude/scripts/eslint
rm -rf node_modules dist
npm install
npx tsc
```

### Issue: Agent Not Found

Claude Code caches agents. Reload:
1. Close Claude Code
2. Reopen Claude Code
3. Try again

### Issue: Permission Denied

```bash
# Make scripts executable
chmod +x .claude/scripts/**/*.sh
```

### Issue: ESLint Not Finding Issues

Check ESLint configuration:
```bash
# Ensure ESLint is installed
npm list eslint

# Verify ESLint config exists
ls -la eslint.config.js  # or .eslintrc.js
```

## 📖 Next Steps

### Beginner Path

1. ✅ Complete the 5-minute setup
2. ✅ Test with `eslint-fixer`
3. ⬜ Try `mockup-creation-agent`
4. ⬜ Experiment with `playwright-test-generator`
5. ⬜ Read the Agent Catalog

### Intermediate Path

6. ⬜ Customize feature presets
7. ⬜ Set up design system config
8. ⬜ Create project-specific test workflows
9. ⬜ Integrate with CI/CD

### Advanced Path

10. ⬜ Create custom agents
11. ⬜ Extend existing agents
12. ⬜ Contribute back to framework
13. ⬜ Share with community

## 📚 Additional Resources

- **Full Documentation**: See [README.md](../README.md)
- **Agent Reference**: See [AGENT_CATALOG.md](./AGENT_CATALOG.md)
- **Examples**: Browse `examples/agents/` for real implementations
- **Claude Code Docs**: https://docs.claude.com/en/docs/claude-code

## 💡 Pro Tips

### Tip 1: Start Feature-Scoped
Always scope work to specific features/modules. This:
- Reduces risk
- Makes testing easier
- Provides clearer results
- Enables incremental improvements

### Tip 2: Use Risk Levels Wisely
```
🟢 LOW RISK - Safe for production, immediate application
🟡 MEDIUM RISK - Requires testing, but generally safe
🔴 HIGH RISK - Manual review required, careful testing
```

### Tip 3: Commit Often
Commit after each successful agent operation:
```bash
# After fixing low-risk ESLint issues
git add .
git commit -m "fix: ESLint low-risk issues in auth module"

# After fixing medium-risk issues
git add .
git commit -m "fix: ESLint medium-risk type safety improvements"
```

### Tip 4: Use Dry-Run First
For risky operations, always dry-run first:
```bash
# Preview changes without applying
node dist/fix.js --risk=medium --dry-run src/
```

### Tip 5: Reference Examples
When customizing agents, reference `examples/agents/`:
```bash
# See how SubsHero customized the test agent
cat examples/agents/subshero-test-agent.md

# Use as template for your project
cp examples/agents/subshero-test-agent.md .claude/agents/my-app-test-agent.md
```

## 🎉 Success Checklist

After completing quickstart, you should be able to:

- ✅ Fix ESLint issues with `eslint-fixer`
- ✅ Generate HTML/CSS mockups
- ✅ Understand agent configuration
- ✅ Navigate the framework structure
- ✅ Customize agents for your project
- ✅ Use risk-based workflows
- ✅ Find additional documentation

## 🆘 Getting Help

**Framework Issues**:
- Check `docs/AGENT_CATALOG.md` for agent-specific help
- Review `examples/` for working implementations
- Open an issue on GitHub

**Claude Code Issues**:
- Visit https://docs.claude.com/en/docs/claude-code
- Check Claude Code GitHub issues

**Best Practices**:
- See [README.md](../README.md) for security guidelines
- Follow risk-based workflows
- Test incrementally

---

**Ready to go?** Start with Task 1: Fix ESLint Issues!

```
User: "Fix ESLint low-risk issues in my src/ directory"
```

Happy coding! 🚀
