---
name: template-skill
description: Replace with description of the skill and when Claude should use it.
---

# Insert instructions below

## 🎨 **VISUAL OUTPUT FORMATTING**

**CRITICAL: All template-skill output MUST use the colored-output formatter skill!**

### Use Colored-Output Skill

**Every response MUST start with:**
```bash
bash .claude/skills/colored-output/color.sh skill-header "YOUR-SKILL-NAME" "Message here..."
```

**Example formatted output:**
```bash
bash .claude/skills/colored-output/color.sh skill-header "YOUR-SKILL-NAME" "Starting task..."
bash .claude/skills/colored-output/color.sh progress "" "Processing..."
bash .claude/skills/colored-output/color.sh success "" "Task completed"
```

**WHY:** Using the centralized formatter ensures consistent colors across ALL components!

---
