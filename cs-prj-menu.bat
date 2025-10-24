@echo off
REM Interactive Project Task Menu (Windows)
REM Navigate topics, view details, and manage orchestration
REM Usage: cs-prj-menu.bat

setlocal enabledelayedexpansion

REM Paths (adjusted for root folder execution)
set SCRIPT_DIR=%~dp0
set STATE_DIR=.claude\agents\state\csprojecttask\topics
set PYTHON_SCRIPTS=.claude\skills\csprojtasks\scripts

REM Check Python availability
where python >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is required but not installed.
    pause
    exit /b 1
)

REM Check state_manager.py exists
if not exist "%PYTHON_SCRIPTS%\state_manager.py" (
    echo ERROR: state_manager.py not found at %PYTHON_SCRIPTS%
    pause
    exit /b 1
)

REM Colors (using ANSI escape codes for Windows 10+)
set "BOLD=[1m"
set "DIM=[2m"
set "RESET=[0m"
set "RED=[0;31m"
set "GREEN=[0;32m"
set "YELLOW=[1;33m"
set "BLUE=[0;34m"
set "CYAN=[0;36m"
set "MAGENTA=[0;35m"

REM Enable ANSI colors in Windows
reg add HKCU\Console /v VirtualTerminalLevel /t REG_DWORD /d 1 /f >nul 2>&1

:main_menu
cls
call :print_header

echo %CYAN%%BOLD%Main Menu%RESET%
echo ───────────────────────────────────────────────────────────
echo.
echo   [1] 📊 View Multi-Topic Dashboard
echo   [2] 📋 Browse Topics ^& View Details
echo   [3] ✅ Run State Validation
echo   [4] 🔍 Monitor Dashboard (Real-time)
echo   [5] 🗑️  Delete/Archive Topics
echo   [q] ❌ Quit
echo.
echo ═══════════════════════════════════════════════════════════
echo.
set /p choice="Enter your choice: "

if "%choice%"=="1" goto handle_dashboard
if "%choice%"=="2" goto handle_topic_browsing
if "%choice%"=="3" goto handle_validation
if "%choice%"=="4" goto handle_monitor
if "%choice%"=="5" goto handle_delete_topics
if /i "%choice%"=="q" goto quit

echo Invalid choice.
pause
goto main_menu

:quit
cls
echo Goodbye!
exit /b

:handle_dashboard
cls
echo %CYAN%📊 Launching Multi-Topic Dashboard...%RESET%
echo.

if exist "%PYTHON_SCRIPTS%\multi_topic_dashboard.py" (
    python "%PYTHON_SCRIPTS%\multi_topic_dashboard.py"
) else (
    echo %RED%ERROR: multi_topic_dashboard.py not found%RESET%
    echo Expected: %PYTHON_SCRIPTS%\multi_topic_dashboard.py
)

echo.
echo Press any key to return to main menu...
pause >nul
goto main_menu

:handle_monitor
cls
echo %CYAN%🔍 Launching Monitor Dashboard (Real-time)...%RESET%
echo.

if exist "%PYTHON_SCRIPTS%\monitor-dashboard.py" (
    python "%PYTHON_SCRIPTS%\monitor-dashboard.py"
) else (
    echo %RED%ERROR: monitor-dashboard.py not found%RESET%
    echo Expected: %PYTHON_SCRIPTS%\monitor-dashboard.py
)

echo.
echo Press any key to return to main menu...
pause >nul
goto main_menu

:handle_validation
cls
echo %CYAN%✅ Running State Validation...%RESET%
echo.

if not exist "tests\validate-state-sync.py" (
    echo %RED%ERROR: validate-state-sync.py not found%RESET%
    echo Expected: tests\validate-state-sync.py
    echo.
    pause
    goto main_menu
)

echo Available topics:
echo.

set topic_count=0
for /d %%D in ("%STATE_DIR%\*") do (
    if exist "%%D\topic.json" (
        set /a topic_count+=1
        for /f "delims=" %%T in ('python "%PYTHON_SCRIPTS%\state_manager.py" read_state "%%D\topic.json" ".title" 2^>nul') do (
            echo   [!topic_count!] %%T
        )
    )
)

if %topic_count%==0 (
    echo No topics found.
    echo.
    pause
    goto main_menu
)

echo.
set /p val_choice="Enter topic number to validate (or 'a' for all): "

if /i "%val_choice%"=="a" (
    REM Validate all topics
    for /d %%D in ("%STATE_DIR%\*") do (
        if exist "%%D\topic.json" (
            set "slug=%%~nxD"
            echo.
            echo %CYAN%Validating: !slug!%RESET%
            echo ───────────────────────────────────────────────────────────
            python tests\validate-state-sync.py "!slug!"
        )
    )
) else (
    REM Validate single topic
    set /a validate=%val_choice% 2>nul
    if !validate!==%val_choice% (
        set current=0
        for /d %%D in ("%STATE_DIR%\*") do (
            if exist "%%D\topic.json" (
                set /a current+=1
                if !current!==%val_choice% (
                    set "selected_slug=%%~nxD"
                    echo.
                    python tests\validate-state-sync.py "!selected_slug!"
                    goto validation_done
                )
            )
        )
    ) else (
        echo Invalid choice.
    )
)

:validation_done
echo.
pause
goto main_menu

:handle_delete_topics
cls
echo %CYAN%%BOLD%🗑️  Delete/Archive Topics%RESET%
echo.

REM List all topics with status
set topic_count=0
for /d %%D in ("%STATE_DIR%\*") do (
    if exist "%%D\topic.json" (
        set /a topic_count+=1
        set "topic_slug_!topic_count!=%%~nxD"

        for /f "delims=" %%T in ('python "%PYTHON_SCRIPTS%\state_manager.py" read_state "%%D\topic.json" ".title" 2^>nul') do set "title_!topic_count!=%%T"
        for /f "delims=" %%S in ('python "%PYTHON_SCRIPTS%\state_manager.py" read_state "%%D\topic.json" ".status" 2^>nul') do set "status_!topic_count!=%%S"

        call :get_status_icon "!status_%topic_count%!" icon
        echo   [!topic_count!] !icon! !title_%topic_count%!
    )
)

if %topic_count%==0 (
    echo No topics found.
    echo.
    pause
    goto main_menu
)

echo.
echo   [a] Archive all completed topics
echo   [b] Back to main menu
echo.
set /p del_choice="Enter topic number to delete, or option: "

if /i "%del_choice%"=="b" goto main_menu

REM Archive all completed topics
if /i "%del_choice%"=="a" (
    echo.
    echo %YELLOW%Archiving completed topics...%RESET%
    set archived_count=0

    for /l %%i in (1,1,%topic_count%) do (
        if "!status_%%i!"=="completed" (
            set "slug=!topic_slug_%%i!"
            echo Archiving: !slug!

            REM Create archive directories
            if not exist ".claude\agents\state\csprojecttask\archive" mkdir ".claude\agents\state\csprojecttask\archive"
            if not exist "Project-tasks-archive" mkdir "Project-tasks-archive"

            REM Move state files
            if exist "%STATE_DIR%\!slug!" (
                move "%STATE_DIR%\!slug!" ".claude\agents\state\csprojecttask\archive\" >nul
            )

            REM Move project files
            if exist "Project-tasks\!slug!" (
                move "Project-tasks\!slug!" "Project-tasks-archive\" >nul
            )

            set /a archived_count+=1
            echo %GREEN%✓ Archived%RESET%
        )
    )

    echo.
    echo Archived !archived_count! topic(s)
    echo.
    pause
    goto main_menu
)

REM Delete specific topic
set /a validate=%del_choice% 2>nul
if !validate!==%del_choice% (
    if %del_choice% geq 1 if %del_choice% leq %topic_count% (
        set "selected_slug=!topic_slug_%del_choice%!"

        echo.
        echo %RED%%BOLD%⚠️  WARNING: This will permanently delete:%RESET%
        echo.
        echo   • Topic: !selected_slug!
        echo   • All tasks and state files
        echo   • All deliverables in Project-tasks\!selected_slug!\
        echo   • All state in %STATE_DIR%\!selected_slug!\
        echo.
        set /p confirm="Type 'DELETE' to confirm: "

        if "!confirm!"=="DELETE" (
            REM Delete project files
            if exist "Project-tasks\!selected_slug!" (
                rd /s /q "Project-tasks\!selected_slug!"
                echo %GREEN%✓ Deleted Project-tasks\!selected_slug!\%RESET%
            )

            REM Delete state files
            if exist "%STATE_DIR%\!selected_slug!" (
                rd /s /q "%STATE_DIR%\!selected_slug!"
                echo %GREEN%✓ Deleted %STATE_DIR%\!selected_slug!\%RESET%
            )

            echo.
            echo %GREEN%%BOLD%✓ Topic deleted successfully%RESET%
            echo.
        ) else (
            echo Deletion cancelled.
            echo.
        )

        pause
        goto main_menu
    )
)

echo Invalid choice.
pause
goto main_menu

:handle_topic_browsing
cls
call :print_header

if not exist "%STATE_DIR%" (
    echo No topics found. State directory doesn't exist.
    echo.
    pause
    goto main_menu
)

REM List topics
set topic_count=0
for /d %%D in ("%STATE_DIR%\*") do (
    if exist "%%D\topic.json" (
        set /a topic_count+=1
        set "topic_dir=%%D"
        set "topic_slug=%%~nxD"

        REM Read topic metadata using Python
        for /f "delims=" %%T in ('python "%PYTHON_SCRIPTS%\state_manager.py" read_state "%%D\topic.json" ".title" 2^>nul') do set "title=%%T"
        for /f "delims=" %%S in ('python "%PYTHON_SCRIPTS%\state_manager.py" read_state "%%D\topic.json" ".status" 2^>nul') do set "status=%%S"
        for /f "delims=" %%P in ('python "%PYTHON_SCRIPTS%\state_manager.py" read_state "%%D\topic.json" ".currentPhase" 2^>nul') do set "phase=%%P"

        REM Count tasks
        set task_total=0
        set task_completed=0
        for %%F in ("%%D\task-*.json") do (
            if exist "%%F" (
                set /a task_total+=1
                for /f "delims=" %%X in ('python "%PYTHON_SCRIPTS%\state_manager.py" read_state "%%F" ".status" 2^>nul') do (
                    if "%%X"=="completed" set /a task_completed+=1
                )
            )
        )

        REM Display topic
        call :get_status_icon "!status!" icon
        echo [!topic_count!] !icon! %BOLD%!title!%RESET%
        echo     Slug: %DIM%!topic_slug!%RESET%
        call :get_phase_name "!phase!" phase_name
        echo     Phase: !phase_name!
        echo     Tasks: !task_completed!/!task_total! completed
        echo.
    )
)

if !topic_count!==0 (
    echo No topics found.
    echo.
    echo Create a topic by saying:
    echo   "create a topic using spec.md"
    echo.
    pause
    goto main_menu
)

echo ═══════════════════════════════════════════════════════════
echo.
set /p choice="Enter topic number to view details, or 'b' to go back: "

if /i "%choice%"=="b" goto main_menu

REM Validate numeric choice
set /a validate=%choice% 2>nul
if not !validate!==%choice% (
    echo Invalid choice.
    pause
    goto handle_topic_browsing
)

REM Get selected topic
set current=0
for /d %%D in ("%STATE_DIR%\*") do (
    if exist "%%D\topic.json" (
        set /a current+=1
        if !current!==%choice% (
            set "selected_slug=%%~nxD"
            goto show_details
        )
    )
)

echo Invalid topic number.
pause
goto handle_topic_browsing

:show_details
cls
call :print_header

set "topic_dir=%STATE_DIR%\%selected_slug%"
set "topic_json=%topic_dir%\topic.json"

if not exist "%topic_json%" (
    echo Topic not found: %selected_slug%
    pause
    goto main_menu
)

REM Read topic metadata
for /f "delims=" %%T in ('python "%PYTHON_SCRIPTS%\state_manager.py" read_state "%topic_json%" ".title" 2^>nul') do set "title=%%T"
for /f "delims=" %%S in ('python "%PYTHON_SCRIPTS%\state_manager.py" read_state "%topic_json%" ".status" 2^>nul') do set "status=%%S"
for /f "delims=" %%P in ('python "%PYTHON_SCRIPTS%\state_manager.py" read_state "%topic_json%" ".currentPhase" 2^>nul') do set "phase=%%P"
for /f "delims=" %%D in ('python "%PYTHON_SCRIPTS%\state_manager.py" read_state "%topic_json%" ".description" 2^>nul') do set "description=%%D"

echo %MAGENTA%%BOLD%📋 Topic Details%RESET%
echo ═══════════════════════════════════════════════════════════
echo.
echo %BOLD%Title:%RESET% %title%
echo %BOLD%Slug:%RESET% %selected_slug%
call :get_status_icon "%status%" icon
echo %BOLD%Status:%RESET% !icon! %status%
call :get_phase_name "%phase%" phase_name
echo %BOLD%Phase:%RESET% !phase_name!
if not "%description%"=="" echo %BOLD%Description:%RESET% %description%
echo.

REM File locations
echo %CYAN%%BOLD%📁 File Locations%RESET%
echo ───────────────────────────────────────────────────────────
echo %BOLD%Topic Plan:%RESET% Project-tasks\%selected_slug%\topicplan.md
echo %BOLD%Spec File:%RESET% Project-tasks\%selected_slug%\spec\
echo %BOLD%Deliverables:%RESET% Project-tasks\%selected_slug%\deliverables\
echo %BOLD%State Files:%RESET% %topic_dir%\
echo.

REM Tasks
echo %CYAN%%BOLD%🎯 Tasks%RESET%
echo ───────────────────────────────────────────────────────────

set task_count=0
for %%F in ("%topic_dir%\task-*.json") do (
    if exist "%%F" (
        set /a task_count+=1
        set "task_id=%%~nF"

        for /f "delims=" %%X in ('python "%PYTHON_SCRIPTS%\state_manager.py" read_state "%%F" ".status" 2^>nul') do set "task_status=%%X"
        for /f "delims=" %%X in ('python "%PYTHON_SCRIPTS%\state_manager.py" read_state "%%F" ".progress" 2^>nul') do set "progress=%%X"
        for /f "delims=" %%X in ('python "%PYTHON_SCRIPTS%\state_manager.py" read_state "%%F" ".currentOperation" 2^>nul') do set "current_op=%%X"

        call :get_status_icon "!task_status!" task_icon
        echo !task_icon! %BOLD%!task_id!%RESET% [!progress!%%]
        if not "!current_op!"=="null" if not "!current_op!"=="" echo    %DIM%!current_op!%RESET%
        echo.
    )
)

if !task_count!==0 (
    echo No tasks created yet for this topic.
    echo.
)

REM Next steps
echo %CYAN%%BOLD%📌 Next Steps%RESET%
echo ───────────────────────────────────────────────────────────
call :show_next_steps "%phase%" "%selected_slug%"
echo.

REM Actions menu
echo ═══════════════════════════════════════════════════════════
echo.
echo Actions:
echo   [1] View topic plan (topicplan.md)
echo   [2] View deliverables folder
echo   [3] View state files
echo   [4] Delete this topic
echo   [b] Back to topic list
echo.
set /p action="Enter choice: "

if "%action%"=="1" goto view_topicplan
if "%action%"=="2" goto view_deliverables
if "%action%"=="3" goto view_state
if "%action%"=="4" goto delete_current_topic
if /i "%action%"=="b" goto handle_topic_browsing

echo Invalid choice.
pause
goto show_details

:view_topicplan
set "topicplan_path=Project-tasks\%selected_slug%\topicplan.md"
if exist "%topicplan_path%" (
    cls
    REM Try bat first, fallback to type
    where bat >nul 2>&1
    if %errorlevel%==0 (
        bat "%topicplan_path%"
    ) else (
        type "%topicplan_path%"
    )
) else (
    echo Topic plan not found at %topicplan_path%
)
echo.
pause
goto show_details

:view_deliverables
set "deliverables_path=Project-tasks\%selected_slug%\deliverables"
if exist "%deliverables_path%" (
    echo.
    echo Deliverables in %deliverables_path%:
    echo.
    where eza >nul 2>&1
    if %errorlevel%==0 (
        eza --long --git "%deliverables_path%"
    ) else (
        dir /b "%deliverables_path%"
    )
) else (
    echo Deliverables folder not found
)
echo.
pause
goto show_details

:view_state
set "state_path=%STATE_DIR%\%selected_slug%"
echo.
echo State files in %state_path%:
echo.
where eza >nul 2>&1
if %errorlevel%==0 (
    eza --long --git "%state_path%"
) else (
    dir /b "%state_path%"
)
echo.
pause
goto show_details

:delete_current_topic
echo.
echo %RED%%BOLD%⚠️  WARNING: This will permanently delete:%RESET%
echo.
echo   • Topic: %selected_slug%
echo   • All tasks and state files
echo   • All deliverables in Project-tasks\%selected_slug%\
echo   • All state in %STATE_DIR%\%selected_slug%\
echo.
set /p confirm="Type 'DELETE' to confirm: "

if "%confirm%"=="DELETE" (
    REM Delete project files
    if exist "Project-tasks\%selected_slug%" (
        rd /s /q "Project-tasks\%selected_slug%"
        echo %GREEN%✓ Deleted Project-tasks\%selected_slug%\%RESET%
    )

    REM Delete state files
    if exist "%STATE_DIR%\%selected_slug%" (
        rd /s /q "%STATE_DIR%\%selected_slug%"
        echo %GREEN%✓ Deleted %STATE_DIR%\%selected_slug%\%RESET%
    )

    echo.
    echo %GREEN%%BOLD%✓ Topic deleted successfully%RESET%
    echo.
    echo Press any key to return to topic list...
    pause >nul
    goto handle_topic_browsing
) else (
    echo Deletion cancelled.
    echo.
    pause
    goto show_details
)

:print_header
echo %CYAN%%BOLD%╔════════════════════════════════════════════════════════════════╗%RESET%
echo %CYAN%%BOLD%║%RESET%  %BOLD%Project Task Orchestration Menu%RESET%                           %CYAN%%BOLD%║%RESET%
echo %CYAN%%BOLD%║%RESET%  %DIM%Navigate topics and view task details%RESET%                     %CYAN%%BOLD%║%RESET%
echo %CYAN%%BOLD%╚════════════════════════════════════════════════════════════════╝%RESET%
echo.
exit /b

:get_status_icon
set "s=%~1"
if "%s%"=="completed" set "%~2=%GREEN%✓%RESET%"
if "%s%"=="in_progress" set "%~2=%YELLOW%⟳%RESET%"
if "%s%"=="pending" set "%~2=%BLUE%○%RESET%"
if "%s%"=="blocked" set "%~2=%RED%⚠%RESET%"
if "%s%"=="" set "%~2=%DIM%?%RESET%"
exit /b

:get_phase_name
set "p=%~1"
if "%p%"=="phase-1" set "%~2=Phase 1: Requirements"
if "%p%"=="phase-2" set "%~2=Phase 2: Agent Selection"
if "%p%"=="phase-3" set "%~2=Phase 3: Execution Planning"
if "%p%"=="ready-for-execution" set "%~2=Ready for Execution"
if "%p%"=="executing" set "%~2=Executing"
if "%p%"=="completed" set "%~2=Completed"
if "%p%"=="" set "%~2=%p%"
exit /b

:show_next_steps
set "phase=%~1"
set "slug=%~2"
if "%phase%"=="phase-1" (
    echo • Review requirements in topicplan.md
    echo • Say 'continue' to proceed to Phase 2 ^(Agent Selection^)
)
if "%phase%"=="phase-2" (
    echo • Review selected agents
    echo • Say 'continue' to proceed to Phase 3 ^(Execution Planning^)
)
if "%phase%"=="phase-3" (
    echo • Review execution plan
    echo • Say 'continue' to approve and get ready for execution
)
if "%phase%"=="ready-for-execution" (
    echo • Say 'go ahead' or 'launch' to execute prepared prompts
)
if "%phase%"=="executing" (
    echo • Tasks are running, monitor progress
    echo • Wait for completion notifications
)
if "%phase%"=="completed" (
    echo • Review deliverables in Project-tasks\%slug%\deliverables\
    echo • Topic is complete!
)
exit /b
