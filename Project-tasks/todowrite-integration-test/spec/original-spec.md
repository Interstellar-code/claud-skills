# TodoWrite Integration Test - Simple Documentation Task

**Test Purpose**: Verify TodoWrite integration shows orchestration tasks in Claude CLI

---

## Overview

Create a simple README.md file for the csprojecttask orchestration system to test the TodoWrite integration without requiring complex implementation.

**Goal**: Test all 6 TodoWrite integration points by going through Phase 1, Phase 2, Phase 3, execution, and finalization.

---

## Features / Functionality

### 1. **Create README.md** (Priority: High)

Create a simple README.md file documenting:
- What csprojecttask does (PM orchestrator)
- How to use it (basic workflow)
- Example usage (create a topic)

**Acceptance Criteria**:
- [ ] README.md created in deliverables folder
- [ ] Contains all 3 sections (What, How, Example)
- [ ] Markdown formatting is correct
- [ ] File is under 200 lines

---

## Technical Constraints

- **Format**: Markdown (.md)
- **Location**: `Project-tasks/{slug}/deliverables/README.md`
- **Agent**: test-agent-simple (documentation creation specialist)
- **Time**: Should complete in < 2 minutes

---

## Success Criteria

**Functional**:
- [ ] README.md exists in deliverables folder
- [ ] Content is clear and well-structured
- [ ] All sections are complete

**TodoWrite Integration**:
- [ ] Phase 1 task appears in Claude CLI
- [ ] Phase 2 task appears and updates to in_progress
- [ ] Phase 3 task appears and updates to in_progress
- [ ] Sub-agent task appears for test-agent-simple
- [ ] QA validation task appears
- [ ] All tasks marked completed at finalization

---

## Deliverables

1. **README.md** - Documentation file in deliverables folder

---

**Test Notes**: This is a minimal test spec designed to trigger all TodoWrite integration points without requiring complex implementation work.
