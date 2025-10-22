# Project Task Orchestration Command

**Purpose**: Launch hierarchical multi-agent orchestration system with PM coordination

---

## Command: `/cs:projecttask`

This command activates the **PM Project Orchestrator** agent for complex multi-agent workflows.

## What This Does

1. **Session Start Check**: Automatically checks for active project topics
2. **Topic Management**: Lists active topics with progress metrics
3. **Interactive Menu**: Presents menu-driven interface for orchestration
4. **Sub-Agent Coordination**: Allows creation and monitoring of specialist sub-agents
5. **State Management**: Maintains file-based state for resumability

## Execution

When you run this command, the PM orchestrator will:

1. Check `.claude/agents/state/topics.json` for active topics
2. If active topics exist:
   - Display summary with progress
   - Offer to resume or start new topic
3. If no active topics:
   - Prompt for new topic creation
4. Present interactive menu for orchestration

## Agent Invocation

**Agent**: `pm-project-orchestrator`
**Subagent Type**: Main conversation (not a subagent)

## Usage Examples

### Start New Project
```
/cs:projecttask

→ No active topics found
→ Let's create a new project topic!
→ What would you like to work on?

User: "Create user authentication with JWT"

→ [Creates topic, presents menu]
```

### Resume Existing Project
```
/cs:projecttask

→ Found 2 active topics:
  • Add JWT authentication (33% complete, 1/3 tasks)
  • Shopping cart flow (50% complete, 2/4 tasks)
→ What would you like to do?
  1. Resume "Add JWT authentication"
  2. Resume "Shopping cart flow"
  3. Start new topic
```

## Interactive Menu

After activation, you'll see:

```
🎯 Project Task Orchestration Menu

Current Topic: auth-system-jwt (33% complete, 1/3 tasks)

Options:
1. Continue working on current topic
2. Create a new sub-agent for this topic
3. View sub-agent outputs (detailed logs)
4. View topic status and progress
5. Pause and work on different topic
6. Start a new topic
7. Archive completed topics
8. Exit orchestration
```

## Key Features

- **Template-Based Sub-Agents**: No predefined agents - create any specialist on demand
- **Parallel Execution**: Independent tasks run simultaneously
- **File-Based State**: All progress saved for resumability
- **Output Viewing**: "Switch" to view any sub-agent's detailed logs
- **Question Routing**: Sub-agents ask PM, PM asks you (clear hierarchy)
- **Token Tracking**: Monitor token usage and parallel execution savings

## Requirements

- `jq` must be installed (for JSON parsing)
- `.claude/agents/state/` directory (auto-created if missing)
- `project-orchestration` skill (provides utilities)

## When to Use

Use this command when:
- ✅ Task requires multiple specialists (frontend + backend + testing)
- ✅ Task has independent subtasks that can run in parallel
- ✅ You want to organize complex work into manageable pieces
- ✅ You need transparency into each specialist's progress
- ✅ You want to resume work across multiple sessions

Don't use when:
- ❌ Simple single-file changes
- ❌ Quick fixes or typos
- ❌ Tasks that require tight sequential coordination
- ❌ When you want to do the work yourself (not delegate)

## State Directory

Topics and tasks are stored in:
```
.claude/agents/state/
├── topics.json           # Active topics registry
└── {topic-slug}/         # Per-topic state
    ├── topic.json        # Topic metadata
    ├── pm-state.json     # PM orchestration state
    ├── task-*.json       # Sub-agent states
    └── messages.json     # Message queue
```

State files are **gitignored** - they contain runtime data only.

## Exit and Resume

To exit orchestration:
- Select option "8. Exit orchestration" from menu
- All state is saved automatically
- Run `/cs:projecttask` again to resume

Topics persist across sessions until archived.

## Troubleshooting

**Command not working?**
- Check if `jq` is installed: `which jq`
- Verify state directory exists: `ls -la .claude/agents/state/`
- Check topics registry: `cat .claude/agents/state/topics.json`

**Sub-agents not responding?**
- View sub-agent output (menu option 3)
- Check state file: `cat .claude/agents/state/{topic}/task-*.json | jq '.'`
- Look for errors in logs: `jq '.logs[] | select(.level=="error")' state-file.json`

---

## Implementation

**Activate PM orchestrator agent** with initial context:

```markdown
You are now acting as the **PM Project Orchestrator**.

Check for active topics and present appropriate menu.

Use the project-orchestration skill utilities for all state management.

Follow the behavioral rules and workflows defined in your agent file.

Begin by checking for active topics:
```bash
bash .claude/skills/project-orchestration/scripts/topic-manager.sh \
  get_active_topics_summary
```
```

---

**Version**: 1.0.0 (MVP)
**Created**: 2025-10-22
**Agent**: pm-project-orchestrator
