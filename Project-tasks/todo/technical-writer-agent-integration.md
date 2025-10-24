# Technical Writer Agent Integration

**Mandatory documentation agent for csprojecttask orchestration workflow**

---

## Overview

Integrate a technical-writer agent into the csprojecttask orchestration workflow to automatically generate comprehensive README.md documentation for every topic. This agent will be triggered after all task-based sub-agents complete their work but before the QA validator runs, ensuring documentation is included in the final QA validation.

**Workflow Position**:
```
Topic Tasks → Technical Writer → QA Validator → Topic Completion
```

---

## Goals & Objectives

1. **Automatic Documentation**: Generate README.md for every topic without manual intervention
2. **Consistent Quality**: Ensure all topics have professional, comprehensive documentation
3. **Integration**: Seamlessly integrate into existing csprojecttask workflow
4. **Validation**: Documentation should be QA-validated before topic completion
5. **Deliverable**: README.md placed in deliverables folder alongside other outputs

---

## Features / Functionality

### 1. **Technical Writer Agent** (Priority: High)

Create a new agent: `.claude/agents/technical-writer/agent.md`

**Model Configuration**:
- **Model**: `claude-haiku-4-20250514` (Haiku 4)
- **Rationale**:
  - README generation is a straightforward documentation task
  - Doesn't require complex reasoning or planning
  - Haiku is 3-5x faster than Sonnet
  - Haiku is significantly more cost-effective
  - Perfect for template-based content generation
  - Reduces token usage for orchestration workflow
- **Configuration**: `model: claude-haiku-4-20250514` in agent.md frontmatter

**Capabilities**:
- Analyze topic plan and specification
- Review all task deliverables
- Scan source code/files created by sub-agents
- Generate comprehensive README.md with:
  - Project title and description
  - Features implemented
  - Installation/setup instructions (if applicable)
  - Usage examples
  - File structure overview
  - Technical details (technologies, constraints)
  - Testing instructions (if tests exist)
  - Acceptance criteria checklist
  - Credits/attribution

**Acceptance Criteria**:
- [ ] Agent reads topicplan.md
- [ ] Agent reads original-spec.md
- [ ] Agent scans deliverables directory
- [ ] Agent generates clear, well-structured README.md
- [ ] README.md uses proper markdown formatting
- [ ] README.md includes all required sections
- [ ] README.md is written for target audience (technical/non-technical)

### 2. **Workflow Integration** (Priority: High)

Modify csprojecttask agent to trigger technical-writer automatically.

**Integration Points**:

**Step 1: Detect Task Completion**
```bash
# After all sub-agent tasks marked as completed
ALL_TASKS_COMPLETE=$(python .claude/skills/csprojtasks/scripts/state_manager.py \
  check_all_tasks_complete "{topic-slug}")

if [ "$ALL_TASKS_COMPLETE" == "true" ]; then
    # Trigger technical-writer
fi
```

**Step 2: Invoke Technical Writer**
```bash
# Launch technical-writer agent with Task tool
Task(
  subagent_type="technical-writer",
  description="Generate README documentation",
  prompt="Topic: {topic-slug}

  Generate comprehensive README.md documentation for this topic.

  Context files:
  - Topic plan: Project-tasks/{topic-slug}/topicplan.md
  - Specification: Project-tasks/{topic-slug}/spec/original-spec.md
  - Deliverables: Project-tasks/{topic-slug}/deliverables/

  Output location:
  - Project-tasks/{topic-slug}/deliverables/README.md

  Requirements:
  1. Analyze all deliverables
  2. Extract key features from spec
  3. Document setup/usage instructions
  4. Include acceptance criteria checklist
  5. Write for {target-audience}
  "
)
```

**Step 3: Wait for Completion**
```bash
# Monitor technical-writer task state
WRITER_STATE=".claude/agents/state/csprojecttask/topics/{slug}/task-readme-writer.json"

# Wait for status = "completed"
while [ "$(python .claude/skills/csprojtasks/scripts/state_manager.py read_state $WRITER_STATE 'status')" != "completed" ]; do
    sleep 5
done
```

**Step 4: Verify README Created**
```bash
README_PATH="Project-tasks/{slug}/deliverables/README.md"

if [ -f "$README_PATH" ]; then
    echo "✅ README.md created successfully"
    # Proceed to QA validation
else
    echo "❌ README.md not created - blocking topic completion"
    exit 1
fi
```

**Step 5: Trigger QA Validator**
```bash
# Only after README.md exists
Task(
  subagent_type="deliverables-qa-validator",
  description="Validate all deliverables including README",
  prompt="..."
)
```

**Acceptance Criteria**:
- [ ] Technical-writer invoked automatically after all tasks complete
- [ ] Writer has access to topic context (plan, spec, deliverables)
- [ ] Writer completion blocks QA validator until README exists
- [ ] Workflow fails gracefully if README generation fails
- [ ] User can see technical-writer progress in state files

### 3. **Task State Management** (Priority: High)

Create task state file for technical-writer.

**Task ID**: `task-{next-id}-readme-writer`

**State File Location**: `.claude/agents/state/csprojecttask/topics/{slug}/task-readme-writer.json`

**State Template**:
```json
{
  "taskId": "task-{id}-readme-writer",
  "focusArea": "README.md Documentation",
  "agentName": "technical-writer",
  "status": "pending",
  "assignedAt": "{timestamp}",
  "startedAt": null,
  "completedAt": null,
  "progress": 0,
  "currentOperation": "Analyzing topic context",
  "logs": [],
  "filesCreated": ["Project-tasks/{slug}/deliverables/README.md"],
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

**Acceptance Criteria**:
- [ ] Task state created before invoking technical-writer
- [ ] State updates track README generation progress
- [ ] State logs all operations (file reads, analysis, writing)
- [ ] State marks filesCreated with README.md path
- [ ] State tracks token usage

### 4. **README.md Template** (Priority: Medium)

Define standard README structure for technical-writer to follow.

**Template Location**: `.claude/agents/technical-writer/readme-template.md`

**Sections**:
```markdown
# {Project Title}

{Brief description from spec}

## Overview

{Expanded description from topic plan}

## Features

{List of implemented features from spec}

- Feature 1
- Feature 2
- Feature 3

## Installation / Setup

{If applicable - extracted from deliverables/code}

## Usage

{Usage examples - generated from code analysis}

## File Structure

{Directory tree of deliverables}

## Technical Details

- **Technologies**: {from spec constraints}
- **Requirements**: {from spec}
- **Architecture**: {from analysis}

## Testing

{If tests exist in deliverables}

## Acceptance Criteria

{Checklist from spec - mark completed items}

- [x] Completed item
- [ ] Pending item

## Credits

Generated by csprojecttask orchestration system
```

**Acceptance Criteria**:
- [ ] Template includes all standard sections
- [ ] Template supports conditional sections (installation, testing)
- [ ] Template uses markdown best practices
- [ ] Template is customizable per topic type

### 5. **Error Handling** (Priority: Medium)

Handle failures gracefully.

**Scenarios**:

**Scenario 1: Technical-writer fails**
```bash
if [ "$WRITER_STATUS" == "error" ]; then
    echo "❌ README generation failed"

    # Extract error from state
    ERROR=$(python .claude/skills/csprojtasks/scripts/state_manager.py \
      read_state $WRITER_STATE 'error')

    # Present to user
    echo "Error: $ERROR"
    echo ""
    echo "Options:"
    echo "1. Retry README generation"
    echo "2. Skip README (not recommended)"
    echo "3. Manually create README"

    # Use AskUserQuestion for choice
fi
```

**Scenario 2: README incomplete**
```bash
# QA validator checks README quality
if grep -q "TODO\|PLACEHOLDER\|\[TBD\]" "$README_PATH"; then
    echo "⚠️ README contains placeholders"
    # Add to QA report as warning
fi
```

**Acceptance Criteria**:
- [ ] Errors logged to task state file
- [ ] User notified of failures with actionable options
- [ ] Failed README generation doesn't block entire topic
- [ ] User can retry or skip README generation
- [ ] QA report includes README quality checks

---

## Technical Constraints

### Agent Requirements
- Must use existing csprojecttask infrastructure (skill scripts)
- Must integrate with V2.0 topics.json structure
- Must respect file permissions and paths
- Must use state_manager.py for all state operations
- **Model**: Must use Haiku 4 (`claude-haiku-4-20250514`) for cost and performance
  - README generation doesn't require Sonnet's reasoning capabilities
  - Haiku provides 3-5x faster execution
  - Significant cost reduction for orchestration workflow

### File Locations
- **Agent definition**: `.claude/agents/technical-writer/agent.md`
- **README template**: `.claude/agents/technical-writer/readme-template.md`
- **Output location**: `Project-tasks/{topic-slug}/deliverables/README.md`
- **Task state**: `.claude/agents/state/csprojecttask/topics/{slug}/task-readme-writer.json`

### Integration Points
- **Trigger**: After all sub-agent tasks complete (status = "completed")
- **Before**: QA validator invocation
- **Blocks**: Topic finalization until README exists

### Performance
- README generation should complete in < 1 minute (with Haiku 4)
- Should not exceed 3000 tokens for typical projects (Haiku efficiency)
- Must handle topics with 0-100 deliverable files
- Target: 30-60 seconds for most projects (faster than Sonnet)

---

## Success Criteria

**Functional**:
- [ ] Technical-writer agent created and functional
- [ ] Agent generates README.md for test topics
- [ ] README includes all required sections
- [ ] README is well-formatted markdown

**Integration**:
- [ ] csprojecttask automatically invokes technical-writer
- [ ] Workflow: Tasks → Writer → QA → Completion
- [ ] Task state created and tracked correctly
- [ ] README included in QA validation

**Quality**:
- [ ] README is comprehensive and clear
- [ ] README matches project complexity
- [ ] README is useful to end users
- [ ] README passes markdown linting

**Error Handling**:
- [ ] Failures don't crash orchestrator
- [ ] User notified of errors with options
- [ ] Retry mechanism works correctly
- [ ] Skip option available (with warning)

---

## Deliverables

### 1. Technical Writer Agent
**File**: `.claude/agents/technical-writer/agent.md`
- Agent definition with Haiku 4 model configuration
- Frontmatter: `model: claude-haiku-4-20250514`
- Tools: Read, Write, Glob, Grep, Bash
- Full workflow documentation
- README generation logic
- Template integration

### 2. README Template
**File**: `.claude/agents/technical-writer/readme-template.md`
- Standard README structure
- Placeholder syntax documentation
- Section guidelines

### 3. Modified csprojecttask Agent
**File**: `.claude/agents/csprojecttask/agent.md`
- Integration code for technical-writer invocation
- Task state creation logic
- Error handling for README failures
- Updated workflow diagram

### 4. Test Topic with README
**Location**: `Project-tasks/test-technical-writer/`
- Complete test topic with deliverables
- Generated README.md in deliverables/
- Demonstrates README quality

### 5. Documentation Updates
- **skill.md**: Document technical-writer integration
- **ARCHITECTURE-FLOW.md**: Update workflow diagram
- **README.md**: Document new mandatory README feature

---

## Timeline

**Phase 1: Agent Creation** (Day 1)
- Create technical-writer agent definition
- Create README template
- Test agent standalone (manual invocation)

**Phase 2: Integration** (Day 2)
- Modify csprojecttask to invoke technical-writer
- Create task state management
- Add error handling

**Phase 3: Testing** (Day 3)
- Test with simple topic
- Test with complex topic (multiple deliverables)
- Test failure scenarios

**Phase 4: Documentation** (Day 4)
- Update all documentation files
- Create usage examples
- Final QA

---

## References & Context

### Similar Patterns
- **QA Validator**: `.claude/agents/deliverables-qa-validator/agent.md`
  - Similar automatic invocation pattern
  - Similar state management
  - Example of post-task agent

### Existing Infrastructure
- **State Manager**: `.claude/skills/csprojtasks/scripts/state_manager.py`
  - Used for creating task states
  - Used for tracking progress

- **Topic Manager**: `.claude/skills/csprojtasks/scripts/topic_manager.py`
  - Used for updating topic metadata

### Documentation Standards
- Markdown best practices
- README.md conventions (GitHub/GitLab)
- Technical writing guidelines

---

## Open Questions

### 1. README Customization
**Question**: Should users be able to customize README template per topic?

**Options**:
- A) Use global template for all topics
- B) Allow per-topic template override
- C) Support multiple templates (web, API, research, etc.)

**Recommendation**: Start with A, add B later if needed

### 2. Content Depth
**Question**: How detailed should README be?

**Options**:
- A) High-level overview only (simple)
- B) Detailed with code examples (comprehensive)
- C) Adaptive based on deliverables complexity

**Recommendation**: C - adapt to complexity

### 3. Failure Handling
**Question**: Should README generation be truly mandatory or soft requirement?

**Options**:
- A) Hard requirement - topic cannot complete without README
- B) Soft requirement - warning but allows completion
- C) User choice - ask user if README generation fails

**Recommendation**: C - give user control

### 4. Agent Reusability
**Question**: Should technical-writer be usable outside csprojecttask workflow?

**Options**:
- A) Tightly coupled to csprojecttask only
- B) Generic - can be invoked standalone
- C) Both - integrated but also standalone capable

**Recommendation**: C - maximum flexibility

---

## Implementation Notes

### Key Design Decisions

**1. Placement After Tasks**
- Ensures all deliverables exist before documentation
- Technical-writer can analyze complete output
- No documentation of incomplete work

**2. Placement Before QA**
- README becomes part of deliverables being validated
- QA can check README quality
- Ensures documentation is validated

**3. Mandatory Status**
- Every topic should have README
- Documentation is a first-class deliverable
- Improves project handoff and usability

**4. Deliverables Location**
- README in deliverables/ folder (not root)
- Keeps all outputs together
- Included in deliverable scans/zips

### Integration Pseudocode

```python
# In csprojecttask agent after all tasks complete:

def finalize_topic(topic_slug):
    # 1. Check all tasks complete
    if not all_tasks_completed(topic_slug):
        return False

    # 2. Invoke technical-writer
    writer_task = invoke_agent(
        agent="technical-writer",
        topic=topic_slug,
        state_file=f"task-{next_id}-readme-writer.json"
    )

    # 3. Wait for completion
    wait_for_task_completion(writer_task)

    # 4. Verify README exists
    readme_path = f"Project-tasks/{topic_slug}/deliverables/README.md"
    if not file_exists(readme_path):
        handle_readme_failure(topic_slug)
        return False

    # 5. Invoke QA validator (includes README)
    qa_task = invoke_agent(
        agent="deliverables-qa-validator",
        topic=topic_slug,
        state_file=f"task-{next_id}-qa-validator.json"
    )

    # 6. Wait for QA completion
    wait_for_task_completion(qa_task)

    # 7. If QA passes, finalize topic
    if qa_passed(qa_task):
        finalize_topic_completion(topic_slug)
        return True
    else:
        handle_qa_failure(topic_slug)
        return False
```

---

**Spec Version**: 1.0.0
**Created**: 2025-10-24
**Status**: Ready for implementation
**Priority**: High
