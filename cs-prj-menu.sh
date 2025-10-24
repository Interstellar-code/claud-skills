#!/bin/bash
# Interactive Project Task Menu
# Navigate topics, view details, and manage orchestration
# Usage: bash cs-prj-menu.sh

# Add Scoop to PATH
if [[ -d "$HOME/scoop/shims" ]]; then
    export PATH="$HOME/scoop/shims:$PATH"
fi
if [[ -n "${USERPROFILE:-}" ]] && [[ -d "$USERPROFILE/scoop/shims" ]]; then
    export PATH="$USERPROFILE/scoop/shims:$PATH"
fi
if [[ -d "/c/Users/$USER/scoop/shims" ]]; then
    export PATH="/c/Users/$USER/scoop/shims:$PATH"
fi

set -euo pipefail

# Paths (adjusted for root folder execution)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
STATE_DIR=".claude/agents/state/csprojecttask/topics"
PYTHON_SCRIPTS=".claude/skills/csprojtasks/scripts"

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
    echo "ERROR: Python is required but not installed."
    echo "Press Enter to exit..."
    read
    exit 1
fi

# Check state_manager.py exists
if [[ ! -f "$PYTHON_SCRIPTS/state_manager.py" ]]; then
    echo "ERROR: state_manager.py not found at $PYTHON_SCRIPTS"
    echo "Press Enter to exit..."
    read
    exit 1
fi

# Colors using colored-output skill
use_colored_output() {
    if [[ -f ".claude/skills/colored-output/color.sh" ]]; then
        bash ".claude/skills/colored-output/color.sh" "$@"
    else
        # Fallback to simple echo if colored-output not available
        echo "$2"
    fi
}

# Status icons
ICON_COMPLETED="✓"
ICON_IN_PROGRESS="⟳"
ICON_PENDING="○"
ICON_BLOCKED="⚠"

# Get status icon with color
get_status_icon() {
    local status=$1
    case "$status" in
        "completed") echo -e "\033[0;32m${ICON_COMPLETED}\033[0m" ;;
        "in_progress") echo -e "\033[1;33m${ICON_IN_PROGRESS}\033[0m" ;;
        "pending") echo -e "\033[0;34m${ICON_PENDING}\033[0m" ;;
        "blocked") echo -e "\033[0;31m${ICON_BLOCKED}\033[0m" ;;
        *) echo -e "\033[2m?\033[0m" ;;
    esac
}

# Get phase display name
get_phase_name() {
    local phase=$1
    case "$phase" in
        "phase-1") echo "Phase 1: Requirements" ;;
        "phase-2") echo "Phase 2: Agent Selection" ;;
        "phase-3") echo "Phase 3: Execution Planning" ;;
        "ready-for-execution") echo "Ready for Execution" ;;
        "executing") echo "Executing" ;;
        "completed") echo "Completed" ;;
        *) echo "$phase" ;;
    esac
}

# Clear screen
clear_screen() {
    clear
    echo -ne "\033[0;0H"
}

# Print header
print_header() {
    use_colored_output agent-header "csprojecttask" "📋 Project Task Orchestration Menu"
    echo "═══════════════════════════════════════════════════════════"
    echo ""
}

# List all topics
list_topics() {
    clear_screen
    print_header

    if [[ ! -d "$STATE_DIR" ]]; then
        echo "No topics found. State directory doesn't exist."
        echo ""
        echo "Create a topic by saying:"
        echo "  \"create a topic using spec.md\""
        echo ""
        return 0
    fi

    # Count and display topics
    local count=0
    for topic_dir in "$STATE_DIR"/*; do
        if [[ -d "$topic_dir" ]]; then
            local topic_slug=$(basename "$topic_dir")
            local topic_json="$topic_dir/topic.json"

            if [[ -f "$topic_json" ]]; then
                count=$((count + 1))

                # Read metadata
                local title=$($PYTHON_CMD "$PYTHON_SCRIPTS/state_manager.py" read_state "$topic_json" ".title" 2>/dev/null || echo "$topic_slug")
                local status=$($PYTHON_CMD "$PYTHON_SCRIPTS/state_manager.py" read_state "$topic_json" ".status" 2>/dev/null || echo "unknown")
                local phase=$($PYTHON_CMD "$PYTHON_SCRIPTS/state_manager.py" read_state "$topic_json" ".currentPhase" 2>/dev/null || echo "unknown")

                # Count tasks
                local task_total=0
                local task_completed=0
                for task_file in "$topic_dir"/task-*.json; do
                    if [[ -f "$task_file" ]]; then
                        task_total=$((task_total + 1))
                        local task_status=$($PYTHON_CMD "$PYTHON_SCRIPTS/state_manager.py" read_state "$task_file" ".status" 2>/dev/null || echo "")
                        if [[ "$task_status" == "completed" ]]; then
                            task_completed=$((task_completed + 1))
                        fi
                    fi
                done

                # Display
                echo -e "[\033[1m$count\033[0m] $(get_status_icon "$status") \033[1m$title\033[0m"
                echo -e "    Slug: \033[2m$topic_slug\033[0m"
                echo -e "    Phase: $(get_phase_name "$phase")"
                echo -e "    Tasks: $task_completed/$task_total completed"
                echo ""
            fi
        fi
    done

    if [[ $count -eq 0 ]]; then
        echo "No topics found."
        echo ""
        echo "Create a topic by saying:"
        echo "  \"create a topic using spec.md\""
        echo ""
        return 0
    fi

    return $count
}

# Show topic details
show_topic_details() {
    local topic_slug=$1
    local topic_dir="$STATE_DIR/$topic_slug"
    local topic_json="$topic_dir/topic.json"

    clear_screen
    print_header

    if [[ ! -f "$topic_json" ]]; then
        echo "Topic not found: $topic_slug"
        echo ""
        return
    fi

    # Read metadata
    local title=$($PYTHON_CMD "$PYTHON_SCRIPTS/state_manager.py" read_state "$topic_json" ".title" 2>/dev/null || echo "$topic_slug")
    local status=$($PYTHON_CMD "$PYTHON_SCRIPTS/state_manager.py" read_state "$topic_json" ".status" 2>/dev/null || echo "unknown")
    local phase=$($PYTHON_CMD "$PYTHON_SCRIPTS/state_manager.py" read_state "$topic_json" ".currentPhase" 2>/dev/null || echo "unknown")
    local description=$($PYTHON_CMD "$PYTHON_SCRIPTS/state_manager.py" read_state "$topic_json" ".description" 2>/dev/null || echo "")

    echo -e "\033[0;35m\033[1m📋 Topic Details\033[0m"
    echo "═══════════════════════════════════════════════════════════"
    echo ""
    echo -e "\033[1mTitle:\033[0m $title"
    echo -e "\033[1mSlug:\033[0m $topic_slug"
    echo -e "\033[1mStatus:\033[0m $(get_status_icon "$status") $status"
    echo -e "\033[1mPhase:\033[0m $(get_phase_name "$phase")"
    if [[ -n "$description" ]]; then
        echo -e "\033[1mDescription:\033[0m $description"
    fi
    echo ""

    # File locations
    echo -e "\033[1;36m📁 File Locations\033[0m"
    echo "───────────────────────────────────────────────────────────"
    echo -e "\033[1mTopic Plan:\033[0m Project-tasks/$topic_slug/topicplan.md"
    echo -e "\033[1mSpec File:\033[0m Project-tasks/$topic_slug/spec/"
    echo -e "\033[1mDeliverables:\033[0m Project-tasks/$topic_slug/deliverables/"
    echo -e "\033[1mState Files:\033[0m $topic_dir/"
    echo ""

    # Show tasks
    echo -e "\033[1;36m🎯 Tasks\033[0m"
    echo "───────────────────────────────────────────────────────────"

    local task_count=0
    for task_file in "$topic_dir"/task-*.json; do
        if [[ -f "$task_file" ]]; then
            task_count=$((task_count + 1))

            local task_id=$(basename "$task_file" .json)
            local task_status=$($PYTHON_CMD "$PYTHON_SCRIPTS/state_manager.py" read_state "$task_file" ".status" 2>/dev/null || echo "unknown")
            local progress=$($PYTHON_CMD "$PYTHON_SCRIPTS/state_manager.py" read_state "$task_file" ".progress" 2>/dev/null || echo "0")
            local current_op=$($PYTHON_CMD "$PYTHON_SCRIPTS/state_manager.py" read_state "$task_file" ".currentOperation" 2>/dev/null || echo "")

            echo -e "$(get_status_icon "$task_status") \033[1m$task_id\033[0m [$progress%]"
            if [[ -n "$current_op" ]] && [[ "$current_op" != "null" ]]; then
                echo -e "   \033[2m$current_op\033[0m"
            fi

            # Show deliverables count
            local files_count=$($PYTHON_CMD "$PYTHON_SCRIPTS/state_manager.py" read_state "$task_file" ".filesCreated" 2>/dev/null | $PYTHON_CMD -c "import sys, json; print(len(json.load(sys.stdin)))" 2>/dev/null || echo "0")
            if [[ $files_count -gt 0 ]]; then
                echo -e "   \033[2mFiles created: $files_count\033[0m"
            fi

            echo ""
        fi
    done

    if [[ $task_count -eq 0 ]]; then
        echo "No tasks created yet for this topic."
        echo ""
    fi

    # Show next steps based on phase
    echo -e "\033[1;36m📌 Next Steps\033[0m"
    echo "───────────────────────────────────────────────────────────"
    case "$phase" in
        "phase-1")
            echo "• Review requirements in topicplan.md"
            echo "• Say 'continue' to proceed to Phase 2 (Agent Selection)"
            ;;
        "phase-2")
            echo "• Review selected agents"
            echo "• Say 'continue' to proceed to Phase 3 (Execution Planning)"
            ;;
        "phase-3")
            echo "• Review execution plan"
            echo "• Say 'continue' to approve and get ready for execution"
            ;;
        "ready-for-execution")
            echo "• Say 'go ahead' or 'launch' to execute prepared prompts"
            ;;
        "executing")
            echo "• Tasks are running, monitor progress"
            echo "• Wait for completion notifications"
            ;;
        "completed")
            echo "• Review deliverables in Project-tasks/$topic_slug/deliverables/"
            echo "• Topic is complete!"
            ;;
    esac
    echo ""
}

# Show main menu options
show_main_menu() {
    clear_screen
    print_header

    echo -e "\033[1;36mMain Menu\033[0m"
    echo "───────────────────────────────────────────────────────────"
    echo ""
    echo "  [1] 📊 View Multi-Topic Dashboard"
    echo "  [2] 📋 Browse Topics & View Details"
    echo "  [3] ✅ Run State Validation"
    echo "  [4] 🔍 Monitor Dashboard (Real-time)"
    echo "  [5] 🗑️  Delete/Archive Topics"
    echo "  [q] ❌ Quit"
    echo ""
    echo "═══════════════════════════════════════════════════════════"
    echo ""
    echo -n "Enter your choice: "
}

# Handle dashboard view
handle_dashboard() {
    clear_screen
    echo -e "\033[1;36m📊 Launching Multi-Topic Dashboard...\033[0m"
    echo ""

    if [[ -f "$PYTHON_SCRIPTS/multi_topic_dashboard.py" ]]; then
        $PYTHON_CMD "$PYTHON_SCRIPTS/multi_topic_dashboard.py"
    else
        echo -e "\033[0;31mERROR: multi_topic_dashboard.py not found\033[0m"
        echo "Expected: $PYTHON_SCRIPTS/multi_topic_dashboard.py"
    fi

    echo ""
    echo "Press Enter to return to main menu..."
    read
}

# Handle monitor dashboard
handle_monitor() {
    clear_screen
    echo -e "\033[1;36m🔍 Launching Monitor Dashboard (Real-time)...\033[0m"
    echo ""

    if [[ -f "$PYTHON_SCRIPTS/monitor-dashboard.py" ]]; then
        $PYTHON_CMD "$PYTHON_SCRIPTS/monitor-dashboard.py"
    else
        echo -e "\033[0;31mERROR: monitor-dashboard.py not found\033[0m"
        echo "Expected: $PYTHON_SCRIPTS/monitor-dashboard.py"
    fi

    echo ""
    echo "Press Enter to return to main menu..."
    read
}

# Handle validation
handle_validation() {
    clear_screen
    echo -e "\033[1;36m✅ Running State Validation...\033[0m"
    echo ""

    # Check if validation script exists
    if [[ ! -f "tests/validate-state-sync.py" ]]; then
        echo -e "\033[0;31mERROR: validate-state-sync.py not found\033[0m"
        echo "Expected: tests/validate-state-sync.py"
        echo ""
        echo "Press Enter to continue..."
        read
        return
    fi

    # List all topics and let user choose
    echo "Available topics:"
    echo ""

    local count=0
    declare -a topics
    for topic_dir in "$STATE_DIR"/*; do
        if [[ -d "$topic_dir" ]]; then
            local topic_slug=$(basename "$topic_dir")
            local topic_json="$topic_dir/topic.json"

            if [[ -f "$topic_json" ]]; then
                count=$((count + 1))
                topics[$count]="$topic_slug"

                local title=$($PYTHON_CMD "$PYTHON_SCRIPTS/state_manager.py" read_state "$topic_json" ".title" 2>/dev/null || echo "$topic_slug")
                echo "  [$count] $title"
            fi
        fi
    done

    if [[ $count -eq 0 ]]; then
        echo "No topics found."
        echo ""
        echo "Press Enter to continue..."
        read
        return
    fi

    echo ""
    echo -n "Enter topic number to validate (or 'a' for all): "
    read -r choice

    if [[ "$choice" == "a" ]] || [[ "$choice" == "A" ]]; then
        # Validate all topics
        for topic_slug in "${topics[@]}"; do
            echo ""
            echo -e "\033[1;36mValidating: $topic_slug\033[0m"
            echo "───────────────────────────────────────────────────────────"
            $PYTHON_CMD tests/validate-state-sync.py "$topic_slug"
        done
    elif [[ "$choice" =~ ^[0-9]+$ ]] && [[ $choice -ge 1 ]] && [[ $choice -le $count ]]; then
        local selected_slug="${topics[$choice]}"
        echo ""
        $PYTHON_CMD tests/validate-state-sync.py "$selected_slug"
    else
        echo "Invalid choice."
    fi

    echo ""
    echo "Press Enter to continue..."
    read
}

# Handle topic/task deletion
handle_delete_topics() {
    clear_screen
    echo -e "\033[1;36m🗑️  Delete/Archive Topics\033[0m"
    echo ""

    # List all topics
    echo "Available topics:"
    echo ""

    local count=0
    declare -a topics
    declare -a statuses
    for topic_dir in "$STATE_DIR"/*; do
        if [[ -d "$topic_dir" ]]; then
            local topic_slug=$(basename "$topic_dir")
            local topic_json="$topic_dir/topic.json"

            if [[ -f "$topic_json" ]]; then
                count=$((count + 1))
                topics[$count]="$topic_slug"

                local title=$($PYTHON_CMD "$PYTHON_SCRIPTS/state_manager.py" read_state "$topic_json" ".title" 2>/dev/null || echo "$topic_slug")
                local status=$($PYTHON_CMD "$PYTHON_SCRIPTS/state_manager.py" read_state "$topic_json" ".status" 2>/dev/null || echo "unknown")
                statuses[$count]="$status"

                local status_icon=$(get_status_icon "$status")
                echo "  [$count] $status_icon $title"
            fi
        fi
    done

    if [[ $count -eq 0 ]]; then
        echo "No topics found."
        echo ""
        echo "Press Enter to continue..."
        read
        return
    fi

    echo ""
    echo "Options:"
    echo "  [number] - Delete specific topic"
    echo "  [a] - Archive all completed topics"
    echo "  [b] - Back to main menu"
    echo ""
    echo -n "Enter choice: "
    read -r choice

    if [[ "$choice" == "b" ]] || [[ "$choice" == "B" ]]; then
        return
    fi

    if [[ "$choice" == "a" ]] || [[ "$choice" == "A" ]]; then
        # Archive completed topics
        local archived_count=0
        for i in "${!topics[@]}"; do
            if [[ "${statuses[$i]}" == "completed" ]]; then
                local slug="${topics[$i]}"
                echo ""
                echo -e "\033[1;33mArchiving: $slug\033[0m"

                # Create archive directory
                mkdir -p ".claude/agents/state/csprojecttask/archive"
                mkdir -p "Project-tasks-archive"

                # Move state files
                if [[ -d "$STATE_DIR/$slug" ]]; then
                    mv "$STATE_DIR/$slug" ".claude/agents/state/csprojecttask/archive/"
                fi

                # Move project files
                if [[ -d "Project-tasks/$slug" ]]; then
                    mv "Project-tasks/$slug" "Project-tasks-archive/"
                fi

                archived_count=$((archived_count + 1))
                echo -e "\033[0;32m✓ Archived\033[0m"
            fi
        done

        echo ""
        echo -e "\033[1;32mArchived $archived_count completed topic(s)\033[0m"
        echo ""
        echo "Press Enter to continue..."
        read
        return
    fi

    # Delete specific topic
    if [[ "$choice" =~ ^[0-9]+$ ]] && [[ $choice -ge 1 ]] && [[ $choice -le $count ]]; then
        local selected_slug="${topics[$choice]}"

        echo ""
        echo -e "\033[1;31m⚠️  WARNING: This will permanently delete:\033[0m"
        echo ""
        echo "  • Topic: $selected_slug"
        echo "  • All tasks and state files"
        echo "  • All deliverables in Project-tasks/$selected_slug/"
        echo "  • All state in .claude/agents/state/csprojecttask/topics/$selected_slug/"
        echo ""
        echo -n "Type 'DELETE' to confirm: "
        read -r confirm

        if [[ "$confirm" == "DELETE" ]]; then
            echo ""
            echo "Deleting topic..."

            # Delete project files
            if [[ -d "Project-tasks/$selected_slug" ]]; then
                rm -rf "Project-tasks/$selected_slug"
                echo -e "\033[0;32m✓ Deleted Project-tasks/$selected_slug/\033[0m"
            fi

            # Delete state files
            if [[ -d "$STATE_DIR/$selected_slug" ]]; then
                rm -rf "$STATE_DIR/$selected_slug"
                echo -e "\033[0;32m✓ Deleted $STATE_DIR/$selected_slug/\033[0m"
            fi

            echo ""
            echo -e "\033[1;32m✓ Topic deleted successfully\033[0m"
        else
            echo ""
            echo "Deletion cancelled."
        fi

        echo ""
        echo "Press Enter to continue..."
        read
    else
        echo "Invalid choice."
        echo "Press Enter to continue..."
        read
    fi
}

# Handle topic browsing (original behavior)
handle_topic_browsing() {
    while true; do
        list_topics
        local topic_count=$?

        if [[ $topic_count -eq 0 ]]; then
            echo "Press Enter to return to main menu..."
            read
            return
        fi

        echo "═══════════════════════════════════════════════════════════"
        echo ""
        echo "Enter topic number to view details, or 'b' to go back: "
        read -r choice

        if [[ "$choice" == "b" ]] || [[ "$choice" == "B" ]]; then
            return
        fi

        # Validate choice is a number
        if ! [[ "$choice" =~ ^[0-9]+$ ]]; then
            echo "Invalid choice. Press Enter to continue..."
            read
            continue
        fi

        # Get topic slug by index
        local count=0
        local selected_slug=""
        for topic_dir in "$STATE_DIR"/*; do
            if [[ -d "$topic_dir" ]]; then
                local topic_slug=$(basename "$topic_dir")
                local topic_json="$topic_dir/topic.json"

                if [[ -f "$topic_json" ]]; then
                    count=$((count + 1))
                    if [[ $count -eq $choice ]]; then
                        selected_slug="$topic_slug"
                        break
                    fi
                fi
            fi
        done

        if [[ -z "$selected_slug" ]]; then
            echo "Invalid topic number. Press Enter to continue..."
            read
            continue
        fi

        # Show topic details
        show_topic_details "$selected_slug"

        echo "═══════════════════════════════════════════════════════════"
        echo ""
        echo "Actions:"
        echo "  [1] View topic plan (topicplan.md)"
        echo "  [2] View deliverables folder"
        echo "  [3] View state files"
        echo "  [4] Delete this topic"
        echo "  [b] Back to topic list"
        echo ""
        echo "Enter choice: "
        read -r action

        case "$action" in
            1)
                local topicplan_path="Project-tasks/$selected_slug/topicplan.md"
                if [[ -f "$topicplan_path" ]]; then
                    # Use bat for syntax highlighting if available
                    if command -v bat &> /dev/null; then
                        bat "$topicplan_path"
                    else
                        cat "$topicplan_path"
                    fi
                    echo ""
                    echo "Press Enter to continue..."
                    read
                else
                    echo "Topic plan not found at $topicplan_path"
                    echo "Press Enter to continue..."
                    read
                fi
                ;;
            2)
                local deliverables_path="Project-tasks/$selected_slug/deliverables"
                if [[ -d "$deliverables_path" ]]; then
                    echo ""
                    echo "Deliverables in $deliverables_path:"
                    echo ""
                    if command -v eza &> /dev/null; then
                        eza --long --git "$deliverables_path"
                    else
                        ls -lh "$deliverables_path"
                    fi
                    echo ""
                    echo "Press Enter to continue..."
                    read
                else
                    echo "Deliverables folder not found"
                    echo "Press Enter to continue..."
                    read
                fi
                ;;
            3)
                local state_path="$STATE_DIR/$selected_slug"
                echo ""
                echo "State files in $state_path:"
                echo ""
                if command -v eza &> /dev/null; then
                    eza --long --git "$state_path"
                else
                    ls -lh "$state_path"
                fi
                echo ""
                echo "Press Enter to continue..."
                read
                ;;
            4)
                # Delete current topic
                echo ""
                echo -e "\033[1;31m⚠️  WARNING: This will permanently delete:\033[0m"
                echo ""
                echo "  • Topic: $selected_slug"
                echo "  • All tasks and state files"
                echo "  • All deliverables in Project-tasks/$selected_slug/"
                echo "  • All state in $STATE_DIR/$selected_slug/"
                echo ""
                echo -n "Type 'DELETE' to confirm: "
                read -r confirm

                if [[ "$confirm" == "DELETE" ]]; then
                    # Delete project files
                    if [[ -d "Project-tasks/$selected_slug" ]]; then
                        rm -rf "Project-tasks/$selected_slug"
                        echo -e "\033[0;32m✓ Deleted Project-tasks/$selected_slug/\033[0m"
                    fi

                    # Delete state files
                    if [[ -d "$STATE_DIR/$selected_slug" ]]; then
                        rm -rf "$STATE_DIR/$selected_slug"
                        echo -e "\033[0;32m✓ Deleted $STATE_DIR/$selected_slug/\033[0m"
                    fi

                    echo ""
                    echo -e "\033[1;32m✓ Topic deleted successfully\033[0m"
                    echo ""
                    echo "Press Enter to return to topic list..."
                    read
                    break  # Exit to topic list
                else
                    echo "Deletion cancelled."
                    echo "Press Enter to continue..."
                    read
                fi
                ;;
            b|B)
                continue
                ;;
            *)
                echo "Invalid choice. Press Enter to continue..."
                read
                ;;
        esac
    done
}

# Main menu
main_menu() {
    while true; do
        show_main_menu
        read -r choice

        case "$choice" in
            1)
                handle_dashboard
                ;;
            2)
                handle_topic_browsing
                ;;
            3)
                handle_validation
                ;;
            4)
                handle_monitor
                ;;
            5)
                handle_delete_topics
                ;;
            q|Q)
                clear_screen
                echo "Goodbye!"
                exit 0
                ;;
            *)
                echo ""
                echo "Invalid choice. Press Enter to continue..."
                read
                ;;
        esac
    done
}

# Run main menu
main_menu
