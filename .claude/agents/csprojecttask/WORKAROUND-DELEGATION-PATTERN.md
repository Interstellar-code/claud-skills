# PM Orchestrator - Sub-Agent Delegation Workaround

**Version**: 1.0.0
**Date**: 2025-10-22
**Status**: Active Solution

## Problem Statement

**Issue**: The csprojecttask PM agent cannot directly invoke sub-agents using the Task tool.

**Error**: `"I don't have access to that tool in my current environment"`

**Root Cause**: Claude Code restricts the Task tool from being available in agent contexts, even when explicitly listed in the agent's YAML frontmatter.

**Impact**: Hierarchical orchestration (PM agent → sub-agents) is blocked.

## Solution: Prompt Handoff Pattern

The PM agent **prepares** complete prompts for sub-agents, then the **main Claude session executes** them.

### Workflow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│ PHASE 1: PM Agent Preparation                                │
├──────────────────────────────────────────────────────────────┤
│ 1. User invokes csprojecttask agent                          │
│ 2. PM reads pm-state.json from topic                         │
│ 3. PM analyzes pending tasks (status="pending")              │
│ 4. PM generates complete, standalone prompts for each task   │
│ 5. PM presents ALL prompts to user for review                │
│ 6. PM waits for approval                                     │
│ 7. PM agent completes and returns to main session            │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│ PHASE 2: User Review                                         │
├──────────────────────────────────────────────────────────────┤
│ • User reviews all prepared prompts                          │
│ • User says "Go ahead" / "Proceed" / "Launch them"           │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│ PHASE 3: Main Session Execution                              │
├──────────────────────────────────────────────────────────────┤
│ 1. Main Claude session launches all Task calls               │
│ 2. ALL Task calls in SINGLE message (parallel execution)     │
│ 3. Each Task call uses exact prompt PM prepared              │
│ 4. Sub-agents run autonomously                               │
│ 5. Sub-agents update state files with progress               │
└──────────────────────────────────────────────────────────────┘
```

## Complete Example: 3 Parallel Website Tasks

### Step 1: User Invokes PM Agent

**User command**:
```
Resume topic: subshero-website-3-theme-variants
```

**PM agent starts**, reads topic state from:
```
.claude/agents/state/csprojecttask/topics/subshero-website-3-theme-variants/pm-state.json
```

### Step 2: PM Analyzes Tasks

**Found in pm-state.json**:
```json
{
  "tasks": [
    {
      "id": "task-001",
      "agent": "single-page-website-builder",
      "description": "Build SubsHero landing page - Light Mode theme",
      "status": "pending",
      "details": {
        "theme": "light",
        "components": ["hero", "features", "pricing", "testimonials", "cta"],
        "deliverables": ["index-light.html", "style-light.css", "script.js"]
      }
    },
    {
      "id": "task-002",
      "agent": "single-page-website-builder",
      "description": "Build SubsHero landing page - Dark Mode theme",
      "status": "pending",
      "details": {
        "theme": "dark",
        "components": ["hero", "features", "pricing", "testimonials", "cta"],
        "deliverables": ["index-dark.html", "style-dark.css", "script.js"]
      }
    },
    {
      "id": "task-003",
      "agent": "single-page-website-builder",
      "description": "Build SubsHero landing page - Matrix Style theme",
      "status": "pending",
      "details": {
        "theme": "matrix",
        "components": ["hero", "features", "pricing", "testimonials", "cta"],
        "deliverables": ["index-matrix.html", "style-matrix.css", "script.js"],
        "specialEffects": ["falling-code", "glitch-text", "neon-borders"]
      }
    }
  ]
}
```

### Step 3: PM Prepares Complete Prompts

**PM Agent Output**:

```
═══════════════════════════════════════════════════════════
🎯 EXECUTION PLAN READY
═══════════════════════════════════════════════════════════

Topic: SubsHero Website - 3 Theme Variants
Tasks to Launch: 3
Execution Strategy: PARALLEL (all 3 launch simultaneously)
Agent: single-page-website-builder (same agent, 3 instances)

───────────────────────────────────────────────────────────

📋 TASK 001: Light Mode Theme

Agent: single-page-website-builder
Status: pending → ready to launch
Dependencies: None

──── Prepared Prompt ────

Build a complete single-page website for SubsHero.com - **Light Mode Theme**

**Project**: SubsHero - Subscription management platform
**Theme**: Light Mode (clean, professional, bright aesthetic)
**Task ID**: task-001

**Requirements**:
- **Components**: hero, features, pricing, testimonials, cta
- **Deliverables**:
  - index-light.html
  - style-light.css
  - script.js (shared)

**Design Guidelines**:
- Light background (#ffffff, #f8f9fa)
- Dark text for readability
- Professional color scheme
- Modern, clean design
- Responsive layout
- Smooth animations

**Content Focus**: Subscription management for SaaS businesses

**Output**: Create all 3 files in the current directory.

**State File**: `.claude/agents/state/csprojecttask/topics/subshero-website-3-theme-variants/task-001-light-mode.json`

─────────────────────────

───────────────────────────────────────────────────────────

📋 TASK 002: Dark Mode Theme

Agent: single-page-website-builder
Status: pending → ready to launch
Dependencies: None

──── Prepared Prompt ────

Build a complete single-page website for SubsHero.com - **Dark Mode Theme**

**Project**: SubsHero - Subscription management platform
**Theme**: Dark Mode (sleek, modern, high-contrast aesthetic)
**Task ID**: task-002

**Requirements**:
- **Components**: hero, features, pricing, testimonials, cta
- **Deliverables**:
  - index-dark.html
  - style-dark.css
  - script.js (shared)

**Design Guidelines**:
- Dark background (#1a1a1a, #0f0f0f)
- Light text for readability (#ffffff, #e0e0e0)
- Accent colors that pop on dark
- Modern, sleek design
- Responsive layout
- Smooth animations

**Content Focus**: Subscription management for SaaS businesses

**Output**: Create all 3 files in the current directory.

**State File**: `.claude/agents/state/csprojecttask/topics/subshero-website-3-theme-variants/task-002-dark-mode.json`

─────────────────────────

───────────────────────────────────────────────────────────

📋 TASK 003: Matrix Style Theme

Agent: single-page-website-builder
Status: pending → ready to launch
Dependencies: None

──── Prepared Prompt ────

Build a complete single-page website for SubsHero.com - **Matrix Style Theme**

**Project**: SubsHero - Subscription management platform
**Theme**: Matrix Style (cyberpunk, hacker aesthetic with special effects)
**Task ID**: task-003

**Requirements**:
- **Components**: hero, features, pricing, testimonials, cta
- **Deliverables**:
  - index-matrix.html
  - style-matrix.css
  - script.js (shared, or matrix-specific if effects need it)

**Special Effects** (REQUIRED):
- falling-code: Matrix-style falling code rain effect
- glitch-text: Text glitch animations
- neon-borders: Neon green/cyan glowing borders

**Design Guidelines**:
- Black background (#000000, #001a00)
- Matrix green (#00ff00, #00cc00) and cyan accents
- Monospace fonts for code aesthetic
- Cyberpunk/hacker vibe
- Animated effects throughout
- Responsive layout

**Content Focus**: Subscription management for SaaS businesses (but with Matrix theme)

**Output**: Create all 3 files in the current directory.

**State File**: `.claude/agents/state/csprojecttask/topics/subshero-website-3-theme-variants/task-003-matrix-style.json`

─────────────────────────

═══════════════════════════════════════════════════════════

✅ READY TO LAUNCH

All 3 prompts prepared and ready for parallel execution.

**Next Step**: After you approve, I will return control to the main
Claude session, which will launch all 3 sub-agents using the Task tool.

**What will happen**:
1. Main Claude session receives all 3 prepared prompts
2. Main session launches 3 Task calls in a SINGLE message
3. All 3 single-page-website-builder agents run in parallel
4. Each agent builds its themed website independently
5. Progress tracked via state files
6. You can monitor via dashboard

**Awaiting your approval to proceed...**

Type "Go ahead" or "Proceed" to launch all tasks.

═══════════════════════════════════════════════════════════
```

### Step 4: User Approves

**User**: "Go ahead"

**PM Agent**: Completes and returns control to main session

### Step 5: Main Session Executes

**Main Claude Session** (after PM agent completes):

```
I'll now launch all 3 website builder agents in parallel using the
prompts the PM agent prepared.
```

**Executes**:
```python
# Single message with 3 Task calls:

Task(
  subagent_type="single-page-website-builder",
  description="Build SubsHero Light Mode theme",
  prompt="""Build a complete single-page website for SubsHero.com - **Light Mode Theme**

**Project**: SubsHero - Subscription management platform
**Theme**: Light Mode (clean, professional, bright aesthetic)
**Task ID**: task-001

**Requirements**:
- **Components**: hero, features, pricing, testimonials, cta
- **Deliverables**: index-light.html, style-light.css, script.js

**Design Guidelines**:
- Light background (#ffffff, #f8f9fa)
- Dark text for readability
- Professional color scheme
- Modern, clean design
- Responsive layout
- Smooth animations

**Content Focus**: Subscription management for SaaS businesses

**Output**: Create all 3 files in the current directory.

**State File**: .claude/agents/state/csprojecttask/topics/subshero-website-3-theme-variants/task-001-light-mode.json
"""
)

Task(
  subagent_type="single-page-website-builder",
  description="Build SubsHero Dark Mode theme",
  prompt="""Build a complete single-page website for SubsHero.com - **Dark Mode Theme**

**Project**: SubsHero - Subscription management platform
**Theme**: Dark Mode (sleek, modern, high-contrast aesthetic)
**Task ID**: task-002

**Requirements**:
- **Components**: hero, features, pricing, testimonials, cta
- **Deliverables**: index-dark.html, style-dark.css, script.js

**Design Guidelines**:
- Dark background (#1a1a1a, #0f0f0f)
- Light text for readability (#ffffff, #e0e0e0)
- Accent colors that pop on dark
- Modern, sleek design
- Responsive layout
- Smooth animations

**Content Focus**: Subscription management for SaaS businesses

**Output**: Create all 3 files in the current directory.

**State File**: .claude/agents/state/csprojecttask/topics/subshero-website-3-theme-variants/task-002-dark-mode.json
"""
)

Task(
  subagent_type="single-page-website-builder",
  description="Build SubsHero Matrix Style theme",
  prompt="""Build a complete single-page website for SubsHero.com - **Matrix Style Theme**

**Project**: SubsHero - Subscription management platform
**Theme**: Matrix Style (cyberpunk, hacker aesthetic with special effects)
**Task ID**: task-003

**Requirements**:
- **Components**: hero, features, pricing, testimonials, cta
- **Deliverables**: index-matrix.html, style-matrix.css, script.js (matrix-specific if needed)

**Special Effects** (REQUIRED):
- falling-code: Matrix-style falling code rain effect
- glitch-text: Text glitch animations
- neon-borders: Neon green/cyan glowing borders

**Design Guidelines**:
- Black background (#000000, #001a00)
- Matrix green (#00ff00, #00cc00) and cyan accents
- Monospace fonts for code aesthetic
- Cyberpunk/hacker vibe
- Animated effects throughout
- Responsive layout

**Content Focus**: Subscription management for SaaS businesses (Matrix themed)

**Output**: Create all 3 files in the current directory.

**State File**: .claude/agents/state/csprojecttask/topics/subshero-website-3-theme-variants/task-003-matrix-style.json
"""
)
```

**Result**:
```
✅ Launching 3 website builder agents in parallel:
   • single-page-website-builder (Light Mode theme)
   • single-page-website-builder (Dark Mode theme)
   • single-page-website-builder (Matrix Style theme)

All 3 agents are now running simultaneously.
```

## Key Rules

### PM Agent Rules

**MUST DO**:
- ✅ Read pm-state.json completely
- ✅ Generate standalone, complete prompts (no shared context with main session)
- ✅ Include all task.details in each prompt
- ✅ Specify state file path in each prompt
- ✅ Present ALL prompts to user in one output
- ✅ Format prompts ready for copy-paste into Task() calls
- ✅ Return control to main session after user approval

**MUST NOT DO**:
- ❌ Attempt to use Task tool yourself
- ❌ Assume main session has PM context
- ❌ Skip any task details in prompts
- ❌ Launch agents yourself
- ❌ Forget state file paths

### Main Session Rules

**MUST DO**:
- ✅ Launch ALL Task calls in SINGLE message (for parallel execution)
- ✅ Use EXACT prompts PM prepared
- ✅ Include description parameter for each Task call
- ✅ Verify all prompts before executing

**MUST NOT DO**:
- ❌ Launch Task calls in separate messages (breaks parallel execution)
- ❌ Modify PM's prepared prompts
- ❌ Skip any tasks

## Benefits

| Benefit | Description |
|---------|-------------|
| **PM Logic Preserved** | PM still does orchestration planning, task analysis, dependency management |
| **Works Within Limits** | No reliance on Task tool in agent context |
| **User Visibility** | User sees exactly what will execute before it happens |
| **Parallel Execution** | Main session can launch multiple Task calls simultaneously |
| **Clean Handoff** | Clear separation: PM prepares, main executes |
| **State Management** | PM still manages all state files, progress tracking intact |

## Limitations

| Limitation | Workaround |
|------------|------------|
| **Extra User Step** | User must approve after PM prepares (but provides visibility) |
| **Manual Handoff** | PM can't directly launch (but prompts are ready to use) |
| **Context Switch** | PM agent → main session (but seamless in practice) |

## Future Improvements

If Claude Code adds agent-to-agent Task tool support:

1. Remove workaround section from agent.md
2. PM can directly use Task tool
3. No user approval step needed (unless desired)
4. Fully automated orchestration

Until then, this pattern provides equivalent functionality.

## Testing Checklist

- [ ] PM agent reads pm-state.json correctly
- [ ] PM generates complete prompts for all tasks
- [ ] PM includes all task.details in prompts
- [ ] PM specifies state file paths
- [ ] PM presents prompts in clear format
- [ ] User can copy-paste prompts easily
- [ ] Main session launches all Task calls in single message
- [ ] All sub-agents receive correct prompts
- [ ] Sub-agents run in parallel
- [ ] Sub-agents update state files
- [ ] Progress visible in dashboard

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-10-22 | Initial workaround implementation |
