# Customer Master Field Mapping Reference
## Source to SAP Field Mapping - XD01 Transaction

**Version**: 1.0
**Date**: October 2025
**Purpose**: Complete field-level mapping for LSMW customer master migration
**SAP Transaction**: XD01 (Create Customer)

---

## Table of Contents

1. [General Data (KNA1) - Field Mappings](#general-data-kna1---field-mappings)
2. [Company Code Data (KNB1) - Field Mappings](#company-code-data-knb1---field-mappings)
3. [Sales Area Data (KNVV) - Field Mappings](#sales-area-data-knvv---field-mappings)
4. [Address Data (ADRC) - Field Mappings](#address-data-adrc---field-mappings)
5. [Contact Person Data (KNVK) - Field Mappings](#contact-person-data-knvk---field-mappings)
6. [Mapping Rules and Conventions](#mapping-rules-and-conventions)
7. [Translation Tables](#translation-tables)
8. [Fixed Value Assignments](#fixed-value-assignments)
9. [Conversion Routines](#conversion-routines)

---

## General Data (KNA1) - Field Mappings

**SAP Table**: KNA1
**Data Level**: General (valid for all company codes and sales areas)
**XD01 Tab**: General Data

### Mandatory Fields

| Source Field Name | Source Type | SAP Field | SAP Field Name | Type | Length | Mapping Type | Conversion Rule | Notes |
|-------------------|-------------|-----------|----------------|------|--------|--------------|-----------------|-------|
| CUSTOMER_ID | CHAR(10) | KUNNR | Customer Number | CHAR | 10 | Conversion | ALPHA_INPUT | Pad with leading zeros |
| CUSTOMER_NAME | CHAR(35) | NAME1 | Name 1 | CHAR | 35 | Direct | - | Primary customer name |
| CITY | CHAR(35) | ORT01 | City | CHAR | 35 | Direct | - | Required field |
| COUNTRY | CHAR(20) | LAND1 | Country Key | CHAR | 3 | Translation | Country_Map | "USA" → "US" |
| ACCOUNT_GROUP | CHAR(4) | KTOKD | Account Group | CHAR | 4 | Fixed Value | KUNA | Customer account group |

### Optional General Fields

| Source Field Name | Source Type | SAP Field | SAP Field Name | Type | Length | Mapping Type | Conversion Rule | Notes |
|-------------------|-------------|-----------|----------------|------|--------|--------------|-----------------|-------|
| CUSTOMER_NAME2 | CHAR(35) | NAME2 | Name 2 | CHAR | 35 | Direct | - | Additional name line |
| CUSTOMER_NAME3 | CHAR(35) | NAME3 | Name 3 | CHAR | 35 | Direct | - | Additional name line |
| CUSTOMER_NAME4 | CHAR(35) | NAME4 | Name 4 | CHAR | 35 | Direct | - | Additional name line |
| SEARCH_TERM | CHAR(10) | SORTL | Sort Field | CHAR | 10 | Conversion | UPPERCASE | Matchcode search term |
| STREET | CHAR(35) | STRAS | Street/House Number | CHAR | 35 | Direct | - | Street address |
| STREET2 | CHAR(35) | STRS2 | Street 2 | CHAR | 35 | Direct | - | Additional street info |
| STREET3 | CHAR(35) | STRS3 | Street 3 | CHAR | 35 | Direct | - | Additional street info |
| STREET4 | CHAR(35) | STRS4 | Street 4 | CHAR | 35 | Direct | - | Additional street info |
| STREET5 | CHAR(35) | STRS5 | Street 5 | CHAR | 35 | Direct | - | Additional street info |
| POSTAL_CODE | CHAR(10) | PSTLZ | Postal Code | CHAR | 10 | Direct | - | ZIP/postal code |
| PO_BOX | CHAR(10) | PFACH | PO Box | CHAR | 10 | Direct | - | Post office box |
| PO_BOX_POSTAL | CHAR(10) | PSTL2 | PO Box Postal Code | CHAR | 10 | Direct | - | PO box ZIP code |
| REGION | CHAR(3) | REGIO | Region | CHAR | 3 | Translation | State_Map | State/province code |
| DISTRICT | CHAR(6) | COUNC | County Code | CHAR | 6 | Direct | - | County/district |
| CITY_CODE | CHAR(12) | CITYC | City Code | CHAR | 12 | Direct | - | City code for matching |
| LANGUAGE | CHAR(1) | SPRAS | Language Key | CHAR | 1 | Translation | Lang_Map | E=English, D=German |
| TELEPHONE | CHAR(16) | TELF1 | Telephone 1 | CHAR | 16 | Direct | - | Primary phone number |
| TELEPHONE2 | CHAR(16) | TELF2 | Telephone 2 | CHAR | 16 | Direct | - | Secondary phone |
| MOBILE | CHAR(30) | TELFX | Mobile Phone | CHAR | 30 | Direct | - | Mobile number |
| FAX | CHAR(31) | TELFX | Fax Number | CHAR | 31 | Direct | - | Fax number |
| EMAIL | CHAR(241) | SMTP_ADDR | Email Address | CHAR | 241 | Direct | - | Email address |
| TAX_NUMBER1 | CHAR(16) | STCD1 | Tax Number 1 | CHAR | 16 | Direct | - | Primary tax ID |
| TAX_NUMBER2 | CHAR(11) | STCD2 | Tax Number 2 | CHAR | 11 | Direct | - | Secondary tax ID |
| VAT_REG_NO | CHAR(20) | STCEG | VAT Registration No | CHAR | 20 | Direct | - | EU VAT number |
| INDUSTRY_KEY | CHAR(4) | BRSCH | Industry Key | CHAR | 4 | Translation | Industry_Map | Industry sector code |
| LEGAL_FORM | CHAR(2) | LFORM | Legal Form | CHAR | 2 | Translation | Legal_Map | Corporation, LLC, etc. |
| YEAR_FOUNDED | NUMC(4) | GFORM | Founded (Year) | NUMC | 4 | Direct | - | Year company founded |
| TRADE_REG_NO | CHAR(20) | RGLD | Trade Register Number | CHAR | 20 | Direct | - | Company registration |
| ANNUAL_SALES | CURR(16) | UMSA1 | Annual Sales | CURR | 16 | Direct | - | Sales volume |
| SALES_YEAR | NUMC(4) | UMJAH | Sales Year | NUMC | 4 | Direct | - | Year of sales figure |
| EMPLOYEES | NUMC(7) | ANRED | Number of Employees | NUMC | 7 | Direct | - | Employee count |
| COMPANY_CODE_ORG | CHAR(6) | KONZS | Group Key | CHAR | 6 | Direct | - | Corporate group ID |
| QM_SYSTEM | CHAR(4) | QSSYS | QM System | CHAR | 4 | Translation | QM_Map | ISO9001, etc. |
| DELETION_FLAG | CHAR(1) | LOEVM | Deletion Flag | CHAR | 1 | Fixed Value | (blank) | Leave blank for active |
| CENTRAL_POSTING | CHAR(1) | SPERR | Posting Block | CHAR | 1 | Fixed Value | (blank) | Leave blank for active |

### Customer Classification Fields (KNA1)

| Source Field Name | Source Type | SAP Field | SAP Field Name | Type | Length | Mapping Type | Conversion Rule | Notes |
|-------------------|-------------|-----------|----------------|------|--------|--------------|-----------------|-------|
| NIELSEN_ID | CHAR(2) | NIELS | Nielsen ID | CHAR | 2 | Direct | - | Nielsen region code |
| TRANSPORTATION_ZONE | CHAR(10) | LZONE | Transportation Zone | CHAR | 10 | Translation | Zone_Map | Shipping zone |
| VENDOR_NUMBER | CHAR(10) | LIFNR | Vendor Number | CHAR | 10 | Conversion | ALPHA_INPUT | If customer is also vendor |
| COMPETITOR | CHAR(10) | KONDA | Customer Pricing Proc | CHAR | 10 | Translation | Pricing_Map | Pricing procedure |
| SALES_PROSPECT | CHAR(1) | AUFSD | Central Sales Block | CHAR | 1 | Direct | - | Sales block indicator |
| KNOWN_LEAVE | CHAR(1) | CASSD | Central Order Block | CHAR | 1 | Direct | - | Order block indicator |
| POD_RELEVANT | CHAR(1) | DEAR1 | POD Relevant | CHAR | 1 | Fixed Value | X or blank | Proof of delivery |

---

## Company Code Data (KNB1) - Field Mappings

**SAP Table**: KNB1
**Data Level**: Company Code specific
**XD01 Tab**: Company Code Data

### Mandatory Company Code Fields

| Source Field Name | Source Type | SAP Field | SAP Field Name | Type | Length | Mapping Type | Conversion Rule | Notes |
|-------------------|-------------|-----------|----------------|------|--------|--------------|-----------------|-------|
| CUSTOMER_ID | CHAR(10) | KUNNR | Customer Number | CHAR | 10 | Conversion | ALPHA_INPUT | Link to KNA1 |
| COMPANY_CODE | CHAR(4) | BUKRS | Company Code | CHAR | 4 | Direct | - | Required organizational unit |
| RECON_ACCOUNT | CHAR(10) | AKONT | Reconciliation Account | CHAR | 10 | Fixed Value | 140000 | Customer receivables G/L |

### Optional Company Code Fields

| Source Field Name | Source Type | SAP Field | SAP Field Name | Type | Length | Mapping Type | Conversion Rule | Notes |
|-------------------|-------------|-----------|----------------|------|--------|--------------|-----------------|-------|
| HEAD_OFFICE | CHAR(10) | HBKID | Head Office | CHAR | 10 | Conversion | ALPHA_INPUT | Parent customer if applicable |
| ALT_PAYER | CHAR(10) | XKNZA | Alternative Payer | CHAR | 10 | Conversion | ALPHA_INPUT | Different payer customer |
| PAYMENT_TERMS | CHAR(4) | ZTERM | Payment Terms | CHAR | 4 | Translation | Terms_Map | 0001=Net 30, 0002=Net 60 |
| CLERK_CODE | CHAR(2) | BUSAB | Accounting Clerk | CHAR | 2 | Direct | - | Clerk abbreviation |
| ACCOUNT_MEMO | CHAR(30) | LTEXT | Account Memo | CHAR | 30 | Direct | - | Note for this company code |
| PLANNING_GROUP | CHAR(10) | FDGRV | Planning Group | CHAR | 10 | Direct | - | Financial planning group |
| SORT_KEY | CHAR(3) | ZUAWA | Sort Key | CHAR | 3 | Fixed Value | 001 | Line item display sort |
| CASH_MGMT_GROUP | CHAR(2) | REPRF | Cash Mgmt Group | CHAR | 2 | Direct | - | Cash management |
| RELEASE_GROUP | CHAR(4) | VRSNR | Release Group | CHAR | 4 | Direct | - | Release approval group |
| PAYMENT_METHODS | CHAR(10) | ZWELS | Payment Methods | CHAR | 10 | Translation | PayMeth_Map | C=Check, T=Transfer |
| PAYMENT_BLOCK | CHAR(1) | ZAHLS | Payment Block | CHAR | 1 | Direct | - | Block code for payment |
| DUNNING_PROCEDURE | CHAR(4) | MAHNA | Dunning Procedure | CHAR | 4 | Translation | Dun_Map | Dunning run procedure |
| DUNNING_CLERK | CHAR(2) | MAHNS | Dunning Clerk | CHAR | 2 | Direct | - | Clerk for dunning |
| DUNNING_BLOCK | CHAR(1) | SPERR | Dunning Block | CHAR | 1 | Direct | - | Block dunning notices |
| INTEREST_INDICATOR | CHAR(2) | VZSKZ | Interest Indicator | CHAR | 2 | Translation | Interest_Map | Interest calculation code |
| INTEREST_FREQ | CHAR(2) | ZINDT | Interest Run Date | CHAR | 2 | Direct | - | Day of month for interest |
| LAST_KEY_DATE | DATS(8) | LZTDT | Last Interest Run | DATS | 8 | Direct | - | Date of last interest calc |
| TOLERANCE_GROUP | CHAR(4) | TOGRU | Tolerance Group | CHAR | 4 | Direct | - | Payment difference tolerance |
| HOUSE_BANK | CHAR(5) | HBKID | House Bank | CHAR | 5 | Direct | - | Company house bank ID |
| PAYMT_ADVICE | CHAR(1) | XPORE | Payment Advice | CHAR | 1 | Fixed Value | X or blank | Send payment advice? |
| ACCOUNTING_CLERK_FAX | CHAR(31) | FAXNR | Clerk Fax | CHAR | 31 | Direct | - | Clerk fax number |
| ACCOUNTING_CLERK_PHONE | CHAR(30) | TELNR | Clerk Telephone | CHAR | 30 | Direct | - | Clerk phone number |
| ACCOUNTING_CLERK_EMAIL | CHAR(241) | INTAD | Clerk Email | CHAR | 241 | Direct | - | Clerk email address |
| WITHHOLDING_TAX_CODE | CHAR(2) | QSSKZ | WHT Code | CHAR | 2 | Translation | WHT_Map | Withholding tax code |
| EXEMPTION_CERT | CHAR(25) | ESRNR | Exemption Number | CHAR | 25 | Direct | - | Tax exemption certificate |
| EXEMPTION_VALID_FROM | DATS(8) | ESRDT | Valid From | DATS | 8 | Conversion | DATE_FORMAT | YYYYMMDD format |
| EXEMPTION_VALID_TO | DATS(8) | ESRPF | Valid To | DATS | 8 | Conversion | DATE_FORMAT | YYYYMMDD format |

---

## Sales Area Data (KNVV) - Field Mappings

**SAP Table**: KNVV
**Data Level**: Sales Organization + Distribution Channel + Division
**XD01 Tab**: Sales Area Data

### Mandatory Sales Area Fields

| Source Field Name | Source Type | SAP Field | SAP Field Name | Type | Length | Mapping Type | Conversion Rule | Notes |
|-------------------|-------------|-----------|----------------|------|--------|--------------|-----------------|-------|
| CUSTOMER_ID | CHAR(10) | KUNNR | Customer Number | CHAR | 10 | Conversion | ALPHA_INPUT | Link to KNA1 |
| SALES_ORG | CHAR(4) | VKORG | Sales Organization | CHAR | 4 | Direct | - | Required org unit |
| DIST_CHANNEL | CHAR(2) | VTWEG | Distribution Channel | CHAR | 2 | Direct | - | Required org unit |
| DIVISION | CHAR(2) | SPART | Division | CHAR | 2 | Direct | - | Required org unit |

### Sales General Fields

| Source Field Name | Source Type | SAP Field | SAP Field Name | Type | Length | Mapping Type | Conversion Rule | Notes |
|-------------------|-------------|-----------|----------------|------|--------|--------------|-----------------|-------|
| SALES_OFFICE | CHAR(4) | VKBUR | Sales Office | CHAR | 4 | Translation | Office_Map | Sales office code |
| SALES_GROUP | CHAR(3) | VKGRP | Sales Group | CHAR | 3 | Translation | Group_Map | Sales group code |
| SALES_DISTRICT | CHAR(6) | BZIRK | Sales District | CHAR | 6 | Translation | District_Map | District code |
| CUSTOMER_GROUP | CHAR(2) | KDGRP | Customer Group | CHAR | 2 | Translation | CustGrp_Map | Customer classification |
| CUSTOMER_GROUP1 | CHAR(3) | KVGR1 | Customer Group 1 | CHAR | 3 | Translation | CustGrp1_Map | Additional classification |
| CUSTOMER_GROUP2 | CHAR(3) | KVGR2 | Customer Group 2 | CHAR | 3 | Translation | CustGrp2_Map | Additional classification |
| CUSTOMER_GROUP3 | CHAR(3) | KVGR3 | Customer Group 3 | CHAR | 3 | Translation | CustGrp3_Map | Additional classification |
| CUSTOMER_GROUP4 | CHAR(3) | KVGR4 | Customer Group 4 | CHAR | 3 | Translation | CustGrp4_Map | Additional classification |
| CUSTOMER_GROUP5 | CHAR(3) | KVGR5 | Customer Group 5 | CHAR | 3 | Translation | CustGrp5_Map | Additional classification |
| CURRENCY | CHAR(5) | WAERS | Currency | CHAR | 5 | Translation | Curr_Map | USD, EUR, GBP |
| SALES_CURRENCY | CHAR(5) | VKAUS | Sales Currency | CHAR | 5 | Translation | Curr_Map | Alternative currency |
| PRICE_GROUP | CHAR(2) | KONDA | Price Group | CHAR | 2 | Translation | Price_Map | Pricing group |
| PRICE_LIST | CHAR(2) | PLTYP | Price List Type | CHAR | 2 | Translation | PriceList_Map | Price list assignment |
| CUSTOMER_PRICING_PROC | CHAR(2) | KALKS | Customer Pricing Proc | CHAR | 2 | Translation | PricProc_Map | Pricing procedure |
| STATISTICS_GROUP | CHAR(1) | VERSG | Statistics Group | CHAR | 1 | Direct | - | Statistical group |
| ORDER_PROBABILITY | DEC(3) | AWAHR | Order Probability % | DEC | 3 | Direct | - | Likelihood of order (0-100) |

### Shipping Fields

| Source Field Name | Source Type | SAP Field | SAP Field Name | Type | Length | Mapping Type | Conversion Rule | Notes |
|-------------------|-------------|-----------|----------------|------|--------|--------------|-----------------|-------|
| SHIPPING_CONDITIONS | CHAR(2) | VSBED | Shipping Conditions | CHAR | 2 | Translation | Ship_Map | 01=Standard, 02=Express |
| DELIVERY_PRIORITY | NUMC(2) | LPRIO | Delivery Priority | NUMC | 2 | Direct | - | 01=High, 02=Normal |
| DELIVERY_PLANT | CHAR(4) | VWERK | Delivering Plant | CHAR | 4 | Translation | Plant_Map | Plant code |
| SHIPPING_POINT | CHAR(4) | VSTEL | Shipping Point | CHAR | 4 | Translation | ShipPt_Map | Shipping point code |
| ROUTE | CHAR(6) | ROUTE | Route | CHAR | 6 | Translation | Route_Map | Shipping route |
| TRANSPORTATION_ZONE | CHAR(10) | LZONE | Transportation Zone | CHAR | 10 | Translation | Zone_Map | Transport zone |
| LOADING_GROUP | CHAR(4) | LADGR | Loading Group | CHAR | 4 | Direct | - | Loading strategy |
| UNLOADING_POINTS | CHAR(25) | ABLAD | Unloading Points | CHAR | 25 | Direct | - | Unloading location |
| INCOTERMS_1 | CHAR(3) | INCO1 | Incoterms Part 1 | CHAR | 3 | Translation | Inco_Map | EXW, FOB, CIF, etc. |
| INCOTERMS_2 | CHAR(28) | INCO2 | Incoterms Part 2 | CHAR | 28 | Direct | - | Incoterms location |
| INCOTERMS_VERSION | CHAR(4) | INCOV | Incoterms Version | CHAR | 4 | Fixed Value | 2020 | Incoterms year |
| POD_RELEVANT | CHAR(1) | PODREL | POD Relevant | CHAR | 1 | Fixed Value | X or blank | Proof of delivery required |
| DELIVER_CAL | CHAR(2) | KALVR | Delivery Calendar | CHAR | 2 | Direct | - | Factory calendar |
| ORDER_COMBINATION | CHAR(1) | KZTLF | Order Combination | CHAR | 1 | Fixed Value | X or blank | Combine orders? |
| PARTIAL_DELIVERY_PER_ITEM | CHAR(1) | ANTLF | Partial Dlv/Item | CHAR | 1 | Direct | - | Allow partial delivery |
| MAX_PARTIAL_DELIVERIES | NUMC(1) | MRNMZ | Max Partial Dlv | NUMC | 1 | Direct | - | Max number partial dlv |
| UNLIMITED_TOLERANCE | CHAR(1) | UEBTO | Unlimited Tolerance | CHAR | 1 | Direct | - | Overdelivery tolerance |
| OVERDELIVERY_TOLERANCE | DEC(3) | UEBTK | Overdelivery Tol % | DEC | 3 | Direct | - | % overdelivery allowed |
| UNDERDELIVERY_TOLERANCE | DEC(3) | UNTTO | Underdelivery Tol % | DEC | 3 | Direct | - | % underdelivery allowed |

### Billing Fields

| Source Field Name | Source Type | SAP Field | SAP Field Name | Type | Length | Mapping Type | Conversion Rule | Notes |
|-------------------|-------------|-----------|----------------|------|--------|--------------|-----------------|-------|
| PAYMENT_TERMS | CHAR(4) | ZTERM | Payment Terms | CHAR | 4 | Translation | Terms_Map | 0001, 0002, etc. |
| INCOTERMS | CHAR(3) | INCO1 | Incoterms | CHAR | 3 | Translation | Inco_Map | EXW, FOB, CIF |
| BILLING_BLOCK | CHAR(2) | FAKSD | Billing Block | CHAR | 2 | Direct | - | Block billing indicator |
| ACCOUNT_AT_CUSTOMER | CHAR(12) | AUFSD | Account at Customer | CHAR | 12 | Direct | - | Our account number |
| ACCOUNT_ASSIGNMENT_GROUP | CHAR(2) | KTGRD | Acct Assignment Group | CHAR | 2 | Translation | AcctGrp_Map | Revenue account assignment |
| TAX_CLASSIFICATION | CHAR(1) | TAXKD | Tax Classification | CHAR | 1 | Translation | Tax_Map | 0=Tax exempt, 1=Taxable |
| INVOICE_DATES | CHAR(2) | FKTEX | Invoice Dates | CHAR | 2 | Direct | - | Invoice date reference |
| INVOICE_LIST_SCHEDULE | CHAR(2) | KALKS | Invoice List Schedule | CHAR | 2 | Direct | - | Periodic billing schedule |
| TERMS_OF_PAYMENT_KEY | CHAR(1) | ZTERM | Terms of Payment Key | CHAR | 1 | Direct | - | Payment term variant |
| EXCHANGE_RATE_TYPE | CHAR(4) | KURST | Exchange Rate Type | CHAR | 4 | Fixed Value | M | Standard rate type |

### Partner Functions

| Source Field Name | Source Type | SAP Field | SAP Field Name | Type | Length | Mapping Type | Conversion Rule | Notes |
|-------------------|-------------|-----------|----------------|------|--------|--------------|-----------------|-------|
| SOLD_TO_PARTY | CHAR(10) | KUNNR | Sold-To Party | CHAR | 10 | Conversion | ALPHA_INPUT | Usually same as customer |
| SHIP_TO_PARTY | CHAR(10) | KUNWE | Ship-To Party | CHAR | 10 | Conversion | ALPHA_INPUT | Delivery address customer |
| BILL_TO_PARTY | CHAR(10) | KUNRE | Bill-To Party | CHAR | 10 | Conversion | ALPHA_INPUT | Invoice recipient |
| PAYER | CHAR(10) | KUNRG | Payer | CHAR | 10 | Conversion | ALPHA_INPUT | Payment responsible party |

---

## Address Data (ADRC) - Field Mappings

**SAP Table**: ADRC (Address Master)
**Purpose**: Stores address details linked to customer

| Source Field Name | Source Type | SAP Field | SAP Field Name | Type | Length | Mapping Type | Conversion Rule | Notes |
|-------------------|-------------|-----------|----------------|------|--------|--------------|-----------------|-------|
| BUILDING_CODE | CHAR(20) | BUILDING | Building Code | CHAR | 20 | Direct | - | Building identifier |
| FLOOR | CHAR(10) | FLOOR | Floor | CHAR | 10 | Direct | - | Floor number |
| ROOM_NUMBER | CHAR(10) | ROOMNUMBER | Room Number | CHAR | 10 | Direct | - | Room/suite number |
| TIME_ZONE | CHAR(6) | TIME_ZONE | Time Zone | CHAR | 6 | Translation | TZ_Map | EST, PST, GMT+1 |
| COUNTY_CODE | CHAR(3) | COUNTY_CODE | County Code | CHAR | 3 | Direct | - | County/region code |

---

## Contact Person Data (KNVK) - Field Mappings

**SAP Table**: KNVK (Customer Contact Persons)
**Purpose**: Stores contact person details for customer

| Source Field Name | Source Type | SAP Field | SAP Field Name | Type | Length | Mapping Type | Conversion Rule | Notes |
|-------------------|-------------|-----------|----------------|------|--------|--------------|-----------------|-------|
| CONTACT_PERSON_ID | CHAR(10) | PARNR | Contact Person Number | CHAR | 10 | Direct | - | Unique contact ID |
| TITLE | CHAR(4) | ANRED | Title | CHAR | 4 | Translation | Title_Map | Mr., Ms., Dr. |
| FIRST_NAME | CHAR(40) | NAMEV | First Name | CHAR | 40 | Direct | - | Contact first name |
| LAST_NAME | CHAR(40) | NAME1 | Last Name | CHAR | 40 | Direct | - | Contact last name |
| DEPARTMENT | CHAR(40) | ABTNR | Department | CHAR | 40 | Direct | - | Department name |
| FUNCTION | CHAR(40) | PAFKT | Function | CHAR | 40 | Translation | Func_Map | Purchasing, Finance, etc. |
| TELEPHONE | CHAR(30) | TELF1 | Telephone | CHAR | 30 | Direct | - | Contact phone |
| MOBILE | CHAR(30) | MOBIL | Mobile Phone | CHAR | 30 | Direct | - | Contact mobile |
| FAX | CHAR(30) | TELFX | Fax | CHAR | 30 | Direct | - | Contact fax |
| EMAIL | CHAR(241) | SMTP_ADDR | Email | CHAR | 241 | Direct | - | Contact email |

---

## Mapping Rules and Conventions

### Rule 1: Customer Number Formatting

**Source Format**: Variable length (6-10 digits)
**SAP Format**: 10 characters, numeric, leading zero padded

**Conversion**:
```abap
CALL FUNCTION 'CONVERSION_EXIT_ALPHA_INPUT'
  EXPORTING input  = SOURCE_CUSTOMER_ID
  IMPORTING output = KUNNR.
```

**Examples**:
- Source: `123456` → SAP: `0000123456`
- Source: `99` → SAP: `0000000099`
- Source: `1234567890` → SAP: `1234567890`

---

### Rule 2: Date Formatting

**Source Format**: MM/DD/YYYY (US format) or DD.MM.YYYY (European)
**SAP Format**: YYYYMMDD (SAP internal date format)

**Conversion**:
```abap
* For MM/DD/YYYY format
CONCATENATE SOURCE_DATE+6(4) SOURCE_DATE+0(2) SOURCE_DATE+3(2) INTO SAP_DATE.

* For DD.MM.YYYY format
CONCATENATE SOURCE_DATE+6(4) SOURCE_DATE+3(2) SOURCE_DATE+0(2) INTO SAP_DATE.
```

**Examples**:
- Source: `10/26/2025` → SAP: `20251026`
- Source: `26.10.2025` → SAP: `20251026`

---

### Rule 3: Text Field Padding and Trimming

**Convention**: Remove leading/trailing spaces from all text fields

**Conversion**:
```abap
CONDENSE SOURCE_FIELD NO-GAPS.  " Remove all spaces
or
CONDENSE SOURCE_FIELD.          " Remove leading/trailing spaces, single space between words
```

---

### Rule 4: Uppercase Conversion

**Fields requiring uppercase**: SORTL (Search Term), LAND1 (Country)

**Conversion**:
```abap
TRANSLATE SOURCE_FIELD TO UPPER CASE.
```

---

### Rule 5: Blank Value Handling

**SAP Behavior**: Blank values in source file should map to blank in SAP (not null)

**Convention**:
- Optional fields: Leave blank if source is blank
- Mandatory fields: Provide default value or reject record

---

## Translation Tables

### Country Code Translation (LAND1)

**Translation Table**: T_COUNTRY_MAP

| Source Value | SAP Value (LAND1) | Country Name |
|--------------|-------------------|--------------|
| USA | US | United States |
| United States | US | United States |
| U.S.A. | US | United States |
| United Kingdom | GB | Great Britain |
| UK | GB | Great Britain |
| England | GB | Great Britain |
| Germany | DE | Germany |
| Deutschland | DE | Germany |
| France | FR | France |
| China | CN | China |
| PRC | CN | China |
| Canada | CA | Canada |
| Mexico | MX | Mexico |
| Japan | JP | Japan |
| Singapore | SG | Singapore |
| Australia | AU | Australia |
| India | IN | India |
| Brazil | BR | Brazil |
| Netherlands | NL | Netherlands |
| Belgium | BE | Belgium |
| Switzerland | CH | Switzerland |
| Spain | ES | Spain |
| Italy | IT | Italy |

---

### State/Region Translation (REGIO)

**Translation Table**: T_STATE_MAP (US States example)

| Source Value | SAP Value (REGIO) | State Name |
|--------------|-------------------|------------|
| California | CA | California |
| CA | CA | California |
| New York | NY | New York |
| NY | NY | New York |
| Texas | TX | Texas |
| TX | TX | Texas |
| Florida | FL | Florida |
| FL | FL | Florida |
| Illinois | IL | Illinois |
| IL | IL | Illinois |
| Pennsylvania | PA | Pennsylvania |
| PA | PA | Pennsylvania |

---

### Language Translation (SPRAS)

**Translation Table**: T_LANG_MAP

| Source Value | SAP Value (SPRAS) | Language |
|--------------|-------------------|----------|
| English | E | English |
| EN | E | English |
| ENG | E | English |
| German | D | German |
| DE | D | German |
| GER | D | German |
| French | F | French |
| FR | F | French |
| FRE | F | French |
| Spanish | S | Spanish |
| ES | S | Spanish |
| SPA | S | Spanish |
| Italian | I | Italian |
| IT | I | Italian |
| Japanese | J | Japanese |
| JP | J | Japanese |
| Chinese | 1 | Chinese |
| ZH | 1 | Chinese |

---

### Payment Terms Translation (ZTERM)

**Translation Table**: T_TERMS_MAP

| Source Value | SAP Value (ZTERM) | Description |
|--------------|-------------------|-------------|
| Net 30 | 0001 | Net 30 days |
| 30 days | 0001 | Net 30 days |
| N30 | 0001 | Net 30 days |
| Net 60 | 0002 | Net 60 days |
| 60 days | 0002 | Net 60 days |
| N60 | 0002 | Net 60 days |
| Immediate | 0003 | Immediate payment |
| Cash | 0003 | Immediate payment |
| 2/10 Net 30 | 0004 | 2% discount if paid within 10 days, net 30 |
| COD | 0005 | Cash on delivery |
| Net 45 | 0006 | Net 45 days |

---

### Incoterms Translation (INCO1)

**Translation Table**: T_INCO_MAP

| Source Value | SAP Value (INCO1) | Description |
|--------------|-------------------|-------------|
| Ex Works | EXW | Ex Works |
| EXW | EXW | Ex Works |
| Free on Board | FOB | Free on Board |
| FOB | FOB | Free on Board |
| Cost Insurance Freight | CIF | Cost Insurance Freight |
| CIF | CIF | Cost Insurance Freight |
| Delivered Duty Paid | DDP | Delivered Duty Paid |
| DDP | DDP | Delivered Duty Paid |
| Free Carrier | FCA | Free Carrier |
| FCA | FCA | Free Carrier |
| Carriage Paid To | CPT | Carriage Paid To |
| CPT | CPT | Carriage Paid To |

---

### Currency Translation (WAERS)

**Translation Table**: T_CURR_MAP

| Source Value | SAP Value (WAERS) | Currency Name |
|--------------|-------------------|---------------|
| US Dollar | USD | US Dollar |
| USD | USD | US Dollar |
| $ | USD | US Dollar |
| Euro | EUR | Euro |
| EUR | EUR | Euro |
| € | EUR | Euro |
| British Pound | GBP | British Pound |
| GBP | GBP | British Pound |
| £ | GBP | British Pound |
| Japanese Yen | JPY | Japanese Yen |
| JPY | JPY | Japanese Yen |
| ¥ | JPY | Japanese Yen |
| Canadian Dollar | CAD | Canadian Dollar |
| CAD | CAD | Canadian Dollar |

---

## Fixed Value Assignments

**Fields that always receive the same value (not in source file):**

| SAP Field | Fixed Value | Description | Justification |
|-----------|-------------|-------------|---------------|
| KTOKD | KUNA | Account Group | Standard domestic customer |
| AKONT | 140000 | Reconciliation Account | Customer receivables G/L account |
| SPRAS | E | Language | Default to English |
| WAERS | USD | Currency | Default to US Dollars (US company) |
| LOEVM | (blank) | Deletion Flag | All customers active |
| SPERR | (blank) | Posting Block | All customers active |
| ZAHLS | (blank) | Payment Block | No payment blocks |
| ZUAWA | 001 | Sort Key | Standard sort for line items |
| KALKS | 1 | Customer Pricing Procedure | Standard pricing |
| INCOV | 2020 | Incoterms Version | Current Incoterms version |
| KURST | M | Exchange Rate Type | Standard rate type |

---

## Conversion Routines

### Routine 1: ALPHA_INPUT (Customer Number Padding)

**Purpose**: Convert external customer number to internal format with leading zeros

**Code**:
```abap
CALL FUNCTION 'CONVERSION_EXIT_ALPHA_INPUT'
  EXPORTING
    input  = SOURCE_VALUE
  IMPORTING
    output = TARGET_VALUE.
```

**Usage**: Apply to KUNNR, LIFNR, KUNWE, KUNRE, KUNRG fields

---

### Routine 2: DATE_CONVERT (Date Format Conversion)

**Purpose**: Convert MM/DD/YYYY to YYYYMMDD

**Code**:
```abap
DATA: lv_month(2) TYPE c,
      lv_day(2) TYPE c,
      lv_year(4) TYPE c.

lv_month = SOURCE_DATE+0(2).
lv_day   = SOURCE_DATE+3(2).
lv_year  = SOURCE_DATE+6(4).

CONCATENATE lv_year lv_month lv_day INTO TARGET_DATE.
```

**Usage**: Apply to ESRDT, ESRPF (exemption dates), LZTDT (last interest date)

---

### Routine 3: UPPERCASE (Text Uppercase Conversion)

**Purpose**: Convert text to uppercase

**Code**:
```abap
TRANSLATE SOURCE_VALUE TO UPPER CASE.
```

**Usage**: Apply to SORTL (search term), country names before translation

---

### Routine 4: TRIM_SPACES (Remove Leading/Trailing Spaces)

**Purpose**: Clean text fields

**Code**:
```abap
CONDENSE SOURCE_VALUE.  " Remove leading/trailing spaces
```

**Usage**: Apply to all text fields (NAME1, STRAS, ORT01, etc.)

---

### Routine 5: PHONE_FORMAT (Standardize Phone Numbers)

**Purpose**: Convert phone numbers to standard format: +1-XXX-XXX-XXXX

**Code**:
```abap
DATA: lv_phone TYPE string,
      lv_clean TYPE string.

lv_phone = SOURCE_VALUE.

* Remove non-numeric characters
REPLACE ALL OCCURRENCES OF '-' IN lv_phone WITH ''.
REPLACE ALL OCCURRENCES OF '(' IN lv_phone WITH ''.
REPLACE ALL OCCURRENCES OF ')' IN lv_phone WITH ''.
REPLACE ALL OCCURRENCES OF ' ' IN lv_phone WITH ''.

* Format: +1-XXX-XXX-XXXX (for US numbers)
IF strlen( lv_phone ) = 10.
  CONCATENATE '+1-' lv_phone+0(3) '-' lv_phone+3(3) '-' lv_phone+6(4)
    INTO TARGET_VALUE.
ELSE.
  TARGET_VALUE = SOURCE_VALUE.  " Keep original if not standard length
ENDIF.
```

**Usage**: Apply to TELF1, TELF2, TELFX (phone/fax fields)

---

## Field Mapping Best Practices

### Best Practice 1: Required Field Validation

**Always validate required fields before migration:**

| Table | Required Fields (Must Not Be Blank) |
|-------|-------------------------------------|
| KNA1 | KUNNR, NAME1, ORT01, LAND1, KTOKD |
| KNB1 | KUNNR, BUKRS, AKONT |
| KNVV | KUNNR, VKORG, VTWEG, SPART |

**Pre-Migration Check**:
```sql
SELECT * FROM SOURCE_TABLE
WHERE NAME1 IS NULL OR NAME1 = ''
   OR ORT01 IS NULL OR ORT01 = ''
   OR LAND1 IS NULL OR LAND1 = '';
```

If any records returned, reject migration until fixed.

---

### Best Practice 2: Data Type Consistency

**Ensure source data types match SAP data types:**

| SAP Type | Description | Source File Format |
|----------|-------------|-------------------|
| CHAR | Character field | Text |
| NUMC | Numeric character | Text (numbers only) |
| DATS | Date field | YYYYMMDD |
| CURR | Currency amount | Numeric with 2 decimals |
| DEC | Decimal number | Numeric with decimals |

---

### Best Practice 3: Field Length Validation

**Truncation Prevention**:
- Source field length ≤ SAP field length
- If source > SAP length, truncate or split into multiple fields

**Example**: Customer name longer than 35 characters
- NAME1 (35 chars): First 35 characters
- NAME2 (35 chars): Next 35 characters
- NAME3 (35 chars): Remaining characters

---

### Best Practice 4: Translation Table Completeness

**Before migration, ensure all source values are in translation tables:**

**Missing Translation Check**:
```sql
SELECT DISTINCT COUNTRY FROM SOURCE_TABLE
WHERE COUNTRY NOT IN (SELECT SOURCE_VALUE FROM T_COUNTRY_MAP);
```

If any records returned, add to translation table.

---

### Best Practice 5: Fixed Value Documentation

**Document all fixed values in field mapping spreadsheet:**

| SAP Field | Fixed Value | Source | Justification |
|-----------|-------------|--------|---------------|
| KTOKD | KUNA | Config | All customers are domestic (per business requirement) |
| AKONT | 140000 | Finance | Standard receivables account (per chart of accounts) |
| SPRAS | E | IT | All customers use English correspondence |

---

## Appendix: Complete Field List by Table

### KNA1 Complete Field List (100+ fields)

See SAP documentation for complete list. This mapping covers the 50 most commonly used fields.

### KNB1 Complete Field List

See SAP documentation. This mapping covers the 40 most commonly used fields.

### KNVV Complete Field List

See SAP documentation. This mapping covers the 60 most commonly used fields.

---

## Document Control

**Version**: 1.0
**Last Updated**: October 2025
**Author**: SAP Techno-Functional Consultant
**Review Date**: [Pending]

**Change Log**:
| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2025-10-26 | Initial release | SAP Consultant |

---

**Related Documents**:
- SAP-LSMW-Customer-Master-Migration-Guide.md (Main guide)
- LSMW-Quick-Reference.md (Quick reference)
- Customer-Master-Data-Template.xlsx (Excel template)

**END OF FIELD MAPPING REFERENCE**
