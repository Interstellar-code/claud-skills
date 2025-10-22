@echo off
REM Quick launcher for CS Project Tasks Menu System
REM Run from Windows Terminal: cs-prj-menu.bat or .\cs-prj-menu.bat

cd /d "%~dp0"

REM Check if rich is installed
python -c "import rich" 2>nul
if errorlevel 1 (
    echo Installing rich library for better UI...
    pip install rich
)

REM Launch multi-topic dashboard (menu system)
if "%~1"=="" (
    REM Default: show interactive menu
    python .claude/skills/csprojtasks/scripts/multi_topic_dashboard.py --interactive
) else if "%~1"=="--list" (
    REM List topics only
    python .claude/skills/csprojtasks/scripts/multi_topic_dashboard.py --list
) else if "%~1"=="--topic" (
    REM Show specific topic details
    python .claude/skills/csprojtasks/scripts/multi_topic_dashboard.py --topic %~2
) else (
    REM Pass through all other arguments
    python .claude/skills/csprojtasks/scripts/multi_topic_dashboard.py %*
)
