---
name: changelog-manager
description: Update project changelog with uncommitted changes, synchronize package versions, and create version releases with automatic commit and push
version: 2.0.0
author: Claude Code
tags: [changelog, versioning, git, release-management, package-management]
---

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

### 6. Git Operations

Commit Process:
- Stage all changes (including CHANGELOG.md, package.json, composer.json)
- Create comprehensive commit message including version updates
- Push to remote repository
- Verify successful completion

## Version History

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
