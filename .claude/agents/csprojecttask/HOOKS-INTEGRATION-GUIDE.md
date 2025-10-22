# Hook System Integration Guide

**Version**: 2.1.0
**Status**: ✅ Ready for Integration

## Overview

The hook system integrates orchestration tasks with Claude Code's native `TodoWrite` tool, making sub-agent tasks appear in Claude Code's sidebar alongside regular tasks.

---

## Quick Start

### 1. Import Hooks in PM Orchestrator

```python
# Add to imports
import sys
sys.path.append('.claude/skills/csprojtasks/scripts')

from hooks import (
    trigger_pre_task_create,
    trigger_post_task_create,
    trigger_task_progress,
    trigger_task_blocked,
    trigger_task_unblocked,
    trigger_task_complete,
    trigger_task_error
)
```

### 2. Enable Hooks (Optional Configuration)

Edit `.claude/agents/csprojecttask/hooks-config.json`:

```json
{
  "enabled": true,
  "hooks": {
    "pre_task_create": true,
    "post_task_create": true,
    "task_progress_update": true,
    "task_complete": true,
    "task_error": true,
    "task_blocked": true
  },
  "progress_update_threshold": 10,
  "sync_to_claude_tasks": true,
  "task_prefix": "[A:orch]",
  "verbose": false
}
```

---

## Integration Points in PM Orchestrator

### Point 1: Before Creating Task (Pre-Create Hook)

**Location**: Step 6 - Generate Task IDs and State Files

**Before**:
```python
# Generate unique task ID
TASK_ID = generate_task_id(topic_slug)

# Create state file path
STATE_FILE = f".claude/agents/state/{topic_slug}/task-{TASK_ID}-{task_slug}.json"

# Initialize state file
create_state_file(STATE_FILE, "task-state")
```

**After (with hook)**:
```python
# Generate unique task ID
TASK_ID = generate_task_id(topic_slug)

# Create state file path
STATE_FILE = f".claude/agents/state/{topic_slug}/task-{TASK_ID}-{task_slug}.json"

# 🔗 HOOK: Pre-create (creates Claude task as "pending")
task_data = {
    'id': TASK_ID,
    'agent': agent_name,
    'description': task_description,
    'focus': focus_area,
    'dependencies': dependencies
}
trigger_pre_task_create(task_data)

# Initialize state file
create_state_file(STATE_FILE, "task-state")
update_state(STATE_FILE, '.taskId', TASK_ID)
update_state(STATE_FILE, '.agentName', agent_name)
# ... other state updates
```

**Result**: Creates pending task in Claude Code sidebar:
```
⏳ [A:orch] market-research-analyst: Market positioning analysis
```

---

### Point 2: After Launching Agent (Post-Create Hook)

**Location**: Step 8 - Launch Sub-Agents

**Before**:
```python
# Launch agent
Task({
    subagent_type: "market-research-analyst",
    description: "Market positioning analysis",
    prompt: f"STATE_FILE: {STATE_FILE}\n\nRead state and begin work."
})
```

**After (with hook)**:
```python
# Launch agent
Task({
    subagent_type: "market-research-analyst",
    description: "Market positioning analysis",
    prompt: f"STATE_FILE: {STATE_FILE}\n\nRead state and begin work."
})

# 🔗 HOOK: Post-create (updates Claude task to "in_progress")
trigger_post_task_create(TASK_ID, agent_name, STATE_FILE)
```

**Result**: Updates task in Claude Code sidebar:
```
🔄 [A:orch] market-research-analyst: Market positioning analysis
   ↳ market-research-analyst started
```

---

### Point 3: Monitoring Progress (Progress Update Hook)

**Location**: Step 9 - Monitor Dependencies and Launch Waiting Tasks

**Before**:
```python
# Monitor sub-agent progress
for task_file in task_files:
    task_data = read_json_file(task_file)
    task_id = task_data['taskId']
    status = task_data['status']
    progress = task_data['progress']
```

**After (with hook)**:
```python
# Monitor sub-agent progress
for task_file in task_files:
    task_data = read_json_file(task_file)
    task_id = task_data['taskId']
    status = task_data['status']
    progress = task_data['progress']
    current_op = task_data.get('currentOperation', 'Working...')

    # 🔗 HOOK: Progress update (throttled by threshold)
    if status == 'in_progress':
        trigger_task_progress(task_id, progress, current_op)
```

**Result**: Updates progress in Claude Code sidebar (every 10%):
```
🔄 [A:orch] market-research-analyst: Market positioning analysis
   ↳ Analyzing positioning (50%)
```

---

### Point 4: Detecting Blocked Questions (Blocked Hook)

**Location**: Step 9 - Monitor Dependencies (Question Handling)

**Before**:
```python
# Check for blocking questions
blocking_question = task_data.get('blockingQuestion')
if blocking_question and not blocking_question.get('answered', True):
    question = blocking_question['question']
    context = blocking_question['context']

    # Handle question (ask user or answer from PM)
    # ...
```

**After (with hook)**:
```python
# Check for blocking questions
blocking_question = task_data.get('blockingQuestion')
if blocking_question and not blocking_question.get('answered', True):
    question = blocking_question['question']
    context = blocking_question['context']

    # 🔗 HOOK: Blocked (shows blocked status in Claude UI)
    trigger_task_blocked(task_id, question, context)

    # Handle question (ask user or answer from PM)
    # ... get answer ...

    # Write answer to state file
    answer_question(STATE_FILE, answer)

    # 🔗 HOOK: Unblocked (shows task continuing)
    trigger_task_unblocked(task_id, answer)
```

**Result**: Shows blocked status in Claude Code sidebar:
```
🔄 [A:orch] market-research-analyst: Market positioning analysis
   ↳ ⚠️ BLOCKED: Which features are priority?...
```

After unblocking:
```
🔄 [A:orch] market-research-analyst: Market positioning analysis
   ↳ ✅ Unblocked, continuing work
```

---

### Point 5: Task Completion (Complete Hook)

**Location**: Step 9 - Monitor Dependencies (Completion Detection)

**Before**:
```python
# When task completes
if task_data['status'] == 'completed':
    result = task_data.get('result', {})
    summary = result.get('summary', '')
    files_created = result.get('filesCreated', [])

    # Update PM state
    # ...
```

**After (with hook)**:
```python
# When task completes
if task_data['status'] == 'completed':
    result = task_data.get('result', {})
    summary = result.get('summary', '')
    files_created = result.get('filesCreated', [])

    # 🔗 HOOK: Complete (marks Claude task as completed)
    trigger_task_complete(task_id, summary, files_created)

    # Update PM state
    # ...
```

**Result**: Marks task complete in Claude Code sidebar:
```
✅ [A:orch] market-research-analyst: Market positioning analysis
   ↳ Complete - 2 files created
```

---

### Point 6: Error Handling (Error Hook)

**Location**: Anywhere exceptions are caught

**Before**:
```python
try:
    # Task execution
    pass
except Exception as e:
    log_error(f"Task {task_id} failed: {e}")
    update_state(STATE_FILE, '.status', 'failed')
    update_state(STATE_FILE, '.error', str(e))
```

**After (with hook)**:
```python
try:
    # Task execution
    pass
except Exception as e:
    error_msg = str(e)
    log_error(f"Task {task_id} failed: {error_msg}")

    # 🔗 HOOK: Error (shows error in Claude UI)
    trigger_task_error(task_id, error_msg)

    update_state(STATE_FILE, '.status', 'failed')
    update_state(STATE_FILE, '.error', error_msg)
```

**Result**: Shows error in Claude Code sidebar:
```
⏳ [A:orch] market-research-analyst: Market positioning analysis
   ↳ ❌ Error: Failed to fetch competitor data
```

---

## Complete Example: PM Orchestrator with Hooks

```python
#!/usr/bin/env python3
"""
PM Orchestrator - Execution Plan with Hook Integration
"""

import sys
sys.path.append('.claude/skills/csprojtasks/scripts')

from hooks import (
    trigger_pre_task_create,
    trigger_post_task_create,
    trigger_task_progress,
    trigger_task_blocked,
    trigger_task_unblocked,
    trigger_task_complete,
    trigger_task_error
)
from state_manager import create_state_file, update_state, read_state, answer_question
from topic_manager import create_topic, update_topic_progress
from utils import generate_task_id, slugify, read_json_file


def execute_orchestration_plan(user_request: str, tasks: list):
    """
    Execute orchestration plan with hook integration

    Args:
        user_request: User's original request
        tasks: List of task definitions
    """
    # Create topic
    topic_slug = create_topic(user_request, "Multi-agent orchestration")

    # Launch each task
    for task_def in tasks:
        # Generate task ID
        task_id = generate_task_id(topic_slug)
        task_slug = slugify(task_def['description'])
        state_file = f".claude/agents/state/{topic_slug}/task-{task_id}-{task_slug}.json"

        # 🔗 HOOK: Pre-create
        task_data = {
            'id': task_id,
            'agent': task_def['agent'],
            'description': task_def['description'],
            'focus': task_def['focus'],
            'dependencies': task_def.get('dependencies', [])
        }
        trigger_pre_task_create(task_data)

        # Create state file
        create_state_file(state_file, 'task-state')
        update_state(state_file, '.taskId', task_id)
        update_state(state_file, '.agentName', task_def['agent'])
        update_state(state_file, '.focusArea', task_def['focus'])

        try:
            # Launch agent (this would be actual Task tool call)
            print(f"Launching {task_def['agent']} for {task_id}")

            # 🔗 HOOK: Post-create
            trigger_post_task_create(task_id, task_def['agent'], state_file)

        except Exception as e:
            # 🔗 HOOK: Error
            trigger_task_error(task_id, str(e))
            continue

    # Monitor progress
    while True:
        all_complete = True

        for task_def in tasks:
            task_id = task_def['id']
            state_file = task_def['state_file']

            # Read current state
            task_data = read_json_file(state_file)
            if not task_data:
                continue

            status = task_data['status']
            progress = task_data['progress']
            current_op = task_data.get('currentOperation', 'Working...')

            # Check for blocking questions
            blocking_q = task_data.get('blockingQuestion')
            if blocking_q and not blocking_q.get('answered', True):
                # 🔗 HOOK: Blocked
                trigger_task_blocked(task_id, blocking_q['question'], blocking_q['context'])

                # Get answer (from user or PM logic)
                answer = get_answer_for_question(blocking_q)

                # Answer question
                answer_question(state_file, answer)

                # 🔗 HOOK: Unblocked
                trigger_task_unblocked(task_id, answer)

            # Update progress
            if status == 'in_progress':
                # 🔗 HOOK: Progress (throttled internally)
                trigger_task_progress(task_id, progress, current_op)
                all_complete = False

            # Check completion
            elif status == 'completed':
                result = task_data.get('result', {})
                summary = result.get('summary', '')
                files = result.get('filesCreated', [])

                # 🔗 HOOK: Complete
                trigger_task_complete(task_id, summary, files)

            else:
                all_complete = False

        if all_complete:
            break

        # Sleep before next poll
        time.sleep(5)

    # Update topic progress
    update_topic_progress(topic_slug)

    print(f"✅ All tasks complete for topic: {topic_slug}")
```

---

## Testing the Hook System

Test the hooks with the provided test script:

```bash
cd .claude/skills/csprojtasks/scripts
python hooks.py
```

**Expected Output**:
```
Testing Hook System...
[INFO] 🔗 Hook: Created Claude task for task-001
   Content: [A:orch] market-research-analyst: Market positioning analysis
   Status: pending
[INFO] 🔗 Hook: Updated Claude task task-001 to in_progress
   Agent: market-research-analyst
[INFO] ✅ Hook: Completed Claude task task-001
   Result: Market analysis complete

📋 Final Todo List:
1. [completed] [A:orch] market-research-analyst: Market positioning analysis
   Active: Complete - 2 files created
```

---

## Configuration Options

### Enable/Disable Hooks Globally

```json
{
  "enabled": false  // Disables all hooks
}
```

### Enable/Disable Specific Hooks

```json
{
  "hooks": {
    "pre_task_create": true,
    "post_task_create": true,
    "task_progress_update": false,  // Disable progress updates
    "task_complete": true,
    "task_error": true,
    "task_blocked": true
  }
}
```

### Adjust Progress Update Threshold

```json
{
  "progress_update_threshold": 25  // Only update every 25% (default: 10)
}
```

### Change Task Prefix

```json
{
  "task_prefix": "[ORCH]"  // Custom prefix (default: "[A:orch]")
}
```

### Enable Verbose Logging

```json
{
  "verbose": true  // Detailed hook logs
}
```

---

## Benefits

### 1. **Unified Task View** ✅
All tasks (manual + orchestrated) in Claude Code sidebar

### 2. **Real-Time Progress** ✅
See sub-agent progress without separate monitor

### 3. **Better Context** ✅
Task names show agent and description

### 4. **Error Visibility** ✅
Failed tasks clearly marked

### 5. **Native Integration** ✅
Uses Claude Code's native TodoWrite tool

---

## Troubleshooting

### Hooks Not Triggering

**Check configuration**:
```bash
cat .claude/agents/csprojecttask/hooks-config.json
```

Ensure `"enabled": true`

### Tasks Not Appearing in Sidebar

**Verify TodoWrite integration**:
- Hooks output to logs (check verbose mode)
- Claude Code may need restart to detect changes

### Too Many Progress Updates

**Increase threshold**:
```json
{
  "progress_update_threshold": 20  // Update less frequently
}
```

---

## Next Steps

1. ✅ Hook system created
2. ✅ Configuration file created
3. ⏳ Integrate hooks into PM orchestrator agent
4. ⏳ Test with real sub-agents
5. ⏳ Document in main agent.md

**Ready for integration!** 🚀
