# Changelog

All notable changes to the Generic Claude Code Framework will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/yourusername/claude-code-framework/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/yourusername/claude-code-framework/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/yourusername/claude-code-framework/releases/tag/v1.0.0
