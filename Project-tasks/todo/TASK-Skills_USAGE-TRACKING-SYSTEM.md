# Tool/Skill/Agent Usage Tracking System

**Task ID:** TASK-USAGE-TRACKING-SYSTEM
**Created:** 2025-10-21
**Priority:** Medium
**Status:** Planning
**Estimated Impact:** Pattern discovery, optimization insights, 15-30% additional efficiency gains

---

## Objective

Create a comprehensive usage tracking system to log all Claude Code tool calls, custom skills, and agent invocations. Enable pattern analysis to discover optimization opportunities and identify which operations should be converted to skills.

---

## Business Case

### Problem
Currently, we don't have visibility into:
- Which tools/skills are used most frequently
- Which tool sequences are common (e.g., "Grep → Read → Edit")
- Token efficiency of skills vs native tools
- Opportunities to create new skills based on usage patterns

### Solution
Implement automatic usage logging via Claude Code hooks to:
1. Track all tool/skill/agent usage with metadata
2. Analyze patterns to discover optimization opportunities
3. Measure token savings from skills
4. Identify candidates for new skill creation

### Expected ROI
- **Pattern Discovery:** Identify 5-10 new skill opportunities
- **Efficiency Gains:** 15-30% additional token/time savings
- **Data-Driven Decisions:** Objective metrics for tool optimization
- **Continuous Improvement:** Ongoing pattern detection

---

## Implementation Options

### Option 1: Claude Code Hooks (RECOMMENDED) ⭐

**Approach:** Leverage native `.claude/settings.local.json` hooks system

**Hook Types to Use:**
- `PreToolUse` - Log before tool execution (tool name, parameters, timestamp)
- `PostToolUse` - Log after execution (duration, success/failure, results)
- `UserPromptSubmit` - Log user queries for context
- `SessionStart` / `SessionEnd` - Session boundary tracking

**Benefits:**
- ✅ Native Claude Code feature (zero custom code initially)
- ✅ Automatic logging of ALL tool usage
- ✅ Structured data (tool name, parameters, timing)
- ✅ No manual intervention needed
- ✅ Works with all tools, skills, and agents

**Implementation:**
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/usage-logger.sh pre"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash ~/.claude/hooks/usage-logger.sh post"
          }
        ]
      }
    ]
  }
}
```

---

### Option 2: Custom Logger Skill

**Approach:** Create `usage-tracker` skill that wraps tool calls

**Features:**
- Manual logging via skill commands
- Export logs to JSON/CSV
- Basic analysis commands built-in

**Benefits:**
- ✅ Explicit control over what's logged
- ✅ Lightweight implementation
- ✅ Easy to customize

**Drawbacks:**
- ❌ Requires manual invocation
- ❌ Only logs what we explicitly track
- ❌ Misses automatic tool usage

---

### Option 3: Hybrid Approach (BEST LONG-TERM)

**Combine Options 1 + 2:**
1. Use hooks for automatic logging (all tools)
2. Create `usage-analyzer` skill for analysis
3. Optional: External dashboard for visualization

**Benefits:**
- ✅ Comprehensive automatic tracking
- ✅ Powerful analysis capabilities
- ✅ Extensible for future needs

---

## Data Schema

### Log Entry Format (JSON)

```json
{
  "timestamp": "2025-10-21T14:30:45Z",
  "session_id": "abc123def456",
  "tool_type": "Bash",
  "tool_name": "sql-cli",
  "command": "bash ~/.claude/skills/sql-cli/sql-cli.sh count users 'status=\"active\"'",
  "parameters": {
    "table": "users",
    "condition": "status='active'"
  },
  "duration_ms": 45,
  "success": true,
  "tokens_estimated": 180,
  "tokens_saved": 1320,
  "alternative_approach": "php artisan tinker",
  "context": "database query",
  "user_query": "how many active users?"
}
```

### Tracked Metrics

**Per Tool Call:**
- Timestamp
- Session ID
- Tool name (Bash, Read, Write, Edit, Grep, Glob, Task, etc.)
- Skill name (if applicable: sql-cli, time-helper, markdown-helper, rapid-finder)
- Agent name (if applicable: pest-test-runner, playwright-test-healer, etc.)
- Command/parameters
- Execution duration (ms)
- Success/failure status
- Token usage (estimated)
- Token savings (vs alternative approach)

**Aggregated Stats:**
- Daily/weekly/monthly totals
- Most used tools/skills
- Average execution times
- Token efficiency metrics
- Pattern sequences

---

## Analysis Capabilities

### 1. Usage Summary
```bash
bash ~/.claude/skills/usage-analyzer/analyzer.sh summary

# Output:
Total tool calls today: 145
Most used: Bash (45), Read (32), Edit (18)
Skills used: sql-cli (12), markdown-helper (8), rapid-finder (5)
Token savings: 12,450 tokens (38% reduction)
```

### 2. Top Tools
```bash
bash ~/.claude/skills/usage-analyzer/analyzer.sh top-tools --period 7d

# Output:
Top 10 Tools (Last 7 Days):
1. Bash: 342 calls (avg 52ms)
2. Read: 278 calls (avg 15ms)
3. Edit: 156 calls (avg 28ms)
4. Grep: 98 calls (avg 45ms)
5. sql-cli skill: 67 calls (avg 38ms, saved 8,940 tokens)
...
```

### 3. Pattern Detection
```bash
bash ~/.claude/skills/usage-analyzer/analyzer.sh patterns

# Output:
Common Tool Sequences:
1. Grep → Read → Edit (23 times) - Candidate for "search-and-fix" skill
2. Read → Read → Edit (18 times) - Candidate for "multi-file-edit" skill
3. Bash(fd) → Read → bat (12 times) - Already optimized with rapid-finder
4. Glob → Read → Grep (8 times) - Candidate for "find-in-files" skill
```

### 4. Token Efficiency Report
```bash
bash ~/.claude/skills/usage-analyzer/analyzer.sh token-savings

# Output:
Token Savings Analysis (Last 30 Days):
- sql-cli skill: 15,840 tokens saved (87% vs Artisan Tinker)
- markdown-helper skill: 12,650 tokens saved (85% vs native Read)
- time-helper skill: 3,420 tokens saved (67% vs native calculations)
- rapid-finder skill: 2,890 tokens saved (70% vs Glob tool)

Total Saved: 34,800 tokens
Efficiency Gain: 42%
```

### 5. Skill Opportunity Finder
```bash
bash ~/.claude/skills/usage-analyzer/analyzer.sh opportunities

# Output:
New Skill Opportunities Detected:
1. "search-and-fix" - Grep → Read → Edit sequence (23x usage)
   Est. savings: 400 tokens/call, 9,200 tokens total
2. "multi-file-edit" - Multiple Read → Edit pattern (18x usage)
   Est. savings: 300 tokens/call, 5,400 tokens total
3. "api-test" - Bash(curl) → Read → Grep pattern (11x usage)
   Est. savings: 250 tokens/call, 2,750 tokens total
```

---

## Implementation Plan

### Phase 1: Basic Hook Logging (Day 1-2)

#### Day 1: Setup Hook Infrastructure
1. Create `.claude/hooks/` directory
2. Create `usage-logger.sh` script
3. Configure `.claude/settings.local.json` with hooks
4. Test logging basic tool calls

**Deliverables:**
- `.claude/hooks/usage-logger.sh` (hook script)
- `.claude/logs/` directory (log storage)
- Updated `.claude/settings.local.json` (hook configuration)

#### Day 2: Validate Logging
1. Test all tool types (Bash, Read, Write, Edit, Grep, Glob)
2. Test skill invocations (sql-cli, markdown-helper, etc.)
3. Verify log format and data completeness
4. Create sample log entries for analysis

**Deliverables:**
- Validated logging across all tool types
- Sample log file with diverse entries
- Documentation of log schema

---

### Phase 2: Analysis Tools (Day 3-4)

#### Day 3: Create Usage Analyzer Skill
1. Create `.claude/skills/usage-analyzer/` directory
2. Implement `analyzer.sh` with core commands
3. Commands: `summary`, `top-tools`, `patterns`, `token-savings`, `opportunities`
4. Test analysis with sample logs

**Deliverables:**
- `.claude/skills/usage-analyzer/skill.md` (documentation)
- `.claude/skills/usage-analyzer/analyzer.sh` (analysis script)
- Sample analysis reports

#### Day 4: Pattern Detection Logic
1. Implement sequence detection algorithm
2. Identify common tool chains
3. Calculate token savings estimates
4. Generate skill opportunity recommendations

**Deliverables:**
- Pattern detection working
- Skill opportunity reports
- Token savings calculations validated

---

### Phase 3: Automation & Reporting (Day 5-7)

#### Day 5: Automated Reports
1. Create daily summary generation
2. Create weekly pattern analysis
3. Email/export reports (optional)
4. Dashboard HTML page (optional)

**Deliverables:**
- Automated daily/weekly reports
- Email integration (optional)
- Simple HTML dashboard (optional)

#### Day 6-7: Optimization & Testing
1. Optimize log storage (rotation, compression)
2. Performance testing (ensure hooks don't slow down tools)
3. Edge case testing
4. Documentation updates

**Deliverables:**
- Log rotation configured
- Performance validated (<5ms hook overhead)
- Complete documentation

---

## File Structure

```
.claude/
├── hooks/
│   ├── usage-logger.sh          # Hook script for logging
│   └── README.md                 # Hook documentation
├── logs/
│   ├── usage-2025-10-21.json    # Daily usage logs
│   ├── usage-2025-10-22.json
│   ├── usage-summary.json       # Aggregated stats
│   └── patterns.json            # Detected patterns
├── skills/
│   └── usage-analyzer/
│       ├── skill.md             # Skill documentation
│       ├── analyzer.sh          # Analysis commands
│       └── lib/
│           ├── pattern-detector.sh
│           ├── token-calculator.sh
│           └── report-generator.sh
└── settings.local.json          # Hook configuration
```

---

## Hook Script Specification

### usage-logger.sh

**Location:** `.claude/hooks/usage-logger.sh`

**Commands:**
- `pre` - Log before tool execution
- `post` - Log after tool execution (with results)

**Environment Variables Available:**
- `$TOOL_NAME` - Name of tool being invoked
- `$TOOL_PARAMS` - Parameters passed to tool
- `$SESSION_ID` - Current session identifier
- `$TIMESTAMP` - Execution timestamp

**Log Output:**
- Format: JSON (one entry per line)
- Destination: `.claude/logs/usage-YYYY-MM-DD.json`
- Rotation: Daily (keep last 30 days by default)

**Example:**
```bash
#!/usr/bin/env bash
# usage-logger.sh

MODE="$1"  # pre or post
LOG_DIR="$HOME/.claude/logs"
LOG_FILE="$LOG_DIR/usage-$(date +%Y-%m-%d).json"

mkdir -p "$LOG_DIR"

if [ "$MODE" = "pre" ]; then
    # Log tool invocation
    echo "{
        \"timestamp\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\",
        \"session_id\": \"$SESSION_ID\",
        \"tool\": \"$TOOL_NAME\",
        \"params\": \"$TOOL_PARAMS\",
        \"event\": \"start\"
    }" >> "$LOG_FILE"
elif [ "$MODE" = "post" ]; then
    # Log completion with duration
    echo "{
        \"timestamp\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\",
        \"session_id\": \"$SESSION_ID\",
        \"tool\": \"$TOOL_NAME\",
        \"event\": \"complete\",
        \"duration_ms\": $DURATION_MS,
        \"success\": $SUCCESS
    }" >> "$LOG_FILE"
fi
```

---

## Usage Analyzer Skill Specification

### Commands

#### 1. summary [--period PERIOD]
Show usage summary for specified period.

**Usage:**
```bash
bash ~/.claude/skills/usage-analyzer/analyzer.sh summary --period today
bash ~/.claude/skills/usage-analyzer/analyzer.sh summary --period 7d
bash ~/.claude/skills/usage-analyzer/analyzer.sh summary --period 30d
```

**Output:**
```
=== Usage Summary (Today) ===
Total tool calls: 145
Total duration: 12.5 seconds
Success rate: 98.6%

Top 5 Tools:
1. Bash (45 calls, avg 52ms)
2. Read (32 calls, avg 15ms)
3. Edit (18 calls, avg 28ms)
4. Grep (12 calls, avg 45ms)
5. sql-cli skill (12 calls, avg 38ms)

Token Savings: 12,450 tokens (38%)
```

---

#### 2. top-tools [--limit N] [--period PERIOD]
List most frequently used tools.

**Usage:**
```bash
bash ~/.claude/skills/usage-analyzer/analyzer.sh top-tools --limit 10 --period 7d
```

**Output:**
```
Top 10 Tools (Last 7 Days):
┌────┬───────────────────┬───────┬──────────┬──────────────┐
│ #  │ Tool              │ Calls │ Avg Time │ Token Savings│
├────┼───────────────────┼───────┼──────────┼──────────────┤
│ 1  │ Bash              │  342  │   52ms   │      -       │
│ 2  │ Read              │  278  │   15ms   │      -       │
│ 3  │ sql-cli skill     │   67  │   38ms   │   8,940 ✓    │
│ 4  │ markdown-helper   │   45  │   25ms   │   6,750 ✓    │
│ 5  │ rapid-finder      │   23  │   12ms   │   1,840 ✓    │
└────┴───────────────────┴───────┴──────────┴──────────────┘
```

---

#### 3. patterns [--min-frequency N]
Detect common tool usage patterns.

**Usage:**
```bash
bash ~/.claude/skills/usage-analyzer/analyzer.sh patterns --min-frequency 5
```

**Output:**
```
=== Detected Patterns (Min Frequency: 5) ===

Pattern #1: Grep → Read → Edit (23 occurrences)
  Description: Search for pattern, read matched files, edit them
  Avg Duration: 180ms
  Token Usage: ~800 tokens per sequence
  💡 Skill Opportunity: "search-and-fix" skill
     Est. Savings: 400 tokens/call (50% reduction)
     Total Potential: 9,200 tokens saved

Pattern #2: Read → Read → Edit (18 occurrences)
  Description: Read multiple files, then edit one
  Avg Duration: 95ms
  Token Usage: ~600 tokens per sequence
  💡 Skill Opportunity: "multi-file-edit" skill
     Est. Savings: 300 tokens/call (50% reduction)
     Total Potential: 5,400 tokens saved

Pattern #3: Bash(fd) → Read → bat (12 occurrences)
  Description: Find file, read content, view with bat
  Avg Duration: 45ms
  Token Usage: ~200 tokens per sequence
  ✅ Already Optimized: rapid-finder skill handles this
```

---

#### 4. token-savings [--period PERIOD]
Calculate token efficiency from skills.

**Usage:**
```bash
bash ~/.claude/skills/usage-analyzer/analyzer.sh token-savings --period 30d
```

**Output:**
```
=== Token Savings Report (Last 30 Days) ===

Skill Performance:
┌───────────────────────┬───────┬───────────┬──────────┬──────────┐
│ Skill                 │ Calls │ Saved     │ vs Alt.  │ Savings %│
├───────────────────────┼───────┼───────────┼──────────┼──────────┤
│ sql-cli               │  234  │  15,840   │ Tinker   │   87%    │
│ markdown-helper       │  189  │  12,650   │ Read     │   85%    │
│ time-helper           │   78  │   3,420   │ Manual   │   67%    │
│ rapid-finder          │   56  │   2,890   │ Glob     │   70%    │
└───────────────────────┴───────┴───────────┴──────────┴──────────┘

Total Tokens Saved: 34,800
Overall Efficiency Gain: 42%
Estimated Cost Savings: $0.52 (based on Claude API pricing)
```

---

#### 5. opportunities [--min-impact N]
Identify opportunities for new skills based on usage patterns.

**Usage:**
```bash
bash ~/.claude/skills/usage-analyzer/analyzer.sh opportunities --min-impact 2000
```

**Output:**
```
=== Skill Opportunities Detected ===

🔴 HIGH PRIORITY (>5,000 tokens potential savings)

1. "search-and-fix" Skill
   Pattern: Grep → Read → Edit (23x usage)
   Current Tokens: ~800 per sequence
   Projected Savings: 400 tokens/call (50%)
   Total Potential: 9,200 tokens
   Implementation Effort: Medium (2-3 hours)
   ROI: High

2. "multi-file-edit" Skill
   Pattern: Read → Read → Edit (18x usage)
   Current Tokens: ~600 per sequence
   Projected Savings: 300 tokens/call (50%)
   Total Potential: 5,400 tokens
   Implementation Effort: Low (1-2 hours)
   ROI: High

🟡 MEDIUM PRIORITY (2,000-5,000 tokens potential savings)

3. "api-test" Skill
   Pattern: Bash(curl) → Read → Grep (11x usage)
   Current Tokens: ~500 per sequence
   Projected Savings: 250 tokens/call (50%)
   Total Potential: 2,750 tokens
   Implementation Effort: Medium (2-3 hours)
   ROI: Medium
```

---

## Success Metrics

### Performance Metrics
- **Hook Overhead:** <5ms per tool call
- **Log Storage:** <1MB per day
- **Analysis Speed:** <1 second for daily summary

### Usage Metrics
- **Tracking Coverage:** 100% of tool calls logged
- **Log Accuracy:** >99% complete entries
- **Uptime:** Hooks active in >95% of sessions

### Value Metrics
- **Patterns Discovered:** 5-10 new skill opportunities per month
- **Token Savings Identified:** 15-30% additional efficiency gains
- **Skills Created:** 2-3 new skills per quarter based on patterns
- **ROI:** Break-even within 1 month (time saved vs implementation)

---

## Configuration Options

### Settings in .claude/settings.local.json

```json
{
  "hooks": {
    "PreToolUse": [{
      "hooks": [{
        "type": "command",
        "command": "bash ~/.claude/hooks/usage-logger.sh pre",
        "timeout": 1000
      }]
    }],
    "PostToolUse": [{
      "hooks": [{
        "type": "command",
        "command": "bash ~/.claude/hooks/usage-logger.sh post",
        "timeout": 1000
      }]
    }]
  },
  "usage_tracking": {
    "enabled": true,
    "log_retention_days": 30,
    "log_format": "json",
    "privacy_mode": false,
    "excluded_tools": [],
    "analysis_frequency": "daily"
  }
}
```

### Privacy Options
- **privacy_mode:** Exclude sensitive parameters from logs
- **excluded_tools:** Don't log specific tools (e.g., credentials, API keys)
- **data_anonymization:** Hash user-specific data

---

## Questions to Resolve

1. **Privacy:**
   - Exclude any sensitive commands/parameters from logs?
   - Anonymize user-specific data?
   - Local storage only, or export to external analytics?

2. **Scope:**
   - Track ALL tools, or only skills/custom tools?
   - Log full parameters, or summary only?
   - Include failed tool calls, or successes only?

3. **Storage:**
   - Keep logs for 7, 30, 90 days, or forever?
   - Compress old logs to save space?
   - Export to external database (SQLite, MySQL)?

4. **Analysis:**
   - Real-time analysis, or daily/weekly batches?
   - Automatic reports via email/notification?
   - Dashboard visualization needed?

5. **Performance:**
   - Acceptable hook overhead (current: <5ms target)?
   - Log rotation strategy?
   - Maximum log file size before rotation?

---

## Future Enhancements

### Phase 4: Advanced Analytics (Optional)
1. **Machine Learning:** Predict which tools user will need next
2. **A/B Testing:** Compare efficiency of different skill approaches
3. **Trend Analysis:** Identify changing usage patterns over time
4. **Anomaly Detection:** Alert when unusual tool usage occurs

### Phase 5: Integration (Optional)
1. **GitHub Integration:** Track tool usage per repository/branch
2. **Team Analytics:** Aggregate usage across multiple developers
3. **Cost Tracking:** Calculate actual API costs and savings
4. **Performance Monitoring:** Track tool execution times over time

---

## Related Documents

- `CLI-TOOLS-USE-CASES.md` - CLI tool use cases and examples
- `TASK-CLI-TOOLS-INTEGRATION.md` - CLI tools integration plan
- `.claude/skills/*/skill.md` - Individual skill documentation
- `.claude/agents/*.md` - Agent documentation

---

## Estimated Effort

**Phase 1 (Basic Logging):** 4-6 hours
**Phase 2 (Analysis Tools):** 6-8 hours
**Phase 3 (Automation):** 4-6 hours

**Total:** 14-20 hours (2-3 days of focused work)

**Payback Period:** Estimated 1 month (time saved from pattern-based optimizations)

---

**Next Steps:**
1. Review this plan
2. Answer configuration questions
3. Approve implementation approach
4. Begin Phase 1 (hook logging setup)

---

**Created:** 2025-10-21
**Status:** Awaiting Approval
**Owner:** Development Team
