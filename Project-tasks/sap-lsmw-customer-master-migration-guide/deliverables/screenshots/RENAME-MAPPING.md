# Screenshot Rename Mapping Guide

**Version**: 1.0
**Date**: October 2025
**Purpose**: Quick reference for renaming downloaded screenshots to match requirements

---

## Overview

After downloading screenshots using the batch download script, files will have generic names based on the URLs. This guide provides the mapping to rename them correctly.

---

## Rename Mapping Table

| Priority | Download Order | Source Description | Target Filename |
|----------|----------------|-------------------|-----------------|
| 1 | 01 | LSMW Step 1 screenshot | `04-LSMW-Step1-Object-Attributes.png` |
| 1 | 02 | LSMW Step 2 screenshot | `05-LSMW-Step2-Source-Structures.png` |
| 1 | 03 | LSMW Step 3 (header) screenshot | `06-LSMW-Step3-Source-Fields-Header.png` |
| 1 | 04 | LSMW Step 3 (complete) screenshot | `07-LSMW-Step3-Source-Fields-Complete.png` |
| 1 | 05 | LSMW Step 4 screenshot | `08-LSMW-Step4-Structure-Relations.png` |
| 1 | 06 | LSMW Step 5 (overview) screenshot | `09-LSMW-Step5-Field-Mapping-Overview.png` |
| 1 | 07 | LSMW Step 5 (details) screenshot | `10-LSMW-Step5-Field-Mapping-Details.png` |
| 1 | 08 | LSMW Step 6 (fixed values) screenshot | `11-LSMW-Step6-Fixed-Values.png` |
| 1 | 09 | LSMW Step 6 (translations) screenshot | `12-LSMW-Step6-Translation-Table.png` |
| 1 | 10 | LSMW Step 6 (routines) screenshot | `13-LSMW-Step6-User-Routine.png` |
| 1 | 11 | LSMW Step 7 screenshot | `14-LSMW-Step7-Specify-Files.png` |
| 1 | 12 | LSMW Step 8 screenshot | `15-LSMW-Step8-Assign-Files.png` |
| 1 | 13 | LSMW Step 9 screenshot | `16-LSMW-Step9-Read-Data.png` |
| 1 | 14 | LSMW Step 10 screenshot | `17-LSMW-Step10-Display-Read-Data.png` |
| 1 | 15 | LSMW Step 11 screenshot | `18-LSMW-Step11-Convert-Data.png` |
| 1 | 16 | LSMW Step 12 screenshot | `19-LSMW-Step12-Display-Converted-Data.png` |
| 1 | 17 | LSMW Step 13 screenshot | `20-LSMW-Step13-Create-BI-Session.png` |
| 2 | 18 | XD01 General Data (KNA1) | `01-KNA1-General-Data-XD01.png` |
| 2 | 19 | XD01 Company Code (KNB1) | `02-KNB1-Company-Code-Data-XD01.png` |
| 2 | 20 | XD01 Sales Area (KNVV) | `03-KNVV-Sales-Area-Data-XD01.png` |
| 3 | 21 | SM35 Session Overview | `21-SM35-Session-Overview.png` |
| 3 | 22 | SM35 Processing | `22-SM35-Processing-Session.png` |
| 3 | 23 | SM35 Error Screen | `23-SM35-Error-Screen.png` |
| 3 | 24 | XD03 Customer Display | `24-XD03-Customer-Display.png` |
| 4 | 25 | SHDB Recording Overview | `25-SHDB-Recording-Overview.png` |
| 4 | 26 | SHDB Recording Steps | `26-SHDB-Recording-Steps.png` |
| 4 | 27 | SHDB Recording Playback | `27-SHDB-Recording-Playback.png` |
| 4 | 28 | SE16 KNA1 Table Data | `28-SE16-KNA1-Table-Data.png` |
| 4 | 29 | OBAR Account Groups Config | `29-Configuration-OBAR-Account-Groups.png` |
| 4 | 30 | Error Log Example | `30-Error-Log-Example.png` |

---

## Batch Rename Scripts

### Windows Batch Rename (rename-all.bat)

Create a file `rename-all.bat` in the screenshots directory:

```bat
@echo off
echo Renaming downloaded screenshots...
echo.

REM Rename LSMW Steps (Priority 1)
if exist "image1.png" ren "image1.png" "04-LSMW-Step1-Object-Attributes.png"
if exist "image2.png" ren "image2.png" "05-LSMW-Step2-Source-Structures.png"
if exist "image3.png" ren "image3.png" "06-LSMW-Step3-Source-Fields-Header.png"
if exist "image4.png" ren "image4.png" "07-LSMW-Step3-Source-Fields-Complete.png"
if exist "image5.png" ren "image5.png" "08-LSMW-Step4-Structure-Relations.png"
if exist "image6.png" ren "image6.png" "09-LSMW-Step5-Field-Mapping-Overview.png"
if exist "image7.png" ren "image7.png" "10-LSMW-Step5-Field-Mapping-Details.png"
if exist "image8.png" ren "image8.png" "11-LSMW-Step6-Fixed-Values.png"
if exist "image9.png" ren "image9.png" "12-LSMW-Step6-Translation-Table.png"
if exist "image10.png" ren "image10.png" "13-LSMW-Step6-User-Routine.png"
if exist "image11.png" ren "image11.png" "14-LSMW-Step7-Specify-Files.png"
if exist "image12.png" ren "image12.png" "15-LSMW-Step8-Assign-Files.png"
if exist "image13.png" ren "image13.png" "16-LSMW-Step9-Read-Data.png"
if exist "image14.png" ren "image14.png" "17-LSMW-Step10-Display-Read-Data.png"
if exist "image15.png" ren "image15.png" "18-LSMW-Step11-Convert-Data.png"
if exist "image16.png" ren "image16.png" "19-LSMW-Step12-Display-Converted-Data.png"
if exist "image17.png" ren "image17.png" "20-LSMW-Step13-Create-BI-Session.png"

REM Rename XD01 Screenshots (Priority 2)
if exist "image18.png" ren "image18.png" "01-KNA1-General-Data-XD01.png"
if exist "image19.png" ren "image19.png" "02-KNB1-Company-Code-Data-XD01.png"
if exist "image20.png" ren "image20.png" "03-KNVV-Sales-Area-Data-XD01.png"

REM Rename SM35 Screenshots (Priority 3)
if exist "image21.png" ren "image21.png" "21-SM35-Session-Overview.png"
if exist "image22.png" ren "image22.png" "22-SM35-Processing-Session.png"
if exist "image23.png" ren "image23.png" "23-SM35-Error-Screen.png"
if exist "image24.png" ren "image24.png" "24-XD03-Customer-Display.png"

REM Rename Additional Screenshots (Priority 4)
if exist "image25.png" ren "image25.png" "25-SHDB-Recording-Overview.png"
if exist "image26.png" ren "image26.png" "26-SHDB-Recording-Steps.png"
if exist "image27.png" ren "image27.png" "27-SHDB-Recording-Playback.png"
if exist "image28.png" ren "image28.png" "28-SE16-KNA1-Table-Data.png"
if exist "image29.png" ren "image29.png" "29-Configuration-OBAR-Account-Groups.png"
if exist "image30.png" ren "image30.png" "30-Error-Log-Example.png"

echo.
echo Renaming complete!
echo.
echo Listing renamed files:
dir /B ??-*.png
echo.
pause
```

**Usage:**
```cmd
cd Project-tasks\sap-lsmw-customer-master-migration-guide\deliverables\screenshots
rename-all.bat
```

---

### Linux/Mac Bash Rename (rename-all.sh)

Create a file `rename-all.sh` in the screenshots directory:

```bash
#!/bin/bash
echo "Renaming downloaded screenshots..."
echo ""

# Rename LSMW Steps (Priority 1)
[ -f "image1.png" ] && mv "image1.png" "04-LSMW-Step1-Object-Attributes.png"
[ -f "image2.png" ] && mv "image2.png" "05-LSMW-Step2-Source-Structures.png"
[ -f "image3.png" ] && mv "image3.png" "06-LSMW-Step3-Source-Fields-Header.png"
[ -f "image4.png" ] && mv "image4.png" "07-LSMW-Step3-Source-Fields-Complete.png"
[ -f "image5.png" ] && mv "image5.png" "08-LSMW-Step4-Structure-Relations.png"
[ -f "image6.png" ] && mv "image6.png" "09-LSMW-Step5-Field-Mapping-Overview.png"
[ -f "image7.png" ] && mv "image7.png" "10-LSMW-Step5-Field-Mapping-Details.png"
[ -f "image8.png" ] && mv "image8.png" "11-LSMW-Step6-Fixed-Values.png"
[ -f "image9.png" ] && mv "image9.png" "12-LSMW-Step6-Translation-Table.png"
[ -f "image10.png" ] && mv "image10.png" "13-LSMW-Step6-User-Routine.png"
[ -f "image11.png" ] && mv "image11.png" "14-LSMW-Step7-Specify-Files.png"
[ -f "image12.png" ] && mv "image12.png" "15-LSMW-Step8-Assign-Files.png"
[ -f "image13.png" ] && mv "image13.png" "16-LSMW-Step9-Read-Data.png"
[ -f "image14.png" ] && mv "image14.png" "17-LSMW-Step10-Display-Read-Data.png"
[ -f "image15.png" ] && mv "image15.png" "18-LSMW-Step11-Convert-Data.png"
[ -f "image16.png" ] && mv "image16.png" "19-LSMW-Step12-Display-Converted-Data.png"
[ -f "image17.png" ] && mv "image17.png" "20-LSMW-Step13-Create-BI-Session.png"

# Rename XD01 Screenshots (Priority 2)
[ -f "image18.png" ] && mv "image18.png" "01-KNA1-General-Data-XD01.png"
[ -f "image19.png" ] && mv "image19.png" "02-KNB1-Company-Code-Data-XD01.png"
[ -f "image20.png" ] && mv "image20.png" "03-KNVV-Sales-Area-Data-XD01.png"

# Rename SM35 Screenshots (Priority 3)
[ -f "image21.png" ] && mv "image21.png" "21-SM35-Session-Overview.png"
[ -f "image22.png" ] && mv "image22.png" "22-SM35-Processing-Session.png"
[ -f "image23.png" ] && mv "image23.png" "23-SM35-Error-Screen.png"
[ -f "image24.png" ] && mv "image24.png" "24-XD03-Customer-Display.png"

# Rename Additional Screenshots (Priority 4)
[ -f "image25.png" ] && mv "image25.png" "25-SHDB-Recording-Overview.png"
[ -f "image26.png" ] && mv "image26.png" "26-SHDB-Recording-Steps.png"
[ -f "image27.png" ] && mv "image27.png" "27-SHDB-Recording-Playback.png"
[ -f "image28.png" ] && mv "image28.png" "28-SE16-KNA1-Table-Data.png"
[ -f "image29.png" ] && mv "image29.png" "29-Configuration-OBAR-Account-Groups.png"
[ -f "image30.png" ] && mv "image30.png" "30-Error-Log-Example.png"

echo ""
echo "Renaming complete!"
echo ""
echo "Listing renamed files:"
ls -1 ??-*.png 2>/dev/null || echo "No files found matching pattern"
echo ""
```

**Usage:**
```bash
cd Project-tasks/sap-lsmw-customer-master-migration-guide/deliverables/screenshots
chmod +x rename-all.sh
./rename-all.sh
```

---

## Manual Rename Commands

If you prefer to rename files one at a time:

### Windows (CMD)
```cmd
REM LSMW Steps
ren "downloaded-file-1.png" "04-LSMW-Step1-Object-Attributes.png"
ren "downloaded-file-2.png" "05-LSMW-Step2-Source-Structures.png"
REM ... etc.
```

### Linux/Mac
```bash
# LSMW Steps
mv downloaded-file-1.png 04-LSMW-Step1-Object-Attributes.png
mv downloaded-file-2.png 05-LSMW-Step2-Source-Structures.png
# ... etc.
```

---

## Verification After Renaming

### Check File Count
```bash
# Windows
dir /B ??-*.png | find /C /V ""

# Linux/Mac
ls -1 ??-*.png 2>/dev/null | wc -l
```

**Expected**: 14-30 files (minimum 14 for LSMW steps)

### List All Renamed Files
```bash
# Windows
dir /B ??-*.png

# Linux/Mac
ls -1 ??-*.png
```

### Verify Against Requirements
```bash
# Create checklist
# Compare against SCREENSHOT-REQUIREMENTS.md table
```

---

## Common Rename Issues

### Issue: Downloaded files have URL-based names
**Example**: `community.sap.com_image_12345.png`
**Solution**: Use the batch rename scripts above, but first manually map which file corresponds to which LSMW step

### Issue: Files downloaded with wrong extensions
**Example**: Downloaded as `.jpg` but need `.png`
**Solution**:
```bash
# Convert using ImageMagick or similar tool
convert image.jpg image.png

# Or use Windows Paint/Mac Preview to save as PNG
```

### Issue: Duplicate filenames during rename
**Solution**: Check download order in `fetch_results.json` (created by batch download)

---

## Integration with Documentation

After renaming, update the main guide to reference screenshots:

```markdown
### LSMW Step 1: Maintain Object Attributes

![LSMW Step 1 - Object Attributes](screenshots/04-LSMW-Step1-Object-Attributes.png)
*Figure 1: LSMW Step 1 - Maintain Object Attributes screen*

**Transaction**: LSMW
**Navigation**: LSMW → Create New Object

...
```

---

## Next Steps After Renaming

1. ✅ Verify all files renamed correctly
2. ✅ Check file quality (resolution, clarity)
3. ✅ Update SCREENSHOT-REQUIREMENTS.md status tracker
4. ✅ Update main documentation with screenshot references
5. ✅ Add captions and annotations if needed
6. ✅ Commit screenshots to version control (if applicable)

---

**Document Owner**: Migration Team Lead
**Last Updated**: October 2025
**Status**: Ready to use

**END OF RENAME MAPPING GUIDE**
