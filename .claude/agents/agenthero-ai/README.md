# AgentHero AI

> Hierarchical multi-agent orchestration agent library. Central registry of reusable specialist sub-agents for PM orchestrator coordination. All created agents use `aghero-` prefix.

**Category**: Orchestration & Management | **Version**: 2.0.0 (Rebrand)

## Quick Info

| Property | Value |
|----------|-------|
| **Speed** | ⚡⚡⚡⚡⚡ (5/5) - Instant registry lookup |
| **Complexity** | Low - Registry management |
| **Token Efficiency** | Extreme - Enables agent reuse |
| **Tags** | orchestration, agent-library, registry, pm-coordination |

## Overview

Central agent library and registry system for the hierarchical multi-agent orchestration framework. Manages reusable specialist sub-agents, tracks usage across topics, and provides agent discovery for the PM orchestrator.

## Key Features

- **Central Registry**: Single source of truth for all specialist agents
- **Agent Discovery**: Fast lookup by specialization or keyword
- **Usage Tracking**: Monitor which agents are used in which topics
- **Lifecycle Management**: Track agent creation, usage, and deprecation
- **Reusability**: Enable same agent across multiple projects
- **Naming Convention**: All created agents use `aghero-` prefix for clear ownership

## 🏷️ Agent Naming Convention

AgentHero AI uses a consistent naming pattern for all agents it creates:

### aghero-* Prefix (MANDATORY)

All agents created by AgentHero AI during topic execution follow the `aghero-*` pattern:

- `aghero-testing-agent` - Testing automation specialist
- `aghero-api-builder` - API development specialist
- `aghero-data-analyzer` - Data analysis specialist
- `aghero-ui-designer` - UI/UX design specialist
- `aghero-database-architect` - Database design specialist

### Standalone Agents

These agents exist independently and don't use the `aghero-` prefix:

- `agenthero-docs-expert` - Professional documentation generator
- `agenthero-qa-validate` - Quality assurance validator
- `single-page-website-builder` - Website creation specialist

### Why the Prefix?

- ✅ Clear ownership (created by AgentHero AI)
- ✅ Easy identification in agent library
- ✅ Namespace separation from standalone agents
- ✅ Consistent naming across all topics

## Agent Registry

### market-research-analyst.md
- **Specialization**: Market positioning, competitive landscape analysis, target audience research
- **Created**: 2025-10-22
- **Used in Topics**:
  - `subshero-competitor-research` (task-001)
- **Dependencies**: None (independent research)
- **Reusable**: ✅ Yes
- **Status**: Active

### feature-comparison-analyst.md
- **Specialization**: Feature set analysis, technical capability evaluation, integration assessment
- **Created**: 2025-10-22
- **Used in Topics**:
  - `subshero-competitor-research` (task-002)
- **Dependencies**: None (independent research)
- **Reusable**: ✅ Yes
- **Status**: Active

### pricing-research-analyst.md
- **Specialization**: Pricing model analysis, business model evaluation, monetization strategy research
- **Created**: 2025-10-22
- **Used in Topics**:
  - `subshero-competitor-research` (task-003)
- **Dependencies**: None (independent research)
- **Reusable**: ✅ Yes
- **Status**: Active

### single-page-website-builder.md
- **Specialization**: Single-page website development using HTML, CSS, JavaScript. Specializes in landing pages with theme variants (Light, Dark, Matrix, etc.)
- **Created**: 2025-10-22
- **Used in Topics**:
  - `subshero-website-3-theme-variants` (task-001, task-002, task-003)
- **Dependencies**: None (independent development)
- **Reusable**: ✅ Yes
- **Status**: Active

---

## Agent Lifecycle

### When PM Creates New Agent:
1. Check this README for existing specialists
2. If suitable agent exists → Reuse it
3. If no match → Create new agent
4. Update this README with new agent details

### Agent Naming Convention:
- Use specialization name: `backend-api-developer.md`
- NOT task numbers: ~~`task-001-backend.md`~~
- Be descriptive: `frontend-react-developer.md` better than `frontend-dev.md`

### Agent File Structure:
```markdown
---
name: agent-name
description: Agent specialization
tools: Read, Write, Edit, Bash, Glob, Grep
model: inherit
---

# Agent Name

[Combines orchestrated-sub-agent-template.md with specialization]
```

---

## Common Agent Types (Future Library)

### Development
- `backend-api-developer.md` - API endpoints, database design
- `frontend-developer.md` - UI components, user interactions
- `fullstack-developer.md` - Complete feature implementation
- `database-architect.md` - Schema design, migrations
- `single-page-website-builder.md` - Landing pages, marketing sites ✅ Active

### Testing & QA
- `unit-testing-specialist.md` - Unit test creation
- `integration-testing-specialist.md` - Integration test suites
- `e2e-testing-specialist.md` - End-to-end testing with Playwright/Cypress

### Research & Analysis
- `market-research-analyst.md` - Market positioning, competitive analysis ✅ Active
- `feature-comparison-analyst.md` - Feature evaluation ✅ Active
- `pricing-research-analyst.md` - Pricing models, business analysis ✅ Active
- `technical-research-analyst.md` - Technology evaluation

### DevOps & Infrastructure
- `deployment-specialist.md` - Deployment automation
- `ci-cd-specialist.md` - Pipeline configuration
- `monitoring-specialist.md` - Logging, monitoring setup

---

## Usage Example

```markdown
PM receives: "Research SubsHero competitors"

PM checks README.md:
- ✅ market-research-analyst exists → Reuse
- ✅ feature-comparison-analyst exists → Reuse
- ✅ pricing-research-analyst exists → Reuse

PM creates tasks:
- task-001: Uses market-research-analyst
- task-002: Uses feature-comparison-analyst
- task-003: Uses pricing-research-analyst

All run in parallel (no dependencies)
```

---

## Maintenance

### Adding New Agent:
1. Create agent file: `.claude/agents/agenthero-ai/new-agent.md`
2. Update this README with agent details
3. Test agent with sample task
4. Document in PM orchestrator

### Deprecating Agent:
1. Mark as deprecated in README
2. Keep file for historical topics
3. Create replacement if needed

---

**Last Updated**: 2025-10-22
**Total Agents**: 4
**Active Agents**: 4
