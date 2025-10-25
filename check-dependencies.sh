#!/bin/bash
# check-dependencies.sh - Verify all required tools installed

set -e

echo "��� Checking required tools..."

# Check jq
if ! command -v jq &> /dev/null; then
    echo "❌ ERROR: jq not installed"
    echo "   Install: apt install jq  (or)  brew install jq"
    exit 1
fi
echo "✅ jq: $(jq --version)"

# Check tar
if ! command -v tar &> /dev/null; then
    echo "❌ ERROR: tar not installed"
    exit 1
fi
echo "✅ tar: $(tar --version | head -1)"

# Check find
if ! command -v find &> /dev/null; then
    echo "❌ ERROR: find not installed"
    exit 1
fi
echo "✅ find: $(find --version 2>&1 | head -1 || echo 'BSD find')"

# Check git
if ! command -v git &> /dev/null; then
    echo "❌ ERROR: git not installed"
    exit 1
fi
GIT_VERSION=$(git --version | awk '{print $3}')
echo "✅ git: $GIT_VERSION"

# Check Python
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo "❌ ERROR: Python not installed"
    exit 1
fi
PYTHON_CMD=$(command -v python3 || command -v python)
PYTHON_VERSION=$($PYTHON_CMD --version 2>&1 | awk '{print $2}')
echo "✅ Python: $PYTHON_VERSION"

# Verify Python 3.7+
PYTHON_MAJOR=$($PYTHON_CMD -c "import sys; print(sys.version_info.major)")
PYTHON_MINOR=$($PYTHON_CMD -c "import sys; print(sys.version_info.minor)")
if [ "$PYTHON_MAJOR" -lt 3 ] || ([ "$PYTHON_MAJOR" -eq 3 ] && [ "$PYTHON_MINOR" -lt 7 ]); then
    echo "❌ ERROR: Python 3.7+ required (found $PYTHON_VERSION)"
    exit 1
fi

# Check checksum tool
if ! command -v sha256sum &> /dev/null && ! command -v shasum &> /dev/null; then
    echo "❌ ERROR: No checksum tool found (need sha256sum or shasum)"
    exit 1
fi
echo "✅ Checksum tool: Available"

# Check bash version
BASH_VERSION=${BASH_VERSION%%.*}
if [ "$BASH_VERSION" -lt 4 ]; then
    echo "⚠️  WARNING: Bash 4.0+ recommended (found $BASH_VERSION)"
fi
echo "✅ bash: $BASH_VERSION"

echo ""
echo "✅ ALL DEPENDENCIES SATISFIED"
