#!/usr/bin/env python3
"""
Handle git commit and push operations.
Stages all changes, commits with formatted message, pushes to remote.

Usage:
    python commit_helper.py <version> <summary> [--no-push]

    Example:
    python commit_helper.py "2.3.15" "Browser password import feature"
    python commit_helper.py "2.3.15" "Bug fixes" --no-push

Output: JSON with operation result
"""

import subprocess
import json
import sys
from typing import Dict, Optional


def get_current_branch() -> Optional[str]:
    """Get the current git branch name."""
    try:
        result = subprocess.run(
            ['git', 'branch', '--show-current'],
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout.strip()
    except subprocess.CalledProcessError:
        return None


def commit_and_push(
    version: str,
    summary: str,
    push: bool = True
) -> Dict:
    """
    Stage all changes, commit with formatted message, optionally push to remote.

    Args:
        version: Version number (e.g., "2.3.15")
        summary: Brief summary of changes
        push: Whether to push to remote (default: True)

    Returns:
        {
            "success": true,
            "staged_files": 70,
            "commit_hash": "abc12345",
            "branch": "main",
            "pushed": true,
            "message": "..."
        }
    """
    try:
        # Get current branch
        branch = get_current_branch()
        if not branch:
            return {
                "success": False,
                "error": "Could not determine current branch"
            }

        # Stage all changes
        subprocess.run(
            ['git', 'add', '.'],
            check=True,
            capture_output=True
        )

        # Get list of staged files
        status = subprocess.run(
            ['git', 'status', '--short'],
            capture_output=True,
            text=True,
            check=True
        )

        staged_files = [
            line for line in status.stdout.split('\n')
            if line.strip() and not line.startswith('??')
        ]
        staged_count = len(staged_files)

        if staged_count == 0:
            return {
                "success": False,
                "error": "No changes to commit (working directory clean)"
            }

        # Build commit message with Claude Code attribution
        commit_msg = (
            f"Release v{version}: {summary}\n\n"
            f"🤖 Generated with [Claude Code](https://claude.com/claude-code)\n\n"
            f"Co-Authored-By: Claude <noreply@anthropic.com>"
        )

        # Commit changes
        try:
            subprocess.run(
                ['git', 'commit', '-m', commit_msg],
                capture_output=True,
                text=True,
                check=True
            )
        except subprocess.CalledProcessError as e:
            return {
                "success": False,
                "error": f"Git commit failed: {e.stderr if e.stderr else str(e)}"
            }

        # Get commit hash
        try:
            hash_result = subprocess.run(
                ['git', 'rev-parse', 'HEAD'],
                capture_output=True,
                text=True,
                check=True
            )
            commit_hash = hash_result.stdout.strip()[:8]
        except subprocess.CalledProcessError:
            commit_hash = "unknown"

        # Push to remote if requested
        pushed = False
        push_message = ""

        if push:
            try:
                push_result = subprocess.run(
                    ['git', 'push'],
                    capture_output=True,
                    text=True,
                    timeout=30
                )

                if push_result.returncode == 0:
                    pushed = True
                    push_message = f"Pushed to remote ({branch})"
                else:
                    push_message = f"Push failed: {push_result.stderr}"

            except subprocess.TimeoutExpired:
                push_message = "Push timed out after 30 seconds"
            except Exception as e:
                push_message = f"Push error: {str(e)}"
        else:
            push_message = "Push skipped (--no-push flag)"

        return {
            "success": True,
            "staged_files": staged_count,
            "commit_hash": commit_hash,
            "branch": branch,
            "pushed": pushed,
            "message": (
                f"✅ Committed {staged_count} file(s) as {commit_hash} on {branch}. "
                f"{push_message}"
            )
        }

    except subprocess.CalledProcessError as e:
        return {
            "success": False,
            "error": f"Git operation failed: {e.stderr if e.stderr else str(e)}"
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
            "error": "Usage: commit_helper.py <version> <summary> [--no-push]"
        }, indent=2))
        sys.exit(1)

    version = sys.argv[1]
    summary = sys.argv[2]
    push = '--no-push' not in sys.argv

    result = commit_and_push(version, summary, push)
    print(json.dumps(result, indent=2))

    # Exit with error code if failed
    sys.exit(0 if result.get("success") else 1)


if __name__ == "__main__":
    main()
