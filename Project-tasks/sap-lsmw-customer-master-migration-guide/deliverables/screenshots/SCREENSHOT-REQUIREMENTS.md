# Screenshot Requirements for SAP LSMW Customer Master Migration Guide

**Document Version**: 1.0
**Date**: October 2025
**Purpose**: Define required screenshots for the LSMW migration guide

---

## Overview

This document lists all 30 screenshots required for the comprehensive SAP LSMW Customer Master Migration Guide. Each screenshot should be captured from SAP ECC system during actual LSMW execution or XD01 transaction.

---

## Screenshot Specifications

**Format**: PNG (recommended) or JPG
**Resolution**: Minimum 1024x768 pixels
**File Naming**: Use exact names below for consistency
**Quality**: High resolution, readable text, no personal data visible

---

## Required Screenshots

### XD01 Transaction Screenshots (3 screenshots)

**01-KNA1-General-Data-XD01.png**
- **Transaction**: XD01 (Create Customer)
- **Tab**: General Data
- **Content**: Show KNA1 fields (Customer Name, Street, City, Country, etc.)
- **Sample Data**: Use dummy customer "Test Corp" with address "123 Main St, New York, NY, US"
- **Annotations**: Highlight NAME1, STRAS, ORT01, LAND1 fields

**02-KNB1-Company-Code-Data-XD01.png**
- **Transaction**: XD01
- **Tab**: Company Code Data
- **Content**: Show KNB1 fields (Company Code, Reconciliation Account, Payment Terms)
- **Sample Data**: Company Code 1000, Recon Account 140000, Payment Terms 0001
- **Annotations**: Highlight BUKRS, AKONT, ZTERM fields

**03-KNVV-Sales-Area-Data-XD01.png**
- **Transaction**: XD01
- **Tab**: Sales Area Data
- **Content**: Show KNVV fields (Sales Org, Dist Channel, Division, Shipping Conditions)
- **Sample Data**: Sales Org 1000, Dist Channel 01, Division 00
- **Annotations**: Highlight VKORG, VTWEG, SPART, VSBED fields

---

### LSMW 14 Steps Screenshots (17 screenshots)

**04-LSMW-Step1-Object-Attributes.png**
- **Transaction**: LSMW
- **Step**: 1 - Maintain Object Attributes
- **Content**: Show object creation screen with Project, Subproject, Object fields
- **Sample Data**:
  - Project: CUST_MASTER
  - Subproject: INITIAL_LOAD
  - Object: XD01_CUSTOMER
  - Object Type: Batch Input Recording
- **Annotations**: Highlight all input fields

**05-LSMW-Step2-Source-Structures.png**
- **Transaction**: LSMW
- **Step**: 2 - Maintain Source Structures
- **Content**: Show source structure list with CUST_HEADER, CUST_COMPANY, CUST_SALES
- **Annotations**: Show structure names and descriptions

**06-LSMW-Step3-Source-Fields-Header.png**
- **Transaction**: LSMW
- **Step**: 3 - Maintain Source Fields
- **Content**: Show source field list for CUST_HEADER structure
- **Sample Fields**: CUSTOMER_ID, CUSTOMER_NAME, STREET, CITY, COUNTRY
- **Annotations**: Highlight field names, data types, and lengths

**07-LSMW-Step3-Source-Fields-Complete.png**
- **Transaction**: LSMW
- **Step**: 3 - Maintain Source Fields
- **Content**: Show overview of all 3 structures with field counts
- **Statistics**: CUST_HEADER (15 fields), CUST_COMPANY (10 fields), CUST_SALES (12 fields)

**08-LSMW-Step4-Structure-Relations.png**
- **Transaction**: LSMW
- **Step**: 4 - Maintain Structure Relations
- **Content**: Show hierarchical structure tree
- **Tree Display**:
  ```
  CUST_HEADER (1)
    ├── CUST_COMPANY (*)
    └── CUST_SALES (*)
  ```
- **Annotations**: Highlight 1:N relationship indicators

**09-LSMW-Step5-Field-Mapping-Overview.png**
- **Transaction**: LSMW
- **Step**: 5 - Maintain Field Mapping and Conversion Rules
- **Content**: Show field mapping screen with source and target columns
- **Sample Mappings**:
  - CUSTOMER_NAME → NAME1
  - STREET → STRAS
  - CITY → ORT01
- **Annotations**: Show source field, arrow, target field, mapping type

**10-LSMW-Step5-Field-Mapping-Details.png**
- **Transaction**: LSMW
- **Step**: 5 - Field Mapping details
- **Content**: Show detailed mapping for one field with conversion rule
- **Example**: COUNTRY (source) → LAND1 (target) with translation table T_COUNTRY_MAP
- **Annotations**: Highlight translation assignment

**11-LSMW-Step6-Fixed-Values.png**
- **Transaction**: LSMW
- **Step**: 6 - Maintain Fixed Values
- **Content**: Show fixed value assignment screen
- **Sample Fixed Values**:
  - KTOKD = KUNA
  - AKONT = 140000
  - SPRAS = E
- **Annotations**: Highlight field and fixed value columns

**12-LSMW-Step6-Translation-Table.png**
- **Transaction**: LSMW
- **Step**: 6 - Maintain Translations
- **Content**: Show translation table editor
- **Sample Table**: T_COUNTRY_MAP
  - USA → US
  - United Kingdom → GB
  - Germany → DE
- **Annotations**: Highlight source value and target value columns

**13-LSMW-Step6-User-Routine.png**
- **Transaction**: LSMW
- **Step**: 6 - User-Defined Routines
- **Content**: Show ABAP editor with user routine code
- **Sample Routine**: CONVERT_CUSTOMER_NUMBER with ALPHA_INPUT function
- **Annotations**: Highlight routine name and ABAP code

**14-LSMW-Step7-Specify-Files.png**
- **Transaction**: LSMW
- **Step**: 7 - Specify Files
- **Content**: Show file specification screen
- **Sample Data**:
  - File Name: C:\Data\Customer_Master.txt
  - File Type: ASCII (Tab-delimited)
  - Code Page: 4110 (UTF-8)
- **Annotations**: Highlight file path and format settings

**15-LSMW-Step8-Assign-Files.png**
- **Transaction**: LSMW
- **Step**: 8 - Assign Files
- **Content**: Show file assignment to structures
- **Display**: Each structure with assigned file path
- **Annotations**: Show structure name → file name mappings

**16-LSMW-Step9-Read-Data.png**
- **Transaction**: LSMW
- **Step**: 9 - Read Data
- **Content**: Show execution screen with progress bar and results
- **Sample Results**:
  - Records read: 100
  - Errors: 0
  - Processing time: 2 seconds
- **Annotations**: Highlight record count and status

**17-LSMW-Step10-Display-Read-Data.png**
- **Transaction**: LSMW
- **Step**: 10 - Display Read Data
- **Content**: Show data table with 5-10 sample records
- **Columns**: CUSTOMER_ID, CUSTOMER_NAME, CITY, COUNTRY
- **Sample Data**: Show readable customer data
- **Annotations**: Highlight column headers

**18-LSMW-Step11-Convert-Data.png**
- **Transaction**: LSMW
- **Step**: 11 - Convert Data
- **Content**: Show execution screen with conversion results
- **Sample Results**:
  - Records converted: 100
  - Errors: 0
  - Warnings: 5 (optional fields blank)
- **Annotations**: Highlight conversion summary

**19-LSMW-Step12-Display-Converted-Data.png**
- **Transaction**: LSMW
- **Step**: 12 - Display Converted Data
- **Content**: Show data table in SAP format (with SAP field names)
- **Columns**: KUNNR (padded), NAME1, ORT01, LAND1 (translated)
- **Example**: 0000100001, ABC Corp, New York, US
- **Annotations**: Show transformation results (compare to Step 10)

**20-LSMW-Step13-Create-BI-Session.png**
- **Transaction**: LSMW
- **Step**: 13 - Create Batch Input Session
- **Content**: Show batch input session creation screen
- **Sample Data**:
  - Session Name: CUST_LOAD_20251026
  - User: [SAP User]
  - Process Mode: Display Errors Only
  - Keep Session: Checked
- **Annotations**: Highlight session name and processing mode

---

### SM35 Batch Input Screenshots (4 screenshots)

**21-SM35-Session-Overview.png**
- **Transaction**: SM35 (Batch Input: Session Overview)
- **Content**: Show session list with created session
- **Sample Data**:
  - Session Name: CUST_LOAD_20251026
  - Status: New
  - Transactions: 100
  - Created by: [User]
  - Created on: 26.10.2025
- **Annotations**: Highlight session row

**22-SM35-Processing-Session.png**
- **Transaction**: SM35
- **Content**: Show batch input processing in progress
- **Display**: Transaction counter incrementing (e.g., "Transaction 45 of 100")
- **Annotations**: Show progress indicator and current transaction

**23-SM35-Error-Screen.png**
- **Transaction**: SM35
- **Content**: Show error screen during processing (example error)
- **Sample Error**: "Account group KUNA not defined"
- **Display**: Error message with field highlighted (KTOKD)
- **Annotations**: Highlight error message text

**24-XD03-Customer-Display.png**
- **Transaction**: XD03 (Display Customer)
- **Content**: Show successfully created customer
- **Sample Data**: Customer 0000100001 with all data populated
- **Tabs**: Show General, Company Code, and Sales Area tabs
- **Annotations**: Verify data matches source file

---

### SHDB Recording Screenshots (3 screenshots)

**25-SHDB-Recording-Overview.png**
- **Transaction**: SHDB (Batch Input: Recording)
- **Content**: Show recording list with XD01_REC
- **Display**: Recording name, date created, number of steps
- **Annotations**: Highlight recording row

**26-SHDB-Recording-Steps.png**
- **Transaction**: SHDB
- **Content**: Show detailed recording steps for XD01
- **Display**: Screen names (SAPMF02D 0100, 0110, etc.) and field entries
- **Annotations**: Show screen sequence

**27-SHDB-Recording-Playback.png**
- **Transaction**: SHDB
- **Content**: Show recording playback execution screen
- **Display**: XD01 screen populated with recorded values
- **Annotations**: Show playback in progress

---

### Additional Screenshots (3 screenshots)

**28-SE16-KNA1-Table-Data.png**
- **Transaction**: SE16 (Data Browser)
- **Table**: KNA1
- **Content**: Show customer records in database table
- **Filter**: WHERE ERDAT = '20251026' (migration date)
- **Columns**: KUNNR, NAME1, ORT01, LAND1
- **Annotations**: Highlight created records

**29-Configuration-OBAR-Account-Groups.png**
- **Transaction**: OBAR (Define Account Groups)
- **Content**: Show account group configuration
- **Sample Data**: KUNA - Domestic Customer with number range
- **Annotations**: Highlight account group and number range assignment

**30-Error-Log-Example.png**
- **Source**: Excel or text file
- **Content**: Show error log template with sample error entries
- **Columns**: Date, Error Type, Message, Resolution, Status
- **Annotations**: Show complete error documentation

---

## Screenshot Capture Guidelines

### Best Practices

1. **Resolution**: Capture at minimum 1024x768, ideally 1920x1080
2. **Clarity**: Ensure text is readable, no blurriness
3. **Cropping**: Remove unnecessary borders, focus on relevant screen area
4. **Annotations**: Add arrows/boxes to highlight key fields (use red color)
5. **Data Privacy**: Use dummy/test data only, no production customer data
6. **Consistency**: Use same SAP system/client for all screenshots

### Tools

- **Windows**: Snipping Tool, Snagit, Greenshot
- **SAP GUI**: Built-in screenshot tool (Ctrl+Print Screen)
- **Annotation**: Paint, Snagit, Adobe Photoshop

### File Organization

```
screenshots/
├── 01-KNA1-General-Data-XD01.png
├── 02-KNB1-Company-Code-Data-XD01.png
├── 03-KNVV-Sales-Area-Data-XD01.png
├── 04-LSMW-Step1-Object-Attributes.png
├── ...
└── 30-Error-Log-Example.png
```

---

## Screenshot Status Tracker

| # | Screenshot Name | Required | Captured | Annotated | Reviewed | Status |
|---|-----------------|----------|----------|-----------|----------|--------|
| 01 | 01-KNA1-General-Data-XD01.png | Yes | ☐ | ☐ | ☐ | Pending |
| 02 | 02-KNB1-Company-Code-Data-XD01.png | Yes | ☐ | ☐ | ☐ | Pending |
| 03 | 03-KNVV-Sales-Area-Data-XD01.png | Yes | ☐ | ☐ | ☐ | Pending |
| ... | ... | ... | ... | ... | ... | ... |
| 30 | 30-Error-Log-Example.png | Yes | ☐ | ☐ | ☐ | Pending |

---

## Alternative: Screenshot URLs

If screenshots are available online (SAP training materials, vendor documentation), provide URLs below for download using image-fetcher skill:

**Example:**
```
Screenshot 01: https://example.com/sap-screenshots/xd01-general-data.png
Screenshot 02: https://example.com/sap-screenshots/knb1-company-code.png
...
```

**Download Command:**
```bash
python .claude/skills/image-fetcher/scripts/fetch_image.py \
  <URL> \
  Project-tasks/sap-lsmw-customer-master-migration-guide/deliverables/screenshots/
```

---

## Notes

- Screenshots are placeholders until actual SAP system access is available
- Guide is complete and usable without screenshots (detailed text descriptions provided)
- Screenshots enhance visual learning but are not mandatory for technical accuracy
- Can be added post-migration during documentation review phase

---

**Document Owner**: Migration Team Lead
**Last Updated**: October 2025
**Status**: Placeholder - Awaiting SAP system access for capture

**END OF SCREENSHOT REQUIREMENTS**
