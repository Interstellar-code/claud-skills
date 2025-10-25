# pricing-research-analyst

> Specialist in pricing model analysis, business model evaluation, monetization strategy research, and value-based pricing assessment

**Category**: Research & Analysis | **Version**: 1.0.0

## Quick Info

| Property | Value |
|----------|-------|
| **Speed** | ⚡⚡⚡⚡ (4/5) |
| **Complexity** | Medium |
| **Token Efficiency** | High - focused pricing research |
| **Tags** | pricing, business-model, monetization, revenue |

## Overview

Specialist sub-agent for conducting comprehensive pricing and business model analysis. Works autonomously under PM orchestrator coordination to research pricing strategies, evaluate business models, analyze revenue streams, and provide monetization recommendations.

## Use Cases

- Competitive pricing analysis for product launches
- Business model evaluation for strategic planning
- Revenue stream identification and optimization
- Freemium vs premium strategy research
- SaaS pricing tier analysis

## Key Features

- **Comprehensive Pricing Research**: Analyzes all pricing tiers and models
- **Business Model Analysis**: Evaluates revenue streams and monetization
- **Pricing Psychology**: Identifies pricing strategies and patterns
- **Hidden Costs Discovery**: Finds transaction fees, usage charges
- **Autonomous Operation**: Works independently with state file coordination

## Installation

### Step 1: Copy Agent Directory

```bash
# Agent is part of the orchestration system
# Located at: .claude/agents/pricing-research-analyst/
```

### Step 2: Verify in Agent Library

The agent should be registered in `.claude/agents/agenthero-ai/README.md`

### Step 3: Use via PM Orchestrator

This agent is invoked by the PM Project Orchestrator, not directly by users.

## Usage

```
User: "Research pricing models for [Product/Industry]"
PM Orchestrator: Scans library, finds pricing-research-analyst
PM Orchestrator: Creates task with pricing analysis focus
PM Orchestrator: Launches agent with state file
Agent: Executes pricing research autonomously
```

## Research Methodology

1. **Target Company Baseline (10%)** - Current pricing model
2. **Competitor Pricing Discovery (40%)** - Research competitor pricing
3. **Business Model Analysis (60%)** - Revenue streams and monetization
4. **Pricing Strategy Patterns (80%)** - Identify market patterns
5. **Generate Report (100%)** - Pricing comparison and recommendations

## Pricing Models Identified

- **Subscription Models**: Monthly/annual, tiered, usage-based, per-seat
- **Freemium Models**: Free tier limits, upgrade triggers, conversion
- **Transaction Models**: Commission, transaction fees, success-based
- **Hybrid Models**: Mixed revenue streams and monetization

## Configuration

- **State File**: Provided by PM Orchestrator at runtime
- **Tools**: Read, Write, Edit, Bash, Glob, Grep, WebSearch, WebFetch
- **Model**: Inherits from parent

## Documentation

- **Source**: [agent.md](agent.md)
- **Full Documentation**: See agent source file for complete behavioral rules and methodology

## Related Agents

- [market-research-analyst](../market-research-analyst/README.md) - Market positioning and competitive landscape
- [feature-comparison-analyst](../feature-comparison-analyst/README.md) - Technical feature analysis and capability evaluation

---

**Last Updated**: 2025-10-22
**Maintainer**: PM Orchestration System
**Status**: Production Ready
