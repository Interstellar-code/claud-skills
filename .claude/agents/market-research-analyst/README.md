# market-research-analyst

> Specialist in market positioning, competitive landscape analysis, target audience research, and competitive positioning strategies

**Category**: Research & Analysis | **Version**: 1.0.0

## Quick Info

| Property | Value |
|----------|-------|
| **Speed** | ⚡⚡⚡⚡ (4/5) |
| **Complexity** | Medium |
| **Token Efficiency** | High - focused research tasks |
| **Tags** | research, market-analysis, competitors, positioning |

## Overview

Specialist sub-agent for conducting comprehensive market research and competitive analysis. Works autonomously under PM orchestrator coordination to analyze market positioning, identify competitors, research target audiences, and provide strategic positioning insights.

## Use Cases

- Competitive landscape analysis for new product launches
- Market positioning research for strategic planning
- Target audience identification and segmentation
- Competitor profiling and strategic analysis
- Value proposition differentiation research

## Key Features

- **Autonomous Operation**: Works independently with state file coordination
- **Comprehensive Research**: Uses WebSearch and WebFetch for deep market insights
- **Structured Reporting**: Creates detailed markdown reports with competitive matrices
- **Progress Tracking**: Logs progress every 30-60 seconds to state file
- **PM Integration**: Communicates blocking questions through state files

## Installation

### Step 1: Copy Agent Directory

```bash
# Agent is part of the orchestration system
# Located at: .claude/agents/market-research-analyst/
```

### Step 2: Verify in Agent Library

The agent should be registered in `.claude/agents/csprojecttask/README.md`

### Step 3: Use via PM Orchestrator

This agent is invoked by the PM Project Orchestrator, not directly by users.

## Usage

```
User: "Research competitors for [Product/Service]"
PM Orchestrator: Scans library, finds market-research-analyst
PM Orchestrator: Creates task with market analysis focus
PM Orchestrator: Launches agent with state file
Agent: Executes research autonomously
```

## Research Methodology

1. **Understand Target Company (10%)** - Baseline research
2. **Identify Competitors (25%)** - Direct, indirect, adjacent competitors
3. **Analyze Each Competitor (50-75%)** - Deep competitive profiling
4. **Synthesize Findings (90%)** - Competitive positioning matrix
5. **Create Report (100%)** - Comprehensive markdown documentation

## Configuration

- **State File**: Provided by PM Orchestrator at runtime
- **Tools**: Read, Write, Edit, Bash, Glob, Grep, WebSearch, WebFetch
- **Model**: Inherits from parent

## Documentation

- **Source**: [agent.md](agent.md)
- **Full Documentation**: See agent source file for complete behavioral rules and methodology

## Related Agents

- [feature-comparison-analyst](../feature-comparison-analyst/README.md) - Technical feature analysis and capability evaluation
- [pricing-research-analyst](../pricing-research-analyst/README.md) - Pricing model and business model analysis

---

**Last Updated**: 2025-10-22
**Maintainer**: PM Orchestration System
**Status**: Production Ready
