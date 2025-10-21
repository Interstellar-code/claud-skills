#!/usr/bin/env python3
"""
Append new changelog entry to CHANGELOG.md.
Takes structured JSON input, writes formatted entry.

Usage:
    python changelog_writer.py <version> '<changes_json>'

    Example:
    python changelog_writer.py "2.3.15" '{"Added": ["Feature 1"], "Fixed": ["Bug 1"]}'

Output: JSON with operation result
"""

import json
import sys
import re
from datetime import date
from pathlib import Path
from typing import Dict, List


def write_changelog_entry(
    version: str,
    changes: Dict[str, List[str]],
    changelog_path: str = "CHANGELOG.md"
) -> Dict:
    """
    Append new changelog entry to CHANGELOG.md.

    Args:
        version: Version number (e.g., "2.3.15")
        changes: Dictionary with categories as keys:
            {
                "Added": ["Feature 1", "Feature 2"],
                "Changed": ["Change 1"],
                "Fixed": ["Bug fix 1"],
                "Improved": ["Improvement 1"]
            }
        changelog_path: Path to CHANGELOG.md

    Returns:
        {
            "success": true,
            "message": "...",
            "version": "2.3.15",
            "entry_length": 123,
            "categories_added": ["Added", "Fixed"]
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

        # Build new entry
        today = date.today().strftime('%Y-%m-%d')
        new_entry = f"## [{version}] - {today}\n\n"

        categories_added = []

        # Standard changelog categories in order
        for category in ["Added", "Changed", "Fixed", "Improved", "Removed", "Deprecated", "Security"]:
            if category in changes and changes[category]:
                items = changes[category]
                if items:  # Only add if there are actual items
                    new_entry += f"### {category}\n"
                    for item in items:
                        # Ensure item doesn't already have bullet point
                        item_text = item.strip()
                        if not item_text.startswith('-'):
                            item_text = f"- {item_text}"
                        else:
                            item_text = f"- {item_text[1:].strip()}"
                        new_entry += f"{item_text}\n"
                    new_entry += "\n"
                    categories_added.append(category)

        if not categories_added:
            return {
                "success": False,
                "error": "No changelog entries provided"
            }

        # Find insertion point (after header, before first version)
        # Expected format:
        # # Changelog
        #
        # Description...
        #
        # ## [version] - date

        match = re.search(r'(## \[\d+\.\d+\.\d+\])', content)

        if match:
            # Insert before first version entry
            insert_pos = match.start()
            new_content = content[:insert_pos] + new_entry + content[insert_pos:]
        else:
            # No existing version entries - append to end
            new_content = content.rstrip() + "\n\n" + new_entry

        # Write back to file
        path.write_text(new_content, encoding='utf-8')

        return {
            "success": True,
            "message": f"Successfully added version {version} to {changelog_path}",
            "version": version,
            "entry_length": len(new_entry),
            "categories_added": categories_added
        }

    except json.JSONDecodeError as e:
        return {
            "success": False,
            "error": f"Invalid JSON format in changes: {str(e)}"
        }
    except Exception as e:
        return {
            "success": False,
            "error": f"Unexpected error: {str(e)}"
        }


def main():
    """Command-line interface."""
    if len(sys.argv) < 3:
        print(json.dumps({
            "success": False,
            "error": "Usage: changelog_writer.py <version> '<changes_json>'"
        }, indent=2))
        sys.exit(1)

    version = sys.argv[1]

    try:
        changes = json.loads(sys.argv[2])
    except json.JSONDecodeError as e:
        print(json.dumps({
            "success": False,
            "error": f"Invalid JSON in changes argument: {str(e)}"
        }, indent=2))
        sys.exit(1)

    changelog_path = sys.argv[3] if len(sys.argv) > 3 else "CHANGELOG.md"

    result = write_changelog_entry(version, changes, changelog_path)
    print(json.dumps(result, indent=2))

    # Exit with error code if failed
    sys.exit(0 if result.get("success") else 1)


if __name__ == "__main__":
    main()
