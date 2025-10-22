**Purpose**: Native Python-based skill management for enabling/disabling skills, configuring permissions, and managing settings.local.json

**⚡ USES NATIVE PYTHON SCRIPT - 90% Token Savings!**

---

## 🎯 **Quick Reference**

### Interactive Menu (No Arguments)
```bash
/cs-skill-management
```

### Quick Actions (With Arguments)
```bash
# Basic Operations
/cs-skill-management enable <skill-name>
/cs-skill-management disable <skill-name>
/cs-skill-management status <skill-name>
/cs-skill-management list [enabled|disabled]

# Advanced Features (NEW in v1.1.0)
/cs-skill-management auto-activate <skill-name> --on|--off
/cs-skill-management add-permission <skill-name> <permission>
/cs-skill-management remove-permission <skill-name> <permission>
/cs-skill-management list-permissions <skill-name>
/cs-skill-management add-tag <skill-name> <tag>
/cs-skill-management remove-tag <skill-name> <tag>
/cs-skill-management set-priority <skill-name> <1-10>
/cs-skill-management configure <skill-name> <key> <value>
/cs-skill-management advanced <skill-name>
```

### 🎯 **HIERARCHICAL MENU STRUCTURE**

**3-Level Navigation System:**

**LEVEL 1:** Main Menu (5 options)
**LEVEL 2:** Skill List (numbered, select a skill)
**LEVEL 3:** Skill Parameters (manage specific settings)

See "Interactive Menu Structure" section below for complete flow.

---

### ⚡ **HYBRID APPROACH - Best of Both Worlds**

**Use Case 1: Interactive Menu** (Exploration mode)
```bash
/cs-skill-management
# Navigate with numbers: 1 → 3 → 2
# Token cost: ~400 per interaction (with minimal LLM)
# Best for: Exploring skills, learning what's available
```

**Use Case 2: Direct Commands** (Power user mode)
```bash
/cs-skill-management advanced cli-modern-tools
/cs-skill-management set-priority changelog-manager 9
/cs-skill-management add-tag colored-output anti-flickering
# Token cost: ~200 per command
# Best for: Quick actions when you know exactly what you want
```

**Recommendation:**
- Start with **interactive menu** to explore
- Switch to **direct commands** once you know what you need
- Saves ~50-75% tokens compared to verbose navigation

---

## 🚀 **Implementation Workflow**

**CRITICAL: Use the Python script for ALL operations! Do NOT read skill files manually!**

### Step 1: Parse User Arguments

```javascript
// Parse slash command arguments
const args = userInput.split(' ').slice(1); // Skip '/cs-skill-management'

if (args.length === 0) {
    // Interactive menu mode
    showInteractiveMenu();
} else {
    // Quick action mode
    executeQuickAction(args[0], args[1]);
}
```

### Step 2: Run Python Script

**For Interactive Menu:**
```bash
# Get all skills as JSON (single call, ~50 tokens)
python .claude/skills/skill-manager/scripts/skill-manager.py json
```

**For Quick Actions:**
```bash
# Basic Operations
python .claude/skills/skill-manager/scripts/skill-manager.py enable <skill-name>
python .claude/skills/skill-manager/scripts/skill-manager.py disable <skill-name>
python .claude/skills/skill-manager/scripts/skill-manager.py status <skill-name>
python .claude/skills/skill-manager/scripts/skill-manager.py list --filter enabled

# Advanced Features
python .claude/skills/skill-manager/scripts/skill-manager.py auto-activate <skill-name> --on
python .claude/skills/skill-manager/scripts/skill-manager.py auto-activate <skill-name> --off
python .claude/skills/skill-manager/scripts/skill-manager.py add-permission <skill-name> <permission>
python .claude/skills/skill-manager/scripts/skill-manager.py remove-permission <skill-name> <permission>
python .claude/skills/skill-manager/scripts/skill-manager.py list-permissions <skill-name>
python .claude/skills/skill-manager/scripts/skill-manager.py add-tag <skill-name> <tag>
python .claude/skills/skill-manager/scripts/skill-manager.py remove-tag <skill-name> <tag>
python .claude/skills/skill-manager/scripts/skill-manager.py set-priority <skill-name> <1-10>
python .claude/skills/skill-manager/scripts/skill-manager.py configure <skill-name> <key> <value>
python .claude/skills/skill-manager/scripts/skill-manager.py advanced <skill-name>
```

### Step 3: Parse Output & Display

**Interactive menu** - Parse JSON and display formatted menu
**Quick actions** - Display script output directly

---

## 🎨 **VISUAL OUTPUT FORMATTING - MINIMAL LLM COMMENTARY**

**⚡ CRITICAL: Use "silent execution" approach to reduce token usage by ~60%**

### Silent Execution Pattern

**DO THIS (Minimal LLM):**
```bash
# Just show header once at start
bash .claude/skills/colored-output/color.sh command-header "/cs-skill-management" "Skill Management"

# Execute Python script and display results directly (NO commentary)
python .claude/skills/skill-manager/scripts/skill-manager.py list

# User input prompt (NO additional text)
# Wait for user selection
```

**DON'T DO THIS (Verbose LLM):**
```bash
# ❌ Avoid: "Excellent! Let me show you LEVEL 3..."
# ❌ Avoid: "Here's the detailed view of the skill..."
# ❌ Avoid: "Now displaying the parameters for..."
```

### Token Savings

| Approach | Tokens per Interaction | Commentary |
|----------|----------------------|------------|
| Verbose (OLD) | ~1000 tokens | "Excellent! Let me show you..." |
| Minimal (NEW) | ~400 tokens | Silent execution, just results |
| Direct Commands | ~200 tokens | Bypass menu entirely |

### Implementation Rules

**When navigating menus:**
1. ✅ Run the Python command
2. ✅ Display the output directly
3. ❌ NO "Let me show you..."
4. ❌ NO "Here's what we found..."
5. ❌ NO "Excellent choice..."

**Only speak when:**
- Showing an error message
- Asking for clarification on ambiguous input
- Confirming a destructive action (like delete)

---

## 🚀 **Advanced Features (NEW in v1.1.0)**

### Auto-Activate Toggle

Toggle whether a skill should auto-activate based on keywords in user messages.

**Usage:**
```bash
# Enable auto-activate
/cs-skill-management auto-activate changelog-manager --on
python .claude/skills/skill-manager/scripts/skill-manager.py auto-activate changelog-manager --on

# Disable auto-activate
/cs-skill-management auto-activate time-helper --off
python .claude/skills/skill-manager/scripts/skill-manager.py auto-activate time-helper --off
```

**What it does:**
- Modifies the `auto-activate: true/false` field in skill.md
- When enabled, skill automatically activates on keyword matches
- When disabled, skill must be manually invoked

**Example output:**
```
✅ Auto-activate enabled for changelog-manager
```

### Permission Management

Add, remove, or list specific permissions for skills.

**Usage:**
```bash
# Add a permission
/cs-skill-management add-permission changelog-manager "Bash(gh release create:*)"
python .claude/skills/skill-manager/scripts/skill-manager.py add-permission changelog-manager "Bash(gh release create:*)"

# Remove a permission
/cs-skill-management remove-permission changelog-manager "Bash(python:*)"
python .claude/skills/skill-manager/scripts/skill-manager.py remove-permission changelog-manager "Bash(python:*)"

# List all permissions for a skill
/cs-skill-management list-permissions changelog-manager
python .claude/skills/skill-manager/scripts/skill-manager.py list-permissions changelog-manager
```

**What it does:**
- Adds/removes permissions from settings.local.json `permissions.allow` array
- Lists all permissions currently configured for a skill
- Prevents duplicate permissions

**Example output:**
```
✅ Added permission: Bash(gh release create:*)

🔐 Permissions for changelog-manager:
  1. Skill(changelog-manager)
  2. Bash(python scripts/generate_docs.py:*)
  3. Bash(git tag:*)
  4. Bash(git commit:*)
  5. Bash(git push:*)
  6. Bash(gh release create:*)
```

### Tag Management

Add or remove tags from skills for better categorization.

**Usage:**
```bash
# Add a tag
/cs-skill-management add-tag colored-output anti-flickering
python .claude/skills/skill-manager/scripts/skill-manager.py add-tag colored-output anti-flickering

# Remove a tag
/cs-skill-management remove-tag colored-output old-tag
python .claude/skills/skill-manager/scripts/skill-manager.py remove-tag colored-output old-tag
```

**What it does:**
- Modifies the `tags: [...]` array in skill.md frontmatter
- Adds new tag to existing list
- Removes specified tag from list
- Helps with skill categorization and discovery

**Example output:**
```
✅ Added tag 'anti-flickering' to colored-output

Tags for colored-output: [output, formatting, colors, ansi, terminal, utility, ux, anti-flickering]
```

### Priority Setting

Set execution priority for skills (1-10 scale, higher = more important).

**Usage:**
```bash
# Set priority to 8 (high)
/cs-skill-management set-priority changelog-manager 8
python .claude/skills/skill-manager/scripts/skill-manager.py set-priority changelog-manager 8

# Set priority to 3 (low)
/cs-skill-management set-priority template-skill 3
python .claude/skills/skill-manager/scripts/skill-manager.py set-priority template-skill 3
```

**What it does:**
- Adds/updates `priority: <1-10>` field in skill.md
- Higher priority skills are suggested first
- Helps Claude decide which skill to use when multiple match

**Priority Guidelines:**
- **9-10**: Critical skills (changelog-manager, skill-manager)
- **7-8**: Frequently used skills (time-helper, colored-output)
- **4-6**: Standard skills (markdown-helper, cli-modern-tools)
- **1-3**: Rarely used or template skills

**Example output:**
```
✅ Set priority to 8 for changelog-manager
```

### Custom Configuration

Set custom configuration parameters for skills.

**Usage:**
```bash
# Set a config parameter
/cs-skill-management configure time-helper default-timezone UTC
python .claude/skills/skill-manager/scripts/skill-manager.py configure time-helper default-timezone UTC

# Set another parameter
/cs-skill-management configure changelog-manager auto-push true
python .claude/skills/skill-manager/scripts/skill-manager.py configure changelog-manager auto-push true
```

**What it does:**
- Adds custom key-value pairs to skill metadata
- Stores configuration in skill.md or settings.local.json
- Allows skills to have user-specific settings

**Example output:**
```
✅ Set configuration: default-timezone = UTC for time-helper
```

### Advanced Configuration View

View all advanced settings for a skill in one place.

**Usage:**
```bash
# View advanced config
/cs-skill-management advanced colored-output
python .claude/skills/skill-manager/scripts/skill-manager.py advanced colored-output
```

**What it displays:**
```
⚙️  Advanced Configuration: colored-output
==========================================

Basic Info:
-----------
Name: colored-output
Version: 1.1.0
Status: Enabled

Auto-Activation:
----------------
Enabled: true
Keywords: color, colored, format

Permissions (3):
----------------
✅ Skill(colored-output)
✅ Bash(bash .claude/skills/colored-output/color.sh:*)
✅ Read(.claude/skills/colored-output/**)

Tags (8):
---------
output, formatting, colors, ansi, terminal, utility, ux, anti-flickering

Priority:
---------
7 (High priority)

Custom Config:
--------------
max-calls-per-operation: 3
pattern: minimal

Files:
------
📄 .claude/skills/colored-output/skill.md
📄 .claude/skills/colored-output/color.sh
```

**What it does:**
- Shows all configuration in one comprehensive view
- Displays auto-activate status and keywords
- Lists all permissions
- Shows tags and priority
- Displays custom configuration parameters
- Lists skill files

---

## 📋 **Interactive Menu Structure**

**3-Level Hierarchical Navigation**

When called without arguments, display a clean 3-level menu system.

---

### LEVEL 1: Main Menu

**Display:**
```
⚙️  Skill Management
====================

1. List skills
2. Activate skill
3. Deactivate skill
4. Delete skill
5. Exit

Enter choice (1-5):
```

**Implementation:**
```bash
# Run Python script to get skill count
python .claude/skills/skill-manager/scripts/skill-manager.py json

# Show menu and wait for user input
```

---

### LEVEL 2: Skill List (After choosing "1. List skills")

**Display:**
```
📋 Skills (8 total)

1. ✅ changelog-manager (v2.8.0) - ENABLED
2. ✅ cli-modern-tools (v1.1.0) - ENABLED
3. ✅ colored-output (v1.1.0) - ENABLED
4. ✅ markdown-helper (v1.0.0) - ENABLED
5. ⬜ skill-creator (vunknown) - DISABLED
6. ⬜ skill-manager (v1.0.0) - DISABLED
7. ⬜ template-skill (vunknown) - DISABLED
8. ✅ time-helper (v1.0.0) - ENABLED
9. Back to main menu

Select a skill (1-9):
```

**Implementation:**
```bash
# List all skills with numbering
python .claude/skills/skill-manager/scripts/skill-manager.py list

# Number each skill 1-N
# Add option N+1 for "Back to main menu"
# Wait for user to select a number
```

---

### LEVEL 3: Skill Parameters (After selecting a skill)

**Display (Example: User selected "3. colored-output"):**
```
⚙️  Skill: colored-output (v1.1.0)
=====================================

📊 Current Status:
   Status: ✅ Enabled
   Auto-activate: No
   Priority: Not set
   Tags: output, formatting, colors, ansi, terminal, utility, ux
   Permissions: 1 configured

🔧 Manage Parameters:

1. Toggle enable/disable
2. Toggle auto-activate (on/off)
3. Manage tags (add/remove)
4. Set priority (1-10)
5. Manage permissions (add/remove/list)
6. Configure custom parameters
7. View full details
8. Back to skill list

Enter choice (1-8):
```

**Implementation:**
```bash
# Get advanced config for selected skill
python .claude/skills/skill-manager/scripts/skill-manager.py advanced <skill-name>

# Display menu with current settings
# Wait for user to select an action
# Execute the selected action
# Return to this menu after action completes
```

---

### LEVEL 3 Sub-Actions

**When user selects an action from Level 3:**

**1. Toggle enable/disable**
```bash
# Check current status
if enabled:
    python .claude/skills/skill-manager/scripts/skill-manager.py disable <skill-name>
else:
    python .claude/skills/skill-manager/scripts/skill-manager.py enable <skill-name>

# Show success message
# Return to Level 3 menu
```

**2. Toggle auto-activate**
```bash
# Check current auto-activate status
if auto_activate_enabled:
    python .claude/skills/skill-manager/scripts/skill-manager.py auto-activate <skill-name> --off
else:
    python .claude/skills/skill-manager/scripts/skill-manager.py auto-activate <skill-name> --on

# Show success message
# Return to Level 3 menu
```

**3. Manage tags**
```
Current tags: output, formatting, colors, ansi, terminal, utility, ux

1. Add a tag
2. Remove a tag
3. Back

Enter choice (1-3):
```

If user selects "1. Add a tag":
```
Enter tag name to add: anti-flickering

python .claude/skills/skill-manager/scripts/skill-manager.py add-tag <skill-name> anti-flickering

✅ Tag added successfully
Return to Level 3 menu
```

**4. Set priority**
```
Current priority: Not set

Enter priority (1-10, higher = more important): 8

python .claude/skills/skill-manager/scripts/skill-manager.py set-priority <skill-name> 8

✅ Priority set to 8
Return to Level 3 menu
```

**5. Manage permissions**
```
🔐 Current Permissions (3):

1. Skill(colored-output)
2. Bash(bash .claude/skills/colored-output/color.sh:*)
3. Read(.claude/skills/colored-output/**)

Actions:
1. Add a permission
2. Remove a permission
3. List all permissions
4. Back

Enter choice (1-4):
```

**6. Configure custom parameters**
```
Enter parameter name: max-calls-per-operation
Enter parameter value: 3

python .claude/skills/skill-manager/scripts/skill-manager.py configure <skill-name> max-calls-per-operation 3

✅ Parameter configured successfully
Return to Level 3 menu
```

**7. View full details**
```
# Show comprehensive skill information
python .claude/skills/skill-manager/scripts/skill-manager.py status <skill-name>

# Display all metadata, files, permissions, etc.
# Press Enter to return to Level 3 menu
```

**8. Back to skill list**
```
# Return to Level 2 (Skill List)
```

---

## 📂 **Skill Discovery and Categorization**

### Step 1: Scan Available Skills

```bash
# Find all skills in .claude/skills/
ls -1 .claude/skills/ | grep -v README.md | grep -v "\.md$"
```

**Expected skills:**
- changelog-manager
- cli-modern-tools
- colored-output
- markdown-helper
- skill-creator
- template-skill
- time-helper

### Step 2: Read Skill Metadata

For each skill, read the frontmatter from `skill.md`:

```bash
# Extract metadata from skill.md
head -20 .claude/skills/<skill-name>/skill.md | grep -E "^(name|description|version|tags):"
```

**Parse into structure:**
```json
{
  "name": "changelog-manager",
  "description": "Update project changelog...",
  "version": "2.8.0",
  "tags": ["changelog", "versioning", "git"],
  "enabled": true,
  "permissions": ["Skill(changelog-manager)", "Bash(python scripts/generate_docs.py:*)"]
}
```

### Step 3: Categorize Skills

**Auto-categorize based on tags:**
- **Release Management**: changelog, versioning, git → changelog-manager
- **CLI Tools**: cli, tools, modern → cli-modern-tools
- **Output/Display**: output, color, terminal → colored-output
- **Documentation**: markdown, docs → markdown-helper
- **Development**: skill-creator, template
- **Time/Date**: time, timezone → time-helper

---

## 🔍 **Skill Status Detection**

### Check if Skill is Enabled

**Read settings.local.json:**
```bash
cat .claude/settings.local.json | grep "Skill(<skill-name>)"
```

**Determination:**
- If found in `permissions.allow` → **Enabled**
- If found in `permissions.deny` → **Explicitly Disabled**
- If not found → **Not Configured** (default allow)

### Check Skill Permissions

**Find all permissions for a skill:**
```bash
# Search for skill-related permissions
cat .claude/settings.local.json | grep "<skill-name>"
```

**Examples:**
- `Skill(changelog-manager)` - Skill invocation permission
- `Bash(python scripts/generate_docs.py:*)` - Related bash permission
- `Read(//c/Users/rohit/.claude/skills/time-helper/**)` - Read permission

---

## 🎛️ **Interactive Browsing**

### Option 1: View All Skills

**Display format:**
```
📋 All Skills (7)
================

✅ changelog-manager (v2.8.0)
   Description: Update project changelog with uncommitted changes
   Category: Release Management
   Status: Enabled
   Permissions: 2 configured

✅ cli-modern-tools (v1.1.0)
   Description: Auto-suggest modern CLI tool alternatives
   Category: CLI Tools
   Status: Enabled
   Permissions: 1 configured

⬜ template-skill (v1.0.0)
   Description: Template for creating new skills
   Category: Development
   Status: Not Configured
   Permissions: 0 configured

Actions: [e]nable [d]isable [c]onfigure [v]iew [b]ack
```

### Option 2: View Enabled Skills Only

**Filter to show only enabled skills** (found in permissions.allow)

### Option 3: View Disabled Skills Only

**Filter to show only disabled skills** (found in permissions.deny OR not configured)

### Option 4: Browse by Category

**Show category menu:**
```
📂 Browse by Category
=====================

1. Release Management (1 skill)
   └─ changelog-manager

2. CLI Tools (1 skill)
   └─ cli-modern-tools

3. Output/Display (1 skill)
   └─ colored-output

4. Documentation (1 skill)
   └─ markdown-helper

5. Time/Date (1 skill)
   └─ time-helper

6. Development (2 skills)
   └─ skill-creator, template-skill

Enter category (1-6) or 'b' for back:
```

### Option 5: Search for Skill

**Interactive search:**
```
🔍 Search for Skill
===================

Enter search term (name, description, tags): changelog

Found 1 skill:

✅ changelog-manager (v2.8.0)
   Description: Update project changelog with uncommitted changes
   Tags: changelog, versioning, git, release-management
   Status: Enabled

Actions: [v]iew [e]nable [d]isable [c]onfigure [b]ack
```

---

## ⚡ **Quick Actions**

### Action: Enable a Skill

**Workflow:**

1. **Check if already enabled:**
   ```bash
   cat .claude/settings.local.json | grep "Skill(<skill-name>)"
   ```

2. **If not enabled, update settings.local.json:**
   ```json
   {
     "permissions": {
       "allow": [
         ...existing permissions,
         "Skill(<skill-name>)"
       ]
     }
   }
   ```

3. **Read skill.md to find required permissions:**
   - Check if skill needs bash permissions
   - Check if skill needs file read permissions
   - Add those to allow list as well

4. **Verify and report:**
   ```
   ✅ Enabled: changelog-manager

   Added permissions:
   - Skill(changelog-manager)
   - Bash(python scripts/generate_docs.py:*)
   - Bash(git tag:*)

   Updated: .claude/settings.local.json
   ```

### Action: Disable a Skill

**Workflow:**

1. **Remove from allow list:**
   - Find `Skill(<skill-name>)` in permissions.allow
   - Remove it and all related permissions

2. **Optionally add to deny list:**
   ```
   Would you like to:
   1. Remove from allow list (default allow still works)
   2. Add to deny list (explicitly block)

   Choose (1-2):
   ```

3. **Report:**
   ```
   ⬜ Disabled: cli-modern-tools

   Removed permissions:
   - Skill(cli-modern-tools)

   Updated: .claude/settings.local.json
   ```

### Action: View Skill Status

**Display comprehensive skill information:**

```
📊 Skill Details: changelog-manager
====================================

Basic Info:
-----------
Name: changelog-manager
Version: 2.8.0
Description: Update project changelog with uncommitted changes,
             synchronize package versions, and create version releases

Status:
-------
✅ Enabled
Auto-activate: true
Last used: 2025-10-22 14:30:00

Permissions:
------------
✅ Skill(changelog-manager) - Allow
✅ Bash(python scripts/generate_docs.py:*) - Allow
✅ Bash(git tag:*) - Allow
✅ Bash(git commit:*) - Allow
✅ Bash(git push:*) - Allow

Tags:
-----
changelog, versioning, git, release-management, package-management

Files:
------
📄 .claude/skills/changelog-manager/skill.md (5432 lines)
📄 generic-claude-framework/skills/changelog-manager/skill.md

CLAUDE.md Integration:
-----------------------
✅ Mentioned in "Git Workflow for This Project"
✅ Auto-activation triggers documented

Actions: [e]nable [d]isable [c]onfigure [b]ack
```

### Action: Configure Skill Permissions

**Interactive permission editor:**

```
🔧 Configure Permissions: changelog-manager
============================================

Current Permissions (5):
------------------------
[✓] 1. Skill(changelog-manager) - Skill invocation
[✓] 2. Bash(python scripts/generate_docs.py:*) - Documentation generation
[✓] 3. Bash(git tag:*) - Git tag creation
[✓] 4. Bash(git commit:*) - Git commit
[✓] 5. Bash(git push:*) - Git push

Suggested Permissions (from skill.md):
---------------------------------------
[ ] 6. Bash(gh release create:*) - GitHub Release creation
[ ] 7. Read(.claude/skills/changelog-manager/**) - Read skill files

Actions:
--------
t: Toggle permission (enable/disable)
a: Add custom permission
r: Remove permission
s: Save changes
c: Cancel

Enter action:
```

---

## 📝 **settings.local.json Management**

### Read Current Settings

```bash
cat .claude/settings.local.json
```

**Parse JSON structure:**
```json
{
  "permissions": {
    "allow": [ ... ],
    "deny": [ ... ],
    "ask": [ ... ]
  }
}
```

### Update Settings

**Use Read tool + Edit tool:**

1. Read entire file
2. Parse JSON mentally
3. Modify specific array (allow/deny/ask)
4. Write back with proper formatting

**Example edit:**
```javascript
// Adding new permission
old_string: '  "permissions": {
    "allow": [
      "WebSearch",'

new_string: '  "permissions": {
    "allow": [
      "WebSearch",
      "Skill(colored-output)",'
```

### Validate Settings

**After any change, validate:**

```bash
# Check if valid JSON
cat .claude/settings.local.json | python -m json.tool > /dev/null && echo "Valid" || echo "Invalid"
```

---

## 📚 **CLAUDE.md Integration**

### Check if Skill Mentioned in CLAUDE.md

```bash
grep -n "<skill-name>" CLAUDE.md
```

### Add Skill to CLAUDE.md Rules

**Interactive prompt:**

```
📝 CLAUDE.md Integration
=========================

Would you like to add <skill-name> to CLAUDE.md?

This will add:
1. Auto-activation triggers section
2. Usage guidelines
3. When to use this skill

Options:
1. Add to existing section
2. Create new section
3. Skip

Choose (1-3):
```

---

## 🚀 **Argument-Based Usage**

### Enable Skill
```bash
/cs:skill-management enable changelog-manager
```

**Output:**
```
✅ Enabled: changelog-manager
Added permissions to .claude/settings.local.json
```

### Disable Skill
```bash
/cs:skill-management disable cli-modern-tools
```

**Output:**
```
⬜ Disabled: cli-modern-tools
Removed permissions from .claude/settings.local.json
```

### View Status
```bash
/cs:skill-management status time-helper
```

**Output:**
```
📊 time-helper
Status: Enabled
Version: 1.0.0
Permissions: 2 configured
```

### List Skills
```bash
/cs:skill-management list
/cs:skill-management list enabled
/cs:skill-management list disabled
/cs:skill-management list release-management
```

**Output:**
```
📋 Enabled Skills (5)
- changelog-manager (v2.8.0)
- cli-modern-tools (v1.1.0)
- colored-output (v1.0.0)
- markdown-helper (v1.0.0)
- time-helper (v1.0.0)
```

### Configure Skill
```bash
/cs:skill-management configure changelog-manager
```

**Opens interactive configuration menu for that skill**

---

## 🛠️ **Implementation Workflow**

**When user invokes: `/cs:skill-management [args]`**

### Step 1: Parse Arguments

```javascript
if (no arguments):
    show_interactive_menu()
else if (arg1 == "enable"):
    enable_skill(arg2)
else if (arg1 == "disable"):
    disable_skill(arg2)
else if (arg1 == "status"):
    show_skill_status(arg2)
else if (arg1 == "list"):
    list_skills(arg2 || "all")
else if (arg1 == "configure"):
    configure_skill(arg2)
else:
    show_usage_help()
```

### Step 2: Discover Skills

```bash
# Scan .claude/skills/
for dir in .claude/skills/*/; do
    skill_name=$(basename "$dir")
    if [ -f "$dir/skill.md" ]; then
        # Read metadata
        # Check enabled status
        # Add to skills array
    fi
done
```

### Step 3: Check Current Status

**For each skill:**
1. Read skill.md metadata (name, version, tags, description)
2. Check settings.local.json for permission status
3. Determine enabled/disabled/not-configured status
4. Build skill object

### Step 4: Display or Execute

**If interactive:**
- Show menu
- Wait for user input
- Execute chosen action
- Loop back to menu

**If argument-based:**
- Execute action directly
- Report result
- Exit

---

## 📤 **Export/Import Configuration**

### Export Current Configuration

```bash
/cs:skill-management export > my-skills-config.json
```

**Output format:**
```json
{
  "version": "1.0.0",
  "timestamp": "2025-10-22T14:30:00Z",
  "skills": {
    "changelog-manager": {
      "enabled": true,
      "permissions": ["Skill(changelog-manager)", "Bash(python scripts/generate_docs.py:*)"]
    },
    "cli-modern-tools": {
      "enabled": true,
      "permissions": ["Skill(cli-modern-tools)"]
    }
  },
  "settings": {
    "allow": [...],
    "deny": [...],
    "ask": [...]
  }
}
```

### Import Configuration

```bash
/cs:skill-management import my-skills-config.json
```

**Workflow:**
1. Read JSON file
2. Validate structure
3. Show diff of changes
4. Ask for confirmation
5. Apply changes to settings.local.json

---

## ⚠️ **Safety and Validation**

### Before Making Changes

1. **Backup settings.local.json:**
   ```bash
   cp .claude/settings.local.json .claude/settings.local.json.backup
   ```

2. **Validate JSON after changes:**
   ```bash
   python -m json.tool .claude/settings.local.json
   ```

3. **Show diff before applying:**
   ```bash
   diff .claude/settings.local.json.backup .claude/settings.local.json
   ```

### Error Handling

**If JSON becomes invalid:**
```
❌ Error: settings.local.json is invalid JSON!

Would you like to:
1. Restore from backup (.claude/settings.local.json.backup)
2. Show errors and fix manually
3. Cancel

Choose (1-3):
```

---

## 🎯 **Example User Flows**

### Flow 1: Enable a New Skill

```
User: /cs:skill-management
Claude: [Shows interactive menu]

User: 6 (Enable a Skill)
Claude: Available skills to enable:
        1. skill-creator
        2. template-skill
        Choose (1-2):

User: 1
Claude: ✅ Enabled: skill-creator
        Added permissions:
        - Skill(skill-creator)

        Updated: .claude/settings.local.json
```

### Flow 2: Quick Disable

```
User: /cs:skill-management disable time-helper
Claude: ⬜ Disabled: time-helper
        Removed permissions:
        - Skill(time-helper)
        - Read(//c/Users/rohit/.claude/skills/time-helper/**)

        Updated: .claude/settings.local.json
```

### Flow 3: Browse by Category

```
User: /cs:skill-management
Claude: [Shows interactive menu]

User: 4 (Browse by Category)
Claude: [Shows category menu]

User: 1 (Release Management)
Claude: Release Management Skills (1)

        ✅ changelog-manager (v2.8.0)
           Update project changelog with uncommitted changes
           Status: Enabled

        Actions: [v]iew [e]nable [d]isable [c]onfigure [b]ack

User: v
Claude: [Shows detailed skill information]
```

---

## 📊 **Statistics and Reporting**

**Show skill usage statistics:**

```
📊 Skill Statistics
===================

Total Skills: 7
Enabled: 5 (71%)
Disabled: 2 (29%)

Most Used (this month):
1. changelog-manager (12 times)
2. cli-modern-tools (8 times)
3. time-helper (5 times)

Categories:
- Release Management: 1 skill
- CLI Tools: 1 skill
- Output/Display: 1 skill
- Documentation: 1 skill
- Time/Date: 1 skill
- Development: 2 skills

Permissions Summary:
- Total permissions configured: 23
- Bash permissions: 15
- Skill permissions: 5
- Read permissions: 2
- Other: 1
```

---

## Version History

### v1.1.0 (2025-10-22)
- ✨ Added auto-activate toggle feature
- ✨ Added comprehensive permission management (add/remove/list)
- ✨ Added tag management (add/remove tags)
- ✨ Added priority setting system (1-10 scale)
- ✨ Added custom configuration parameters
- ✨ Added advanced configuration view
- 🔧 Enhanced Python backend with 8 new methods (~300 lines)
- 📚 Updated documentation with all new features
- ✅ All features tested and working

### v1.0.0 (2025-10-22)
- Initial release
- Interactive menu system
- Argument-based quick actions
- Category-based browsing
- Basic permission management
- settings.local.json integration
- CLAUDE.md integration support
- Export/import configuration
- Native Python script (90% token savings)
