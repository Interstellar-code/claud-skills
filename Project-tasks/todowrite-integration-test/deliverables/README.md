# csprojecttask Orchestration System

> A PM orchestrator agent that coordinates multiple specialist sub-agents to execute complex, multi-step projects through a structured 3-phase workflow.

## What It Does

The **csprojecttask agent** is a Project Manager orchestrator designed to handle complex projects that require multiple steps and different specialist agents. Instead of doing the work itself, it acts as a coordinator that:

### Key Capabilities

- **Orchestrates Multiple Agents**: Selects and coordinates specialist sub-agents (like `single-page-website-builder`, `technical-writer-agent`, `documentation-expert`, etc.) based on project requirements
- **3-Phase Workflow**: Breaks down project execution into three distinct phases with user approval checkpoints:
  1. **Requirements Analysis** - Understands what needs to be built
  2. **Agent Selection** - Chooses the right specialist agents for the job
  3. **Execution Planning** - Creates detailed execution prompts for sub-agents
- **Multi-Topic Management**: Can manage multiple concurrent projects (topics) with separate state tracking for each
- **State-Based Progress Tracking**: Uses JSON state files to track topic status, task progress, and execution state
- **Structured Deliverables**: Creates organized directory structures with clear separation between specs, plans, and deliverables

### How It Works

1. User provides a **specification file** (spec.md) describing what they want to build
2. csprojecttask analyzes the spec and breaks it into actionable tasks
3. It selects appropriate specialist sub-agents for each task
4. User approves the plan at each checkpoint
5. Sub-agents execute tasks and create deliverables
6. Final deliverables are organized in `Project-tasks/{topic-slug}/deliverables/`

### Architecture

```
User Request → csprojecttask Agent (PM Orchestrator)
                      ↓
              [Phase 1: Requirements]
                      ↓
              [Phase 2: Agent Selection]
                      ↓
              [Phase 3: Execution Planning]
                      ↓
              Sub-Agents Execute Tasks
                      ↓
              Deliverables Created
```

## How to Use

### Prerequisites

- Claude Code with csprojecttask agent installed (`.claude/agents/csprojecttask/`)
- State management scripts (`scripts/state_manager.py`, `scripts/topic_manager.py`)
- A specification file describing your project

### Step 1: Create a Specification File

Create a markdown file with your project requirements:

```markdown
# Project: My Dashboard

## Overview
Build a browser-based dashboard that displays real-time data.

## Requirements
- HTML/CSS/JavaScript single-page application
- Display data cards with status indicators
- Auto-refresh every 30 seconds
- Responsive design

## Deliverables
1. index.html - Main dashboard page
2. styles.css - Styling
3. app.js - JavaScript logic
```

Save as `my-dashboard-spec.md` in your project root.

### Step 2: Invoke csprojecttask Agent

Ask Claude to create a topic using your spec:

```
User: "Create a topic using my-dashboard-spec.md"
```

Claude will invoke the csprojecttask agent with your spec file.

### Step 3: Approve Phase 1 (Requirements Analysis)

The agent analyzes your spec and presents a summary:

```
Phase 1 Complete - Requirements Analysis:

Project: My Dashboard
Type: Browser-based single-page application
Deliverables: 3 files (HTML, CSS, JS)
Complexity: Medium
Estimated Time: 30-45 minutes

Requirements Summary:
- Single-page dashboard with data cards
- Auto-refresh functionality
- Responsive design
- No backend required (frontend-only)

Does this look correct? Should we proceed to Phase 2?
```

**Action**: Review and respond "yes" to continue.

### Step 4: Approve Phase 2 (Agent Selection)

The agent selects specialist sub-agents:

```
Phase 2 Complete - Agent Selection:

Selected Agents:
1. single-page-website-builder
   - Reason: Specializes in HTML/CSS/JS single-page applications
   - Task: Create dashboard structure, styling, and logic
   - Deliverables: index.html, styles.css, app.js

Does this agent selection look appropriate? Proceed to Phase 3?
```

**Action**: Review and respond "yes" to continue.

### Step 5: Approve Phase 3 (Execution Planning)

The agent creates detailed execution prompts:

```
Phase 3 Complete - Execution Planning:

Task 1: Create Dashboard Files
Agent: single-page-website-builder
Prompt: "Create a browser-based dashboard with the following requirements:
- Display data cards with status indicators
- Auto-refresh every 30 seconds
- Responsive design using flexbox/grid
- Modern, clean UI

Deliverables:
- index.html (main structure)
- styles.css (styling)
- app.js (logic + auto-refresh)

Output location: Project-tasks/my-dashboard/deliverables/"

Ready to execute? Type 'yes' to launch sub-agents.
```

**Action**: Review and respond "yes" to execute.

### Step 6: Execution and Deliverables

The agent launches sub-agents and monitors progress:

```
Executing tasks...

Task 1: [In Progress] Creating dashboard files...
Task 1: [Complete] ✓ Files created

Deliverables created:
- Project-tasks/my-dashboard/deliverables/index.html
- Project-tasks/my-dashboard/deliverables/styles.css
- Project-tasks/my-dashboard/deliverables/app.js

Topic complete! All deliverables are ready.
```

### Directory Structure Created

```
Project-tasks/
└── my-dashboard/
    ├── spec/
    │   └── my-dashboard-spec.md (original spec)
    ├── topicplan.md (execution plan)
    └── deliverables/
        ├── index.html
        ├── styles.css
        └── app.js
```

### State Files Location

```
.claude/agents/state/csprojecttask/topics/my-dashboard/
├── topic.json (topic metadata and status)
├── task-001.json (task 1 state)
└── pm-state.json (PM orchestrator state)
```

## Example Usage

### Real-World Example: Competitor Research Topic

**Scenario**: You need to create a competitor analysis document with research on 3 competitors.

#### 1. Create Spec File

`competitor-research-spec.md`:
```markdown
# Competitor Research Analysis

## Overview
Research 3 main competitors in the productivity software space.

## Requirements
- Analyze features, pricing, and target audience
- Identify strengths and weaknesses
- Provide strategic recommendations

## Deliverables
1. competitor-analysis.md - Main research document
2. feature-comparison-table.md - Feature matrix
3. recommendations.md - Strategic insights

## Competitors
- Notion
- Asana
- Monday.com
```

#### 2. Invoke Agent

```
User: "Create a topic using competitor-research-spec.md"
```

#### 3. Phase 1 - Requirements

```
Phase 1 Complete - Requirements Analysis:

Project: Competitor Research Analysis
Type: Research and documentation
Deliverables: 3 markdown files
Complexity: Medium
Estimated Time: 45-60 minutes

Requirements Summary:
- Research 3 competitors (Notion, Asana, Monday.com)
- Analyze features, pricing, target audience
- Create feature comparison matrix
- Provide strategic recommendations

Recommended Agents:
- documentation-expert (research and writing)
- technical-writer-agent (structured documentation)

Does this look correct? Proceed to Phase 2?
```

User: "yes"

#### 4. Phase 2 - Agent Selection

```
Phase 2 Complete - Agent Selection:

Selected Agents:
1. documentation-expert
   - Task: Research competitors and create analysis
   - Deliverables: competitor-analysis.md, recommendations.md

2. technical-writer-agent
   - Task: Create feature comparison table
   - Deliverables: feature-comparison-table.md

Does this selection look good? Proceed to Phase 3?
```

User: "yes"

#### 5. Phase 3 - Execution Planning

```
Phase 3 Complete - Execution Planning:

Task 1: Competitor Analysis
Agent: documentation-expert
Prompt: "Research and document analysis for Notion, Asana, and Monday.com.
Include features, pricing, target audience, strengths, and weaknesses.
Output: Project-tasks/competitor-research/deliverables/competitor-analysis.md"

Task 2: Strategic Recommendations
Agent: documentation-expert
Prompt: "Based on competitor analysis, provide strategic recommendations.
Output: Project-tasks/competitor-research/deliverables/recommendations.md"

Task 3: Feature Comparison Table
Agent: technical-writer-agent
Prompt: "Create markdown table comparing features across 3 competitors.
Output: Project-tasks/competitor-research/deliverables/feature-comparison-table.md"

Ready to execute? Type 'yes' to launch.
```

User: "yes"

#### 6. Execution

```
Launching sub-agents...

Task 1: [In Progress] Researching competitors...
Task 1: [Complete] ✓ competitor-analysis.md created

Task 2: [In Progress] Writing recommendations...
Task 2: [Complete] ✓ recommendations.md created

Task 3: [In Progress] Creating feature table...
Task 3: [Complete] ✓ feature-comparison-table.md created

Topic Complete!

Deliverables:
- Project-tasks/competitor-research/deliverables/competitor-analysis.md
- Project-tasks/competitor-research/deliverables/recommendations.md
- Project-tasks/competitor-research/deliverables/feature-comparison-table.md

All research complete and ready for review.
```

---

## Summary

The csprojecttask orchestration system provides a structured, multi-phase approach to executing complex projects:

- **Phase 1**: Understand requirements (what to build)
- **Phase 2**: Select agents (who will build it)
- **Phase 3**: Plan execution (how to build it)
- **Execution**: Sub-agents create deliverables

Each phase requires user approval, ensuring control and transparency throughout the process.

**Key Benefits**:
- Structured workflow with clear checkpoints
- Automated agent selection based on requirements
- Organized deliverables in dedicated directories
- State tracking for progress monitoring
- Reusable for any multi-step project
