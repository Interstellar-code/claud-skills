# Multi-Topic Management System

**Version**: 2.1.0
**Status**: ✅ Production Ready

---

## Overview

The orchestration system now supports **multi-topic management**, allowing users to work on multiple projects simultaneously and switch between them seamlessly.

### Key Features

✅ **Multiple Active Topics** - Work on several projects at once
✅ **Topic Switching** - Seamlessly switch between topics
✅ **Background Execution** - Sub-agents run in background while you work on other topics
✅ **Topic Dashboard** - View all topics and their status at a glance
✅ **Topic Resume** - Pick up where you left off on any topic
✅ **Topic Archive** - Archive completed topics for reference

---

## Architecture

### Topic Registry

**Location**: `.claude/agents/state/topics.json`

```json
{
  "active": [
    {
      "slug": "subshero-competitor-research",
      "title": "SubsHero Competitor Research",
      "status": "in_progress",
      "createdAt": "2025-10-22T20:21:50+02:00",
      "lastActiveAt": "2025-10-22T20:21:50+02:00",
      "totalTasks": 3,
      "completedTasks": 3,
      "progress": 100
    }
  ],
  "completed": []
}
```

### Topic Directory Structure

```
.claude/agents/state/
├── topics.json                          # Central registry
├── subshero-competitor-research/        # Topic 1
│   ├── topic.json                       # Topic metadata
│   ├── pm-state.json                    # PM orchestration state
│   ├── task-001-market-research.json    # Sub-agent task states
│   ├── task-002-feature-comparison.json
│   └── task-003-pricing-analysis.json
└── subshero-single-page-website/       # Topic 2
    ├── topic.json
    ├── pm-state.json
    └── task-001-design.json
```

---

## User Workflow

### 1. View All Topics

**Command**:
```bash
python .claude/skills/csprojtasks/scripts/multi_topic_dashboard.py
```

**Output**:
```
📋 Multi-Topic Dashboard
Switch between topics and manage multiple projects

                     Active Topics
┌────┬──────────────────────┬──────────┬──────────┬─────────┐
│ No │ Topic                │ Progress │  Tasks   │  Last   │
├────┼──────────────────────┼──────────┼──────────┼─────────┤
│  1 │ SubsHero Competitor  │ ████████ │ ✅ 3/3   │   1h ago│
│    │ Research             │   100%   │          │         │
│  2 │ SubsHero Website     │ ███░░░░░ │ ✅ 1/3   │  23h ago│
│    │                      │    33%   │ 🔄 2     │         │
└────┴──────────────────────┴──────────┴──────────┴─────────┘

Actions:
  1-9  → Switch to topic by number
  n    → Create new topic
  a    → Archive completed topics
  q    → Quit dashboard
```

### 2. Create New Topic

When csprojecttask agent is invoked, it automatically shows active topics and offers to:
- **Resume existing topic**
- **Create new topic**

**PM Workflow**:
```
1. Check for active topics
2. If found → Show summary and ask user
3. User selects: Resume #1, Resume #2, or Create New
4. Set active topic context
5. Proceed with orchestration
```

### 3. Switch Between Topics

**Via Dashboard**:
```bash
python .claude/skills/csprojtasks/scripts/multi_topic_dashboard.py
# User enters: 1 (to switch to topic #1)
```

**Via PM Agent**:
```
User: "Switch to SubsHero website project"
PM: [Lists topics, user selects]
PM: Switched to topic: subshero-single-page-website
PM: Current status: 33% complete (1/3 tasks done)
PM: Ready to continue. What would you like me to do?
```

### 4. Background Task Execution

**Key Concept**: Sub-agents run in background via Task tool

**User Can**:
- Launch 3 agents in Topic A
- Switch to Topic B
- Launch 2 agents in Topic B
- Switch back to Topic A
- All 5 agents continue running in background

**PM Monitors**:
- Each topic has its own PM state file
- PM checks active topic's tasks when resumed
- Hooks update Claude UI for ALL topics (not just active)

---

## PM Orchestrator Integration

### Session Start - Check Topics

```bash
# Step 1: Check for active topics
python .claude/skills/csprojtasks/scripts/topic_manager.py \
  get_active_topics_summary

# If topics exist, show:
Found 2 active topic(s):
  • SubsHero Competitor Research (100% complete, 3/3 tasks)
  • SubsHero Single Page Website (33% complete, 1/3 tasks)
```

### Ask User Which Topic

```
AskUserQuestion:
  question: "You have 2 active topics. What would you like to do?"
  options:
    1: "Resume: SubsHero Competitor Research (100%)"
    2: "Resume: SubsHero Single Page Website (33%)"
    3: "Create new topic"
    4: "View all topics (dashboard)"
```

### Set Active Topic Context

```python
# Store active topic slug
active_topic_slug = "subshero-single-page-website"

# All subsequent operations use this slug
state_file = f".claude/agents/state/{active_topic_slug}/task-{id}.json"
pm_state_file = f".claude/agents/state/{active_topic_slug}/pm-state.json"
```

### Topic Switching During Session

```
User: "I want to work on the competitor research project now"

PM Actions:
1. Save current topic state (touch lastActiveAt)
2. Set new active topic: "subshero-competitor-research"
3. Load PM state from new topic
4. Show topic status
5. Continue orchestration
```

---

## CLI Commands

### List All Topics
```bash
python .claude/skills/csprojtasks/scripts/topic_manager.py \
  list_active_topics
```

### Get Topic Status
```bash
python .claude/skills/csprojtasks/scripts/topic_manager.py \
  get_topic_status "subshero-competitor-research"
```

### Create Topic
```bash
python .claude/skills/csprojtasks/scripts/topic_manager.py \
  create_topic "New Project Title" "Description"
```

### Archive Topic
```bash
python .claude/skills/csprojtasks/scripts/topic_manager.py \
  archive_topic "subshero-competitor-research"
```

### Resume Topic
```bash
python .claude/skills/csprojtasks/scripts/topic_manager.py \
  resume_topic "subshero-single-page-website"
```

### Multi-Topic Dashboard
```bash
# Show all topics
python .claude/skills/csprojtasks/scripts/multi_topic_dashboard.py

# Show specific topic details
python .claude/skills/csprojtasks/scripts/multi_topic_dashboard.py \
  --topic "subshero-competitor-research"

# List topics (simple)
python .claude/skills/csprojtasks/scripts/multi_topic_dashboard.py --list
```

---

## Hook System Integration

### Multi-Topic TodoWrite

**Problem**: TodoWrite is global (not per-topic)

**Solution**: Prefix tasks with topic indicator

```python
# Topic 1 tasks
TodoWrite(todos=[
    {
        "content": "[A:orch] [Topic:research] market-research-analyst: Market analysis",
        "status": "in_progress",
        "activeForm": "Analyzing market (50%)"
    },
    # Topic 2 tasks
    {
        "content": "[A:orch] [Topic:website] ui-designer: Homepage design",
        "status": "pending",
        "activeForm": "Waiting for brand assets"
    }
])
```

### Topic-Aware Progress Updates

```python
# PM monitors ALL active topics (not just current one)
for topic_slug in get_all_active_topics():
    pm_state = read_pm_state(topic_slug)

    for task in pm_state['tasks']:
        if task['status'] == 'in_progress':
            # Update TodoWrite for this task
            trigger_task_progress(task['id'], task['progress'], task['currentOp'])
```

---

## Example: Multi-Topic Workflow

### Scenario

User wants to work on 2 projects:
1. **SubsHero Competitor Research** (3 parallel agents)
2. **SubsHero Website Design** (2 parallel agents)

### Workflow

**Step 1: Create First Topic**
```
User: "Research SubsHero competitors"
PM: Creating topic: subshero-competitor-research
PM: Launching 3 agents in parallel:
     - market-research-analyst
     - feature-comparison-analyst
     - pricing-research-analyst
```

**Step 2: Switch to Second Topic**
```
User: "I also want to start the website design"
PM: Active topic: subshero-competitor-research (3 tasks in progress)
PM: Do you want to:
     1. Continue current topic
     2. Create new topic
User: 2
PM: Creating topic: subshero-single-page-website
PM: What would you like to do for this topic?
User: "Design the homepage"
PM: Launching 2 agents:
     - ui-designer
     - content-writer
```

**Step 3: Monitor Both Topics**
```
Claude Code Sidebar:
├── 🔄 [A:orch] [research] market-research-analyst (85%)
├── 🔄 [A:orch] [research] feature-comparison (72%)
├── ✅ [A:orch] [research] pricing-research (100%)
├── 🔄 [A:orch] [website] ui-designer (45%)
└── ⏳ [A:orch] [website] content-writer (0%)
```

**Step 4: Switch Back to First Topic**
```
User: "How's the research going?"
PM: Switching to topic: subshero-competitor-research
PM: Status: 66% complete (2/3 tasks done)
PM: market-research-analyst: ✅ Complete
PM: feature-comparison-analyst: ✅ Complete
PM: pricing-research-analyst: 🔄 In progress (72%)
```

---

## Benefits

### 1. True Multi-Tasking ✅
- Work on multiple projects simultaneously
- Sub-agents run in background
- No blocking or waiting

### 2. Context Preservation ✅
- Each topic maintains its own state
- Resume exactly where you left off
- No data loss when switching

### 3. Organized Workflow ✅
- Topics group related tasks
- Easy to see what's active vs completed
- Archive old topics for reference

### 4. Efficient Resource Usage ✅
- Parallel execution across topics
- Background tasks don't block UI
- PM coordinates multiple contexts

### 5. Better Visibility ✅
- Dashboard shows all topics at once
- TodoWrite integration shows all tasks
- Real-time progress updates across topics

---

## Configuration

### Topic Auto-Archive

Archive completed topics after 30 days:

**Config**: `.claude/agents/csprojecttask/topic-config.json`
```json
{
  "auto_archive_days": 30,
  "max_active_topics": 10,
  "show_completed_in_dashboard": true
}
```

### Topic Prefix Format

Customize topic prefix in hooks-config.json:

```json
{
  "task_prefix": "[A:orch]",
  "include_topic_name": true,
  "topic_name_max_length": 10
}
```

---

## Troubleshooting

### Topics Not Showing

**Check**: `.claude/agents/state/topics.json` exists
```bash
cat .claude/agents/state/topics.json
```

**Fix**: Re-create registry
```bash
python .claude/skills/csprojtasks/scripts/topic_manager.py \
  list_active_topics
```

### Topic State Corrupted

**Symptom**: PM can't load topic state

**Check**: Validate JSON
```bash
python -c "import json; json.load(open('.claude/agents/state/{slug}/pm-state.json'))"
```

**Fix**: Delete corrupted files and re-create
```bash
rm .claude/agents/state/{slug}/pm-state.json
# PM will recreate on next access
```

### Old Topics Cluttering Dashboard

**Fix**: Archive completed topics
```bash
python .claude/skills/csprojtasks/scripts/topic_manager.py \
  archive_topic "{slug}"
```

---

## Future Enhancements

### Planned Features

- [ ] Topic search and filtering
- [ ] Topic tags and categories
- [ ] Topic dependencies (Topic B depends on Topic A)
- [ ] Cross-topic task sharing
- [ ] Topic templates (reusable workflows)
- [ ] Topic analytics (time tracking, token usage)

---

## Conclusion

✅ **Multi-topic management is fully functional**

**Key Capabilities**:
- Multiple active topics supported
- Seamless topic switching
- Background sub-agent execution
- Unified dashboard view
- Topic-aware TodoWrite integration

**Version**: 2.1.0
**Status**: Production Ready
**Date**: 2025-10-22

---

**Users can now work on multiple projects simultaneously with full visibility and control!** 🚀
