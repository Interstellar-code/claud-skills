# TodoWrite Integration Test V2

**Test Purpose**: Verify updated TodoWrite integration with explicit ACTION REQUIRED directives

---

## Overview

Create a simple text file to test TodoWrite integration without complex implementation.

**Goal**: Confirm TodoWrite tasks appear in Claude CLI at all 6 integration points.

---

## Features / Functionality

### 1. **Create hello.txt** (Priority: High)

Create a simple text file with greeting message.

**Acceptance Criteria**:
- [ ] hello.txt created in deliverables folder
- [ ] Contains "Hello from csprojecttask!" message
- [ ] File is readable

---

## Technical Constraints

- **Format**: Plain text (.txt)
- **Location**: `Project-tasks/{slug}/deliverables/hello.txt`
- **Agent**: test-agent-simple
- **Time**: < 1 minute

---

## Success Criteria

**Functional**:
- [ ] hello.txt exists and contains greeting

**TodoWrite Integration** (MAIN TEST):
- [ ] Integration Point 1: Tasks appear after topic creation
- [ ] Integration Point 2: Phase 1 complete updates
- [ ] Integration Point 3: Phase 2 complete updates
- [ ] Integration Point 4: Phase 3 complete updates
- [ ] Integration Point 5: Sub-agent task appears
- [ ] Integration Point 6: All tasks completed at finalization

---

## Deliverables

1. **hello.txt** - Simple text file with greeting message
