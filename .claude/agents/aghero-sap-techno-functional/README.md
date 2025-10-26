# aghero-sap-techno-functional

> SAP Techno-Functional Consultant specializing in LSMW migrations and customer master data

**Category**: SAP & ERP Migration | **Version**: 1.0.0

## Quick Info

| Property | Value |
|----------|-------|
| **Speed** | ⚡⚡⚡ (3/5) |
| **Complexity** | High (SAP-specific) |
| **Token Efficiency** | High |
| **Specialization** | SAP LSMW, Customer Master Data (XD01, KNA1/KNB1/KNVV) |

## Overview

This agent is a specialized SAP consultant focused on creating technical how-to guides for SAP ECC migration projects, particularly LSMW (Legacy System Migration Workbench) implementations and customer master data migrations.

## Core Expertise

### LSMW (Legacy System Migration Workbench)
- Complete knowledge of all 14 LSMW steps
- Batch input recording and execution
- Field mapping strategies
- Data conversion and validation
- Error handling and troubleshooting

### Customer Master Data
- **XD01 Transaction**: Customer master creation/maintenance
- **KNA1 Table**: General customer data
- **KNB1 Table**: Customer company code data
- **KNVV Table**: Customer sales data
- Field relationships and dependencies

### Documentation Creation
- Technical how-to guides for consultants
- Step-by-step migration procedures
- Field mapping tables (Excel/Markdown)
- Screenshot placeholders with annotations
- Best practices and troubleshooting guides

## Use Cases

### Primary Use Case: LSMW How-To Guides
Create comprehensive technical documentation covering:
- All 14 LSMW steps with detailed instructions
- Transaction codes and navigation paths
- Field-level mapping tables
- Validation checkpoints
- Error handling procedures

### Secondary Use Cases:
- Customer master data migration documentation
- Batch input recording procedures
- SAP table field mapping reference
- Data validation and quality checks
- Migration testing procedures

## Deliverables

### Markdown Documentation
- **LSMW_How_To_Guide.md**: Complete 14-step guide
- **Field_Mapping_Reference.md**: Field mapping tables
- **Troubleshooting_Guide.md**: Common issues and solutions
- **Best_Practices.md**: Migration best practices

### Excel Workbooks (Optional)
- **Field_Mappings.xlsx**: Multi-sheet field mapping reference
  - Sheet 1: KNA1 mappings
  - Sheet 2: KNB1 mappings
  - Sheet 3: KNVV mappings
  - Sheet 4: Validation rules

## Installation

This agent is part of the AgentHero AI orchestration system.

### Prerequisites
- AgentHero AI PM orchestrator installed
- Specification file describing LSMW requirements
- Access to SAP field documentation (if available)

### Usage

The agent is invoked by the PM orchestrator, not directly.

**Example Topic Creation**:
```bash
# User provides spec file: sap-lsmw-customer-master-spec.md
# PM orchestrator invokes this agent during Phase 4 (Execution)
```

## Agent Workflow

### Phase 1: Requirements Analysis (0-20%)
- Parse specification file
- Identify which LSMW steps to document
- Determine target audience and detail level
- Plan document structure

### Phase 2: Structure Planning (20-30%)
- Create document outline
- Define section hierarchy
- Plan field mapping tables
- Identify screenshot placeholders

### Phase 3: Content Creation (30-80%)
- Document all 14 LSMW steps
- Create field mapping tables
- Write troubleshooting sections
- Add best practices
- Include validation checklists

### Phase 4: Quality Review (80-95%)
- Verify completeness
- Check technical accuracy
- Validate formatting consistency
- Review consultant-friendliness

### Phase 5: Finalization (95-100%)
- Generate table of contents
- Add document metadata
- Create quick reference sections
- Final formatting pass

## Output Format

### How-To Guide Structure
```markdown
# LSMW Customer Master Migration - How-To Guide

**Version**: 1.0
**Audience**: SAP Consultants
**Estimated Time**: 4-6 hours

## Table of Contents
[Auto-generated]

## 1. Overview
## 2. Prerequisites
## 3. LSMW 14 Steps - Detailed Walkthrough
   3.1 Step 1: Maintain Object Attributes
   3.2 Step 2: Maintain Source Structures
   ...
   3.14 Step 14: Run Batch Input Session
## 4. Field Mapping Tables
   4.1 KNA1 - General Data
   4.2 KNB1 - Company Code Data
   4.3 KNVV - Sales Data
## 5. Troubleshooting
## 6. Best Practices
## 7. Validation Checklist
```

### Field Mapping Table Format
```markdown
### KNA1 (General Data)
| Source Field | Target Field (KNA1) | Data Type | Length | Required | Notes |
|--------------|---------------------|-----------|--------|----------|-------|
| CUST_ID | KUNNR | CHAR | 10 | Yes | Customer number |
| CUST_NAME | NAME1 | CHAR | 35 | Yes | Customer name |
| STREET | STRAS | CHAR | 35 | No | Street address |
```

## State File Integration

This agent follows the orchestrated sub-agent pattern:

- **Initializes** state file on start
- **Logs progress** every 30-60 seconds
- **Updates progress** at milestones (25%, 50%, 75%, 100%)
- **Tracks file changes** (created/modified)
- **Reports completion** with deliverables summary

## Performance Metrics

| Metric | Target |
|--------|--------|
| **Completion Time** | 15-25 minutes |
| **Documentation Length** | 30-50 pages |
| **Field Mappings** | 50-100 fields |
| **LSMW Steps Covered** | All 14 steps |
| **Screenshot Placeholders** | 20-30 placeholders |

## Example Output

### Sample LSMW Step Documentation
```markdown
### Step 5: Maintain Field Mapping and Conversion Rules

**Transaction**: LSMW
**Navigation**: LSMW > [Your Object] > Step 5

**Purpose**: Map source fields to target SAP table fields (KNA1, KNB1, KNVV)

**Steps**:
1. Select your LSMW object
2. Navigate to Step 5: "Maintain Field Mapping"
3. For each target structure:
   - KNA1 (General Data):
     - Map source field CUST_ID → KUNNR
     - Map source field CUST_NAME → NAME1
     - Map source field STREET → STRAS
   - KNB1 (Company Code):
     - Map source field COMP_CODE → BUKRS
     - Map source field RECON_ACCT → AKONT
   - KNVV (Sales Data):
     - Map source field SALES_ORG → VKORG
     - Map source field DIST_CHAN → VTWEG

**Conversion Rules**:
- Customer ID: Remove leading zeros, pad to 10 characters
- Country Code: Convert 2-char to 3-char ISO codes (US → USA)

**Validation**:
- Click "Syntax Check" to validate all mappings
- Verify no red error messages
- Test with sample data

[Screenshot placeholder: LSMW_Step5_Field_Mapping.png]
```

## Related Agents

- [agenthero-docs-expert](../agenthero-docs-expert/README.md) - For final documentation polish
- [agenthero-qa-validate](../agenthero-qa-validate/README.md) - For quality validation

## Maintenance

- **Created**: 2025-10-25
- **Last Updated**: 2025-10-25
- **Version**: 1.0.0
- **Status**: Active

## Contributing

To enhance this agent:
1. Review actual LSMW project requirements
2. Add more SAP transaction coverage (VA01, MD01, etc.)
3. Expand table coverage beyond customer master
4. Add material master (MM) migration guides
5. Include data archiving procedures

## License

Part of the AgentHero AI framework.
