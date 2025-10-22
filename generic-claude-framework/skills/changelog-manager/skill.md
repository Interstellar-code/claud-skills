---
name: changelog-manager
description: Update project changelog with uncommitted changes, synchronize package versions, and create version releases with automatic commit, conditional git tags, and push
version: 2.4.0
author: Claude Code
tags: [changelog, versioning, git, release-management, package-management, git-tags, conditional-tagging, readme-automation]
auto-activate: true
---

# 🤖 **AUTO-ACTIVATION TRIGGERS**

**This skill AUTOMATICALLY activates when Claude detects ANY of these keywords or phrases:**

### 🎯 **Release & Version Keywords**
- "update changelog"
- "prepare release"
- "create release"
- "bump version"
- "new version"
- "release v" or "version v" (e.g., "release v1.2.3")
- "major release" / "minor release" / "patch release"
- "ready to release"
- "push to production"
- "tag release"

### 📝 **Changelog Keywords**
- "update the changelog"
- "add to changelog"
- "document changes"
- "changelog entry"
- "version history"

### 🚀 **Git Keywords**
- "create git tag"
- "tag version"
- "push release"
- "release to github"

### 💡 **Natural Language Triggers**
- "I'm done with [feature], update changelog"
- "Finished implementing [feature], prepare release"
- "Ready to push these changes"
- "Let's release this"
- "Can you update the changelog?"

**When activated, Claude will:**
1. ✅ Analyze all uncommitted changes
2. ✅ Generate changelog entries automatically
3. ✅ Determine appropriate version bump (patch/minor/major)
4. ✅ Update CHANGELOG.md, package.json, README.md badges
5. ✅ Commit all changes with comprehensive message
6. ✅ **Create annotated git tag with version number (MANDATORY)**
7. ✅ **Push both commit AND tag to remote repository**
8. ✅ Confirm successful release with GitHub URL

**No manual invocation needed!** Just mention any release-related intent.

## ⚠️ CONDITIONAL REQUIREMENTS

### Git Tag Creation - Context-Aware Decision

**Git tags are CONDITIONAL based on project type:**

#### ✅ CREATE GIT TAGS (Public/Open-Source Projects):
- **Public GitHub repositories**
- **Open-source projects** with contributors
- **Published packages** (npm, composer, PyPI)
- **Framework/library releases**
- **Projects with semantic versioning requirements**

**Why tags are essential here:**
- GitHub Releases page for users
- Package registry integration (npm, composer)
- Semantic versioning tracking for consumers
- Rollback capabilities for public releases
- CI/CD triggers for automated publishing
- Version history integrity for contributors

#### ❌ SKIP GIT TAGS (Private/Internal Projects):
- **Private repositories** for internal use
- **Client projects** without public releases
- **Internal tools** and automation scripts
- **Prototype/experimental projects**
- **Projects without external consumers**

**Why tags may not be needed:**
- No public release process
- Internal versioning sufficient
- CHANGELOG.md + package.json enough
- Reduces git history noise
- Simpler workflow for internal teams

### 🎯 Detection Strategy

**Auto-detect project type by checking:**
```bash
# 1. Check if remote is public GitHub
git remote -v | grep "github.com" && check if repo is public

# 2. Check for package registry files
- package.json with "private": false → Public npm package → USE TAGS
- composer.json with public packagist → USE TAGS
- pyproject.toml with PyPI config → USE TAGS

# 3. Check repository visibility
- GitHub API: Check if repo.private === false → USE TAGS
- GitLab/Bitbucket: Check visibility settings

# 4. Ask user if unclear
"This appears to be a [public/private] project. Should I create git tags for releases? (Y/n)"
```

### 📋 Decision Table

| Project Type | Git Tags | Example |
|--------------|----------|---------|
| **Public GitHub repo** | ✅ YES | Open-source framework (this repo) |
| **Published npm package** | ✅ YES | React library on npm registry |
| **Public composer package** | ✅ YES | Laravel package on Packagist |
| **Private client project** | ❌ NO | Custom website for client |
| **Internal SaaS** | ❌ NO | Company's private application |
| **Prototype/experiment** | ❌ NO | Testing new architecture |
| **Unclear/ambiguous** | ❓ ASK | User confirms preference |

# Changelog Manager Skill

A comprehensive skill for managing project changelogs, package version synchronization, semantic versioning, and automated release workflows.

---

## 🎯 **Interactive Menu**

**If no specific command is provided, show this menu:**

```
📋 Changelog Manager - Interactive Mode
=======================================

🚀 What would you like to do?

🔹 Option 1: Update Changelog with Uncommitted Changes
   Usage: /changelog-manager "update changelog"
   Usage: /changelog-manager "prepare release"
   Analyzes uncommitted changes and updates changelog with new version

🔹 Option 2: Create Specific Version
   Usage: /changelog-manager "release v1.2.4"
   Usage: /changelog-manager "major release" (bumps to next major version)
   Usage: /changelog-manager "minor release" (bumps to next minor version)
   Creates specific version with custom entries

🔹 Option 3: Review Current Changes
   Usage: /changelog-manager "review changes"
   Shows what would be added to changelog without committing

📝 Version Types:
• Patch (default): Bug fixes and minor improvements (1.2.3 → 1.2.4)
• Minor: New features, non-breaking changes (1.2.3 → 1.3.0)
• Major: Breaking changes, major updates (1.2.3 → 2.0.0)

💡 Examples:
• /changelog-manager "I've finished the new subscription filtering feature, update changelog"
• /changelog-manager "Ready to release v1.5.0"
• /changelog-manager "Review what changes would be included"

🔒 Security & Privacy:
========================
✅ Automatically filters out admin/backend changes
✅ Excludes technical implementation details
✅ Only includes user-facing improvements
✅ Removes sensitive information from changelog

⚙️  Workflow:
========================
1. 📊 Analyze uncommitted git changes
2. 🔍 Filter out admin/internal changes
3. 📝 Generate user-friendly changelog entries
4. 📈 Determine version increment (patch/minor/major)
5. ✍️  Update CHANGELOG.md
6. 📦 Update package.json version
7. 📦 Update composer.json version (if exists)
8. 💾 Commit ALL changes (including updated package files)
9. 🚀 Push to remote repository
```

---

## Overview

This skill automates the complete changelog update and version release process for SubsHero, ensuring:
- **User-focused changelog entries** (no technical jargon)
- **Privacy-first approach** (no internal details exposed)
- **Semantic versioning compliance**
- **Automatic package version synchronization** (package.json + composer.json)
- **Automated git commit and push workflow**

## Capabilities

### 🔍 **Change Analysis**
- Analyze uncommitted changes using git status and diff
- Identify modified, added, and deleted files
- Understand code changes and their user impact
- Filter out admin and internal changes automatically

### 🔒 **Privacy & Security**
**Automatically excludes from public changelog:**
- Admin panel improvements and backend tools
- Database migrations and schema changes
- API endpoints and middleware updates
- Configuration and environment changes
- Logging, debugging, and monitoring tools
- Authentication and security updates
- Deployment scripts and infrastructure
- Test improvements and code refactoring

**Only includes in changelog:**
- New user-facing features
- UI/UX improvements
- Bug fixes affecting user experience
- Performance improvements users can notice
- Integration with new platforms

### 📊 **Version Management**
- **Patch increment** (default): 1.2.3 → 1.2.4
- **Minor increment**: 1.2.3 → 1.3.0
- **Major increment**: 1.2.3 → 2.0.0
- Automatic version detection from CHANGELOG.md
- Semantic versioning compliance

### ✍️ **Changelog & Package Version Updates**
- Standard changelog format (Keep a Changelog)
- Organized by change type:
  - **Added**: New features
  - **Changed**: Modifications to existing features
  - **Fixed**: Bug fixes
  - **Improved**: Performance and UX improvements
- User-friendly, non-technical language
- Clear dates and version numbers
- **Automatic package version synchronization**:
  - Updates package.json version field
  - Updates composer.json version field (if exists)
  - Ensures all version numbers align with CHANGELOG.md

### 🚀 **Git Automation**
- Stage ALL uncommitted files
- Create comprehensive commit messages
- Push changes to remote repository
- Verify successful completion
- Detailed operation summary

## Workflow Steps

### 5. Package Version Synchronization

**CRITICAL: Version Alignment Across All Package Files**

After updating CHANGELOG.md, the skill MUST update package version numbers to maintain consistency.

#### 5.1 Update package.json
- Read current package.json
- Update version field to match CHANGELOG.md version
- Example: "version": "2.3.9" → "version": "2.3.10"

#### 5.2 Update composer.json (if version field exists)
- Read current composer.json
- Check if version field exists (OPTIONAL)
- If exists, update to match CHANGELOG.md version
- Note: composer.json version field may not exist

**Important Notes**:
- composer.json version field is OPTIONAL - only update if it exists
- package.json version field is REQUIRED - always update
- Both files MUST match the CHANGELOG.md version number
- Version format: semantic versioning (MAJOR.MINOR.PATCH)

### 6. README.md Badge Updates

**Automatic Badge & Release Section Synchronization**

After updating version in CHANGELOG.md and package.json, update README.md:

#### 6.1 Update Version Badge

- Search for version badge pattern: `[![Version](https://img.shields.io/badge/version-X.X.X-orange)]`
- Update version number to match new release
- Ensures README displays correct version at all times

Example:
```markdown
# Before
[![Version](https://img.shields.io/badge/version-1.1.0-orange)](CHANGELOG.md)

# After
[![Version](https://img.shields.io/badge/version-1.2.0-orange)](CHANGELOG.md)
```

#### 6.2 Update Agent/Skill Count Badges

**Automatic Count Calculation:**

Count actual agents and skills in framework directories:

```bash
# Count agents (directories in generic-claude-framework/agents/)
AGENT_COUNT=$(find generic-claude-framework/agents -maxdepth 1 -type d ! -name agents | wc -l)

# Count skills (directories in generic-claude-framework/skills/)
SKILL_COUNT=$(find generic-claude-framework/skills -maxdepth 1 -type d ! -name skills | wc -l)
```

Update badges with calculated counts:

```markdown
# Before
[![Agents](https://img.shields.io/badge/agents-14-blue)](docs/AGENT_CATALOG.md)
[![Skills](https://img.shields.io/badge/skills-11-green)](docs/SKILL_CATALOG.md)

# After (if counts changed)
[![Agents](https://img.shields.io/badge/agents-15-blue)](docs/AGENT_CATALOG.md)
[![Skills](https://img.shields.io/badge/skills-12-green)](docs/SKILL_CATALOG.md)
```

**Why Auto-Calculate?**
- Always accurate (no manual updates needed)
- Reflects current framework state
- Prevents badge drift from reality

#### 6.3 Add/Update Latest Release Section

**Create "Latest Release" Section:**

Insert after badges, before main content (after line with badges, before "## 🎯 What is This?"):

```markdown
<details open>
<summary><b>📦 Latest Release: v1.7.0 (2025-10-22)</b></summary>

### Added
- cli-modern-tools Skill v1.1.0 with automatic command replacement
  - New cli-wrapper.sh script for auto-detection and fallback
  - Auto-replaces: cat→bat, ls→eza, find→fd, tree→eza --tree

### Changed
- Documentation generator now supports selective updates
  - New flags: --skill <name>, --agent <name>, --catalogs-only

[View Full Changelog →](CHANGELOG.md)
</details>
```

**Extraction Logic:**

1. Parse CHANGELOG.md to find latest version entry
2. Extract content between `## [X.X.X] - YYYY-MM-DD` and next `##`
3. Format into collapsible `<details>` block
4. Replace existing "Latest Release" section or insert if missing

**Benefits:**
- Users see latest changes immediately on GitHub
- Collapsible to keep README clean
- Auto-extracted from CHANGELOG (single source of truth)
- Always shows current version

### 7. Git Operations

**Complete Release Workflow:**

1. **Stage All Changes**
   ```bash
   git add CHANGELOG.md package.json README.md [composer.json if exists]
   ```

2. **Create Comprehensive Commit**
   ```bash
   git commit -m "Release vX.X.X - [Brief summary]

   ## Version X.X.X

   Updated CHANGELOG.md, package.json, and README.md to reflect version X.X.X.

   ### Highlights
   [Key changes from changelog]

   🤖 Generated with [Claude Code](https://claude.com/claude-code)

   Co-Authored-By: Claude <noreply@anthropic.com>"
   ```

3. **Create Git Tag**
   ```bash
   git tag -a vX.X.X -m "Release vX.X.X - [Brief summary]"
   ```

4. **Push to Remote**
   ```bash
   git push origin main && git push origin vX.X.X
   ```

5. **Verify Success**
   - Confirm commit pushed successfully
   - Confirm tag created on remote
   - Provide GitHub release URL

## 🎬 **COMPLETE AUTOMATED WORKFLOW**

**When user says: "update changelog" or "prepare release"**

### Step 1: Analyze Changes
- Run `git status` to find uncommitted changes
- Run `git diff` to understand code changes
- Run `git log --oneline -5` to see recent commit patterns

### Step 2: Intelligent Version Bump Detection

**Automatic Detection Rules:**
- **MAJOR bump** (X.0.0) if:
  - User says "major release" OR "breaking changes"
  - CHANGELOG mentions "BREAKING" or "Breaking Changes"
  - Files deleted or major refactoring detected

- **MINOR bump** (X.Y.0) if:
  - User says "minor release" OR "new feature"
  - New directories/files created
  - Significant additions detected (>100 lines added)
  - CHANGELOG mentions "Added" or "New Feature"

- **PATCH bump** (X.Y.Z) if:
  - User says "patch release" OR "bug fix"
  - Only modifications to existing files
  - Small changes (<100 lines)
  - CHANGELOG mentions "Fixed" or "Bug Fix"
  - **DEFAULT if unclear**

### Step 3: Generate Changelog Entry

**Structure:**
```markdown
## [X.X.X] - YYYY-MM-DD

### Added
- [New features based on git diff analysis]

### Changed
- [Modifications based on git diff analysis]

### Fixed
- [Bug fixes based on git diff analysis]

### Improved
- [Performance/UX improvements]
```

**Content Analysis:**
- Parse git diff for file changes
- Identify new files → "Added" section
- Identify modified files → "Changed" section
- Look for "fix" in commit messages → "Fixed" section
- Look for "improve" → "Improved" section

### Step 4: Update All Version Files

**Files to Update (in order):**
1. `CHANGELOG.md` - Add new version entry
2. `package.json` - Update "version" field
3. `README.md` - Update version badge
4. `composer.json` - Update "version" field (if exists)

**Version Link Updates (CHANGELOG.md bottom):**
```markdown
[Unreleased]: https://github.com/USER/REPO/compare/vX.X.X...HEAD
[X.X.X]: https://github.com/USER/REPO/compare/vX.Y.Z...vX.X.X
```

### Step 5: Detect Project Type & Decide on Git Tags

**Auto-Detection Process:**
```bash
# 1. Check package.json for "private" field
PRIVATE=$(cat package.json | grep '"private": true')

# 2. Check git remote for public GitHub
GITHUB_PUBLIC=$(git remote -v | grep "github.com")

# 3. Decision logic
if [[ -z "$PRIVATE" && -n "$GITHUB_PUBLIC" ]]; then
    USE_TAGS=true   # Public GitHub repo → Use tags
else
    USE_TAGS=false  # Private/internal → Skip tags
fi
```

**Ask user if unclear:**
```
"This project appears to be [public/private]. Should I create git tags for this release? (Y/n)"
```

### Step 6: Git Commit & Conditional Release

**Single Atomic Commit:**
```bash
# Stage all version-related files
git add CHANGELOG.md package.json README.md composer.json

# Commit with detailed message
git commit -m "Release vX.X.X - [Summary]

## Version X.X.X

Updated CHANGELOG.md, package.json, and README.md to reflect version X.X.X.

### Highlights
[Top 3 changes from changelog]

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

**Conditional Git Tag (Public Projects Only):**
```bash
# IF project is public/open-source
if [[ "$USE_TAGS" == true ]]; then
    # Create annotated tag
    git tag -a vX.X.X -m "Release vX.X.X - [Summary]"

    # Push both commit and tag
    git push origin main && git push origin vX.X.X
else
    # Private project - only push commit
    git push origin main
fi
```

### Step 7: Confirm & Report

**Success Message (Public Project with Tags):**
```
✅ Release v1.2.0 Complete!

📋 Updated Files:
- CHANGELOG.md (added v1.2.0 entry)
- package.json (1.1.0 → 1.2.0)
- README.md (version badge updated)

🏷️  Git Tag: v1.2.0 created
🚀 Pushed to: origin/main

🔗 View on GitHub:
https://github.com/USER/REPO/releases/tag/v1.2.0

📝 Summary:
- Added: [Count] new features
- Changed: [Count] improvements
- Fixed: [Count] bug fixes
```

**Success Message (Private Project without Tags):**
```
✅ Release v1.2.0 Complete!

📋 Updated Files:
- CHANGELOG.md (added v1.2.0 entry)
- package.json (1.1.0 → 1.2.0)
- README.md (version badge updated)

🚀 Pushed to: origin/main

📝 Summary:
- Added: [Count] new features
- Changed: [Count] improvements
- Fixed: [Count] bug fixes

💡 Note: Git tags skipped (private project)
```

## 🔄 **INTEGRATION WITH COMMIT WORKFLOW**

**Proactive Auto-Detection:**

Claude should **automatically invoke this skill** when:

1. **After Making Code Changes**: User completes task and says:
   - "I'm done"
   - "Finished implementing [feature]"
   - "All done with [task]"
   - **→ Claude asks: "Would you like me to update the changelog and create a release?"**

2. **Before Major Commits**: User has significant uncommitted changes
   - **→ Claude suggests: "I notice you have significant changes. Should I prepare a changelog entry?"**

3. **User Mentions Release Intent**:
   - Any of the trigger keywords detected
   - **→ Claude automatically activates changelog-manager**

**Example Conversation:**
```
User: "I've finished adding the ecosystem reference feature"

Claude: "Great! I notice you have uncommitted changes. Would you like me to:
1. Update the changelog with these changes
2. Bump the version (this looks like a minor release)
3. Create a git tag and push to GitHub?

This will create version 1.2.0 based on the ecosystem reference feature."

User: "Yes, do it"

Claude: [Automatically invokes changelog-manager skill]
→ Analyzes changes
→ Updates CHANGELOG.md with v1.2.0
→ Updates package.json to 1.2.0
→ Updates README.md badge
→ Commits all changes
→ Creates git tag v1.2.0
→ Pushes to GitHub
→ Reports success
```

## Version History

### v2.1.0
- **AUTO-ACTIVATION**: Skill now automatically activates on release keywords
- **COMPLETE WORKFLOW**: Added comprehensive 6-step automated workflow
- **README BADGE SYNC**: Automatically updates version badges in README.md
- **GIT TAG AUTOMATION**: Creates and pushes git tags automatically
- **INTELLIGENT VERSION DETECTION**: Analyzes changes to suggest MAJOR/MINOR/PATCH
- **PROACTIVE SUGGESTIONS**: Claude asks about changelog when task completed
- **COMPREHENSIVE DOCS**: Detailed workflow steps and integration examples

### v2.0.0
- BREAKING: Now automatically updates package.json and composer.json versions
- Added package version synchronization feature
- Enhanced commit messages to include package file updates
- Improved version mismatch detection and resolution

### v1.0.0
- Initial release
- Automatic change analysis and filtering
- User-focused changelog generation
- Semantic versioning support
- Automated git commit and push

## Support

For issues or questions:
- Ensure git repository is initialized
- Verify CHANGELOG.md exists (will be created if missing)
- Verify package.json exists (will be created if missing)
- Ensure package.json and composer.json are valid JSON
