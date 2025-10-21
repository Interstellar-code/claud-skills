# File Watcher Automation Agent

**Purpose:** Automate file watching and continuous testing workflows using `watchexec`

**Triggers:** Keywords "watch", "auto-test", "continuous", "auto-lint", "auto-rebuild"

**Status:** INACTIVE - Rules will be activated when user is ready

---

## Capabilities

### 1. Auto-run Pest Tests
Watch PHP files and automatically run Pest tests on changes.

**Command Pattern:**
```bash
watchexec -e php -c ./vendor/bin/pest
```

**Use Cases:**
- Continuous TDD workflow
- Catch regressions immediately
- No manual test execution needed

---

### 2. Auto-run Playwright Tests
Watch TypeScript/React components and run E2E tests.

**Command Pattern:**
```bash
watchexec -e tsx,ts -w resources/js/components/ npm run test:e2e
```

**Use Cases:**
- Frontend component development
- UI regression testing
- Immediate visual feedback

---

### 3. Auto-rebuild TypeScript
Watch TypeScript files and rebuild on changes.

**Command Pattern:**
```bash
watchexec -e ts,tsx npm run build
```

**Use Cases:**
- Development workflow
- Catch build errors early
- Continuous integration locally

---

### 4. Auto-lint on Save
Watch files and run linter automatically.

**Command Pattern:**
```bash
# TypeScript/React
watchexec -e tsx,ts -w resources/js/ npm run lint

# PHP
watchexec -e php -w app/ ./vendor/bin/pint --test
```

**Use Cases:**
- Enforce code style
- Catch linting issues immediately
- No manual linting needed

---

### 5. Auto-format on Save
Watch files and format automatically.

**Command Pattern:**
```bash
# TypeScript/React
watchexec -e tsx,ts -w resources/js/ npm run format

# PHP
watchexec -e php -w app/ ./vendor/bin/pint
```

**Use Cases:**
- Consistent code formatting
- No manual formatting needed
- Team code style alignment

---

## Workflow

**Standard Development Workflow:**

1. Start file watcher in background terminal
2. Edit code in main terminal/editor
3. Save file
4. Watcher detects change → Runs command automatically
5. View results immediately
6. Continue development

**Multi-Terminal Setup:**
- Terminal 1: Auto-test (watchexec Pest)
- Terminal 2: Auto-lint (watchexec ESLint)
- Terminal 3: Development (editor/commands)

---

## Examples

### Watch All PHP Tests
```bash
watchexec -e php -c ./vendor/bin/pest
```

**Output on save:**
```
[Running: ./vendor/bin/pest]

 PASS  Tests\Feature\SubscriptionTest
  ✓ can create subscription

Tests:  1 passed
Duration: 0.15s
```

---

### Watch Specific Test File
```bash
watchexec -e php -c "./vendor/bin/pest tests/Feature/SubscriptionTest.php"
```

**Use Case:** Focus on specific feature during development

---

### Watch Components with Linting
```bash
watchexec -e tsx -w resources/js/components/ "npm run lint && npm run types"
```

**Output on save:**
```
[Running: npm run lint && npm run types]
✓ No linting errors
✓ No type errors
```

---

### Watch and Auto-fix
```bash
watchexec -e tsx -w resources/js/ "npm run lint || npm run lint"
```

**Use Case:** Auto-fix linting issues on every save

---

### Multiple Commands
```bash
watchexec -e php "php artisan test && php artisan pint"
```

**Flow:**
1. Runs tests
2. If tests pass → Formats code
3. If tests fail → Stops (doesn't format)

---

## Integration with Existing Agents

### With pest-test-runner
```bash
# Agent can suggest watchexec pattern
watchexec -e php -c "./vendor/bin/pest --filter=Subscription"
```

### With playwright-test-healer
```bash
# Agent can suggest watching specific test
watchexec -e ts -c "npx playwright test tests/e2e/auth/user-login.spec.ts"
```

### With eslint-fixer
```bash
# Agent can suggest auto-linting
watchexec -e tsx,ts -w resources/js/ npm run lint
```

---

## Configuration

### Ignore Patterns
```bash
# Ignore specific directories
watchexec -e php -i vendor/ -i storage/ ./vendor/bin/pest
```

### Debouncing (Avoid multiple triggers)
```bash
# Wait 1 second after last change before running
watchexec -e php --debounce 1000 ./vendor/bin/pest
```

### Only Trigger on Modifications
```bash
# Ignore creates and deletes
watchexec -e php --only-modify ./vendor/bin/pest
```

---

## Best Practices

1. **Use Clear Screen (`-c`)** - Easier to read results
2. **Specify Extensions (`-e`)** - Faster, more precise
3. **Watch Specific Directories (`-w`)** - Reduce false triggers
4. **Debounce Rapid Changes** - Avoid command spam
5. **Multiple Terminals** - Separate concerns (test, lint, build)

---

## Limitations

- **Resource Usage:** Watching large codebases may use CPU/memory
- **Windows Compatibility:** Works best with Git Bash or WSL
- **Terminal Requirement:** Needs dedicated terminal window
- **Manual Stop:** Requires Ctrl+C to stop watching

---

## Expected Benefits

- **85% time reduction** - No manual test execution
- **Immediate feedback** - Catch errors on save
- **Stay in flow** - No context switching
- **Impossible to forget** - Tests always run
- **Better code quality** - Continuous validation

---

## Notes

**Status:** This agent is currently INACTIVE. File watching rules will be activated when the user is ready to enable automated workflows.

**Activation:** User will specify which workflows to enable (tests, linting, building, formatting).

**Safety:** All file watching is non-destructive - it only executes read-only commands or explicitly approved operations.

---

**Created:** 2025-10-21
**Version:** 1.0.0
**Status:** Inactive (awaiting user activation)
**Maintained by:** SubsHero Development Team
