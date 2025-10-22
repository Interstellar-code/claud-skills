#!/usr/bin/env python3
"""
Topic Manager - Topic lifecycle management
Part of: Hierarchical Multi-Agent Orchestration System v2.0.0 (Python)
"""

import sys
import argparse
import shutil
from pathlib import Path
from typing import Dict, List, Optional

# Import utilities
from utils import (
    log_info, log_warn, log_error,
    timestamp_iso, atomic_write, ensure_directory,
    read_json_file, update_json_field, slugify,
    validate_json
)


STATE_DIR = Path(".claude/agents/state/csprojecttask")
TOPICS_DIR = STATE_DIR / "topics"
ARCHIVE_DIR = STATE_DIR / "archive"
TOPICS_FILE = STATE_DIR / "topics.json"


def init_topics_registry() -> None:
    """Initialize topics registry if it doesn't exist"""
    if not TOPICS_FILE.exists():
        ensure_directory(STATE_DIR)
        ensure_directory(TOPICS_DIR)
        ensure_directory(ARCHIVE_DIR)
        atomic_write(TOPICS_FILE, {"active": [], "completed": []})
        log_info("Initialized topics registry")


def create_topic(title: str, description: str = "") -> Optional[str]:
    """
    Create new topic

    Args:
        title: Topic title
        description: Optional topic description

    Returns:
        Topic slug if successful, None otherwise
    """
    init_topics_registry()

    slug = slugify(title)
    topic_dir = TOPICS_DIR / slug
    timestamp = timestamp_iso()

    # Check if topic already exists
    if topic_dir.exists():
        log_error(f"Topic already exists: {slug}")
        return None

    # Create topic directory
    ensure_directory(topic_dir)

    # Create topic metadata
    topic_json = topic_dir / "topic.json"
    topic_data = {
        "slug": slug,
        "title": title,
        "description": description,
        "status": "in_progress",
        "createdAt": timestamp,
        "lastActiveAt": timestamp,
        "completedAt": None,
        "userRequest": title,
        "tags": [],
        "relatedFiles": [],
        "tokenUsage": {
            "total": 0,
            "pmAgent": 0,
            "subAgents": {},
            "estimated": 0,
            "savings": 0,
            "savingsPercent": 0
        }
    }

    atomic_write(topic_json, topic_data)

    # Create PM state
    pm_state = topic_dir / "pm-state.json"
    pm_data = {
        "topicSlug": slug,
        "sessionId": f"sess_{timestamp.replace(':', '').replace('-', '').replace('+', '')}",
        "userRequest": title,
        "tasks": [],
        "overallStatus": "in_progress",
        "completedTasks": 0,
        "totalTasks": 0,
        "createdAt": timestamp,
        "tokenUsage": {
            "pmTokens": 0,
            "subAgentTokens": 0,
            "totalTokens": 0
        }
    }

    atomic_write(pm_state, pm_data)

    # Create messages queue
    messages_file = topic_dir / "messages.json"
    atomic_write(messages_file, [])

    # Add to topics registry
    registry_data = read_json_file(TOPICS_FILE)
    if registry_data is None:
        return None

    registry_entry = {
        "slug": slug,
        "title": title,
        "status": "in_progress",
        "createdAt": timestamp,
        "lastActiveAt": timestamp,
        "totalTasks": 0,
        "completedTasks": 0,
        "progress": 0,
        "tokens": {
            "total": 0,
            "pmAgent": 0,
            "subAgents": 0,
            "estimated": 0,
            "savings": "0%"
        }
    }

    registry_data["active"].append(registry_entry)
    atomic_write(TOPICS_FILE, registry_data)

    log_info(f"Created topic: {slug}")
    return slug


def list_active_topics() -> List[Dict]:
    """
    List all active topics

    Returns:
        List of active topic dicts
    """
    init_topics_registry()

    data = read_json_file(TOPICS_FILE)
    if data is None or 'active' not in data:
        return []

    return data['active']


def get_topic_status(slug: str) -> Optional[Dict]:
    """
    Get topic status

    Args:
        slug: Topic slug

    Returns:
        Topic dict or None if not found
    """
    topic_json = TOPICS_DIR / slug / "topic.json"

    if not topic_json.exists():
        log_error(f"Topic not found: {slug}")
        return None

    return read_json_file(topic_json)


def touch_topic(slug: str) -> bool:
    """
    Update topic last active time

    Args:
        slug: Topic slug

    Returns:
        True if successful, False otherwise
    """
    topic_json = TOPICS_DIR / slug / "topic.json"
    timestamp = timestamp_iso()

    if not topic_json.exists():
        log_error(f"Topic not found: {slug}")
        return False

    # Update topic metadata
    if not update_json_field(topic_json, ".lastActiveAt", timestamp):
        return False

    # Update registry
    registry_data = read_json_file(TOPICS_FILE)
    if registry_data is None:
        return False

    for topic in registry_data.get("active", []):
        if topic["slug"] == slug:
            topic["lastActiveAt"] = timestamp
            break

    atomic_write(TOPICS_FILE, registry_data)
    log_info(f"Updated topic activity: {slug}")
    return True


def update_topic_progress(slug: str) -> bool:
    """
    Update topic progress based on completed tasks

    Args:
        slug: Topic slug

    Returns:
        True if successful, False otherwise
    """
    pm_state = TOPICS_DIR / slug / "pm-state.json"

    if not pm_state.exists():
        log_error(f"PM state not found for topic: {slug}")
        return False

    pm_data = read_json_file(pm_state)
    if pm_data is None:
        return False

    completed = pm_data.get("completedTasks", 0)
    total = pm_data.get("totalTasks", 0)
    progress = (completed * 100 // total) if total > 0 else 0

    # Update topic metadata
    topic_json = TOPICS_DIR / slug / "topic.json"
    update_json_field(topic_json, ".progress", progress)

    # Update registry
    registry_data = read_json_file(TOPICS_FILE)
    if registry_data is None:
        return False

    for topic in registry_data.get("active", []):
        if topic["slug"] == slug:
            topic["progress"] = progress
            topic["completedTasks"] = completed
            topic["totalTasks"] = total
            break

    atomic_write(TOPICS_FILE, registry_data)
    log_info(f"Updated topic progress: {slug} ({progress}%)")
    return True


def archive_topic(slug: str) -> bool:
    """
    Archive completed topic

    Args:
        slug: Topic slug

    Returns:
        True if successful, False otherwise
    """
    topic_dir = TOPICS_DIR / slug
    archive_dir = ARCHIVE_DIR / slug

    if not topic_dir.exists():
        log_error(f"Topic not found: {slug}")
        return False

    # Ensure archive directory exists
    ensure_directory(ARCHIVE_DIR)

    try:
        # Move topic to archive
        shutil.move(str(topic_dir), str(archive_dir))

        # Update topics registry
        registry_data = read_json_file(TOPICS_FILE)
        if registry_data is None:
            # Rollback
            shutil.move(str(archive_dir), str(topic_dir))
            return False

        # Find topic in active list
        topic_entry = None
        active_topics = []
        for topic in registry_data.get("active", []):
            if topic["slug"] == slug:
                topic_entry = topic.copy()
                topic_entry["status"] = "completed"
                topic_entry["completedAt"] = timestamp_iso()
            else:
                active_topics.append(topic)

        registry_data["active"] = active_topics
        if topic_entry:
            registry_data["completed"].append(topic_entry)

        if not atomic_write(TOPICS_FILE, registry_data):
            # Rollback
            shutil.move(str(archive_dir), str(topic_dir))
            return False

        log_info(f"Archived topic: {slug}")
        return True

    except Exception as e:
        log_error(f"Failed to archive topic: {e}")
        # Attempt rollback
        if archive_dir.exists() and not topic_dir.exists():
            shutil.move(str(archive_dir), str(topic_dir))
        return False


def resume_topic(slug: str) -> Optional[Dict]:
    """
    Resume topic (update last active and return status)

    Args:
        slug: Topic slug

    Returns:
        Topic dict or None if failed
    """
    topic_dir = TOPICS_DIR / slug

    if not topic_dir.exists():
        log_error(f"Topic not found: {slug}")
        return None

    # Touch topic to update last active
    touch_topic(slug)

    # Return topic status
    return get_topic_status(slug)


def get_active_topics_summary() -> Optional[str]:
    """
    Get summary of active topics for session start

    Returns:
        Summary string or None if no active topics
    """
    init_topics_registry()

    data = read_json_file(TOPICS_FILE)
    if data is None:
        return None

    active = data.get("active", [])
    if not active:
        return None

    summary = [f"Found {len(active)} active topic(s):"]
    for topic in active:
        title = topic.get("title", "Unknown")
        progress = topic.get("progress", 0)
        completed = topic.get("completedTasks", 0)
        total = topic.get("totalTasks", 0)
        summary.append(f"  • {title} ({progress}% complete, {completed}/{total} tasks)")

    return "\n".join(summary)


def complete_topic(slug: str) -> bool:
    """
    Mark topic as completed

    Args:
        slug: Topic slug

    Returns:
        True if successful, False otherwise
    """
    topic_json = TOPICS_DIR / slug / "topic.json"
    timestamp = timestamp_iso()

    if not topic_json.exists():
        log_error(f"Topic not found: {slug}")
        return False

    # Update topic metadata
    update_json_field(topic_json, ".status", "completed")
    update_json_field(topic_json, ".completedAt", timestamp)
    update_json_field(topic_json, ".progress", 100)

    # Update PM state
    pm_state = TOPICS_DIR / slug / "pm-state.json"
    update_json_field(pm_state, ".overallStatus", "completed")

    log_info(f"Marked topic as completed: {slug}")

    # Archive after completion
    return archive_topic(slug)


def delete_topic(slug: str, force: bool = False) -> bool:
    """
    Delete topic (use with caution)

    Args:
        slug: Topic slug
        force: If True, skip confirmation

    Returns:
        True if successful, False otherwise
    """
    topic_dir = TOPICS_DIR / slug

    if not topic_dir.exists():
        log_error(f"Topic not found: {slug}")
        return False

    if not force:
        response = input(f"Are you sure you want to delete topic '{slug}'? (yes/no): ")
        if response.lower() != "yes":
            log_info("Topic deletion cancelled")
            return False

    # Remove from registry
    registry_data = read_json_file(TOPICS_FILE)
    if registry_data is None:
        return False

    registry_data["active"] = [
        t for t in registry_data.get("active", [])
        if t["slug"] != slug
    ]

    atomic_write(TOPICS_FILE, registry_data)

    # Delete directory
    shutil.rmtree(topic_dir)

    log_info(f"Deleted topic: {slug}")
    return True


def main():
    """Main CLI entry point"""
    parser = argparse.ArgumentParser(
        description="Topic Manager - Topic lifecycle management"
    )
    subparsers = parser.add_subparsers(dest='command', help='Command to execute')

    # create_topic
    p = subparsers.add_parser('create_topic', help='Create new topic')
    p.add_argument('title', help='Topic title')
    p.add_argument('description', nargs='?', default='', help='Topic description')

    # list_active_topics
    subparsers.add_parser('list_active_topics', help='List all active topics')

    # get_topic_status
    p = subparsers.add_parser('get_topic_status', help='Get topic status')
    p.add_argument('slug', help='Topic slug')

    # touch_topic
    p = subparsers.add_parser('touch_topic', help='Update last active time')
    p.add_argument('slug', help='Topic slug')

    # update_topic_progress
    p = subparsers.add_parser('update_topic_progress', help='Update topic progress')
    p.add_argument('slug', help='Topic slug')

    # archive_topic
    p = subparsers.add_parser('archive_topic', help='Archive completed topic')
    p.add_argument('slug', help='Topic slug')

    # resume_topic
    p = subparsers.add_parser('resume_topic', help='Resume topic')
    p.add_argument('slug', help='Topic slug')

    # get_active_topics_summary
    subparsers.add_parser('get_active_topics_summary', help='Get summary for session')

    # complete_topic
    p = subparsers.add_parser('complete_topic', help='Mark as completed')
    p.add_argument('slug', help='Topic slug')

    # delete_topic
    p = subparsers.add_parser('delete_topic', help='Delete topic')
    p.add_argument('slug', help='Topic slug')
    p.add_argument('--force', action='store_true', help='Skip confirmation')

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        return 1

    # Execute command
    if args.command == 'create_topic':
        slug = create_topic(args.title, args.description)
        if slug:
            print(slug)
            return 0
        return 1

    elif args.command == 'list_active_topics':
        topics = list_active_topics()
        if topics:
            for topic in topics:
                print(f"{topic['slug']} | {topic['title']} | {topic['progress']}% | "
                      f"{topic['completedTasks']}/{topic['totalTasks']} tasks")
        else:
            print("No active topics")
        return 0

    elif args.command == 'get_topic_status':
        status = get_topic_status(args.slug)
        if status:
            import json
            print(json.dumps(status, indent=2))
            return 0
        return 1

    elif args.command == 'touch_topic':
        return 0 if touch_topic(args.slug) else 1

    elif args.command == 'update_topic_progress':
        return 0 if update_topic_progress(args.slug) else 1

    elif args.command == 'archive_topic':
        return 0 if archive_topic(args.slug) else 1

    elif args.command == 'resume_topic':
        status = resume_topic(args.slug)
        if status:
            import json
            print(json.dumps(status, indent=2))
            return 0
        return 1

    elif args.command == 'get_active_topics_summary':
        summary = get_active_topics_summary()
        if summary:
            print(summary)
            return 0
        return 1

    elif args.command == 'complete_topic':
        return 0 if complete_topic(args.slug) else 1

    elif args.command == 'delete_topic':
        return 0 if delete_topic(args.slug, args.force) else 1

    else:
        log_error(f"Unknown command: {args.command}")
        return 1


if __name__ == '__main__':
    sys.exit(main())
