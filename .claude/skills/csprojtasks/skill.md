---
name: csprojtasks
description: Hierarchical multi-agent orchestration system with PM coordination, file-based state management, and interactive menu interface. Use when managing complex multi-agent workflows, coordinating parallel sub-agents, or organizing large project tasks with multiple specialists.
---

# CS Project Tasks Skill

Comprehensive orchestration utilities for managing hierarchical multi-agent systems with PM coordination, state management, and topic-based organization.

## Overview

This skill provides utilities for:
- **State Management**: Create, read, update state files for orchestration
- **Topic Lifecycle**: Initialize, resume, archive project topics
- **Task Coordination**: Manage sub-agent tasks and dependencies
- **Token Tracking**: Monitor and report token usage across agents
- **Interactive Menu**: Browse topics, view tasks, and invoke the PM agent (see `INTERACTIVE-MENU-WORKFLOW.md`)

## When Claude Should Use This Skill

Auto-activate when:
- User requests `/cs:projecttask` command
- PM orchestrator needs to manage state files
- Creating or updating topic metadata
- Initializing sub-agent task states
- Archiving completed topics
- Reading orchestration state for resume

## Directory Structure

```
.claude/
├── agents/
│   ├── pm-project-orchestrator.md       # PM agent
│   ├── orchestrated-sub-agent-template.md  # Universal template
│   └── state/                            # Runtime state
│       ├── topics.json                   # Active topics registry
│       ├── {topic-slug}/                 # Per-topic state
│       │   ├── topic.json
│       │   ├── pm-state.json
│       │   ├── task-{id}-{name}.json
│       │   └── messages.json
│       └── archive/                      # Completed topics
│
└── skills/
    └── csprojtasks/
        ├── SKILL.md                      # This file
        ├── scripts/
        │   ├── state-manager.sh          # State CRUD operations
        │   ├── topic-manager.sh          # Topic lifecycle
        │   └── utils.sh                  # Shared utilities
        └── templates/
            └── state-templates.json      # State file schemas
```

## Utilities

### 1. State Manager (`scripts/state-manager.sh`)

**Purpose**: CRUD operations for state files

**Functions**:
- `create_state_file <path> <template>` - Initialize state file from template
- `read_state <path> <field>` - Read specific field from state
- `update_state <path> <field> <value>` - Update state field
- `append_log <path> <level> <message>` - Append log entry
- `validate_state <path>` - Validate JSON structure

**Usage Example**:
```bash
# Create new task state
bash .claude/skills/csprojtasks/scripts/state-manager.sh \
  create_state_file \
  ".claude/agents/state/auth-system/task-001-backend.json" \
  "task-state"

# Append log entry
bash .claude/skills/csprojtasks/scripts/state-manager.sh \
  append_log \
  ".claude/agents/state/auth-system/task-001-backend.json" \
  "info" \
  "Starting database schema design"

# Read current status
bash .claude/skills/csprojtasks/scripts/state-manager.sh \
  read_state \
  ".claude/agents/state/auth-system/task-001-backend.json" \
  ".status"
```

### 2. Topic Manager (`scripts/topic-manager.sh`)

**Purpose**: Manage topic lifecycle

**Functions**:
- `create_topic <title> <description>` - Initialize new topic
- `list_active_topics` - Get all active topics
- `get_topic_status <slug>` - Get topic progress and metrics
- `archive_topic <slug>` - Move topic to archive
- `resume_topic <slug>` - Prepare topic for resume

**Usage Example**:
```bash
# Create new topic
bash .claude/skills/csprojtasks/scripts/topic-manager.sh \
  create_topic \
  "Add JWT authentication" \
  "Implement JWT-based auth with tokens and middleware"

# List active topics
bash .claude/skills/csprojtasks/scripts/topic-manager.sh \
  list_active_topics

# Get topic status
bash .claude/skills/csprojtasks/scripts/topic-manager.sh \
  get_topic_status \
  "auth-system-jwt"

# Archive completed topic
bash .claude/skills/csprojtasks/scripts/topic-manager.sh \
  archive_topic \
  "auth-system-jwt"
```

### 3. Utility Functions (`scripts/utils.sh`)

**Purpose**: Shared helper functions

**Functions**:
- `slugify <text>` - Convert text to URL-safe slug
- `generate_task_id` - Generate unique task ID
- `timestamp_iso` - Get ISO 8601 timestamp
- `atomic_write <path> <content>` - Atomic file write
- `ensure_directory <path>` - Create directory if needed

**Usage Example**:
```bash
# Source utilities
source .claude/skills/csprojtasks/scripts/utils.sh

# Generate slug
SLUG=$(slugify "Add JWT Authentication")
# Returns: "add-jwt-authentication"

# Generate task ID
TASK_ID=$(generate_task_id)
# Returns: "task_001"

# Atomic write
atomic_write "state.json" '{"status": "completed"}'
```

## State File Templates

Templates are stored in `templates/state-templates.json`:

### Topic State Template
```json
{
  "slug": "",
  "title": "",
  "description": "",
  "status": "in_progress",
  "createdAt": "",
  "lastActiveAt": "",
  "completedAt": null,
  "userRequest": "",
  "tags": [],
  "relatedFiles": [],
  "tokenUsage": {
    "total": 0,
    "pmAgent": 0,
    "subAgents": {},
    "estimated": 0,
    "savings": 0,
    "savingsPercent": 0
  }
}
```

### PM State Template
```json
{
  "topicSlug": "",
  "sessionId": "",
  "userRequest": "",
  "tasks": [],
  "overallStatus": "in_progress",
  "completedTasks": 0,
  "totalTasks": 0,
  "createdAt": "",
  "tokenUsage": {
    "pmTokens": 0,
    "subAgentTokens": 0,
    "totalTokens": 0
  }
}
```

### Task State Template
```json
{
  "taskId": "",
  "focusArea": "",
  "userPrompt": "",
  "status": "pending",
  "assignedAt": "",
  "startedAt": null,
  "completedAt": null,
  "progress": 0,
  "currentOperation": null,
  "logs": [],
  "filesCreated": [],
  "filesModified": [],
  "blockingQuestion": null,
  "result": null,
  "error": null,
  "tokenUsage": {
    "total": 0,
    "operations": []
  }
}
```

## Integration with PM Orchestrator

The PM agent (`pm-project-orchestrator.md`) uses these utilities for:

1. **Topic Initialization**
   ```bash
   # PM creates new topic
   topic-manager.sh create_topic "User login feature" "Create login with validation"
   ```

2. **Task State Management**
   ```bash
   # PM initializes sub-agent task
   state-manager.sh create_state_file \
     ".claude/agents/state/login-feature/task-001-frontend.json" \
     "task-state"
   ```

3. **Progress Monitoring**
   ```bash
   # PM reads task status
   state-manager.sh read_state \
     ".claude/agents/state/login-feature/task-001-frontend.json" \
     ".status"
   ```

4. **Topic Archival**
   ```bash
   # PM archives completed topic
   topic-manager.sh archive_topic "login-feature"
   ```

## Integration with Sub-Agents

Sub-agents use state-manager for logging:

```bash
# Sub-agent logs progress
state-manager.sh append_log \
  "$STATE_FILE" \
  "info" \
  "Creating LoginForm component"

# Sub-agent logs milestone
state-manager.sh append_log \
  "$STATE_FILE" \
  "progress" \
  "Login form complete (40% complete)"

# Sub-agent updates current operation
state-manager.sh update_state \
  "$STATE_FILE" \
  ".currentOperation" \
  "Adding form validation"
```

## Token Tracking

Token metrics are updated via:

```bash
# Update task token usage
state-manager.sh update_state \
  "$STATE_FILE" \
  ".tokenUsage.total" \
  "3500"

# Update PM token usage
state-manager.sh update_state \
  ".claude/agents/state/topic/pm-state.json" \
  ".tokenUsage.pmTokens" \
  "1200"
```

## Best Practices

1. **Always validate JSON** before writing
2. **Use atomic writes** (temp file + mv)
3. **Log regularly** (every 30-60 seconds minimum)
4. **Update progress milestones** (25%, 50%, 75%, 100%)
5. **Track file changes** in state files
6. **Archive completed topics** for history

## Error Handling

All scripts include error handling:
- Validate input parameters
- Check file existence
- Verify JSON structure
- Return meaningful error codes
- Log errors to stderr

## Performance

State operations are optimized:
- Use `jq` for efficient JSON parsing
- Atomic writes prevent corruption
- Minimal file I/O
- Cached slug lookups

## Security

State files may contain sensitive data:
- Gitignored by default
- File permissions: 644 (owner read/write)
- No credentials stored in state
- Audit trail for all operations

## Troubleshooting

**Invalid JSON error:**
```bash
# Validate state file
jq . .claude/agents/state/topic/task-001.json
```

**State file not found:**
```bash
# Check topics registry
cat .claude/agents/state/topics.json
```

**Permission errors:**
```bash
# Fix permissions
chmod 644 .claude/agents/state/**/*.json
```

## Version

**Version**: 1.0.0
**Created**: 2025-10-22
**Updated**: 2025-10-22

## Support

For issues:
1. Check JSON validity with `jq`
2. Review `.claude/agents/state/README.md`
3. Verify directory structure
4. Check file permissions

---

**Part of**: Hierarchical Multi-Agent Orchestration System
**Related**: pm-project-orchestrator.md, orchestrated-sub-agent-template.md
