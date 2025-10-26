# LSMW Quick Reference Card
## Customer Master Data Migration (XD01)

**Version**: 1.0 | **Date**: October 2025

---

## 14-Step Process Overview

| Step | Action | Time | Key Fields/Settings |
|------|--------|------|-------------------|
| **1** | Maintain Object Attributes | 5 min | Project, Subproject, Object, Recording |
| **2** | Maintain Source Structures | 10 min | CUST_HEADER, CUST_COMPANY, CUST_SALES |
| **3** | Maintain Source Fields | 20 min | Define all source file columns |
| **4** | Maintain Structure Relations | 5 min | Header → Company (1:N), Header → Sales (1:N) |
| **5** | Field Mapping & Conversion | 60 min | Source → SAP field mappings |
| **6** | Fixed Values/Translations | 30 min | KTOKD, AKONT, country codes |
| **7** | Specify Files | 5 min | File path, encoding (UTF-8) |
| **8** | Assign Files | 2 min | Link files to structures |
| **9** | Read Data | 2 min | Load from source file |
| **10** | Display Read Data | 5 min | Verify data loaded correctly |
| **11** | Convert Data | 5 min | Apply mappings/conversions |
| **12** | Display Converted Data | 5 min | Verify SAP format data |
| **13** | Create Batch Input Session | 2 min | Session name, processing mode |
| **14** | Run Batch Input (SM35) | 10-60 min | Execute XD01 transactions |

**Total Time**: 2-3 hours setup + processing time

---

## Key Transactions

| Code | Description | Usage |
|------|-------------|-------|
| **LSMW** | Legacy System Migration Workbench | Steps 1-13 |
| **SM35** | Batch Input Session Management | Step 14 processing |
| **XD01** | Create Customer | Recording transaction |
| **XD03** | Display Customer | Verification |
| **SHDB** | Batch Input Recording | Create XD01 recording |
| **SE16** | Data Browser | Check KNA1/KNB1/KNVV |

---

## Customer Master Tables

| Table | Data Level | Key Fields |
|-------|-----------|------------|
| **KNA1** | General (header) | KUNNR, NAME1, STRAS, ORT01, LAND1, KTOKD |
| **KNB1** | Company Code | KUNNR, BUKRS, AKONT, ZTERM, BUSAB |
| **KNVV** | Sales Area | KUNNR, VKORG, VTWEG, SPART, VSBED |

---

## Source File Structure

**Option 1: Flat File (Single Sales Area)**
```
CUSTOMER_ID | NAME | STREET | CITY | COMPANY_CODE | SALES_ORG
100001 | ABC Corp | 123 Main | NYC | 1000 | 1000
```

**Option 2: Hierarchical (Multiple Sales Areas)**
- **Header File**: CUSTOMER_ID, NAME, STREET, CITY
- **Company File**: CUSTOMER_ID, COMPANY_CODE, RECON_ACCOUNT
- **Sales File**: CUSTOMER_ID, SALES_ORG, DIST_CHANNEL, DIVISION

---

## Common Field Mappings

| Source Field | SAP Field | Table | Mapping Type |
|--------------|-----------|-------|--------------|
| CUSTOMER_NAME | NAME1 | KNA1 | Direct |
| STREET | STRAS | KNA1 | Direct |
| CITY | ORT01 | KNA1 | Direct |
| COUNTRY | LAND1 | KNA1 | Translation ("USA" → "US") |
| - | KTOKD | KNA1 | Fixed Value ("KUNA") |
| COMPANY_CODE | BUKRS | KNB1 | Direct |
| - | AKONT | KNB1 | Fixed Value (140000) |
| PAYMENT_TERMS | ZTERM | KNB1 | Translation |
| SALES_ORG | VKORG | KNVV | Direct |
| DIST_CHANNEL | VTWEG | KNVV | Direct |

---

## Batch Input Session Processing

**Processing Modes:**

| Mode | When to Use | Speed | Visibility |
|------|-------------|-------|------------|
| **Process/Foreground** | Testing (5-10 records) | Slow | See all screens |
| **Display Errors Only** | **Production** (recommended) | Fast | See errors only |
| **Process/Background** | Large volumes (1000+) | Fastest | No display |

**Recommendation**: Use **Display Errors Only** for production.

---

## Quick Troubleshooting

| Error | Quick Fix |
|-------|-----------|
| **File not found** | Verify path (Step 7), check permissions |
| **Customer already exists** | Use XD02 recording or delete via XD06 |
| **Account group not defined** | Create in OBAR (e.g., KUNA) |
| **Translation not found** | Add entry in Step 6 translation table |
| **No authorization** | Request F_KNA1_BUK authorization |
| **Character encoding error** | Save source file as UTF-8 |
| **Session hangs** | Cancel in SM35, process during off-peak hours |

---

## Pre-Migration Checklist

**SAP Configuration:**
- [ ] Account groups created (OBAR)
- [ ] Company codes configured (OX02)
- [ ] Sales organizations assigned to company codes (OVXB)
- [ ] Reconciliation accounts created (FS00)
- [ ] Number ranges defined

**Source Data:**
- [ ] All validation rules passed (no errors in Excel)
- [ ] Unique customer IDs (no duplicates)
- [ ] Required fields populated (NAME1, CITY, COUNTRY)
- [ ] Country codes standardized (US, GB, DE)
- [ ] File saved as UTF-8 encoding

**Authorization:**
- [ ] User has LSMW transaction access
- [ ] User has XD01 authorization
- [ ] User has SM35 authorization
- [ ] Authorization object F_KNA1_BUK assigned

**Testing:**
- [ ] Single record test completed (Phase 1)
- [ ] Small batch test completed (Phase 2: 5-10 records)
- [ ] Medium batch test completed (Phase 3: 50-100 records)
- [ ] Full volume test completed (Phase 4: production data)

---

## Post-Migration Validation

**Immediate Checks (Day 1):**
1. **Record Count**: Source count = SAP count (or errors documented)
   ```sql
   SELECT COUNT(*) FROM KNA1 WHERE ERDAT = '20251026';
   ```
2. **Sample Verification**: Test 10 random customers in XD03
3. **End-to-End Test**: Create sales order (VA01) with migrated customer
4. **Error Review**: Check SM35 session log for errors

**Data Quality Checks:**
- [ ] All required fields populated (no nulls)
- [ ] Data transformations applied (customer numbers padded, country codes translated)
- [ ] Relationships correct (customer → company codes → sales areas)
- [ ] Special characters display correctly (ü, ö, é)

---

## Error Recovery Workflow

```
Error Detected
    ↓
Categorize Error
    ↓
┌──────────────┬───────────────┬──────────────┬─────────────┐
│ Config       │ Data Quality  │ Authorization│ Technical   │
└──────┬───────┴───────┬───────┴──────┬───────┴──────┬──────┘
       │               │              │              │
  Fix Config     Fix Source      Request        Fix Tech
  (OBAR)         Data (Excel)    Auth (Basis)   (LSMW)
       │               │              │              │
       └───────────────┴──────────────┴──────────────┘
                           ↓
              Re-run Session (SM35)
              "Process Errors Only"
```

---

## Testing Phases

| Phase | Records | Mode | Objective |
|-------|---------|------|-----------|
| **1** | 1 | Foreground | End-to-end validation |
| **2** | 5-10 | Display Errors Only | Data variation testing |
| **3** | 50-100 | Background | Performance testing |
| **4** | Full volume | Background | Final production dry-run |

---

## Field Validation Rules

**Required Fields (KNA1):**
- ✅ KUNNR (Customer Number)
- ✅ NAME1 (Customer Name)
- ✅ ORT01 (City)
- ✅ LAND1 (Country)
- ✅ KTOKD (Account Group)

**Required Fields (KNB1):**
- ✅ KUNNR (Customer Number)
- ✅ BUKRS (Company Code)
- ✅ AKONT (Reconciliation Account)

**Required Fields (KNVV):**
- ✅ KUNNR (Customer Number)
- ✅ VKORG (Sales Organization)
- ✅ VTWEG (Distribution Channel)
- ✅ SPART (Division)

---

## Rollback Decision Matrix

| Scenario | Processing % | Dependencies | Action |
|----------|-------------|--------------|--------|
| Critical errors found | < 10% | N/A | **Cancel session** |
| Moderate errors | 10-50% | N/A | **Continue, fix later** |
| Post-migration issues | 100% | Yes (sales orders exist) | **Correct in place** (XD02) |
| Critical defect | 100% | No (no transactions) | **Complete rollback** (XD06) |

---

## Performance Guidelines

**File Size Limits:**
- Maximum records per session: **10,000** (split larger files)
- Maximum file size: **50 MB** (text file)
- Processing speed: ~**100 customers/minute** (Display Errors Only mode)

**Recommended Batch Sizes:**
- Test: 1-100 records
- Production: 500-1,000 records per session
- Large migrations: Split into multiple sessions of 1,000 records each

---

## Data File Encoding

**Required Encoding**: UTF-8 (Code Page 4110)

**How to Save in Excel:**
1. Save As → CSV (Comma delimited)
2. In Notepad++: Encoding → Convert to UTF-8
3. Save file

**Verification:**
- Open file in Notepad++
- Check bottom right: Should show "UTF-8"

---

## Customer Number Formatting

**Legacy Format**: 6 digits (123456)
**SAP Format**: 10 digits with leading zeros (0000123456)

**Conversion Routine (Step 6):**
```abap
CALL FUNCTION 'CONVERSION_EXIT_ALPHA_INPUT'
  EXPORTING input  = SOURCE_VALUE
  IMPORTING output = TARGET_VALUE.
```

---

## Common Fixed Values

| SAP Field | Fixed Value | Description |
|-----------|-------------|-------------|
| KTOKD | KUNA | Domestic customer account group |
| AKONT | 140000 | Customer receivables G/L account |
| SPRAS | E | Language: English |
| WAERS | USD | Currency: US Dollars |

---

## Country Code Translation Table

| Source Value | SAP Code (LAND1) |
|--------------|------------------|
| USA / United States | US |
| United Kingdom | GB |
| Germany | DE |
| France | FR |
| China | CN |
| Singapore | SG |
| Canada | CA |

---

## Session Naming Convention

**Format**: `CUST_[TYPE]_YYYYMMDD`

**Examples:**
- `CUST_PROD_20251026` - Production migration
- `CUST_TEST_20251026` - Test migration
- `CUST_RETRY_20251026` - Error re-processing

---

## Archive Checklist (Post-Migration)

**Items to Archive:**
- [ ] LSMW object export (.zip)
- [ ] Source data files (.txt, .csv)
- [ ] SM35 session logs (screenshots or export)
- [ ] Error logs and resolution notes (.xlsx)
- [ ] Reconciliation reports (.xlsx)
- [ ] Migration sign-off document (.pdf)

**Location**: `\\fileserver\SAP_Migrations\Customer_Master_[DATE]\`

---

## Key Success Metrics

**Target Metrics:**
- ✅ Success Rate: ≥ 95% (first run)
- ✅ Final Success Rate: ≥ 99% (after error resolution)
- ✅ Processing Time: ≤ 1 hour per 1,000 records
- ✅ Data Quality: 100% required fields populated
- ✅ User Acceptance: < 5 support tickets in first week

---

## Emergency Contacts

| Issue Type | Contact | Transaction/Action |
|------------|---------|-------------------|
| Authorization errors | Basis Team | Request F_KNA1_BUK |
| System performance | Basis Team | Check ST06, ST03 |
| Configuration issues | SD Lead | Verify OBAR, OVXB |
| Data quality questions | Data Owner | Review source system |
| LSMW technical issues | ABAP Developer | Debug user routines |

---

## Related Documents

1. **SAP-LSMW-Customer-Master-Migration-Guide.md** - Full detailed guide (20 pages)
2. **Customer-Master-Field-Mapping.md** - Complete field mapping reference
3. **LSMW-Troubleshooting-Guide.md** - Detailed troubleshooting procedures
4. **Customer-Master-Data-Template.xlsx** - Excel template with validation

---

**Quick Tips:**

💡 **Always test with 1 record first** (Phase 1) before processing large batches

💡 **Use "Display Errors Only" mode** for production to save time

💡 **Save LSMW object after each step** (Ctrl+S) to avoid losing work

💡 **Keep batch input session after processing** (for review) by checking "Keep Session" in Step 13

💡 **Process during off-peak hours** to avoid system performance issues

💡 **Always verify in XD03** after migration before notifying users

---

**END OF QUICK REFERENCE**
