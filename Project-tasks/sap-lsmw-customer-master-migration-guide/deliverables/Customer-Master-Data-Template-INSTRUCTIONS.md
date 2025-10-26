# Customer Master Data Template - Excel Creation Instructions

**Version**: 1.0
**Date**: October 2025
**Purpose**: Instructions to create Customer-Master-Data-Template.xlsx with validation

---

## Overview

This document provides step-by-step instructions to create a professional Excel template for SAP customer master data migration using LSMW.

**Template File**: `Customer-Master-Data-Template.xlsx`

---

## Excel Workbook Structure

The workbook contains 5 sheets:

1. **GeneralData** - KNA1 fields (customer header data)
2. **CompanyCodeData** - KNB1 fields (company code assignments)
3. **SalesAreaData** - KNVV fields (sales area assignments)
4. **ReferenceData** - Lookup lists for dropdown validations
5. **Instructions** - How to use the template

---

## Sheet 1: GeneralData (KNA1)

### Column Definitions

| Column | Field Name | Data Type | Max Length | Required | Example | Validation Rule |
|--------|-----------|-----------|------------|----------|---------|-----------------|
| A | CUSTOMER_ID | Text | 10 | Yes | 100001 | Whole number, > 0, unique |
| B | CUSTOMER_NAME | Text | 35 | Yes | ABC Corporation | Not blank |
| C | CUSTOMER_NAME2 | Text | 35 | No | North American HQ | - |
| D | SEARCH_TERM | Text | 10 | No | ABCCORP | Uppercase |
| E | STREET | Text | 35 | No | 123 Main Street | - |
| F | CITY | Text | 35 | Yes | New York | Not blank |
| G | POSTAL_CODE | Text | 10 | No | 10001 | - |
| H | COUNTRY | Text | 3 | Yes | US | Dropdown list (ReferenceData sheet) |
| I | REGION | Text | 3 | No | NY | Dropdown list (ReferenceData sheet) |
| J | TELEPHONE | Text | 16 | No | +1-212-555-0100 | - |
| K | FAX | Text | 31 | No | +1-212-555-0101 | - |
| L | EMAIL | Text | 241 | No | contact@abccorp.com | Email format validation |
| M | TAX_NUMBER1 | Text | 16 | No | 12-3456789 | - |
| N | VAT_REG_NO | Text | 20 | No | GB123456789 | - |
| O | INDUSTRY_KEY | Text | 4 | No | CHEM | Dropdown list |
| P | ACCOUNT_GROUP | Text | 4 | Yes | KUNA | Dropdown list |

### Excel Setup Steps

**Step 1: Create Header Row** (Row 1, freeze panes)
```
A1: CUSTOMER_ID
B1: CUSTOMER_NAME
C1: CUSTOMER_NAME2
... (all columns through P)
```

**Format Header Row:**
- Font: Bold, White text
- Fill: Dark Blue (RGB: 0, 112, 192)
- Alignment: Center
- Freeze Row: View → Freeze Panes → Freeze Top Row

**Step 2: Add Data Validation**

**Column A (CUSTOMER_ID) - Unique Number Validation:**
```
Select column A (A2:A1000)
Data → Data Validation
Settings:
  Allow: Whole number
  Data: greater than
  Minimum: 0
Error Alert:
  Style: Stop
  Title: Invalid Customer ID
  Message: Customer ID must be a positive number and unique
```

**Column B (CUSTOMER_NAME) - Required Field:**
```
Select column B (B2:B1000)
Data → Data Validation
Settings:
  Allow: Text length
  Data: greater than
  Minimum: 1
Error Alert:
  Style: Stop
  Title: Missing Customer Name
  Message: Customer Name is required and cannot be blank
```

**Column H (COUNTRY) - Dropdown List:**
```
Select column H (H2:H1000)
Data → Data Validation
Settings:
  Allow: List
  Source: =ReferenceData!$A$2:$A$50 (Country list)
Input Message:
  Title: Select Country
  Message: Choose from the dropdown list
Error Alert:
  Style: Stop
  Title: Invalid Country
  Message: Please select a valid country from the dropdown
```

**Column I (REGION) - Dropdown List (US States):**
```
Select column I (I2:I1000)
Data → Data Validation
Settings:
  Allow: List
  Source: =ReferenceData!$B$2:$B$60
```

**Column L (EMAIL) - Email Format Validation:**
```
Select column L (L2:L1000)
Data → Data Validation
Settings:
  Allow: Custom
  Formula: =OR(L2="", AND(ISNUMBER(FIND("@",L2)), ISNUMBER(FIND(".",L2))))
Error Alert:
  Style: Warning
  Title: Invalid Email
  Message: Please enter a valid email address (example@domain.com)
```

**Column P (ACCOUNT_GROUP) - Dropdown List:**
```
Select column P (P2:P1000)
Data → Data Validation
Settings:
  Allow: List
  Source: =ReferenceData!$F$2:$F$10
```

**Step 3: Add Conditional Formatting**

**Highlight Required Fields (if blank):**
```
Select columns B, F, H, P (data rows only)
Home → Conditional Formatting → New Rule
Rule Type: Use a formula
Formula: =ISBLANK(B2)
Format: Fill color = Light Red, Font color = Dark Red
```

**Highlight Duplicate Customer IDs:**
```
Select column A (A2:A1000)
Home → Conditional Formatting → Highlight Cells Rules → Duplicate Values
Formatting: Light Red Fill
```

**Step 4: Add Sample Data** (Rows 2-6)

```
Row 2:
A2: 100001
B2: ABC Corporation
C2: North American Headquarters
D2: ABCCORP
E2: 123 Main Street
F2: New York
G2: 10001
H2: US
I2: NY
J2: +1-212-555-0100
K2: +1-212-555-0101
L2: contact@abccorp.com
M2: 12-3456789
N2: (blank)
O2: MANU
P2: KUNA

Row 3:
A3: 100002
B3: XYZ Industries
C3: Manufacturing Division
D3: XYZIND
E3: 456 Oak Avenue
F3: Chicago
G3: 60601
H3: US
I3: IL
J3: +1-312-555-0200
K3: (blank)
L3: info@xyzind.com
M3: 98-7654321
N3: (blank)
O3: MANU
P3: KUNA

Row 4:
A4: 100003
B4: Global Trading Ltd
C4: European Operations
D4: GLOTRA
E4: 789 High Street
F4: London
G4: EC1A 1BB
H4: GB
I4: LND
J4: +44-20-5555-0300
K4: +44-20-5555-0301
L4: uk@globaltrading.co.uk
M4: (blank)
N4: GB123456789
O4: TRAD
P4: KUNE

Row 5:
A5: 100004
B5: Tech Solutions GmbH
C5: (blank)
D5: TECHSOL
E5: 101 Hauptstrasse
F5: Berlin
G5: 10115
H5: DE
I5: BE
J5: +49-30-5555-0400
K5: (blank)
L5: info@techsolutions.de
M5: (blank)
N5: DE987654321
O5: TECH
P5: KUNA

Row 6:
A6: 100005
B6: Asia Pacific Corp
C6: Regional Office
D6: ASIPAC
E6: 202 Orchard Road
F6: Singapore
G6: 238801
H6: SG
I6: SG
J6: +65-6555-0500
K6: (blank)
L6: contact@asiapacific.sg
M6: (blank)
N6: (blank)
O6: SERV
P6: KUNA
```

---

## Sheet 2: CompanyCodeData (KNB1)

### Column Definitions

| Column | Field Name | Data Type | Max Length | Required | Example | Validation Rule |
|--------|-----------|-----------|------------|----------|---------|-----------------|
| A | CUSTOMER_ID | Text | 10 | Yes | 100001 | Must exist in GeneralData sheet |
| B | COMPANY_CODE | Text | 4 | Yes | 1000 | Dropdown list |
| C | RECON_ACCOUNT | Text | 10 | Yes | 140000 | Dropdown list |
| D | PAYMENT_TERMS | Text | 4 | No | 0001 | Dropdown list |
| E | CLERK_CODE | Text | 2 | No | 01 | - |
| F | SORT_KEY | Text | 3 | No | 001 | - |
| G | PAYMENT_METHODS | Text | 10 | No | C | Dropdown list |
| H | DUNNING_PROCEDURE | Text | 4 | No | 0001 | Dropdown list |

### Excel Setup Steps

**Header Row:** (Same formatting as Sheet 1)
```
A1: CUSTOMER_ID
B1: COMPANY_CODE
C1: RECON_ACCOUNT
... (through H)
```

**Validation - Column A (CUSTOMER_ID) - VLOOKUP Check:**
```
Select column A (A2:A1000)
Data → Data Validation
Settings:
  Allow: Custom
  Formula: =COUNTIF(GeneralData!$A:$A, A2)>0
Error Alert:
  Style: Stop
  Title: Customer ID Not Found
  Message: Customer ID must exist in GeneralData sheet
```

**Validation - Column B (COMPANY_CODE):**
```
Select column B (B2:B1000)
Data → Data Validation
Settings:
  Allow: List
  Source: =ReferenceData!$C$2:$C$10
```

**Validation - Column C (RECON_ACCOUNT):**
```
Select column C (C2:C1000)
Data → Data Validation
Settings:
  Allow: List
  Source: =ReferenceData!$D$2:$D$10
```

**Validation - Column D (PAYMENT_TERMS):**
```
Select column D (D2:D1000)
Data → Data Validation
Settings:
  Allow: List
  Source: =ReferenceData!$E$2:$E$20
```

**Sample Data:**
```
Row 2: 100001 | 1000 | 140000 | 0001 | 01 | 001 | C | 0001
Row 3: 100002 | 1000 | 140000 | 0002 | 01 | 001 | C | 0001
Row 4: 100003 | 2000 | 240000 | 0001 | 02 | 001 | T | 0002
Row 5: 100004 | 3000 | 340000 | 0003 | 03 | 001 | C | 0001
Row 6: 100005 | 1000 | 140000 | 0001 | 01 | 001 | C | 0001
Row 7: 100005 | 4000 | 440000 | 0001 | 04 | 001 | T | 0001  ← Customer 100005 has 2 company codes
```

---

## Sheet 3: SalesAreaData (KNVV)

### Column Definitions

| Column | Field Name | Data Type | Max Length | Required | Example | Validation Rule |
|--------|-----------|-----------|------------|----------|---------|-----------------|
| A | CUSTOMER_ID | Text | 10 | Yes | 100001 | Must exist in GeneralData |
| B | SALES_ORG | Text | 4 | Yes | 1000 | Dropdown list |
| C | DIST_CHANNEL | Text | 2 | Yes | 01 | Dropdown list |
| D | DIVISION | Text | 2 | Yes | 00 | Dropdown list |
| E | SALES_OFFICE | Text | 4 | No | 1010 | Dropdown list |
| F | SALES_GROUP | Text | 3 | No | 001 | - |
| G | CUSTOMER_GROUP | Text | 2 | No | 01 | Dropdown list |
| H | SHIPPING_COND | Text | 2 | No | 01 | Dropdown list |
| I | INCOTERMS | Text | 3 | No | EXW | Dropdown list |
| J | PAYMENT_TERMS | Text | 4 | No | 0001 | Dropdown list |
| K | CURRENCY | Text | 5 | No | USD | Dropdown list |

**Setup:** Same validation approach as CompanyCodeData

**Sample Data:**
```
Row 2: 100001 | 1000 | 01 | 00 | 1010 | 001 | 01 | 01 | EXW | 0001 | USD
Row 3: 100002 | 1000 | 01 | 00 | 1020 | 002 | 02 | 02 | FOB | 0002 | USD
Row 4: 100003 | 2000 | 01 | 00 | 2010 | 001 | 01 | 01 | CIF | 0001 | GBP
Row 5: 100004 | 3000 | 01 | 00 | 3010 | 003 | 03 | 03 | EXW | 0003 | EUR
Row 6: 100005 | 1000 | 01 | 00 | 1010 | 001 | 01 | 01 | FOB | 0001 | USD
Row 7: 100005 | 1000 | 02 | 00 | 1010 | 001 | 01 | 01 | FOB | 0001 | USD  ← Customer 100005 has 2 dist channels
```

---

## Sheet 4: ReferenceData (Lookup Lists)

This sheet contains all lookup values for dropdown validations.

**Layout:**

| Column A | Column B | Column C | Column D | Column E | Column F | Column G | Column H | Column I |
|----------|----------|----------|----------|----------|----------|----------|----------|----------|
| **Country** | **US State** | **Company Code** | **Recon Account** | **Payment Terms** | **Account Group** | **Industry** | **Incoterms** | **Currency** |
| US | AL | 1000 | 140000 | 0001 | KUNA | MANU | EXW | USD |
| GB | AK | 2000 | 240000 | 0002 | KUNE | TRAD | FOB | EUR |
| DE | AZ | 3000 | 340000 | 0003 | KUNV | TECH | CIF | GBP |
| FR | AR | 4000 | 440000 | 0004 |  | SERV | DDP | JPY |
| CN | CA | 5000 |  | 0005 |  | CHEM | FCA | CAD |
| SG | CO |  |  | 0006 |  | FOOD | CPT | CNY |
| AU | CT |  |  |  |  | AUTO |  |  |
| IN | DE |  |  |  |  |  |  |  |
| BR | FL |  |  |  |  |  |  |  |
| NL | GA |  |  |  |  |  |  |  |
| ... | ... | ... | ... | ... | ... | ... | ... | ... |

**Full Country List** (Column A):
```
US, GB, DE, FR, CN, SG, AU, IN, BR, NL, BE, CH, ES, IT, SE, NO, DK, FI, AT, PL, CZ, HU, RO, PT, GR, IE, MX, CA, AR, CL, CO, PE, VE, ZA, EG, NG, KE, MA, SA, AE, IL, TR, RU, UA, JP, KR, TH, VN, MY, ID, PH, NZ, PK
```

**Full US State List** (Column B):
```
AL, AK, AZ, AR, CA, CO, CT, DE, FL, GA, HI, ID, IL, IN, IA, KS, KY, LA, ME, MD, MA, MI, MN, MS, MO, MT, NE, NV, NH, NJ, NM, NY, NC, ND, OH, OK, OR, PA, RI, SC, SD, TN, TX, UT, VT, VA, WA, WV, WI, WY
```

**Industry Keys** (Column G):
```
MANU (Manufacturing)
TRAD (Trading)
TECH (Technology)
SERV (Services)
CHEM (Chemicals)
FOOD (Food & Beverage)
AUTO (Automotive)
CONS (Construction)
FINA (Finance)
HEAL (Healthcare)
```

**Incoterms** (Column H):
```
EXW (Ex Works)
FOB (Free on Board)
CIF (Cost Insurance Freight)
DDP (Delivered Duty Paid)
FCA (Free Carrier)
CPT (Carriage Paid To)
DAP (Delivered at Place)
```

**Currency** (Column I):
```
USD (US Dollar)
EUR (Euro)
GBP (British Pound)
JPY (Japanese Yen)
CAD (Canadian Dollar)
CNY (Chinese Yuan)
AUD (Australian Dollar)
CHF (Swiss Franc)
SEK (Swedish Krona)
```

---

## Sheet 5: Instructions (README)

**Content:**

```
═══════════════════════════════════════════════════════════════
   SAP CUSTOMER MASTER DATA TEMPLATE - INSTRUCTIONS
═══════════════════════════════════════════════════════════════

VERSION: 1.0
DATE: October 2025
PURPOSE: Data collection for SAP LSMW customer master migration

───────────────────────────────────────────────────────────────
OVERVIEW
───────────────────────────────────────────────────────────────

This Excel template is designed to collect customer master data
for migration into SAP using LSMW (Legacy System Migration Workbench).

The template contains 4 data entry sheets:
1. GeneralData - Customer header information (KNA1)
2. CompanyCodeData - Company code assignments (KNB1)
3. SalesAreaData - Sales area assignments (KNVV)
4. ReferenceData - Lookup values (do not edit)

───────────────────────────────────────────────────────────────
HOW TO USE THIS TEMPLATE
───────────────────────────────────────────────────────────────

STEP 1: Review Sample Data
- Each sheet contains 5 sample customer records (rows 2-6)
- Review these examples to understand the expected format
- Delete sample data before entering your own data

STEP 2: Enter General Data
- Go to "GeneralData" sheet
- Enter one row per customer
- Required fields are highlighted in RED when blank
- Use dropdown lists where provided (Country, Account Group)
- Customer ID must be unique (duplicates highlighted in red)

STEP 3: Enter Company Code Data
- Go to "CompanyCodeData" sheet
- Enter one row per customer-company code assignment
- Customer ID must exist in GeneralData sheet
- One customer can have multiple company code rows

STEP 4: Enter Sales Area Data
- Go to "SalesAreaData" sheet
- Enter one row per customer-sales area assignment
- Customer ID must exist in GeneralData sheet
- One customer can have multiple sales area rows

STEP 5: Validate Data
- Check for red highlighting (indicates errors)
- Verify all required fields are completed
- Run validation checks (see below)

STEP 6: Export for LSMW
- Save file as Excel (.xlsx)
- Also save each sheet as Tab-delimited text (.txt) for LSMW:
  - GeneralData → Customer_General.txt
  - CompanyCodeData → Customer_Company.txt
  - SalesAreaData → Customer_Sales.txt
- Ensure file encoding is UTF-8

───────────────────────────────────────────────────────────────
REQUIRED FIELDS (MUST BE COMPLETED)
───────────────────────────────────────────────────────────────

GeneralData:
  ✓ CUSTOMER_ID - Unique identifier
  ✓ CUSTOMER_NAME - Customer name (line 1)
  ✓ CITY - City name
  ✓ COUNTRY - Country code (use dropdown)
  ✓ ACCOUNT_GROUP - Account group (use dropdown)

CompanyCodeData:
  ✓ CUSTOMER_ID - Must exist in GeneralData
  ✓ COMPANY_CODE - Company code (use dropdown)
  ✓ RECON_ACCOUNT - Reconciliation G/L account (use dropdown)

SalesAreaData:
  ✓ CUSTOMER_ID - Must exist in GeneralData
  ✓ SALES_ORG - Sales organization (use dropdown)
  ✓ DIST_CHANNEL - Distribution channel (use dropdown)
  ✓ DIVISION - Division (use dropdown)

───────────────────────────────────────────────────────────────
DATA VALIDATION RULES
───────────────────────────────────────────────────────────────

1. Customer ID:
   - Must be unique across all rows in GeneralData sheet
   - Must be numeric
   - Must be > 0

2. Required Fields:
   - Cannot be blank
   - Highlighted in red if missing

3. Dropdown Lists:
   - Must select from provided list
   - Cannot enter custom values (will show error)

4. Email Format:
   - Must contain "@" and "."
   - Example: contact@company.com

5. Field Lengths:
   - Do not exceed maximum length for each field
   - See column headers for length limits

6. Referential Integrity:
   - CUSTOMER_ID in CompanyCodeData must exist in GeneralData
   - CUSTOMER_ID in SalesAreaData must exist in GeneralData

───────────────────────────────────────────────────────────────
VALIDATION CHECKLIST (Run Before Export)
───────────────────────────────────────────────────────────────

□ No red highlighting visible (errors corrected)
□ All required fields completed (no blanks)
□ Customer IDs are unique (no duplicates)
□ Customer IDs match across all 3 data sheets
□ Dropdown values used (no manual entries)
□ Field lengths within limits (no truncation)
□ Email addresses valid format
□ Special characters display correctly (ü, é, etc.)
□ Numbers formatted as text (leading zeros preserved)
□ No extra spaces (trim all text fields)

───────────────────────────────────────────────────────────────
COMMON ERRORS TO AVOID
───────────────────────────────────────────────────────────────

❌ Customer ID 123 in CompanyCodeData but not in GeneralData
   ✓ Ensure all Customer IDs exist in GeneralData first

❌ Country value "United States" instead of "US"
   ✓ Always use dropdown lists for coded fields

❌ Customer Name exceeds 35 characters and gets truncated
   ✓ Use CUSTOMER_NAME2 for additional text

❌ Customer ID 00001 becomes 1 (leading zeros lost)
   ✓ Format column as Text (not Number)

❌ Special characters ü, é show as ? after export
   ✓ Save file as UTF-8 encoding

───────────────────────────────────────────────────────────────
MULTIPLE COMPANY CODES / SALES AREAS
───────────────────────────────────────────────────────────────

One customer can be assigned to multiple company codes and/or
multiple sales areas. Enter multiple rows with same Customer ID.

Example:
GeneralData:
  Row 2: Customer ID 100005 (entered once)

CompanyCodeData:
  Row 6: Customer ID 100005, Company Code 1000
  Row 7: Customer ID 100005, Company Code 4000  ← Same customer

SalesAreaData:
  Row 6: Customer ID 100005, Sales Org 1000, Dist Channel 01
  Row 7: Customer ID 100005, Sales Org 1000, Dist Channel 02  ← Same customer

───────────────────────────────────────────────────────────────
EXPORT FOR LSMW
───────────────────────────────────────────────────────────────

To export for LSMW:

1. Select GeneralData sheet
2. File → Save As → Text (Tab delimited) (*.txt)
3. File name: Customer_General.txt
4. Repeat for CompanyCodeData → Customer_Company.txt
5. Repeat for SalesAreaData → Customer_Sales.txt

IMPORTANT:
- Ensure UTF-8 encoding when saving text files
- Tab-delimited format required (not comma)
- Include header row (column names in row 1)

───────────────────────────────────────────────────────────────
SUPPORT CONTACTS
───────────────────────────────────────────────────────────────

Questions about:
- Template usage: [Migration Team Lead]
- SAP field definitions: [SAP SD Consultant]
- Data source: [Source System Owner]
- Technical issues: [IT Support]

═══════════════════════════════════════════════════════════════
           END OF INSTRUCTIONS - READY TO USE
═══════════════════════════════════════════════════════════════
```

---

## Excel File Creation Steps (Manual)

**To create the actual .xlsx file:**

1. Open Microsoft Excel (or LibreOffice Calc)
2. Create 5 sheets: GeneralData, CompanyCodeData, SalesAreaData, ReferenceData, Instructions
3. Follow the column definitions and setup steps above for each sheet
4. Add data validations as specified
5. Add conditional formatting as specified
6. Add sample data (rows 2-6) to each data sheet
7. Format headers (blue background, white text, bold, freeze panes)
8. Save as: `Customer-Master-Data-Template.xlsx`

**Estimated Time**: 45-60 minutes

---

## Alternative: CSV Template Files

If Excel is not available, create 3 CSV files with sample data:

**Customer_General.csv:**
```csv
CUSTOMER_ID,CUSTOMER_NAME,CUSTOMER_NAME2,SEARCH_TERM,STREET,CITY,POSTAL_CODE,COUNTRY,REGION,TELEPHONE,FAX,EMAIL,TAX_NUMBER1,VAT_REG_NO,INDUSTRY_KEY,ACCOUNT_GROUP
100001,ABC Corporation,North American HQ,ABCCORP,123 Main Street,New York,10001,US,NY,+1-212-555-0100,+1-212-555-0101,contact@abccorp.com,12-3456789,,MANU,KUNA
100002,XYZ Industries,Manufacturing Division,XYZIND,456 Oak Avenue,Chicago,60601,US,IL,+1-312-555-0200,,info@xyzind.com,98-7654321,,MANU,KUNA
```

**Customer_Company.csv:**
```csv
CUSTOMER_ID,COMPANY_CODE,RECON_ACCOUNT,PAYMENT_TERMS,CLERK_CODE,SORT_KEY,PAYMENT_METHODS,DUNNING_PROCEDURE
100001,1000,140000,0001,01,001,C,0001
100002,1000,140000,0002,01,001,C,0001
```

**Customer_Sales.csv:**
```csv
CUSTOMER_ID,SALES_ORG,DIST_CHANNEL,DIVISION,SALES_OFFICE,SALES_GROUP,CUSTOMER_GROUP,SHIPPING_COND,INCOTERMS,PAYMENT_TERMS,CURRENCY
100001,1000,01,00,1010,001,01,01,EXW,0001,USD
100002,1000,01,00,1020,002,02,02,FOB,0002,USD
```

---

## Deliverable Checklist

- [ ] Customer-Master-Data-Template.xlsx created (5 sheets)
- [ ] Data validations configured (dropdowns, required fields)
- [ ] Conditional formatting applied (highlight errors)
- [ ] Sample data added (5 customer records)
- [ ] ReferenceData sheet populated (lookup lists)
- [ ] Instructions sheet completed (user guide)
- [ ] File tested (validations work correctly)
- [ ] CSV alternative files created (if needed)

---

**Document Owner**: Migration Team
**Status**: Ready for Implementation
**Last Updated**: October 2025

**END OF INSTRUCTIONS**
