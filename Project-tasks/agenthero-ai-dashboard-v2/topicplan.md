# Topic Plan: csprojecttask Browser Dashboard

**Created**: 2025-10-23 20:45
**Topic ID**: `csprojecttask-dashboard-v2`
**Status**: Planning
**PM Orchestrator Version**: 1.0.0
**State Files Location**: `.claude/agents/state/csprojecttask/topics/csprojecttask-dashboard-v2/`

---

## 📋 Overview

**Description**:
Browser-based monitoring system for csprojecttask topics, tasks, and project state. Provides real-time visual updates, progress charts, and intuitive navigation without requiring command-line scripts. Reads from V2.0 topics.json structure.

**Goal/Objective**:
Create a modern, browser-based dashboard that reads JSON state files directly, provides visual progress updates, shows charts and statistics, and works offline (no backend required). Replace the text-based command-line menu system with an intuitive web interface.

**Success Criteria**:
- [ ] Dashboard displays all topics in card/grid layout with status, progress, and task completion
- [ ] Clicking a topic card opens detailed view with task list and file locations
- [ ] Manual refresh button updates data from topics.json (V2.0)
- [ ] Responsive design works on desktop and tablet (no mobile required for MVP)
- [ ] Status color-coding matches specification (Green/Yellow/Blue/Red)
- [ ] Progress bars show accurate percentages
- [ ] Pure vanilla JavaScript (no frameworks) - works via HTTP server or file:// protocol

---

## 📄 Requirements

### Features/Functionality

1. **Multi-Topic Dashboard View**
   - Details: Display all topics in responsive card/grid layout (3 columns desktop, 2 tablet)
   - Priority: High
   - Acceptance Criteria:
     - Shows title, status, current phase, progress percentage, task completion ratio for each topic
     - Color-coded status indicators (Green=completed, Yellow=in_progress, Blue=pending, Red=blocked)
     - Clickable topic cards navigate to detail view

2. **Topic Details View**
   - Details: Complete topic information with task list, file locations, and metadata
   - Priority: High
   - Acceptance Criteria:
     - Shows topic title, slug, description, status, current phase, progress bar
     - Lists all tasks with task ID, status icons, progress percentage, current operation
     - Displays file locations (topicplan.md, spec/, deliverables/) with working paths
     - Shows timestamps (created, last updated)
     - "Back to Dashboard" button returns to main view

3. **Manual Refresh**
   - Details: Manual refresh button to reload data from topics.json (NO auto-refresh/polling)
   - Priority: Low
   - Acceptance Criteria:
     - Refresh button triggers page reload and data fetch
     - Shows "Last updated: [timestamp]" with current time
     - Simple implementation (page reload acceptable for MVP)

4. **Statistics & Analytics**
   - Details: Overall project statistics with visual charts
   - Priority: Medium
   - Acceptance Criteria:
     - Shows total topics, topics by status breakdown, total tasks, task completion rate
     - Pie chart: Topics by status distribution
     - Bar chart: Tasks per topic comparison
     - Progress timeline (optional for MVP)

5. **Search & Filter**
   - Details: Search topics by title/slug, filter by status and phase
   - Priority: Low
   - Acceptance Criteria:
     - Search box filters topics in real-time
     - Status filter buttons (All, Completed, In Progress, Pending, Blocked)
     - Phase filter dropdown

6. **Actions (Future Enhancement)**
   - Details: View topicplan.md (markdown rendering), view deliverables (file list), delete topic, archive completed topics
   - Priority: Low
   - Acceptance Criteria:
     - Read-only operations for MVP
     - Delete/archive require confirmation dialogs
     - Markdown rendering uses library or plain text display

### Technical Constraints

- Must use pure HTML5, CSS3, vanilla JavaScript (ES6+) - NO frameworks (React, Vue, etc.)
- No backend required - static files only, reads JSON via fetch on page load
- No auto-refresh or polling API - manual refresh button only
- Responsive design required for desktop (1920x1080, 1366x768) and tablet (768x1024)
- Must read from `.claude/agents/state/csprojecttask/topics.json` (V2.0 single source of truth)
- Browser compatibility: Modern browsers (Chrome, Firefox, Edge, Safari)
- Must work with file:// protocol OR simple HTTP server (recommended: `python -m http.server 8080`)

### Assumptions Made

- **HTTP server usage** - Reason: Spec recommends HTTP server to avoid CORS issues when reading JSON across directories (file:// protocol may have limitations)
- **Focus on MVP features first** - Reason: Statistics/charts (Medium priority), search/filter (Low priority), and actions (Future enhancement) can be implemented in phase 2 if time permits. MVP focuses on dashboard view + detail view + manual refresh.
- **Test data from existing topics** - Reason: Spec states "Use existing topics in topics.json for testing" - no mock data generation needed
- **Color scheme from spec** - Reason: Spec provides exact hex codes (Green=#4CAF50, Yellow=#FFA726, Blue=#2196F3, Red=#F44336)
- **V2.0 topics.json structure** - Reason: Spec explicitly mentions V2.0 structure with single topics.json file containing all topic metadata and task summaries

### Reference Documents

- **User Request**: "Create a topic using the specification file: C:\laragon\www\claud-skills\test-spec-dashboard.md"
- **Spec File**: `./spec/original-spec.md`
- **Additional Context**:
  - V2.0 State Structure: `.claude/agents/state/csprojecttask/topics.json` (single source of truth)
  - Existing completed topics in topics.json can be used as test data
  - Dashboard files go in `Project-tasks/csprojecttask-dashboard-v2/deliverables/`

---

## 🤖 Agent Selection

### Agents to REUSE (from library)

✅ **single-page-website-builder**
   - Specialization: Modern single-page website development with vanilla HTML/CSS/JS
   - Previously Used In: browser-based-topic-monitor-dashboard, csprojecttask-browser-dashboard
   - Will Handle: Task 001 (Dashboard Implementation)
   - Tools: Read, Write, Edit, Bash, Glob, Grep
   - Reason: Proven track record building browser-based dashboards, perfect match for vanilla JS requirements

### Agents to REUSE (QA Validation)

✅ **deliverables-qa-validator**
   - Specialization: Quality assurance validation of deliverables against spec and topic plan
   - Previously Used In: Multiple topics (standard QA agent)
   - Will Handle: Task 002 (QA Validation - FINAL)
   - Tools: Read, Bash
   - Reason: Mandatory QA validation before topic completion

### Agents CREATED NEW

None - All required agents already exist in library

**Summary**:
- Total Agents: 2
- Reused: 2 (100% reuse rate - excellent!)
- New: 0

**Benefits of Reuse**:
- ✅ Proven agents with successful dashboard implementations
- ✅ No setup time needed
- ✅ Consistent quality
- ✅ Faster execution

---

## 🎯 Execution Plan

**Note**: This section is populated after Phase 3 approval.

---

## 📊 Progress Tracking

**Note**: This table is updated in real-time as tasks progress.

| Task ID | Description | Agent | Status | Progress | Started | Completed |
|---------|-------------|-------|--------|----------|---------|-----------|
| (Awaiting Phase 3 task breakdown) | - | - | - | - | - | - |

**Overall Progress**: 0/0 tasks completed (0%)

**Status Legend**:
- `Pending`: Not started yet
- `In Progress`: Currently being worked on
- `Blocked`: Waiting for input/dependency
- `Failed`: Encountered error
- `Completed`: Successfully finished

---

## ✅ Verification & Outcomes

**Note**: This section is populated after Phase 3 completion.

---

## 📝 Additional Notes

This topic creates a dashboard for monitoring ALL csprojecttask topics. It follows the V2.0 migration structure where topics.json is the single source of truth containing all topic metadata.

**Related Topics**:
- Previous dashboard implementations: `browser-based-topic-monitor-dashboard`, `csprojecttask-browser-dashboard` (both completed)
- This is version 2 (v2) to align with V2.0 state structure migration

**Deliverables Location**: `Project-tasks/csprojecttask-dashboard-v2/deliverables/`

---

**Last Updated**: 2025-10-23 20:45
**Updated By**: PM Orchestrator (csprojecttask)
