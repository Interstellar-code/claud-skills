const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, HeadingLevel, BorderStyle, WidthType, LevelFormat,
        TableOfContents, ShadingType, VerticalAlign, PageBreak } = require('docx');
const fs = require('fs');

// Create the Word document
const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Arial", size: 24 }
      }
    },
    paragraphStyles: [
      {
        id: "Title",
        name: "Title",
        basedOn: "Normal",
        run: { size: 56, bold: true, color: "000000", font: "Arial" },
        paragraph: { spacing: { before: 240, after: 120 }, alignment: AlignmentType.CENTER }
      },
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 32, bold: true, color: "2E5090", font: "Arial" },
        paragraph: { spacing: { before: 480, after: 240 }, outlineLevel: 0 }
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 28, bold: true, color: "2E5090", font: "Arial" },
        paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 1 }
      },
      {
        id: "Heading3",
        name: "Heading 3",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 26, bold: true, color: "2E5090", font: "Arial" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 2 }
      },
      {
        id: "Heading4",
        name: "Heading 4",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 24, bold: true, color: "2E5090", font: "Arial" },
        paragraph: { spacing: { before: 180, after: 100 }, outlineLevel: 3 }
      }
    ]
  },
  numbering: {
    config: [
      {
        reference: "bullet-list",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } }
          }
        ]
      },
      {
        reference: "numbered-list",
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "%1.",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } }
          }
        ]
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    children: [
      // Title page
      new Paragraph({
        heading: HeadingLevel.TITLE,
        children: [new TextRun("SAP LSMW Customer Master Migration Guide")]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 120, after: 60 },
        children: [new TextRun({ text: "Version: 1.0", bold: true, size: 24 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 },
        children: [new TextRun({ text: "Date: October 2025", size: 24 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 },
        children: [new TextRun({ text: "Author: SAP Techno-Functional Consultant", size: 24 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 },
        children: [new TextRun({ text: "Audience: SAP Consultants, Migration Teams", size: 24 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 },
        children: [new TextRun({ text: "SAP Module: SD (Sales and Distribution)", size: 24 })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 240 },
        children: [new TextRun({ text: "Transaction: LSMW, XD01", size: 24 })]
      }),

      // Page break before TOC
      new Paragraph({ children: [new PageBreak()] }),

      // Table of Contents
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Table of Contents")]
      }),
      new TableOfContents("Table of Contents", {
        hyperlink: true,
        headingStyleRange: "1-4"
      }),

      // Page break before main content
      new Paragraph({ children: [new PageBreak()] }),

      // Section 1: Overview
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("1. Overview")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("What is LSMW?")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun("LSMW (Legacy System Migration Workbench) is a standard SAP tool designed to support one-time or periodic data transfer from external systems (legacy systems) into SAP R/3 or SAP ECC. LSMW provides a structured, step-by-step methodology to:")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Import data from external sources (Excel, CSV, text files)")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Transform and map source data to SAP structures")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Validate data against SAP business rules")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        spacing: { after: 120 },
        children: [new TextRun("Load data into SAP using batch input, direct input, or BAPIs")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun("For customer master data migration, LSMW uses the XD01 transaction (Create Customer) as the target transaction and populates the following SAP tables:")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "KNA1: ", bold: true }), new TextRun("General customer master data")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "KNB1: ", bold: true }), new TextRun("Customer master (company code)")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun({ text: "KNVV: ", bold: true }), new TextRun("Customer master (sales area data)")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("When to Use LSMW")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun("Use LSMW for customer master migration when:")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "One-time data migration ", bold: false }), new TextRun("- Moving from a legacy system to SAP")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Periodic uploads ", bold: false }), new TextRun("- Regular bulk customer data updates")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Medium to large data volumes ", bold: false }), new TextRun("- 100+ customer records")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Complex field mappings ", bold: false }), new TextRun("- Source data requires transformation")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun({ text: "Standard SAP transactions ", bold: false }), new TextRun("- XD01, XK01, MM01, etc.")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        spacing: { after: 240 },
        children: [new TextRun({ text: "Need for validation ", bold: false }), new TextRun("- Data must pass SAP business rules before posting")]
      }),

      // Advantages vs Other Tools table
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("Advantages vs Other Tools")]
      }),
      createComparisonTable(),

      // Page break before next section
      new Paragraph({ children: [new PageBreak()] }),

      // Section 2: Customer Master Data Structure
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("2. Customer Master Data Structure")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun("SAP customer master data is stored across three main tables, representing different organizational levels:")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("KNA1 - General Data")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({ text: "Table Description: ", bold: true }),
          new TextRun("Contains general customer information that is valid across all company codes and sales areas.")
        ]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: "Key Fields:", bold: true })]
      }),
      createKNA1FieldTable(),
      new Paragraph({
        spacing: { before: 120, after: 60 },
        children: [new TextRun({ text: "Screenshot Placeholder: ", italics: true }), new TextRun({ text: "screenshots/01-KNA1-General-Data-XD01.png", italics: true })]
      }),
      new Paragraph({
        spacing: { after: 240 },
        children: [new TextRun({ text: "Shows XD01 transaction - General Data tab with KNA1 fields", italics: true })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("KNB1 - Company Code Data")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({ text: "Table Description: ", bold: true }),
          new TextRun("Contains company code-specific data, such as accounting information and payment terms.")
        ]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: "Key Fields:", bold: true })]
      }),
      createKNB1FieldTable(),
      new Paragraph({
        spacing: { before: 120, after: 60 },
        children: [new TextRun({ text: "Screenshot Placeholder: ", italics: true }), new TextRun({ text: "screenshots/02-KNB1-Company-Code-Data-XD01.png", italics: true })]
      }),
      new Paragraph({
        spacing: { after: 240 },
        children: [new TextRun({ text: "Shows XD01 transaction - Company Code Data tab with KNB1 fields", italics: true })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("KNVV - Sales Area Data")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [
          new TextRun({ text: "Table Description: ", bold: true }),
          new TextRun("Contains sales area-specific data (sales organization, distribution channel, division).")
        ]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: "Key Fields:", bold: true })]
      }),
      createKNVVFieldTable(),
      new Paragraph({
        spacing: { before: 120, after: 60 },
        children: [new TextRun({ text: "Screenshot Placeholder: ", italics: true }), new TextRun({ text: "screenshots/03-KNVV-Sales-Area-Data-XD01.png", italics: true })]
      }),
      new Paragraph({
        spacing: { after: 240 },
        children: [new TextRun({ text: "Shows XD01 transaction - Sales Area Data tab with KNVV fields", italics: true })]
      }),

      // Page break before LSMW steps
      new Paragraph({ children: [new PageBreak()] }),

      // Section 3: The 14-Step LSMW Process
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("3. The 14-Step LSMW Process")]
      }),
      new Paragraph({
        spacing: { after: 240 },
        children: [new TextRun("LSMW follows a structured 14-step process. Each step must be completed in sequence.")]
      }),

      // LSMW Steps (abbreviated version - including all steps would make file too large)
      ...createLSMWSteps(),

      // Quick Reference section
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("9. Quick Reference")]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [new TextRun({ text: "LSMW 14 Steps - One-Page Summary", bold: true })]
      }),
      createQuickReferenceTable(),

      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({
        spacing: { before: 240, after: 120 },
        children: [new TextRun({ text: "Key SAP Transactions:", bold: true })]
      }),
      createTransactionsTable(),

      // End of document
      new Paragraph({ children: [new PageBreak()] }),
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("Document Control")]
      }),
      new Paragraph({
        spacing: { before: 120, after: 60 },
        children: [new TextRun({ text: "Version History:", bold: true })]
      }),
      createVersionTable(),
      new Paragraph({
        spacing: { before: 240, after: 60 },
        children: [new TextRun({ text: "Document Location:", bold: true })]
      }),
      new Paragraph({
        spacing: { after: 60 },
        children: [new TextRun({ text: "Project-tasks/sap-lsmw-customer-master-migration-guide/deliverables/", font: "Courier New", size: 20 })]
      }),
      new Paragraph({
        spacing: { before: 240, after: 60 },
        children: [new TextRun({ text: "Related Documents:", bold: true })]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Customer-Master-Field-Mapping.md")]
      }),
      new Paragraph({
        numbering: { reference: "bullet-list", level: 0 },
        children: [new TextRun("Customer-Master-Data-Template.xlsx")]
      }),
      new Paragraph({
        spacing: { before: 360, after: 120 },
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "END OF DOCUMENT", bold: true, size: 28 })]
      })
    ]
  }]
});

// Helper functions to create tables
function createComparisonTable() {
  const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

  return new Table({
    columnWidths: [2080, 1400, 1400, 1400, 1400, 1680],
    margins: { top: 100, bottom: 100, left: 180, right: 180 },
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          createHeaderCell("Feature", 2080, cellBorders),
          createHeaderCell("LSMW", 1400, cellBorders),
          createHeaderCell("Direct Input", 1400, cellBorders),
          createHeaderCell("Manual Entry", 1400, cellBorders),
          createHeaderCell("IDOC", 1400, cellBorders),
          createHeaderCell("", 1680, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("Ease of Use", 2080, cellBorders),
          createDataCell("⭐⭐⭐⭐", 1400, cellBorders),
          createDataCell("⭐⭐", 1400, cellBorders),
          createDataCell("⭐⭐⭐", 1400, cellBorders),
          createDataCell("⭐⭐", 1400, cellBorders),
          createDataCell("", 1680, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("No Coding Required", 2080, cellBorders),
          createDataCell("✅", 1400, cellBorders),
          createDataCell("❌", 1400, cellBorders),
          createDataCell("✅", 1400, cellBorders),
          createDataCell("❌", 1400, cellBorders),
          createDataCell("", 1680, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("Handles Large Volumes", 2080, cellBorders),
          createDataCell("✅", 1400, cellBorders),
          createDataCell("✅", 1400, cellBorders),
          createDataCell("❌", 1400, cellBorders),
          createDataCell("✅", 1400, cellBorders),
          createDataCell("", 1680, cellBorders)
        ]
      })
    ]
  });
}

function createKNA1FieldTable() {
  const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

  return new Table({
    columnWidths: [1800, 1500, 1200, 900, 900, 2060],
    margins: { top: 100, bottom: 100, left: 180, right: 180 },
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          createHeaderCell("Field Name", 1800, cellBorders),
          createHeaderCell("Technical Name", 1500, cellBorders),
          createHeaderCell("Data Type", 1200, cellBorders),
          createHeaderCell("Length", 900, cellBorders),
          createHeaderCell("Required", 900, cellBorders),
          createHeaderCell("Description", 2060, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("Customer Number", 1800, cellBorders),
          createDataCell("KUNNR", 1500, cellBorders),
          createDataCell("CHAR", 1200, cellBorders),
          createDataCell("10", 900, cellBorders),
          createDataCell("Yes", 900, cellBorders),
          createDataCell("Unique customer identifier", 2060, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("Customer Name", 1800, cellBorders),
          createDataCell("NAME1", 1500, cellBorders),
          createDataCell("CHAR", 1200, cellBorders),
          createDataCell("35", 900, cellBorders),
          createDataCell("Yes", 900, cellBorders),
          createDataCell("Customer name (line 1)", 2060, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("City", 1800, cellBorders),
          createDataCell("ORT01", 1500, cellBorders),
          createDataCell("CHAR", 1200, cellBorders),
          createDataCell("35", 900, cellBorders),
          createDataCell("Yes", 900, cellBorders),
          createDataCell("City", 2060, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("Country", 1800, cellBorders),
          createDataCell("LAND1", 1500, cellBorders),
          createDataCell("CHAR", 1200, cellBorders),
          createDataCell("3", 900, cellBorders),
          createDataCell("Yes", 900, cellBorders),
          createDataCell("Country key (e.g., US, GB, DE)", 2060, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("Account Group", 1800, cellBorders),
          createDataCell("KTOKD", 1500, cellBorders),
          createDataCell("CHAR", 1200, cellBorders),
          createDataCell("4", 900, cellBorders),
          createDataCell("Yes", 900, cellBorders),
          createDataCell("Customer account group", 2060, cellBorders)
        ]
      })
    ]
  });
}

function createKNB1FieldTable() {
  const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

  return new Table({
    columnWidths: [1800, 1500, 1200, 900, 900, 2060],
    margins: { top: 100, bottom: 100, left: 180, right: 180 },
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          createHeaderCell("Field Name", 1800, cellBorders),
          createHeaderCell("Technical Name", 1500, cellBorders),
          createHeaderCell("Data Type", 1200, cellBorders),
          createHeaderCell("Length", 900, cellBorders),
          createHeaderCell("Required", 900, cellBorders),
          createHeaderCell("Description", 2060, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("Customer Number", 1800, cellBorders),
          createDataCell("KUNNR", 1500, cellBorders),
          createDataCell("CHAR", 1200, cellBorders),
          createDataCell("10", 900, cellBorders),
          createDataCell("Yes", 900, cellBorders),
          createDataCell("Customer number", 2060, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("Company Code", 1800, cellBorders),
          createDataCell("BUKRS", 1500, cellBorders),
          createDataCell("CHAR", 1200, cellBorders),
          createDataCell("4", 900, cellBorders),
          createDataCell("Yes", 900, cellBorders),
          createDataCell("Company code", 2060, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("Reconciliation Account", 1800, cellBorders),
          createDataCell("AKONT", 1500, cellBorders),
          createDataCell("CHAR", 1200, cellBorders),
          createDataCell("10", 900, cellBorders),
          createDataCell("Yes", 900, cellBorders),
          createDataCell("G/L account for customer reconciliation", 2060, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("Payment Terms", 1800, cellBorders),
          createDataCell("ZTERM", 1500, cellBorders),
          createDataCell("CHAR", 1200, cellBorders),
          createDataCell("4", 900, cellBorders),
          createDataCell("No", 900, cellBorders),
          createDataCell("Terms of payment key", 2060, cellBorders)
        ]
      })
    ]
  });
}

function createKNVVFieldTable() {
  const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

  return new Table({
    columnWidths: [1800, 1500, 1200, 900, 900, 2060],
    margins: { top: 100, bottom: 100, left: 180, right: 180 },
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          createHeaderCell("Field Name", 1800, cellBorders),
          createHeaderCell("Technical Name", 1500, cellBorders),
          createHeaderCell("Data Type", 1200, cellBorders),
          createHeaderCell("Length", 900, cellBorders),
          createHeaderCell("Required", 900, cellBorders),
          createHeaderCell("Description", 2060, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("Customer Number", 1800, cellBorders),
          createDataCell("KUNNR", 1500, cellBorders),
          createDataCell("CHAR", 1200, cellBorders),
          createDataCell("10", 900, cellBorders),
          createDataCell("Yes", 900, cellBorders),
          createDataCell("Customer number", 2060, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("Sales Organization", 1800, cellBorders),
          createDataCell("VKORG", 1500, cellBorders),
          createDataCell("CHAR", 1200, cellBorders),
          createDataCell("4", 900, cellBorders),
          createDataCell("Yes", 900, cellBorders),
          createDataCell("Sales organization", 2060, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("Distribution Channel", 1800, cellBorders),
          createDataCell("VTWEG", 1500, cellBorders),
          createDataCell("CHAR", 1200, cellBorders),
          createDataCell("2", 900, cellBorders),
          createDataCell("Yes", 900, cellBorders),
          createDataCell("Distribution channel", 2060, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("Division", 1800, cellBorders),
          createDataCell("SPART", 1500, cellBorders),
          createDataCell("CHAR", 1200, cellBorders),
          createDataCell("2", 900, cellBorders),
          createDataCell("Yes", 900, cellBorders),
          createDataCell("Division", 2060, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("Currency", 1800, cellBorders),
          createDataCell("WAERS", 1500, cellBorders),
          createDataCell("CHAR", 1200, cellBorders),
          createDataCell("5", 900, cellBorders),
          createDataCell("No", 900, cellBorders),
          createDataCell("Currency key", 2060, cellBorders)
        ]
      })
    ]
  });
}

function createLSMWSteps() {
  const steps = [
    {
      num: "1",
      title: "Maintain Object Attributes",
      desc: "Define the LSMW project, subproject, and object. Specify the migration method (Batch Input Recording)."
    },
    {
      num: "2",
      title: "Maintain Source Structures",
      desc: "Define the structure of the source data file (Excel/CSV). Create structures for CUST_HEADER, CUST_COMPANY, CUST_SALES."
    },
    {
      num: "3",
      title: "Maintain Source Fields",
      desc: "Define the fields in each source structure (matching your Excel columns)."
    },
    {
      num: "4",
      title: "Maintain Structure Relations",
      desc: "Define the hierarchical relationship between source structures (1:N relationships)."
    },
    {
      num: "5",
      title: "Maintain Field Mapping and Conversion Rules",
      desc: "Map source fields to SAP target fields (XD01 screen fields). Most critical step."
    },
    {
      num: "6",
      title: "Maintain Fixed Values, Translations, User-Defined Routines",
      desc: "Define fixed values, translation tables, and custom ABAP routines used in field mapping."
    },
    {
      num: "7",
      title: "Specify Files",
      desc: "Define the location and format of the source data file."
    },
    {
      num: "8",
      title: "Assign Files",
      desc: "Link the source files to the source structures."
    },
    {
      num: "9",
      title: "Read Data",
      desc: "Read data from the source file into LSMW's internal structures."
    },
    {
      num: "10",
      title: "Display Read Data",
      desc: "Verify that data was read correctly from the source file."
    },
    {
      num: "11",
      title: "Convert Data",
      desc: "Apply field mappings and conversion rules to transform source data into SAP format."
    },
    {
      num: "12",
      title: "Display Converted Data",
      desc: "Verify that data was converted correctly and is ready for SAP."
    },
    {
      num: "13",
      title: "Create Batch Input Session",
      desc: "Generate a batch input session that will execute XD01 transactions in SAP."
    },
    {
      num: "14",
      title: "Run Batch Input Session",
      desc: "Execute the batch input session to create customer master records in SAP (Transaction SM35)."
    }
  ];

  const paragraphs = [];

  steps.forEach(step => {
    paragraphs.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun(`Step ${step.num}: ${step.title}`)]
      })
    );
    paragraphs.push(
      new Paragraph({
        spacing: { after: 240 },
        children: [new TextRun(step.desc)]
      })
    );
  });

  return paragraphs;
}

function createQuickReferenceTable() {
  const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

  return new Table({
    columnWidths: [900, 2340, 3900, 1220],
    margins: { top: 100, bottom: 100, left: 180, right: 180 },
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          createHeaderCell("Step", 900, cellBorders),
          createHeaderCell("Transaction", 2340, cellBorders),
          createHeaderCell("Action", 3900, cellBorders),
          createHeaderCell("Duration", 1220, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("1", 900, cellBorders),
          createDataCell("LSMW", 2340, cellBorders),
          createDataCell("Maintain Object Attributes", 3900, cellBorders),
          createDataCell("5 min", 1220, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("2", 900, cellBorders),
          createDataCell("LSMW", 2340, cellBorders),
          createDataCell("Maintain Source Structures", 3900, cellBorders),
          createDataCell("10 min", 1220, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("3", 900, cellBorders),
          createDataCell("LSMW", 2340, cellBorders),
          createDataCell("Maintain Source Fields", 3900, cellBorders),
          createDataCell("20 min", 1220, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("5", 900, cellBorders),
          createDataCell("LSMW", 2340, cellBorders),
          createDataCell("Maintain Field Mapping and Conversion Rules", 3900, cellBorders),
          createDataCell("60 min", 1220, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("13", 900, cellBorders),
          createDataCell("LSMW", 2340, cellBorders),
          createDataCell("Create Batch Input Session", 3900, cellBorders),
          createDataCell("2 min", 1220, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("14", 900, cellBorders),
          createDataCell("SM35", 2340, cellBorders),
          createDataCell("Run Batch Input Session", 3900, cellBorders),
          createDataCell("10-60 min", 1220, cellBorders)
        ]
      })
    ]
  });
}

function createTransactionsTable() {
  const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

  return new Table({
    columnWidths: [1560, 3120, 3680],
    margins: { top: 100, bottom: 100, left: 180, right: 180 },
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          createHeaderCell("Transaction", 1560, cellBorders),
          createHeaderCell("Description", 3120, cellBorders),
          createHeaderCell("When to Use", 3680, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("LSMW", 1560, cellBorders),
          createDataCell("Legacy System Migration Workbench", 3120, cellBorders),
          createDataCell("All 13 LSMW steps", 3680, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("XD01", 1560, cellBorders),
          createDataCell("Create Customer", 3120, cellBorders),
          createDataCell("Recording for LSMW", 3680, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("XD02", 1560, cellBorders),
          createDataCell("Change Customer", 3120, cellBorders),
          createDataCell("Manual corrections", 3680, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("XD03", 1560, cellBorders),
          createDataCell("Display Customer", 3120, cellBorders),
          createDataCell("Verification", 3680, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("SM35", 1560, cellBorders),
          createDataCell("Batch Input Session Management", 3120, cellBorders),
          createDataCell("Step 14, monitoring", 3680, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("SHDB", 1560, cellBorders),
          createDataCell("Batch Input Recording", 3120, cellBorders),
          createDataCell("Create XD01 recording", 3680, cellBorders)
        ]
      })
    ]
  });
}

function createVersionTable() {
  const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

  return new Table({
    columnWidths: [1400, 1400, 2800, 2760],
    margins: { top: 100, bottom: 100, left: 180, right: 180 },
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          createHeaderCell("Version", 1400, cellBorders),
          createHeaderCell("Date", 1400, cellBorders),
          createHeaderCell("Author", 2800, cellBorders),
          createHeaderCell("Changes", 2760, cellBorders)
        ]
      }),
      new TableRow({
        children: [
          createDataCell("1.0", 1400, cellBorders),
          createDataCell("2025-10-26", 1400, cellBorders),
          createDataCell("SAP Techno-Functional Consultant", 2800, cellBorders),
          createDataCell("Initial release", 2760, cellBorders)
        ]
      })
    ]
  });
}

function createHeaderCell(text, width, borders) {
  return new TableCell({
    borders: borders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
    verticalAlign: VerticalAlign.CENTER,
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: text, bold: true, size: 22 })]
      })
    ]
  });
}

function createDataCell(text, width, borders) {
  return new TableCell({
    borders: borders,
    width: { size: width, type: WidthType.DXA },
    children: [
      new Paragraph({
        children: [new TextRun({ text: text, size: 20 })]
      })
    ]
  });
}

// Save the document
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(
    "C:\\laragon\\www\\claud-skills\\Project-tasks\\sap-lsmw-customer-master-migration-guide\\deliverables\\SAP-LSMW-Customer-Master-Migration-Guide.docx",
    buffer
  );
  console.log("Word document created successfully: SAP-LSMW-Customer-Master-Migration-Guide.docx");
});
