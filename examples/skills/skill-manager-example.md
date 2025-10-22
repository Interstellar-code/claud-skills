# Skill Manager - Example Implementation

**Example of using the skill-manager skill in your project**

## Setup

1. **Copy the skill to your project:**

```bash
cp -r generic-claude-framework/skills/skill-manager .claude/skills/
cp generic-claude-framework/commands/cs-skill-management.md .claude/commands/
```

2. **Enable the skill** (optional - the Python script works standalone):

```bash
python .claude/skills/skill-manager/scripts/skill-manager.py enable skill-manager
```

## Example Usage Scenarios

### Scenario 1: Quick Skill Discovery

**User wants to see what skills are available:**

```bash
$ /cs-skill-management list

📋 Skills (7 total)

✅ changelog-manager (v2.8.0)
   Update project changelog with uncommitted changes
   Permissions: 4 configured

✅ cli-modern-tools (v1.0.0)
   Auto-suggest modern CLI tool alternatives
   Permissions: 1 configured

...
```

**Token usage:** ~50 tokens (vs ~800 tokens with LLM-based approach)

---

### Scenario 2: Enable a New Skill

**User wants to enable colored-output:**

```bash
$ /cs-skill-management enable colored-output

✅ Enabled: colored-output
```

**Behind the scenes:**
- Script adds `Skill(colored-output)` to `.claude/settings.local.json`
- Auto-discovers related permissions
- Validates JSON before saving

---

### Scenario 3: Interactive Menu

**User wants to browse skills by category:**

```bash
$ /cs-skill-management

⚙️  Skill Management - Interactive Mode
========================================

Available Skills: 7 total
├─ Enabled: 4 skills
├─ Not Configured: 3 skills
└─ Categories: Release, CLI, Documentation, Time, Output, Development

📂 Browse Options:
1. View All Skills (7)
2. View Enabled Skills (4)
3. View Not Configured Skills (3)
4. Browse by Category
5. Search for Skill

🔧 Quick Actions:
6. Enable a Skill
7. Disable a Skill
8. Configure Skill Permissions
9. View Skill Details

Enter choice (1-9) or 'q' to quit:
```

**User selects:** 9 (View Skill Details)

**Claude asks:** Which skill? (changelog-manager)

**Output:**
```bash
📊 Skill Details: changelog-manager
============================================================

Basic Info:
  Name: changelog-manager
  Version: 2.8.0
  Description: Update project changelog with uncommitted changes
  Author: Claude Code

Status:
  ✅ Enabled
  Auto-activate: Yes

Permissions (4):
  ✅ Skill(changelog-manager)
  ✅ Bash(python scripts/generate_docs.py:*)
  ✅ Bash(git tag:*)
  ✅ Bash(git commit:*)

Tags:
  changelog, versioning, git, release-management
```

---

### Scenario 4: Bulk Status Check

**User wants to see only enabled skills:**

```bash
$ /cs-skill-management list enabled

📋 Skills (4 total)

✅ changelog-manager (v2.8.0)
✅ cli-modern-tools (v1.0.0)
✅ markdown-helper (v1.0.0)
✅ time-helper (v1.0.0)
```

---

### Scenario 5: Export Configuration

**User wants to backup their skill configuration:**

```bash
$ /cs-skill-management export > my-skills-backup.json
```

**Output (my-skills-backup.json):**
```json
{
  "version": "1.0.0",
  "project_root": "/path/to/project",
  "skills": {
    "changelog-manager": {
      "enabled": true,
      "version": "2.8.0",
      "permissions": [
        "Skill(changelog-manager)",
        "Bash(python scripts/generate_docs.py:*)"
      ]
    },
    ...
  }
}
```

---

## Integration with Claude Code Workflow

### Before (LLM-based approach)

```
User: /cs-skill-management

Claude:
1. Read .claude/skills/changelog-manager/skill.md (30 lines)
2. Read .claude/skills/cli-modern-tools/skill.md (30 lines)
3. Read .claude/skills/colored-output/skill.md (30 lines)
4. Read .claude/skills/markdown-helper/skill.md (30 lines)
5. Read .claude/skills/time-helper/skill.md (30 lines)
6. Read .claude/skills/skill-creator/skill.md (30 lines)
7. Read .claude/settings.local.json (32 lines)
8. Parse YAML frontmatter from each file
9. Check enabled status for each skill
10. Format and display menu

Token usage: ~800-1000 tokens
Time: ~3-5 seconds
```

### After (Script-based approach)

```
User: /cs-skill-management

Claude:
1. Run: python .claude/skills/skill-manager/scripts/skill-manager.py json
2. Parse JSON output
3. Display menu

Token usage: ~50 tokens
Time: ~0.5 seconds
Efficiency: 94% token reduction
```

---

## Customization Examples

### Add Custom Skill Categories

Modify `skill-manager.py` to add custom categorization:

```python
def categorize_skill(self, skill: Dict) -> str:
    """Custom categorization logic"""
    tags = skill.get('tags', [])

    if 'database' in tags:
        return 'Database'
    elif 'api' in tags:
        return 'API Integration'
    elif 'testing' in tags:
        return 'Testing'
    # ... add your custom categories
    else:
        return 'Other'
```

### Add Permission Suggestions

When enabling a skill, suggest additional permissions:

```python
def suggest_permissions(self, skill_name: str) -> List[str]:
    """Suggest additional permissions based on skill"""
    suggestions = {
        'changelog-manager': [
            'Bash(gh release create:*)',
            'Bash(git push:*)'
        ],
        'time-helper': [
            'Bash(php:*)'
        ]
    }
    return suggestions.get(skill_name, [])
```

---

## Performance Metrics

**Real-world example from this project:**

| Operation | Before (LLM) | After (Script) | Savings |
|-----------|--------------|----------------|---------|
| List all skills | 800 tokens | 50 tokens | 93.75% |
| Enable skill | 850 tokens | 30 tokens | 96.47% |
| Show details | 700 tokens | 40 tokens | 94.29% |
| Export config | 900 tokens | 35 tokens | 96.11% |

**Average savings: ~94% token reduction**

---

## Tips & Best Practices

1. **Use JSON output for automation:**
   ```bash
   python .claude/skills/skill-manager/scripts/skill-manager.py json > skills.json
   ```

2. **Combine with jq for filtering:**
   ```bash
   python .claude/skills/skill-manager/scripts/skill-manager.py json | jq '.[] | select(.enabled == true)'
   ```

3. **Backup before bulk changes:**
   ```bash
   cp .claude/settings.local.json .claude/settings.local.json.backup
   ```

4. **Use quick actions for speed:**
   ```bash
   /cs-skill-management enable colored-output  # Faster than menu
   ```

5. **Check status before enabling:**
   ```bash
   /cs-skill-management status colored-output
   ```

---

## Troubleshooting

### Python not found
```bash
# Check Python installation
python --version

# Or try python3
python3 .claude/skills/skill-manager/scripts/skill-manager.py list
```

### Encoding issues on Windows
The script automatically handles Windows console encoding. If you still see issues:

```bash
# Set console code page to UTF-8
chcp 65001

# Then run the script
python .claude/skills/skill-manager/scripts/skill-manager.py list
```

### JSON parsing errors
```bash
# Validate settings.local.json
python -m json.tool .claude/settings.local.json

# Fix formatting
python .claude/skills/skill-manager/scripts/skill-manager.py export > temp.json
cp temp.json .claude/settings.local.json
```

---

## See Also

- [skill-manager/skill.md](../../generic-claude-framework/skills/skill-manager/skill.md) - Full skill documentation
- [skill-manager/README.md](../../generic-claude-framework/skills/skill-manager/README.md) - Quick reference
- [cs-skill-management.md](../../generic-claude-framework/commands/cs-skill-management.md) - Slash command reference
