#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Display pending AgentHero AI topics on session start/resume.

This hook displays all pending and in-progress topics when Claude Code
starts or resumes from a context limit. It provides a quick overview of
work that needs attention.

Author: AgentHero AI
Version: 1.1.0

Changelog:
- v1.1.0: Added support for v2.0 topics.json format (camelCase fields)
          Added description, current phase, and last active time display
          Improved progress display for both v1 and v2 formats
- v1.0.1: Initial release
"""

import json
import os
import sys
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Any

# Fix Unicode encoding for Windows console
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except AttributeError:
        import io
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Paths
STATE_DIR = Path(".claude/agents/state/agenthero-ai")
TOPICS_FILE = STATE_DIR / "topics.json"


def format_date(iso_date: str) -> str:
    """Format ISO date to human-readable format.

    Args:
        iso_date: ISO 8601 formatted date string

    Returns:
        Formatted date string (YYYY-MM-DD HH:MM)
    """
    try:
        dt = datetime.fromisoformat(iso_date.replace('Z', '+00:00'))
        return dt.strftime("%Y-%m-%d %H:%M")
    except Exception:
        return iso_date


def get_status_icon(status: str) -> str:
    """Get icon for topic status.

    Args:
        status: Topic status (pending, in_progress, completed, etc.)

    Returns:
        Emoji icon representing the status
    """
    icons = {
        'in_progress': '🔄',
        'pending': '⏸️',
        'completed': '✅',
        'blocked': '🚫',
        'paused': '⏸️'
    }
    return icons.get(status, '📌')


def calculate_progress(topic: Dict[str, Any]) -> tuple:
    """Calculate task completion progress.

    Args:
        topic: Topic dictionary with tasks

    Returns:
        Tuple of (completed_count, total_count)
    """
    tasks = topic.get('tasks', [])
    if not tasks:
        return (0, 0)

    completed = sum(1 for t in tasks if t.get('status') == 'completed')
    total = len(tasks)
    return (completed, total)


def display_topic(topic: Dict[str, Any]) -> None:
    """Display a single topic with all its details.

    Args:
        topic: Topic dictionary to display
    """
    status = topic.get('status', 'pending')
    status_icon = get_status_icon(status)
    # Support both 'name' and 'title' fields (v1 vs v2 compatibility)
    name = topic.get('title') or topic.get('name', 'Unnamed Topic')

    # Display topic header
    print(f"\n{status_icon} {name} [{status.upper()}]")

    # Display description if available
    description = topic.get('description', '')
    if description:
        # Truncate long descriptions
        max_len = 80
        if len(description) > max_len:
            description = description[:max_len] + '...'
        print(f"   📝 {description}")

    # Display slug
    slug = topic.get('slug', 'unknown')
    print(f"   📂 Slug: {slug}")

    # Display current phase if available
    current_phase = topic.get('currentPhase')
    if current_phase:
        print(f"   🎯 Phase: {current_phase.replace('-', ' ').title()}")

    # Display creation date (support both camelCase and snake_case)
    created = topic.get('createdAt') or topic.get('created_at', 'Unknown')
    print(f"   📅 Created: {format_date(created)}")

    # Display last active time if available
    last_active = topic.get('lastActiveAt') or topic.get('last_active_at')
    if last_active and last_active != created:
        print(f"   🕐 Last Active: {format_date(last_active)}")

    # Display progress (support both v1 and v2 formats)
    # V2 format has totalTasks/completedTasks at topic level
    total_tasks = topic.get('totalTasks', 0)
    completed_tasks = topic.get('completedTasks', 0)

    # V1 format has tasks array
    if total_tasks == 0 and completed_tasks == 0:
        completed_tasks, total_tasks = calculate_progress(topic)

    if total_tasks > 0:
        percentage = int((completed_tasks / total_tasks) * 100)
        progress_bar = '█' * (percentage // 10) + '░' * (10 - (percentage // 10))
        print(f"   ✓  Progress: {completed_tasks}/{total_tasks} tasks completed ({percentage}%)")
        print(f"   {progress_bar}")
    else:
        # Show overall progress percentage if available
        progress_pct = topic.get('progress', 0)
        if progress_pct > 0:
            progress_bar = '█' * int(progress_pct / 10) + '░' * (10 - int(progress_pct / 10))
            print(f"   ✓  Progress: {int(progress_pct)}%")
            print(f"   {progress_bar}")

    # Display priority
    priority = topic.get('priority', 'normal')
    if priority in ['high', 'critical', 'urgent']:
        print(f"   🔥 Priority: {priority}")
    elif priority == 'low':
        print(f"   🔵 Priority: {priority}")


def main() -> None:
    """Main function to display pending topics."""

    # Check if topics file exists
    if not TOPICS_FILE.exists():
        print("📋 AgentHero AI: No topics found (fresh start)")
        return

    # Load topics
    try:
        with open(TOPICS_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except json.JSONDecodeError as e:
        print(f"❌ Error: Invalid JSON in topics file: {e}")
        return
    except Exception as e:
        print(f"❌ Error reading topics: {e}")
        return

    # Get all topics
    all_topics = data.get('topics', [])

    # Filter pending/in-progress topics
    pending_topics = [
        t for t in all_topics
        if t.get('status') in ['pending', 'in_progress']
    ]

    # Handle no pending topics
    if not pending_topics:
        print("✅ AgentHero AI: No pending topics")
        return

    # Display header
    count = len(pending_topics)
    print(f"\n📋 AgentHero AI: {count} pending topic{'s' if count != 1 else ''}\n")
    print("─" * 60)

    # Display each topic
    for topic in pending_topics:
        display_topic(topic)

    # Display footer with helpful commands
    print("\n" + "─" * 60)
    print("\n💡 Commands:")
    print("   • /agenthero-ai          - Interactive menu")
    print("   • /agenthero-ai --status - Show this status display")
    print("   • resume topic [slug]    - Resume a specific topic")
    print("   • show topic [slug]      - View topic details")
    print()


if __name__ == "__main__":
    main()
