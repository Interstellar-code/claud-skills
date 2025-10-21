# Lark Agent Skill

An automated Claude Code skill for processing markdown test files into structured JSON, creating hierarchical Lark tasks via MCP, and verifying the creation with comprehensive reporting.

## Quick Start

### Installation

1. The skill is already installed in `.claude/skills/lark-agent/`
2. Claude Code will automatically detect and use this skill when appropriate

### Basic Usage

Simply ask Claude Code to process your test file:

```
Process this test file with lark-agent: tests/my-test.md
```

Claude Code will execute the complete workflow:
1. **Parse** the markdown file
2. **Generate** structured JSON
3. **Create** hierarchical Lark tasks (parent → scenarios → tasks)
4. **Verify** all tasks were created correctly
5. **Update** the JSON with Lark task IDs
6. **Report** on creation status and any issues

### With Options

```
Process tests/my-test.md with lark-agent --owner="QA Team" --target-date="2025-12-31" --priority=high
```

## What This Skill Does

### Input: Markdown Test File

```markdown
# User Login Test

## Test Scenario: Successful Login
Test that users can log in with valid credentials

### Task: Login with Email
1. Navigate to login page
2. Enter valid email and password
3. Click Sign In button
Expected Result: User should be redirected to dashboard
```

### Output: Structured JSON

```json
{
  "testOverview": {
    "title": "User Login Test",
    "owner": "QA Team",
    "targetDate": "2025-12-31"
  },
  "scenarios": [
    {
      "title": "Test Scenario: Successful Login",
      "tasks": [
        {
          "title": "Task: Login with Email",
          "description": "Navigate to login page, Enter valid email and password, Click Sign In button",
          "expectedResult": "User should be redirected to dashboard"
        }
      ]
    }
  ]
}
```

### Result: Lark Tasks

Creates a 3-level hierarchy in Lark:
- **Level 1**: Parent task (User Login Test)
- **Level 2**: Scenario tasks (Successful Login) - marked as milestones
- **Level 3**: Individual tasks (Login with Email)

## File Structure

```
lark-agent/
├── SKILL.md                          # Main skill documentation
├── README.md                         # This file
├── INSTALLATION.md                   # Installation and setup guide
├── scripts/
│   ├── lark_agent.py                # Main workflow orchestrator
│   ├── markdown_parser.py           # Markdown parsing logic
│   ├── lark_task_creator.py         # Lark task creation via MCP
│   └── lark_task_verifier.py        # Task verification and reporting
├── references/
│   ├── usage-guide.md               # Detailed usage guide
│   ├── json-schema.md               # JSON structure specification
│   └── markdown-format.md           # Markdown format requirements
└── assets/
    └── templates/
        ├── test-template.md         # Example markdown template
        └── output-template.json     # Example JSON output
```

## Markdown Format Requirements

Your markdown file must follow this structure:

```markdown
# Test Title (H1 - Required)
Brief description

## Test Scenario: Scenario Name (H2 - Required)
Scenario description

### Task: Task Name (H3 - Required)
1. Step one
2. Step two
Expected Result: What should happen
```

See `references/markdown-format.md` for complete format specification.

## Available Options

- `--owner`: Assign owner to tasks (default: "Test User")
- `--target-date`: Target completion date YYYY-MM-DD (default: 14 days from now)
- `--start-date`: Start date YYYY-MM-DD (default: today)
- `--priority`: Task priority: low/medium/high (default: medium)
- `--timezone`: Timezone for date calculations (default: UTC)

## Examples

### Example 1: Basic Usage

```
Process tests/login-test.md with lark-agent
```

### Example 2: With Owner and Date

```
Process tests/checkout-test.md with lark-agent --owner="QA Lead" --target-date="2025-11-30"
```

### Example 3: High Priority Test

```
Process tests/critical-bug-test.md with lark-agent --priority=high --owner="Dev Team"
```

## Testing the Parser

You can test the markdown parser independently:

```bash
python .claude/skills/lark-agent/scripts/markdown_parser.py tests/my-test.md
```

This will output the generated JSON structure without creating Lark tasks.

## Integration with Lark MCP

This skill uses the Lark MCP server for task creation. Ensure:

1. Lark MCP server is running
2. You have proper Lark API credentials
3. You have permissions to create tasks in Lark

The skill uses these Lark MCP tools:
- `task_v2_task_create` - Create tasks
- `task_v2_tasklist_create` - Create task lists
- `task_v2_taskSubtask_create` - Create subtasks
- `task_v2_task_addMembers` - Assign users

## Troubleshooting

### Markdown Parsing Issues

**Problem**: Parser fails to extract scenarios
**Solution**: Ensure H2 headings start with "Test Scenario:"

**Problem**: Tasks missing expected results
**Solution**: Add "Expected Result:" line to each task

### Lark Task Creation Issues

**Problem**: Tasks not created in Lark
**Solution**: Verify Lark MCP server is running and accessible

**Problem**: User assignment fails
**Solution**: Check that the specified owner exists in Lark

## Documentation

- **SKILL.md**: Complete skill documentation
- **references/usage-guide.md**: Detailed usage examples
- **references/json-schema.md**: JSON structure specification
- **references/markdown-format.md**: Markdown format requirements

## Version

Current version: 1.0.0

## License

Part of the SubsHero project.

## Support

For issues or questions:
1. Check the documentation in `references/`
2. Review example templates in `assets/templates/`
3. Test the parser with `markdown_parser.py`

