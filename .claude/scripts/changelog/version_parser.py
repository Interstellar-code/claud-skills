#!/usr/bin/env python3
"""
Parse CHANGELOG.md and determine next version number.
Minimal token usage - returns only what's needed.

Usage:
    python version_parser.py [changelog_path]

Output: JSON with version information
"""

import re
import sys
import json
from pathlib import Path
from typing import Dict, Optional


def get_latest_version(changelog_path: str = "CHANGELOG.md") -> Dict:
    """
    Parse changelog and return latest version info.

    Args:
        changelog_path: Path to CHANGELOG.md file

    Returns:
        {
            "current_version": "2.3.14",
            "current_date": "2025-10-14",
            "next_patch": "2.3.15",
            "next_minor": "2.4.0",
            "next_major": "3.0.0",
            "last_entry_preview": "First 200 chars...",
            "success": true
        }

        Or on error:
        {
            "success": false,
            "error": "Error message"
        }
    """
    try:
        path = Path(changelog_path)

        if not path.exists():
            return {
                "success": False,
                "error": f"CHANGELOG.md not found at {path.absolute()}"
            }

        content = path.read_text(encoding='utf-8')

        # Find first version entry: ## [X.Y.Z] - YYYY-MM-DD
        match = re.search(
            r'## \[(\d+)\.(\d+)\.(\d+)\] - (\d{4}-\d{2}-\d{2})',
            content
        )

        if not match:
            return {
                "success": False,
                "error": "No version found in CHANGELOG.md (expected format: ## [X.Y.Z] - YYYY-MM-DD)"
            }

        major = int(match.group(1))
        minor = int(match.group(2))
        patch = int(match.group(3))
        date = match.group(4)
        current = f"{major}.{minor}.{patch}"

        # Extract last entry preview (next 200 chars after version line)
        entry_start = match.end()
        preview = content[entry_start:entry_start + 200].strip()
        # Clean up preview - remove extra whitespace and newlines
        preview = ' '.join(preview.split())

        return {
            "success": True,
            "current_version": current,
            "current_date": date,
            "next_patch": f"{major}.{minor}.{patch + 1}",
            "next_minor": f"{major}.{minor + 1}.0",
            "next_major": f"{major + 1}.0.0",
            "last_entry_preview": preview
        }

    except Exception as e:
        return {
            "success": False,
            "error": f"Unexpected error: {str(e)}"
        }


def main():
    """Command-line interface."""
    changelog_path = sys.argv[1] if len(sys.argv) > 1 else "CHANGELOG.md"
    result = get_latest_version(changelog_path)
    print(json.dumps(result, indent=2))

    # Exit with error code if failed
    sys.exit(0 if result.get("success") else 1)


if __name__ == "__main__":
    main()
