#!/bin/bash
# Quick launcher for CS Project Tasks Menu System
# Run from Windows Terminal (Git Bash): bash cs-prj-menu.sh

cd "$(dirname "$0")"

# Detect python command (try multiple options)
PYTHON_CMD=""

# Try python3 first
if command -v python3 &> /dev/null && python3 --version &> /dev/null; then
    PYTHON_CMD="python3"
# Try python next
elif command -v python &> /dev/null && python --version &> /dev/null; then
    PYTHON_CMD="python"
# Try py launcher (Windows)
elif command -v py &> /dev/null; then
    PYTHON_CMD="py"
else
    echo "Error: Python not found. Please install Python 3."
    exit 1
fi

echo "Using Python: $PYTHON_CMD"

# Check if rich is installed
if ! $PYTHON_CMD -c "import rich" 2>/dev/null; then
    echo "Installing rich library for better UI..."
    $PYTHON_CMD -m pip install rich
fi

# Launch multi-topic dashboard (menu system)
if [ $# -eq 0 ]; then
    # Default: show interactive menu
    $PYTHON_CMD .claude/skills/csprojtasks/scripts/multi_topic_dashboard.py --interactive
else
    # Pass through arguments
    $PYTHON_CMD .claude/skills/csprojtasks/scripts/multi_topic_dashboard.py "$@"
fi
