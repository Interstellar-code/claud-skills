## 🎨 **VISUAL OUTPUT FORMATTING**

**CRITICAL: All [COMPONENT-NAME] output MUST use the colored-output formatter skill!**

### Use Colored-Output Skill

**Instead of writing ANSI codes manually, use the centralized formatter:**

```bash
bash .claude/skills/colored-output/color.sh [type] "[COMPONENT-NAME]" [message]
```

### Required Output Format

**Every response MUST start with:**
```bash
bash .claude/skills/colored-output/color.sh [COMPONENT-TYPE]-header "[COMPONENT-NAME]" "Message here..."
```

**Example formatted output:**
```bash
bash .claude/skills/colored-output/color.sh [COMPONENT-TYPE]-header "[COMPONENT-NAME]" "Starting task..."
bash .claude/skills/colored-output/color.sh progress "" "Processing step 1..."
bash .claude/skills/colored-output/color.sh info "" "Found 10 items"
bash .claude/skills/colored-output/color.sh success "" "Task completed successfully"
```

### Status Messages with Colors

**Use these formatted messages throughout the workflow:**

- Start: `bash .claude/skills/colored-output/color.sh [COMPONENT-TYPE]-header "[COMPONENT-NAME]" "Starting..."`
- Progress: `bash .claude/skills/colored-output/color.sh progress "" "Processing..."`
- Info: `bash .claude/skills/colored-output/color.sh info "" "Information here"`
- Success: `bash .claude/skills/colored-output/color.sh success "" "Operation completed"`
- Warning: `bash .claude/skills/colored-output/color.sh warning "" "Warning message"`
- Error: `bash .claude/skills/colored-output/color.sh error "" "Error message"`

**WHY:** Using the centralized formatter ensures consistent colors across ALL components and makes updates easy!

---

COMPONENT-TYPE options:
- skill-header (for skills)
- agent-header (for agents)
- command-header (for slash commands)
