#!/bin/bash
# SAP LSMW Screenshot Download and Rename Script
# Version: 1.0
# Purpose: Batch download screenshots and rename to match requirements

echo "============================================"
echo "SAP LSMW Screenshot Downloader"
echo "============================================"
echo ""

# Set paths
PROJECT_ROOT="/c/laragon/www/claud-skills"
SCREENSHOTS_DIR="$PROJECT_ROOT/Project-tasks/sap-lsmw-customer-master-migration-guide/deliverables/screenshots"
URLS_FILE="$SCREENSHOTS_DIR/screenshot-urls.txt"
IMAGE_FETCHER="$PROJECT_ROOT/.claude/skills/image-fetcher/scripts/fetch_images_batch.py"

echo "Checking prerequisites..."
echo ""

# Check if URLs file exists
if [ ! -f "$URLS_FILE" ]; then
    echo "ERROR: URLs file not found: $URLS_FILE"
    echo "Please create the file and add image URLs first."
    exit 1
fi

# Check if image-fetcher script exists
if [ ! -f "$IMAGE_FETCHER" ]; then
    echo "ERROR: image-fetcher script not found: $IMAGE_FETCHER"
    exit 1
fi

# Check if URLs file has content (non-comment lines)
if ! grep -v "^#" "$URLS_FILE" | grep -q "http"; then
    echo "ERROR: No URLs found in $URLS_FILE"
    echo "Please add image URLs to the file first."
    echo "See IMAGE-SOURCES-AND-URLS.md for guidance."
    exit 1
fi

echo "Prerequisites OK!"
echo ""
echo "Starting batch download..."
echo ""

# Run batch download
python "$IMAGE_FETCHER" "$URLS_FILE" "$SCREENSHOTS_DIR"

if [ $? -ne 0 ]; then
    echo ""
    echo "ERROR: Batch download failed!"
    exit 1
fi

echo ""
echo "============================================"
echo "Download Complete!"
echo "============================================"
echo ""
echo "Next steps:"
echo "1. Check downloaded images in: $SCREENSHOTS_DIR"
echo "2. Rename files to match SCREENSHOT-REQUIREMENTS.md naming convention"
echo "3. Use the rename commands below:"
echo ""
echo "Example renaming (adjust based on your downloaded files):"
echo "   mv downloaded-image-1.png 04-LSMW-Step1-Object-Attributes.png"
echo "   mv downloaded-image-2.png 05-LSMW-Step2-Source-Structures.png"
echo "   # ... etc."
echo ""
echo "4. Update documentation to reference screenshots"
echo ""
