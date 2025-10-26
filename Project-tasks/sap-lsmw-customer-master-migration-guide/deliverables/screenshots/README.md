# SAP LSMW Screenshots Directory

**Version**: 1.0
**Date**: October 2025
**Purpose**: Central location for all SAP LSMW Customer Master Migration Guide screenshots

---

## Directory Overview

This directory contains (or will contain) all screenshots referenced in the SAP LSMW Customer Master Migration Guide documentation.

**Total Required**: 30 screenshots
**Current Status**: Awaiting manual URL collection and download

---

## Files in This Directory

### Documentation Files

1. **SCREENSHOT-REQUIREMENTS.md**
   - Detailed specifications for all 30 required screenshots
   - Field-level annotations requirements
   - Quality guidelines

2. **IMAGE-SOURCES-AND-URLS.md** (NEW)
   - Recommended sources for finding LSMW screenshots online
   - Search strategies and URLs
   - Copyright and usage guidelines

3. **screenshot-urls.txt** (NEW - Template)
   - Template file for collecting image URLs
   - One URL per line format
   - Ready for batch download

4. **README.md** (This file)
   - Overview and quick start guide

### Helper Scripts

5. **download-and-rename-screenshots.bat** (NEW - Windows)
   - Automated download script for Windows
   - Validates prerequisites
   - Executes batch download

6. **download-and-rename-screenshots.sh** (NEW - Linux/Mac)
   - Automated download script for Unix-like systems
   - Validates prerequisites
   - Executes batch download

---

## Quick Start Guide

### Step 1: Find Screenshot URLs

1. Open **IMAGE-SOURCES-AND-URLS.md**
2. Visit the recommended sources (SAP Community, SAP Help Portal, etc.)
3. Search for LSMW screenshots using provided search terms
4. Copy image URLs

**Example searches:**
- "SAP LSMW tutorial screenshot"
- "LSMW step by step guide"
- "SAP customer master migration LSMW"

### Step 2: Add URLs to Template File

1. Open **screenshot-urls.txt**
2. Replace `<paste-url-here>` with actual image URLs
3. Remove the `#` comment character before each URL
4. Save the file

**Example:**
```
# Before:
# Step 1: Maintain Object Attributes
# <paste-url-here>

# After:
# Step 1: Maintain Object Attributes
https://community.sap.com/.../lsmw-step1.png
```

### Step 3: Run Batch Download

**Option A: Use Helper Script (Recommended)**

Windows:
```cmd
cd Project-tasks\sap-lsmw-customer-master-migration-guide\deliverables\screenshots
download-and-rename-screenshots.bat
```

Linux/Mac:
```bash
cd Project-tasks/sap-lsmw-customer-master-migration-guide/deliverables/screenshots
chmod +x download-and-rename-screenshots.sh
./download-and-rename-screenshots.sh
```

**Option B: Manual Python Command**

```bash
python .claude/skills/image-fetcher/scripts/fetch_images_batch.py \
  "Project-tasks/sap-lsmw-customer-master-migration-guide/deliverables/screenshots/screenshot-urls.txt" \
  "Project-tasks/sap-lsmw-customer-master-migration-guide/deliverables/screenshots/"
```

### Step 4: Rename Downloaded Files

Downloaded files will have generic names. Rename them to match the requirements:

**Use the RENAME-MAPPING.md file** (see below for mapping table)

**Example:**
```bash
# Windows
ren image1.png 04-LSMW-Step1-Object-Attributes.png
ren image2.png 05-LSMW-Step2-Source-Structures.png

# Linux/Mac
mv image1.png 04-LSMW-Step1-Object-Attributes.png
mv image2.png 05-LSMW-Step2-Source-Structures.png
```

### Step 5: Verify Downloads

```bash
# List all downloaded images
ls -lh *.png
ls -lh *.jpg

# Count images
ls -1 *.png *.jpg 2>/dev/null | wc -l
```

**Target**: At least 14 screenshots (LSMW steps 1-14 are priority)

---

## Screenshot Naming Convention

All screenshots must follow this naming pattern from SCREENSHOT-REQUIREMENTS.md:

### XD01 Transaction (3 files)
- `01-KNA1-General-Data-XD01.png`
- `02-KNB1-Company-Code-Data-XD01.png`
- `03-KNVV-Sales-Area-Data-XD01.png`

### LSMW Steps 1-14 (17 files)
- `04-LSMW-Step1-Object-Attributes.png`
- `05-LSMW-Step2-Source-Structures.png`
- `06-LSMW-Step3-Source-Fields-Header.png`
- `07-LSMW-Step3-Source-Fields-Complete.png`
- `08-LSMW-Step4-Structure-Relations.png`
- `09-LSMW-Step5-Field-Mapping-Overview.png`
- `10-LSMW-Step5-Field-Mapping-Details.png`
- `11-LSMW-Step6-Fixed-Values.png`
- `12-LSMW-Step6-Translation-Table.png`
- `13-LSMW-Step6-User-Routine.png`
- `14-LSMW-Step7-Specify-Files.png`
- `15-LSMW-Step8-Assign-Files.png`
- `16-LSMW-Step9-Read-Data.png`
- `17-LSMW-Step10-Display-Read-Data.png`
- `18-LSMW-Step11-Convert-Data.png`
- `19-LSMW-Step12-Display-Converted-Data.png`
- `20-LSMW-Step13-Create-BI-Session.png`

### SM35 Batch Input (4 files)
- `21-SM35-Session-Overview.png`
- `22-SM35-Processing-Session.png`
- `23-SM35-Error-Screen.png`
- `24-XD03-Customer-Display.png`

### SHDB Recording (3 files)
- `25-SHDB-Recording-Overview.png`
- `26-SHDB-Recording-Steps.png`
- `27-SHDB-Recording-Playback.png`

### Additional (3 files)
- `28-SE16-KNA1-Table-Data.png`
- `29-Configuration-OBAR-Account-Groups.png`
- `30-Error-Log-Example.png`

---

## Priority Order for Downloads

Focus on these in order:

### Priority 1: LSMW 14 Steps (Essential)
Files 04-20 (17 screenshots covering LSMW steps 1-14)

### Priority 2: XD01 Transaction (Important)
Files 01-03 (3 screenshots showing customer master screens)

### Priority 3: Verification Screenshots (Nice to have)
Files 21-24 (SM35 batch input and customer display)

### Priority 4: Supporting Screenshots (Optional)
Files 25-30 (SHDB, SE16, configuration)

**Minimum Viable**: 14 screenshots (LSMW steps only)
**Recommended**: 20 screenshots (LSMW + XD01 + SM35)
**Complete**: 30 screenshots (all requirements)

---

## Quality Checklist

Before considering a screenshot "done":

- ✅ Resolution: Minimum 1024x768 pixels
- ✅ Format: PNG (preferred) or JPG
- ✅ File name: Matches SCREENSHOT-REQUIREMENTS.md exactly
- ✅ Clarity: Text is readable
- ✅ Content: Shows correct LSMW step or transaction
- ✅ Privacy: No production/personal data visible
- ✅ Source: From legitimate SAP documentation or tutorials

---

## Troubleshooting

### Issue: "No URLs found" error
**Solution**:
- Open screenshot-urls.txt
- Ensure URLs are not commented out (remove # at start of line)
- Ensure URLs start with http:// or https://

### Issue: Downloaded images have wrong format
**Solution**:
- image-fetcher auto-detects format from headers
- If needed, convert using: `convert image.jpg image.png`

### Issue: Can't find LSMW screenshots online
**Solution**:
- Try SAP Community first (most likely source)
- Look for SAP LSMW tutorial blog posts
- Check YouTube tutorials (pause at relevant screens)
- Alternative: Capture from live SAP system (see SCREENSHOT-REQUIREMENTS.md)

### Issue: Batch download script fails
**Solution**:
- Check Python is installed: `python --version`
- Check image-fetcher skill exists: `.claude/skills/image-fetcher/`
- Verify URLs file has valid content
- Try manual download for one URL first

---

## Manual Screenshot Capture (Alternative)

If suitable online images are not available, screenshots can be captured from a live SAP ECC system.

**Requirements:**
- SAP GUI access
- LSMW transaction authorization
- Test/sandbox system (not production)

**Tools:**
- Windows Snipping Tool
- Snagit
- Greenshot
- SAP GUI screenshot (Ctrl+Print Screen)

**See SCREENSHOT-REQUIREMENTS.md for detailed capture guidelines.**

---

## File Organization After Download

Expected directory structure:
```
screenshots/
├── README.md (this file)
├── SCREENSHOT-REQUIREMENTS.md
├── IMAGE-SOURCES-AND-URLS.md
├── screenshot-urls.txt
├── download-and-rename-screenshots.bat
├── download-and-rename-screenshots.sh
├── RENAME-MAPPING.md
├── 01-KNA1-General-Data-XD01.png
├── 02-KNB1-Company-Code-Data-XD01.png
├── 03-KNVV-Sales-Area-Data-XD01.png
├── 04-LSMW-Step1-Object-Attributes.png
├── 05-LSMW-Step2-Source-Structures.png
├── ... (remaining screenshots)
└── 30-Error-Log-Example.png
```

---

## Integration with Documentation

Once screenshots are downloaded and renamed:

1. Update main guide to reference screenshots
2. Embed screenshots using markdown:
   ```markdown
   ![LSMW Step 1](screenshots/04-LSMW-Step1-Object-Attributes.png)
   ```
3. Add captions and annotations where needed
4. Update screenshot status tracker in SCREENSHOT-REQUIREMENTS.md

---

## Next Steps

- [ ] Review IMAGE-SOURCES-AND-URLS.md
- [ ] Search for and collect image URLs
- [ ] Add URLs to screenshot-urls.txt
- [ ] Run batch download script
- [ ] Rename downloaded files
- [ ] Verify quality of screenshots
- [ ] Update main documentation with screenshot references
- [ ] Mark screenshots as complete in SCREENSHOT-REQUIREMENTS.md

---

## Support

For assistance:
- See IMAGE-SOURCES-AND-URLS.md for finding screenshots
- See SCREENSHOT-REQUIREMENTS.md for specifications
- Contact migration team lead for SAP system access
- Post in SAP Community for help finding images

---

**Document Owner**: Migration Team Lead
**Last Updated**: October 2025
**Status**: Ready for URL collection and download

**END OF README**
