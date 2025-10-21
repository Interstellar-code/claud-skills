# Changelog

All notable changes to the Generic Claude Code Framework will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/Interstellar-code/claud-skills/compare/v1.4.0...HEAD
[1.4.0]: https://github.com/Interstellar-code/claud-skills/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/Interstellar-code/claud-skills/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/Interstellar-code/claud-skills/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/Interstellar-code/claud-skills/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/Interstellar-code/claud-skills/releases/tag/v1.0.0
