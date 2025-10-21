# Lark Agent Simple

Token-efficient Lark task creation from markdown test files.

## Overview

This skill provides a **60-70% token reduction** compared to the original `lark-agent` by:
- Outputting minimal JSON data (no workflow instructions)
- Executing Lark MCP calls directly from slash command
- Eliminating interpretation overhead

## Quick Start

```bash
/lark-agent-simple examples/sample-test.md --owner="QA Team" --due-date="2025-12-31"
```

## Architecture

**Data Flow:**
```
Markdown File
    ↓
Python Parser (minimal output)
    ↓
Compact JSON (~500-1000 tokens)
    ↓
Claude Code (direct MCP execution)
    ↓
Lark Tasks Created
```

**Key Principle:** "Data in Python, Logic in Claude"

## Token Efficiency

| Metric | Original lark-agent | lark-agent-simple |
|--------|-------------------|------------------|
| Python Output | 2,000-5,000 tokens | 500-1,000 tokens |
| Total Usage | 10,000-25,000 tokens | 3,000-8,000 tokens |
| **Reduction** | - | **60-70%** |

## Usage

### Command

```bash
/lark-agent-simple <markdown-file> [options]
```

### Options

- `--owner="Name"` - Task owner (default: "Test User")
- `--due-date="YYYY-MM-DD"` - Due date (default: 14 days from now)
- `--start-date="YYYY-MM-DD"` - Start date (default: today)

### Examples

```bash
# Basic usage
/lark-agent-simple tests/manual/login-test.md

# With custom owner and date
/lark-agent-simple tests/manual/signup-test.md --owner="QA Team" --due-date="2025-12-31"

# With start and due dates
/lark-agent-simple tests/manual/api-test.md --start-date="2025-10-20" --due-date="2025-11-03"
```

## Markdown Format

```markdown
# Test Title
Test description

## Test Scenario: Scenario Name
Scenario description

### Task: Task Name
1. Step one
2. Step two

Expected Result: What should happen
```

## Testing the Parser

Test the Python parser independently:

```bash
cd .claude/skills/lark-agent-simple
python run.py examples/sample-test.md --owner="Test User" --due-date="2025-12-31"
```

This outputs compact JSON without creating any Lark tasks.

## Output Example

```json
{
  "success": true,
  "data": {
    "test": {
      "title": "Sample User Login Test",
      "description": "Comprehensive test plan for user login",
      "owner": "QA Team",
      "start_date": "2025-10-19",
      "due_date": "2025-11-02"
    },
    "scenarios": [
      {
        "id": "scenario-0-1729300000000",
        "title": "Valid Login Flow",
        "description": "Test successful login with valid credentials",
        "tasks": [
          {
            "id": "task-0-0-1729300000000",
            "title": "Navigate to Login Page",
            "description": "1. Open browser\n2. Navigate to login...",
            "expected_result": "Login page should load successfully..."
          }
        ]
      }
    ],
    "metadata": {
      "total_scenarios": 3,
      "total_tasks": 10,
      "source_file": "examples/sample-test.md"
    }
  }
}
```

## Lark Task Hierarchy

Creates 3-level structure:

1. **Task List** - "Test: [Test Title]"
2. **Parent Task** (Level 1) - Test overview
3. **Scenario Tasks** (Level 2) - Marked as milestones
4. **Individual Tasks** (Level 3) - Test steps

## Files

- `SKILL.md` - Complete documentation
- `run.py` - Entry point
- `scripts/lark_agent_simple.py` - Minimal parser
- `scripts/markdown_parser.py` - Markdown parser (copied from original)
- `examples/sample-test.md` - Example test file

## Commands

- `.claude/commands/lark-agent-simple.md` - Slash command with MCP execution logic

## Benefits

✅ **60-70% token reduction** - Uses minimal JSON output
✅ **Direct execution** - No workflow interpretation needed
✅ **Faster** - No generation overhead
✅ **Cleaner** - Separation of data and logic
✅ **Maintainable** - Single execution pattern

## When to Use

**Use lark-agent-simple when:**
- You want token-efficient execution
- You have simple test files
- Speed is important

**Use original lark-agent when:**
- You need detailed workflow tracking
- You want verification steps
- You need complex error handling

## Troubleshooting

### Parser Issues
- Check markdown structure (H1 > H2 > H3)
- Verify UTF-8 encoding
- Ensure scenario headers start with "Test Scenario:"

### MCP Issues
- Verify Lark MCP server is running
- Check user permissions
- Validate date formats (YYYY-MM-DD)

## Version

**v1.0.0** - Initial release with token-efficient architecture

## License

Part of Claude Code skills collection.
