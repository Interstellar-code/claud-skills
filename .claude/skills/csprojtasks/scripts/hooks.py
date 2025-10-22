#!/usr/bin/env python3
"""
Hook System for Claude Code Integration
Syncs orchestration tasks with Claude Code's native TodoWrite tool

Part of: Hierarchical Multi-Agent Orchestration System v2.1.0
"""

import json
import sys
from pathlib import Path
from typing import Dict, Any, List, Optional
from datetime import datetime

# Import utilities
from utils import log_info, log_warn, log_error, read_json_file


class OrchestrationHooks:
    """
    Manages hooks for Claude Code integration
    Syncs sub-agent tasks with Claude Code's TodoWrite tool
    """

    def __init__(self, config_path: Optional[str] = None):
        """
        Initialize hook system

        Args:
            config_path: Optional path to hooks configuration file
        """
        self.config_path = config_path or ".claude/agents/csprojecttask/hooks-config.json"
        self.config = self._load_config()
        self.active_tasks = {}  # Map task-id to Claude task index
        self.todo_list = []  # Current todo list state

    def _load_config(self) -> Dict[str, Any]:
        """Load hooks configuration"""
        default_config = {
            "enabled": True,
            "hooks": {
                "pre_task_create": True,
                "post_task_create": True,
                "task_progress_update": True,
                "task_complete": True,
                "task_error": True,
                "task_blocked": True
            },
            "progress_update_threshold": 10,  # Only update every 10% change
            "sync_to_claude_tasks": True,
            "task_prefix": "[A:orch]",  # Agent prefix for orchestrated tasks
            "verbose": False
        }

        config_file = Path(self.config_path)
        if config_file.exists():
            try:
                loaded_config = read_json_file(config_file)
                if loaded_config:
                    # Merge with defaults
                    default_config.update(loaded_config)
            except Exception as e:
                log_warn(f"Failed to load hooks config: {e}, using defaults")

        return default_config

    def is_enabled(self, hook_name: str) -> bool:
        """
        Check if a specific hook is enabled

        Args:
            hook_name: Hook name to check

        Returns:
            True if hook is enabled, False otherwise
        """
        if not self.config.get("enabled", True):
            return False

        return self.config.get("hooks", {}).get(hook_name, True)

    def _format_task_content(self, task_data: Dict[str, Any]) -> str:
        """
        Format task content for Claude Code task list

        Args:
            task_data: Task metadata

        Returns:
            Formatted task content string
        """
        prefix = self.config.get("task_prefix", "[A:orch]")
        agent_name = task_data.get('agent', 'unknown')
        description = task_data.get('description', 'Task')

        return f"{prefix} {agent_name}: {description}"

    def _format_active_form(self, message: str, progress: Optional[int] = None) -> str:
        """
        Format active form for task

        Args:
            message: Current operation message
            progress: Optional progress percentage

        Returns:
            Formatted active form string
        """
        if progress is not None:
            return f"{message} ({progress}%)"
        return message

    def _output_todo_write(self, todos: List[Dict[str, Any]]) -> None:
        """
        Output TodoWrite tool invocation for Claude Code

        This outputs a special format that Claude Code can detect and execute.

        Args:
            todos: List of todo items
        """
        # Update internal state
        self.todo_list = todos

        # Output for Claude Code to execute
        if self.config.get("sync_to_claude_tasks", True):
            # This would be the actual TodoWrite tool call
            # For now, we log what would be sent
            if self.config.get("verbose", False):
                log_info(f"📝 TodoWrite: {len(todos)} tasks")
                for i, todo in enumerate(todos):
                    status_icon = {"pending": "⏳", "in_progress": "🔄", "completed": "✅"}.get(todo['status'], "❓")
                    log_info(f"  {status_icon} [{i+1}] {todo['content']}")

    def pre_task_create(self, task_data: Dict[str, Any]) -> None:
        """
        Hook: Before creating a task
        Creates corresponding Claude Code task as "pending"

        Args:
            task_data: Task metadata (id, description, agent, focus, dependencies)
        """
        if not self.is_enabled("pre_task_create"):
            return

        task_id = task_data.get('id', 'unknown')
        content = self._format_task_content(task_data)
        active_form = self._format_active_form(f"Preparing {task_data.get('description', 'task')}")

        # Create new todo item
        new_todo = {
            "content": content,
            "status": "pending",
            "activeForm": active_form
        }

        # Add to todo list
        self.todo_list.append(new_todo)
        task_index = len(self.todo_list) - 1

        # Store mapping
        self.active_tasks[task_id] = task_index

        # Output TodoWrite
        self._output_todo_write(self.todo_list)

        log_info(f"🔗 Hook: Created Claude task for {task_id}")
        if self.config.get("verbose", False):
            log_info(f"   Content: {content}")
            log_info(f"   Status: pending")

    def post_task_create(self, task_id: str, agent_name: str, state_file: str) -> None:
        """
        Hook: After launching task
        Updates Claude task to "in_progress"

        Args:
            task_id: Task identifier
            agent_name: Agent name
            state_file: Path to state file
        """
        if not self.is_enabled("post_task_create"):
            return

        if task_id in self.active_tasks:
            task_index = self.active_tasks[task_id]

            if task_index < len(self.todo_list):
                self.todo_list[task_index]['status'] = 'in_progress'
                self.todo_list[task_index]['activeForm'] = f"{agent_name} started"

                # Output TodoWrite
                self._output_todo_write(self.todo_list)

                log_info(f"🔗 Hook: Updated Claude task {task_id} to in_progress")
                if self.config.get("verbose", False):
                    log_info(f"   Agent: {agent_name}")
                    log_info(f"   State: {state_file}")

    def task_progress_update(self, task_id: str, progress: int, message: str) -> None:
        """
        Hook: When task progress updates
        Updates Claude task with progress info (throttled by threshold)

        Args:
            task_id: Task identifier
            progress: Progress percentage (0-100)
            message: Current operation message
        """
        if not self.is_enabled("task_progress_update"):
            return

        if task_id in self.active_tasks:
            task_index = self.active_tasks[task_id]

            if task_index < len(self.todo_list):
                # Check threshold to avoid too many updates
                threshold = self.config.get("progress_update_threshold", 10)

                # Get last progress
                current_form = self.todo_list[task_index].get('activeForm', '')
                try:
                    # Extract last progress from activeForm like "Message (50%)"
                    if '(' in current_form and '%' in current_form:
                        last_progress_str = current_form.split('(')[-1].split('%')[0]
                        last_progress = int(last_progress_str)
                    else:
                        last_progress = 0
                except (ValueError, IndexError):
                    last_progress = 0

                # Only update if progress change exceeds threshold or at 100%
                if abs(progress - last_progress) >= threshold or progress == 100:
                    self.todo_list[task_index]['activeForm'] = self._format_active_form(message, progress)

                    # Output TodoWrite
                    self._output_todo_write(self.todo_list)

                    if self.config.get("verbose", False):
                        log_info(f"🔗 Hook: Progress update for {task_id}: {progress}%")
                        log_info(f"   Message: {message}")

    def task_blocked(self, task_id: str, question: str, context: str) -> None:
        """
        Hook: When task becomes blocked on a question
        Updates Claude task to show blocked status

        Args:
            task_id: Task identifier
            question: Blocking question
            context: Question context
        """
        if not self.is_enabled("task_blocked"):
            return

        if task_id in self.active_tasks:
            task_index = self.active_tasks[task_id]

            if task_index < len(self.todo_list):
                # Keep status as in_progress but update active form to show blocked
                self.todo_list[task_index]['activeForm'] = f"⚠️ BLOCKED: {question[:50]}..."

                # Output TodoWrite
                self._output_todo_write(self.todo_list)

                log_info(f"⚠️ Hook: Task {task_id} blocked")
                if self.config.get("verbose", False):
                    log_info(f"   Question: {question}")
                    log_info(f"   Context: {context}")

    def task_unblocked(self, task_id: str, answer: str) -> None:
        """
        Hook: When blocked task gets unblocked
        Updates Claude task to show it's continuing

        Args:
            task_id: Task identifier
            answer: Answer provided
        """
        if not self.is_enabled("task_blocked"):
            return

        if task_id in self.active_tasks:
            task_index = self.active_tasks[task_id]

            if task_index < len(self.todo_list):
                self.todo_list[task_index]['activeForm'] = f"✅ Unblocked, continuing work"

                # Output TodoWrite
                self._output_todo_write(self.todo_list)

                log_info(f"✅ Hook: Task {task_id} unblocked")

    def task_complete(self, task_id: str, result_summary: str, files_created: List[str]) -> None:
        """
        Hook: When task completes
        Marks Claude task as completed

        Args:
            task_id: Task identifier
            result_summary: Task result summary
            files_created: List of created files
        """
        if not self.is_enabled("task_complete"):
            return

        if task_id in self.active_tasks:
            task_index = self.active_tasks[task_id]

            if task_index < len(self.todo_list):
                self.todo_list[task_index]['status'] = 'completed'
                files_count = len(files_created)
                self.todo_list[task_index]['activeForm'] = f"Complete - {files_count} files created"

                # Output TodoWrite
                self._output_todo_write(self.todo_list)

                log_info(f"✅ Hook: Completed Claude task {task_id}")
                if self.config.get("verbose", False):
                    log_info(f"   Result: {result_summary[:100]}")
                    log_info(f"   Files: {files_count} created")

                # Remove from active tracking after short delay
                # (keep in todo list as completed)
                # del self.active_tasks[task_id]  # Keep for now to allow updates

    def task_error(self, task_id: str, error_message: str) -> None:
        """
        Hook: When task encounters error
        Updates Claude task with error status

        Args:
            task_id: Task identifier
            error_message: Error description
        """
        if not self.is_enabled("task_error"):
            return

        if task_id in self.active_tasks:
            task_index = self.active_tasks[task_id]

            if task_index < len(self.todo_list):
                # Mark as pending (or could create custom "failed" status)
                self.todo_list[task_index]['status'] = 'pending'
                self.todo_list[task_index]['activeForm'] = f"❌ Error: {error_message[:50]}"

                # Output TodoWrite
                self._output_todo_write(self.todo_list)

                log_error(f"❌ Hook: Error in Claude task {task_id}")
                if self.config.get("verbose", False):
                    log_error(f"   Error: {error_message}")

    def get_current_todos(self) -> List[Dict[str, Any]]:
        """
        Get current todo list state

        Returns:
            List of todo items
        """
        return self.todo_list.copy()


# Global hook instance (singleton pattern)
_hooks_instance: Optional[OrchestrationHooks] = None


def get_hooks() -> OrchestrationHooks:
    """
    Get global hooks instance (singleton)

    Returns:
        OrchestrationHooks instance
    """
    global _hooks_instance
    if _hooks_instance is None:
        _hooks_instance = OrchestrationHooks()
    return _hooks_instance


# Convenience functions for easy hook triggering
def trigger_pre_task_create(task_data: Dict[str, Any]) -> None:
    """Trigger pre-create hook"""
    get_hooks().pre_task_create(task_data)


def trigger_post_task_create(task_id: str, agent_name: str, state_file: str) -> None:
    """Trigger post-create hook"""
    get_hooks().post_task_create(task_id, agent_name, state_file)


def trigger_task_progress(task_id: str, progress: int, message: str) -> None:
    """Trigger progress hook"""
    get_hooks().task_progress_update(task_id, progress, message)


def trigger_task_blocked(task_id: str, question: str, context: str) -> None:
    """Trigger blocked hook"""
    get_hooks().task_blocked(task_id, question, context)


def trigger_task_unblocked(task_id: str, answer: str) -> None:
    """Trigger unblocked hook"""
    get_hooks().task_unblocked(task_id, answer)


def trigger_task_complete(task_id: str, result_summary: str, files_created: List[str]) -> None:
    """Trigger completion hook"""
    get_hooks().task_complete(task_id, result_summary, files_created)


def trigger_task_error(task_id: str, error_message: str) -> None:
    """Trigger error hook"""
    get_hooks().task_error(task_id, error_message)


if __name__ == '__main__':
    # Fix Windows console encoding
    if sys.platform == "win32":
        if sys.stdout.encoding != 'utf-8':
            import io
            sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

    # Test hook system
    print("Testing Hook System...")

    hooks = get_hooks()

    # Test task creation
    task_data = {
        'id': 'task-001',
        'agent': 'market-research-analyst',
        'description': 'Market positioning analysis',
        'focus': 'Competitive landscape'
    }

    trigger_pre_task_create(task_data)
    trigger_post_task_create('task-001', 'market-research-analyst', 'task-001.json')
    trigger_task_progress('task-001', 25, 'Identifying competitors')
    trigger_task_progress('task-001', 50, 'Analyzing positioning')
    trigger_task_progress('task-001', 75, 'Creating report')
    trigger_task_complete('task-001', 'Market analysis complete', ['report.md', 'matrix.md'])

    print("\nFinal Todo List:")
    todos = hooks.get_current_todos()
    for i, todo in enumerate(todos):
        status_map = {"pending": "PENDING", "in_progress": "RUNNING", "completed": "DONE"}
        status = status_map.get(todo['status'], todo['status'].upper())
        print(f"{i+1}. [{status}] {todo['content']}")
        print(f"   Active: {todo['activeForm']}")
