## 🎨 **VISUAL OUTPUT FORMATTING**

**IMPORTANT: Use MINIMAL colored output (2-3 calls max) to prevent screen flickering!**

### Use Colored-Output Skill (MINIMAL PATTERN)

**Example formatted output:**
```bash
# START: Header only
bash .claude/skills/colored-output/color.sh [COMPONENT-TYPE]-header "[COMPONENT-NAME]" "Starting task..."

# MIDDLE: Regular Claude text (no colored calls)
Processing step 1...
Processing step 2...
Found 10 items to process...
Updating configurations...

# END: Result only
bash .claude/skills/colored-output/color.sh success "" "Task completed successfully"
```

### When to Use Colored Output

**DO Use:**
- Initial header: `bash .claude/skills/colored-output/color.sh [TYPE]-header "[NAME]" "Starting..."`
- Final result: `bash .claude/skills/colored-output/color.sh success "" "Complete!"`
- Errors only: `bash .claude/skills/colored-output/color.sh error "" "Failed!"`

**DON'T Use:**
- ❌ Progress updates - use regular text
- ❌ Info messages - use regular text
- ❌ Intermediate steps - use regular text

**WHY:** Each bash call creates a task in Claude CLI, causing screen flickering. Keep it minimal!

---

COMPONENT-TYPE options:
- skill-header (for skills)
- agent-header (for agents)
- command-header (for slash commands)
