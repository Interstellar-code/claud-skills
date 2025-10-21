---
name: eslint-fixer
description: Ultra-fast ESLint fixing with TypeScript scripts. Risk-based analysis and selective fixing. Context-cached for repeated use (500 tokens after first use).
version: 3.0.0-typescript-optimized
---

# 🚀 ESLint Fixer Skill

**Context-cached skill for ultra-fast ESLint fixing**

## 📊 Performance (Skill vs Agent)

| Metric | Agent | Skill (1st) | Skill (2nd+) |
|--------|-------|-------------|--------------|
| Token Load | 4,500 | 4,500 | **500** |
| Execution | 5-10s | 5-10s | 5-10s |
| Context | Fresh | Fresh | **Cached** |

## 🎯 When to Use Skill vs Agent

**Use Skill when**:
- Fixing ESLint issues **multiple times** in same session
- Working on multiple files/components iteratively
- Want context caching benefits (90% token reduction after first use)

**Use Agent when**:
- One-off ESLint fix
- Different sessions/days
- Need isolated execution

## 🔧 Quick Usage

### Feature-Scoped (RECOMMENDED!)
```bash
# Discover feature files
node dist/preset-discover.js subscription-form

# Run ESLint on feature only
node dist/preset-discover.js subscription-form --with-eslint

# Fix issues
node dist/fix.js --risk=medium <file-list>
```

### Directory-Based
```bash
# Analyze specific path
node dist/report.js resources/js/components/admin

# Fix issues
node dist/fix.js --risk=low resources/js/components/admin
```

## 📦 Available Presets (13 total)

Core: subscription-form, subscription-dashboard, credential-import, calendar, settings, payments, notifications

Admin: admin-products, admin-bulk-operations

Auth: auth, onboarding

UI: theme, ui-components

Use `node dist/preset-discover.js --list` for details

## 🎯 Risk Levels

- 🟢 **LOW**: Unused vars, imports, formatting (safest)
- 🟡 **MEDIUM**: `any` types, missing types (type safety)
- 🔴 **HIGH**: Hook deps, breaking changes (manual review)

## 📋 Workflow

1. **Compile** (first time): `cd .claude/scripts/eslint && npx tsc`
2. **Report**: `node dist/report.js [path]`
3. **Fix**: `node dist/fix.js --risk=[level] [path]`
4. **Test**: Manual testing, `git diff`, commit

## 💡 Scripts

- **preset-discover.ts**: Feature-based file discovery (13 presets) - NEW!
- **discover.ts**: Smart discovery for custom features - NEW!
- **report.ts**: Human-readable CLI reports with risk breakdown
- **analyze.ts**: JSON output for programmatic use
- **fix.ts**: Selective risk-based fixing with dry-run
- **helpers.ts**: Risk classification and utilities

## ⚡ Context Caching Benefit

**First use** (4,500 tokens):
- Full skill instructions loaded
- TypeScript scripts explained
- Risk classification details

**Subsequent uses** (500 tokens):
- **90% cached** from previous use
- Only execution commands loaded
- Ultra-fast response

## 🚀 Example (Feature-Scoped)

```
User: "Fix ESLint in the subscription form"

Skill (1st use - 4,500 tokens):
  Discovering subscription-form files...
  Found 23 files. Running ESLint...
  5 MEDIUM issues in 3 files. Fix? [yes/no]

User: "yes"

Skill: Fixed 3 files! ✅
Test: Navigate to /app/subscriptions/create

--- Later in same session ---

User: "Fix ESLint in calendar feature"

Skill (2nd use - 500 tokens):
  Discovering calendar files... (instant, 90% cached)
  No issues found! ✅
```

### Why Feature-Scoped is Better

**Traditional approach**:
- Fix entire app → Hard to test → Risk breaking unrelated features

**Feature-scoped approach**:
- Fix subscription form → Test subscription form only → Much safer!
- Fix calendar → Test calendar only → Isolated testing
- Fix settings → Test settings only → Easy verification

## 📝 Manual Testing Workflow

1. Review changes: `git diff`
2. Run dev server: `npm run dev`
3. Test affected components
4. Commit if all good

---

**Key Advantage**: After first use, skill responses use 90% less tokens due to context caching, making repeated ESLint fixes in the same session extremely efficient.
