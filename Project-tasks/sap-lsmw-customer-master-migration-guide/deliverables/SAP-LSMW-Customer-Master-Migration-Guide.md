# SAP LSMW Customer Master Migration Guide

**Version**: 1.0
**Date**: October 2025
**Author**: SAP Techno-Functional Consultant
**Audience**: SAP Consultants, Migration Teams
**SAP Module**: SD (Sales and Distribution)
**Transaction**: LSMW, XD01

---

## Table of Contents

1. [Overview](#overview)
   - [What is LSMW?](#what-is-lsmw)
   - [When to Use LSMW](#when-to-use-lsmw)
   - [Advantages vs Other Tools](#advantages-vs-other-tools)
   - [Prerequisites](#prerequisites)
2. [Customer Master Data Structure](#customer-master-data-structure)
   - [KNA1 - General Data](#kna1---general-data)
   - [KNB1 - Company Code Data](#knb1---company-code-data)
   - [KNVV - Sales Area Data](#knvv---sales-area-data)
3. [The 14-Step LSMW Process](#the-14-step-lsmw-process)
   - [Step 1: Maintain Object Attributes](#step-1-maintain-object-attributes)
   - [Step 2: Maintain Source Structures](#step-2-maintain-source-structures)
   - [Step 3: Maintain Source Fields](#step-3-maintain-source-fields)
   - [Step 4: Maintain Structure Relations](#step-4-maintain-structure-relations)
   - [Step 5: Maintain Field Mapping and Conversion Rules](#step-5-maintain-field-mapping-and-conversion-rules)
   - [Step 6: Maintain Fixed Values, Translations, User-Defined Routines](#step-6-maintain-fixed-values-translations-user-defined-routines)
   - [Step 7: Specify Files](#step-7-specify-files)
   - [Step 8: Assign Files](#step-8-assign-files)
   - [Step 9: Read Data](#step-9-read-data)
   - [Step 10: Display Read Data](#step-10-display-read-data)
   - [Step 11: Convert Data](#step-11-convert-data)
   - [Step 12: Display Converted Data](#step-12-display-converted-data)
   - [Step 13: Create Batch Input Session](#step-13-create-batch-input-session)
   - [Step 14: Run Batch Input Session](#step-14-run-batch-input-session)
4. [Recording Instructions](#recording-instructions)
   - [Creating XD01 Recording](#creating-xd01-recording)
   - [Field Mapping Guidelines](#field-mapping-guidelines)
   - [Source Structure Design](#source-structure-design)
5. [Data File Preparation](#data-file-preparation)
   - [Excel/CSV Template](#excelcsv-template)
   - [Data Validation Rules](#data-validation-rules)
   - [Sample Data Format](#sample-data-format)
6. [Testing Process](#testing-process)
   - [Test Data Upload](#test-data-upload)
   - [Error Handling](#error-handling)
   - [Data Verification Checklist](#data-verification-checklist)
7. [Production Migration](#production-migration)
   - [Best Practices](#best-practices)
   - [Rollback Procedures](#rollback-procedures)
   - [Post-Migration Validation](#post-migration-validation)
8. [Troubleshooting](#troubleshooting)
9. [Quick Reference](#quick-reference)

---

## 1. Overview

### What is LSMW?

**LSMW (Legacy System Migration Workbench)** is a standard SAP tool designed to support one-time or periodic data transfer from external systems (legacy systems) into SAP R/3 or SAP ECC. LSMW provides a structured, step-by-step methodology to:

- Import data from external sources (Excel, CSV, text files)
- Transform and map source data to SAP structures
- Validate data against SAP business rules
- Load data into SAP using batch input, direct input, or BAPIs

For customer master data migration, LSMW uses the **XD01** transaction (Create Customer) as the target transaction and populates the following SAP tables:

- **KNA1**: General customer master data
- **KNB1**: Customer master (company code)
- **KNVV**: Customer master (sales area data)

### When to Use LSMW

Use LSMW for customer master migration when:

✅ **One-time data migration** - Moving from a legacy system to SAP
✅ **Periodic uploads** - Regular bulk customer data updates
✅ **Medium to large data volumes** - 100+ customer records
✅ **Complex field mappings** - Source data requires transformation
✅ **Standard SAP transactions** - XD01, XK01, MM01, etc.
✅ **Need for validation** - Data must pass SAP business rules before posting

### Advantages vs Other Tools

| Feature | LSMW | Direct Input (BAPIs) | Manual Entry (XD01) | Data Load via IDOC |
|---------|------|---------------------|---------------------|-------------------|
| **Ease of Use** | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **No Coding Required** | ✅ | ❌ | ✅ | ❌ |
| **Handles Large Volumes** | ✅ | ✅ | ❌ | ✅ |
| **Built-in Validation** | ✅ | ✅ | ✅ | ⭐ |
| **Reusability** | ✅ | ✅ | ❌ | ✅ |
| **Error Handling** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| **Transaction Visibility** | ✅ (SM35) | ❌ | ✅ | ❌ |
| **Standard SAP Tool** | ✅ | ✅ | ✅ | ✅ |

**Key Advantages of LSMW:**
- No ABAP coding required (uses recording method)
- Built-in data validation and error reporting
- Simulation mode to test before production
- Reusable migration objects for periodic uploads
- Transaction SM35 batch input session monitoring

### Prerequisites

Before starting LSMW customer master migration:

**SAP System Requirements:**
- ✅ SAP ECC system access with SD module configured
- ✅ Transaction authorization: LSMW, XD01, SM35
- ✅ Company code(s) configured
- ✅ Sales organizations, distribution channels, divisions configured
- ✅ Customer account groups defined (transaction: OBAR)

**Technical Requirements:**
- ✅ LSMW installed (transaction: LSMW should be available)
- ✅ Authorization to create batch input sessions
- ✅ Authorization to run batch input sessions (SM35)

**Data Requirements:**
- ✅ Source data file (Excel/CSV) with customer information
- ✅ Customer account group assignments
- ✅ Company code and sales area assignments
- ✅ Payment terms, reconciliation accounts, shipping conditions defined

**Knowledge Requirements:**
- ✅ Understanding of SAP customer master structure (KNA1, KNB1, KNVV)
- ✅ Familiarity with XD01 transaction
- ✅ Basic understanding of batch input processing
- ✅ Knowledge of customer master organizational assignments

---

## 2. Customer Master Data Structure

SAP customer master data is stored across three main tables, representing different organizational levels:

### KNA1 - General Data

**Table Description**: Contains general customer information that is valid across all company codes and sales areas.

**Key Fields:**

| Field Name | Technical Name | Data Type | Length | Required | Description |
|------------|---------------|-----------|--------|----------|-------------|
| Customer Number | KUNNR | CHAR | 10 | Yes | Unique customer identifier |
| Customer Name | NAME1 | CHAR | 35 | Yes | Customer name (line 1) |
| Customer Name 2 | NAME2 | CHAR | 35 | No | Customer name (line 2) |
| Search Term | SORTL | CHAR | 10 | No | Search term for matchcode |
| Street | STRAS | CHAR | 35 | No | Street address |
| City | ORT01 | CHAR | 35 | Yes | City |
| Postal Code | PSTLZ | CHAR | 10 | No | Postal code |
| Country | LAND1 | CHAR | 3 | Yes | Country key (e.g., US, GB, DE) |
| Region | REGIO | CHAR | 3 | No | Region/State (e.g., CA, TX) |
| Language | SPRAS | CHAR | 1 | No | Language key (E=English, D=German) |
| Telephone 1 | TELF1 | CHAR | 16 | No | Telephone number |
| Fax | TELFX | CHAR | 31 | No | Fax number |
| Tax Number 1 | STCEG | CHAR | 20 | No | VAT registration number |
| Industry Key | BRSCH | CHAR | 4 | No | Industry sector |
| Account Group | KTOKD | CHAR | 4 | Yes | Customer account group |

**Screenshot Placeholder:** `screenshots/01-KNA1-General-Data-XD01.png`
*Shows XD01 transaction - General Data tab with KNA1 fields*

### KNB1 - Company Code Data

**Table Description**: Contains company code-specific data, such as accounting information and payment terms.

**Key Fields:**

| Field Name | Technical Name | Data Type | Length | Required | Description |
|------------|---------------|-----------|--------|----------|-------------|
| Customer Number | KUNNR | CHAR | 10 | Yes | Customer number |
| Company Code | BUKRS | CHAR | 4 | Yes | Company code |
| Reconciliation Account | AKONT | CHAR | 10 | Yes | G/L account for customer reconciliation |
| Payment Terms | ZTERM | CHAR | 4 | No | Terms of payment key |
| Clerk | BUSAB | CHAR | 2 | No | Accounting clerk abbreviation |
| Sort Key | ZUAWA | CHAR | 3 | No | Sort key for line item display |
| Payment Methods | ZWELS | CHAR | 10 | No | List of payment methods |
| Dunning Procedure | MAHNA | CHAR | 4 | No | Dunning procedure |
| Dunning Block | SPERR | CHAR | 1 | No | Dunning block indicator |
| Payment Block | ZAHLS | CHAR | 1 | No | Payment block key |
| Interest Indicator | VZSKZ | CHAR | 2 | No | Interest calculation indicator |

**Screenshot Placeholder:** `screenshots/02-KNB1-Company-Code-Data-XD01.png`
*Shows XD01 transaction - Company Code Data tab with KNB1 fields*

### KNVV - Sales Area Data

**Table Description**: Contains sales area-specific data (sales organization, distribution channel, division).

**Key Fields:**

| Field Name | Technical Name | Data Type | Length | Required | Description |
|------------|---------------|-----------|--------|----------|-------------|
| Customer Number | KUNNR | CHAR | 10 | Yes | Customer number |
| Sales Organization | VKORG | CHAR | 4 | Yes | Sales organization |
| Distribution Channel | VTWEG | CHAR | 2 | Yes | Distribution channel |
| Division | SPART | CHAR | 2 | Yes | Division |
| Currency | WAERS | CHAR | 5 | No | Currency key |
| Delivery Priority | LPRIO | NUMC | 2 | No | Delivery priority |
| Shipping Conditions | VSBED | CHAR | 2 | No | Shipping conditions |
| Delivery Plant | VWERK | CHAR | 4 | No | Delivering plant |
| Sales Office | VKBUR | CHAR | 4 | No | Sales office |
| Sales Group | VKGRP | CHAR | 3 | No | Sales group |
| Customer Group | KDGRP | CHAR | 2 | No | Customer group |
| Price List | PLTYP | CHAR | 2 | No | Price list type |
| Incoterms 1 | INCO1 | CHAR | 3 | No | Incoterms (e.g., EXW, FOB) |
| Incoterms 2 | INCO2 | CHAR | 28 | No | Incoterms location |
| Terms of Payment | ZTERM | CHAR | 4 | No | Terms of payment |
| Account Assignment Group | KTGRD | CHAR | 2 | No | Account assignment group |

**Screenshot Placeholder:** `screenshots/03-KNVV-Sales-Area-Data-XD01.png`
*Shows XD01 transaction - Sales Area Data tab with KNVV fields*

---

## 3. The 14-Step LSMW Process

LSMW follows a structured 14-step process. Each step must be completed in sequence.

### Step 1: Maintain Object Attributes

**Purpose**: Define the LSMW project, subproject, and object.

**Transaction**: LSMW
**Navigation**: LSMW → Create

**Fields to Configure:**

| Field | Value | Description |
|-------|-------|-------------|
| Project | CUST_MASTER | LSMW project name |
| Subproject | INITIAL_LOAD | Subproject for initial migration |
| Object | XD01_CUSTOMER | Migration object name |
| Object Type | Standard Batch/Direct Input | Method type |
| Recording | XD01_REC | Name of batch input recording |

**Screenshot Placeholder:** `screenshots/04-LSMW-Step1-Object-Attributes.png`
*Shows LSMW initial screen with project/subproject/object creation*

**Steps:**
1. Launch transaction **LSMW**
2. Click **Create** button (white page icon)
3. Enter **Project**: `CUST_MASTER`
4. Enter **Subproject**: `INITIAL_LOAD`
5. Enter **Object**: `XD01_CUSTOMER`
6. Enter **Object Description**: "Customer Master Initial Load"
7. Click **Save** (Ctrl+S)
8. Select object type: **Standard Batch/Direct Input** → **Batch Input Recording**
9. Click **Continue** (Enter key)

**Validation Checkpoint:**
✅ Object attributes saved successfully
✅ Object type = Batch Input Recording
✅ System returns to LSMW main screen

---

### Step 2: Maintain Source Structures

**Purpose**: Define the structure of the source data file (Excel/CSV).

**Transaction**: LSMW
**Navigation**: LSMW → Select object → Maintain Source Structures

**Structure to Create:**

| Source Structure | Description |
|-----------------|-------------|
| CUST_HEADER | Customer general data (KNA1) |
| CUST_COMPANY | Customer company code data (KNB1) |
| CUST_SALES | Customer sales area data (KNVV) |

**Screenshot Placeholder:** `screenshots/05-LSMW-Step2-Source-Structures.png`
*Shows Source Structures screen with CUST_HEADER, CUST_COMPANY, CUST_SALES*

**Steps:**
1. From LSMW main screen, double-click **Maintain Source Structures**
2. Click **Create** button
3. Enter **Source Structure**: `CUST_HEADER`
4. Enter **Description**: "Customer General Data"
5. Click **Save**
6. Repeat for:
   - `CUST_COMPANY` - "Customer Company Code Data"
   - `CUST_SALES` - "Customer Sales Area Data"

**Best Practice:**
- Create separate structures for each data level (header, company, sales)
- This allows one-to-many relationships (1 customer → multiple company codes)

**Validation Checkpoint:**
✅ 3 source structures created
✅ Structures appear in the structure list

---

### Step 3: Maintain Source Fields

**Purpose**: Define the fields in each source structure (matching your Excel columns).

**Transaction**: LSMW
**Navigation**: LSMW → Maintain Source Fields

**Fields to Create for CUST_HEADER:**

| Field Name | Data Type | Length | Description |
|------------|-----------|--------|-------------|
| CUSTOMER_ID | CHAR | 10 | Customer number from legacy system |
| CUSTOMER_NAME | CHAR | 35 | Customer name |
| CUSTOMER_NAME2 | CHAR | 35 | Customer name line 2 |
| SEARCH_TERM | CHAR | 10 | Search term |
| STREET | CHAR | 35 | Street address |
| CITY | CHAR | 35 | City |
| POSTAL_CODE | CHAR | 10 | Postal code |
| COUNTRY | CHAR | 3 | Country key |
| REGION | CHAR | 3 | Region |
| TELEPHONE | CHAR | 16 | Telephone number |
| ACCOUNT_GROUP | CHAR | 4 | Customer account group |

**Screenshot Placeholder:** `screenshots/06-LSMW-Step3-Source-Fields-Header.png`
*Shows Source Fields screen for CUST_HEADER structure*

**Fields to Create for CUST_COMPANY:**

| Field Name | Data Type | Length | Description |
|------------|-----------|--------|-------------|
| CUSTOMER_ID | CHAR | 10 | Customer number (link field) |
| COMPANY_CODE | CHAR | 4 | Company code |
| RECON_ACCOUNT | CHAR | 10 | Reconciliation account |
| PAYMENT_TERMS | CHAR | 4 | Payment terms |
| CLERK_CODE | CHAR | 2 | Accounting clerk |

**Fields to Create for CUST_SALES:**

| Field Name | Data Type | Length | Description |
|------------|-----------|--------|-------------|
| CUSTOMER_ID | CHAR | 10 | Customer number (link field) |
| SALES_ORG | CHAR | 4 | Sales organization |
| DIST_CHANNEL | CHAR | 2 | Distribution channel |
| DIVISION | CHAR | 2 | Division |
| SALES_OFFICE | CHAR | 4 | Sales office |
| SHIPPING_COND | CHAR | 2 | Shipping conditions |

**Screenshot Placeholder:** `screenshots/07-LSMW-Step3-Source-Fields-Complete.png`
*Shows all source fields defined for all 3 structures*

**Steps:**
1. Double-click **Maintain Source Fields**
2. Select structure **CUST_HEADER**
3. Click **Create** button
4. Enter field details from table above
5. Click **Save**
6. Repeat for all fields in CUST_HEADER
7. Repeat process for CUST_COMPANY and CUST_SALES structures

**Validation Checkpoint:**
✅ All source fields created for each structure
✅ Data types and lengths match source file
✅ Link fields (CUSTOMER_ID) present in all structures

---

### Step 4: Maintain Structure Relations

**Purpose**: Define the hierarchical relationship between source structures.

**Transaction**: LSMW
**Navigation**: LSMW → Maintain Structure Relations

**Relationships to Create:**

```
CUST_HEADER (1)
    └── CUST_COMPANY (*)
    └── CUST_SALES (*)
```

This means:
- 1 customer header can have multiple company code assignments
- 1 customer header can have multiple sales area assignments

**Screenshot Placeholder:** `screenshots/08-LSMW-Step4-Structure-Relations.png`
*Shows structure relations with CUST_HEADER as parent*

**Steps:**
1. Double-click **Maintain Structure Relations**
2. Select **CUST_HEADER** (parent structure)
3. Click **Create Relationship** button
4. Select **CUST_COMPANY** as child structure
5. Click **Save**
6. Repeat to create relationship: CUST_HEADER → CUST_SALES

**Key Concepts:**
- **1:1 relationship** - Each header has exactly one child record
- **1:N relationship** - Each header can have multiple child records (our case)

**Validation Checkpoint:**
✅ CUST_HEADER → CUST_COMPANY relationship created
✅ CUST_HEADER → CUST_SALES relationship created
✅ Relationship type = 1:N (one-to-many)

---

### Step 5: Maintain Field Mapping and Conversion Rules

**Purpose**: Map source fields to SAP target fields (XD01 screen fields).

**Transaction**: LSMW
**Navigation**: LSMW → Maintain Field Mapping and Conversion Rules

This is the **most critical step** in LSMW. You map each source field to the corresponding XD01 transaction field.

**Mapping Strategy:**

1. **Direct Mapping**: Source field → SAP field (no transformation)
2. **Fixed Value Mapping**: Constant value assigned to SAP field
3. **Conversion Routine**: Source value transformed before posting (e.g., date format)
4. **Translation**: Source value looked up in translation table

**Screenshot Placeholder:** `screenshots/09-LSMW-Step5-Field-Mapping-Overview.png`
*Shows field mapping screen with source and target fields*

**Sample Field Mappings - General Data (KNA1):**

| Source Field | SAP Field | SAP Field Name | Mapping Type | Conversion Rule |
|--------------|-----------|----------------|--------------|-----------------|
| CUSTOMER_NAME | NAME1 | Customer Name 1 | Direct | - |
| CUSTOMER_NAME2 | NAME2 | Customer Name 2 | Direct | - |
| STREET | STRAS | Street | Direct | - |
| CITY | ORT01 | City | Direct | - |
| POSTAL_CODE | PSTLZ | Postal Code | Direct | - |
| COUNTRY | LAND1 | Country Key | Translation | Country code mapping |
| REGION | REGIO | Region | Direct | - |
| TELEPHONE | TELF1 | Telephone 1 | Direct | - |
| ACCOUNT_GROUP | KTOKD | Account Group | Fixed Value | KUNA (default) |

**Sample Field Mappings - Company Code Data (KNB1):**

| Source Field | SAP Field | SAP Field Name | Mapping Type | Conversion Rule |
|--------------|-----------|----------------|--------------|-----------------|
| COMPANY_CODE | BUKRS | Company Code | Direct | - |
| RECON_ACCOUNT | AKONT | Reconciliation Account | Fixed Value | 140000 (default) |
| PAYMENT_TERMS | ZTERM | Payment Terms | Translation | Terms mapping table |
| CLERK_CODE | BUSAB | Accounting Clerk | Direct | - |

**Sample Field Mappings - Sales Area Data (KNVV):**

| Source Field | SAP Field | SAP Field Name | Mapping Type | Conversion Rule |
|--------------|-----------|----------------|--------------|-----------------|
| SALES_ORG | VKORG | Sales Organization | Direct | - |
| DIST_CHANNEL | VTWEG | Distribution Channel | Direct | - |
| DIVISION | SPART | Division | Direct | - |
| SALES_OFFICE | VKBUR | Sales Office | Direct | - |
| SHIPPING_COND | VSBED | Shipping Conditions | Translation | Shipping code mapping |

**Screenshot Placeholder:** `screenshots/10-LSMW-Step5-Field-Mapping-Details.png`
*Shows detailed field mapping for a specific field with conversion rule*

**Steps:**
1. Double-click **Maintain Field Mapping and Conversion Rules**
2. System displays recording fields (from XD01 recording - created in Step 6)
3. For each SAP field, assign source field or fixed value:
   - Click on SAP field row
   - Click **Assign Field** button (or F6)
   - Select source field from dropdown
   - OR enter fixed value directly
4. For fields requiring conversion:
   - Click **Conversion Rule** button
   - Enter ABAP code or translation table
5. Click **Save** after each mapping

**Common Conversion Examples:**

**Date Format Conversion:**
```abap
* Convert MM/DD/YYYY to YYYYMMDD
CONCATENATE $-DATE+6(4) $-DATE+0(2) $-DATE+3(2) INTO TARGET_FIELD.
```

**Country Code Translation:**
```
Source Value → Target Value
USA → US
United Kingdom → GB
Germany → DE
```

**Validation Checkpoint:**
✅ All required fields mapped
✅ Conversion rules defined for fields needing transformation
✅ Fixed values assigned for constant fields
✅ No errors in syntax of conversion rules

---

### Step 6: Maintain Fixed Values, Translations, User-Defined Routines

**Purpose**: Define fixed values, translation tables, and custom ABAP routines used in field mapping.

**Transaction**: LSMW
**Navigation**: LSMW → Maintain Fixed Values, Translations, User-Defined Routines

**Sub-Steps:**

#### 6.1 Fixed Values

**Use Case**: Assign constant values to SAP fields that don't exist in source data.

**Example Fixed Values:**

| SAP Field | Fixed Value | Description |
|-----------|-------------|-------------|
| KTOKD (Account Group) | KUNA | Domestic customer |
| AKONT (Recon Account) | 140000 | Customer receivables account |
| SPRAS (Language) | E | English |
| WAERS (Currency) | USD | US Dollars |

**Screenshot Placeholder:** `screenshots/11-LSMW-Step6-Fixed-Values.png`
*Shows fixed value assignment screen*

**Steps:**
1. Double-click **Maintain Fixed Values**
2. Select target field (e.g., KTOKD)
3. Click **Create Fixed Value**
4. Enter value: `KUNA`
5. Enter description: "Domestic Customer Account Group"
6. Click **Save**

#### 6.2 Translation Tables

**Use Case**: Convert source values to SAP-compatible values (e.g., "USA" → "US").

**Example Translation Table - Country Codes:**

| Source Value | Target Value | Description |
|--------------|--------------|-------------|
| USA | US | United States |
| United Kingdom | GB | Great Britain |
| Germany | DE | Germany |
| France | FR | France |
| China | CN | China |

**Screenshot Placeholder:** `screenshots/12-LSMW-Step6-Translation-Table.png`
*Shows translation table for country codes*

**Steps:**
1. Double-click **Maintain Translations**
2. Click **Create Translation**
3. Enter source field: `COUNTRY`
4. Enter target field: `LAND1`
5. Click **Maintain Translation Table**
6. Enter source/target value pairs from table above
7. Click **Save**

#### 6.3 User-Defined Routines

**Use Case**: Write custom ABAP code for complex data transformations.

**Example Routine - Customer Number Padding:**

```abap
*&---------------------------------------------------------------------*
*& Form CONVERT_CUSTOMER_NUMBER
*&---------------------------------------------------------------------*
*  Convert 6-digit legacy customer ID to 10-digit SAP format
*  Example: 123456 → 0000123456
*----------------------------------------------------------------------*
FORM CONVERT_CUSTOMER_NUMBER
  USING    SOURCE_VALUE
  CHANGING TARGET_VALUE.

  CALL FUNCTION 'CONVERSION_EXIT_ALPHA_INPUT'
    EXPORTING
      input  = SOURCE_VALUE
    IMPORTING
      output = TARGET_VALUE.

ENDFORM.
```

**Screenshot Placeholder:** `screenshots/13-LSMW-Step6-User-Routine.png`
*Shows user-defined routine editor with ABAP code*

**Steps:**
1. Double-click **Maintain User-Defined Routines**
2. Click **Create Routine**
3. Enter routine name: `CONVERT_CUSTOMER_NUMBER`
4. Enter ABAP code from example above
5. Click **Check** to validate syntax
6. Click **Save**
7. Return to field mapping (Step 5) and assign this routine to KUNNR field

**Validation Checkpoint:**
✅ All fixed values defined for constant fields
✅ Translation tables created for value conversions
✅ User routines coded and syntax-checked
✅ Routines assigned to appropriate fields in Step 5

---

### Step 7: Specify Files

**Purpose**: Define the location and format of the source data file.

**Transaction**: LSMW
**Navigation**: LSMW → Specify Files

**File Specification:**

| Parameter | Value | Description |
|-----------|-------|-------------|
| File Name | C:\Data\Customer_Master.txt | Full path to source file |
| File Type | ASCII | Text file format |
| Code Page | 4110 (UTF-8) | Character encoding |
| Field Separator | Tab | Tab-delimited file |
| Escape Character | " | Quote character for text fields |

**Screenshot Placeholder:** `screenshots/14-LSMW-Step7-Specify-Files.png`
*Shows file specification screen with path and format options*

**Steps:**
1. Double-click **Specify Files**
2. Select structure: **CUST_HEADER**
3. Enter file path: `C:\Data\Customer_Master.txt`
4. Select file type: **ASCII (Tab-delimited)**
5. Enter field separator: **Tab**
6. Click **Save**
7. Repeat for CUST_COMPANY and CUST_SALES files (if separate files)

**Alternative: Single File with All Data**

If using a single file with header + company + sales data:
- Specify the same file for all 3 structures
- LSMW will read data based on structure relations

**File Format Example (Tab-delimited):**

```
CUSTOMER_ID	CUSTOMER_NAME	STREET	CITY	COUNTRY	COMPANY_CODE	SALES_ORG
100001	ABC Corporation	123 Main St	New York	US	1000	1000
100002	XYZ Industries	456 Oak Ave	Chicago	US	1000	1000
```

**Validation Checkpoint:**
✅ File path correct and accessible
✅ File type matches actual file format
✅ Field separator matches source file
✅ File readable by LSMW (no permission errors)

---

### Step 8: Assign Files

**Purpose**: Link the source files to the source structures.

**Transaction**: LSMW
**Navigation**: LSMW → Assign Files

This step connects the files specified in Step 7 to the structures defined in Step 2.

**Screenshot Placeholder:** `screenshots/15-LSMW-Step8-Assign-Files.png`
*Shows file assignment screen linking files to structures*

**Steps:**
1. Double-click **Assign Files**
2. System displays structures and assigned files
3. Verify assignments:
   - CUST_HEADER → Customer_Master.txt
   - CUST_COMPANY → Customer_Master.txt (or separate file)
   - CUST_SALES → Customer_Master.txt (or separate file)
4. If incorrect, click **Change** and reassign
5. Click **Save**

**Note**: If using a single file for all structures, the same filename appears for all 3 structures.

**Validation Checkpoint:**
✅ All structures have files assigned
✅ File paths are correct
✅ No errors in assignment

---

### Step 9: Read Data

**Purpose**: Read data from the source file into LSMW's internal structures.

**Transaction**: LSMW
**Navigation**: LSMW → Read Data

**Screenshot Placeholder:** `screenshots/16-LSMW-Step9-Read-Data.png`
*Shows Read Data execution screen with progress bar*

**Steps:**
1. Double-click **Read Data**
2. System displays read options:
   - **Test Mode**: Read only first 10 records
   - **Production Mode**: Read all records
3. For initial testing, select **Test Mode**
4. Click **Execute** (F8)
5. System reads data and displays results:
   - Number of records read
   - Number of errors (if any)
6. Review results

**Expected Results:**

```
Structure CUST_HEADER: 100 records read
Structure CUST_COMPANY: 100 records read
Structure CUST_SALES: 150 records read (some customers have multiple sales areas)
Total: 350 records read successfully
Errors: 0
```

**Common Errors at This Stage:**

| Error Message | Cause | Solution |
|---------------|-------|----------|
| "File not found" | Incorrect file path | Verify path in Step 7 |
| "Field separator mismatch" | Wrong delimiter configured | Check file format in Step 7 |
| "Character encoding error" | Wrong code page | Change code page in Step 7 |
| "Record length exceeded" | Field too long | Check source field lengths in Step 3 |

**Validation Checkpoint:**
✅ All records read successfully
✅ Record counts match expected values
✅ No read errors
✅ Ready to proceed to Step 10

---

### Step 10: Display Read Data

**Purpose**: Verify that data was read correctly from the source file.

**Transaction**: LSMW
**Navigation**: LSMW → Display Read Data

**Screenshot Placeholder:** `screenshots/17-LSMW-Step10-Display-Read-Data.png`
*Shows read data display with customer records in table format*

**Steps:**
1. Double-click **Display Read Data**
2. System displays data in table format
3. Review sample records:
   - Check field values
   - Verify data types
   - Look for unexpected values (nulls, special characters)
4. Use filters and sorting to analyze data:
   - Sort by CUSTOMER_ID
   - Filter by COUNTRY
   - Search for specific values

**Data Quality Checks:**

✅ **Completeness**: All required fields populated
✅ **Format**: Data matches expected format (dates, numbers)
✅ **Consistency**: Related fields match (e.g., US country → US postal codes)
✅ **Duplicates**: No duplicate customer IDs

**Example Data Display:**

| CUSTOMER_ID | CUSTOMER_NAME | CITY | COUNTRY | COMPANY_CODE | SALES_ORG |
|-------------|---------------|------|---------|--------------|-----------|
| 100001 | ABC Corporation | New York | US | 1000 | 1000 |
| 100002 | XYZ Industries | Chicago | US | 1000 | 1000 |
| 100003 | Global Trading | London | GB | 2000 | 2000 |

**Validation Checkpoint:**
✅ Data displayed correctly
✅ No truncated fields
✅ No unexpected nulls
✅ Data quality acceptable

---

### Step 11: Convert Data

**Purpose**: Apply field mappings and conversion rules to transform source data into SAP format.

**Transaction**: LSMW
**Navigation**: LSMW → Convert Data

This step executes all the mapping logic defined in Steps 5 and 6.

**Screenshot Placeholder:** `screenshots/18-LSMW-Step11-Convert-Data.png`
*Shows Convert Data execution screen with conversion log*

**Steps:**
1. Double-click **Convert Data**
2. Select conversion mode:
   - **Test Mode**: Convert first 10 records
   - **Production Mode**: Convert all records
3. For initial testing, select **Test Mode**
4. Click **Execute** (F8)
5. System performs conversions:
   - Direct field mappings
   - Fixed value assignments
   - Translation table lookups
   - User-defined routine executions
6. Review conversion log

**Expected Results:**

```
Records Converted: 100
Errors: 0
Warnings: 5 (missing optional fields)

Conversion Summary:
- Direct mappings: 1,200 fields processed
- Fixed values: 300 fields populated
- Translations: 100 country codes converted
- User routines: 100 customer numbers formatted
```

**Common Conversion Errors:**

| Error Message | Cause | Solution |
|---------------|-------|----------|
| "Translation not found" | Missing entry in translation table | Add entry in Step 6 |
| "Fixed value not defined" | Missing fixed value | Define in Step 6 |
| "Routine error: Division by zero" | Bug in user routine | Fix ABAP code in Step 6 |
| "Field length exceeded" | Target field too small | Check field mapping in Step 5 |

**Validation Checkpoint:**
✅ All records converted successfully
✅ No conversion errors (or errors resolved)
✅ Warnings reviewed and acceptable
✅ Ready to proceed to Step 12

---

### Step 12: Display Converted Data

**Purpose**: Verify that data was converted correctly and is ready for SAP.

**Transaction**: LSMW
**Navigation**: LSMW → Display Converted Data

**Screenshot Placeholder:** `screenshots/19-LSMW-Step12-Display-Converted-Data.png`
*Shows converted data in SAP format with target field names*

**Steps:**
1. Double-click **Display Converted Data**
2. System displays data in SAP format (using SAP field names)
3. Compare with original source data (Step 10)
4. Verify transformations:
   - Fixed values applied correctly
   - Translations worked (e.g., "USA" → "US")
   - User routines executed (e.g., customer numbers padded)

**Example Converted Data Display:**

| KUNNR (Customer) | NAME1 (Name) | ORT01 (City) | LAND1 (Country) | BUKRS (Co.Code) | VKORG (Sales Org) |
|------------------|--------------|--------------|-----------------|-----------------|-------------------|
| 0000100001 | ABC Corporation | New York | US | 1000 | 1000 |
| 0000100002 | XYZ Industries | Chicago | US | 1000 | 1000 |
| 0000100003 | Global Trading | London | GB | 2000 | 2000 |

**Key Checks:**

✅ **KUNNR**: Customer numbers padded with leading zeros
✅ **LAND1**: Country codes translated to SAP format
✅ **KTOKD**: Account group fixed value applied
✅ **AKONT**: Reconciliation account populated

**Validation Checkpoint:**
✅ All conversions correct
✅ No data loss during conversion
✅ SAP field formats valid
✅ Ready to create batch input session

---

### Step 13: Create Batch Input Session

**Purpose**: Generate a batch input session that will execute XD01 transactions in SAP.

**Transaction**: LSMW
**Navigation**: LSMW → Create Batch Input Session

A **batch input session** is a recorded sequence of screen entries that SAP will replay to create customer master records.

**Screenshot Placeholder:** `screenshots/20-LSMW-Step13-Create-BI-Session.png`
*Shows batch input session creation screen with session name*

**Steps:**
1. Double-click **Create Batch Input Session**
2. Enter session parameters:
   - **Session Name**: `CUST_LOAD_20251026` (use date for tracking)
   - **User**: Your SAP username (who will run the session)
   - **Lock Date**: Leave blank (no lock)
   - **Keep Session**: Checked (retain after processing for review)
   - **Process Mode**: **Display Errors Only** (for production) or **Process/Foreground** (for testing)
3. Select records to include:
   - **All records** (production)
   - **First 5 records** (initial test)
4. Click **Execute** (F8)
5. System creates batch input session

**Expected Results:**

```
Batch Input Session Created: CUST_LOAD_20251026
Number of Transactions: 100 (one XD01 per customer)
Session Status: New (ready to process)
Session stored in: Transaction SM35
```

**Process Mode Options:**

| Mode | Description | When to Use |
|------|-------------|-------------|
| **Process/Foreground** | Shows each screen as it processes | Testing (5-10 records) |
| **Process/Background** | No screen display, faster | Production (100+ records) |
| **Display Errors Only** | Shows only error screens | **Recommended** for production |

**Validation Checkpoint:**
✅ Batch input session created
✅ Session name follows naming convention
✅ Transaction count = number of customers
✅ Session visible in SM35

---

### Step 14: Run Batch Input Session

**Purpose**: Execute the batch input session to create customer master records in SAP.

**Transaction**: SM35 (Batch Input: Session Overview)
**Navigation**: SM35 → Select session → Process

This is the final step where data is actually posted into SAP.

**Screenshot Placeholder:** `screenshots/21-SM35-Session-Overview.png`
*Shows SM35 session overview with CUST_LOAD_20251026 session*

**Steps:**
1. Go to transaction **SM35**
2. Locate your session: `CUST_LOAD_20251026`
3. Check session status:
   - Status should be **New** (not yet processed)
4. Select the session (click on row)
5. Click **Process** button
6. Select processing mode:
   - **Display Errors Only** (recommended)
   - **Process in Background** (for large volumes after testing)
7. Click **Process** (F8)
8. System begins processing transactions
9. Monitor progress:
   - Transaction counter shows progress
   - Error screens appear if validation fails

**Screenshot Placeholder:** `screenshots/22-SM35-Processing-Session.png`
*Shows batch input session processing in progress*

**Expected Results (Successful Run):**

```
Session: CUST_LOAD_20251026
Transactions Processed: 100
Successfully Processed: 95
Errors: 5
Session Status: Processed with Errors
```

**Error Handling:**

If errors occur during processing:

1. **Note the error transaction number** (e.g., Transaction 23 failed)
2. **Review error message** on screen:
   - Field validation error (e.g., "Account group KUNA does not exist")
   - Authorization error (user lacks authorization)
   - Configuration error (sales org not defined)
3. **Correct the error**:
   - Fix source data
   - Fix SAP configuration
   - Fix field mapping
4. **Re-run only failed transactions**:
   - In SM35, select session
   - Click **Process** → Select **Process Incorrectly Processed Transactions Only**
   - Re-process

**Screenshot Placeholder:** `screenshots/23-SM35-Error-Screen.png`
*Shows batch input error screen with validation message*

**Validation After Processing:**

1. **Check Customer Created**:
   - Transaction: **XD03** (Display Customer)
   - Enter customer number: 0000100001
   - Verify all data populated correctly

2. **Verify Database Tables**:
   - Transaction: **SE16** (Data Browser)
   - Check KNA1, KNB1, KNVV tables for new records

3. **Session Log Analysis**:
   - In SM35, select session
   - Click **Logs** button
   - Review processing log for warnings/errors

**Screenshot Placeholder:** `screenshots/24-XD03-Customer-Display.png`
*Shows XD03 transaction displaying newly created customer*

**Validation Checkpoint:**
✅ Batch input session processed successfully
✅ All transactions completed (or errors documented)
✅ Customer records created in SAP
✅ Data visible in XD03 and database tables

**Post-Processing Cleanup:**

1. **Archive Session** (if successful):
   - In SM35, select session
   - Click **Delete** (after verifying data)

2. **Document Results**:
   - Number of records processed
   - Number of errors
   - Error descriptions and resolutions

**Common Errors During Batch Input Processing:**

| Error Message | Cause | Solution |
|---------------|-------|----------|
| "Account group KUNA not defined" | Account group missing | Create in OBAR transaction |
| "Company code 1000 does not exist" | Company code not configured | Create in OX02 transaction |
| "Sales org 1000 not assigned to company code 1000" | Org structure not configured | Assign in OVXB transaction |
| "Reconciliation account 140000 does not exist" | G/L account missing | Create G/L account in FS00 |
| "User does not have authorization for XD01" | Authorization issue | Assign authorization profile |

---

## 4. Recording Instructions

### Creating XD01 Recording

A **batch input recording** captures the screen flow and field entries for transaction XD01. LSMW uses this recording to know which screens and fields to populate.

**Transaction**: SHDB (Batch Input: Recording)
**Navigation**: SHDB → New Recording

**Screenshot Placeholder:** `screenshots/25-SHDB-Recording-Overview.png`
*Shows SHDB transaction with recording list*

**Steps to Create Recording:**

1. **Start Recording**:
   - Transaction: **SHDB**
   - Click **New Recording**
   - Enter recording name: `XD01_REC`
   - Click **Start Recording** button

2. **Record XD01 Transaction**:
   - System opens SAP GUI in recording mode
   - Enter transaction: **XD01**
   - Press Enter

3. **Initial Screen - Customer Number**:
   - Enter customer number: `TEST001` (dummy value for recording)
   - Enter company code: `1000`
   - Enter sales organization: `1000`
   - Enter distribution channel: `01`
   - Enter division: `00`
   - Press Enter

4. **General Data Tab**:
   - Enter all required fields:
     - Customer Name 1: `Test Customer`
     - Street: `123 Test St`
     - City: `Test City`
     - Country: `US`
     - Region: `CA`
     - Account Group: `KUNA`
   - Click **Company Code Data** tab

5. **Company Code Data Tab**:
   - Enter all required fields:
     - Reconciliation Account: `140000`
     - Payment Terms: `0001`
   - Click **Sales Area Data** tab

6. **Sales Area Data Tab**:
   - Enter all required fields:
     - Currency: `USD`
     - Shipping Conditions: `01`
     - Delivery Priority: `01`
   - Click **Save** button

7. **Stop Recording**:
   - System returns to SHDB screen
   - Recording saved automatically
   - Review recording steps

**Screenshot Placeholder:** `screenshots/26-SHDB-Recording-Steps.png`
*Shows recorded steps for XD01 with screen names and fields*

**Recording Best Practices:**

✅ **Enter all fields** you plan to populate via LSMW (even if optional)
✅ **Use dummy data** for recording (real data comes from source file)
✅ **Navigate through all tabs** you need (General, Company, Sales)
✅ **Complete the transaction** (click Save at the end)
✅ **Avoid navigation shortcuts** (use tab key, not mouse clicks)

**Validation After Recording:**

1. **Play Back Recording**:
   - In SHDB, select recording `XD01_REC`
   - Click **Execute** button
   - System replays the recording
   - Verify it creates customer successfully

2. **Review Recorded Fields**:
   - In SHDB, select recording
   - Click **Display** button
   - Review all captured screens and fields
   - Ensure all required fields are present

**Screenshot Placeholder:** `screenshots/27-SHDB-Recording-Playback.png`
*Shows recording playback execution screen*

---

### Field Mapping Guidelines

**Principle**: Map source data fields to SAP target fields based on the recording.

**Mapping Types:**

1. **Direct Mapping**:
   - Source field directly mapped to SAP field
   - No transformation
   - Example: `CUSTOMER_NAME` → `NAME1`

2. **Fixed Value Mapping**:
   - Constant value assigned to SAP field
   - Source file doesn't contain this data
   - Example: `KTOKD` (Account Group) = `KUNA` (always)

3. **Conditional Mapping**:
   - Value depends on logic
   - Example: If `COUNTRY` = "USA", then `LAND1` = "US"

4. **Calculated Mapping**:
   - Value computed from source fields
   - Example: `FULL_NAME` = `FIRST_NAME` + " " + `LAST_NAME`

**Field Mapping Decision Matrix:**

| Scenario | Source Data | SAP Field | Mapping Strategy |
|----------|-------------|-----------|------------------|
| Field exists in source, exact match | ✅ | ✅ | Direct mapping |
| Field exists, different format | ✅ | ✅ | Translation/conversion |
| Field doesn't exist, constant value | ❌ | ✅ | Fixed value |
| Field doesn't exist, derived | ❌ | ✅ | User-defined routine |
| Field exists, not needed in SAP | ✅ | ❌ | Don't map (ignore) |

**Common Field Mapping Scenarios:**

**Scenario 1: Customer Number Formatting**
- **Source**: 6-digit number (123456)
- **SAP**: 10-digit with leading zeros (0000123456)
- **Solution**: User-defined routine with CONVERSION_EXIT_ALPHA_INPUT

**Scenario 2: Country Code Translation**
- **Source**: Full country name ("United States")
- **SAP**: ISO country code ("US")
- **Solution**: Translation table

**Scenario 3: Default Reconciliation Account**
- **Source**: Not in source file
- **SAP**: Required field (AKONT)
- **Solution**: Fixed value = 140000

**Scenario 4: Date Format Conversion**
- **Source**: MM/DD/YYYY (10/26/2025)
- **SAP**: YYYYMMDD (20251026)
- **Solution**: Conversion routine

---

### Source Structure Design

**Design Principle**: Structure your source data to match SAP's hierarchical data model.

**SAP Customer Master Hierarchy:**

```
Customer (Header)
├── General Data (KNA1) - Stored once per customer
│
├── Company Code Data (KNB1) - Can have multiple company codes
│   ├── Company Code 1000
│   ├── Company Code 2000
│   └── ...
│
└── Sales Area Data (KNVV) - Can have multiple sales areas
    ├── Sales Org 1000, Dist Channel 01, Division 00
    ├── Sales Org 2000, Dist Channel 01, Division 00
    └── ...
```

**Source Structure Design Options:**

**Option 1: Flat File (Single Sales Area per Customer)**

Use when: Each customer has exactly ONE company code and ONE sales area.

```
CUSTOMER_ID | NAME | STREET | CITY | COMPANY_CODE | SALES_ORG | DIST_CHANNEL | DIVISION
100001 | ABC Corp | 123 Main | NYC | 1000 | 1000 | 01 | 00
100002 | XYZ Inc | 456 Oak | CHI | 1000 | 1000 | 01 | 00
```

**LSMW Structures**:
- CUST_HEADER (header + company + sales data in one record)
- No child structures needed

**Option 2: Hierarchical File (Multiple Sales Areas per Customer)**

Use when: Each customer can have MULTIPLE company codes or sales areas.

**Header File** (Customer_Header.txt):
```
CUSTOMER_ID | NAME | STREET | CITY
100001 | ABC Corp | 123 Main | NYC
100002 | XYZ Inc | 456 Oak | CHI
```

**Company File** (Customer_Company.txt):
```
CUSTOMER_ID | COMPANY_CODE | RECON_ACCOUNT | PAYMENT_TERMS
100001 | 1000 | 140000 | 0001
100001 | 2000 | 240000 | 0002
100002 | 1000 | 140000 | 0001
```

**Sales File** (Customer_Sales.txt):
```
CUSTOMER_ID | SALES_ORG | DIST_CHANNEL | DIVISION | SHIPPING_COND
100001 | 1000 | 01 | 00 | 01
100001 | 1000 | 02 | 00 | 01
100002 | 1000 | 01 | 00 | 02
```

**LSMW Structures**:
- CUST_HEADER (1 record per customer)
- CUST_COMPANY (N records per customer)
- CUST_SALES (N records per customer)
- Relations: CUST_HEADER → CUST_COMPANY (1:N), CUST_HEADER → CUST_SALES (1:N)

**Option 3: Single File with Repeating Groups**

Use when: Source system exports hierarchical data in a single file.

```
*HEADER*
CUSTOMER_ID | NAME | STREET | CITY
100001 | ABC Corp | 123 Main | NYC
*COMPANY*
CUSTOMER_ID | COMPANY_CODE | RECON_ACCOUNT
100001 | 1000 | 140000
100001 | 2000 | 240000
*SALES*
CUSTOMER_ID | SALES_ORG | DIST_CHANNEL
100001 | 1000 | 01
100001 | 1000 | 02
*HEADER*
CUSTOMER_ID | NAME | STREET | CITY
100002 | XYZ Inc | 456 Oak | CHI
...
```

**LSMW Structures**:
- Same as Option 2 (CUST_HEADER, CUST_COMPANY, CUST_SALES)
- File reading logic uses markers (*HEADER*, *COMPANY*, *SALES*)

**Recommended Approach**: **Option 2** (Hierarchical File) is most flexible and aligns with SAP structure.

---

## 5. Data File Preparation

### Excel/CSV Template

A well-designed Excel template ensures data quality before migration.

**Template File**: `Customer-Master-Data-Template.xlsx`

**Sheet 1: General Data (KNA1)**

| Column Name | Data Type | Max Length | Required | Example | Validation Rule |
|-------------|-----------|------------|----------|---------|-----------------|
| CUSTOMER_ID | Text | 10 | Yes | 100001 | Numeric, unique |
| CUSTOMER_NAME | Text | 35 | Yes | ABC Corporation | - |
| CUSTOMER_NAME2 | Text | 35 | No | Headquarters | - |
| SEARCH_TERM | Text | 10 | No | ABCCORP | Uppercase |
| STREET | Text | 35 | No | 123 Main Street | - |
| CITY | Text | 35 | Yes | New York | - |
| POSTAL_CODE | Text | 10 | No | 10001 | - |
| COUNTRY | Text | 3 | Yes | US | List: US, GB, DE, FR, CN |
| REGION | Text | 3 | No | NY | State/province code |
| TELEPHONE | Text | 16 | No | +1-212-555-0100 | - |
| ACCOUNT_GROUP | Text | 4 | Yes | KUNA | List: KUNA, KUNE |

**Excel Validation Rules**:
- CUSTOMER_ID: Whole number, > 0, unique values
- COUNTRY: List validation (dropdown)
- ACCOUNT_GROUP: List validation (dropdown)
- CUSTOMER_NAME: Required field (conditional formatting)

**Sheet 2: Company Code Data (KNB1)**

| Column Name | Data Type | Max Length | Required | Example | Validation Rule |
|-------------|-----------|------------|----------|---------|-----------------|
| CUSTOMER_ID | Text | 10 | Yes | 100001 | Must exist in Sheet 1 |
| COMPANY_CODE | Text | 4 | Yes | 1000 | List: 1000, 2000, 3000 |
| RECON_ACCOUNT | Text | 10 | Yes | 140000 | List: 140000, 240000 |
| PAYMENT_TERMS | Text | 4 | No | 0001 | List: 0001, 0002, 0003 |
| CLERK_CODE | Text | 2 | No | 01 | - |

**Excel Validation Rules**:
- CUSTOMER_ID: VLOOKUP to Sheet 1 (must exist)
- COMPANY_CODE: List validation
- RECON_ACCOUNT: List validation

**Sheet 3: Sales Area Data (KNVV)**

| Column Name | Data Type | Max Length | Required | Example | Validation Rule |
|-------------|-----------|------------|----------|---------|-----------------|
| CUSTOMER_ID | Text | 10 | Yes | 100001 | Must exist in Sheet 1 |
| SALES_ORG | Text | 4 | Yes | 1000 | List: 1000, 2000 |
| DIST_CHANNEL | Text | 2 | Yes | 01 | List: 01, 02, 03 |
| DIVISION | Text | 2 | Yes | 00 | List: 00, 10, 20 |
| SALES_OFFICE | Text | 4 | No | 1010 | - |
| SHIPPING_COND | Text | 2 | No | 01 | List: 01, 02 |
| INCOTERMS | Text | 3 | No | EXW | List: EXW, FOB, CIF |
| PAYMENT_TERMS | Text | 4 | No | 0001 | List: 0001, 0002 |

**Excel Validation Rules**:
- CUSTOMER_ID: VLOOKUP to Sheet 1
- SALES_ORG, DIST_CHANNEL, DIVISION: List validation

**Sheet 4: Reference Data**

Lists of valid values for dropdown validations:

**Account Groups:**
- KUNA - Domestic Customer
- KUNE - One-time Customer
- KUNV - Vendor Customer

**Company Codes:**
- 1000 - US Company
- 2000 - UK Company
- 3000 - Germany Company

**Payment Terms:**
- 0001 - Net 30 days
- 0002 - Net 60 days
- 0003 - Immediate Payment

---

### Data Validation Rules

**Pre-Migration Data Quality Checks:**

**1. Mandatory Field Validation**

```excel
=IF(ISBLANK(B2), "ERROR: Customer Name is required", "OK")
```

Apply to all required fields.

**2. Unique Customer ID**

```excel
=IF(COUNTIF($A$2:$A$1000, A2) > 1, "ERROR: Duplicate Customer ID", "OK")
```

**3. Valid Country Code**

```excel
=IF(COUNTIF(RefData!$A$2:$A$50, H2) = 0, "ERROR: Invalid Country Code", "OK")
```

**4. Referential Integrity (Company/Sales sheets reference Header)**

```excel
=IF(COUNTIF(GeneralData!$A$2:$A$1000, A2) = 0, "ERROR: Customer ID not found in General Data", "OK")
```

**5. Field Length Validation**

```excel
=IF(LEN(B2) > 35, "ERROR: Customer Name exceeds 35 characters", "OK")
```

**6. Data Type Validation**

```excel
=IF(ISNUMBER(A2), "OK", "ERROR: Customer ID must be numeric")
```

**Validation Summary Sheet:**

Create a summary sheet that counts errors across all sheets:

```excel
Total Records: 100
Errors Found: 5
  - Missing Customer Name: 2
  - Duplicate Customer ID: 1
  - Invalid Country Code: 2

Status: NOT READY FOR MIGRATION (Fix errors first)
```

---

### Sample Data Format

**Example: General Data (Tab-delimited text file)**

```
CUSTOMER_ID	CUSTOMER_NAME	CUSTOMER_NAME2	STREET	CITY	POSTAL_CODE	COUNTRY	REGION	TELEPHONE	ACCOUNT_GROUP
100001	ABC Corporation	North American HQ	123 Main Street	New York	10001	US	NY	+1-212-555-0100	KUNA
100002	XYZ Industries	Manufacturing Division	456 Oak Avenue	Chicago	60601	US	IL	+1-312-555-0200	KUNA
100003	Global Trading Ltd	European Operations	789 High Street	London	EC1A 1BB	GB	LND	+44-20-5555-0300	KUNE
100004	Tech Solutions GmbH		101 Hauptstrasse	Berlin	10115	DE	BE	+49-30-5555-0400	KUNA
100005	Asia Pacific Corp	Regional Office	202 Orchard Road	Singapore	238801	SG	SG	+65-6555-0500	KUNA
```

**Example: Company Code Data**

```
CUSTOMER_ID	COMPANY_CODE	RECON_ACCOUNT	PAYMENT_TERMS	CLERK_CODE
100001	1000	140000	0001	01
100002	1000	140000	0002	01
100003	2000	240000	0001	02
100004	3000	340000	0003	03
100005	1000	140000	0001	01
100005	4000	440000	0001	04
```

Note: Customer 100005 has two company code assignments (1000 and 4000).

**Example: Sales Area Data**

```
CUSTOMER_ID	SALES_ORG	DIST_CHANNEL	DIVISION	SALES_OFFICE	SHIPPING_COND	INCOTERMS	PAYMENT_TERMS
100001	1000	01	00	1010	01	EXW	0001
100002	1000	01	00	1020	02	FOB	0002
100003	2000	01	00	2010	01	CIF	0001
100004	3000	01	00	3010	03	EXW	0003
100005	1000	01	00	1010	01	FOB	0001
100005	1000	02	00	1010	01	FOB	0001
```

Note: Customer 100005 has two sales area assignments (different distribution channels).

---

## 6. Testing Process

### Test Data Upload

**Testing Strategy**: Phased approach with increasing data volumes.

**Phase 1: Single Record Test (1 record)**

**Objective**: Validate entire LSMW process end-to-end with minimal risk.

**Steps:**
1. Prepare source file with 1 customer record
2. Execute LSMW Steps 1-14 in test mode
3. Create batch input session with 1 transaction
4. Process in **Process/Foreground** mode (watch each screen)
5. Verify customer created successfully in XD03
6. Check all fields populated correctly

**Success Criteria:**
✅ Batch input session processes without errors
✅ Customer record created in SAP
✅ All fields match source data
✅ No data truncation or corruption

**Phase 2: Small Batch Test (5-10 records)**

**Objective**: Test data variation and error handling.

**Steps:**
1. Prepare source file with 5-10 diverse customer records:
   - Different countries
   - Different account groups
   - Optional fields populated and blank
   - Edge cases (long names, special characters)
2. Execute LSMW Steps 9-14 (reuse object from Phase 1)
3. Create batch input session
4. Process in **Display Errors Only** mode
5. Review all created customers

**Success Criteria:**
✅ All 5-10 records processed
✅ Data variations handled correctly
✅ Optional fields handled (blank fields don't cause errors)
✅ Edge cases processed successfully

**Phase 3: Medium Batch Test (50-100 records)**

**Objective**: Test performance and batch processing.

**Steps:**
1. Prepare source file with 50-100 records
2. Execute LSMW Steps 9-14
3. Create batch input session
4. Process in **Background** mode (SM35 background processing)
5. Review session log for errors/warnings

**Success Criteria:**
✅ Batch completes in acceptable time (< 1 hour)
✅ Error rate < 5% (acceptable for data quality issues)
✅ Background processing works correctly

**Phase 4: Full Volume Test (Production Volume)**

**Objective**: Final validation before production migration.

**Steps:**
1. Use full production data file
2. Execute complete LSMW process
3. Process in background mode
4. Perform full data reconciliation (compare SAP vs source)

**Success Criteria:**
✅ All records processed (or errors documented)
✅ Performance acceptable
✅ Data reconciliation 100% match

---

### Error Handling

**Error Categories and Resolution Steps:**

**Category 1: Configuration Errors**

| Error | Root Cause | Resolution |
|-------|------------|------------|
| "Account group KUNA not defined" | Missing master data | Create account group in OBAR |
| "Company code 1000 not found" | Missing configuration | Create company code in OX02 |
| "Sales org not assigned to company code" | Org structure incomplete | Assign in OVXB |

**Resolution**: Fix SAP configuration, re-run batch input session.

**Category 2: Data Quality Errors**

| Error | Root Cause | Resolution |
|-------|------------|------------|
| "Customer number already exists" | Duplicate in source data | Remove duplicate, re-run |
| "Field NAME1 is required" | Missing data in source | Complete source data, re-load |
| "Country code invalid" | Incorrect value in source | Fix country code, re-load |

**Resolution**: Correct source data, re-run LSMW from Step 9 (Read Data).

**Category 3: Authorization Errors**

| Error | Root Cause | Resolution |
|-------|------------|------------|
| "No authorization for transaction XD01" | User lacks authorization | Request authorization from Basis team |
| "No authorization to create batch input" | Missing SM35 authorization | Request authorization |

**Resolution**: Request authorization changes, re-run session after approval.

**Category 4: Technical Errors**

| Error | Root Cause | Resolution |
|-------|------------|------------|
| "File not found" | Incorrect file path | Verify file path in Step 7 |
| "Field length exceeded" | Source field too long | Check field length in Step 3 |
| "Conversion error in routine" | Bug in ABAP code | Debug routine, fix code in Step 6 |

**Resolution**: Fix technical issue, re-run from appropriate LSMW step.

**Error Recovery Workflow:**

```
Error Detected in SM35
    ↓
Identify Error Category
    ↓
┌───────────────┬──────────────────┬──────────────────┬─────────────────┐
│ Configuration │ Data Quality     │ Authorization    │ Technical       │
└───────┬───────┴────────┬─────────┴────────┬─────────┴────────┬────────┘
        │                │                  │                  │
   Fix Config       Fix Source Data    Request Auth      Fix Tech Issue
        │                │                  │                  │
        └────────────────┴──────────────────┴──────────────────┘
                                    ↓
                      Re-run Batch Input Session
                       (Process Errors Only)
                                    ↓
                            Verify Success
```

---

### Data Verification Checklist

**Post-Migration Verification Steps:**

**1. Record Count Reconciliation**

```sql
-- Source file record count (Excel)
Source Records: 1,000

-- SAP record count
SELECT COUNT(*) FROM KNA1 WHERE ERDAT = '20251026';
Result: 950

Discrepancy: 50 records
Action: Investigate error log in SM35
```

**2. Sample Data Verification**

Randomly select 10 customers and verify all fields match:

| Check | Transaction/Table | Validation |
|-------|-------------------|------------|
| General Data | XD03 - General tab | Name, address, country match source |
| Company Code Data | XD03 - Company tab | Recon account, payment terms match |
| Sales Area Data | XD03 - Sales tab | Sales org, shipping conditions match |

**3. Required Field Verification**

Ensure all required fields are populated (no nulls):

```sql
SELECT KUNNR FROM KNA1 WHERE NAME1 IS NULL OR NAME1 = '';
Result: 0 records (expected)

SELECT KUNNR FROM KNB1 WHERE AKONT IS NULL OR AKONT = '';
Result: 0 records (expected)
```

**4. Data Transformation Verification**

Verify transformations applied correctly:

| Transformation | Source Value | Expected SAP Value | Actual SAP Value | Status |
|----------------|--------------|-------------------|------------------|--------|
| Customer Number | 100001 | 0000100001 | 0000100001 | ✅ |
| Country Code | USA | US | US | ✅ |
| Account Group | - | KUNA | KUNA | ✅ |

**5. Relationship Verification**

Verify hierarchical data loaded correctly:

```sql
-- Customer with multiple company codes
SELECT KUNNR, BUKRS FROM KNB1 WHERE KUNNR = '0000100005';
Expected: 2 records (company codes 1000, 4000)
Actual: 2 records ✅

-- Customer with multiple sales areas
SELECT KUNNR, VKORG, VTWEG FROM KNVV WHERE KUNNR = '0000100005';
Expected: 2 records (dist channels 01, 02)
Actual: 2 records ✅
```

**6. Optional Field Verification**

Verify optional fields handled correctly (blank or populated):

```sql
SELECT KUNNR, TELF1, TELFX FROM KNA1 WHERE KUNNR = '0000100001';
Expected: TELF1 populated, TELFX blank (if not in source)
```

**7. End-to-End Transaction Test**

Create a sales order using migrated customer:

- Transaction: **VA01** (Create Sales Order)
- Enter customer: 0000100001
- System should populate:
  - Ship-to address (from KNA1)
  - Payment terms (from KNB1)
  - Delivery plant (from KNVV)
- Create order successfully
- ✅ Confirms customer master fully functional

**Verification Summary Template:**

```
Migration Date: 2025-10-26
Migrated By: [Your Name]
Source Records: 1,000
Successful: 950
Errors: 50 (see error log)

Verification Results:
✅ Record count reconciled (95% success rate)
✅ Sample verification passed (10/10 customers correct)
✅ Required fields populated (100%)
✅ Data transformations correct (100%)
✅ Relationships loaded correctly (100%)
✅ End-to-end transaction test passed

Status: MIGRATION SUCCESSFUL
Remaining Actions: Investigate and re-load 50 failed records
```

---

## 7. Production Migration

### Best Practices

**1. Pre-Migration Preparation**

**One Week Before:**
- ✅ Complete all testing phases (Phases 1-4)
- ✅ Obtain final production data file from source system
- ✅ Perform data quality validation (all validation rules pass)
- ✅ Schedule migration window (off-hours recommended)
- ✅ Communicate to business users (downtime if applicable)

**Two Days Before:**
- ✅ Final review of LSMW object (all settings correct)
- ✅ Verify SAP system configuration (account groups, org structure)
- ✅ Confirm authorization (user can run XD01, SM35)
- ✅ Backup plan prepared (rollback procedure documented)

**Day Of Migration:**
- ✅ Re-run data validation (source data unchanged?)
- ✅ Verify SAP system status (productive, no maintenance)
- ✅ Take screenshot of initial data counts (for reconciliation)

**2. Migration Execution**

**Step-by-Step Execution:**

1. **Load Source Data** (LSMW Steps 9-10):
   - Execute Read Data
   - Display Read Data
   - Verify record counts

2. **Convert Data** (LSMW Steps 11-12):
   - Execute Convert Data
   - Display Converted Data
   - Review conversion log (any warnings?)

3. **Create Batch Input Session** (LSMW Step 13):
   - Session name: `CUST_PROD_20251026` (use date)
   - Processing mode: **Display Errors Only**
   - Keep session: **Checked** (for review)

4. **Process Batch Input** (SM35 Step 14):
   - Monitor progress continuously
   - Document any error screens immediately
   - Do not cancel session mid-processing (data integrity risk)

5. **Post-Processing Review**:
   - Review session log in SM35
   - Document error count and error types
   - Perform data verification checklist (Section 6.3)

**3. Change Management**

- ✅ Document all configuration changes made (account groups, org assignments)
- ✅ Update system documentation with customer master structure
- ✅ Provide training to users on new customer data (if applicable)
- ✅ Schedule post-migration support window (first week)

**4. Communication**

**To Business Users:**
```
Subject: Customer Master Migration - Completed

Dear Team,

The customer master migration has been completed successfully.

Migration Date: October 26, 2025
Records Migrated: 950 / 1,000 (95% success rate)
Status: Production Ready

Action Required:
- Verify your customers are accessible in XD03
- Report any missing or incorrect data to IT Support

Support Contact: it-support@company.com
```

**To IT Team:**
```
Subject: LSMW Customer Master Migration - Technical Summary

LSMW Object: CUST_MASTER / INITIAL_LOAD / XD01_CUSTOMER
Batch Input Session: CUST_PROD_20251026
Processing Date: 2025-10-26
Status: Completed with Errors

Results:
- Total Records: 1,000
- Successful: 950
- Errors: 50 (see attached error log)

Next Steps:
- Investigate 50 failed records
- Re-load failed records (estimated: 1 day)
- Monitor system performance for first week
```

---

### Rollback Procedures

**Rollback Scenarios and Procedures:**

**Scenario 1: Critical Errors During Processing (< 10% processed)**

**Decision**: Rollback (cancel migration)

**Steps:**
1. Stop batch input session:
   - In SM35, select session
   - Click **Cancel** button
   - Confirm cancellation
2. Delete partially created customers:
   - Use transaction **XD06** (Delete Customer)
   - Or mass delete via custom program (if available)
3. Document issue:
   - Error type
   - Root cause
   - Resolution plan
4. Fix issue and reschedule migration

**Scenario 2: Moderate Errors During Processing (10-50% processed)**

**Decision**: Continue processing, fix errors post-migration

**Steps:**
1. Allow batch input session to complete
2. Document all error transactions (SM35 log)
3. Categorize errors (data quality vs configuration)
4. Fix root cause:
   - Data quality: Correct source data
   - Configuration: Fix SAP setup
5. Re-run LSMW for failed records only:
   - Create new source file with only failed records
   - Execute LSMW Steps 9-14
   - Process new batch input session

**Scenario 3: Post-Migration Data Quality Issues Discovered**

**Decision**: Correct in place (do not delete and re-load)

**Steps:**
1. Identify affected customers (list of customer numbers)
2. Use transaction **XD02** (Change Customer) to correct data:
   - Manual correction for small number of customers (< 10)
   - LSMW change object for large number of customers (> 10)
3. Document changes made
4. Verify corrections (XD03)

**Scenario 4: Complete Rollback Required (Critical Defect Found)**

**Decision**: Delete all migrated customers and start over

**⚠️ WARNING**: Only perform complete rollback if:
- No business transactions created using migrated customers (no sales orders, invoices)
- Migration occurred within last 24 hours
- Issue is unfixable without re-migration

**Steps:**
1. **Check for dependencies**:
   ```sql
   -- Check for sales orders
   SELECT COUNT(*) FROM VBAK WHERE KUNNR IN (SELECT KUNNR FROM KNA1 WHERE ERDAT = '20251026');
   Result: 0 (safe to delete)

   -- Check for invoices
   SELECT COUNT(*) FROM VBRK WHERE KUNNR IN (SELECT KUNNR FROM KNA1 WHERE ERDAT = '20251026');
   Result: 0 (safe to delete)
   ```

2. **Mass Delete Customers** (use with extreme caution):
   - Transaction: **XD06** (Delete Customer)
   - Or use custom mass delete program
   - Delete only customers created on migration date

3. **Verify Deletion**:
   ```sql
   SELECT COUNT(*) FROM KNA1 WHERE ERDAT = '20251026';
   Result: 0 (all deleted)
   ```

4. **Fix Root Cause**:
   - Correct LSMW object
   - Correct source data
   - Test again (Phases 1-4)

5. **Reschedule Migration**:
   - New migration date
   - Communicate to stakeholders

**Rollback Decision Matrix:**

| Situation | Error Rate | Dependencies Exist? | Decision | Procedure |
|-----------|-----------|---------------------|----------|-----------|
| Processing started, critical errors | < 10% | N/A | Cancel session | Scenario 1 |
| Processing in progress, moderate errors | 10-50% | N/A | Continue, fix later | Scenario 2 |
| Post-migration data quality issues | N/A | Yes | Correct in place | Scenario 3 |
| Critical defect, full rollback needed | N/A | No | Complete rollback | Scenario 4 |
| Critical defect, full rollback needed | N/A | Yes | ❌ Cannot rollback | Manual correction only |

---

### Post-Migration Validation

**Day 1 After Migration:**

**1. System Performance Check**
- Monitor SAP system performance (transaction ST03)
- Check for any performance degradation
- Review database table sizes (KNA1, KNB1, KNVV)

**2. User Acceptance Testing**
- Select 10 business users to test customer access
- Have them perform typical transactions:
  - Display customer (XD03)
  - Create sales order (VA01)
  - Display account balance (FD10N)
- Collect feedback on any issues

**3. Error Resolution**
- Review all errors from SM35 session log
- Categorize and prioritize errors
- Create action plan for re-loading failed records:
  - High priority: VIP customers (re-load within 24 hours)
  - Medium priority: Active customers (re-load within 1 week)
  - Low priority: Inactive customers (re-load within 1 month)

**Week 1 After Migration:**

**1. Data Reconciliation Report**

```
Customer Master Migration - Reconciliation Report
Migration Date: 2025-10-26
Report Date: 2025-11-02 (1 week after)

Source System Records: 1,000
SAP Records Created: 950
Pending Re-load: 50
Success Rate: 95%

Breakdown by Error Type:
- Configuration Errors: 20 (company code missing)
- Data Quality Errors: 25 (missing required fields)
- Authorization Errors: 5 (authorization missing)

Resolution Status:
- Resolved: 30 (re-loaded successfully)
- In Progress: 15 (awaiting data correction)
- Pending: 5 (awaiting authorization)

Customer Impact:
- VIP Customers Affected: 0 (all successful)
- Active Customers Affected: 10 (8 resolved, 2 in progress)
- Inactive Customers Affected: 40 (22 resolved, 18 in progress)

Overall Status: ON TRACK
Next Review: 2025-11-09
```

**2. End-User Support Metrics**
- Number of support tickets: 5
- Issue categories:
  - Missing customer data: 2 (resolved)
  - Incorrect address: 2 (resolved)
  - Cannot find customer: 1 (user training issue)
- Resolution time: Average 2 hours

**3. Performance Monitoring**
- XD03 transaction response time: Normal
- VA01 customer lookup time: Normal
- Database table growth: As expected (3% increase)

**Month 1 After Migration:**

**1. Final Reconciliation**
- All failed records re-loaded: ✅
- Final success rate: 99.8% (2 records permanently failed)
- Failed records documented with business justification

**2. Lessons Learned**
- Document what went well
- Document what could be improved
- Update LSMW documentation for next migration
- Share knowledge with team

**3. Archive Migration Artifacts**
- LSMW object exported and saved
- Source data files archived
- SM35 session logs saved
- Error logs and resolution notes saved
- Location: `\\fileserver\SAP_Migrations\Customer_Master_2025-10-26\`

**4. Close Migration Project**
- Final status report to stakeholders
- Sign-off from business users
- Knowledge transfer to support team
- Archive project documentation

---

## 8. Troubleshooting

**Common Issues and Solutions:**

### Issue 1: "File not found" error in Step 9 (Read Data)

**Error Message:**
```
Error reading file: C:\Data\Customer_Master.txt
File not found or access denied
```

**Root Cause:**
- Incorrect file path specified in Step 7
- File not accessible due to network/permissions issue
- File name misspelled

**Solution:**
1. Verify file exists at specified path
2. Check file permissions (read access for SAP user)
3. Try using UNC path instead of mapped drive: `\\server\share\file.txt`
4. Copy file to SAP application server if network access is issue

**Prevention:**
- Test file access before starting LSMW
- Use absolute paths, not relative paths

---

### Issue 2: "Field KUNNR already exists" error in Step 14

**Error Message:**
```
Customer 0000100001 already exists
Cannot create duplicate customer number
```

**Root Cause:**
- Customer number already exists in SAP (previous migration or manual entry)
- Duplicate records in source file
- LSMW session run multiple times with same data

**Solution:**

**Option 1: Skip Existing Customers**
- In LSMW Step 5 (Field Mapping), add logic to check if customer exists
- Use BAPI method instead of batch input (BAPI_CUSTOMER_CREATEFROMDATA with update mode)

**Option 2: Use XD02 Instead of XD01**
- Create new LSMW object using XD02 (Change Customer) recording
- This updates existing customers instead of creating new ones

**Option 3: Delete Existing Customers First**
- Use XD06 to delete existing customers (if safe to do so)
- Re-run LSMW migration

**Prevention:**
- Check for existing customers before migration (SQL query on KNA1)
- Ensure source file has no duplicates (Excel COUNTIF formula)

---

### Issue 3: "Account group KUNA not defined" error

**Error Message:**
```
Account group KUNA is not defined in system
Entry 1 000 KUNA missing in table T077D
```

**Root Cause:**
- Customer account group not configured in SAP
- Account group name misspelled in source data

**Solution:**
1. **Create Account Group**:
   - Transaction: **OBAR** (Define Account Groups)
   - Click **New Entries**
   - Enter account group: `KUNA`
   - Enter description: "Domestic Customer"
   - Assign number range: 0000100001 - 0000199999
   - Click **Save**

2. **Verify Configuration**:
   - Transaction: **XD01**
   - Try creating customer manually with account group KUNA
   - Should work without error

3. **Re-run LSMW**:
   - Re-process batch input session from SM35
   - Or re-run LSMW Steps 13-14

**Prevention:**
- Verify all master data configured before migration (account groups, company codes, sales orgs)
- Create configuration checklist and validate before LSMW execution

---

### Issue 4: Translation table not working in Step 11 (Convert Data)

**Error Message:**
```
Translation not found for value "United States"
Source value: United States
Target field: LAND1
```

**Root Cause:**
- Translation table entry missing for "United States" → "US"
- Translation table not assigned to field mapping
- Source value has leading/trailing spaces

**Solution:**

**1. Add Missing Translation Entry**:
- LSMW → Step 6 → Maintain Translations
- Select translation table for LAND1 field
- Add entry: `United States` → `US`
- Click **Save**

**2. Clean Source Data**:
- Trim leading/trailing spaces in Excel: `=TRIM(A2)`
- Ensure exact case match (translation is case-sensitive)

**3. Re-run Conversion**:
- LSMW → Step 11 → Convert Data
- Execute again
- Verify translation works in Step 12 (Display Converted Data)

**Prevention:**
- Create comprehensive translation tables before LSMW
- Test with sample data covering all variations

---

### Issue 5: Batch input session hangs during processing

**Symptom:**
- SM35 session processing stops responding
- Transaction counter stuck at same number
- Screen frozen

**Root Cause:**
- SAP system performance issue (memory, CPU)
- Database lock on customer table
- Background job scheduler overloaded

**Solution:**

**Immediate:**
1. **Check System Status**:
   - Transaction: **SM51** (SAP Servers)
   - Check if application server is responding
   - Transaction: **SM50** (Process Overview)
   - Look for long-running processes

2. **Cancel Session** (if necessary):
   - SM35 → Select session → Cancel
   - This may leave partial data (see rollback procedures)

3. **Restart Session**:
   - Wait 5-10 minutes for system to recover
   - Re-process session in SM35
   - Select "Process Incorrectly Processed Transactions Only"

**Long-term:**
- Schedule migrations during off-peak hours
- Split large batches into smaller sessions (e.g., 100 records per session)
- Use background processing mode to avoid screen refresh overhead

**Prevention:**
- Monitor system resources before migration (transaction ST06)
- Coordinate with Basis team for large migrations

---

### Issue 6: Character encoding issues (special characters corrupted)

**Symptom:**
- Customer names with special characters appear corrupted: `Müller` becomes `M�ller`
- Accented characters display incorrectly

**Root Cause:**
- Source file encoding doesn't match LSMW file specification
- Excel saved file in wrong encoding (ANSI instead of UTF-8)

**Solution:**

**1. Re-save Source File with Correct Encoding**:
- Open file in Notepad++ or Excel
- Save As → Encoding: UTF-8 (with BOM)
- Close and re-open to verify characters display correctly

**2. Update LSMW File Specification** (Step 7):
- Specify Files → Code Page: 4110 (UTF-8)
- Save changes

**3. Re-run LSMW Steps 9-14**:
- Read Data
- Verify special characters in Display Read Data
- Convert and process

**Prevention:**
- Standardize on UTF-8 encoding for all source files
- Specify encoding requirement in data file template instructions
- Test with sample data containing special characters (ü, ö, ä, é, ñ)

---

### Issue 7: "No authorization for transaction XD01" error

**Error Message:**
```
You do not have authorization to use transaction XD01
Missing authorization object: F_KNA1_BUK
```

**Root Cause:**
- SAP user lacks authorization to create customers
- Authorization profile not assigned to user

**Solution:**

**1. Request Authorization** (via Basis Team):
- Authorization object: `F_KNA1_BUK` (Customer Master Authorization)
- Activity: `01` (Create)
- Company Code: `*` (All) or specific company codes

**2. Alternative: Use Different User**:
- Identify user with XD01 authorization (e.g., SD consultant)
- Update LSMW batch input session user field (Step 13)
- Process session with authorized user

**3. Verify Authorization**:
- Transaction: **SU53** (Display Authorization Check)
- Shows which authorization object failed
- Transaction: **SU01** → Display User → Authorizations tab
- Verify F_KNA1_BUK is assigned

**Prevention:**
- Request all required authorizations before starting migration
- Create authorization checklist:
  - ✅ Transaction LSMW
  - ✅ Transaction XD01
  - ✅ Transaction SM35
  - ✅ Authorization object F_KNA1_BUK

---

## 9. Quick Reference

**LSMW 14 Steps - One-Page Summary**

| Step | Transaction | Action | Duration |
|------|-------------|--------|----------|
| 1 | LSMW | Maintain Object Attributes | 5 min |
| 2 | LSMW | Maintain Source Structures | 10 min |
| 3 | LSMW | Maintain Source Fields | 20 min |
| 4 | LSMW | Maintain Structure Relations | 5 min |
| 5 | LSMW | Maintain Field Mapping and Conversion Rules | 60 min |
| 6 | LSMW | Maintain Fixed Values, Translations, User-Defined Routines | 30 min |
| 7 | LSMW | Specify Files | 5 min |
| 8 | LSMW | Assign Files | 2 min |
| 9 | LSMW | Read Data | 2 min |
| 10 | LSMW | Display Read Data | 5 min |
| 11 | LSMW | Convert Data | 5 min |
| 12 | LSMW | Display Converted Data | 5 min |
| 13 | LSMW | Create Batch Input Session | 2 min |
| 14 | SM35 | Run Batch Input Session | 10-60 min |

**Total Estimated Time**: 2-3 hours (setup) + processing time

---

**Key SAP Transactions:**

| Transaction | Description | When to Use |
|-------------|-------------|-------------|
| LSMW | Legacy System Migration Workbench | All 13 LSMW steps |
| XD01 | Create Customer | Recording for LSMW |
| XD02 | Change Customer | Manual corrections |
| XD03 | Display Customer | Verification |
| XD06 | Delete Customer | Rollback |
| SM35 | Batch Input Session Management | Step 14, monitoring |
| SHDB | Batch Input Recording | Create XD01 recording |
| SE16 | Data Browser | Verify KNA1/KNB1/KNVV tables |

---

**Customer Master Tables Quick Reference:**

| Table | Description | Key Fields |
|-------|-------------|------------|
| KNA1 | General Data | KUNNR, NAME1, STRAS, ORT01, LAND1 |
| KNB1 | Company Code Data | KUNNR, BUKRS, AKONT, ZTERM |
| KNVV | Sales Area Data | KUNNR, VKORG, VTWEG, SPART |

---

**Error Quick Fix Guide:**

| Error | Quick Fix |
|-------|-----------|
| File not found | Verify path in Step 7, check permissions |
| Customer already exists | Use XD02 instead of XD01, or delete existing |
| Account group not defined | Create in OBAR transaction |
| Translation not found | Add entry in Step 6 translation table |
| No authorization | Request F_KNA1_BUK authorization |
| Character encoding issue | Save source file as UTF-8 |

---

**Migration Checklist:**

**Pre-Migration:**
- [ ] SAP configuration verified (account groups, org structure)
- [ ] Source data validated (all validation rules pass)
- [ ] LSMW object tested (Phases 1-4 complete)
- [ ] Authorization confirmed (user can run XD01, SM35)
- [ ] Backup plan documented (rollback procedures)
- [ ] Business users notified (migration window scheduled)

**During Migration:**
- [ ] Source data loaded (Step 9)
- [ ] Data conversion successful (Steps 11-12)
- [ ] Batch input session created (Step 13)
- [ ] Session processed (Step 14)
- [ ] Error log reviewed (SM35)

**Post-Migration:**
- [ ] Record count reconciled (source vs SAP)
- [ ] Sample data verified (10 customers checked)
- [ ] End-to-end transaction tested (VA01 sales order)
- [ ] Error resolution plan created (for failed records)
- [ ] Business users notified (migration complete)
- [ ] Artifacts archived (LSMW object, source files, logs)

---

## Appendix A: Field Mapping Reference

See separate document: **Customer-Master-Field-Mapping.md**

---

## Appendix B: Screenshot Reference

**Required Screenshots (30 total):**

1. `01-KNA1-General-Data-XD01.png` - XD01 General Data tab
2. `02-KNB1-Company-Code-Data-XD01.png` - XD01 Company Code Data tab
3. `03-KNVV-Sales-Area-Data-XD01.png` - XD01 Sales Area Data tab
4. `04-LSMW-Step1-Object-Attributes.png` - LSMW Step 1
5. `05-LSMW-Step2-Source-Structures.png` - LSMW Step 2
6. `06-LSMW-Step3-Source-Fields-Header.png` - LSMW Step 3 (CUST_HEADER)
7. `07-LSMW-Step3-Source-Fields-Complete.png` - LSMW Step 3 (all structures)
8. `08-LSMW-Step4-Structure-Relations.png` - LSMW Step 4
9. `09-LSMW-Step5-Field-Mapping-Overview.png` - LSMW Step 5 overview
10. `10-LSMW-Step5-Field-Mapping-Details.png` - LSMW Step 5 details
11. `11-LSMW-Step6-Fixed-Values.png` - LSMW Step 6 fixed values
12. `12-LSMW-Step6-Translation-Table.png` - LSMW Step 6 translation
13. `13-LSMW-Step6-User-Routine.png` - LSMW Step 6 routine
14. `14-LSMW-Step7-Specify-Files.png` - LSMW Step 7
15. `15-LSMW-Step8-Assign-Files.png` - LSMW Step 8
16. `16-LSMW-Step9-Read-Data.png` - LSMW Step 9
17. `17-LSMW-Step10-Display-Read-Data.png` - LSMW Step 10
18. `18-LSMW-Step11-Convert-Data.png` - LSMW Step 11
19. `19-LSMW-Step12-Display-Converted-Data.png` - LSMW Step 12
20. `20-LSMW-Step13-Create-BI-Session.png` - LSMW Step 13
21. `21-SM35-Session-Overview.png` - SM35 session list
22. `22-SM35-Processing-Session.png` - SM35 processing
23. `23-SM35-Error-Screen.png` - SM35 error example
24. `24-XD03-Customer-Display.png` - XD03 verification
25. `25-SHDB-Recording-Overview.png` - SHDB transaction
26. `26-SHDB-Recording-Steps.png` - Recording steps
27. `27-SHDB-Recording-Playback.png` - Recording playback
28-30. Reserved for additional screenshots

**Screenshot Acquisition:**
- Use image-fetcher skill to download screenshots from URL (if provided)
- Or document placeholder requirements for manual screenshot capture

---

## Appendix C: Troubleshooting Guide

See separate document: **LSMW-Troubleshooting-Guide.md**

---

## Document Control

**Version History:**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-10-26 | SAP Techno-Functional Consultant | Initial release |

**Document Review:**

| Reviewer | Role | Date | Status |
|----------|------|------|--------|
| [Name] | SAP SD Lead | [Date] | Pending |
| [Name] | Data Migration Manager | [Date] | Pending |

**Document Location:**
- `Project-tasks/sap-lsmw-customer-master-migration-guide/deliverables/SAP-LSMW-Customer-Master-Migration-Guide.md`

**Related Documents:**
- Customer-Master-Field-Mapping.md
- LSMW-Quick-Reference.md
- LSMW-Troubleshooting-Guide.md
- Customer-Master-Data-Template.xlsx

---

**END OF DOCUMENT**
