# Changelog

All notable changes to the Generic Claude Code Framework will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/Interstellar-code/claud-skills/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/Interstellar-code/claud-skills/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/Interstellar-code/claud-skills/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/Interstellar-code/claud-skills/releases/tag/v1.0.0
