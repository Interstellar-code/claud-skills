# Orchestration State Directory

This directory contains runtime state files for the hierarchical multi-agent orchestration system.

## Structure

```
state/
├── .gitignore                  # Ignore all state files (runtime data)
├── README.md                   # This file
├── topics.json                 # Active topics registry
├── {topic-slug}/               # Per-topic state directory
│   ├── topic.json              # Topic metadata and token usage
│   ├── pm-state.json           # PM orchestration state
│   ├── task-{id}-{agent}.json  # Individual task states
│   └── messages.json           # Inter-agent message queue
└── archive/                    # Completed topics (preserved for history)
    └── {topic-slug}/           # Archived topic states
```

## State File Purpose

### `topics.json`
- Registry of all active and completed topics
- Quick lookup for session resume
- Summary metrics (progress, token usage, status)

### `{topic-slug}/topic.json`
- Complete topic metadata
- Token usage breakdown
- File changes tracking
- Related tags and context

### `{topic-slug}/pm-state.json`
- PM's view of orchestration
- Task queue and assignments
- Overall progress tracking
- PM token usage

### `{topic-slug}/task-{id}-{agent}.json`
- Individual sub-agent state
- Detailed execution logs
- File changes per task
- Blocking questions and answers
- Task-specific token usage

### `{topic-slug}/messages.json`
- Inter-agent message queue
- Question routing
- Completion notifications
- Communication audit trail

## Initialization

State files are created automatically when:
1. User starts a new topic via `/cs:projecttask`
2. PM creates a new sub-agent
3. Sub-agent logs activity

## Archival

When a topic completes:
1. All state files move to `archive/{topic-slug}/`
2. Topic marked as "completed" in `topics.json`
3. Historical data preserved for reference

## File Format

All state files use JSON format for:
- Easy parsing with `jq`
- Human-readable debugging
- Atomic updates via temp files
- Cross-platform compatibility

## Best Practices

1. **Atomic Writes**: Always use `jq ... > tmp && mv tmp file.json`
2. **Timestamps**: Use ISO 8601 format (`date -Iseconds`)
3. **Validation**: Validate JSON before writing
4. **Backup**: Archive preserves historical data
5. **Debugging**: State files are your debug log

## Token Tracking

State files include token usage metrics:
- Per-task token counts
- PM vs sub-agent breakdown
- Parallel execution savings
- Sequential vs parallel estimates

## Security

State files may contain:
- File paths from your project
- Task descriptions
- Code snippets in logs

**Do not commit state files to version control.**
(Gitignored by default)

## Support

For issues with state files:
1. Check JSON validity: `jq . file.json`
2. Review recent logs in task state files
3. Check `topics.json` for topic status
4. Verify file permissions

## Cleanup

To reset orchestration state:
```bash
# Archive all active topics
mv .claude/agents/state/*/  .claude/agents/state/archive/

# Reset topics registry
echo '{"active": [], "completed": []}' > .claude/agents/state/topics.json
```

---

**Created by**: Hierarchical Orchestration System v1.0.0
**Last Updated**: 2025-10-22
