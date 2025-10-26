# SAP LSMW Screenshot Image Sources and URLs

**Document Version**: 1.0
**Date**: October 2025
**Purpose**: Provide sources and URLs for downloading SAP LSMW screenshots

---

## Important Note

This document provides guidance on where to find SAP LSMW screenshots online, as direct web search capability was not available during initial documentation creation.

**How to use this document:**
1. Visit the recommended sources below
2. Search for LSMW screenshots
3. Copy image URLs to the `screenshot-urls.txt` file
4. Run the batch download script (see instructions at bottom)

---

## Recommended Image Sources

### 1. SAP Community (community.sap.com)

**Best for**: Official SAP screenshots, tutorials, blog posts

**Search URLs:**
- LSMW Tutorial: https://community.sap.com/search/?q=lsmw%20tutorial%20screenshot
- LSMW Step by Step: https://community.sap.com/search/?q=lsmw%20step%20by%20step
- Customer Master LSMW: https://community.sap.com/search/?q=lsmw%20customer%20master%20xd01

**What to look for:**
- Tutorial blog posts with embedded screenshots
- Step-by-step LSMW guides
- Community questions with screenshot attachments

---

### 2. SAP Help Portal (help.sap.com)

**Best for**: Official documentation screenshots

**Search URLs:**
- LSMW Documentation: https://help.sap.com/docs/search?q=LSMW&locale=en-US
- Batch Input: https://help.sap.com/docs/search?q=Batch%20Input%20LSMW

**What to look for:**
- Official SAP documentation with embedded images
- Configuration guides
- Process flow diagrams

---

### 3. SAP Training and Education Sites

**Best for**: High-quality tutorial screenshots

**Recommended Sites:**
- SAP Learning Hub (requires login): https://learning.sap.com
- OpenSAP courses: https://open.sap.com
- SAP Training Shop materials

**What to look for:**
- Course materials with screenshots
- Hands-on exercise guides
- Simulation screenshots

---

### 4. SAP Consultant Blogs and Websites

**Best for**: Real-world implementation screenshots

**Recommended Search Terms (use Google/Bing):**
- "SAP LSMW tutorial with screenshots"
- "LSMW step by step guide"
- "SAP customer master migration LSMW"
- "LSMW batch input recording tutorial"
- "SAP XD01 LSMW example"

**Popular SAP Blog Sites:**
- https://blogs.sap.com
- Individual consultant blogs (search for SAP LSMW consultants)

---

### 5. YouTube Video Thumbnails and Screenshots

**Best for**: Tutorial video screenshots

**Search URLs:**
- YouTube LSMW: https://www.youtube.com/results?search_query=sap+lsmw+tutorial
- YouTube Customer Master: https://www.youtube.com/results?search_query=sap+lsmw+customer+master+xd01

**How to get images:**
- Pause videos at relevant screens
- Use video thumbnail images
- Some tutorials provide downloadable slide decks

---

### 6. SlideShare and Presentation Sites

**Best for**: Presentation screenshots, diagrams

**Search URLs:**
- SlideShare LSMW: https://www.slideshare.net/search?q=sap+lsmw
- Scribd SAP LSMW: https://www.scribd.com/search?query=sap%20lsmw

**What to look for:**
- Training presentations
- Workshop materials
- Conference presentations

---

## Priority Screenshots to Find (Top 14)

Focus on finding these critical screenshots first:

### High Priority (LSMW 14 Steps)

1. **LSMW Step 1: Maintain Object Attributes**
   - Search: "LSMW maintain object attributes screenshot"
   - Shows: Project, Subproject, Object fields

2. **LSMW Step 2: Maintain Source Structures**
   - Search: "LSMW source structures screenshot"
   - Shows: Structure list with names

3. **LSMW Step 3: Maintain Source Fields**
   - Search: "LSMW source fields screenshot"
   - Shows: Field list with types and lengths

4. **LSMW Step 4: Maintain Structure Relations**
   - Search: "LSMW structure relations screenshot"
   - Shows: Hierarchical tree view

5. **LSMW Step 5: Field Mapping**
   - Search: "LSMW field mapping screenshot"
   - Shows: Source to target field mappings

6. **LSMW Step 6: Fixed Values/Translations**
   - Search: "LSMW fixed values screenshot"
   - Shows: Fixed value assignments

7. **LSMW Step 7: Specify Files**
   - Search: "LSMW specify files screenshot"
   - Shows: File path and format settings

8. **LSMW Step 8: Assign Files**
   - Search: "LSMW assign files screenshot"
   - Shows: File to structure assignment

9. **LSMW Step 9: Read Data**
   - Search: "LSMW read data screenshot"
   - Shows: Execution results

10. **LSMW Step 10: Display Read Data**
    - Search: "LSMW display read data screenshot"
    - Shows: Data table preview

11. **LSMW Step 11: Convert Data**
    - Search: "LSMW convert data screenshot"
    - Shows: Conversion results

12. **LSMW Step 12: Display Converted Data**
    - Search: "LSMW display converted data screenshot"
    - Shows: Converted data in SAP format

13. **LSMW Step 13: Create Batch Input Session**
    - Search: "LSMW create batch input session screenshot"
    - Shows: Session creation screen

14. **LSMW Step 14: Run Batch Input Session** (SM35)
    - Search: "SAP SM35 batch input screenshot"
    - Shows: Session overview in SM35

### Medium Priority (XD01 and Verification)

15. **XD01 General Data (KNA1)**
    - Search: "SAP XD01 general data screenshot"

16. **XD01 Company Code Data (KNB1)**
    - Search: "SAP XD01 company code screenshot"

17. **XD01 Sales Area Data (KNVV)**
    - Search: "SAP XD01 sales area screenshot"

18. **XD03 Customer Display**
    - Search: "SAP XD03 display customer screenshot"

---

## How to Extract Image URLs

### Method 1: Right-click on Image (Most Browsers)
1. Find the image on the webpage
2. Right-click on the image
3. Select "Copy Image Address" or "Copy Image URL"
4. Paste into `screenshot-urls.txt`

### Method 2: Inspect Element (Advanced)
1. Right-click on image → "Inspect" or "Inspect Element"
2. Find the `<img>` tag in the HTML
3. Copy the `src="..."` attribute value
4. Paste into `screenshot-urls.txt`

### Method 3: Browser Extensions
- Use image downloader extensions (e.g., Image Downloader, Fatkun Batch Download)
- Extract all image URLs from a page
- Filter for LSMW-related images

---

## Example Image URLs (Template)

Below are example URL patterns to look for:

```
# XD01 Screenshots
https://community.sap.com/.../.../xd01-general-data.png
https://help.sap.com/.../customer-master-xd01.jpg

# LSMW Steps
https://blogs.sap.com/.../lsmw-step1-object-attributes.png
https://www.example.com/sap-training/lsmw-step2-structures.png

# SM35 Batch Input
https://saptrainingcenter.com/.../sm35-session-overview.jpg
```

---

## URL Collection Template File

Create a file `screenshot-urls.txt` with one URL per line:

```
# LSMW Step 1
https://example.com/lsmw-step1.png

# LSMW Step 2
https://example.com/lsmw-step2.png

# XD01 General Data
https://example.com/xd01-general.png

# Add more URLs below
```

---

## Batch Download Instructions

Once you have collected image URLs in `screenshot-urls.txt`:

### Step 1: Verify URLs File

```bash
# Check the URLs file exists and has content
cat Project-tasks/sap-lsmw-customer-master-migration-guide/deliverables/screenshots/screenshot-urls.txt
```

### Step 2: Run Batch Download

```bash
# Download all images at once
python .claude/skills/image-fetcher/scripts/fetch_images_batch.py \
  "Project-tasks/sap-lsmw-customer-master-migration-guide/deliverables/screenshots/screenshot-urls.txt" \
  "Project-tasks/sap-lsmw-customer-master-migration-guide/deliverables/screenshots/"
```

### Step 3: Verify Downloads

```bash
# List downloaded images
ls -lh Project-tasks/sap-lsmw-customer-master-migration-guide/deliverables/screenshots/*.png
ls -lh Project-tasks/sap-lsmw-customer-master-migration-guide/deliverables/screenshots/*.jpg
```

### Step 4: Rename Files to Match Requirements

```bash
# Example: Rename downloaded files to match naming convention
mv screenshot1.png 04-LSMW-Step1-Object-Attributes.png
mv screenshot2.png 05-LSMW-Step2-Source-Structures.png
# ... etc.
```

---

## Alternative: Manual Screenshot Capture

If suitable images are not available online, screenshots must be captured from a live SAP system:

### Requirements
- Access to SAP ECC system
- LSMW transaction access
- XD01/XD03 transaction access
- SM35 transaction access (Batch Input)
- SHDB transaction access (Recording)

### Tools
- Windows Snipping Tool
- Snagit
- Greenshot
- SAP GUI built-in screenshot (Ctrl+Print Screen)

### Process
1. Log in to SAP system
2. Execute transaction (e.g., LSMW)
3. Navigate to specific step
4. Capture screenshot
5. Save as PNG with naming convention from SCREENSHOT-REQUIREMENTS.md
6. Annotate key fields using image editor

---

## Quality Checklist

Before using downloaded screenshots, verify:

- ✅ Image resolution: minimum 1024x768 pixels
- ✅ Text is readable and clear
- ✅ Shows correct LSMW step or transaction
- ✅ No personal/production data visible
- ✅ File format is PNG or JPG
- ✅ File name matches requirements document
- ✅ Image is from legitimate SAP source

---

## Copyright and Usage

**Important**: When using images from the web:

1. **Verify License**: Ensure images are for educational/documentation use
2. **Give Credit**: Cite the source if required
3. **SAP Official Images**: Preferred source (SAP Help, SAP Community)
4. **Avoid Production Data**: Never use screenshots with real customer data
5. **Fair Use**: Use for internal training/documentation purposes

---

## Next Steps

1. ✅ Visit recommended sources above
2. ✅ Search for LSMW screenshots
3. ✅ Copy image URLs to `screenshot-urls.txt`
4. ✅ Run batch download script
5. ✅ Rename files to match requirements
6. ✅ Update documentation with actual screenshot references

---

## Support Resources

If you need assistance finding screenshots:

- **SAP Community Forums**: Post a request for LSMW screenshots
- **LinkedIn SAP Groups**: Ask SAP consultants for training materials
- **SAP User Groups**: Local chapters may have presentation materials
- **SAP Training Partners**: May provide sample screenshots

---

**Document Owner**: Migration Team Lead
**Last Updated**: October 2025
**Status**: Ready for URL collection

**END OF IMAGE SOURCES GUIDE**
