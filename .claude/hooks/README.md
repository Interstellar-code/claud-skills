# AgentHero AI Session Hooks

This directory contains hooks that run automatically when Claude Code starts or resumes from context limits.

## 📋 display_pending_topics.py

**Purpose**: Display all pending and in-progress AgentHero AI topics when starting or resuming a Claude Code session.

### Features

- ✅ Displays pending and in-progress topics
- ✅ Shows task completion progress with visual progress bars
- ✅ Color-coded status icons (🔄 in-progress, ⏸️ pending)
- ✅ Priority indicators (🔥 high priority)
- ✅ Formatted dates and timestamps
- ✅ Cross-platform (Windows, Linux, Mac)
- ✅ UTF-8 emoji support on Windows

### When It Runs

The hook automatically runs:
- **SessionStart**: When you start a new Claude Code session
- **PreCompact**: Before Claude Code compacts the conversation (context limit)

### Example Output

```
📋 AgentHero AI: 2 pending topics

────────────────────────────────────────────────────────────

🔄 SubsHero Website Development [IN_PROGRESS]
   📂 Slug: subshero-website
   📅 Created: 2025-10-25 14:30
   ✓  Progress: 2/4 tasks completed (50%)
   █████░░░░░
   🔥 Priority: high

⏸️ API Documentation Generator [PENDING]
   📂 Slug: api-docs-generator
   📅 Created: 2025-10-24 10:15
   ✓  Progress: 0/6 tasks completed (0%)
   ░░░░░░░░░░

────────────────────────────────────────────────────────────

💡 Commands:
   • /agenthero-ai          - Interactive menu
   • resume topic [slug]    - Resume a specific topic
   • show topic [slug]      - View topic details
```

### Configuration

The hook is configured in `.claude/settings.local.json`:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "cd C:/laragon/www/claud-skills && python .claude/hooks/display_pending_topics.py"
          }
        ]
      }
    ],
    "PreCompact": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "cd C:/laragon/www/claud-skills && python .claude/hooks/display_pending_topics.py"
          }
        ]
      }
    ]
  }
}
```

### Testing

Run the hook manually:

```bash
# Test the hook
python .claude/hooks/display_pending_topics.py

# Expected outputs:
# - "✅ AgentHero AI: No pending topics" (if no topics)
# - Full formatted list of pending topics (if topics exist)
```

### Troubleshooting

**Unicode errors on Windows?**
- The script automatically fixes UTF-8 encoding for Windows console
- If errors persist, ensure Python 3.7+ is installed

**Hook not running?**
- Verify `.claude/settings.local.json` has correct hook configuration
- Check Python is in your PATH
- Test the script manually to see errors

**No topics showing?**
- Verify topics.json exists at `.claude/agents/state/agenthero-ai/topics.json`
- Check topics have status "pending" or "in_progress"
- Run script manually to debug

### Requirements

- Python 3.7+
- AgentHero AI state directory at `.claude/agents/state/agenthero-ai/`

### Version

- **Version**: 1.0.1
- **Last Updated**: 2025-10-25
- **Author**: AgentHero AI
