# Agent Catalog

Comprehensive guide to all agents in the Generic Claude Code Framework.

## 📋 Table of Contents

- [Code Quality & Linting](#code-quality--linting)
- [Testing & QA](#testing--qa)
- [UI/UX & Design](#uiux--design)
- [Project Management](#project-management)
- [Development Utilities](#development-utilities)

---

## Code Quality & Linting

### eslint-fixer

**Purpose**: Ultra-fast ESLint fixing with risk-based analysis

**Key Features**:
- 85% faster than traditional approaches (4,500 tokens vs 30,000)
- Risk-based categorization (LOW/MEDIUM/HIGH)
- Feature-scoped fixing for isolated changes
- TypeScript-optimized scripts
- Dry-run support

**Usage**:
```bash
node dist/preset-discover.js <feature-name>
node dist/fix.js --risk=medium <path>
```

**Best For**:
- JavaScript/TypeScript projects
- React applications
- Projects with ESLint configuration

**Customization Points**:
- `feature-presets.json` - Define your project features
- Risk classification rules
- File discovery patterns

---

## Testing & QA

### playwright-test-generator

**Purpose**: Automated Playwright test generation from user interactions

**Key Features**:
- Interactive browser test creation
- Automatic element locator generation
- Form filling and validation
- Network request verification
- Screenshot capture

**Usage**:
```
User: "Create a test for the login flow at localhost:3000"
Agent: Generates Playwright test with proper assertions
```

**Best For**:
- Web application E2E testing
- User journey automation
- Regression testing

**Customization Points**:
- Base URLs
- Test file organization
- Assertion strategies

---

### playwright-test-healer

**Purpose**: Debug and fix failing Playwright tests systematically

**Key Features**:
- Analyzes test failures
- Suggests fixes for common issues
- Debugs selector problems
- Handles timing issues
- Network failure diagnostics

**Usage**:
```
User: "The login test is failing, can you fix it?"
Agent: Debugs and fixes the test systematically
```

**Best For**:
- Maintaining test suites
- Debugging flaky tests
- Updating tests after UI changes

---

### playwright-test-planner

**Purpose**: Create comprehensive test plans for web applications

**Key Features**:
- Explores application structure
- Identifies test scenarios
- Creates test coverage plans
- Prioritizes test cases
- Documents test strategies

**Usage**:
```
User: "Create test scenarios for https://myapp.com/dashboard"
Agent: Explores and creates detailed test plan
```

**Best For**:
- New feature testing
- Test coverage planning
- QA strategy development

---

### pest-test-generator

**Purpose**: Generate comprehensive Pest PHP tests

**Key Features**:
- Analyzes Laravel codebase
- Creates Unit, Feature, and Integration tests
- Follows Pest best practices
- Maintains test registry
- Auto-detects test needs

**Usage**:
```
User: "Generate tests for UserController"
Agent: Creates comprehensive Pest test suite
```

**Best For**:
- Laravel applications
- PHP testing
- TDD workflows

**Customization Points**:
- Test file locations
- Test namespaces
- Database seeding strategies

---

### pest-test-runner

**Purpose**: Execute Pest tests with comprehensive coverage reporting

**Key Features**:
- Runs Unit, Feature, Integration tests
- Generates HTML coverage reports
- Logs execution results
- Detailed output formatting
- Coverage analysis

**Usage**:
```bash
bash .claude/scripts/pest/run-tests.sh
```

**Best For**:
- CI/CD pipelines
- Coverage tracking
- Test quality assurance

---

### test-steps-generator

**Purpose**: Generate comprehensive manual testing steps

**Key Features**:
- Analyzes code implementations
- Creates user workflow steps
- Structured test documentation
- Time estimates for testing
- Pass/fail criteria

**Usage**:
```
User: "Generate manual test steps for the checkout flow"
Agent: Creates detailed testing procedure
```

**Best For**:
- QA documentation
- User acceptance testing
- Manual testing procedures

---

### web-app-testing-agent

**Purpose**: Comprehensive frontend testing with Playwright

**Key Features**:
- Full application testing
- Responsive design validation
- Performance metrics
- Accessibility checks
- Cross-browser testing

**Usage**:
```
User: "Test the dashboard functionality"
Agent: Executes comprehensive frontend tests
```

**Best For**:
- Web application validation
- Integration testing
- Performance testing

**Customization Points**:
- Application URLs
- Test credentials
- Viewport configurations
- Performance thresholds

---

## UI/UX & Design

### mockup-creation-agent

**Purpose**: Rapid HTML/CSS mockup generation with design system integration

**Key Features**:
- Design system integration
- Dark/light theme support
- Responsive layouts
- Component library
- Screenshot reference capability

**Usage**:
```
User: "Create a mockup for the settings page"
Agent: Generates HTML/CSS with theme toggle
```

**Best For**:
- Design prototyping
- UI exploration
- Client presentations
- Design system validation

**Customization Points**:
- `mockup-config.json` - Design system colors, fonts, spacing
- Theme variables
- Component library
- Storage locations

**Design System Template**:
```json
{
  "application": {
    "name": "My App",
    "baseUrl": "http://localhost:3000"
  },
  "designSystem": {
    "primaryColor": "#1a73e8",
    "fontFamily": "Inter, sans-serif",
    "borderRadius": "8px"
  }
}
```

---

### ui-design-implementer

**Purpose**: Implement UI designs with visual validation

**Key Features**:
- Visual design comparison
- Automated screenshot validation
- CSS adjustments
- Pixel-perfect implementation
- Design-to-code workflow

**Usage**:
```
User: "Implement this design mockup for the dashboard"
Agent: Implements and validates against design
```

**Best For**:
- Design implementation
- Visual regression testing
- Design QA

---

## Project Management

### task-creator

**Purpose**: Create standardized project tasks with proper formatting

**Key Features**:
- Standardized task format
- Proper metadata
- Implementation steps
- Business analysis
- Structured documentation

**Usage**:
```
User: "Create a task for implementing social login"
Agent: Generates comprehensive task document
```

**Best For**:
- Project planning
- Task documentation
- Feature tracking

**Customization Points**:
- Task template format
- Metadata fields
- File naming conventions

---

### changelog-version-manager

**Purpose**: Manage changelogs and version releases

**Key Features**:
- Analyzes uncommitted changes
- Updates CHANGELOG.md
- Creates version releases
- Generates commit messages
- Automatic git operations

**Usage**:
```
User: "Update the changelog for the new subscription feature"
Agent: Analyzes changes, updates changelog, creates release
```

**Best For**:
- Release management
- Version tracking
- Documentation maintenance

**Customization Points**:
- Changelog format
- Versioning strategy (semantic, date-based)
- Commit message templates

---

## Development Utilities

### file-watcher-automation

**Purpose**: Automated file watching with customizable workflows

**Key Features**:
- Watches file changes
- Triggers automated tasks
- Customizable workflows
- Debouncing support
- Cross-platform compatible

**Usage**:
```bash
watchexec -e php ./vendor/bin/pest
watchexec -e tsx npm run lint
```

**Best For**:
- Continuous testing
- Auto-linting
- Development automation

**Customization Points**:
- Watch patterns
- Trigger commands
- Debounce timing
- File filters

---

## Agent Comparison Matrix

| Agent | Speed | Complexity | Customization | Best For |
|-------|-------|------------|---------------|----------|
| eslint-fixer | ⚡⚡⚡⚡⚡ | Low | Medium | Quick linting fixes |
| playwright-test-generator | ⚡⚡⚡ | Medium | High | E2E test creation |
| playwright-test-healer | ⚡⚡⚡⚡ | Medium | Low | Test debugging |
| playwright-test-planner | ⚡⚡ | High | High | Test strategy |
| pest-test-generator | ⚡⚡⚡⚡ | Medium | High | PHP test generation |
| pest-test-runner | ⚡⚡⚡⚡⚡ | Low | Low | Running PHP tests |
| test-steps-generator | ⚡⚡⚡ | Low | Medium | Manual test docs |
| mockup-creation-agent | ⚡⚡⚡⚡ | Medium | High | UI prototyping |
| ui-design-implementer | ⚡⚡⚡ | High | High | Design implementation |
| task-creator | ⚡⚡⚡⚡⚡ | Low | Medium | Task documentation |
| changelog-version-manager | ⚡⚡⚡⚡ | Low | Medium | Release management |
| file-watcher-automation | ⚡⚡⚡⚡⚡ | Low | Medium | Dev automation |
| web-app-testing-agent | ⚡⚡⚡ | High | High | Full app testing |

---

## Customization Difficulty Levels

### 🟢 Easy Customization
- **pest-test-runner** - Just update paths
- **task-creator** - Modify templates
- **file-watcher-automation** - Update watch patterns

### 🟡 Medium Customization
- **eslint-fixer** - Create feature presets
- **test-steps-generator** - Adjust templates
- **changelog-version-manager** - Configure versioning

### 🟠 Advanced Customization
- **playwright-test-generator** - Customize test patterns
- **mockup-creation-agent** - Full design system integration
- **web-app-testing-agent** - Application-specific configuration

---

## Agent Workflows

### Complete Testing Workflow

1. **Plan** → `playwright-test-planner`
2. **Generate** → `playwright-test-generator`
3. **Execute** → `web-app-testing-agent`
4. **Fix** → `playwright-test-healer`
5. **Document** → `test-steps-generator`

### Code Quality Workflow

1. **Lint** → `eslint-fixer` (LOW risk)
2. **Test** → `pest-test-generator` + `pest-test-runner`
3. **Fix Issues** → `eslint-fixer` (MEDIUM risk)
4. **Validate** → Re-run tests

### Design Implementation Workflow

1. **Prototype** → `mockup-creation-agent`
2. **Implement** → `ui-design-implementer`
3. **Test** → `web-app-testing-agent`
4. **Validate** → Visual comparison

### Release Workflow

1. **Fix Issues** → `eslint-fixer`
2. **Run Tests** → `pest-test-runner`
3. **Update Changelog** → `changelog-version-manager`
4. **Create Tasks** → `task-creator` (for next iteration)

---

## Tips for Agent Selection

### When to Use Which Agent?

**"I need to fix code quality issues"**
→ `eslint-fixer`

**"I want to create automated browser tests"**
→ `playwright-test-generator` or `web-app-testing-agent`

**"My Playwright tests are failing"**
→ `playwright-test-healer`

**"I need to plan testing for a new feature"**
→ `playwright-test-planner` + `test-steps-generator`

**"I want to create PHP tests"**
→ `pest-test-generator`

**"I need a quick UI prototype"**
→ `mockup-creation-agent`

**"I'm implementing a design mockup"**
→ `ui-design-implementer`

**"I need to document a new feature"**
→ `task-creator`

**"I'm preparing a release"**
→ `changelog-version-manager`

**"I want tests to run automatically on file changes"**
→ `file-watcher-automation`

---

## Next Steps

1. **Start Simple**: Begin with `eslint-fixer` or `mockup-creation-agent`
2. **Customize**: Adapt agents to your project structure
3. **Integrate**: Combine agents for complete workflows
4. **Extend**: Create custom agents based on these templates

For detailed usage of each agent, see individual agent files in `generic-claude-framework/agents/`.
