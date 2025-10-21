#!/usr/bin/env python3
"""
Analyze git changes and filter for user-facing modifications.
Returns structured JSON with categorized changes.

Usage:
    python git_analyzer.py

Output: JSON with analyzed changes
"""

import subprocess
import json
import sys
from pathlib import Path
from typing import Dict, List, Tuple


# Patterns to EXCLUDE from user-facing changelog
EXCLUDED_PATTERNS = [
    # Admin and backend
    'app/Http/Controllers/Api/Admin/',
    'app/Http/Middleware/',
    'app/Console/',
    'app/Jobs/',
    'app/Services/',
    'app/Models/',
    'resources/js/components/admin/',
    'resources/js/pages/admin/',

    # Database and infrastructure
    'database/migrations/',
    'database/seeders/',
    'database/factories/',

    # Configuration and build
    'config/',
    'scripts/',
    'bootstrap/',
    '.env',
    '.env.example',
    'package-lock.json',
    'composer.lock',
    'package.json',
    'composer.json',

    # Tests and development
    'tests/',
    'phpunit.xml',
    '.phpunit',

    # Claude and tooling
    '.claude/',
    '.github/',
    '.vscode/',
    '.idea/',
    '.clinerules/',

    # Documentation (unless user-facing)
    'docs/',
    'README.md',
    'CONTRIBUTING.md',

    # Project management
    'project-tasks/',
    'eslint-analysis.json',
    'cookies.txt',
]

# Patterns to INCLUDE (user-facing) - these override exclusions
INCLUDED_PATTERNS = [
    'resources/js/pages/app/',
    'resources/js/components/app/',
    'resources/js/hooks/',
    'app/Http/Controllers/Api/User/',
    'resources/views/',
    'resources/css/',
    'public/css/',
    'public/js/',
]


def is_user_facing(filepath: str) -> bool:
    """
    Determine if file change is user-facing.

    Priority:
    1. Explicit includes (user-facing patterns)
    2. Explicit excludes (internal patterns)
    3. Default: exclude
    """
    # Explicit includes override everything
    if any(pattern in filepath for pattern in INCLUDED_PATTERNS):
        return True

    # Explicit excludes
    if any(pattern in filepath for pattern in EXCLUDED_PATTERNS):
        return False

    # Default: exclude (conservative approach)
    return False


def categorize_change(filepath: str, status: str) -> str:
    """
    Categorize the type of change based on filepath and status.

    Returns: "feature", "bugfix", "improvement", "unknown"
    """
    filepath_lower = filepath.lower()

    # New files often indicate features
    if status in ['A', '??']:
        return "feature"

    # Bug fix indicators
    if any(word in filepath_lower for word in ['fix', 'bug', 'error', 'issue']):
        return "bugfix"

    # Improvement indicators
    if any(word in filepath_lower for word in ['improve', 'enhance', 'optimize', 'refactor']):
        return "improvement"

    # Form/UI components likely improvements or features
    if any(word in filepath_lower for word in ['form', 'modal', 'dialog', 'component']):
        return "feature"

    return "unknown"


def analyze_git_changes() -> Dict:
    """
    Analyze uncommitted git changes.

    Returns:
        {
            "success": true,
            "user_facing": [
                {"file": "file1.tsx", "status": "M", "category": "feature"},
                ...
            ],
            "excluded": ["file1.php", "file2.php", ...],
            "summary": {
                "total_changes": 70,
                "user_facing_count": 15,
                "excluded_count": 55
            },
            "recommendations": {
                "suggested_version": "patch|minor|major",
                "has_new_features": bool,
                "has_bug_fixes": bool,
                "has_breaking_changes": bool,
                "reasoning": "Explanation..."
            }
        }
    """
    try:
        # Check if in git repository
        try:
            subprocess.run(
                ['git', 'rev-parse', '--git-dir'],
                capture_output=True,
                check=True
            )
        except subprocess.CalledProcessError:
            return {
                "success": False,
                "error": "Not in a git repository"
            }

        # Get uncommitted changes
        result = subprocess.run(
            ['git', 'status', '--short'],
            capture_output=True,
            text=True,
            check=True
        )

        if not result.stdout.strip():
            return {
                "success": False,
                "error": "No uncommitted changes found"
            }

        changes = result.stdout.strip().split('\n')
        user_facing = []
        excluded = []

        for line in changes:
            if not line.strip():
                continue

            # Parse git status format: " M file.txt" or "?? file.txt" or "MM file.txt"
            parts = line.split(maxsplit=1)
            if len(parts) < 2:
                continue

            status = parts[0].strip()
            filepath = parts[1].strip()

            if is_user_facing(filepath):
                category = categorize_change(filepath, status)
                user_facing.append({
                    "file": filepath,
                    "status": status,
                    "category": category
                })
            else:
                excluded.append(filepath)

        # Analyze change types
        categories = [item["category"] for item in user_facing]
        has_new_features = categories.count("feature") > 0
        has_bug_fixes = categories.count("bugfix") > 0
        has_improvements = categories.count("improvement") > 0

        # Determine version recommendation
        if has_new_features:
            suggested = "minor"
            reasoning = f"Found {categories.count('feature')} new feature(s) - recommending MINOR version increment"
        elif has_bug_fixes:
            suggested = "patch"
            reasoning = f"Found {categories.count('bugfix')} bug fix(es) - recommending PATCH version increment"
        elif has_improvements:
            suggested = "patch"
            reasoning = f"Found {categories.count('improvement')} improvement(s) - recommending PATCH version increment"
        else:
            suggested = "patch"
            reasoning = "No clear category detected - defaulting to PATCH version increment"

        return {
            "success": True,
            "user_facing": user_facing,
            "excluded": excluded,
            "summary": {
                "total_changes": len(changes),
                "user_facing_count": len(user_facing),
                "excluded_count": len(excluded)
            },
            "recommendations": {
                "suggested_version": suggested,
                "has_new_features": has_new_features,
                "has_bug_fixes": has_bug_fixes,
                "has_breaking_changes": False,  # Would need deeper analysis
                "reasoning": reasoning
            }
        }

    except subprocess.CalledProcessError as e:
        return {
            "success": False,
            "error": f"Git command failed: {e.stderr if e.stderr else str(e)}"
        }
    except Exception as e:
        return {
            "success": False,
            "error": f"Unexpected error: {str(e)}"
        }


def main():
    """Command-line interface."""
    result = analyze_git_changes()
    print(json.dumps(result, indent=2))

    # Exit with error code if failed
    sys.exit(0 if result.get("success") else 1)


if __name__ == "__main__":
    main()
