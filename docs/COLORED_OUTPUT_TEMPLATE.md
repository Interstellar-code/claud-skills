# Colored Output Template for Skills & Agents

**Use this template to add colored, icon-enhanced output to any skill or agent!**

## 🎨 Why Use Colored Output?

✅ Makes skill/agent execution visually distinct from regular Claude responses
✅ Improves user experience significantly
✅ Easy to spot errors, warnings, and successes
✅ Works in all modern terminals (Windows Terminal, iTerm2, VSCode, etc.)
✅ **Works NOW** - No need to wait for Claude Code updates!

---

## 📋 Quick Start Guide

### Step 1: Choose Your Icon & Color

**Recommended Icons by Component Type:**

- **Skills**: 🔧 (Blue) - `\033[1;34m🔧 [skill-name]\033[0m`
- **Agents**: 🤖 (Purple) - `\033[1;35m🤖 [agent-name]\033[0m`
- **Commands**: ⚡ (Green) - `\033[1;32m⚡ [/command]\033[0m`

### Step 2: Add This Section to Your Skill/Agent

Copy this template and paste it near the top of your skill.md or agent.md file:

```markdown
## 🎨 **VISUAL OUTPUT FORMATTING**

**CRITICAL: All [SKILL/AGENT-NAME] output MUST use colored formatting and icons for visual clarity!**

### Color Scheme (ANSI Escape Codes)

Use these exact ANSI codes in ALL responses:

```
Component Header: \033[1;34m🔧 [SKILL-NAME]\033[0m      # Bold Blue + Icon (Skills)
Component Header: \033[1;35m🤖 [AGENT-NAME]\033[0m      # Bold Purple + Icon (Agents)
Success:          \033[1;32m✅\033[0m                   # Bold Green
Warning:          \033[1;33m⚠️\033[0m                    # Bold Yellow
Error:            \033[1;31m❌\033[0m                   # Bold Red
Info:             \033[1;36mℹ️\033[0m                    # Bold Cyan
Progress:         \033[0;34m▶\033[0m                    # Blue Arrow
```

### Required Output Format

**Every response MUST start with:**
```
\033[1;34m🔧 [SKILL-NAME]\033[0m Message here...
```

**Example formatted output:**
```
\033[1;34m🔧 [SKILL-NAME]\033[0m Starting workflow...
\033[0;34m▶\033[0m Analyzing files...
\033[0;34m▶\033[0m Processing data...
\033[1;32m✅\033[0m Task completed successfully
\033[1;34m🔧 [SKILL-NAME]\033[0m Workflow complete!
```

### Status Messages with Colors

**Use these formatted messages:**

- Start: `\033[1;34m🔧 [SKILL-NAME]\033[0m Starting task...`
- Progress: `\033[0;34m▶\033[0m Processing step 1 of 3...`
- Info: `\033[1;36mℹ️\033[0m Additional information here`
- Success: `\033[1;32m✅\033[0m Operation completed`
- Warning: `\033[1;33m⚠️\033[0m Warning message`
- Error: `\033[1;31m❌\033[0m Error occurred`
- Complete: `\033[1;32m✅\033[0m All tasks complete!`

**WHY:** This makes execution visually distinct and improves UX significantly!
```

---

## 🎨 Complete ANSI Color Reference

### Basic Colors (30-37: Foreground, 40-47: Background)

```bash
# Regular Colors
Black:   \033[0;30m
Red:     \033[0;31m
Green:   \033[0;32m
Yellow:  \033[0;33m
Blue:    \033[0;34m
Magenta: \033[0;35m
Cyan:    \033[0;36m
White:   \033[0;37m

# Bold Colors (1; prefix)
Bold Black:   \033[1;30m
Bold Red:     \033[1;31m
Bold Green:   \033[1;32m
Bold Yellow:  \033[1;33m
Bold Blue:    \033[1;34m
Bold Magenta: \033[1;35m
Bold Cyan:    \033[1;36m
Bold White:   \033[1;37m

# Reset
Reset: \033[0m  # ALWAYS use this at the end to reset formatting
```

### Advanced Formatting

```bash
Bold:       \033[1m
Dim:        \033[2m
Italic:     \033[3m
Underline:  \033[4m
Blink:      \033[5m
Reverse:    \033[7m
Hidden:     \033[8m
```

---

## 🔧 Real-World Examples

### Example 1: eslint-fixer Agent

```markdown
## 🎨 **VISUAL OUTPUT FORMATTING**

**Every eslint-fixer response MUST start with:**
```
\033[1;35m🤖 [eslint-fixer]\033[0m Message here...
```

**Example output:**
```
\033[1;35m🤖 [eslint-fixer]\033[0m Analyzing ESLint errors...
\033[0;34m▶\033[0m Found 15 fixable errors
\033[1;32m✅\033[0m Fixed: Missing semicolons (8 files)
\033[1;32m✅\033[0m Fixed: Unused imports (3 files)
\033[1;33m⚠️\033[0m Manual fix required: Cyclomatic complexity
\033[1;35m🤖 [eslint-fixer]\033[0m Analysis complete!
```
```

### Example 2: test-runner Skill

```markdown
## 🎨 **VISUAL OUTPUT FORMATTING**

**Every test-runner response MUST start with:**
```
\033[1;34m🔧 [test-runner]\033[0m Message here...
```

**Example output:**
```
\033[1;34m🔧 [test-runner]\033[0m Running test suite...
\033[0;34m▶\033[0m Running unit tests...
\033[1;32m✅\033[0m 45 tests passed
\033[1;31m❌\033[0m 2 tests failed
\033[1;36mℹ️\033[0m Test coverage: \033[1;33m87%\033[0m
\033[1;34m🔧 [test-runner]\033[0m Test run complete!
```
```

### Example 3: Slash Command (/commit)

```markdown
## 🎨 **VISUAL OUTPUT FORMATTING**

**Every /commit response MUST start with:**
```
\033[1;32m⚡ [/commit]\033[0m Message here...
```

**Example output:**
```
\033[1;32m⚡ [/commit]\033[0m Creating git commit...
\033[0;34m▶\033[0m Staging files...
\033[1;32m✅\033[0m 5 files staged
\033[0;34m▶\033[0m Creating commit message...
\033[1;32m✅\033[0m Commit created: abc1234
\033[1;32m⚡ [/commit]\033[0m Commit complete!
```
```

---

## 🎯 Best Practices

### DO:
✅ Always start skill/agent responses with colored header
✅ Use consistent icons throughout (🔧 for skills, 🤖 for agents)
✅ End ANSI codes with `\033[0m` to reset formatting
✅ Use green for success, yellow for warnings, red for errors
✅ Include progress indicators (▶) for multi-step operations

### DON'T:
❌ Use too many colors (stick to 3-4 max)
❌ Forget to reset formatting with `\033[0m`
❌ Use blinking text (annoying and accessibility issue)
❌ Override user's terminal theme with background colors
❌ Use colors for long paragraphs (hard to read)

---

## 🧪 Testing Your Colors

**To test if colors work in your terminal:**

1. Open your terminal (Windows Terminal, iTerm2, VSCode, etc.)
2. Run this command:
   ```bash
   echo -e "\033[1;34m🔧 [test-skill]\033[0m This should be blue with an icon"
   echo -e "\033[1;32m✅\033[0m This should show a green checkmark"
   echo -e "\033[1;31m❌\033[0m This should show a red X"
   ```

3. You should see colored output with icons!

**If colors don't work:**
- Windows: Use Windows Terminal (not CMD.exe)
- Mac: Use iTerm2 or Terminal.app (both support colors)
- Linux: Most terminals support ANSI colors by default
- VSCode: Integrated terminal supports colors

---

## 📚 Additional Resources

- [ANSI Escape Codes](https://en.wikipedia.org/wiki/ANSI_escape_code)
- [Terminal Colors Cheatsheet](https://www.lihaoyi.com/post/BuildyourownCommandLinewithANSIescapecodes.html)
- [Testing ANSI Colors Online](https://ansi.gabebanks.net/)

---

## 🎉 Example: Full Skill with Colors

See `generic-claude-framework/skills/changelog-manager/skill.md` for a complete working example!

**Key sections:**
- Line 46: Visual Output Formatting section
- Line 86-92: Status messages with colors
- Line 104: Requirement to use colored output in auto-activation

---

**Ready to add colors to your skills/agents? Just copy the template above and customize it!**
