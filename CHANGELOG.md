# Changelog

All notable changes to the Generic Claude Code Framework will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.17.1] - 2025-10-25

### Fixed
- **Session Hook Enhancement** - Updated display_pending_topics.py to v1.1.0
  - Added support for v2.0 topics.json format (camelCase fields: title, createdAt, lastActiveAt, currentPhase)
  - Enhanced topic display with description, current phase, and last active time
  - Improved progress display compatibility for both v1 and v2 topic formats
  - Better handling of totalTasks/completedTasks fields

- **Workflow Manager CLI Fix** - Converted workflow_manager.py to use argparse
  - Fixed multi-word argument handling (error messages, descriptions with spaces)
  - Replaced manual sys.argv parsing with proper argparse subparsers
  - Improved help text and usage examples
  - Added argument validation and type checking

- **Documentation** - Updated CLAUDE.md references
  - Corrected all references from "csprojecttask" to "agenthero-ai"
  - Fixed 13 agent name references throughout documentation
  - Updated usage examples with correct agent name

### Added
- **Settings Configuration** - Added .claude/settings.json
  - Configured SessionStart and PreCompact hooks
  - Enables automatic pending topics display on session start

### Documentation
- Updated migration-state.json to reflect Phase 8 completion (Python Scripts Argparse Review)
- Validated 23 Python scripts, found and fixed 1 argparse issue

## [1.17.0] - 2025-10-25

### Added
- **Session Hooks System** - Display pending topics on Claude Code start/resume
  - Created `.claude/hooks/display_pending_topics.py` - Python hook script
  - Shows pending/in-progress topics automatically when session starts
  - Beautiful formatted output with progress bars and status icons
  - Cross-platform UTF-8 support (Windows, Linux, Mac)
  - Configured in `.claude/settings.local.json` for SessionStart and PreCompact hooks
  - Hook displays: topic name, slug, creation date, task progress (X/Y completed with %), priority
  - Added `.claude/hooks/README.md` with complete documentation

- **Agent Prefix Enforcement - Mandatory Agents** - Renamed mandatory agents to follow aghero- convention
  - Renamed `documentation-expert` → `agenthero-docs-expert`
  - Renamed `deliverables-qa-validator` → `agenthero-qa-validate`
  - Updated all agent references in settings.json and workflow_manager.py
  - Ensures all AgentHero AI-created agents follow consistent naming

### Changed
- **Agent Documentation Updates** - Updated agent.md files to reflect aghero- prefix
  - Updated single-page-website-builder agent with aghero- prefix examples
  - Updated feature-comparison-analyst, market-research-analyst, pricing-research-analyst agents
  - Updated test-agent-simple with consistent agent prefix references
  - All agents now document the mandatory aghero- prefix requirement

### Removed
- **Cleanup Completed Tasks** - Moved completed specification files to done/
  - Moved `AGENT-SETTINGS-SYSTEM.md` to `Project-tasks/done/`
  - Moved `MANDATORY-AGENTS-IMPLEMENTATION.md` to `Project-tasks/done/`
  - Moved `agenthero-ai-rebranding-spec-v2.md` to `Project-tasks/done/`
  - Deleted `TASK-HIERARCHICAL-MULTI-AGENT-ORCHESTRATION.md` (2744 lines - superseded by implementation)
  - Deleted `check-dependencies.sh` (temporary script)
  - Removed `javascript-library-developer` agent (196 lines - deprecated)

### Fixed
- **Migration State** - Updated migration-state.json with completion status
- **Settings Schema** - Updated settings.schema.json with aghero- prefix examples

### Documentation
- Created comprehensive hook system documentation in `.claude/hooks/README.md`
- Documented session hook configuration and usage
- Added troubleshooting guide for hook system
- Updated agent READMEs with aghero- prefix requirements

## [1.16.0] - 2025-10-25

### Changed
- **MAJOR REBRAND: csprojecttask → AgentHero AI** - Complete system-wide rebrand with fresh start
  - Agent renamed: `csprojecttask` → `agenthero-ai`
  - Skill renamed: `csprojtasks` → `agenthero-ai`
  - Display name: **AgentHero AI** - PM Project Orchestrator
  - All directories renamed to use `agenthero-ai` naming convention
  - All file paths and references updated throughout codebase
  - 270+ references updated across documentation and code
  - Python scripts updated with new path references
  - Configuration files synchronized (settings.json, settings.local.json)
  - Dashboard project renamed: `csprojecttask-dashboard-v2` → `agenthero-ai-dashboard-v2`

### Added
- **Agent Naming Convention - aghero- Prefix** - All agents created by AgentHero AI use standardized prefix
  - Mandatory prefix: `aghero-*` for all created agents
  - Examples: `aghero-testing-agent`, `aghero-api-builder`, `aghero-data-analyzer`
  - Distinguishes AgentHero AI-created agents from standalone agents
  - System validation enforces naming convention
  - Added `validate_agent_name()` function in workflow_manager.py
  - Documentation added to agent.md and README.md
  - Clear ownership and namespace separation

### Removed
- **Fresh Start - State Cleanup** - Complete deletion of old state files
  - Deleted entire `.claude/agents/state/csprojecttask/` directory
  - Removed 20+ JSON state files from old topics
  - Removed 9 topic directories (archived before deletion)
  - Created fresh empty state structure at `.claude/agents/state/agenthero-ai/`
  - New topics start from clean slate
  - State backups created and stored in `~/backups/agenthero-rebrand/`
  - No backward compatibility - intentional fresh start

### Fixed
- **Python Cache Cleanup** - Removed all `__pycache__` directories from old structure
- **Nested Artifact Removal** - Cleaned up incorrectly nested `.claude/` directory in scripts
- **Settings Synchronization** - Updated `.claude/settings.local.json` with new skill name

### Migration
- **BREAKING CHANGE**: All previous topics and state files deleted
- **No Migration Path**: Intentional fresh start - old topics not preserved
- **Backup Available**: State backups created before deletion at `~/backups/agenthero-rebrand/`
- **Git Safety Tag**: Created `pre-agenthero-rebrand` tag before migration
- **New Agent Prefix**: All future agents must use `aghero-` prefix (system enforced)

### Documentation
- Updated agent.md with AgentHero AI branding and aghero- prefix requirements
- Updated README.md with agent naming convention section
- Updated skill.md with new skill name and paths
- Updated all template files (topicplan, spec, orchestrated-sub-agent)
- Updated ARCHITECTURE-FLOW.md and AGENT-WORKFLOW-DIAGRAM.md
- Added migration-state.json for tracking rebrand progress

## [1.15.1] - 2025-10-25

### Added
- **Mandatory Agents Execution Layer** - Complete integration of mandatory agents system
  - Added CLI commands to workflow_manager.py: `get_mandatory_agents` and `build_handover_context`
  - Added execution instructions in agent.md for Phase 2 (select-agents step)
  - Added execution instructions in agent.md for Phase 3 (create-execution-plan step)
  - Added execution instructions in agent.md for Phase 4 (launch-agents step)
  - CLI help text updated with new mandatory agent commands
  - Complete workflow integration for auto-injection of documentation-expert and deliverables-qa-validator

- **Settings System for csprojecttask Agent** - Configuration-driven mandatory agents
  - settings.json: Feature configuration for documentation_generation and qa_validation
  - settings.schema.json: JSON schema validation for settings structure
  - settings.example.json: Example configuration for users
  - Supports enforce=true flag to make agents mandatory (cannot be skipped)
  - Handover context specifications for passing data between agents

- **Workflow Manager Enhancements** - New utility functions for mandatory agents
  - `get_mandatory_agents(settings)`: Extracts enforced agents from settings
  - `build_handover_context(topic_slug, context_spec)`: Builds context data for mandatory agents
  - 7 context extractors: all_deliverables_list, task_summaries, acceptance_criteria, technical_constraints, spec_file_path, topicplan_path, all_deliverables_paths

### Changed
- **agent.md Workflow Documentation** - Enhanced with actionable bash commands
  - Phase 2 now includes step-by-step mandatory agent injection instructions
  - Phase 3 now includes mandatory task creation instructions with dependency rules
  - Phase 4 now includes handover context building and prompt injection examples
  - Added example outputs showing [MANDATORY] markers for enforced agents

### Fixed
- **Execution Integration** - Completed missing 10% of mandatory agents implementation
  - Connected helper functions to CLI interface (previously defined but not callable)
  - Added executable workflow instructions (previously only documentation existed)
  - System now fully operational for auto-injecting mandatory agents

### Removed
- **Documentation Cleanup** - Removed obsolete documentation files
  - HOOKS-INTEGRATION-GUIDE.md (superseded by settings system)
  - INTEGRATION-COMPLETE.md (temporary release verification file)
  - MULTI-TOPIC-MANAGEMENT.md (integrated into main agent.md)
  - WORKAROUND-DELEGATION-PATTERN.md (documented in agent.md)
  - Test artifacts and completed test topics from Project-tasks/

### Impact
- ✅ **Mandatory agents now fully functional** - documentation-expert and qa-validator auto-inject
- ✅ **Settings-driven enforcement** - no code changes needed to add/remove mandatory agents
- ✅ **Complete workflow automation** - PM agent can now execute full 4-phase workflow
- ✅ **Context handover working** - mandatory agents receive all task data automatically
- ✅ **Production ready** - all execution layer components in place

## [1.15.0] - 2025-01-24

### Added
- **Documentation-Expert Integration** - Automatic documentation generation for all topics
  - Added Step 15.6: Documentation Task (MANDATORY) in csprojecttask agent
  - Added Step 17.6: Documentation Expert Prompt Template (comprehensive README generation)
  - Every topic now automatically includes documentation-expert as second-to-last task
  - QA validator enhanced to check documentation quality
  - Documentation task creates README.md with: Overview, Features, Setup, Usage, Examples, API docs

- **csprojecttask Agent Enhancements** - Workflow improvements
  - New mandatory task sequence: Features → Documentation → QA Validation
  - Documentation-expert and deliverables-qa-validator now required for all topics
  - Enhanced csprojecttask README with Standard Topic Workflow section
  - Updated all examples to show 5-task sequence (3 features + 1 doc + 1 QA)
  - Added agent registry entries for documentation-expert and deliverables-qa-validator

- **CLAUDE.md Enhanced Documentation** - Comprehensive workflow and policy additions
  - Added File Creation Policy (forbidden file types, locations, allowed documentation)
  - Added Efficient Claude Code Operations section (token optimization with Explore agent)
  - Added Efficient Markdown Operations (markdown-helper skill usage, 68% token savings)
  - Added Autonomous Skills trust policy (changelog-manager, markdown-helper)
  - Enhanced communication style guidelines (minimal commentary)

- **Project-tasks Examples** - Real-world deliverable examples
  - csprojecttask-dashboard-v2 (browser-based topic dashboard)
  - todowrite-integration-test (integration test with comprehensive README)
  - Simple calculator library integration test (documentation-expert workflow validation)

- **.gitignore** - Repository ignore rules for test files and Windows artifacts
- **test-spec-dashboard.md** - Example specification file for dashboard projects

### Changed
- **Interactive Menu Scripts** - Enhanced cs-prj-menu.bat and cs-prj-menu.sh
  - Improved cross-platform compatibility
  - Better error handling and user feedback
  - Enhanced topic navigation features

### Removed
- **Project Cleanup** - Removed completed and outdated documentation
  - RELEASE-VERIFICATION-v1.14.0.md (post-release cleanup)
  - Project-tasks/done/ completed task files
  - task-003-matrix-style-COMPLETE.md (archived)

### Impact
- ✅ **Automatic professional documentation** for every topic
- ✅ **Documentation quality assurance** via QA validator
- ✅ **Consistent documentation standards** across all projects
- ✅ **Token-efficient operations** via enhanced CLAUDE.md guidelines
- ✅ **Better user experience** with how-to guides and setup instructions

## [1.14.0] - 2025-10-23

### Added
- **Hierarchical Multi-Agent Orchestration System (csprojtasks)** - Complete PM orchestrator with sub-agent coordination
  - PM agent (csprojecttask) coordinates multiple specialist sub-agents in parallel
  - State management system with Python CLI tools (state_manager.py, topic_manager.py)
  - Interactive multi-topic dashboard with real-time progress tracking
  - Hooks integration for automatic task creation in Claude CLI sidebar
  - Workaround for Claude Code limitation (agents cannot invoke other agents)
  - 3-phase workflow: PM prepares prompts → user approves → main session executes
  - Complete orchestration template for sub-agents (orchestrated-sub-agent-template.md)

- **New Agents** - Research and development specialists
  - `single-page-website-builder` - Expert in HTML/CSS/JS single-page sites
  - `feature-comparison-analyst` - Feature set and capability analysis
  - `market-research-analyst` - Market positioning and competitive landscape
  - `pricing-research-analyst` - Pricing model and monetization strategy research

- **Professional Website Templates** - 3 production-ready landing page templates
  - Corporate Professional (blue/gray, enterprise-grade, formal style)
  - Startup Modern (gradient-heavy, vibrant, energetic with purple/pink/orange)
  - Minimalist Clean (Swiss design, typography-focused, black/white/red)
  - Each template includes: HTML, CSS, JavaScript, README, complete documentation
  - Fully responsive (mobile, tablet, desktop)
  - Vanilla JavaScript (no dependencies)

- **CLI Modern Tools Enforcement** - Mandatory pre-flight check for bash commands
  - Added visual decision tree for tool selection (find → Glob, grep → Grep, cat → Read, ls → eza)
  - Mandatory pre-flight check before EVERY bash command (cannot be bypassed)
  - Silent enforcement mechanism (no verbose announcements to user)
  - Updated CLAUDE.md with 🚨 MANDATORY PRE-FLIGHT CHECK section

### Changed
- **CLAUDE.md Communication Style** - Minimal commentary enforcement
  - Added examples of WRONG (verbose) vs CORRECT (silent) patterns
  - Prohibited announcing decision tree checks to user
  - Streamlined command execution pattern

- **Dashboard Integration** - Multi-topic menu now launches monitor-dashboard.py
  - Fixed Python subprocess call (uses sys.executable instead of "python")
  - Added missing get_topic_status() function
  - Dashboard shows 100% completion for finished tasks

### Fixed
- **State Management** - Sub-agents now properly update task states
  - Fixed missing create_state_file step in orchestration template
  - Added mandatory initialization: create_state_file → set_task_status → append_log
  - Dashboard now correctly displays completed tasks (was showing 0/3, now shows 3/3)

- **topics.json Sync** - Topic completion status properly reflected
  - Updates totalTasks, completedTasks, progress fields
  - Ensures dashboard and state files stay synchronized

### Improved
- **Tool Usage Guidelines** - Enhanced enforcement documentation
  - Added Quick Decision Tree with visual flowchart
  - Clarified when to use Glob vs find, Grep vs grep, Read vs cat
  - Added enforcement priority levels (HIGHEST, HIGH, MEDIUM)

## [1.13.0] - 2025-10-22

### Added
- **Task Prefix System** - Identify skill/agent tasks in Claude CLI
  - Added `[S:xxx]` prefix for skills, `[A:xxx]` prefix for agents (xxx = 3-letter abbreviation)
  - Automatic abbreviation generation algorithm in skill-manager.py
  - Complete mapping table added to CLAUDE.md (8 skills, 14 agents)
  - Examples: `[S:cli]` for cli-modern-tools, `[A:esf]` for eslint-fixer
  - Helps users understand which skill/agent is creating which task
  - Improves task tracking and debugging in Claude CLI interface

- **skill-manager.py Enhancements** - CLAUDE.md rule management
  - `generate_abbreviation()` method - Creates 3-letter skill/agent abbreviations
  - `discover_agents()` method - Scans generic-claude-framework/agents/ directory
  - `generate_task_prefix_mapping()` method - Builds complete prefix mapping
  - `add_claude_md_rule()` method - Adds task prefix system to CLAUDE.md
  - Special case handling for common patterns (cli, esf, sql, etc.)
  - Consonant extraction algorithm for unique abbreviations

- **New CLI Commands** - Task prefix management
  - `generate-abbreviation <name>` - Generate abbreviation for skill/agent
  - `show-task-prefixes` - Display complete mapping table
  - `add-task-prefix-rule` - Add task prefix system to CLAUDE.md
  - `remove-task-prefix-rule` - Remove task prefix system from CLAUDE.md

### Changed
- **CLAUDE.md Updated** - Task Prefix System section added
  - Complete mapping table for all skills and agents
  - Usage examples with TodoWrite
  - Rules for when to prefix tasks
  - Inserted before "Tool Usage Guidelines" section

### Improved
- **Task Tracking UX** - Better visibility in Claude CLI
  - Users can now identify which skill/agent created each task
  - Easier to debug when multiple skills/agents run concurrently
  - Consistent prefix format across all skills and agents

## [1.12.1] - 2025-10-22

### Added
- **Bash Command Attribution Pattern** - Replicated to all remaining skills
  - cli-modern-tools: Added attribution section with command examples
  - colored-output: Added attribution for color.sh script calls
  - markdown-helper: Added attribution for Node.js md-helper.js commands
  - time-helper: Added attribution for PHP time operations
  - skill-creator: Added attribution for skill creation bash commands
  - skill-manager: Added attribution for Python skill-manager.py commands
  - All skills now consistently show `🔧 [skill-name] Running: <command>` before execution

- **Communication Style Guidelines** - Added to CLAUDE.md
  - Minimal commentary when executing commands (no verbose announcements)
  - Clear rules: Skip "I'll perform...", "Let me...", "I'm going to..." prefixes
  - Only provide context when user explicitly asks or error occurs
  - Examples of correct vs incorrect command execution patterns
  - Improves user experience by reducing visual clutter

### Changed
- **Framework Synchronization** - All updated skills copied to generic-claude-framework
  - Ensures framework directory matches active .claude directory
  - Maintains consistency between local and framework versions
  - All 6 skills synchronized with bash attribution pattern

### Improved
- **Skill Documentation Consistency** - Uniform attribution pattern across all skills
  - Each skill has dedicated attribution section with examples
  - Clear "why" explanation for transparency and debugging benefits
  - Consistent formatting and structure across all skill.md files

## [1.12.0] - 2025-10-22

### Added
- **Feature Toggle System** - Fine-grained control over individual skill features
  - Added `feature_config` section to skill.md frontmatter
  - Enable/disable specific features without disabling entire skill
  - Example: Toggle bat, eza, fd, ripgrep, watchexec independently in cli-modern-tools
  - Conditional logic in skills checks feature flags before executing
  - Python backend methods: `list_features()`, `toggle_feature()`, `set_feature()`
  - CLI commands: `list-features`, `enable-feature`, `disable-feature`, `toggle-feature`
  - Advanced config view now displays feature toggles with status indicators

- **cli-modern-tools Feature Toggles** - Individual control for each tool
  - `bat: enabled/disabled` - Control cat alternative suggestions
  - `eza: enabled/disabled` - Control ls alternative suggestions
  - `fd: enabled/disabled` - Control find alternative suggestions
  - `ripgrep: enabled/disabled` - Control grep alternative (bash only)
  - `watchexec: enabled/disabled` - Control file watching suggestions
  - Each feature has fallback to traditional command when disabled

- **Bash Command Attribution** - Skill identification for all bash commands
  - Added `🔧 [skill-name] Running: <command>` prefix pattern
  - Implemented in changelog-manager skill as prototype
  - Makes it clear which skill is executing which bash command
  - Improves transparency and debugging capability

### Changed
- **skill-manager.py Enhanced** - Added 3 new methods for feature management
  - `list_features()` - Display all feature toggles for a skill
  - `toggle_feature()` - Switch feature between enabled/disabled
  - `set_feature()` - Set feature to specific state
  - Advanced config display now includes feature toggle section
  - Added 4 new CLI action choices for feature management

- **cs-skill-management Command** - Updated documentation
  - Added hybrid approach guidelines (interactive vs direct commands)
  - Token savings comparison (400 tokens interactive, 200 tokens direct)
  - Minimal LLM commentary pattern for 60% token reduction
  - Silent execution rules (no verbose commentary)

### Improved
- **Skill Behavior Control** - Users can now control actual functionality, not just metadata
  - Tags were metadata-only, feature toggles control actual behavior
  - Disabling `eza` now makes skill use `ls` instead
  - Each feature toggle changes what the skill suggests and executes
  - Real-world testing confirmed: eza disabled → ls used, eza enabled → eza used

### Documentation
- Updated cli-modern-tools.md with conditional logic for all patterns
- Added feature toggle usage examples and testing results
- Documented bash command attribution pattern for future skills
- Enhanced command documentation with token optimization strategies

## [1.11.0] - 2025-10-22

### Added
- **skill-manager Skill v1.0.0** - Comprehensive Python-based skill management system
  - Native Python script (90% token savings vs manual file operations)
  - Interactive and argument-based operation modes
  - Complete skill discovery and metadata parsing from YAML frontmatter
  - settings.local.json integration for permission management
  - **Advanced Features:**
    - Auto-activate toggle (`auto-activate <skill> --on/--off`)
    - Permission management (`add-permission`, `remove-permission`, `list-permissions`)
    - Tag management (`add-tag`, `remove-tag` for categorization)
    - Priority system (`set-priority <skill> <1-10>` for execution ordering)
    - Custom configuration (`configure <skill> <key> <value>`)
    - Advanced config view (`advanced <skill>` showing all settings)
  - 701-line Python backend with 8 comprehensive management methods
  - Full testing completed for all features
  - Copied to both `.claude/skills/` and `generic-claude-framework/skills/`

- **/cs-skill-management Command v1.1.0** - Interactive skill management command
  - Dual-mode operation: interactive menu and quick actions
  - Lists all skills with status, version, and metadata
  - Interactive prompts after list operations (enable/disable/view/exit)
  - Supports all skill-manager advanced features via command interface
  - Comprehensive documentation with usage examples
  - Copied to both `.claude/commands/` and `generic-claude-framework/commands/`

### Changed
- **colored-output Skill 1.0.0 → 1.1.0** - Version bump to reflect v1.10.0 enhancements
  - Retroactive version update for comprehensive usage guidelines added in v1.10.0
  - Minimal pattern enforcement (2-3 calls max)
  - Anti-flickering guidelines and best practices
  - Updated in both `.claude/` and `generic-claude-framework/`

- **cli-modern-tools Skill 1.0.0 → 1.1.0** - Version bump to reflect v1.10.0 enhancements
  - Retroactive version update for internal tool usage rules added in v1.10.0
  - Added Claude's Internal Tool Usage section
  - Quick reference table for Glob/Grep/Read tool replacements
  - Updated in both `.claude/` and `generic-claude-framework/`

### Documentation
- Updated SKILL_CATALOG.md with new skill-manager entry
- Added comprehensive command documentation for cs-skill-management
- All new features documented with usage examples and test results

## [1.10.1] - 2025-10-22

### Changed
- **changelog-manager Skill v2.8.0** - Explicit workflow with verification checklist
  - Added 11 explicit workflow steps (STEP 1-11) that MUST be followed in sequence
  - Each step includes clear requirements, commands, and verification
  - Added STEP 5: Generate Documentation (CRITICAL - prevents skipping doc generation)
  - Added comprehensive VERIFICATION CHECKLIST with 27 checkboxes
    - Pre-Commit Verification (15 items)
    - Commit Verification (5 items)
    - Tag & Push Verification (5 items)
    - Final Verification (4 items)
  - Added "Common Mistakes to Avoid" section documenting frequent errors
  - Workflow prevents token-saving shortcuts that skip critical steps
  - Updated version: 2.7.0 → 2.8.0

### Fixed
- **Release Workflow** - Prevented changelog-manager from being bypassed during releases
  - Fixed issue where Claude could commit skill version changes without using changelog-manager
  - Explicit steps ensure documentation generation is never skipped
  - Better to consume more tokens than miss important release steps

## [1.10.0] - 2025-10-22

### Added
- **Tool Usage Guidelines System** - CLAUDE.md enforcement for correct Claude Code tool usage
  - Added mandatory bash command replacement table (Glob, Grep, Read vs bash find/grep/cat)
  - Detection patterns for Claude to check before bash execution
  - Enforcement priority levels (HIGHEST: Glob/Grep, HIGH: Read, MEDIUM: Modern CLI)
  - Exception cases documented with justification requirements
  - Prevents bypassing token-efficient Claude Code tools
  - Cross-referenced in cli-modern-tools skill for double reinforcement

- **Colored Output Usage Guidelines** - Comprehensive guidelines to prevent screen flickering
  - Added extensive usage section to colored-output skill (+111 lines)
  - Established minimal pattern: 2-3 bash calls maximum per operation
  - DO/DON'T examples for proper colored output usage
  - Anti-pattern documentation showing flickering-causing excessive calls
  - Target metrics: Max 3-4 calls, Target 2 calls, Forbidden >5 calls
  - Pattern: Header → Regular text → Result only

- **cli-modern-tools Internal Usage Rules** - Enhanced skill with Claude's internal usage guidance
  - Added Claude's Internal Tool Usage section (+40 lines)
  - Quick reference table for tool replacements
  - Explanation of why skills don't intercept Claude's tool calls
  - Direct reference to CLAUDE.md Tool Usage Guidelines

### Changed
- **All 14 Framework Agents** - Updated to follow minimal colored output pattern
  - Added flickering prevention warning to each agent
  - Changed from excessive colored calls (10+) to minimal pattern (2-3)
  - Agents: changelog-version-manager, eslint-fixer, file-watcher-automation, log-analyzer, mockup-creation-agent, pest-test-generator, pest-test-runner, playwright-test-generator, playwright-test-healer, playwright-test-planner, task-creator, test-steps-generator, ui-design-implementer, web-app-testing-agent

- **All 7 Local Skills** - Updated with minimal colored output guidelines
  - Skills: changelog-manager, time-helper, markdown-helper, cli-modern-tools, skill-creator, template-skill, colored-output

- **All 13 Framework Skills** - Synchronized from local skill updates
  - Same as above plus framework-specific skills

- **CLAUDE.md** - Added comprehensive new sections (+137 lines)
  - Tool Usage Guidelines (CRITICAL) section
  - Colored Output Guidelines section
  - Detection patterns and enforcement rules

### Fixed
- **Screen Flickering** - Resolved excessive bash task creation in Claude CLI
  - Each `bash .claude/skills/colored-output/color.sh` call creates CLI task
  - Reduced from 10+ calls to 2-3 calls per operation
  - 70-80% reduction in visual noise and flickering

- **Bash Command Misuse** - Prevented Claude from using bash find/grep instead of Glob/Grep tools
  - Added mandatory check before bash command execution
  - Enforces token-efficient Claude Code tools
  - Prevents bypassing skill recommendations

### Documentation
- Updated `docs/COLORED_OUTPUT_TEMPLATE.md` - Rewritten with minimal pattern emphasis
- Updated `docs/COLORED_OUTPUT_SNIPPET.md` - Changed to minimal pattern examples
- Enhanced `.claude/skills/colored-output/skill.md` - Added comprehensive usage guidelines

## [1.9.0] - 2025-10-22

### Added
- **colored-output Skill v1.0.0** - Centralized colored terminal output formatter
  - Created bash script (color.sh) for ANSI color formatting with 8 message types
  - Message types: skill-header (🔧 blue), agent-header (🤖 purple), command-header (⚡ green), success (✅ green), error (❌ red), warning (⚠️ yellow), info (ℹ️ cyan), progress (▶ blue)
  - Applied to ALL 7 .claude skills: changelog-manager, colored-output, time-helper, cli-modern-tools, markdown-helper, skill-creator, template-skill
  - Applied to ALL 13 framework skills: Same as above plus sql-cli, webapp-testing, log-analysis-tools, lark-agent, lark-agent-simple
  - Applied to ALL 14 framework agents: changelog-version-manager, eslint-fixer, file-watcher-automation, log-analyzer, mockup-creation-agent, pest-test-generator, pest-test-runner, playwright-test-generator, playwright-test-healer, playwright-test-planner, task-creator, test-steps-generator, ui-design-implementer, web-app-testing-agent
  - DRY principle: Single source of truth for color formatting across entire framework
  - 615+ lines added across 31 files (5 new, 26 modified)
  - Created comprehensive documentation: COLORED_OUTPUT_TEMPLATE.md and COLORED_OUTPUT_SNIPPET.md
  - All skills and agents now use: `bash .claude/skills/colored-output/color.sh [type] "[name]" "[message]"`
  - Dramatically improved terminal readability with consistent visual hierarchy
  - Token-efficient: All color logic centralized, minimal overhead per skill/agent

### Documentation
- Created `docs/COLORED_OUTPUT_TEMPLATE.md` - Complete guide for adding colored output to any skill/agent
- Created `docs/COLORED_OUTPUT_SNIPPET.md` - Copy-paste template for quick integration
- Created `github-feature-request.md` - Feature request template for CLI-level color support (future enhancement)

## [1.8.1] - 2025-10-22

### Documentation
- **changelog-manager Skill v2.6.1** - Auto-Activation Behavior Documentation
  - Added critical documentation section explaining auto-activation behavior for Claude
  - Prevents double-triggering issue when skill auto-activates on trigger keywords
  - Clear examples of correct vs incorrect behavior patterns
  - Updated both .claude/ and generic-claude-framework/ skill files
  - Updated CLAUDE.md with auto-activation handling examples
  - Added `Bash(git tag:*)` permission to settings.local.json

## [1.8.0] - 2025-10-22

### Changed
- **changelog-manager Skill v2.6.0** - Git Command Guard (Anti-Bypass Protection)
  - **🛡️ NEW**: Automatically intercepts git commit/tag/push commands
  - Detects release indicators BEFORE command execution (version changes, multiple files, CHANGELOG edits)
  - Blocks command and asks user: "Use changelog-manager or proceed manually?"
  - Prevents accidentally bypassing proper release workflow
  - Works even when Claude operates autonomously
  - Smart detection: Only intercepts release-like commits, allows WIP/typo fixes
  - **v2.4.0**: Added README badge automation and latest release section
  - **v2.5.0**: Added automatic documentation generation integration
  - **v2.6.0**: Added git command interception guard

## [1.7.0] - 2025-10-22

### Added
- **cli-modern-tools Skill v1.1.0** - Enhanced automatic CLI command replacement
  - New `cli-wrapper.sh` script for automatic tool detection and fallback
  - Auto-replaces traditional commands: `cat`→`bat`, `ls`→`eza`, `find`→`fd`, `tree`→`eza --tree`
  - Smart fd binary detection (bypasses broken wrappers on Windows)
  - 6 activation patterns with automatic replacement logic
  - Commands: `view`, `list`, `find`, `tree`, `check`, `install`, `help`
  - Cross-platform support (Windows/Scoop, Mac/Homebrew, Linux/APT)
  - Graceful fallback to traditional tools when modern tools unavailable
  - Improved skill.md with stronger auto-activation triggers and usage examples

### Changed
- **Documentation Generator Script Enhancement**
  - Added selective update support: `--skill <name>`, `--agent <name>`, `--catalogs-only`
  - Prevents unnecessary timestamp-only changes to unrelated documentation files
  - Enables focused commits for single skill/agent updates
  - Maintains catalog consistency with selective updates

### Documentation
- Updated SKILL_CATALOG.md with cli-modern-tools v1.1.0
- Generated cli-modern-tools README.md with new wrapper script documentation
- Updated DOCUMENTATION_SYSTEM.md with selective update examples

## [1.6.0] - 2025-10-21

### Changed
- **Refactored changelog-version-manager Agent to v3.0.0-skill-integrated**
  - Now delegates to changelog-manager skill instead of Python scripts
  - Follows DRY principle with single source of truth
  - Agent provides intelligence layer (analysis, categorization, recommendations)
  - Skill handles execution layer (git operations, file updates, tagging, pushing)
  - Removed Python 3.7+ dependency requirement
  - Simplified architecture diagram showing clear separation of concerns
  - Maintains same user experience with improved maintainability

### Documentation
- Updated AGENT_CATALOG.md and SKILL_CATALOG.md with new agent description
- Auto-generated changelog-version-manager README.md with v3.0.0 architecture
- Minor updates to task-creator README.md with latest timestamp

### Architecture Improvement
- Demonstrated **Agent + Skill Integration Pattern**
  - Agents handle context-aware intelligence and decision-making
  - Skills handle execution and automation
  - Clear separation enables better testing, maintenance, and reusability
  - No breaking changes to user-facing functionality

## [1.5.0] - 2025-10-21

### Added
- **New log-analysis-tools Skill** - Comprehensive log analysis with 99.8% token savings
  - Multi-framework support (12 frameworks: Laravel, CodeIgniter 3/4, Symfony, Next.js, Express, Django, Flask, Apache, Nginx, etc.)
  - Modern CLI tools integration (lnav, fd, ripgrep, bat) with graceful fallbacks
  - Log pruning capability with gzip archival (keep today's logs, archive older)
  - Cross-platform compatibility (macOS, Linux, Windows WSL) with platform-specific install instructions
  - 7 commands: view, errors, tail, search, prune, stats, merge
  - Full bash implementation (log-tools.sh, 600+ lines) achieving 400 tokens vs 180,000 tokens
  - Framework auto-detection for seamless integration
  - Dependency checking with helpful installation guidance

- **New log-analyzer Agent** - Intelligent log analysis automation
  - Pattern analysis (frequency, timing, severity, impact scoring)
  - Root cause identification (database, filesystem, API, code issues)
  - Automated prioritization by impact score (Frequency × Severity × User Impact)
  - Specific code fix recommendations with immediate/short-term/long-term solutions
  - Validation steps and deployment guidance
  - 12x faster than manual log analysis
  - Seamless integration with log-analysis-tools skill for data extraction
  - 99%+ token efficiency by delegating extraction to skill

### Changed
- **Enhanced changelog-manager Skill** - Updated to v2.3.0
  - Conditional git tagging based on repository type (public vs private)
  - Auto-detection via package.json "private" field and GitHub remote URL
  - Better privacy controls for internal/private projects
  - Dual workflow support (tags for public repos, no tags for private repos)
  - Clear decision table and detection strategy

### Documentation
- Updated AGENT_CATALOG.md with log-analyzer agent (14 agents total)
- Updated SKILL_CATALOG.md with log-analysis-tools skill (11 skills total)
- Updated README.md with latest framework stats (99.8% token savings, 14 agents, 11 skills)
- Auto-generated individual READMEs for log-analyzer agent and log-analysis-tools skill
- Added comprehensive platform compatibility documentation for log-analysis-tools

## [1.4.0] - 2025-10-21

### Added
- **Enhanced changelog-manager Skill** - Now with mandatory git tag automation (v2.2.0)
  - Added "⚠️ CRITICAL REQUIREMENTS" section enforcing git tagging
  - Explicit documentation of annotated tag creation workflow
  - Mandatory push of both commit AND tag to remote
  - GitHub release URL confirmation in success message
  - Enhanced description to mention "git tags" explicitly
- **Comprehensive Installation Guide** - Updated QUICKSTART.md with auto-activation examples
  - New section: "How Skills & Agents Auto-Activate"
  - Table showing trigger keywords for all productivity skills
  - Real-world examples of auto-activation (markdown-helper, sql-cli, changelog-manager)
  - Emphasis on "No manual invocation needed"
- **Local Skill Installation** - Added changelog-manager to `.claude/skills/` for project use
  - Now available locally for immediate use in this repository
  - Demonstrates proper skill installation pattern for users

### Changed
- **changelog-manager Version** - Upgraded from v2.1.0 to v2.2.0
- **Framework Documentation** - Updated installation instructions to emphasize skill auto-activation
- **QUICKSTART.md** - Expanded from basic setup to comprehensive activation guide

### Improved
- **Release Workflow Reliability** - Git tagging now explicitly documented as non-optional
- **User Onboarding** - Clearer understanding of how skills activate automatically
- **Framework Completeness** - All productivity skills now properly documented with triggers

## [1.3.0] - 2025-10-21

### Added
- **Productivity Wins Framework** - New focus on simple, high-impact productivity skills
  - Created comprehensive `docs/PRODUCTIVITY_WINS.md` showcase (400+ lines)
  - ROI calculator showing 31,340 tokens/day savings, 23 min/day time savings
  - Real benchmarks from production SubsHero SaaS project
  - Competitive analysis vs. obra/superpowers, VoltAgent, awesome-claude-code
  - Positioned as ONLY framework focusing on simple daily wins
- **cli-modern-tools Skill** - Modern CLI tool alternatives with auto-suggestions
  - bat > cat (syntax highlighting, line numbers, git diff)
  - eza > ls (git status integration, icons, colors)
  - fd > find (18x faster file search)
  - watchexec for continuous automation
  - Auto-activation on traditional command keywords
  - Cross-platform support (Windows/Mac/Linux)
- **Token & Speed Badges** - New README badges showing measurable improvements
  - Token Savings: 61-88% badge
  - Speed: 5-18x faster badge

### Changed
- **Skill Count** - From 9 to 10 skills (added cli-modern-tools)
- **Framework Positioning** - Emphasized unique value: "simple productivity wins"
- **README Navigation** - Added prominent "Productivity Wins" section with star emoji
- **Documentation Focus** - Shifted from generic framework to productivity-first approach

### Improved
- **Competitive Differentiation** - Clear positioning against other frameworks
- **Measurable Value** - All productivity claims backed by real benchmarks
- **Developer ROI** - Calculated daily/monthly/annual time and token savings
- **Skill Documentation** - All productivity skills now feature detailed token/speed metrics

## [1.2.0] - 2025-10-21

### Added
- **Ecosystem Reference System** - Comprehensive directory of 13+ Claude Code repositories at `docs/ECOSYSTEM.md`
  - Auto-generated with GitHub API integration
  - Alphabetical organization with category tags
  - Installation instructions for key repositories
  - Ecosystem badge showing 13 repos in README
- **Ecosystem Generator Script** - `scripts/generate_ecosystem.py` fetches live GitHub metadata
- **Repository Curator** - `scripts/ecosystem_repos.json` with curated list of essential repositories
- **NPM Scripts** - `npm run docs:ecosystem` and `npm run docs:all` for ecosystem generation

### Changed
- **Active Skills Cleanup** - Removed 6 irrelevant skills from `.claude/skills/`:
  - Removed lark-agent and lark-agent-simple (not relevant for framework repo)
  - Removed sql-cli and webapp-testing (no database or web app in this repo)
  - Removed document-skills (docx/pdf/pptx/xlsx - not needed)
  - Removed eslint-fixer (no TypeScript/JavaScript in framework)
- **Repository URL** - Updated package.json to actual GitHub repository URL
- **Skill Count** - From 9 skills to 5 relevant skills for framework development

### Fixed
- **Catalog Table Formatting** - Fixed broken markdown tables in AGENT_CATALOG.md and SKILL_CATALOG.md
  - Descriptions with newlines were breaking table rows across multiple lines
  - Updated generator to sanitize descriptions before truncation
  - All catalogs now render properly on GitHub
- **Agent Metadata** - Fixed agent catalog generation with proper name extraction from directory names
- **Documentation Links** - Fixed remaining old links in README.md

### Improved
- **Framework Positioning** - Now serves as ecosystem discovery hub with comprehensive references
- **Documentation Quality** - Professional table rendering without formatting issues
- **Workspace Hygiene** - Clean, focused `.claude/` setup with only framework-relevant skills
- **Repository Discoverability** - Added purple ecosystem badge to README for visibility

## [1.1.0] - 2025-10-21

### Added
- **Self-Contained Agent Directories** - Each agent now has its own directory with `agent.md` (definition) and `README.md` (auto-generated documentation)
- **Self-Contained Skill Directories** - Each skill now has its own directory with complete documentation and implementation files
- **Root-Level Documentation** - Moved `docs/` to repository root for better organization and GitHub browsing

### Changed
- **Framework Structure** - Reorganized `generic-claude-framework/` to match `.claude` directory layout exactly
- **Documentation Organization** - Each agent/skill now contains its own README.md inside its directory
- **Catalog Links** - Updated all catalog links to point to new agent/skill directory structure
- **Examples Location** - Moved `examples/` into `generic-claude-framework/examples/` for better organization
- **Documentation Generator** - Updated to generate README.md files inside each agent/skill directory

### Improved
- **Discoverability** - README.md files are immediately visible when browsing agent/skill directories
- **Self-Documentation** - Each component is now self-contained with its own complete documentation
- **Deployment Ready** - Framework structure perfectly mirrors `.claude` directory for seamless deployment
- **Navigation** - Clearer separation between repository documentation (root `docs/`) and deployable framework

## [1.0.0] - 2025-10-21

### Added
- **Generic Claude Code Framework** - Complete reusable framework for Claude Code agents
- **13 Production-Ready Agents** including:
  - eslint-fixer - Ultra-fast ESLint fixing with 85% token reduction
  - mockup-creation-agent - HTML/CSS mockup generation with design system integration
  - playwright-test-generator - Automated browser test generation
  - playwright-test-healer - Systematic test debugging and fixing
  - playwright-test-planner - Comprehensive test planning
  - pest-test-generator - PHP Pest test generation
  - pest-test-runner - PHP test execution with coverage reports
  - test-steps-generator - Manual testing documentation
  - task-creator - Standardized task creation
  - ui-design-implementer - Design implementation with validation
  - web-app-testing-agent - Comprehensive web app testing
  - changelog-version-manager - Release management and versioning
  - file-watcher-automation - Automated file watching workflows
- **Example Implementations** from production SubsHero project
- **Comprehensive Documentation** including:
  - Complete README with quick start guide
  - QUICKSTART guide for 5-minute setup
  - AGENT_CATALOG with full agent reference
  - FRAMEWORK_SUMMARY with statistics and metrics
- **Configuration System** - Generic agents with clear customization points
- **Security Features** - No hardcoded credentials, environment variable support

### Improved
- **Token Efficiency** - 85% reduction in token usage for optimized agents
- **Performance** - 95% faster execution for ESLint fixing
- **Cross-Platform Support** - Windows, Mac, Linux compatibility

### Fixed
- N/A (Initial release)

[Unreleased]: https://github.com/Interstellar-code/claud-skills/compare/v1.17.1...HEAD
[1.17.1]: https://github.com/Interstellar-code/claud-skills/compare/v1.17.0...v1.17.1
[1.17.0]: https://github.com/Interstellar-code/claud-skills/compare/v1.14.0...v1.17.0
[1.14.0]: https://github.com/Interstellar-code/claud-skills/compare/v1.13.0...v1.14.0
[1.13.0]: https://github.com/Interstellar-code/claud-skills/compare/v1.12.1...v1.13.0
[1.12.1]: https://github.com/Interstellar-code/claud-skills/compare/v1.12.0...v1.12.1
[1.12.0]: https://github.com/Interstellar-code/claud-skills/compare/v1.11.0...v1.12.0
[1.11.0]: https://github.com/Interstellar-code/claud-skills/compare/v1.10.1...v1.11.0
[1.10.1]: https://github.com/Interstellar-code/claud-skills/compare/v1.10.0...v1.10.1
[1.10.0]: https://github.com/Interstellar-code/claud-skills/compare/v1.9.0...v1.10.0
[1.9.0]: https://github.com/Interstellar-code/claud-skills/compare/v1.8.1...v1.9.0
[1.8.1]: https://github.com/Interstellar-code/claud-skills/compare/v1.8.0...v1.8.1
[1.8.0]: https://github.com/Interstellar-code/claud-skills/compare/v1.7.0...v1.8.0
[1.7.0]: https://github.com/Interstellar-code/claud-skills/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/Interstellar-code/claud-skills/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/Interstellar-code/claud-skills/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/Interstellar-code/claud-skills/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/Interstellar-code/claud-skills/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/Interstellar-code/claud-skills/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/Interstellar-code/claud-skills/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/Interstellar-code/claud-skills/releases/tag/v1.0.0
