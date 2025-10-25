# feature-comparison-analyst

> Specialist in feature set analysis, technical capability evaluation, integration assessment, and UX differentiator identification

**Category**: Research & Analysis | **Version**: 1.0.0

## Quick Info

| Property | Value |
|----------|-------|
| **Speed** | ⚡⚡⚡⚡ (4/5) |
| **Complexity** | Medium |
| **Token Efficiency** | High - focused feature analysis |
| **Tags** | features, technical-analysis, integrations, UX |

## Overview

Specialist sub-agent for conducting comprehensive feature comparison and technical capability analysis. Works autonomously under PM orchestrator coordination to catalog features, evaluate technical capabilities, assess integrations, and identify UX differentiators.

## Use Cases

- Feature parity analysis for competitive products
- Technical capability evaluation for platform selection
- Integration ecosystem assessment
- UX and innovation differentiator research
- API and platform capability documentation

## Key Features

- **Comprehensive Feature Cataloging**: Systematically documents all features across competitors
- **Technical Deep Dives**: Evaluates APIs, integrations, platform support
- **Feature Matrices**: Creates comparison tables for easy analysis
- **Innovation Tracking**: Identifies unique features and UX innovations
- **Autonomous Operation**: Works independently with state file coordination

## Installation

### Step 1: Copy Agent Directory

```bash
# Agent is part of the orchestration system
# Located at: .claude/agents/feature-comparison-analyst/
```

### Step 2: Verify in Agent Library

The agent should be registered in `.claude/agents/agenthero-ai/README.md`

### Step 3: Use via PM Orchestrator

This agent is invoked by the PM Project Orchestrator, not directly by users.

## Usage

```
User: "Compare features across [Competitor Products]"
PM Orchestrator: Scans library, finds feature-comparison-analyst
PM Orchestrator: Creates task with feature analysis focus
PM Orchestrator: Launches agent with state file
Agent: Executes feature research autonomously
```

## Analysis Methodology

1. **Baseline Feature Set (10%)** - Target product feature catalog
2. **Competitor Feature Discovery (30%)** - Document competitor features
3. **Feature Comparison Matrix (60%)** - Build comprehensive comparison
4. **UX & Innovation Analysis (80%)** - Identify differentiators
5. **Generate Report (100%)** - Feature matrix and recommendations

## Feature Categories Analyzed

- **Core Features**: Primary functionality and workflows
- **Technical Features**: APIs, integrations, platform support
- **Advanced Features**: AI/ML, analytics, customization
- **User Experience**: Interface design, mobile, onboarding

## Configuration

- **State File**: Provided by PM Orchestrator at runtime
- **Tools**: Read, Write, Edit, Bash, Glob, Grep, WebSearch, WebFetch
- **Model**: Inherits from parent

## Documentation

- **Source**: [agent.md](agent.md)
- **Full Documentation**: See agent source file for complete behavioral rules and methodology

## Related Agents

- [market-research-analyst](../market-research-analyst/README.md) - Market positioning and competitive landscape
- [pricing-research-analyst](../pricing-research-analyst/README.md) - Pricing model and business model analysis

---

**Last Updated**: 2025-10-22
**Maintainer**: PM Orchestration System
**Status**: Production Ready
