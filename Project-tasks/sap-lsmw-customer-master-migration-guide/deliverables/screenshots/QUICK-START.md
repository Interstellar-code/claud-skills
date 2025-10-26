# Screenshot Collection Quick Start Guide

**Version**: 1.0
**Date**: October 2025
**Estimated Time**: 2-4 hours (depending on search success)

---

## Overview

This quick start guide walks you through the entire process of collecting, downloading, and organizing SAP LSMW screenshots for the migration guide documentation.

---

## Prerequisites

- [ ] Internet access
- [ ] Web browser
- [ ] Python installed (for image-fetcher skill)
- [ ] Text editor
- [ ] 2-4 hours of time

---

## Step-by-Step Workflow

### Step 1: Understand Requirements (15 minutes)

1. **Read the requirements document**:
   ```bash
   # Open in your text editor or IDE
   Project-tasks/sap-lsmw-customer-master-migration-guide/deliverables/screenshots/SCREENSHOT-REQUIREMENTS.md
   ```

2. **Key takeaways**:
   - Need 30 total screenshots
   - Minimum 14 screenshots (LSMW steps 1-14) are priority
   - File naming convention is critical
   - Quality requirements: min 1024x768, readable text

---

### Step 2: Find Screenshot Sources (60-90 minutes)

1. **Open the sources guide**:
   ```bash
   Project-tasks/sap-lsmw-customer-master-migration-guide/deliverables/screenshots/IMAGE-SOURCES-AND-URLS.md
   ```

2. **Start with these searches**:

   **SAP Community** (best source):
   - Visit: https://community.sap.com
   - Search: "LSMW tutorial screenshot"
   - Search: "LSMW step by step guide"
   - Look for blog posts with embedded images

   **Google/Bing Image Search**:
   - Search: "SAP LSMW tutorial screenshots"
   - Search: "SAP LSMW step 1 maintain object attributes"
   - Search: "SAP LSMW customer master migration"

   **YouTube**:
   - Search: "SAP LSMW tutorial"
   - Pause videos at relevant screens
   - Note: Quality may vary

3. **Focus on Priority 1** (LSMW 14 steps):
   - Step 1: Maintain Object Attributes
   - Step 2: Maintain Source Structures
   - Step 3: Maintain Source Fields
   - Step 4: Maintain Structure Relations
   - Step 5: Field Mapping
   - Step 6: Fixed Values/Translations
   - Step 7: Specify Files
   - Step 8: Assign Files
   - Step 9: Read Data
   - Step 10: Display Read Data
   - Step 11: Convert Data
   - Step 12: Display Converted Data
   - Step 13: Create Batch Input Session
   - Step 14: Run Batch Input (SM35)

---

### Step 3: Collect Image URLs (30-60 minutes)

1. **Open the URL template file**:
   ```bash
   Project-tasks/sap-lsmw-customer-master-migration-guide/deliverables/screenshots/screenshot-urls.txt
   ```

2. **For each image you find**:

   **Method A: Right-click on image**:
   - Right-click on the image in your browser
   - Select "Copy Image Address" or "Copy Image URL"
   - Paste into `screenshot-urls.txt`

   **Method B: Inspect element**:
   - Right-click → Inspect
   - Find `<img>` tag
   - Copy the `src="..."` value
   - Paste into `screenshot-urls.txt`

3. **Example of adding URL**:
   ```
   # Before (in screenshot-urls.txt):
   # Step 1: Maintain Object Attributes
   # <paste-url-here>

   # After:
   # Step 1: Maintain Object Attributes
   https://community.sap.com/.../lsmw-step1-object-attributes.png
   ```

4. **Remove the `#` comment character** before each URL:
   ```
   # WRONG (will be skipped):
   # https://example.com/image.png

   # RIGHT (will be downloaded):
   https://example.com/image.png
   ```

5. **Target**: Collect at least 14 URLs (LSMW steps 1-14)

---

### Step 4: Download Images (10-15 minutes)

**Option A: Automated (Recommended)**

Windows:
```cmd
cd C:\laragon\www\claud-skills\Project-tasks\sap-lsmw-customer-master-migration-guide\deliverables\screenshots
download-and-rename-screenshots.bat
```

Linux/Mac:
```bash
cd /c/laragon/www/claud-skills/Project-tasks/sap-lsmw-customer-master-migration-guide/deliverables/screenshots
chmod +x download-and-rename-screenshots.sh
./download-and-rename-screenshots.sh
```

**Option B: Manual Python Command**

```bash
python C:/laragon/www/claud-skills/.claude/skills/image-fetcher/scripts/fetch_images_batch.py \
  "C:/laragon/www/claud-skills/Project-tasks/sap-lsmw-customer-master-migration-guide/deliverables/screenshots/screenshot-urls.txt" \
  "C:/laragon/www/claud-skills/Project-tasks/sap-lsmw-customer-master-migration-guide/deliverables/screenshots/"
```

**Expected output**:
```
Downloading image 1/14: https://...
Saved: C:\...\screenshots\image1.png (245 KB)

Downloading image 2/14: https://...
Saved: C:\...\screenshots\image2.png (198 KB)

...

Download complete! 14/14 images downloaded successfully.
Results saved to: fetch_results.json
```

---

### Step 5: Rename Downloaded Files (15-30 minutes)

**Check what was downloaded**:
```bash
# Windows
dir /B *.png *.jpg

# Linux/Mac
ls -1 *.png *.jpg
```

**Map downloads to requirements**:

Look at `fetch_results.json` to see which URL downloaded to which filename:
```json
{
  "image1.png": {
    "url": "https://community.sap.com/.../lsmw-step1.png",
    "status": "success"
  },
  ...
}
```

**Rename files**:

**Option A: Use the mapping guide**:
- Open `RENAME-MAPPING.md`
- Manually map which downloaded file corresponds to which LSMW step
- Create a custom rename script based on the template

**Option B: Manual rename (if you have 14 files named image1.png - image14.png)**:

Windows:
```cmd
ren image1.png 04-LSMW-Step1-Object-Attributes.png
ren image2.png 05-LSMW-Step2-Source-Structures.png
ren image3.png 06-LSMW-Step3-Source-Fields-Header.png
REM ... etc for all 14 files
```

Linux/Mac:
```bash
mv image1.png 04-LSMW-Step1-Object-Attributes.png
mv image2.png 05-LSMW-Step2-Source-Structures.png
mv image3.png 06-LSMW-Step3-Source-Fields-Header.png
# ... etc for all 14 files
```

---

### Step 6: Verify Quality (15 minutes)

For each downloaded screenshot:

1. **Open the image** in an image viewer
2. **Check resolution**: Should be at least 1024x768
3. **Check clarity**: Text should be readable
4. **Check content**: Matches the LSMW step description
5. **Check privacy**: No production data visible

**Quality checklist**:
- ✅ Image opens without errors
- ✅ Resolution ≥ 1024x768
- ✅ Text is clear and readable
- ✅ Shows correct SAP screen (LSMW transaction)
- ✅ No personal/production data visible
- ✅ File size reasonable (50 KB - 500 KB typical)

**If image fails quality check**:
- Find alternative source
- Repeat download for that specific screenshot

---

### Step 7: Update Documentation (30 minutes)

1. **Count your screenshots**:
   ```bash
   # Windows
   dir /B ??-*.png | find /C /V ""

   # Linux/Mac
   ls -1 ??-*.png | wc -l
   ```

2. **Update SCREENSHOT-REQUIREMENTS.md**:
   - Mark captured screenshots as complete
   - Update status tracker table

3. **Update main guide** (if applicable):
   - Add screenshot references to documentation
   - Use markdown format: `![Alt text](screenshots/filename.png)`

---

## Expected Results

After completing all steps, you should have:

- ✅ **14-30 screenshots** downloaded and renamed
- ✅ **Files named correctly** (e.g., `04-LSMW-Step1-Object-Attributes.png`)
- ✅ **Quality verified** (resolution, clarity, content)
- ✅ **Documentation updated** with screenshot references

**Minimum viable**: 14 screenshots covering LSMW steps 1-14
**Recommended**: 20 screenshots (LSMW + XD01 + SM35)
**Complete**: 30 screenshots (all requirements met)

---

## Troubleshooting

### Problem: Can't find LSMW screenshots online

**Solutions**:
1. Try SAP Community first (highest quality source)
2. Search for "SAP LSMW tutorial" on YouTube, pause at relevant screens
3. Post request in SAP Community forums
4. Contact SAP training partners for sample materials
5. Alternative: Capture from live SAP system (requires SAP access)

---

### Problem: Downloaded images have wrong format (JPG instead of PNG)

**Solution**:
```bash
# Convert using ImageMagick (if installed)
convert image.jpg image.png

# Or use online converter: cloudconvert.com
# Or use Windows Paint / Mac Preview to save as PNG
```

---

### Problem: URLs file empty or batch download fails

**Check**:
1. URLs file exists: `screenshot-urls.txt`
2. URLs are not commented out (remove `#` before URL)
3. URLs start with `http://` or `https://`
4. Python is installed: `python --version`
5. image-fetcher skill exists: `.claude/skills/image-fetcher/`

**Debug**:
```bash
# Test single URL first
python .claude/skills/image-fetcher/scripts/fetch_image.py \
  "https://example.com/test-image.png" \
  "./screenshots/"
```

---

### Problem: Can't determine which downloaded file is which LSMW step

**Solution**:
1. Open `fetch_results.json` (created by batch download)
2. Match URLs to filenames
3. Cross-reference with your search notes
4. If still unclear, open each image and identify by content

---

## Alternative: Manual Screenshot Capture

If web search is unsuccessful, screenshots must be captured from a live SAP system.

**Requirements**:
- SAP ECC system access
- LSMW transaction authorization
- Test/sandbox system (not production)

**Process**:
1. Log in to SAP
2. Execute LSMW transaction
3. Navigate to each step
4. Use Snipping Tool / Greenshot / SAP GUI screenshot (Ctrl+Print Screen)
5. Save with correct filename
6. No further download/rename needed

**See SCREENSHOT-REQUIREMENTS.md for detailed capture instructions.**

---

## Time Estimates

| Task | Estimated Time |
|------|----------------|
| Understand requirements | 15 minutes |
| Search for images | 60-90 minutes |
| Collect URLs | 30-60 minutes |
| Download images | 10-15 minutes |
| Rename files | 15-30 minutes |
| Verify quality | 15 minutes |
| Update documentation | 30 minutes |
| **Total** | **2.5 - 4 hours** |

---

## Success Criteria

Task is complete when:

- ✅ At least 14 LSMW screenshots downloaded
- ✅ Files properly renamed to match requirements
- ✅ Quality verified (resolution, clarity, content)
- ✅ SCREENSHOT-REQUIREMENTS.md status tracker updated
- ✅ Main documentation updated with screenshot references

---

## Next Steps After Completion

1. Share screenshots with migration team for review
2. Add annotations/highlights if needed (use image editor)
3. Embed screenshots in main documentation
4. Update topicplan.md to mark screenshot task as complete
5. Commit to version control (if applicable)

---

## Support Resources

- **SAP Community**: https://community.sap.com
- **SAP Help Portal**: https://help.sap.com
- **OpenSAP**: https://open.sap.com
- **Image-fetcher skill**: `.claude/skills/image-fetcher/skill.md`
- **Questions**: Contact migration team lead

---

**Document Owner**: Migration Team Lead
**Last Updated**: October 2025
**Status**: Ready to use

**Good luck with your screenshot collection!**

**END OF QUICK START GUIDE**
