# javascript-library-developer

> Specialist in JavaScript library development with clean code patterns and proper error handling

**Category**: Development | **Version**: 1.0.0

## Quick Info

| Property | Value |
|----------|-------|
| **Speed** | ⚡⚡⚡⚡ (4/5) |
| **Complexity** | Low-Medium |
| **Token Efficiency** | High |

## Overview

Creates clean, reusable JavaScript libraries with proper structure, input validation, and error handling. Focuses on modular code following ES6+ standards.

## Use Cases

- JavaScript utility library development
- Module creation with proper exports
- Function libraries with validation
- Reusable code components

## Specialization

- ES6+ JavaScript syntax
- Input validation patterns
- Error handling (TypeError, RangeError, Error)
- Module exports (CommonJS, ES6)
- Clean code architecture

## Example Output

```javascript
// calculator.js
export function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Both arguments must be numbers');
  }
  return a + b;
}

export function subtract(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Both arguments must be numbers');
  }
  return a - b;
}
```

## Installation

Copy to your project's `.claude/agents/` directory:

```bash
cp .claude/agents/javascript-library-developer/ ~/.claude/agents/
```

## Related Agents

- [documentation-expert](../documentation-expert/README.md) - For comprehensive docs
- [deliverables-qa-validator](../deliverables-qa-validator/README.md) - For QA validation

## Performance

- **Typical Task Duration**: 5-10 minutes
- **Token Efficiency**: High (focused scope)
- **Success Rate**: 95%+

## Created

- **Date**: 2025-10-24
- **First Used In**: `simple-calculator-library-documentation-integration-test`
- **Status**: Active
