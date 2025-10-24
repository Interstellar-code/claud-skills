# Topic Plan: {Topic Title}

**Created**: {YYYY-MM-DD HH:MM}
**Topic ID**: `{topic-slug}`
**Status**: Planning
**PM Orchestrator Version**: 1.0.0
**State Files Location**: `.claude/agents/state/csprojecttask/topics/{topic-slug}/`

---

## 📋 Overview

**Description**:
{User's description or summary extracted from spec}

**Goal/Objective**:
{What this topic aims to achieve - extracted from requirements}

**Success Criteria**:
- [ ] {Criterion 1 - what defines successful completion}
- [ ] {Criterion 2}
- [ ] {Criterion 3}

---

## 📄 Requirements

### Features/Functionality

1. **{Feature 1 Name}**
   - Details: {What this feature does}
   - Priority: High / Medium / Low
   - Acceptance Criteria:
     - {Specific measurable criterion}
     - {Another criterion}

2. **{Feature 2 Name}**
   - Details: {What this feature does}
   - Priority: High / Medium / Low
   - Acceptance Criteria:
     - {Criterion}

### Technical Constraints (if any)

- {Constraint 1 - e.g., "Must use Laravel 10+"}
- {Constraint 2 - e.g., "MySQL database only"}

### Assumptions Made

- **{Assumption 1}** - Reason: {Why this assumption was necessary}
- **{Assumption 2}** - Reason: {Why this assumption was necessary}

### Reference Documents

- **User Request**: "{Original user request/description}"
- **Spec File**: `./spec/original-spec.md` (if applicable, otherwise "N/A - User provided description only")
- **Additional Context**: {Any URLs, documents, or references mentioned}

---

## 🤖 Agent Selection

**Note**: This section is populated after Phase 2 approval.

### Agents to REUSE (from library)

- ✅ **{agent-name}**
  - **Specialization**: {What this agent does}
  - **Previously Used In**: {topic-slug-1}, {topic-slug-2}
  - **Assigned To**: Task {task-id}
  - **Reason for Reuse**: {Why this existing agent fits}

### Agents CREATED NEW (for this topic)

- 🆕 **{agent-name}**
  - **Specialization**: {What this agent does}
  - **Created**: {YYYY-MM-DD}
  - **Assigned To**: Task {task-id}
  - **Tools**: {Comma-separated tool list}
  - **Reason for Creation**: {Why no existing agent matched}

**Total Agents**: {count} ({X} reused, {Y} new)

---

## 🎯 Execution Plan

**Note**: This section is populated after Phase 3 approval.

### Execution Strategy

- **Total Tasks**: {count}
- **Execution Mode**: Parallel / Sequential / Mixed
- **Estimated Duration**: {estimate if available, otherwise "TBD"}
- **Critical Path**: {task-ids on critical path, if sequential}

### Task Breakdown

#### Task 001: {Task Description}

- **Agent**: `{agent-name}`
- **Dependencies**: None / Task {IDs}
- **Priority**: High / Medium / Low
- **Focus Area**: {Specific focus for this task}
- **Deliverables**:
  - `{file-path-1}` - {description}
  - `{file-path-2}` - {description}
- **Acceptance Criteria**:
  - [ ] {Specific measurable outcome}
  - [ ] {Another outcome}

#### Task 002: {Task Description}

- **Agent**: `{agent-name}`
- **Dependencies**: Task 001 (must complete first) / None (parallel)
- **Priority**: High / Medium / Low
- **Focus Area**: {Specific focus}
- **Deliverables**:
  - `{file-path}` - {description}
- **Acceptance Criteria**:
  - [ ] {Outcome}

{... repeat for all tasks}

---

## 📊 Progress Tracking

**Note**: This table is updated in real-time as tasks progress.

| Task ID | Description | Agent | Status | Progress | Started | Completed |
|---------|-------------|-------|--------|----------|---------|-----------|
| task-001 | {short description} | {agent-name} | Pending | 0% | - | - |
| task-002 | {short description} | {agent-name} | Pending | 0% | - | - |
| task-003 | {short description} | {agent-name} | Pending | 0% | - | - |

**Overall Progress**: 0/{total} tasks completed (0%)

**Status Legend**:
- `Pending`: Not started yet
- `In Progress`: Currently being worked on
- `Blocked`: Waiting for input/dependency
- `Completed`: Successfully finished
- `Failed`: Encountered error

---

## ✅ Verification & Outcomes

**Note**: This section is populated after Phase 3 completion.

### Planned vs. Actual Comparison

**Verify all success criteria met**:
- [ ] All features from requirements implemented
- [ ] All tasks completed successfully
- [ ] All deliverables created
- [ ] Success criteria met (see Overview section)
- [ ] No critical issues outstanding

### Actual Outcomes

**Completed**: {YYYY-MM-DD HH:MM} (or "In Progress")

#### Deliverables Created

- `{file-path-1}` - {Description of what this file contains}
- `{file-path-2}` - {Description}
- `{file-path-3}` - {Description}

**Total Files**: {count} created, {count} modified

#### Features Implemented

- ✅ **{Feature 1}** - {Brief note on implementation}
- ✅ **{Feature 2}** - {Brief note}
- ⚠️ **{Feature 3}** - {Partially implemented - explanation}

#### Deviations from Plan

- **{Deviation 1}** - Reason: {Why deviated from original plan}
- **{Deviation 2}** - Reason: {Why}

**Note**: "None" if no deviations occurred.

#### Issues Encountered

- **{Issue 1}** - Resolution: {How it was resolved}
- **{Issue 2}** - Resolution: {How it was resolved}

**Note**: "None" if no issues encountered.

#### Lessons Learned

- {Lesson 1 - What was learned that could help future topics}
- {Lesson 2}
- {Lesson 3}

---

## 📝 Additional Notes

{Any additional context, important decisions, or information that doesn't fit above sections}

{Link to related topics if applicable}

{Contact info or references for future maintenance}

---

**Last Updated**: {YYYY-MM-DD HH:MM}
**Updated By**: PM Orchestrator (csprojecttask)
