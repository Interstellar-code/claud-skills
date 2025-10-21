#!/usr/bin/env python3
"""
Synchronize version numbers across package.json and composer.json.
Updates version fields to match CHANGELOG.md version.

Usage:
    python package_version_sync.py <version>

    Example:
    python package_version_sync.py "2.3.16"

Output: JSON with operation result
"""

import json
import sys
from pathlib import Path
from typing import Dict, Optional


def update_package_json(version: str, path: str = "package.json") -> Dict:
    """
    Update version in package.json.

    Args:
        version: Version number (e.g., "2.3.16")
        path: Path to package.json

    Returns:
        {"success": true, "old_version": "2.3.9", "new_version": "2.3.16"}
    """
    try:
        file_path = Path(path)

        if not file_path.exists():
            return {
                "success": False,
                "file": path,
                "error": f"File not found: {file_path.absolute()}"
            }

        # Read current package.json
        content = file_path.read_text(encoding='utf-8')
        data = json.loads(content)

        old_version = data.get("version", "unknown")

        # Update version
        data["version"] = version

        # Write back with pretty formatting
        updated_content = json.dumps(data, indent=2, ensure_ascii=False)
        file_path.write_text(updated_content + "\n", encoding='utf-8')

        return {
            "success": True,
            "file": path,
            "old_version": old_version,
            "new_version": version,
            "message": f"Updated {path}: {old_version} → {version}"
        }

    except json.JSONDecodeError as e:
        return {
            "success": False,
            "file": path,
            "error": f"Invalid JSON in {path}: {str(e)}"
        }
    except Exception as e:
        return {
            "success": False,
            "file": path,
            "error": f"Unexpected error: {str(e)}"
        }


def update_composer_json(version: str, path: str = "composer.json") -> Dict:
    """
    Update version in composer.json (if version field exists).

    Args:
        version: Version number (e.g., "2.3.16")
        path: Path to composer.json

    Returns:
        {"success": true, "old_version": "2.3.9", "new_version": "2.3.16"}
        or {"success": true, "skipped": true, "reason": "No version field"}
    """
    try:
        file_path = Path(path)

        if not file_path.exists():
            return {
                "success": True,
                "file": path,
                "skipped": True,
                "reason": "File not found (composer.json is optional)"
            }

        # Read current composer.json
        content = file_path.read_text(encoding='utf-8')
        data = json.loads(content)

        # Check if version field exists
        if "version" not in data:
            return {
                "success": True,
                "file": path,
                "skipped": True,
                "reason": "No version field in composer.json (optional field)"
            }

        old_version = data.get("version", "unknown")

        # Update version
        data["version"] = version

        # Write back with pretty formatting (4 spaces for composer)
        updated_content = json.dumps(data, indent=4, ensure_ascii=False)
        file_path.write_text(updated_content + "\n", encoding='utf-8')

        return {
            "success": True,
            "file": path,
            "old_version": old_version,
            "new_version": version,
            "message": f"Updated {path}: {old_version} → {version}"
        }

    except json.JSONDecodeError as e:
        return {
            "success": False,
            "file": path,
            "error": f"Invalid JSON in {path}: {str(e)}"
        }
    except Exception as e:
        return {
            "success": False,
            "file": path,
            "error": f"Unexpected error: {str(e)}"
        }


def sync_package_versions(version: str) -> Dict:
    """
    Synchronize version across package.json and composer.json.

    Args:
        version: Version number to set

    Returns:
        {
            "success": true,
            "package_json": {...},
            "composer_json": {...},
            "summary": "Updated 2 files"
        }
    """
    package_result = update_package_json(version)
    composer_result = update_composer_json(version)

    # Count successfully updated files
    updated_count = 0
    if package_result.get("success") and not package_result.get("skipped"):
        updated_count += 1
    if composer_result.get("success") and not composer_result.get("skipped"):
        updated_count += 1

    skipped_count = 0
    if package_result.get("skipped"):
        skipped_count += 1
    if composer_result.get("skipped"):
        skipped_count += 1

    # Overall success if both operations succeeded (skipped counts as success)
    overall_success = package_result.get("success", False) and composer_result.get("success", False)

    summary_parts = []
    if updated_count > 0:
        summary_parts.append(f"Updated {updated_count} file(s)")
    if skipped_count > 0:
        summary_parts.append(f"Skipped {skipped_count} file(s)")

    return {
        "success": overall_success,
        "version": version,
        "package_json": package_result,
        "composer_json": composer_result,
        "files_updated": updated_count,
        "files_skipped": skipped_count,
        "summary": ", ".join(summary_parts) if summary_parts else "No files updated"
    }


def main():
    """Command-line interface."""
    if len(sys.argv) < 2:
        print(json.dumps({
            "success": False,
            "error": "Usage: package_version_sync.py <version>"
        }, indent=2))
        sys.exit(1)

    version = sys.argv[1]

    # Validate version format (basic check)
    if not version or not any(c.isdigit() for c in version):
        print(json.dumps({
            "success": False,
            "error": f"Invalid version format: {version}"
        }, indent=2))
        sys.exit(1)

    result = sync_package_versions(version)
    print(json.dumps(result, indent=2))

    # Exit with error code if failed
    sys.exit(0 if result.get("success") else 1)


if __name__ == "__main__":
    main()
