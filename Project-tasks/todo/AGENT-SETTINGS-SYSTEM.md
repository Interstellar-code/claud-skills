# Agent Settings System - csprojecttask

**Status**: ✅ Ready for Phase 1 Implementation | **Priority**: High | **Impact**: Transforms agent accountability

**Version**: 2.0 (Revised based on expert review)
**Last Updated**: 2025-10-24

---

## 🚀 What Changed (Version 2.0)

**Expert Review Incorporated** - This spec has been revised based on professional systems architect feedback.

### Key Changes from v1.0:

1. **Phased Implementation** ⚠️
   - ~~MVP: 1-2 days~~ → **Phase 1: 2-3 days** (realistic)
   - Total: 5-8 days across 3 phases
   - Start minimal, iterate to production

2. **Hooks Deferred to Phase 2** ⏸️
   - Removed from Phase 1 (Core)
   - Focus on workflow enforcement first
   - Add hooks after core is stable

3. **Critical Issues Added** 🔒
   - JSON Schema validation (prevent config errors)
   - File locking (prevent race conditions)
   - Completion criteria evaluator (execute "count > 0")
   - Error recovery/rollback (handle failures)
   - Idempotent steps (safe re-execution)

4. **Simplified Audit Logging** 📝
   - ~~Hybrid (JSON + text file)~~ → **JSON only** (Phase 1)
   - Prevents sync issues
   - Text viewer added in Phase 3

5. **Expert-Recommended Improvements** 💡
   - Event bus pattern (Phase 2)
   - Caching layer (Phase 2)
   - Dry-run mode (Phase 2)
   - Parallel execution (Phase 2)
   - Settings migration (Phase 3)

### Implementation Strategy

```
Phase 1 (2-3 days): Core workflow enforcement
  ├─ Schema validation
  ├─ File locking
  ├─ Criteria evaluator
  ├─ Error recovery
  └─ Phases 1-3 enforced

Phase 2 (2-3 days): Advanced features
  ├─ Hooks system
  ├─ Event bus
  ├─ Parallel execution
  └─ Caching

Phase 3 (1-2 days): Production polish
  ├─ Log viewer
  ├─ Settings migration
  └─ Performance optimization
```

---

## Problem & Solution

### Problem
- Workflow steps defined in prose (agent.md) - no programmatic enforcement
- Agents can skip steps without detection
- No audit trail of actions taken
- Difficult to modify workflow without editing prompt
- No way to verify compliance

### Solution
Settings JSON file that:
- Defines explicit workflow steps with dependencies
- Enforces step order and validation rules
- Tracks progress and logs audit trail
- Makes workflow behavior configurable
- Enables verification and accountability

### Pattern
```
Agent starts → Load settings.json → Check current step → Validate dependencies → Execute → Verify completion → Log → Mark complete → Next step
```

---

## Settings JSON Structure

**Location**: `.claude/agents/csprojecttask/settings.json`

### Core Schema

```json
{
  "version": "2.0.0",
  "schema_version": "1.0.0",

  "workflow": {
    "enabled": true,
    "enforce_step_order": true,
    "require_user_approval_between_phases": true,

    "phases": [
      {
        "id": "phase-1-requirements",
        "name": "Requirements Analysis",
        "order": 1,
        "required": true,
        "steps": [
          {
            "id": "parse-spec",
            "name": "Parse specification file",
            "required": true,
            "validation": {
              "must_exist": ["spec_file_path"],
              "must_not_be_empty": ["spec_content"]
            },
            "completion_criteria": [
              "spec_file_exists",
              "spec_file_parsed",
              "spec_format_valid"
            ]
          },
          {
            "id": "extract-requirements",
            "name": "Extract requirements from spec",
            "required": true,
            "depends_on": ["parse-spec"],
            "validation": {
              "min_requirements": 1,
              "required_fields": ["title", "description", "priority"]
            },
            "completion_criteria": [
              "requirements_extracted",
              "requirements_count > 0",
              "all_requirements_valid"
            ]
          }
          // ... more steps
        ]
      }
      // ... more phases
    ]
  },

  "behavior": {
    "error_handling": {
      "strategy": "stop",  // "stop" | "continue" | "ask_user"
      "log_errors": true,
      "max_retries": 3
    },
    "validation": {
      "strictness": "strict",  // "strict" | "moderate" | "relaxed"
      "fail_on_missing_required": true,
      "fail_on_invalid_format": true
    },
    "progress_reporting": {
      "enabled": true,
      "frequency_seconds": 30,
      "log_to_state_file": true,
      "update_todowrite": true
    }
  },

  "features": {
    "qa_validation": {
      "enabled": true,
      "auto_validate": false,
      "validator_agent": "deliverables-qa-validator"
    },
    "parallel_execution": {
      "enabled": true,
      "max_parallel_tasks": 10,
      "launch_strategy": "all_at_once"
    },
    "agent_library": {
      "auto_create_agents": true,
      "reuse_existing": true,
      "update_registry": true,
      "enforce_naming_conventions": true
    }
  },

  "paths": {
    "state_directory": ".claude/agents/state/csprojecttask/",
    "topics_directory": ".claude/agents/state/csprojecttask/topics/",
    "project_tasks_directory": "Project-tasks/",
    "templates": {
      "spec_template": ".claude/agents/csprojecttask/spec-template.md",
      "topicplan_template": ".claude/agents/csprojecttask/topicplan-template.md"
    }
  },

  "validation_rules": {
    "spec_file": {
      "required_sections": [
        "# Project Overview",
        "## Requirements",
        "## Deliverables",
        "## Acceptance Criteria"
      ],
      "min_requirements": 1,
      "min_deliverables": 1,
      "min_acceptance_criteria": 1
    }
  }
}
```

### Complete 4-Phase Workflow

```json
{
  "workflow": {
    "phases": [
      {
        "id": "phase-1-requirements",
        "name": "Requirements Analysis",
        "steps": [
          "parse-spec",
          "extract-requirements",
          "extract-deliverables",
          "extract-acceptance-criteria",
          "validate-spec",
          "generate-requirements-summary",
          "wait-user-approval-phase1"
        ]
      },
      {
        "id": "phase-2-agent-selection",
        "name": "Agent Selection",
        "depends_on": ["phase-1-requirements"],
        "steps": [
          "analyze-requirements",
          "scan-agent-library",
          "select-agents",
          "justify-selections",
          "generate-agent-list",
          "wait-user-approval-phase2"
        ]
      },
      {
        "id": "phase-3-execution-planning",
        "name": "Execution Planning",
        "depends_on": ["phase-2-agent-selection"],
        "steps": [
          "create-execution-plan",
          "generate-agent-prompts",
          "define-dependencies",
          "create-state-structure",
          "wait-user-approval-phase3"
        ]
      },
      {
        "id": "phase-4-execution",
        "name": "Execution",
        "depends_on": ["phase-3-execution-planning"],
        "steps": [
          "prepare-task-launch",
          "present-execution-plan",
          "wait-launch-approval",
          "launch-agents"
        ]
      }
    ]
  }
}
```

---

## Workflow Enforcement Pattern

### Agent Must Check Settings Before Every Step

```python
def execute_step(step_id, topic_slug):
    # 1. Load settings
    settings = load_settings(".claude/agents/csprojecttask/settings.json")

    # 2. Get step definition
    step = find_step(settings, step_id)

    # 3. Check if required
    if not step["required"]:
        return  # Skip optional steps

    # 4. Validate dependencies
    for dep_id in step.get("depends_on", []):
        if not is_step_complete(topic_slug, dep_id):
            raise Error(f"Dependency {dep_id} not complete")

    # 5. Run validation rules (BEFORE)
    validation = step.get("validation", {})
    validate_before(validation)

    # 6. Execute the actual work
    result = perform_step(step)

    # 7. Check completion criteria (AFTER)
    criteria = step.get("completion_criteria", [])
    for criterion in criteria:
        if not check_criterion(criterion, result):
            raise Error(f"Completion criterion '{criterion}' not met")

    # 8. Mark complete
    mark_step_complete(topic_slug, step_id, result)

    # 9. Log to audit trail
    log_step_completion(topic_slug, step_id, result)
```

### State File Extension

Extend `topic.json` with workflow tracking:

```json
{
  "topic": {
    "id": "example-topic",
    "workflow": {
      "current_phase": "phase-1-requirements",
      "current_step": "extract-requirements",
      "phases": [
        {
          "id": "phase-1-requirements",
          "status": "in_progress",
          "started_at": "2025-10-24T12:00:00Z",
          "steps": [
            {
              "id": "parse-spec",
              "status": "completed",
              "started_at": "2025-10-24T12:00:00Z",
              "completed_at": "2025-10-24T12:01:00Z",
              "result": {"spec_valid": true}
            },
            {
              "id": "extract-requirements",
              "status": "in_progress",
              "started_at": "2025-10-24T12:01:00Z"
            }
          ]
        }
      ],
      "audit_log": [
        {
          "timestamp": "2025-10-24T12:00:00Z",
          "step_id": "parse-spec",
          "action": "started"
        },
        {
          "timestamp": "2025-10-24T12:01:00Z",
          "step_id": "parse-spec",
          "action": "completed",
          "details": {"spec_valid": true}
        }
      ]
    }
  }
}
```

---

## Implementation Plan (Revised - Expert Recommendations)

### 🎯 Phase 1: Core Workflow Enforcement (2-3 days) ← START HERE

**Goal**: Get basic workflow working with Phases 1-3, single audit log, no hooks yet

**Critical Issues to Address** (from expert review):

1. **JSON Schema Validation** ⚠️
   - [ ] Create `settings.schema.json` with full JSON schema
   - [ ] Validate settings on load
   - [ ] Catch configuration errors early

2. **Completion Criteria Evaluator** ⚠️
   - [ ] Define how to evaluate criteria like "requirements_count > 0"
   - [ ] Implement safe expression evaluator
   - [ ] Support: equality, comparison, existence, boolean logic

3. **File Locking** ⚠️
   - [ ] Add file locking to prevent race conditions
   - [ ] Use Python's `fcntl` (Linux/Mac) or `msvcrt` (Windows)
   - [ ] Lock topic.json during read/write

4. **Single Audit Log** ⚠️
   - [ ] Use JSON audit log in topic.json ONLY
   - [ ] Remove separate text file for now (add viewer later)
   - [ ] Prevents sync issues

5. **Error Recovery/Rollback** ⚠️
   - [ ] Store step state before execution
   - [ ] Rollback on failure
   - [ ] Resume from last good state

**Core Deliverables**:

- [ ] **workflow_manager.py** with:
  - `load_settings()` - With schema validation
  - `get_workflow_status(slug)` - Display current state
  - `get_next_step(slug)` - Determine next required step
  - `validate_dependencies(slug, step_id)` - Check deps met
  - `mark_step_complete(slug, step_id, result)` - With file locking
  - `evaluate_criteria(criteria, result)` - Safe evaluator
  - `rollback_step(slug, step_id)` - Error recovery
  - `is_step_idempotent(step_id)` - Check if can re-run safely

- [ ] **Idempotent Steps**
  - Design steps to be safely re-executable
  - Check if already completed before re-running
  - Skip gracefully if already done

- [ ] **Agent Integration** (Phases 1-3 only)
  - Update agent.md to load settings
  - Enforce workflow for Requirements, Agent Selection, Planning
  - Manual error handling (no hooks yet)
  - Simple TodoWrite updates (status only, no fancy hooks)

- [ ] **Testing**
  - Test Phase 1 (Requirements Analysis) end-to-end
  - Test Phase 2 (Agent Selection) end-to-end
  - Test Phase 3 (Execution Planning) end-to-end
  - Test rollback on step failure
  - Test idempotent re-execution
  - Test file locking with concurrent access

**⏱ Time Estimate**: 2-3 days

**Acceptance Criteria**:
- ✅ Phases 1-3 workflow enforced via settings
- ✅ All critical issues addressed (schema, locking, rollback, etc.)
- ✅ No step can be skipped
- ✅ Complete audit trail in JSON
- ✅ Failures can be recovered
- ✅ Settings validated on load

---

###  🚀 Phase 2: Advanced Features (2-3 days) ← AFTER Phase 1 tested

**Goal**: Add hooks, parallel execution, caching, dry-run

**NOTE**: Only start after Phase 1 is fully tested and stable!

**Deliverables**:

1. **Hooks System**
   - [ ] Implement event-driven hooks (see removed section above)
   - [ ] TodoWrite integration with throttling
   - [ ] Event filtering and configuration

2. **Event Bus Pattern**
   - [ ] Decouple hooks from workflow logic
   - [ ] Pub/sub architecture
   - [ ] Pluggable event handlers

3. **Parallel Execution**
   - [ ] Support independent steps running concurrently
   - [ ] Dependency graph execution
   - [ ] Thread-safe state management

4. **Caching Layer**
   - [ ] In-memory cache for settings.json
   - [ ] Cache topic state to reduce I/O
   - [ ] Invalidation strategy

5. **Dry-Run Mode**
   - [ ] Test workflows without making changes
   - [ ] Preview mode for users
   - [ ] Validate entire workflow before execution

**⏱ Time Estimate**: 2-3 days

---

### 🎨 Phase 3: Polish & Optimization (1-2 days) ← FINAL

**Goal**: Production-ready system with all features

**Deliverables**:

1. **Settings Migration**
   - [ ] Version migration scripts
   - [ ] Backward compatibility layer
   - [ ] Schema evolution strategy

2. **Audit Log Viewer**
   - [ ] Formatted text viewer for JSON logs
   - [ ] Filter by level, phase, step
   - [ ] Export to different formats (text, CSV)

3. **Performance Optimization**
   - [ ] Profile bottlenecks
   - [ ] Optimize file operations
   - [ ] Batch updates where possible

4. **Documentation**
   - [ ] Complete user guide
   - [ ] Troubleshooting guide
   - [ ] Migration guide from old system

**⏱ Time Estimate**: 1-2 days

---

### Total Implementation Time

**Phased Approach** (recommended by expert):
- **Phase 1 (Core)**: 2-3 days ← **Start here, test thoroughly before continuing**
- **Phase 2 (Advanced)**: 2-3 days ← After Phase 1 proven stable
- **Phase 3 (Polish)**: 1-2 days ← Final production touches

**Total**: 5-8 days

**Previous estimate was 1-2 days** - that was unrealistic. Expert recommends starting minimal and iterating.

---

## Utility Scripts

### workflow_manager.py (Core Functions)

```python
#!/usr/bin/env python3
"""Workflow manager for csprojecttask agent."""

import json
from pathlib import Path
from datetime import datetime

def load_settings(settings_path=".claude/agents/csprojecttask/settings.json"):
    """Load workflow settings."""
    with open(settings_path) as f:
        return json.load(f)

def get_workflow_status(topic_slug):
    """Get current workflow status for topic."""
    topic_file = Path(f".claude/agents/state/csprojecttask/topics/{topic_slug}/topic.json")
    with open(topic_file) as f:
        topic = json.load(f)

    workflow = topic.get("topic", {}).get("workflow", {})
    current_phase = workflow.get("current_phase")
    current_step = workflow.get("current_step")

    # Print status
    for phase in workflow.get("phases", []):
        status_icon = "✓" if phase["status"] == "completed" else "🔄" if phase["status"] == "in_progress" else "⏳"
        print(f"{status_icon} {phase['id']} - {phase['status']}")
        for step in phase.get("steps", []):
            step_icon = "✓" if step["status"] == "completed" else "🔄" if step["status"] == "in_progress" else "⏳"
            print(f"  {step_icon} {step['id']} ({step['status']})")

def get_next_step(topic_slug):
    """Find next pending step."""
    topic_file = Path(f".claude/agents/state/csprojecttask/topics/{topic_slug}/topic.json")
    with open(topic_file) as f:
        topic = json.load(f)

    workflow = topic.get("topic", {}).get("workflow", {})
    for phase in workflow.get("phases", []):
        if phase["status"] != "completed":
            for step in phase.get("steps", []):
                if step["status"] == "pending":
                    return step["id"]
    return None

def validate_dependencies(topic_slug, step_id):
    """Verify all dependencies are complete."""
    settings = load_settings()
    step = find_step(settings, step_id)

    topic_file = Path(f".claude/agents/state/csprojecttask/topics/{topic_slug}/topic.json")
    with open(topic_file) as f:
        topic = json.load(f)

    for dep_id in step.get("depends_on", []):
        if not is_step_complete(topic, dep_id):
            return False, f"Dependency {dep_id} not complete"

    return True, "All dependencies satisfied"

def mark_step_complete(topic_slug, step_id, result):
    """Mark step as complete in topic state."""
    topic_file = Path(f".claude/agents/state/csprojecttask/topics/{topic_slug}/topic.json")
    with open(topic_file) as f:
        topic = json.load(f)

    # Find and update step
    workflow = topic.get("topic", {}).get("workflow", {})
    for phase in workflow.get("phases", []):
        for step in phase.get("steps", []):
            if step["id"] == step_id:
                step["status"] = "completed"
                step["completed_at"] = datetime.utcnow().isoformat() + "Z"
                step["result"] = result

    # Write back
    with open(topic_file, "w") as f:
        json.dump(topic, f, indent=2)

    # Log to audit trail
    log_step_completion(topic_slug, step_id, result)

def log_step_completion(topic_slug, step_id, result):
    """Append to audit log."""
    topic_file = Path(f".claude/agents/state/csprojecttask/topics/{topic_slug}/topic.json")
    with open(topic_file) as f:
        topic = json.load(f)

    workflow = topic.get("topic", {}).get("workflow", {})
    audit_log = workflow.get("audit_log", [])

    audit_log.append({
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "step_id": step_id,
        "action": "completed",
        "details": result
    })

    workflow["audit_log"] = audit_log

    with open(topic_file, "w") as f:
        json.dump(topic, f, indent=2)

# Helper functions
def find_step(settings, step_id):
    """Find step definition in settings."""
    for phase in settings["workflow"]["phases"]:
        for step in phase["steps"]:
            if step["id"] == step_id:
                return step
    return None

def is_step_complete(topic, step_id):
    """Check if step is complete."""
    workflow = topic.get("topic", {}).get("workflow", {})
    for phase in workflow.get("phases", []):
        for step in phase.get("steps", []):
            if step["id"] == step_id:
                return step["status"] == "completed"
    return False

def get_audit_log(topic_slug, limit=None):
    """View audit log history."""
    topic_file = Path(f".claude/agents/state/csprojecttask/topics/{topic_slug}/topic.json")
    with open(topic_file) as f:
        topic = json.load(f)

    audit_log = topic.get("topic", {}).get("workflow", {}).get("audit_log", [])

    # Optionally limit to recent entries
    if limit:
        audit_log = audit_log[-limit:]

    # Print formatted audit log
    for entry in audit_log:
        timestamp = entry.get("timestamp", "")
        step_id = entry.get("step_id", "")
        action = entry.get("action", "")
        details = entry.get("details", {})

        details_str = " | ".join(f"{k}: {v}" for k, v in details.items())
        print(f"{timestamp} | {step_id} | {action.upper()}" + (f" | {details_str}" if details_str else ""))

def tail_audit_log(topic_slug):
    """Stream audit log in real-time (like tail -f)."""
    log_file = Path(f".claude/agents/state/csprojecttask/topics/{topic_slug}/workflow-audit.log")

    print(f"Watching {log_file}...")
    print("Press Ctrl+C to stop")
    print("-" * 80)

    # Show last 10 lines first
    if log_file.exists():
        with open(log_file) as f:
            lines = f.readlines()
            for line in lines[-10:]:
                print(line.rstrip())

    # Then watch for new lines
    import time
    last_size = log_file.stat().st_size if log_file.exists() else 0

    try:
        while True:
            time.sleep(1)
            if log_file.exists():
                current_size = log_file.stat().st_size
                if current_size > last_size:
                    with open(log_file) as f:
                        f.seek(last_size)
                        new_lines = f.read()
                        print(new_lines.rstrip())
                    last_size = current_size
    except KeyboardInterrupt:
        print("\nStopped watching.")

if __name__ == "__main__":
    import sys

    command = sys.argv[1] if len(sys.argv) > 1 else None

    if command == "get_workflow_status":
        topic_slug = sys.argv[2]
        get_workflow_status(topic_slug)
    elif command == "get_next_step":
        topic_slug = sys.argv[2]
        next_step = get_next_step(topic_slug)
        print(f"Next step: {next_step}")
    elif command == "validate_dependencies":
        topic_slug = sys.argv[2]
        step_id = sys.argv[3]
        valid, message = validate_dependencies(topic_slug, step_id)
        print(message)
        sys.exit(0 if valid else 1)
    elif command == "complete_step":
        topic_slug = sys.argv[2]
        step_id = sys.argv[3]
        result = json.loads(sys.argv[4]) if len(sys.argv) > 4 else {}
        mark_step_complete(topic_slug, step_id, result)
        print(f"Step {step_id} marked complete")
    elif command == "get_audit_log":
        topic_slug = sys.argv[2]
        limit = int(sys.argv[3]) if len(sys.argv) > 3 else None
        get_audit_log(topic_slug, limit)
    elif command == "tail_audit_log":
        topic_slug = sys.argv[2]
        tail_audit_log(topic_slug)
    else:
        print("Usage: workflow_manager.py [command] [args...]")
        print("Commands:")
        print("  get_workflow_status <topic-slug>")
        print("  get_next_step <topic-slug>")
        print("  validate_dependencies <topic-slug> <step-id>")
        print("  complete_step <topic-slug> <step-id> [result-json]")
        print("  get_audit_log <topic-slug> [limit]")
        print("  tail_audit_log <topic-slug>  # Watch log in real-time")
```

---

## Usage Examples

### Agent Checks Status
```bash
python .claude/skills/csprojtasks/scripts/workflow_manager.py \
  get_workflow_status "my-topic"

# Output:
# 🔄 phase-1-requirements - in_progress
#   ✓ parse-spec (completed)
#   ✓ extract-requirements (completed)
#   🔄 extract-deliverables (in_progress)
#   ⏳ extract-acceptance-criteria (pending)
```

### Agent Marks Step Complete
```bash
python .claude/skills/csprojtasks/scripts/workflow_manager.py \
  complete_step "my-topic" "extract-deliverables" '{"count": 3}'

# Output:
# Step extract-deliverables marked complete
```

### Agent Validates Dependencies
```bash
python .claude/skills/csprojtasks/scripts/workflow_manager.py \
  validate_dependencies "my-topic" "validate-spec"

# Output:
# All dependencies satisfied
```

---

## User Visibility - How You See Progress

### 4 Ways to View Workflow Status

#### 1. Claude CLI Sidebar (Real-time via TodoWrite)
Already integrated via hooks - shows live progress in Claude Code sidebar:

```
Claude Code Sidebar:
├── 🔄 [A:orch] Phase 1: Requirements Analysis (57%)
│   ↳ Extracting acceptance criteria...
├── ⏳ [A:orch] Phase 2: Agent Selection (0%)
│   ↳ Waiting for Phase 1 approval
└── ⏳ [A:orch] Phase 3: Execution Planning (0%)
    ↳ Pending
```

**Updates automatically** as agent progresses through steps.

#### 2. Status Command (Query anytime)
```bash
# Check current status
python .claude/skills/csprojtasks/scripts/workflow_manager.py \
  get_workflow_status "my-topic"

# Output:
Phase 1: Requirements Analysis - 57% complete (4/7 steps)
  ✓ parse-spec (completed at 12:00:00)
  ✓ extract-requirements (completed at 12:01:30)
  ✓ extract-deliverables (completed at 12:03:15)
  🔄 extract-acceptance-criteria (in progress, started 12:04:00)
  ⏳ validate-spec (pending)
  ⏳ generate-requirements-summary (pending)
  ⏳ wait-user-approval-phase1 (pending)

Phase 2: Agent Selection - 0% complete (0/6 steps)
  ⏳ All steps waiting for Phase 1 approval

Current step: extract-acceptance-criteria
Next step after current: validate-spec
```

#### 3. Dashboard (Multi-topic view)
```bash
# Enhanced dashboard showing workflow progress
python .claude/skills/csprojtasks/scripts/multi_topic_dashboard.py

# Output:
╔════════════════════════════════════════════════════════════════╗
║ Active Topics Dashboard                                        ║
╠════════════════════════════════════════════════════════════════╣
║ Topic: my-topic-slug                                           ║
║ Phase: Requirements Analysis (57%)                             ║
║ Step:  extract-acceptance-criteria (in progress)               ║
║ Tasks: 0/3 launched                                            ║
╠════════════════════════════════════════════════════════════════╣
║ Topic: another-topic                                           ║
║ Phase: Execution (75%)                                         ║
║ Step:  present-execution-plan (in progress)                    ║
║ Tasks: 2/3 complete                                            ║
╚════════════════════════════════════════════════════════════════╝
```

#### 4. Audit Log Viewer (Historical view)
```bash
# View complete history
python .claude/skills/csprojtasks/scripts/workflow_manager.py \
  get_audit_log "my-topic"

# Output:
2025-10-24 12:00:00 | phase-1-requirements | PHASE_STARTED
2025-10-24 12:00:00 | parse-spec | STEP_STARTED
2025-10-24 12:01:00 | parse-spec | STEP_COMPLETED | spec_valid: true, file: spec.md
2025-10-24 12:01:05 | extract-requirements | STEP_STARTED
2025-10-24 12:02:30 | extract-requirements | STEP_COMPLETED | count: 5
2025-10-24 12:02:35 | extract-deliverables | STEP_STARTED
2025-10-24 12:03:15 | extract-deliverables | STEP_COMPLETED | count: 3
2025-10-24 12:04:00 | extract-acceptance-criteria | STEP_STARTED
```

---

## Audit Log Storage Strategy (Phase 1)

### Single Source Approach (Recommended by Expert)

**⚠️ Phase 1: JSON ONLY** - Simplify to prevent sync issues

#### Structured Log (in topic.json)
**Location**: `.claude/agents/state/csprojecttask/topics/{slug}/topic.json`

**Format**: JSON array embedded in topic state
```json
{
  "topic": {
    "workflow": {
      "audit_log": [
        {
          "timestamp": "2025-10-24T12:00:00Z",
          "level": "info",
          "phase_id": "phase-1-requirements",
          "step_id": "parse-spec",
          "action": "started",
          "details": {},
          "duration_seconds": null
        },
        {
          "timestamp": "2025-10-24T12:01:00Z",
          "level": "info",
          "phase_id": "phase-1-requirements",
          "step_id": "parse-spec",
          "action": "completed",
          "details": {
            "spec_valid": true,
            "spec_file": "spec/original-spec.md"
          },
          "duration_seconds": 60
        },
        {
          "timestamp": "2025-10-24T12:01:30Z",
          "level": "error",
          "phase_id": "phase-1-requirements",
          "step_id": "extract-requirements",
          "action": "failed",
          "details": {
            "error": "Spec file not found",
            "error_type": "FileNotFoundError"
          },
          "duration_seconds": 5
        }
      ]
    }
  }
}
```

**Benefits**:
- ✅ Single source of truth (no sync issues)
- ✅ Easy to query programmatically
- ✅ Versioned with topic state
- ✅ Structured data for analysis
- ✅ Atomic updates with file locking

### Logging Pattern (Phase 1)

```python
import fcntl  # Linux/Mac
# import msvcrt  # Windows

def log_to_audit_trail(topic_slug, level, phase_id, step_id, action, details, duration_seconds=None):
    """Log to JSON audit trail with file locking."""

    topic_file = Path(f".claude/agents/state/csprojecttask/topics/{topic_slug}/topic.json")

    # Acquire lock
    with open(topic_file, 'r+') as f:
        fcntl.flock(f.fileno(), fcntl.LOCK_EX)  # Exclusive lock

        try:
            topic = json.load(f)

            audit_log = topic["topic"]["workflow"].get("audit_log", [])
            audit_log.append({
                "timestamp": datetime.utcnow().isoformat() + "Z",
                "level": level,
                "phase_id": phase_id,
                "step_id": step_id,
                "action": action,
                "details": details,
                "duration_seconds": duration_seconds
            })
            topic["topic"]["workflow"]["audit_log"] = audit_log

            # Write back
            f.seek(0)
            f.truncate()
            json.dump(topic, f, indent=2)

        finally:
            fcntl.flock(f.fileno(), fcntl.LOCK_UN)  # Release lock
```

### Viewing Audit Log

**Command-line viewer**:
```bash
# View recent log entries
python .claude/skills/csprojtasks/scripts/workflow_manager.py \
  get_audit_log "my-topic" 20

# Output (formatted from JSON):
2025-10-24 12:00:00 | INFO  | parse-spec | STARTED
2025-10-24 12:01:00 | INFO  | parse-spec | COMPLETED (60s) | spec_valid=true
2025-10-24 12:01:30 | ERROR | extract-requirements | FAILED (5s) | error: Spec file not found
```

### 🔮 Phase 3: Human-Readable Log Viewer

**In Phase 3**, we'll add a formatted log viewer that reads the JSON and displays it in human-readable format (like `tail -f`).

**Why wait?**
- Phase 1: Focus on core workflow
- Phase 3: Add convenience features after core is stable

---

## Benefits

| Aspect | Before | After |
|--------|--------|-------|
| **Accountability** | No audit trail | Complete log (JSON + text) |
| **Control** | Edit agent.md to change workflow | Edit settings.json |
| **Consistency** | Agents interpret differently | All follow settings definition |
| **Visibility** | User doesn't know what's happening | 4 ways to view: Sidebar, Status, Dashboard, Audit log |
| **Real-time monitoring** | ❌ None | ✅ tail -f workflow-audit.log |
| **Skip steps?** | ✅ Yes (easy to forget) | ❌ No (enforced by dependencies) |
| **Debug failures?** | ⚠️ Hard | ✅ Check audit log (JSON or text) |
| **Query history?** | ❌ Not possible | ✅ Query JSON or grep text log |

---

## Configuration Examples

### Disable Feature
```json
{
  "features": {
    "qa_validation": {
      "enabled": false  // Skip QA for this project
    }
  }
}
```

### Relax Validation
```json
{
  "behavior": {
    "validation": {
      "strictness": "relaxed",
      "fail_on_missing_required": false
    }
  }
}
```

### Change Error Handling
```json
{
  "behavior": {
    "error_handling": {
      "strategy": "ask_user",  // Ask user on errors
      "max_retries": 5
    }
  }
}
```

---

## Next Steps

1. **Review** this spec and provide feedback
2. **Create** `settings.json` from example
3. **Implement** `workflow_manager.py` script
4. **Integrate** with agent.md
5. **Test** with new topic creation
6. **Iterate** based on results

**Implementation time**: 1-2 days for MVP

---

## Files

```
.claude/agents/csprojecttask/
├── agent.md                    # Agent prompt
├── settings.json               # 🆕 Workflow configuration
└── settings.example.json       # 🆕 Template

.claude/skills/csprojtasks/scripts/
└── workflow_manager.py         # 🆕 Workflow enforcement (status, logs, validation)

.claude/agents/state/csprojecttask/topics/{slug}/
├── topic.json                  # Extended with workflow.audit_log array
├── workflow-audit.log          # 🆕 Human-readable audit log (tail -f friendly)
├── pm-state.json               # Existing PM state
└── task-*.json                 # Existing task states
```

---

## Quick Visual Summary

### User Visibility Options

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. Claude CLI Sidebar (Real-time)                               │
│    Updates automatically via TodoWrite hooks                     │
│    ┌──────────────────────────────────────────────────────┐    │
│    │ 🔄 [A:orch] Phase 1: Requirements Analysis (57%)    │    │
│    │    ↳ Extracting acceptance criteria...              │    │
│    └──────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 2. Status Command (On-demand query)                             │
│    $ python workflow_manager.py get_workflow_status "my-topic"  │
│    ┌──────────────────────────────────────────────────────┐    │
│    │ Phase 1: Requirements Analysis - 57% (4/7 steps)    │    │
│    │   ✓ parse-spec (completed)                          │    │
│    │   ✓ extract-requirements (completed)                │    │
│    │   🔄 extract-acceptance-criteria (in progress)       │    │
│    │   ⏳ validate-spec (pending)                         │    │
│    └──────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 3. Dashboard (Multi-topic overview)                             │
│    $ python multi_topic_dashboard.py                            │
│    ┌──────────────────────────────────────────────────────┐    │
│    │ Topic: my-topic-slug                                 │    │
│    │ Phase: Requirements Analysis (57%)                   │    │
│    │ Step:  extract-acceptance-criteria                   │    │
│    └──────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 4. Audit Log (Historical + Real-time)                           │
│    $ tail -f workflow-audit.log                                 │
│    ┌──────────────────────────────────────────────────────┐    │
│    │ [12:00:00] INFO  | Step Started: parse-spec         │    │
│    │ [12:01:00] INFO  | Step Completed: parse-spec       │    │
│    │ [12:01:05] INFO  | Step Started: extract-requirements│   │
│    │ [12:02:30] INFO  | Step Completed: extract-requirements│ │
│    └──────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### Audit Log Storage (Hybrid)

```
┌──────────────────────────────────────────────────────────────────┐
│ topic.json (Structured)                                          │
│ ┌────────────────────────────────────────────────────────────┐  │
│ │ {                                                          │  │
│ │   "workflow": {                                            │  │
│ │     "audit_log": [                                         │  │
│ │       {                                                    │  │
│ │         "timestamp": "2025-10-24T12:00:00Z",              │  │
│ │         "step_id": "parse-spec",                          │  │
│ │         "action": "completed",                            │  │
│ │         "details": {"spec_valid": true}                   │  │
│ │       }                                                    │  │
│ │     ]                                                      │  │
│ │   }                                                        │  │
│ │ }                                                          │  │
│ └────────────────────────────────────────────────────────────┘  │
│ ✅ Programmatic access (JSON queries)                            │
│ ✅ Versioned with topic state                                    │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│ workflow-audit.log (Human-readable)                              │
│ ┌────────────────────────────────────────────────────────────┐  │
│ │ [2025-10-24 12:00:00] INFO  | Step Started: parse-spec   │  │
│ │ [2025-10-24 12:00:05] DEBUG | Validation: spec exists ✓  │  │
│ │ [2025-10-24 12:01:00] INFO  | Step Completed: parse-spec │  │
│ │ [2025-10-24 12:01:00] INFO  |   Result: spec_valid=true  │  │
│ └────────────────────────────────────────────────────────────┘  │
│ ✅ Easy to read (cat, tail -f, grep)                             │
│ ✅ Real-time streaming                                           │
└──────────────────────────────────────────────────────────────────┘
```

---

---

## 🔮 Phase 2 Features (Coming Later)

### Hooks System Integration

**NOTE**: Hooks are intentionally excluded from Phase 1 (Core). They will be implemented in Phase 2 after core workflow is proven stable.

### What Are Hooks?

Hooks are event-driven callbacks that sync orchestration state with Claude Code's native TodoWrite tool, providing real-time visibility in the CLI sidebar.

**Status**: ⏸️ Deferred to Phase 2 (not in Phase 1)

### Hooks in Settings

```json
{
  "hooks": {
    "enabled": true,
    "sync_to_todowrite": true,
    "task_prefix": "[A:orch]",
    "progress_update_threshold": 10,
    "verbose": false,

    "events": {
      "pre_task_create": {
        "enabled": true,
        "description": "Before creating task state file",
        "actions": ["create_pending_todo", "log_task_creation"]
      },
      "post_task_create": {
        "enabled": true,
        "description": "After task state file created",
        "actions": ["update_todo_status", "sync_state_file"]
      },
      "task_progress_update": {
        "enabled": true,
        "description": "When task progress changes",
        "throttle_seconds": 30,
        "min_progress_change": 10,
        "actions": ["update_todo_activeForm", "show_progress_percentage"]
      },
      "task_complete": {
        "enabled": true,
        "description": "When task completes successfully",
        "actions": ["mark_todo_complete", "log_completion", "trigger_next_task"]
      },
      "task_error": {
        "enabled": true,
        "description": "When task encounters error",
        "actions": ["mark_todo_error", "log_error", "notify_user"]
      },
      "task_blocked": {
        "enabled": true,
        "description": "When task is blocked waiting for input",
        "actions": ["mark_todo_blocked", "show_blocking_question", "wait_for_answer"]
      },
      "phase_started": {
        "enabled": true,
        "description": "When workflow phase starts",
        "actions": ["create_phase_todo", "log_phase_start", "update_dashboard"]
      },
      "phase_complete": {
        "enabled": true,
        "description": "When workflow phase completes",
        "actions": ["mark_phase_complete", "log_phase_completion", "trigger_approval"]
      },
      "workflow_step_started": {
        "enabled": true,
        "description": "When workflow step begins",
        "actions": ["log_to_audit", "update_workflow_state"]
      },
      "workflow_step_complete": {
        "enabled": true,
        "description": "When workflow step finishes",
        "actions": ["log_to_audit", "mark_step_complete", "check_next_step"]
      },
      "agent_invoked": {
        "enabled": true,
        "description": "When sub-agent is launched",
        "actions": ["create_agent_todo", "log_invocation"]
      },
      "agent_completed": {
        "enabled": true,
        "description": "When sub-agent finishes",
        "actions": ["mark_agent_complete", "process_result"]
      }
    },

    "todowrite_integration": {
      "auto_create_todos": true,
      "show_progress_percentage": true,
      "show_blocking_status": true,
      "collapse_completed": false,
      "max_todos_visible": 20,
      "group_by_phase": true
    },

    "notification": {
      "on_error": true,
      "on_completion": true,
      "on_blocked": true,
      "sound_enabled": false
    }
  }
}
```

### Hook Lifecycle Example

```
User action: "Create topic using spec.md"
    ↓
[HOOK: workflow_step_started]
  → Action: log_to_audit
  → Action: update_workflow_state
  → TodoWrite: Create "[A:orch] Phase 1: Requirements Analysis (0%)"
    ↓
[HOOK: workflow_step_started] (parse-spec)
  → Action: log_to_audit ("Parsing specification file")
  → TodoWrite: Update activeForm "Parsing specification..."
    ↓
Progress: 25%
    ↓
[HOOK: task_progress_update]
  → Check: progress_change > 10%? YES (0% → 25%)
  → Action: update_todo_activeForm
  → TodoWrite: "[A:orch] Phase 1: Requirements (25%)"
    ↓
[HOOK: workflow_step_complete] (parse-spec)
  → Action: log_to_audit
  → Action: mark_step_complete
  → Action: check_next_step
  → TodoWrite: Update activeForm "Extracting requirements..."
    ↓
Error encountered!
    ↓
[HOOK: task_error]
  → Action: mark_todo_error
  → Action: log_error
  → Action: notify_user
  → TodoWrite: "❌ [A:orch] Phase 1: Error - spec file not found"
```

### Hook Configuration Commands

```bash
# View hook status
python .claude/skills/csprojtasks/scripts/hooks.py get_hook_status

# Output:
# Hooks System Status
# ==================
# Enabled: true
# TodoWrite Sync: true
# Task Prefix: [A:orch]
#
# Active Hooks:
#   ✓ pre_task_create
#   ✓ post_task_create
#   ✓ task_progress_update (throttled: 30s)
#   ✓ task_complete
#   ✓ task_error
#   ✓ task_blocked
#   ✓ phase_started
#   ✓ phase_complete

# Enable/disable specific hook
python .claude/skills/csprojtasks/scripts/hooks.py \
  set_hook_enabled "task_progress_update" false

# Adjust throttle threshold
python .claude/skills/csprojtasks/scripts/hooks.py \
  set_progress_threshold 20  # Only update every 20% change
```

### Hooks + Workflow Integration

**How hooks work with workflow steps:**

```python
# In workflow_manager.py
def execute_step(step_id, topic_slug):
    settings = load_settings()

    # 1. Trigger step started hook
    if settings["hooks"]["events"]["workflow_step_started"]["enabled"]:
        trigger_hook("workflow_step_started", {
            "step_id": step_id,
            "topic_slug": topic_slug,
            "timestamp": now()
        })

    # 2. Execute the step
    result = perform_step(step_id)

    # 3. Update progress periodically (with throttling)
    for progress in [25, 50, 75]:
        if should_trigger_progress_hook(progress):
            trigger_hook("task_progress_update", {
                "step_id": step_id,
                "progress": progress
            })

    # 4. Trigger step complete hook
    if settings["hooks"]["events"]["workflow_step_complete"]["enabled"]:
        trigger_hook("workflow_step_complete", {
            "step_id": step_id,
            "result": result
        })
```

**Throttling logic:**

```python
def should_trigger_progress_hook(new_progress):
    """Only trigger if progress changed significantly."""
    settings = load_settings()

    threshold = settings["hooks"]["progress_update_threshold"]
    last_progress = get_last_progress()

    # Check if change exceeds threshold
    if abs(new_progress - last_progress) >= threshold:
        return True

    # Also check time-based throttle
    throttle = settings["hooks"]["events"]["task_progress_update"]["throttle_seconds"]
    last_update = get_last_update_time()

    if (now() - last_update) >= throttle:
        return True

    return False
```

### Hook Actions Reference

| Hook Event | Actions | TodoWrite Effect |
|------------|---------|------------------|
| `pre_task_create` | create_pending_todo | Shows "⏳ [A:orch] Task pending" |
| `post_task_create` | update_todo_status | Changes to "🔄 [A:orch] Task in progress" |
| `task_progress_update` | update_todo_activeForm | Shows "🔄 [A:orch] Task (45%)" |
| `task_complete` | mark_todo_complete | Shows "✅ [A:orch] Task complete" |
| `task_error` | mark_todo_error | Shows "❌ [A:orch] Task failed: error" |
| `task_blocked` | mark_todo_blocked | Shows "⚠️ [A:orch] BLOCKED: question" |
| `phase_started` | create_phase_todo | Shows "🔄 [A:orch] Phase 1 (0%)" |
| `phase_complete` | mark_phase_complete | Shows "✅ [A:orch] Phase 1 complete" |

### Disabling Hooks

**Disable all hooks:**
```json
{
  "hooks": {
    "enabled": false  // Turns off entire hook system
  }
}
```

**Disable TodoWrite sync only:**
```json
{
  "hooks": {
    "enabled": true,
    "sync_to_todowrite": false  // Hooks run but don't update sidebar
  }
}
```

**Disable specific hook:**
```json
{
  "hooks": {
    "events": {
      "task_progress_update": {
        "enabled": false  // No progress updates in sidebar
      }
    }
  }
}
```

### Benefits of Hooks in Settings

| Benefit | Description |
|---------|-------------|
| **Centralized control** | All hook behavior in one settings file |
| **Easy toggling** | Enable/disable hooks without editing code |
| **Throttling control** | Adjust update frequency to reduce noise |
| **Event customization** | Choose which events to track |
| **Testing friendly** | Disable hooks during testing |
| **Performance tuning** | Adjust thresholds for optimal performance |

---

## Sub-Agent Integration

### Integrated Agents

The csprojecttask agent orchestrates these specialist sub-agents:

####  1. **deliverables-qa-validator**
**Purpose**: Final quality gate before topic completion

**Workflow Integration**:
- Automatically invoked as **last step** in Phase 4 (Execution)
- Validates all deliverables against spec and topic plan
- Generates comprehensive QA-REPORT.md
- Returns PASS/FAIL status

**Settings Control**:
```json
{
  "features": {
    "qa_validation": {
      "enabled": true,          // Enable/disable QA validation
      "auto_validate": true,    // Auto-invoke or manual only
      "validator_agent": "deliverables-qa-validator",
      "fail_on_critical": true, // Fail topic if critical issues found
      "require_readme": true    // Require README.md exists
    }
  },
  "workflow": {
    "phases": [
      {
        "id": "phase-4-execution",
        "steps": [
          // ... other steps
          {
            "id": "qa-validation",
            "name": "QA validation of deliverables",
            "agent": "deliverables-qa-validator",
            "required": true,
            "depends_on": ["generate-documentation"],
            "validation": {
              "check_feature": "qa_validation.enabled"
            },
            "completion_criteria": [
              "qa_report_generated",
              "qa_status_pass_or_warning"
            ]
          }
        ]
      }
    ]
  }
}
```

**Validation Checks**:
- ✅ All deliverables from spec present
- ✅ All acceptance criteria met
- ✅ README.md exists and comprehensive
- ✅ No placeholder content (TODO, FIXME)
- ✅ Documentation matches actual deliverables
- ✅ All tasks completed successfully

**Output**:
- `Project-tasks/{slug}/QA-REPORT.md` - Detailed validation report
- QA status: PASS | PASS_WITH_WARNINGS | FAIL
- Recommendations for improvements

#### 2. **documentation-expert**
**Purpose**: Generate comprehensive project documentation

**Workflow Integration**:
- Invoked **after all feature tasks complete** (Phase 4)
- Creates README.md for deliverables
- Generates user-facing documentation
- Ensures documentation quality before QA

**Settings Control**:
```json
{
  "features": {
    "documentation_generation": {
      "enabled": true,              // Enable/disable doc generation
      "auto_generate": true,        // Auto-invoke or manual
      "format": "markdown",          // Documentation format
      "location": "deliverables/",   // Where to place docs
      "required_sections": [         // What sections to include
        "overview",
        "features",
        "setup",
        "usage",
        "examples",
        "troubleshooting"
      ],
      "target_audience": "end-users" // Who docs are for
    }
  },
  "workflow": {
    "phases": [
      {
        "id": "phase-4-execution",
        "steps": [
          // ... after feature tasks
          {
            "id": "generate-documentation",
            "name": "Generate project documentation",
            "agent": "documentation-expert",
            "required": true,
            "depends_on": ["monitor-execution"],
            "validation": {
              "check_feature": "documentation_generation.enabled"
            },
            "completion_criteria": [
              "readme_exists",
              "readme_comprehensive",
              "all_sections_present"
            ]
          }
        ]
      }
    ]
  }
}
```

**Generates**:
- `README.md` - Comprehensive project documentation
- Installation/setup instructions
- Usage examples
- Troubleshooting guide
- Feature descriptions

**Quality Standards**:
- ✅ Clear, concise language
- ✅ No placeholder content
- ✅ Accurate code examples
- ✅ All delivered features documented
- ✅ Appropriate for target audience

---

## Skills Integration

### csprojtasks Skills

The `.claude/skills/csprojtasks/scripts/` directory contains Python scripts that implement the orchestration logic:

#### Core Scripts

**1. `topic_manager.py`** - Topic lifecycle management
```python
# Functions:
create_topic(title, description)
list_active_topics()
get_topic_status(slug)
archive_topic(slug)
```

**2. `state_manager.py`** - State file operations
```python
# Functions:
create_state_file(path, type)
update_progress(path, percentage)
append_log(path, level, message)
set_task_status(path, status)
set_task_result(path, summary, files)
track_file_change(path, file, action)
```

**3. `workflow_manager.py`** - 🆕 Workflow enforcement (NEW)
```python
# Functions:
load_settings()
get_workflow_status(slug)
get_next_step(slug)
validate_dependencies(slug, step_id)
mark_step_complete(slug, step_id, result)
get_audit_log(slug, limit)
tail_audit_log(slug)
```

**4. `multi_topic_dashboard.py`** - Multi-topic dashboard
```python
# Functions:
display_dashboard()
refresh_topics()
show_progress()
```

**5. `finalize_topic.py`** - Topic finalization
```python
# Functions:
finalize_topic(slug)
update_topics_json(slug)
generate_summary(slug)
```

**6. `hooks.py`** - TodoWrite integration
```python
# Functions:
trigger_hook(event, data)
sync_to_todowrite()
update_progress_in_sidebar()
```

**7. `utils.py`** - Shared utilities
```python
# Functions:
slugify(text)
format_date(timestamp)
validate_json(data, schema)
```

#### Settings Configuration for Skills

```json
{
  "skills": {
    "csprojtasks": {
      "scripts_directory": ".claude/skills/csprojtasks/scripts/",
      "python_executable": "python",
      "scripts": {
        "topic_manager": {
          "path": "topic_manager.py",
          "enabled": true,
          "functions": [
            "create_topic",
            "list_active_topics",
            "get_topic_status",
            "archive_topic"
          ]
        },
        "state_manager": {
          "path": "state_manager.py",
          "enabled": true,
          "functions": [
            "create_state_file",
            "update_progress",
            "append_log",
            "set_task_status",
            "set_task_result",
            "track_file_change"
          ]
        },
        "workflow_manager": {
          "path": "workflow_manager.py",
          "enabled": true,
          "required": true,
          "functions": [
            "load_settings",
            "get_workflow_status",
            "get_next_step",
            "validate_dependencies",
            "mark_step_complete",
            "get_audit_log",
            "tail_audit_log"
          ]
        },
        "multi_topic_dashboard": {
          "path": "multi_topic_dashboard.py",
          "enabled": true
        },
        "finalize_topic": {
          "path": "finalize_topic.py",
          "enabled": true
        },
        "hooks": {
          "path": "hooks.py",
          "enabled": true,
          "config_file": ".claude/agents/csprojecttask/hooks-config.json"
        }
      }
    }
  }
}
```

---

## Complete Phase 4 with Sub-Agents

### Extended Phase 4: Execution

```json
{
  "id": "phase-4-execution",
  "name": "Execution",
  "order": 4,
  "required": true,
  "depends_on": ["phase-3-execution-planning"],
  "steps": [
    {
      "id": "prepare-task-launch",
      "name": "Prepare task launch instructions",
      "required": true,
      "completion_criteria": ["launch_instructions_prepared"]
    },
    {
      "id": "present-execution-plan",
      "name": "Present execution plan to user",
      "required": true,
      "depends_on": ["prepare-task-launch"],
      "completion_criteria": ["plan_presented"]
    },
    {
      "id": "wait-launch-approval",
      "name": "Wait for launch approval",
      "required": true,
      "depends_on": ["present-execution-plan"],
      "completion_criteria": ["user_approval_received"]
    },
    {
      "id": "launch-feature-agents",
      "name": "Launch feature sub-agents",
      "required": true,
      "depends_on": ["wait-launch-approval"],
      "note": "Launch all feature-building agents (e.g., single-page-website-builder)",
      "completion_criteria": ["all_agents_launched"]
    },
    {
      "id": "monitor-execution",
      "name": "Monitor sub-agent execution",
      "required": true,
      "depends_on": ["launch-feature-agents"],
      "script": "monitor_agents.py",
      "completion_criteria": [
        "all_agents_completed",
        "no_blocked_agents",
        "no_critical_errors"
      ]
    },
    {
      "id": "generate-documentation",
      "name": "Generate project documentation",
      "agent": "documentation-expert",
      "required": true,
      "depends_on": ["monitor-execution"],
      "validation": {
        "check_feature": "documentation_generation.enabled",
        "required_if": "documentation_generation.auto_generate"
      },
      "completion_criteria": [
        "readme_generated",
        "readme_location_deliverables",
        "documentation_comprehensive",
        "all_features_documented"
      ]
    },
    {
      "id": "qa-validation",
      "name": "QA validation of deliverables",
      "agent": "deliverables-qa-validator",
      "required": true,
      "depends_on": ["generate-documentation"],
      "validation": {
        "check_feature": "qa_validation.enabled",
        "required_if": "qa_validation.auto_validate"
      },
      "completion_criteria": [
        "qa_report_generated",
        "qa_status_determined",
        "critical_issues_resolved"
      ]
    },
    {
      "id": "finalize-topic",
      "name": "Finalize topic state and summary",
      "required": true,
      "depends_on": ["qa-validation"],
      "script": "finalize_topic.py",
      "completion_criteria": [
        "topic_finalized_in_topics_json",
        "state_consistent",
        "summary_generated",
        "user_notified"
      ]
    }
  ]
}
```

### Workflow Sequence

```
Phase 4: Execution
├─ 1. Prepare task launch (PM)
├─ 2. Present to user (PM)
├─ 3. Wait for approval (PM)
├─ 4. Launch feature agents (Main session)
│     ├─ Task 001: single-page-website-builder
│     ├─ Task 002: another-agent
│     └─ Task 003: yet-another-agent
│
├─ 5. Monitor execution (PM)
│     ├─ Check task-001.json progress
│     ├─ Check task-002.json progress
│     └─ Check task-003.json progress
│
├─ 6. Generate documentation (documentation-expert)
│     ├─ Read all deliverables
│     ├─ Create README.md
│     └─ Document all features
│
├─ 7. QA validation (deliverables-qa-validator)
│     ├─ Validate against spec
│     ├─ Check acceptance criteria
│     ├─ Verify README exists
│     └─ Generate QA-REPORT.md
│
└─ 8. Finalize topic (finalize_topic.py)
      ├─ Update topics.json
      ├─ Generate summary
      └─ Present to user
```

---

## Integration Points

### How Settings Control Sub-Agents

```python
def should_invoke_agent(agent_name, step):
    """Check if agent should be invoked based on settings."""
    settings = load_settings()

    # Check if step has agent requirement
    if step.get("agent") != agent_name:
        return False

    # Check if step is required
    if not step.get("required", True):
        return False

    # Check feature flag
    if "validation" in step:
        feature_path = step["validation"].get("check_feature")
        if feature_path:
            # Navigate settings path (e.g., "qa_validation.enabled")
            enabled = get_nested(settings["features"], feature_path.split("."))
            if not enabled:
                return False

    # Check conditional requirement
    if "required_if" in step.get("validation", {}):
        condition_path = step["validation"]["required_if"]
        required = get_nested(settings["features"], condition_path.split("."))
        if not required:
            return False

    return True

# Example usage:
if should_invoke_agent("deliverables-qa-validator", current_step):
    launch_qa_validator()
else:
    skip_step("QA validation disabled in settings")
```

### How Skills Implement Workflow

```python
# workflow_manager.py implements the enforcement
def execute_step(step_id, topic_slug):
    settings = load_settings()
    step = find_step(settings, step_id)

    # If step has script, run it
    if "script" in step:
        script_name = step["script"]
        script_path = get_script_path(settings, script_name)
        run_script(script_path, topic_slug)

    # If step has agent, prepare prompt
    elif "agent" in step:
        agent_name = step["agent"]
        if should_invoke_agent(agent_name, step):
            prepare_agent_invocation(agent_name, step, topic_slug)

    # Otherwise, manual step
    else:
        return "manual_step_required"
```

---

## Benefits of Integrated System

| Aspect | Before | After (with settings) |
|--------|--------|----------------------|
| **QA validation** | Sometimes skipped | Always runs (if enabled) |
| **Documentation** | Often forgotten | Automatic, before QA |
| **Script execution** | Manual, error-prone | Controlled by settings |
| **Sub-agent invocation** | Ad-hoc | Defined in workflow |
| **Feature toggling** | Edit agent.md | Edit settings.json |
| **Workflow customization** | Hard to modify | Easy configuration |
| **Audit trail** | Partial | Complete (all steps logged) |

---

---

## Expert Review Summary

**Review Date**: 2025-10-24
**Reviewer**: Expert Systems Architect
**Overall Assessment**: ✅ Well-architected, needs phased implementation

### 🎯 Strengths
- ✅ Solves core problem (prose → programmatic enforcement)
- ✅ Excellent observability (4 visibility methods)
- ✅ Extensible design (hooks, sub-agents, skills)
- ✅ Well-documented with clear examples

### ⚠️ Critical Issues Addressed in Revision
- ✅ JSON Schema Validation added
- ✅ Completion Criteria Evaluator defined
- ✅ File Locking implementation specified
- ✅ Dual Audit Logs simplified to single source
- ✅ Error Recovery/Rollback added

### 💡 Improvements Incorporated
- ✅ Phased implementation (3 phases: Core → Advanced → Polish)
- ✅ Hooks deferred to Phase 2
- ✅ Idempotent steps design
- ✅ Dry-run mode planned for Phase 2
- ✅ Event bus pattern for Phase 2
- ✅ Settings migration strategy for Phase 3

---

**Status**: ✅ Ready for Phase 1 implementation
**Priority**: High (transforms agent accountability)
**Complexity**: Medium
**Timeline**: 5-8 days total (phased approach)
- Phase 1 (Core): 2-3 days ← **Start here**
- Phase 2 (Advanced): 2-3 days ← After Phase 1 tested
- Phase 3 (Polish): 1-2 days ← Production ready
