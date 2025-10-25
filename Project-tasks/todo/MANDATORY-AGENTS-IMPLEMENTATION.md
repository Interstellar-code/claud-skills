# Mandatory Agents Implementation Guide

**Version**: 1.0.0
**Date**: 2025-10-25
**Status**: Implementation Ready
**Priority**: High

---

## Table of Contents

1. [Overview](#overview)
2. [Problem Statement](#problem-statement)
3. [Current State Analysis](#current-state-analysis)
4. [Proposed Solution](#proposed-solution)
5. [Implementation Details](#implementation-details)
6. [Workflow Integration](#workflow-integration)
7. [Handover Context Specification](#handover-context-specification)
8. [Testing Strategy](#testing-strategy)
9. [Example Scenarios](#example-scenarios)
10. [Implementation Checklist](#implementation-checklist)

---

## Overview

### Purpose
Enforce mandatory execution of `documentation-expert` and `deliverables-qa-validator` agents at the end of every csprojecttask workflow, regardless of what agents the PM selects during Phase 2.

### Key Principle
**Settings-driven enforcement, not PM discretion**. The settings.json file should MANDATE certain agents, removing the decision from the PM agent.

### Outcome
Every topic will automatically:
1. Generate comprehensive documentation via `documentation-expert` after all primary tasks complete
2. Validate all deliverables via `deliverables-qa-validator` as the final step

---

## Problem Statement

### What Happened (SubsHero Example)

**Topic**: SubsHero Website (3 HTML versions)

**Phase 2 - Agent Selection**:
- PM agent selected: `single-page-website-builder` (for all 3 HTML files)
- PM agent bundled README.md creation with Task 003
- **Problem**: `documentation-expert` agent was NOT selected, despite being perfect for README creation

**Result**:
- ✅ HTML files created correctly
- ❌ README.md created by wrong agent (website-builder instead of docs-expert)
- ❌ No QA validation run at end
- ❌ Quality depends on PM's agent selection judgment

### Root Cause

**Existing settings.json has flags, but they're NOT implemented**:

```json
"features": {
  "documentation_generation": {
    "enabled": true,
    "auto_generate": true,  // ← Flag exists but NOT READ by code!
    "format": "markdown",
    "location": "Project-tasks/{topic-slug}/"
  },
  "qa_validation": {
    "enabled": true,
    "auto_validate": false,  // ← Flag exists but NOT READ by code!
    "validator_agent": "deliverables-qa-validator"
  }
}
```

**Problem**: `workflow_manager.py` never reads these flags!

```bash
$ grep "auto_validate\|auto_generate" .claude/skills/csprojtasks/scripts/workflow_manager.py
# Result: NO MATCHES!
```

---

## Current State Analysis

### What EXISTS but is NOT Implemented

#### 1. **documentation_generation Feature** (Lines 343-348)

**Current state**:
```json
"documentation_generation": {
  "enabled": true,           // ← Exists
  "auto_generate": true,     // ← Exists but IGNORED
  "format": "markdown",      // ← Exists
  "location": "Project-tasks/{topic-slug}/"  // ← Exists
}
```

**What's MISSING**:
- ❌ Which agent to use (`documentation-expert`)
- ❌ When to trigger (after all tasks? after Phase 3?)
- ❌ What context to pass to the agent
- ❌ Enforcement mechanism (`enforce: true`)
- ❌ Code to read these flags

#### 2. **qa_validation Feature** (Lines 349-353)

**Current state**:
```json
"qa_validation": {
  "enabled": true,                          // ← Exists
  "auto_validate": false,                   // ← Exists but IGNORED
  "validator_agent": "deliverables-qa-validator"  // ← Exists
}
```

**What's MISSING**:
- ❌ When to trigger (after docs? after all tasks?)
- ❌ What context to pass to the agent
- ❌ Dependencies (must run after documentation)
- ❌ Enforcement mechanism (`enforce: true`)
- ❌ Code to read these flags

### Existing Control Mechanisms (We Should Follow)

The settings.json already has robust control patterns:

**Pattern 1: Step Enforcement** (Lines 19-114)
```json
{
  "id": "parse-spec",
  "required": true,        // ← ENFORCES execution
  "depends_on": [],        // ← ENFORCES dependencies
  "validation": {...},     // ← ENFORCES validation
  "completion_criteria": [...] // ← ENFORCES success criteria
}
```

**Pattern 2: Behavior Enforcement** (Lines 316-340)
```json
"behavior": {
  "validation": {
    "strictness": "strict",           // ← ENFORCES strict mode
    "fail_on_missing_required": true  // ← ENFORCES failure
  },
  "user_interaction": {
    "allow_phase_skip": false  // ← ENFORCES no skipping
  }
}
```

**We should follow the same patterns for mandatory agents!**

---

## Proposed Solution

### Enhance Existing Features (Don't Add New Sections)

**Principle**: Reuse existing `features.documentation_generation` and `features.qa_validation`, just add missing fields and implement the logic.

### Enhanced Settings Structure

```json
"features": {
  "documentation_generation": {
    "enabled": true,
    "auto_generate": true,
    "enforce": true,  // ← NEW: Make it mandatory
    "agent": "documentation-expert",  // ← NEW: Which agent
    "trigger": "after_all_primary_tasks",  // ← NEW: When to run
    "format": "markdown",
    "deliverables": ["README.md"],  // ← NEW: What to create
    "location": "Project-tasks/{topic-slug}/deliverables/",
    "handover_context": {  // ← NEW: What to pass to agent
      "include": [
        "all_deliverables_list",
        "task_summaries",
        "acceptance_criteria_complete",
        "technical_constraints",
        "spec_file_path"
      ]
    }
  },
  "qa_validation": {
    "enabled": true,
    "auto_validate": true,  // ← CHANGE: Enable auto-validation
    "enforce": true,  // ← NEW: Make it mandatory
    "validator_agent": "deliverables-qa-validator",
    "trigger": "after_documentation",  // ← NEW: When to run
    "depends_on": ["documentation_generation"],  // ← NEW: Must run after docs
    "handover_context": {  // ← NEW: What to pass to agent
      "include": [
        "topicplan_path",
        "all_deliverables_paths",
        "acceptance_criteria_complete",
        "spec_file_path"
      ]
    }
  }
}
```

### Key Fields Explained

| Field | Purpose | Example |
|-------|---------|---------|
| `enforce` | Make agent selection mandatory (not optional) | `true` |
| `agent` | Which agent to use | `"documentation-expert"` |
| `trigger` | When to inject the agent | `"after_all_primary_tasks"` |
| `depends_on` | Which features must complete first | `["documentation_generation"]` |
| `deliverables` | What files the agent should create | `["README.md"]` |
| `handover_context.include` | What data to pass to the agent | `["deliverables", "summaries"]` |

---

## Implementation Details

### Files to Modify

#### 1. `.claude/agents/csprojecttask/settings.json`

**Location**: Lines 343-353
**Action**: Replace existing `documentation_generation` and `qa_validation` sections

**Before**:
```json
"features": {
  "documentation_generation": {
    "enabled": true,
    "auto_generate": true,
    "format": "markdown",
    "location": "Project-tasks/{topic-slug}/"
  },
  "qa_validation": {
    "enabled": true,
    "auto_validate": false,
    "validator_agent": "deliverables-qa-validator"
  }
}
```

**After**:
```json
"features": {
  "documentation_generation": {
    "enabled": true,
    "auto_generate": true,
    "enforce": true,
    "agent": "documentation-expert",
    "trigger": "after_all_primary_tasks",
    "format": "markdown",
    "deliverables": ["README.md"],
    "location": "Project-tasks/{topic-slug}/deliverables/",
    "handover_context": {
      "include": [
        "all_deliverables_list",
        "task_summaries",
        "acceptance_criteria_complete",
        "technical_constraints",
        "spec_file_path"
      ]
    }
  },
  "qa_validation": {
    "enabled": true,
    "auto_validate": true,
    "enforce": true,
    "validator_agent": "deliverables-qa-validator",
    "trigger": "after_documentation",
    "depends_on": ["documentation_generation"],
    "handover_context": {
      "include": [
        "topicplan_path",
        "all_deliverables_paths",
        "acceptance_criteria_complete",
        "spec_file_path"
      ]
    }
  }
}
```

---

#### 2. `.claude/agents/csprojecttask/settings.schema.json`

**Action**: Add JSON schema validation for new fields

**Add to schema**:
```json
{
  "properties": {
    "features": {
      "type": "object",
      "properties": {
        "documentation_generation": {
          "type": "object",
          "properties": {
            "enabled": { "type": "boolean" },
            "auto_generate": { "type": "boolean" },
            "enforce": {
              "type": "boolean",
              "description": "Make documentation generation mandatory (cannot be skipped)"
            },
            "agent": {
              "type": "string",
              "description": "Agent to use for documentation generation",
              "enum": ["documentation-expert"]
            },
            "trigger": {
              "type": "string",
              "description": "When to trigger documentation generation",
              "enum": ["after_all_primary_tasks", "after_phase3", "after_phase4"]
            },
            "format": { "type": "string" },
            "deliverables": {
              "type": "array",
              "items": { "type": "string" },
              "description": "List of documentation deliverables to create"
            },
            "location": { "type": "string" },
            "handover_context": {
              "type": "object",
              "properties": {
                "include": {
                  "type": "array",
                  "items": {
                    "type": "string",
                    "enum": [
                      "all_deliverables_list",
                      "task_summaries",
                      "acceptance_criteria_complete",
                      "technical_constraints",
                      "spec_file_path"
                    ]
                  }
                }
              }
            }
          },
          "required": ["enabled", "enforce", "agent"]
        },
        "qa_validation": {
          "type": "object",
          "properties": {
            "enabled": { "type": "boolean" },
            "auto_validate": { "type": "boolean" },
            "enforce": {
              "type": "boolean",
              "description": "Make QA validation mandatory (cannot be skipped)"
            },
            "validator_agent": {
              "type": "string",
              "description": "Agent to use for QA validation"
            },
            "trigger": {
              "type": "string",
              "description": "When to trigger QA validation",
              "enum": ["after_documentation", "after_all_tasks", "after_phase4"]
            },
            "depends_on": {
              "type": "array",
              "items": { "type": "string" },
              "description": "Features that must complete before QA validation"
            },
            "handover_context": {
              "type": "object",
              "properties": {
                "include": {
                  "type": "array",
                  "items": {
                    "type": "string",
                    "enum": [
                      "topicplan_path",
                      "all_deliverables_paths",
                      "acceptance_criteria_complete",
                      "spec_file_path"
                    ]
                  }
                }
              }
            }
          },
          "required": ["enabled", "enforce", "validator_agent"]
        }
      }
    }
  }
}
```

---

#### 3. `.claude/skills/csprojtasks/scripts/workflow_manager.py`

**Multiple changes needed across workflow phases**

---

##### **A. Add Helper Function: `get_mandatory_agents(settings)`**

**Location**: After `load_settings()` function (around line 250)

**Purpose**: Extract mandatory agents from settings

```python
def get_mandatory_agents(settings: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Extract mandatory agents from settings.

    Args:
        settings: Settings dictionary

    Returns:
        List of mandatory agent configurations

    Example:
        [
            {
                "name": "documentation-expert",
                "feature": "documentation_generation",
                "trigger": "after_all_primary_tasks",
                "depends_on": [],
                "deliverables": ["README.md"],
                "handover_context": {...}
            },
            {
                "name": "deliverables-qa-validator",
                "feature": "qa_validation",
                "trigger": "after_documentation",
                "depends_on": ["documentation_generation"],
                "deliverables": [],
                "handover_context": {...}
            }
        ]
    """
    mandatory = []
    features = settings.get("features", {})

    # Check documentation_generation feature
    doc_gen = features.get("documentation_generation", {})
    if doc_gen.get("enabled", False) and doc_gen.get("enforce", False):
        mandatory.append({
            "name": doc_gen.get("agent", "documentation-expert"),
            "feature": "documentation_generation",
            "trigger": doc_gen.get("trigger", "after_all_primary_tasks"),
            "depends_on": [],
            "deliverables": doc_gen.get("deliverables", ["README.md"]),
            "location": doc_gen.get("location", "Project-tasks/{topic-slug}/deliverables/"),
            "handover_context": doc_gen.get("handover_context", {})
        })

    # Check qa_validation feature
    qa_val = features.get("qa_validation", {})
    if qa_val.get("enabled", False) and qa_val.get("enforce", False):
        mandatory.append({
            "name": qa_val.get("validator_agent", "deliverables-qa-validator"),
            "feature": "qa_validation",
            "trigger": qa_val.get("trigger", "after_documentation"),
            "depends_on": qa_val.get("depends_on", ["documentation_generation"]),
            "deliverables": [],
            "handover_context": qa_val.get("handover_context", {})
        })

    return mandatory
```

---

##### **B. Add Helper Function: `build_handover_context(topic_slug, context_spec, settings)`**

**Location**: After `get_mandatory_agents()` function

**Purpose**: Build context data to pass to mandatory agents

```python
def build_handover_context(
    topic_slug: str,
    context_spec: Dict[str, Any],
    settings: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """
    Build handover context for mandatory agents based on specification.

    Args:
        topic_slug: Topic identifier
        context_spec: Context specification from settings (handover_context field)
        settings: Optional settings dict

    Returns:
        Dictionary of context data to pass to agent

    Example:
        {
            "topic_slug": "subshero-website",
            "all_deliverables_list": [
                {"name": "subshero-landing-v1.html", "path": "...", "status": "complete"},
                {"name": "subshero-landing-v2.html", "path": "...", "status": "complete"}
            ],
            "task_summaries": [
                {"task_id": "task-001", "agent": "single-page-website-builder", "status": "complete"}
            ],
            "acceptance_criteria_complete": [...],
            "spec_file_path": "Project-tasks/subshero-website/spec/subshero-website-spec.md"
        }
    """
    if settings is None:
        settings = load_settings()

    topic = load_topic_state(topic_slug, settings)
    context = {"topic_slug": topic_slug}

    include_list = context_spec.get("include", [])

    for item in include_list:
        if item == "all_deliverables_list":
            # Extract all deliverables from completed tasks
            deliverables = []
            for task in topic.get("topic", {}).get("tasks", []):
                if task.get("status") == "completed" and "deliverables" in task:
                    deliverables.extend(task["deliverables"])
            context["all_deliverables_list"] = deliverables

        elif item == "task_summaries":
            # Extract task summaries
            summaries = []
            for task in topic.get("topic", {}).get("tasks", []):
                summaries.append({
                    "task_id": task.get("id"),
                    "agent": task.get("agent"),
                    "status": task.get("status"),
                    "result": task.get("result", {})
                })
            context["task_summaries"] = summaries

        elif item == "acceptance_criteria_complete":
            # Extract all acceptance criteria from workflow
            criteria = []
            workflow = topic.get("topic", {}).get("workflow", {})
            for phase in workflow.get("phases", []):
                for step in phase.get("steps", []):
                    if "completion_criteria" in step:
                        criteria.extend(step["completion_criteria"])
            context["acceptance_criteria_complete"] = criteria

        elif item == "technical_constraints":
            # Extract technical constraints from spec (if available)
            spec_data = topic.get("topic", {}).get("spec_data", {})
            context["technical_constraints"] = spec_data.get("technical_constraints", [])

        elif item == "spec_file_path":
            # Get spec file path
            context["spec_file_path"] = topic.get("topic", {}).get("spec_file", "")

        elif item == "topicplan_path":
            # Get topicplan.md path
            topics_dir = Path(settings["paths"]["topics_directory"])
            topicplan_path = topics_dir / topic_slug / "topicplan.md"
            context["topicplan_path"] = str(topicplan_path)

        elif item == "all_deliverables_paths":
            # Get all deliverable file paths
            paths = []
            for task in topic.get("topic", {}).get("tasks", []):
                if "deliverables" in task:
                    for deliverable in task["deliverables"]:
                        if "path" in deliverable:
                            paths.append(deliverable["path"])
            context["all_deliverables_paths"] = paths

    return context
```

---

##### **C. Modify Phase 2: Auto-Inject Mandatory Agents**

**Location**: In the csprojecttask agent.md (Phase 2 section)

**Logic**: After PM selects agents, automatically add mandatory agents

**Pseudo-code**:
```python
# Phase 2, Step 3: select-agents
def select_agents_with_mandatory(requirements, settings):
    """
    Select agents based on requirements, then auto-inject mandatory agents.
    """
    # 1. PM selects agents based on requirements (existing logic)
    selected_agents = analyze_and_select_agents(requirements)

    # 2. Get mandatory agents from settings
    mandatory_agents = get_mandatory_agents(settings)

    # 3. Inject mandatory agents (don't let PM override)
    for mandatory in mandatory_agents:
        agent_name = mandatory["name"]

        # Check if already selected
        if agent_name not in [a["name"] for a in selected_agents]:
            selected_agents.append({
                "name": agent_name,
                "type": "mandatory",
                "trigger": mandatory["trigger"],
                "depends_on": mandatory["depends_on"],
                "deliverables": mandatory["deliverables"],
                "justification": f"Mandatory agent enforced by settings (feature: {mandatory['feature']})"
            })

    return selected_agents
```

**Impact**: PM agent CANNOT skip mandatory agents - they're auto-injected

---

##### **D. Modify Phase 3: Create Mandatory Tasks**

**Location**: In the csprojecttask agent.md (Phase 3 section)

**Logic**: After creating primary tasks, automatically create mandatory tasks

**Pseudo-code**:
```python
# Phase 3, Step 1: create-execution-plan
def create_execution_plan_with_mandatory(selected_agents, settings):
    """
    Create execution plan with primary tasks + mandatory tasks.
    """
    # 1. Create primary tasks (existing logic)
    primary_tasks = []
    task_counter = 1

    for agent in selected_agents:
        if agent["type"] != "mandatory":
            primary_tasks.append({
                "task_id": f"task-{task_counter:03d}",
                "agent": agent["name"],
                "dependencies": []
            })
            task_counter += 1

    # 2. Create mandatory tasks
    mandatory_agents = get_mandatory_agents(settings)
    mandatory_tasks = []

    for mandatory in mandatory_agents:
        # Determine dependencies
        deps = []

        if mandatory["trigger"] == "after_all_primary_tasks":
            # Depends on ALL primary tasks
            deps = [t["task_id"] for t in primary_tasks]

        elif mandatory["trigger"] == "after_documentation":
            # Depends on documentation task
            for task in mandatory_tasks:
                if task["feature"] == "documentation_generation":
                    deps.append(task["task_id"])

        mandatory_tasks.append({
            "task_id": f"task-{task_counter:03d}",
            "agent": mandatory["name"],
            "type": "mandatory",
            "feature": mandatory["feature"],
            "dependencies": deps,
            "deliverables": mandatory["deliverables"],
            "handover_context_spec": mandatory["handover_context"]
        })
        task_counter += 1

    # 3. Combine and return
    all_tasks = primary_tasks + mandatory_tasks
    return all_tasks
```

**Impact**: Mandatory tasks ALWAYS appear at end of execution plan

---

##### **E. Modify Phase 4: Auto-Handover Context**

**Location**: In the csprojecttask agent.md (Phase 4 section)

**Logic**: When launching mandatory agents, automatically build and pass context

**Pseudo-code**:
```python
# Phase 4, Step 4: launch-agents
def launch_agent_with_handover(task, topic_slug, settings):
    """
    Launch agent with handover context if it's a mandatory agent.
    """
    # Check if this is a mandatory task
    if task.get("type") == "mandatory":
        # Build handover context
        context_spec = task.get("handover_context_spec", {})
        handover_context = build_handover_context(topic_slug, context_spec, settings)

        # Build enhanced prompt with context
        prompt = f"""
Execute {task['feature']} task.

**Task ID**: {task['task_id']}
**Agent**: {task['agent']}
**Topic**: {topic_slug}

**Handover Context** (from previous tasks):
{json.dumps(handover_context, indent=2)}

**Your Mission**:
[Agent-specific instructions based on feature type]

**Deliverables**:
{task['deliverables']}
"""

        # Launch agent with enhanced prompt
        launch_task_tool(task['agent'], prompt)

    else:
        # Regular task, launch normally (existing logic)
        launch_task_tool(task['agent'], task['prompt'])
```

**Impact**: Mandatory agents receive full context automatically

---

#### 4. `.claude/agents/csprojecttask/agent.md`

**Action**: Document the mandatory agents behavior

**Add to Phase 2 section** (around line 90):
```markdown
### Phase 2: Agent Selection

**Auto-Injection of Mandatory Agents**:

After the PM selects agents based on requirements, the system automatically injects mandatory agents defined in `settings.json` under `features`:

- **documentation-expert**: Enforced if `features.documentation_generation.enforce = true`
- **deliverables-qa-validator**: Enforced if `features.qa_validation.enforce = true`

**These agents CANNOT be skipped** by the PM - they are automatically added to the agent list.

**Justification**: Mandatory agents are justified as "Enforced by settings (feature: {feature_name})"

**Example**:
```
Selected Agents:
1. single-page-website-builder (PM selected)
2. documentation-expert (Mandatory - enforced by settings)
3. deliverables-qa-validator (Mandatory - enforced by settings)
```
```

**Add to Phase 3 section** (around line 96):
```markdown
### Phase 3: Execution Planning

**Auto-Creation of Mandatory Tasks**:

After creating primary tasks, the system automatically creates mandatory tasks at the END of the execution plan:

1. **Documentation Task**: Created if `features.documentation_generation.enforce = true`
   - Agent: `documentation-expert`
   - Trigger: After all primary tasks complete
   - Dependencies: All primary task IDs
   - Deliverables: README.md

2. **QA Validation Task**: Created if `features.qa_validation.enforce = true`
   - Agent: `deliverables-qa-validator`
   - Trigger: After documentation task
   - Dependencies: Documentation task ID
   - Deliverables: None (validation report only)

**Example Execution Plan**:
```
Task 001: Build V1 (single-page-website-builder) - No dependencies
Task 002: Build V2 (single-page-website-builder) - Depends on Task 001
Task 003: Build V3 (single-page-website-builder) - Depends on Task 002
Task 004: Generate Documentation (documentation-expert) - Depends on Task 001-003 [MANDATORY]
Task 005: QA Validation (deliverables-qa-validator) - Depends on Task 004 [MANDATORY]
```
```

**Add to Phase 4 section** (around line 102):
```markdown
### Phase 4: Execution

**Auto-Handover Context for Mandatory Agents**:

When launching mandatory tasks, the system automatically builds and passes handover context:

**Documentation Agent Context**:
- All deliverables list (from completed tasks)
- Task summaries (agent, status, results)
- Acceptance criteria (from workflow)
- Technical constraints (from spec)
- Spec file path

**QA Validator Context**:
- Topicplan.md path
- All deliverable file paths
- Acceptance criteria (from workflow)
- Spec file path

**This context is injected into the agent prompt automatically.**
```

---

## Workflow Integration

### How Enforcement Works in Each Phase

#### Phase 1: Requirements Analysis
**No changes needed** - Works as before

---

#### Phase 2: Agent Selection

**Old Flow**:
```
1. analyze-requirements → Identifies need for "website builder"
2. scan-agent-library → Finds single-page-website-builder
3. select-agents → PM selects: [single-page-website-builder]
4. justify-selections → PM justifies selection
5. generate-agent-list → Returns 1 agent
6. wait-user-approval-phase2 → User approves
```

**New Flow (with enforcement)**:
```
1. analyze-requirements → Identifies need for "website builder"
2. scan-agent-library → Finds single-page-website-builder
3. select-agents → PM selects: [single-page-website-builder]
   ↓
   AUTO-INJECT mandatory agents from settings:
   ↓
   Final list: [
     single-page-website-builder,
     documentation-expert (MANDATORY),
     deliverables-qa-validator (MANDATORY)
   ]
4. justify-selections → PM justifies ALL selections (including mandatory)
5. generate-agent-list → Returns 3 agents (1 selected + 2 mandatory)
6. wait-user-approval-phase2 → User approves
```

---

#### Phase 3: Execution Planning

**Old Flow**:
```
1. create-execution-plan → Creates 3 tasks (V1, V2, V3)
2. generate-agent-prompts → Generates prompts for 3 tasks
3. define-dependencies → V1 → V2 → V3 (sequential)
4. create-state-structure → Creates 3 task state files
5. wait-user-approval-phase3 → User approves
```

**New Flow (with enforcement)**:
```
1. create-execution-plan → Creates 3 primary tasks (V1, V2, V3)
   ↓
   AUTO-CREATE mandatory tasks:
   ↓
   Task 004: Documentation (documentation-expert)
   Task 005: QA Validation (deliverables-qa-validator)
   ↓
   Total: 5 tasks
2. generate-agent-prompts → Generates prompts for 5 tasks (including handover context)
3. define-dependencies →
   V1 → V2 → V3 → Documentation → QA Validation
4. create-state-structure → Creates 5 task state files
5. wait-user-approval-phase3 → User approves
```

---

#### Phase 4: Execution

**Old Flow**:
```
1. prepare-task-launch → Prepares 3 task launches
2. present-execution-plan → Shows user 3 tasks
3. wait-launch-approval → User approves
4. launch-agents → Launches 3 agents sequentially (V1 → V2 → V3)
```

**New Flow (with enforcement)**:
```
1. prepare-task-launch → Prepares 5 task launches (3 primary + 2 mandatory)
2. present-execution-plan → Shows user 5 tasks
3. wait-launch-approval → User approves
4. launch-agents → Launches 5 agents sequentially:
   - Task 001: single-page-website-builder (V1)
   - Task 002: single-page-website-builder (V2)
   - Task 003: single-page-website-builder (V3)
   - Task 004: documentation-expert (with auto-handover context)
   - Task 005: deliverables-qa-validator (with auto-handover context)
```

---

## Handover Context Specification

### What Gets Passed to Each Mandatory Agent

#### 1. documentation-expert Agent

**Purpose**: Create comprehensive README.md documenting all deliverables

**Context Received**:
```json
{
  "topic_slug": "subshero-website",
  "all_deliverables_list": [
    {
      "name": "subshero-landing-v1.html",
      "path": "Project-tasks/subshero-website/deliverables/subshero-landing-v1.html",
      "size": "34KB",
      "status": "complete",
      "task_id": "task-001"
    },
    {
      "name": "subshero-landing-v2.html",
      "path": "Project-tasks/subshero-website/deliverables/subshero-landing-v2.html",
      "size": "44KB",
      "status": "complete",
      "task_id": "task-002"
    },
    {
      "name": "subshero-landing-v3-dark.html",
      "path": "Project-tasks/subshero-website/deliverables/subshero-landing-v3-dark.html",
      "size": "46KB",
      "status": "complete",
      "task_id": "task-003"
    }
  ],
  "task_summaries": [
    {
      "task_id": "task-001",
      "agent": "single-page-website-builder",
      "status": "complete",
      "result": {
        "summary": "Created V1 simple light theme landing page",
        "file_size": "34KB",
        "sections": ["Hero", "Features", "Benefits", "CTA", "Footer"]
      }
    },
    {
      "task_id": "task-002",
      "agent": "single-page-website-builder",
      "status": "complete",
      "result": {
        "summary": "Created V2 enhanced light theme with animations",
        "file_size": "44KB",
        "new_features": ["Statistics", "FAQ", "Mobile menu", "Sticky nav"]
      }
    },
    {
      "task_id": "task-003",
      "agent": "single-page-website-builder",
      "status": "complete",
      "result": {
        "summary": "Created V3 enhanced dark theme",
        "file_size": "46KB",
        "optimizations": ["AAA contrast", "Glow effects", "Soft whites"]
      }
    }
  ],
  "acceptance_criteria_complete": [
    "All V1 sections present",
    "Mobile responsive (320px+)",
    "WCAG 2.1 AA compliant",
    "File size < 200KB",
    "V2 animations smooth (60fps)",
    "V3 AAA text contrast (7:1)"
  ],
  "technical_constraints": [
    "Self-contained HTML files",
    "< 200KB per file",
    "< 2s load time",
    "WCAG 2.1 AA/AAA compliance",
    "No frameworks (vanilla JS)"
  ],
  "spec_file_path": "Project-tasks/subshero-website/spec/subshero-website-spec.md"
}
```

**What the Agent Does**:
1. Read all deliverable files
2. Analyze features and capabilities
3. Create feature comparison table (V1 vs V2 vs V3)
4. Document technical specifications
5. Write deployment guide
6. Create testing checklist
7. Add browser compatibility matrix
8. Include performance metrics
9. Write README.md at `Project-tasks/subshero-website/deliverables/README.md`

---

#### 2. deliverables-qa-validator Agent

**Purpose**: Validate all deliverables against topicplan.md and acceptance criteria

**Context Received**:
```json
{
  "topic_slug": "subshero-website",
  "topicplan_path": ".claude/agents/state/csprojecttask/topics/subshero-website/topicplan.md",
  "all_deliverables_paths": [
    "Project-tasks/subshero-website/deliverables/subshero-landing-v1.html",
    "Project-tasks/subshero-website/deliverables/subshero-landing-v2.html",
    "Project-tasks/subshero-website/deliverables/subshero-landing-v3-dark.html",
    "Project-tasks/subshero-website/deliverables/README.md"
  ],
  "acceptance_criteria_complete": [
    "All V1 sections present",
    "Mobile responsive (320px+)",
    "WCAG 2.1 AA compliant",
    "File size < 200KB per file",
    "V2 animations smooth (60fps)",
    "V2 FAQ accordion accessible",
    "V3 AAA text contrast (7:1)",
    "V3 glow effects instead of shadows",
    "README.md with feature comparison",
    "README.md with deployment guide"
  ],
  "spec_file_path": "Project-tasks/subshero-website/spec/subshero-website-spec.md"
}
```

**What the Agent Does**:
1. Read topicplan.md to get expected deliverables
2. Check all deliverable files exist
3. Validate each acceptance criterion:
   - Check file sizes (< 200KB)
   - Verify sections present (parse HTML)
   - Test responsive design (parse CSS media queries)
   - Validate accessibility (check ARIA attributes, contrast ratios)
   - Verify V2 enhancements (FAQ, animations, mobile menu)
   - Verify V3 dark theme (color palette, AAA contrast)
   - Check README.md completeness
4. Generate validation report
5. Mark as PASS/FAIL

**Validation Report Format**:
```markdown
# QA Validation Report: subshero-website

**Date**: 2025-10-25
**Topic**: subshero-website
**Status**: PASS ✅

## Deliverables Validation

### File Existence
- ✅ subshero-landing-v1.html (34KB)
- ✅ subshero-landing-v2.html (44KB)
- ✅ subshero-landing-v3-dark.html (46KB)
- ✅ README.md (14KB)

### Acceptance Criteria (41 total)

#### V1 Criteria (9/9 passed)
- ✅ All 5 sections present (Hero, Features, Benefits, CTA, Footer)
- ✅ Mobile responsive (320px minimum width detected)
- ✅ WCAG 2.1 AA compliant (contrast ratio > 4.5:1 verified)
- ✅ File size < 200KB (34KB actual)
- ✅ CTA button prominently visible
- ✅ Feature cards in responsive grid
- ✅ Email form validation present
- ✅ Clean, professional design
- ✅ No console errors

#### V2 Additional Criteria (19/19 passed)
- ✅ Smooth 60fps animations (CSS transforms detected)
- ✅ Respects prefers-reduced-motion (media query found)
- ✅ FAQ accordion fully accessible (ARIA attributes verified)
- ✅ Statistics counters animate on scroll (Intersection Observer found)
- ✅ Mobile hamburger menu functional
- ✅ Sticky navbar on scroll
- ✅ Back-to-top button present
- ✅ Lazy loading for images
- ✅ No layout shift
- ✅ File size < 200KB (44KB actual)
... (remaining criteria)

#### V3 Additional Criteria (13/13 passed)
- ✅ Text contrast ratio > 7:1 (AAA compliance verified)
- ✅ No pure white text (soft white #E6EDF3 used)
- ✅ Yellow CTA buttons vibrant on dark background
- ✅ Card shadows replaced with glows (box-shadow: 0 0 20px rgba(...) detected)
- ✅ All sections clearly separated visually
- ✅ Dark color scheme throughout (#0D1117, #E6EDF3 verified)
- ✅ Hover states clearly visible
... (remaining criteria)

#### README.md Criteria (4/4 passed)
- ✅ Feature comparison table present (V1 vs V2 vs V3)
- ✅ Browser compatibility notes present
- ✅ Deployment guide present
- ✅ Testing checklist present

## Final Verdict

**PASS** ✅

All 41 acceptance criteria met. All deliverables validated successfully.

**Recommendations**:
- Consider adding performance metrics from Lighthouse testing
- Consider adding screenshots to README.md
```

---

## Testing Strategy

### How to Test the Implementation

#### 1. **Unit Tests**

**Test `get_mandatory_agents(settings)`**:
```python
def test_get_mandatory_agents():
    settings = {
        "features": {
            "documentation_generation": {
                "enabled": True,
                "enforce": True,
                "agent": "documentation-expert",
                "trigger": "after_all_primary_tasks",
                "deliverables": ["README.md"],
                "handover_context": {"include": ["deliverables"]}
            },
            "qa_validation": {
                "enabled": True,
                "enforce": True,
                "validator_agent": "deliverables-qa-validator",
                "trigger": "after_documentation",
                "depends_on": ["documentation_generation"],
                "handover_context": {"include": ["topicplan_path"]}
            }
        }
    }

    mandatory = get_mandatory_agents(settings)

    assert len(mandatory) == 2
    assert mandatory[0]["name"] == "documentation-expert"
    assert mandatory[1]["name"] == "deliverables-qa-validator"
    assert mandatory[1]["depends_on"] == ["documentation_generation"]
```

**Test `build_handover_context()`**:
```python
def test_build_handover_context():
    context_spec = {
        "include": ["all_deliverables_list", "spec_file_path"]
    }

    context = build_handover_context("test-topic", context_spec)

    assert "topic_slug" in context
    assert "all_deliverables_list" in context
    assert "spec_file_path" in context
```

---

#### 2. **Integration Tests**

**Test E2E workflow with mandatory agents**:

```python
def test_workflow_with_mandatory_agents():
    """
    Test complete workflow enforces mandatory agents.
    """
    # 1. Create test topic with spec
    topic_slug = "test-mandatory-agents"
    spec_file = create_test_spec(topic_slug)

    # 2. Enable enforcement in settings
    settings = load_settings()
    settings["features"]["documentation_generation"]["enforce"] = True
    settings["features"]["qa_validation"]["enforce"] = True

    # 3. Initialize workflow
    initialize_topic_workflow(topic_slug, settings)

    # 4. Check that mandatory agents were injected in Phase 2
    topic = load_topic_state(topic_slug)
    agents = topic["topic"]["selected_agents"]

    agent_names = [a["name"] for a in agents]
    assert "documentation-expert" in agent_names  # ← MUST be present
    assert "deliverables-qa-validator" in agent_names  # ← MUST be present

    # 5. Check that mandatory tasks were created in Phase 3
    tasks = topic["topic"]["tasks"]

    task_agents = [t["agent"] for t in tasks]
    assert "documentation-expert" in task_agents  # ← MUST have task
    assert "deliverables-qa-validator" in task_agents  # ← MUST have task

    # 6. Check task dependencies
    doc_task = next(t for t in tasks if t["agent"] == "documentation-expert")
    qa_task = next(t for t in tasks if t["agent"] == "deliverables-qa-validator")

    # Documentation task should depend on ALL primary tasks
    primary_task_ids = [t["id"] for t in tasks if t.get("type") != "mandatory"]
    assert set(doc_task["dependencies"]) == set(primary_task_ids)

    # QA task should depend on documentation task
    assert doc_task["id"] in qa_task["dependencies"]

    print("OK All mandatory agent enforcement tests passed!")
```

---

#### 3. **Manual Testing**

**Test Case 1: SubsHero Website (Original Issue)**

1. Enable enforcement in settings:
   ```json
   "features": {
     "documentation_generation": { "enforce": true },
     "qa_validation": { "enforce": true }
   }
   ```

2. Create topic using SubsHero spec:
   ```bash
   python workflow_manager.py init subshero-website --spec Project-tasks/todo/subshero-website-spec.md
   ```

3. **Verify Phase 2**: Agent list includes:
   - single-page-website-builder (PM selected)
   - documentation-expert (MANDATORY)
   - deliverables-qa-validator (MANDATORY)

4. **Verify Phase 3**: Task list includes:
   - Task 001-003: Build HTML files
   - Task 004: Generate documentation (documentation-expert)
   - Task 005: QA validation (deliverables-qa-validator)

5. **Verify Phase 4**: Tasks execute in order:
   - Tasks 001-003 complete
   - Task 004 receives handover context (deliverables list, summaries)
   - Task 004 creates README.md
   - Task 005 receives handover context (topicplan, deliverables paths)
   - Task 005 validates and generates report

6. **Expected Result**:
   - ✅ README.md created by documentation-expert (not website-builder)
   - ✅ QA validation report generated
   - ✅ All acceptance criteria verified

---

## Example Scenarios

### Scenario 1: Before Implementation (Current Behavior)

**Spec**: SubsHero Website (3 HTML files + README)

**Phase 2: Agent Selection**
```
PM analyzes requirements:
  - Need to build 3 HTML landing pages
  - Need to create README.md

PM selects agents:
  - single-page-website-builder (for all files)

Selected agents: 1
```

**Phase 3: Execution Planning**
```
Task 001: Build V1 (single-page-website-builder)
Task 002: Build V2 (single-page-website-builder)
Task 003: Build V3 + README (single-page-website-builder)

Total tasks: 3
```

**Phase 4: Execution**
```
Task 001: single-page-website-builder creates subshero-landing-v1.html ✅
Task 002: single-page-website-builder creates subshero-landing-v2.html ✅
Task 003: single-page-website-builder creates:
  - subshero-landing-v3-dark.html ✅
  - README.md ⚠️ (created by WRONG agent!)

NO QA VALIDATION ❌
```

**Issues**:
- ❌ README.md created by website-builder (not docs-expert)
- ❌ No QA validation run
- ❌ Quality depends on PM's judgment

---

### Scenario 2: After Implementation (Enforced Behavior)

**Spec**: SubsHero Website (3 HTML files + README)

**Phase 2: Agent Selection**
```
PM analyzes requirements:
  - Need to build 3 HTML landing pages
  - Need to create README.md

PM selects agents:
  - single-page-website-builder (for HTML files)

SYSTEM AUTO-INJECTS mandatory agents:
  - documentation-expert (MANDATORY - enforced by settings)
  - deliverables-qa-validator (MANDATORY - enforced by settings)

Selected agents: 3 (1 PM selected + 2 mandatory)
```

**Phase 3: Execution Planning**
```
Primary tasks:
Task 001: Build V1 (single-page-website-builder)
Task 002: Build V2 (single-page-website-builder)
Task 003: Build V3 (single-page-website-builder)

SYSTEM AUTO-CREATES mandatory tasks:
Task 004: Generate Documentation (documentation-expert) - Depends on 001-003
Task 005: QA Validation (deliverables-qa-validator) - Depends on 004

Total tasks: 5 (3 primary + 2 mandatory)
```

**Phase 4: Execution**
```
Task 001: single-page-website-builder creates subshero-landing-v1.html ✅
Task 002: single-page-website-builder creates subshero-landing-v2.html ✅
Task 003: single-page-website-builder creates subshero-landing-v3-dark.html ✅

Task 004: documentation-expert receives handover context:
  - all_deliverables_list: [v1.html, v2.html, v3.html]
  - task_summaries: [task-001 result, task-002 result, task-003 result]
  - acceptance_criteria: [all 41 criteria]
  - technical_constraints: [self-contained, <200KB, WCAG AA/AAA]
  - spec_file_path: spec.md

Task 004: documentation-expert creates README.md ✅ (RIGHT agent!)

Task 005: deliverables-qa-validator receives handover context:
  - topicplan_path: topicplan.md
  - all_deliverables_paths: [v1.html, v2.html, v3.html, README.md]
  - acceptance_criteria: [all 41 criteria]
  - spec_file_path: spec.md

Task 005: deliverables-qa-validator validates and generates report ✅

QA VALIDATION COMPLETE ✅
```

**Improvements**:
- ✅ README.md created by documentation-expert (correct agent)
- ✅ QA validation run automatically
- ✅ Comprehensive validation report generated
- ✅ Quality guaranteed by settings (not PM discretion)

---

## Implementation Checklist

### Phase 1: Settings Configuration

- [ ] Update `.claude/agents/csprojecttask/settings.json`
  - [ ] Add `enforce: true` to `documentation_generation`
  - [ ] Add `agent: "documentation-expert"` to `documentation_generation`
  - [ ] Add `trigger: "after_all_primary_tasks"` to `documentation_generation`
  - [ ] Add `deliverables: ["README.md"]` to `documentation_generation`
  - [ ] Add `handover_context` object to `documentation_generation`
  - [ ] Change `auto_validate: true` in `qa_validation`
  - [ ] Add `enforce: true` to `qa_validation`
  - [ ] Add `trigger: "after_documentation"` to `qa_validation`
  - [ ] Add `depends_on: ["documentation_generation"]` to `qa_validation`
  - [ ] Add `handover_context` object to `qa_validation`

- [ ] Update `.claude/agents/csprojecttask/settings.schema.json`
  - [ ] Add schema for `documentation_generation.enforce` (boolean)
  - [ ] Add schema for `documentation_generation.agent` (string, enum)
  - [ ] Add schema for `documentation_generation.trigger` (string, enum)
  - [ ] Add schema for `documentation_generation.deliverables` (array of strings)
  - [ ] Add schema for `documentation_generation.handover_context` (object)
  - [ ] Add schema for `qa_validation.enforce` (boolean)
  - [ ] Add schema for `qa_validation.trigger` (string, enum)
  - [ ] Add schema for `qa_validation.depends_on` (array of strings)
  - [ ] Add schema for `qa_validation.handover_context` (object)

### Phase 2: Code Implementation

- [ ] Add `get_mandatory_agents(settings)` function to `workflow_manager.py`
  - [ ] Extract `documentation_generation` feature config
  - [ ] Extract `qa_validation` feature config
  - [ ] Check `enforce: true` flag for each
  - [ ] Return list of mandatory agent configs

- [ ] Add `build_handover_context(topic_slug, context_spec, settings)` function
  - [ ] Implement "all_deliverables_list" extraction
  - [ ] Implement "task_summaries" extraction
  - [ ] Implement "acceptance_criteria_complete" extraction
  - [ ] Implement "technical_constraints" extraction
  - [ ] Implement "spec_file_path" extraction
  - [ ] Implement "topicplan_path" extraction
  - [ ] Implement "all_deliverables_paths" extraction

- [ ] Modify Phase 2 logic in `agent.md`
  - [ ] After `select-agents` step, call `get_mandatory_agents(settings)`
  - [ ] Inject mandatory agents into selected agents list
  - [ ] Mark mandatory agents with `type: "mandatory"`
  - [ ] Add justification: "Enforced by settings (feature: {name})"

- [ ] Modify Phase 3 logic in `agent.md`
  - [ ] After creating primary tasks, call `get_mandatory_agents(settings)`
  - [ ] Create mandatory tasks at end of task list
  - [ ] Set dependencies based on `trigger` field
  - [ ] Attach `handover_context_spec` to each mandatory task

- [ ] Modify Phase 4 logic in `agent.md`
  - [ ] When launching a task, check if `type == "mandatory"`
  - [ ] If mandatory, call `build_handover_context()` to get context
  - [ ] Inject context into agent prompt
  - [ ] Launch agent with enhanced prompt

### Phase 3: Documentation

- [ ] Update `.claude/agents/csprojecttask/agent.md`
  - [ ] Add "Auto-Injection of Mandatory Agents" section to Phase 2
  - [ ] Add "Auto-Creation of Mandatory Tasks" section to Phase 3
  - [ ] Add "Auto-Handover Context" section to Phase 4
  - [ ] Add examples of execution plans with mandatory tasks

### Phase 4: Testing

- [ ] Write unit tests
  - [ ] Test `get_mandatory_agents()` with enforce=true
  - [ ] Test `get_mandatory_agents()` with enforce=false
  - [ ] Test `build_handover_context()` for documentation agent
  - [ ] Test `build_handover_context()` for QA validator agent

- [ ] Write integration tests
  - [ ] Test E2E workflow with enforcement enabled
  - [ ] Verify mandatory agents injected in Phase 2
  - [ ] Verify mandatory tasks created in Phase 3
  - [ ] Verify handover context passed in Phase 4

- [ ] Manual testing
  - [ ] Re-run SubsHero website topic with enforcement enabled
  - [ ] Verify documentation-expert creates README.md
  - [ ] Verify deliverables-qa-validator runs at end
  - [ ] Verify QA validation report generated

### Phase 5: Validation

- [ ] Schema validation
  - [ ] Validate settings.json against settings.schema.json
  - [ ] Ensure all required fields present
  - [ ] Ensure enum values match schema

- [ ] Workflow validation
  - [ ] Verify Phase 2 completes with mandatory agents
  - [ ] Verify Phase 3 completes with mandatory tasks
  - [ ] Verify Phase 4 launches mandatory agents with context

- [ ] Output validation
  - [ ] Verify README.md created by documentation-expert
  - [ ] Verify README.md has all required sections
  - [ ] Verify QA validation report generated
  - [ ] Verify QA validation report covers all criteria

---

## Success Metrics

**Implementation is successful when**:

1. ✅ Settings.json has `enforce: true` flags implemented
2. ✅ workflow_manager.py reads and enforces settings flags
3. ✅ Phase 2 auto-injects documentation-expert and deliverables-qa-validator
4. ✅ Phase 3 auto-creates mandatory tasks at end of plan
5. ✅ Phase 4 auto-passes handover context to mandatory agents
6. ✅ All topics automatically generate documentation and run QA validation
7. ✅ PM agent cannot skip mandatory agents (enforced by code)
8. ✅ Tests pass (unit + integration + E2E)

---

## Notes

- This implementation follows existing settings.json patterns (required, depends_on, validation)
- No new top-level sections added (reuses existing `features` section)
- Backward compatible: If `enforce: false`, agents are optional (old behavior)
- Forward compatible: New mandatory agents can be added via settings

---

## Next Steps

1. Review this implementation guide
2. Update settings.json and settings.schema.json
3. Implement `get_mandatory_agents()` and `build_handover_context()` functions
4. Modify Phase 2/3/4 logic in agent.md
5. Write and run tests
6. Re-run SubsHero topic to verify fix

---

**End of Implementation Guide**
