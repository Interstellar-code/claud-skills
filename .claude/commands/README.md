# Claude Code Slash Commands

This directory contains slash commands for Claude Code. Slash commands are shortcuts that expand into full prompts when invoked.

## Available Commands

### `/agenthero-ai [--status]`

**Purpose**: Launch AgentHero AI orchestration system or display topic status

**Usage**:
- `/agenthero-ai` - Launch interactive menu for topic management
- `/agenthero-ai --status` - Display pending/in-progress topics with detailed status

**Implementation**:
- Command file: `agenthero-ai.md`
- Status script: `.claude/hooks/display_pending_topics.py`
- Skill: `agenthero-ai`

### `/analyze`

**Purpose**: Analyze code or system behavior

### `/troubleshoot`

**Purpose**: Diagnose and fix issues

### `/cs-projecttask`

**Purpose**: Legacy PM orchestration command (V1.0)

**Note**: Use `/agenthero-ai` instead for V2.0 features

### `/cs-skill-management`

**Purpose**: Manage Claude Code skills (enable/disable, configure)

## How Slash Commands Work

1. User types slash command (e.g., `/agenthero-ai --status`)
2. Claude Code expands the command by reading the corresponding `.md` file
3. Claude reads the instructions in the file and executes them
4. Parameters (like `--status`) are detected by checking the user's original message

## Creating New Slash Commands

1. Create a new `.md` file in this directory
2. Add command documentation (user-facing)
3. Add implementation instructions (Claude-facing) at the end
4. Use `## 🤖 Instructions for Claude` section for execution logic

## Parameter Handling

Slash commands support parameters through pattern detection:

```markdown
## 🤖 Instructions for Claude

Check the user's original message to detect parameters:
- If message contains "--status" → Execute status display
- Otherwise → Execute default behavior
```

Claude will check the user's original command and branch accordingly.

## Testing Commands

Test slash commands by:

1. **Direct invocation**: Type `/command-name` in Claude Code
2. **Manual testing**: Run the underlying scripts/tools directly
   ```bash
   python .claude/hooks/display_pending_topics.py
   ```
3. **Verify expansion**: Check that Claude reads and follows instructions

## Best Practices

1. **Clear instructions**: Provide step-by-step instructions for Claude
2. **Parameter detection**: Use simple pattern matching (contains, equals)
3. **Error handling**: Include troubleshooting section
4. **Documentation**: Explain what the command does and when to use it
5. **Examples**: Show example output and usage scenarios

## Troubleshooting

**Command not found?**
- Ensure `.md` file exists in `.claude/commands/`
- Check filename matches command name (kebab-case)
- Restart Claude Code to reload commands

**Parameters not working?**
- Verify Claude checks user's original message
- Use simple string matching (avoid complex parsing)
- Provide clear examples in command file

**Script errors?**
- Test underlying scripts manually
- Check Python/Bash interpreter availability
- Verify file paths are correct

---

**Version**: 1.0.0
**Created**: 2025-10-25
