@echo off
REM SAP LSMW Screenshot Download and Rename Script
REM Version: 1.0
REM Purpose: Batch download screenshots and rename to match requirements

echo ============================================
echo SAP LSMW Screenshot Downloader
echo ============================================
echo.

REM Set paths
set PROJECT_ROOT=C:\laragon\www\claud-skills
set SCREENSHOTS_DIR=%PROJECT_ROOT%\Project-tasks\sap-lsmw-customer-master-migration-guide\deliverables\screenshots
set URLS_FILE=%SCREENSHOTS_DIR%\screenshot-urls.txt
set IMAGE_FETCHER=%PROJECT_ROOT%\.claude\skills\image-fetcher\scripts\fetch_images_batch.py

echo Checking prerequisites...
echo.

REM Check if URLs file exists
if not exist "%URLS_FILE%" (
    echo ERROR: URLs file not found: %URLS_FILE%
    echo Please create the file and add image URLs first.
    pause
    exit /b 1
)

REM Check if image-fetcher script exists
if not exist "%IMAGE_FETCHER%" (
    echo ERROR: image-fetcher script not found: %IMAGE_FETCHER%
    pause
    exit /b 1
)

REM Check if URLs file has content (non-comment lines)
findstr /V /R "^#" "%URLS_FILE%" > nul
if errorlevel 1 (
    echo ERROR: No URLs found in %URLS_FILE%
    echo Please add image URLs to the file first.
    echo See IMAGE-SOURCES-AND-URLS.md for guidance.
    pause
    exit /b 1
)

echo Prerequisites OK!
echo.
echo Starting batch download...
echo.

REM Run batch download
python "%IMAGE_FETCHER%" "%URLS_FILE%" "%SCREENSHOTS_DIR%"

if errorlevel 1 (
    echo.
    echo ERROR: Batch download failed!
    pause
    exit /b 1
)

echo.
echo ============================================
echo Download Complete!
echo ============================================
echo.
echo Next steps:
echo 1. Check downloaded images in: %SCREENSHOTS_DIR%
echo 2. Rename files to match SCREENSHOT-REQUIREMENTS.md naming convention
echo 3. Use the rename mapping below:
echo.
echo Example renaming (adjust based on your downloaded files):
echo    ren downloaded-image-1.png 04-LSMW-Step1-Object-Attributes.png
echo    ren downloaded-image-2.png 05-LSMW-Step2-Source-Structures.png
echo    ... etc.
echo.
echo 4. Update documentation to reference screenshots
echo.
pause
