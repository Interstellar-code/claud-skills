# AgentHero AI Command

**Purpose**: Launch AgentHero AI orchestration system or display topic status

---

## Command: `/agenthero-ai [--status]`

This command activates the **AgentHero AI orchestrator** for complex multi-agent workflows or displays pending topic status.

## Usage

### 1. Interactive Menu (Default)
```
/agenthero-ai
```
Launches the interactive menu for topic management, sub-agent coordination, and orchestration.

### 2. Status Display
```
/agenthero-ai --status
```
Displays all pending and in-progress topics with detailed information.

## What `--status` Does

When you run `/agenthero-ai --status`, it:

1. Executes the `display_pending_topics.py` hook script
2. Shows all pending and in-progress topics with:
   - Topic title and status
   - Description (truncated if long)
   - Topic slug
   - Current phase
   - Creation date and last active time
   - Progress bar with completion percentage
   - Priority level (if high/critical/low)
3. Displays helpful commands at the bottom

## Implementation

**Detect Parameters**:

Check if the user invoked this command with `--status`:

```javascript
// If user typed: /agenthero-ai --status
if (command_includes("--status")) {
    // Execute status display
    run_status_display();
} else {
    // Launch interactive menu
    launch_agenthero_skill();
}
```

**Status Display Execution**:

```bash
# Display pending topics using hook script
python .claude/hooks/display_pending_topics.py
```

**Interactive Menu Execution**:

Invoke the `agenthero-ai` skill for full orchestration capabilities.

## Example Output

```
📋 AgentHero AI: 2 pending topics

────────────────────────────────────────────────────────────

🔄 SubsHero Website [IN_PROGRESS]
   📝 Build a modern, responsive website for SubsHero subscription management platform
   📂 Slug: subshero-website
   🎯 Phase: Requirements Analysis
   📅 Created: 2025-10-25 19:36
   🕐 Last Active: 2025-10-25 19:42
   ✓  Progress: 1/5 tasks completed (20%)
   ██░░░░░░░░

⏸️ Authentication System [PENDING]
   📝 Implement JWT-based authentication with refresh tokens
   📂 Slug: auth-system-jwt
   🎯 Phase: Planning
   📅 Created: 2025-10-24 14:20
   🕐 Last Active: 2025-10-24 16:15
   ✓  Progress: 0/4 tasks completed (0%)
   ░░░░░░░░░░

────────────────────────────────────────────────────────────

💡 Commands:
   • /agenthero-ai          - Interactive menu
   • resume topic [slug]    - Resume a specific topic
   • show topic [slug]      - View topic details
```

## When to Use

**Use `/agenthero-ai --status` when:**
- ✅ Quick check of pending work
- ✅ After context limit resume (verify state)
- ✅ Before starting new session (see what's active)
- ✅ Checking progress on multiple topics

**Use `/agenthero-ai` (interactive) when:**
- ✅ Starting new project topic
- ✅ Resuming work on a topic
- ✅ Managing sub-agents
- ✅ Need full orchestration capabilities

## Requirements

- Python 3.6+ (for `display_pending_topics.py`)
- `.claude/agents/state/agenthero-ai/topics.json` (auto-created)
- `.claude/hooks/display_pending_topics.py` (hook script)

## Troubleshooting

**`--status` shows no topics?**
- Check if topics file exists: `ls -la .claude/agents/state/agenthero-ai/topics.json`
- Verify topics.json format: `cat .claude/agents/state/agenthero-ai/topics.json | jq '.'`

**Status display not working?**
- Ensure Python is installed: `python --version`
- Check hook script exists: `ls -la .claude/hooks/display_pending_topics.py`
- Run manually to see errors: `python .claude/hooks/display_pending_topics.py`

---

## 🤖 Instructions for Claude

When this command is executed, Claude should:

### Check for `--status` Parameter

**If the user invoked this command with `--status`** (e.g., `/agenthero-ai --status`):

1. Execute the status display script:
   ```bash
   python .claude/hooks/display_pending_topics.py
   ```

2. Output the result to the user

3. **DO NOT** launch the interactive menu or skill

4. After displaying status, wait for user input (they may want to resume a topic)

### Default Behavior (No Parameters)

**If the user invoked this command without parameters** (e.g., `/agenthero-ai`):

1. Invoke the `agenthero-ai` skill using the Skill tool:
   ```
   Skill(command: "agenthero-ai")
   ```

2. The skill will handle the interactive menu and orchestration workflow

3. Follow the skill's prompts and workflows

### Parameter Detection

Check the user's original message/command to detect if `--status` was included:
- `/agenthero-ai --status` → Run status display
- `/agenthero-ai` → Launch interactive skill

---

**Version**: 1.0.0
**Created**: 2025-10-25
**Skill**: agenthero-ai
