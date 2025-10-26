# LSMW Troubleshooting Guide
## Customer Master Data Migration - Common Errors and Solutions

**Version**: 1.0
**Date**: October 2025
**Purpose**: Comprehensive troubleshooting reference for LSMW customer master migration
**Audience**: SAP Consultants, Migration Teams

---

## Table of Contents

1. [File Reading Errors (Step 9)](#file-reading-errors-step-9)
2. [Data Conversion Errors (Step 11)](#data-conversion-errors-step-11)
3. [Batch Input Processing Errors (Step 14)](#batch-input-processing-errors-step-14)
4. [Configuration Errors](#configuration-errors)
5. [Authorization Errors](#authorization-errors)
6. [Data Quality Errors](#data-quality-errors)
7. [System Performance Issues](#system-performance-issues)
8. [Character Encoding Issues](#character-encoding-issues)
9. [Field Mapping Errors](#field-mapping-errors)
10. [Translation Table Errors](#translation-table-errors)

---

## File Reading Errors (Step 9)

### Error 001: File not found

**Error Message**:
```
Error reading file: C:\Data\Customer_Master.txt
File not found or access denied
```

**Symptoms**:
- LSMW Step 9 (Read Data) fails immediately
- No records read
- Error log shows file path

**Root Causes**:
1. Incorrect file path specified in Step 7
2. File doesn't exist at specified location
3. Network path not accessible
4. SAP user lacks file system permissions
5. File is locked by another application (Excel)

**Solutions**:

**Solution 1: Verify File Exists**
```bash
# On SAP application server
cd /path/to/file
ls -la Customer_Master.txt

# On Windows
dir C:\Data\Customer_Master.txt
```

**Solution 2: Check File Permissions**
```bash
# Ensure SAP user has read access
chmod 644 Customer_Master.txt  # Unix/Linux
# Or right-click → Properties → Security (Windows)
```

**Solution 3: Use UNC Path Instead of Mapped Drive**
```
❌ Wrong: Z:\Data\Customer_Master.txt
✅ Right: \\server\share\Data\Customer_Master.txt
```

**Solution 4: Copy File to SAP Application Server**
```
Use transaction: CG3Z (Upload file from PC to application server)
Then specify application server path in LSMW Step 7:
/usr/sap/trans/data/Customer_Master.txt
```

**Solution 5: Close File in Excel**
- Close Customer_Master.txt if open in Excel
- Retry LSMW Step 9

**Prevention**:
- Test file access before starting LSMW (try opening in Notepad)
- Use absolute paths, not relative paths
- Document file location in migration checklist

---

### Error 002: Field separator mismatch

**Error Message**:
```
Error parsing line 1: Expected 15 fields, found 1
Field separator mismatch
```

**Symptoms**:
- Step 9 reads file but shows only 1 field per record
- All data appears in first column
- Field count doesn't match source structure definition

**Root Causes**:
1. File saved with wrong delimiter (comma instead of tab)
2. LSMW Step 7 specifies wrong field separator
3. Excel auto-converted delimiter during save

**Solutions**:

**Solution 1: Verify File Delimiter**
```
Open file in Notepad++
View → Show Symbol → Show All Characters
- Tab delimiter: Shows arrow symbol (→)
- Comma delimiter: Shows comma (,)
- Semicolon delimiter: Shows semicolon (;)
```

**Solution 2: Re-save File with Correct Delimiter**

**For Tab-Delimited:**
```
Excel → Save As → Text (Tab delimited) (*.txt)
```

**For CSV (Comma-delimited):**
```
Excel → Save As → CSV (Comma delimited) (*.csv)
```

**Solution 3: Update LSMW Step 7**
```
LSMW → Step 7 → Specify Files
Field Separator: Change to match actual file
- Tab → Tab character
- Comma → ,
- Semicolon → ;
```

**Solution 4: Manual Conversion (if needed)**
```
PowerShell script to convert comma to tab:
Get-Content input.csv | ForEach-Object { $_ -replace ',', "`t" } | Set-Content output.txt
```

**Prevention**:
- Standardize on one delimiter (recommend tab-delimited)
- Document delimiter requirement in data file template
- Always test with sample file before production

---

### Error 003: Character encoding error

**Error Message**:
```
Error reading file: Invalid character at position 125
Character encoding error (expected UTF-8, found ANSI)
```

**Symptoms**:
- Special characters display as �, ?, or boxes
- Customer names with accents corrupted (Müller → M�ller)
- Step 9 fails or reads incorrect data

**Root Causes**:
1. File saved in ANSI encoding instead of UTF-8
2. LSMW Step 7 specifies wrong code page
3. Excel default encoding doesn't match SAP requirement

**Solutions**:

**Solution 1: Re-save File as UTF-8**

**Method 1 - Notepad++:**
```
1. Open file in Notepad++
2. Encoding → Convert to UTF-8
3. File → Save
4. Verify: Encoding menu shows "UTF-8" (bottom right)
```

**Method 2 - Excel:**
```
1. Open file in Excel
2. Save As → CSV UTF-8 (Comma delimited) (*.csv)
3. Note: This changes delimiter to comma!
4. May need to convert back to tab-delimited
```

**Method 3 - PowerShell:**
```powershell
Get-Content input.txt | Set-Content -Encoding UTF8 output.txt
```

**Solution 2: Update LSMW Step 7 Code Page**
```
LSMW → Step 7 → Specify Files
Code Page: 4110 (UTF-8)
```

**Common Code Pages**:
| Code Page | Encoding | Use Case |
|-----------|----------|----------|
| 4110 | UTF-8 | **Recommended** - Universal |
| 1100 | ISO-8859-1 | Western European (Latin-1) |
| 1101 | ISO-8859-2 | Central European |
| 4102 | Windows-1252 | Windows Western European |

**Solution 3: Test Encoding**
```
Create test file with special characters:
Müller, François, Pérez, 北京

Read in LSMW Step 9 → Display Read Data (Step 10)
Verify characters display correctly
```

**Prevention**:
- Standardize on UTF-8 encoding for all migrations
- Include encoding requirement in data file template
- Test with sample data containing special characters

---

### Error 004: Record length exceeded

**Error Message**:
```
Error reading line 25: Record length 1024 exceeds maximum 512
Record too long
```

**Symptoms**:
- Step 9 fails on specific record
- Error log shows line number
- Some records read successfully, others fail

**Root Causes**:
1. Source field contains data exceeding defined length (Step 3)
2. Extra delimiter in data causing field shift
3. Line break within field (multi-line text)

**Solutions**:

**Solution 1: Increase Source Field Length (Step 3)**
```
LSMW → Step 3 → Maintain Source Fields
Select field with long data (e.g., CUSTOMER_NAME)
Change length from 35 to 70
Save → Re-run Step 9
```

**Solution 2: Truncate Source Data**
```
In Excel, before export:
=LEFT(A2, 35)  # Truncate to 35 characters
Apply to all long fields
```

**Solution 3: Fix Multi-line Data**
```
Excel → Find & Replace
Find: CHAR(10) or CHAR(13)  # Line breaks
Replace: (space)
Replace All
```

**Solution 4: Identify Problem Records**
```
Open source file in text editor
Search for line number from error message (line 25)
Review data for extra delimiters or line breaks
Manually fix and re-save
```

**Prevention**:
- Define source field lengths generously (Step 3)
- Clean source data before export (remove line breaks)
- Validate source file format before LSMW

---

## Data Conversion Errors (Step 11)

### Error 101: Translation not found

**Error Message**:
```
Translation not found for source value "United States"
Source field: COUNTRY
Target field: LAND1
Translation table: T_COUNTRY_MAP
```

**Symptoms**:
- Step 11 (Convert Data) completes with errors
- Display Converted Data (Step 12) shows blank values
- Conversion log lists missing translations

**Root Causes**:
1. Translation table entry missing for source value
2. Source value has leading/trailing spaces
3. Case mismatch (source: "USA", table: "usa")
4. Translation table not assigned to field mapping

**Solutions**:

**Solution 1: Add Missing Translation**
```
LSMW → Step 6 → Maintain Translations
Select translation table: T_COUNTRY_MAP
Click "New Entry"
Source Value: United States
Target Value: US
Save
```

**Solution 2: Clean Source Data**
```
In Excel:
=TRIM(A2)  # Remove leading/trailing spaces
=PROPER(A2)  # Standardize case
```

**Solution 3: Create Comprehensive Translation Table**
```
Add all variations:
USA → US
United States → US
U.S.A. → US
US → US
```

**Solution 4: Verify Translation Assignment**
```
LSMW → Step 5 → Field Mapping
Select LAND1 field
Verify "Translation" is selected
Verify correct translation table assigned
```

**Solution 5: Use Wildcard Translation** (advanced)
```
In user-defined routine:
CASE SOURCE_VALUE.
  WHEN 'USA' OR 'United States' OR 'U.S.A.'.
    TARGET_VALUE = 'US'.
  WHEN 'United Kingdom' OR 'UK' OR 'England'.
    TARGET_VALUE = 'GB'.
  WHEN OTHERS.
    * Log error or default value
    TARGET_VALUE = 'XX'.
ENDCASE.
```

**Prevention**:
- Create translation tables during LSMW setup (before Step 9)
- Test translation with sample data
- Document all possible source value variations

**Complete Translation Table Example**:
```sql
SELECT DISTINCT COUNTRY FROM SOURCE_TABLE;
-- Review results
-- Add ALL values to translation table
```

---

### Error 102: Conversion routine error

**Error Message**:
```
Runtime error in user-defined routine CONVERT_CUSTOMER_NUMBER
Error: CONVT_NO_NUMBER (conversion error - not a number)
Line: 15
```

**Symptoms**:
- Step 11 fails with dump
- Specific customer records cause error
- Conversion log shows ABAP runtime error

**Root Causes**:
1. Bug in user-defined routine (Step 6)
2. Source data contains non-numeric characters in numeric field
3. Null/blank value not handled in routine

**Solutions**:

**Solution 1: Debug Routine**
```
LSMW → Step 6 → Maintain User-Defined Routines
Select routine: CONVERT_CUSTOMER_NUMBER
Click "Check" → Review syntax errors
Click "Test" → Enter test value → Execute
Review output
```

**Solution 2: Add Error Handling to Routine**
```abap
FORM CONVERT_CUSTOMER_NUMBER
  USING    SOURCE_VALUE
  CHANGING TARGET_VALUE.

  DATA: lv_test TYPE i.

  * Check if source value is numeric
  TRY.
      lv_test = SOURCE_VALUE.
    CATCH cx_sy_conversion_no_number.
      * Handle non-numeric value
      TARGET_VALUE = '0000000000'.  " Default value
      EXIT.
  ENDTRY.

  * Call standard conversion
  CALL FUNCTION 'CONVERSION_EXIT_ALPHA_INPUT'
    EXPORTING
      input  = SOURCE_VALUE
    IMPORTING
      output = TARGET_VALUE.

ENDFORM.
```

**Solution 3: Fix Source Data**
```
Identify non-numeric customer IDs:
In Excel: =ISNUMBER(A2)
Filter for FALSE values
Correct or remove non-numeric characters
```

**Solution 4: Handle Blank Values**
```abap
* Add blank check at start of routine
IF SOURCE_VALUE IS INITIAL.
  TARGET_VALUE = ''.  " Or default value
  EXIT.
ENDIF.
```

**Prevention**:
- Test routines with edge cases (blank, null, special chars)
- Add error handling (TRY...CATCH)
- Validate source data before conversion

---

### Error 103: Field length exceeded during conversion

**Error Message**:
```
Conversion error: Target field LAND1 (length 3) exceeded
Source value: "United States of America" (24 characters)
```

**Symptoms**:
- Step 11 completes with warnings
- Step 12 shows truncated values
- Data loss during conversion

**Root Causes**:
1. Direct mapping used instead of translation
2. Source field longer than target field
3. Conversion logic generates longer value than target can hold

**Solutions**:

**Solution 1: Use Translation Instead of Direct Mapping**
```
LSMW → Step 5 → Field Mapping
Change LAND1 mapping from "Direct" to "Translation"
Assign translation table: T_COUNTRY_MAP
This converts "United States of America" → "US"
```

**Solution 2: Truncate in User Routine**
```abap
FORM TRUNCATE_FIELD
  USING    SOURCE_VALUE
  CHANGING TARGET_VALUE.

  TARGET_VALUE = SOURCE_VALUE+0(3).  " First 3 characters

ENDFORM.
```

**Solution 3: Use Substring in Field Mapping**
```
LSMW → Step 5 → Field Mapping
Conversion Rule: SUBSTRING 1-3
This auto-truncates to 3 characters
```

**Prevention**:
- Verify source field lengths match target in Step 3
- Use translations for code fields (country, state, etc.)
- Test conversion with longest source values

---

## Batch Input Processing Errors (Step 14)

### Error 201: Customer already exists

**Error Message**:
```
Customer 0000100001 already exists
Message no. VD 214
Cannot create duplicate customer number
```

**Symptoms**:
- Batch input session fails on specific customer
- Error screen shows in SM35
- Some customers created, others fail

**Root Causes**:
1. Customer number already exists in SAP (previous migration)
2. Duplicate records in source file
3. LSMW session run multiple times with same data

**Solutions**:

**Solution 1: Skip Existing Customers**

**Check if customer exists:**
```sql
SELECT KUNNR FROM KNA1 WHERE KUNNR = '0000100001';
```

**Remove from source file:**
```sql
-- Get list of existing customers
SELECT KUNNR FROM KNA1;

-- Cross-reference with source file
-- Remove existing customers from source file
-- Re-run LSMW Steps 9-14
```

**Solution 2: Use XD02 (Change) Instead of XD01 (Create)**
```
Create new LSMW object:
1. Transaction SHDB → New Recording: XD02_REC
2. Record XD02 transaction (same steps as XD01)
3. Create new LSMW object using XD02 recording
4. This UPDATES existing customers instead of creating
```

**Solution 3: Delete Existing Customers (if safe)**
```
⚠️ WARNING: Only if no transactions exist!

Check for dependencies:
SELECT COUNT(*) FROM VBAK WHERE KUNNR = '0000100001';  -- Sales orders
SELECT COUNT(*) FROM VBRK WHERE KUNNR = '0000100001';  -- Invoices

If count = 0 (safe to delete):
Transaction: XD06 → Enter customer → Delete
```

**Solution 4: Change Customer Numbering**
```
If legacy IDs conflict with existing SAP customers:
1. Define new number range (OBAR transaction)
2. Map legacy ID to new SAP ID in conversion routine:
   Legacy 100001 → SAP 2000100001 (prefix with 2)
```

**Prevention**:
- Query KNA1 for existing customers before migration
- Ensure source file has no duplicates (Excel COUNTIF)
- Use unique number range for migrated customers

---

### Error 202: Account group not defined

**Error Message**:
```
Account group KUNA is not defined in system
Entry 1 000 KUNA missing in table T077D
Message no. VD 046
```

**Symptoms**:
- Batch input fails immediately
- Error screen shows field KTOKD (Account Group)
- All customer creations fail with same error

**Root Causes**:
1. Customer account group not configured in SAP
2. Account group name misspelled in LSMW mapping
3. Account group exists but not for customer master (vendor account group used by mistake)

**Solutions**:

**Solution 1: Create Account Group**
```
Transaction: OBAR (Define Account Groups with Screen Layout - Customers)

Steps:
1. Execute OBAR
2. Click "New Entries"
3. Enter Account Group: KUNA
4. Enter Name: Domestic Customer
5. Assign Number Range:
   - From: 0000100001
   - To: 0000199999
   - External number assignment (manual)
   OR
   - Internal number assignment (SAP auto-generates)
6. Screen Layout:
   - General Data: Optional/Required field settings
   - Company Code Data: Optional/Required
   - Sales Data: Optional/Required
7. Click "Save"
```

**Solution 2: Verify Account Group Exists**
```
Transaction: SE16 → Table T077D
Search for KTOKD = 'KUNA'

If not found: Create using OBAR (Solution 1)
If found: Verify spelling in LSMW Step 5 or Step 6 (fixed value)
```

**Solution 3: Use Existing Account Group**
```
Transaction: OBAR → Display existing groups
Find appropriate group (e.g., KUNA, KUNE, KUNV)
Update LSMW:
  Step 5 or Step 6 → Change fixed value to existing group
```

**Solution 4: Copy from Another System** (if multi-system landscape)
```
Transaction: SE16 → Table T077D
Export account group configuration from DEV/QAS
Import to target system using LSMW or direct table entry (Basis team)
```

**Prevention**:
- Verify all configuration before migration (account groups, company codes, sales orgs)
- Create configuration checklist
- Test XD01 manually before LSMW

**Configuration Checklist:**
- [ ] Account groups created (OBAR)
- [ ] Number ranges assigned
- [ ] Company codes configured (OX02)
- [ ] Sales orgs created (OVXB)
- [ ] Reconciliation accounts exist (FS00)

---

### Error 203: Company code does not exist

**Error Message**:
```
Company code 1000 does not exist
Message no. F5 003
```

**Symptoms**:
- Batch input fails when creating company code data
- Works for general data, fails on company code tab
- All customers fail with same error

**Root Causes**:
1. Company code not configured in SAP
2. Company code misspelled in source file
3. Company code exists but not assigned to customer account group

**Solutions**:

**Solution 1: Create Company Code** (requires Basis/Finance authorization)
```
Transaction: OX02 (Maintain Company Code)

Steps:
1. Execute OX02
2. Click "New Entries"
3. Enter Company Code: 1000
4. Enter Company Name: US Company
5. Enter City: New York
6. Enter Currency: USD
7. Enter Language: EN
8. Enter Chart of Accounts: INT (or your COA)
9. Enter Fiscal Year Variant: K4 (Calendar year)
10. Click "Save"
```

**Solution 2: Verify Company Code Exists**
```
Transaction: SE16 → Table T001
Search for BUKRS = '1000'

If not found: Create using OX02 (Solution 1)
If found: Verify spelling in source file
```

**Solution 3: Assign Company Code to Sales Org** (if exists but not assigned)
```
Transaction: OVXB (Assign Sales Org to Company Code)

Steps:
1. Execute OVXB
2. Click "New Entries"
3. Sales Organization: 1000
4. Company Code: 1000
5. Click "Save"
```

**Solution 4: Use Existing Company Code**
```
Transaction: OX02 → Display existing company codes
Identify correct company code (e.g., 1000, US01, etc.)
Update source file with correct company code
Re-run LSMW Steps 9-14
```

**Prevention**:
- Verify organizational structure before migration
- Align source data with SAP org structure
- Document company code assignments

---

### Error 204: Reconciliation account does not exist

**Error Message**:
```
Reconciliation account 140000 does not exist in company code 1000
Message no. F5 104
G/L account 140000 not found
```

**Symptoms**:
- Batch input fails on company code data
- Error screen shows field AKONT (Reconciliation Account)
- May work for some company codes, fail for others

**Root Causes**:
1. G/L account 140000 not created in chart of accounts
2. G/L account exists but not assigned to company code 1000
3. G/L account has wrong account type (not reconciliation account)

**Solutions**:

**Solution 1: Create G/L Account** (requires Finance authorization)
```
Transaction: FS00 (G/L Account Maintenance)

Steps:
1. Execute FS00
2. Enter G/L Account: 140000
3. Enter Company Code: 1000
4. Click "Create"
5. Chart of Accounts section:
   - Account Group: SAKO (Reconciliation accounts)
   - Short Text: Customer Receivables
   - G/L Account Type: X (Reconciliation account)
6. Company Code section:
   - Currency: USD
   - Reconciliation Account: Check this box
7. Click "Save"
```

**Solution 2: Verify Account Exists**
```
Transaction: FS00 → Display
G/L Account: 140000
Company Code: 1000

Check:
- Account Type = X (Reconciliation)
- "Reconciliation account for account type" = D (Customer)
```

**Solution 3: Use Existing Reconciliation Account**
```
Transaction: FS00 → Search for customer reconciliation accounts
Find account with:
- Account Type = X
- Recon. account for = D (Customers)

Update LSMW:
  Step 6 → Fixed Value for AKONT = (found account number)
```

**Solution 4: Copy from Another Company Code**
```
Transaction: FS00 → Display account in working company code
Note configuration
Create same account in target company code (Solution 1)
```

**Prevention**:
- Verify chart of accounts configured before migration
- Ensure reconciliation accounts exist for all company codes
- Document G/L account assignments

**Reconciliation Account Requirements:**
- ✅ Account type = X (Reconciliation)
- ✅ Reconciliation account for = D (Customer)
- ✅ Assigned to company code
- ✅ Currency matches company code currency

---

### Error 205: Sales organization not assigned to company code

**Error Message**:
```
Sales organization 1000 is not assigned to company code 1000
Message no. VD 217
Assignment missing in table TVKOV
```

**Symptoms**:
- Batch input fails when creating sales area data
- General data and company code data created successfully
- Sales area tab fails

**Root Causes**:
1. Sales organization not assigned to company code in configuration
2. Incorrect sales org/company code combination in source data
3. Organizational structure not fully configured

**Solutions**:

**Solution 1: Assign Sales Org to Company Code**
```
Transaction: OVXB (Assign Sales Organization to Company Code)

Steps:
1. Execute OVXB
2. Click "New Entries"
3. Sales Organization: 1000
4. Company Code: 1000
5. Click "Save"
```

**Solution 2: Verify Assignment**
```
Transaction: SE16 → Table TVKOV
Search for:
- VKORG = '1000' (Sales Org)
- BUKRS = '1000' (Company Code)

If not found: Create using OVXB (Solution 1)
```

**Solution 3: Review Organizational Structure**
```
Transaction: OVXB → Display all assignments
Review which sales orgs are assigned to which company codes
Update source file to use valid combinations
```

**Solution 4: Create Sales Organization** (if doesn't exist)
```
Transaction: OVXC (Maintain Sales Organization)
Create sales org 1000
Then assign to company code using OVXB
```

**Prevention**:
- Document organizational structure before migration
- Verify sales org ↔ company code assignments
- Test XD01 manually with planned combinations

---

## Configuration Errors

### Error 301: Number range not defined for account group

**Error Message**:
```
No number range defined for account group KUNA in number range object DEBITOR
Message no. VD 015
```

**Symptoms**:
- Batch input fails when trying to generate customer number
- Error appears for internal number assignment
- All customers with account group KUNA fail

**Root Causes**:
1. Number range not assigned to account group
2. Number range interval missing
3. Number range object not maintained

**Solutions**:

**Solution 1: Assign Number Range to Account Group**
```
Transaction: OBAR (Define Account Groups)

Steps:
1. Execute OBAR
2. Select account group KUNA
3. Click "Change"
4. Number Range Assignment section:
   - Enter From Number: 0000100001
   - Enter To Number: 0000199999
   - Select "Internal" or "External" number assignment
5. Click "Save"
```

**Solution 2: Maintain Number Range Intervals**
```
Transaction: XDN1 (Customer Number Ranges)

Steps:
1. Execute XDN1
2. Click "Intervals"
3. Click "Change Intervals"
4. Click "Insert Interval"
5. Enter:
   - No.: 01 (interval number)
   - From No.: 0000100001
   - To Number: 0000199999
   - Current Number: 0000100000 (start)
   - Ext: (unchecked for internal, checked for external)
6. Click "Save"
7. Return to account group (OBAR) and assign interval 01
```

**Solution 3: Use External Number Assignment**
```
If using customer numbers from source file:
1. OBAR → Select KUNA → Change
2. Number Assignment: External (checkbox)
3. This allows LSMW to use customer numbers from source file
4. SAP won't auto-generate numbers
```

**Prevention**:
- Define number ranges during SAP configuration
- Test number assignment before migration (create test customer via XD01)
- Document number range strategy (internal vs external)

---

## Authorization Errors

### Error 401: No authorization for transaction XD01

**Error Message**:
```
You do not have authorization to use transaction XD01
Missing authorization object: F_KNA1_BUK
Activity: 01 (Create)
```

**Symptoms**:
- Batch input session fails immediately
- SM35 shows authorization error
- User cannot create customers manually in XD01

**Root Causes**:
1. SAP user lacks F_KNA1_BUK authorization object
2. Authorization profile not assigned to user
3. Activity 01 (Create) not included in authorization

**Solutions**:

**Solution 1: Request Authorization from Basis Team**

**Email Template:**
```
To: Basis Team
Subject: Authorization Request - Customer Master Creation

User ID: [Your SAP User]
Transaction: XD01 (Create Customer)
Authorization Objects Needed:
- F_KNA1_BUK (Customer Master - Company Code)
  - Activity: 01 (Create), 02 (Change), 03 (Display)
  - Company Code: * (All) or specific: 1000, 2000
- S_TCODE (Transaction Authorization)
  - Transaction: XD01, XD02, XD03, LSMW, SM35

Business Justification:
Customer master migration project - need to create/change customer master records

Requested Access Duration: Permanent / Temporary (until [date])

Thank you,
[Your Name]
```

**Solution 2: Verify Current Authorization**
```
Transaction: SU53 (Display Authorization Check)

Steps:
1. Execute XD01 (will fail with authorization error)
2. Execute SU53
3. Review "Authorization check failed for" section
4. Note which objects are missing:
   - Object: F_KNA1_BUK
   - Field: ACTVT (Activity) = 01
   - Field: BUKRS (Company Code) = 1000
5. Request these specific authorizations
```

**Solution 3: Check User's Roles**
```
Transaction: SU01 (User Maintenance)

Steps:
1. Execute SU01 (Display mode)
2. Enter your user ID
3. Click "Roles" tab
4. Verify roles include customer master authorizations:
   - SAP_SD_SALES (Sales role)
   - Z_CUSTOMER_MASTER (custom role, if exists)
5. If missing: Request role assignment from Basis
```

**Solution 4: Use Authorized User's ID** (temporary workaround)
```
LSMW → Step 13 → Create Batch Input Session
Change "User" field to authorized user (e.g., SD consultant)
Process session (Step 14) will run under that user's authority
⚠️ Ensure that user approves this!
```

**Prevention**:
- Request authorizations before starting migration
- Test authorization with manual XD01 transaction
- Create authorization checklist for migration team

**Authorization Checklist:**
- [ ] Transaction LSMW authorized
- [ ] Transaction XD01 authorized
- [ ] Transaction SM35 authorized
- [ ] Authorization object F_KNA1_BUK (Customer - Company Code)
- [ ] Authorization object F_KNA1_STA (Customer - Sales Data)
- [ ] Activity 01 (Create) included
- [ ] Company codes authorized (all or specific)
- [ ] Sales organizations authorized (all or specific)

---

## Data Quality Errors

### Error 501: Missing required field

**Error Message**:
```
Field NAME1 (Customer Name) is required
Cannot leave required field blank
Message no. 00 055
```

**Symptoms**:
- Batch input fails on specific customer
- Error screen highlights required field
- Some customers succeed, others fail

**Root Causes**:
1. Source data has blank value in required field
2. Field mapping missing for required field
3. Conversion routine returns blank value

**Solutions**:

**Solution 1: Identify Records with Missing Data**
```
In Excel source file:
=IF(B2="", "ERROR: Missing Name", "OK")

Filter for "ERROR" rows
Complete missing data OR exclude from migration
```

**Solution 2: Add Default Value in LSMW**
```
LSMW → Step 6 → User-Defined Routine

FORM HANDLE_BLANK_NAME
  USING    SOURCE_VALUE
  CHANGING TARGET_VALUE.

  IF SOURCE_VALUE IS INITIAL OR SOURCE_VALUE = ''.
    TARGET_VALUE = 'MISSING - PLEASE UPDATE'.
  ELSE.
    TARGET_VALUE = SOURCE_VALUE.
  ENDIF.

ENDFORM.

Assign this routine to NAME1 field in Step 5
```

**Solution 3: Reject Records with Missing Data**
```
Pre-migration validation script (Excel):
=COUNTIF(B:B, "")  # Count blank customer names

If count > 0:
  Return data to source system for completion
  Do not proceed with migration
```

**Solution 4: Use Alternative Field**
```
If NAME1 is blank but NAME2 has data:
  User routine to copy NAME2 → NAME1
  Or concatenate fields:
    NAME1 = NAME2 + " " + NAME3
```

**Prevention**:
- Validate required fields before export from source system
- Add data validation to Excel template (required fields highlighted in red)
- Run pre-migration data quality check

**Required Field Checklist (SAP Customer Master):**
- [ ] KUNNR - Customer Number
- [ ] NAME1 - Customer Name
- [ ] ORT01 - City
- [ ] LAND1 - Country
- [ ] KTOKD - Account Group
- [ ] BUKRS - Company Code (for company code data)
- [ ] AKONT - Reconciliation Account (for company code data)
- [ ] VKORG - Sales Organization (for sales data)
- [ ] VTWEG - Distribution Channel (for sales data)
- [ ] SPART - Division (for sales data)

---

## System Performance Issues

### Error 601: Batch input session timeout

**Symptom**:
- Batch input session processing hangs
- Transaction counter stops incrementing
- SM35 session shows "Processing" status for > 30 minutes

**Root Causes**:
1. SAP system performance issue (CPU, memory)
2. Database lock on customer master tables
3. Large batch size (thousands of records)
4. Processing during peak system usage hours

**Solutions**:

**Solution 1: Cancel and Restart Session**
```
SM35 → Select session → Cancel
Wait 5-10 minutes for system to release locks
SM35 → Select session → Process
Select "Process Incorrectly Processed Transactions Only"
```

**Solution 2: Split into Smaller Batches**
```
Instead of 1 session with 5,000 records:
Create 10 sessions with 500 records each

LSMW → Step 13 → Create Batch Input Session
Session Name: CUST_PROD_20251026_001 (batch 1)
Select records 1-500
Create session

Repeat for batches 002, 003, etc.
```

**Solution 3: Process During Off-Peak Hours**
```
Schedule migration for:
- Late evening (after 8 PM)
- Weekends
- Holidays
Coordinate with Basis team for system availability
```

**Solution 4: Use Background Processing Mode**
```
SM35 → Select session → Process
Processing Mode: "Process in Background"
Background Job: Click "Background"
  - Job Name: CUST_MIGRATION
  - Start Condition: Immediate or Scheduled
Click "Schedule"

Monitor via SM37 (Job Overview)
```

**Solution 5: Check System Resources**
```
Transaction: ST06 (Operating System Monitor)
Review:
- CPU Utilization: Should be < 80%
- Memory Usage: Should have free memory
- Disk I/O: Check for bottlenecks

If resources constrained:
- Coordinate with Basis team
- Schedule during low-usage period
- Request temporary resource allocation
```

**Prevention**:
- Perform performance testing before production migration
- Use background mode for large volumes (> 1000 records)
- Split large migrations into batches
- Schedule during off-peak hours

**Recommended Batch Sizes:**
| System Load | Records per Session |
|-------------|---------------------|
| High (during business hours) | 100-500 |
| Medium (evening) | 500-1,000 |
| Low (weekend/night) | 1,000-5,000 |

---

## Character Encoding Issues

### Error 701: Special characters display incorrectly

**Symptom**:
- Customer names with accents corrupted: `Müller` → `M?ller`
- Chinese/Japanese characters show as boxes: `北京` → `��`
- Euro symbol shows as question mark: `€` → `?`

**Root Causes**:
1. Source file encoding doesn't match LSMW specification
2. SAP system code page doesn't support characters
3. Display terminal encoding incorrect

**Solutions**:

**Solution 1: Re-save Source File as UTF-8** (see Error 003)

**Solution 2: Verify SAP System Code Page**
```
Transaction: I18N (Check Installation)
Review "Active Code Pages"
Should include: UTF-8, Unicode

If not: Contact Basis team to enable UTF-8 support
```

**Solution 3: Use SAP GUI Unicode Settings**
```
SAP Logon → Select connection → Edit
Advanced tab:
- Enable Unicode: Checked
- Support for Unicode: Checked
Save and reconnect
```

**Solution 4: Test with Sample Data**
```
Create test file with special characters:
- German: Müller, Schäfer, Öl
- French: François, Pérez, Château
- Asian: 北京, 東京, 서울

Run LSMW Steps 9-10 (Read and Display)
Verify characters display correctly
If not: Adjust encoding settings
```

**Prevention**:
- Standardize on UTF-8 encoding for all files
- Test with international characters before production
- Document encoding requirements in migration guide

---

## Field Mapping Errors

### Error 801: Incorrect field assignment

**Symptom**:
- Customer name appears in address field
- Phone number in email field
- Data in wrong SAP fields after migration

**Root Causes**:
1. Source fields mapped to wrong SAP fields in Step 5
2. Source file columns in different order than expected
3. Field mapping not saved after changes

**Solutions**:

**Solution 1: Verify Field Mapping**
```
LSMW → Step 5 → Maintain Field Mapping
Review each SAP field:
- Check assigned source field
- Verify field names match expectation
- Test with sample data

Example:
  SAP Field: NAME1 → Source: CUSTOMER_NAME ✅
  SAP Field: STRAS → Source: STREET ✅
  NOT:
  SAP Field: NAME1 → Source: STREET ❌
```

**Solution 2: Review Source File Column Order**
```
Open source file in Excel
Verify column headers match LSMW Step 3 field names
Ensure no extra columns inserted
Check for column shifts (delimiter issues)
```

**Solution 3: Use Display Converted Data (Step 12)**
```
LSMW → Step 12 → Display Converted Data
Review sample records:
- Check if NAME1 contains customer name (not address)
- Check if STRAS contains street (not phone number)
- Verify all fields populated correctly

If incorrect:
  Return to Step 5 → Fix mappings → Re-run Steps 11-12
```

**Solution 4: Create Test Batch First**
```
Before production migration:
1. Create batch input session with 1-2 test records (Step 13)
2. Process in foreground mode (watch each screen)
3. Verify data appears in correct fields on XD01 screens
4. If incorrect: Fix Step 5 mappings
```

**Prevention**:
- Document field mapping table before LSMW
- Test with sample data at each step
- Perform end-to-end test with 1 record before production

---

## Translation Table Errors

### Error 901: Multiple source values map to same target

**Symptom**:
- Translation table allows multiple source values for same target
- Data loss or unexpected conversion results
- Inconsistent results for similar source values

**Example**:
```
Source → Target (Translation Table)
USA → US
United States → GB  ❌ (should be US)
```

**Root Causes**:
1. Translation table entry error (typo)
2. Duplicate entries in translation table
3. Copy/paste error when creating table

**Solutions**:

**Solution 1: Review Translation Table**
```
LSMW → Step 6 → Maintain Translations
Select translation table: T_COUNTRY_MAP
Click "Display All Entries"
Review each entry:
  USA → US ✅
  United States → US ✅ (not GB)
  U.S.A. → US ✅

Correct any errors
Save
```

**Solution 2: Export and Review in Excel**
```
LSMW → Step 6 → Translation table → Export
Review in Excel:
- Sort by Target Value
- Look for inconsistencies
- Correct errors
Re-import to LSMW
```

**Solution 3: Standardize Source Values**
```
Before migration:
Clean source data to use standard values
  "USA", "United States", "U.S.A." → All become "USA" in source file
Then translation table only needs:
  USA → US
Simpler and less error-prone
```

**Prevention**:
- Create translation tables carefully
- Peer review translation entries
- Test with all source value variations

---

## General Troubleshooting Workflow

```
┌─────────────────────────────────────────┐
│        Error Detected in LSMW           │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│     Identify Error Category             │
│  - File Reading (Step 9)                │
│  - Data Conversion (Step 11)            │
│  - Batch Input (Step 14)                │
│  - Configuration                        │
│  - Authorization                        │
│  - Data Quality                         │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│     Review Error Message                │
│  - Note message number (e.g., VD 214)   │
│  - Note failing field/value             │
│  - Note affected record (line number)   │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│     Look Up Error in This Guide         │
│  - Search by error number               │
│  - Search by symptom                    │
│  - Find matching error category         │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│     Apply Solution                      │
│  - Follow step-by-step instructions     │
│  - Test with sample data first          │
│  - Verify fix before full re-run        │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│     Re-run Failed Step                  │
│  - Reprocess from appropriate LSMW step │
│  - For SM35: Process errors only        │
│  - Monitor for recurrence               │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│     Document Resolution                 │
│  - Record error and solution            │
│  - Update migration log                 │
│  - Share with team (lessons learned)    │
└─────────────────────────────────────────┘
```

---

## Error Log Template

Use this template to document errors during migration:

```
Error Log Entry #001

Date/Time: 2025-10-26 14:35
Error Location: LSMW Step 11 (Convert Data)
Error Category: Translation Table Error

Error Message:
"Translation not found for source value 'United Kingdom'"

Affected Records:
- Record #15: Customer ID 100015
- Record #27: Customer ID 100027
(Total: 2 records)

Root Cause:
Translation table T_COUNTRY_MAP missing entry for "United Kingdom"

Solution Applied:
1. LSMW → Step 6 → Maintain Translations
2. Added entry: "United Kingdom" → "GB"
3. Saved translation table
4. Re-ran Step 11 (Convert Data)

Result:
✅ Conversion successful
✅ All 2 records now convert correctly
✅ Display Converted Data shows LAND1 = "GB"

Lessons Learned:
- Add all country name variations to translation table upfront
- Test with international customer sample data before production

Documented By: [Your Name]
Reviewed By: [Team Lead]
```

---

## Support Escalation Matrix

| Error Type | First Contact | Escalation 1 | Escalation 2 |
|------------|---------------|--------------|--------------|
| File/Data Issues | Migration Team Lead | Data Owner | Source System Team |
| Configuration | SD Functional Consultant | FI/CO Consultant | Solution Architect |
| Authorization | Basis Team | Security Team | GRC Team |
| Performance | Basis Team | Database Team | Infrastructure Team |
| ABAP/Routine Errors | ABAP Developer | Development Lead | SAP Support (OSS) |

---

## Quick Reference: Error Categories

| Error Code Range | Category | Key Transactions |
|------------------|----------|------------------|
| 001-099 | File Reading Errors | LSMW Step 7, 9 |
| 101-199 | Data Conversion Errors | LSMW Step 5, 6, 11 |
| 201-299 | Batch Input Processing | SM35, XD01 |
| 301-399 | Configuration Errors | OBAR, OX02, OVXB |
| 401-499 | Authorization Errors | SU53, SU01, PFCG |
| 501-599 | Data Quality Errors | Excel, LSMW Step 10 |
| 601-699 | System Performance | ST06, SM37, SM50 |
| 701-799 | Character Encoding | LSMW Step 7, I18N |
| 801-899 | Field Mapping Errors | LSMW Step 5 |
| 901-999 | Translation Table Errors | LSMW Step 6 |

---

**Document Version**: 1.0
**Last Updated**: October 2025
**Related Documents**:
- SAP-LSMW-Customer-Master-Migration-Guide.md
- Customer-Master-Field-Mapping.md
- LSMW-Quick-Reference.md

**END OF TROUBLESHOOTING GUIDE**
