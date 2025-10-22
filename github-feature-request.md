# Feature Request: Add visual differentiation for skills/agents/commands output

## Description

When skills, agents, or slash commands are invoked (either directly or through a chain), it would be helpful to visually differentiate them from regular output using colors and icons.

## Current Behavior

- All output appears in the same color/format
- Difficult to distinguish when a skill/agent is running vs regular Claude responses
- Especially confusing when multiple skills chain together
- No clear indication when auto-activation occurs

## Proposed Enhancement

Add terminal color codes (ANSI) and icons to differentiate different component types:

- **Skills**: Blue text + 🔧 icon (e.g., `🔧 [changelog-manager] Running...`)
- **Agents**: Purple text + 🤖 icon (e.g., `🤖 [eslint-fixer] Analyzing...`)
- **Slash Commands**: Green text + ⚡ icon (e.g., `⚡ [/commit] Executing...`)
- **Regular Output**: Default terminal color

## Benefits

- ✅ Improved visual clarity in complex workflows
- ✅ Easier to debug when multiple skills/agents are chained
- ✅ Better user understanding of what's happening at each step
- ✅ Reduced confusion about skill auto-activation
- ✅ More professional terminal output appearance
- ✅ Faster visual scanning of long outputs

## Example Output

**Before (current behavior):**
```
User: "release update"
The "changelog-manager" skill is running
I'll analyze your changes...
(git status output)
(git diff output)
Creating release v1.8.2...
Release complete
```

**After (proposed enhancement):**
```
User: "release update"
🔧 [changelog-manager] Skill auto-activated
Claude: I'll analyze your changes...
   (git status output)
   (git diff output)
🔧 [changelog-manager] Creating release v1.8.2...
✅ Release complete
```

## Use Case

This feature request came from real-world usage where:
1. Auto-activating skills weren't immediately obvious to users
2. Led to confusion about whether the skill had already been invoked
3. Resulted in potential double-triggering when user manually invoked again
4. Made debugging complex workflows (multiple chained skills) difficult

## Technical Implementation Suggestions

### ANSI Color Codes (Terminal)
```bash
Skills:     \033[34m🔧 [skill-name]\033[0m      # Blue
Agents:     \033[35m🤖 [agent-name]\033[0m      # Magenta/Purple
Commands:   \033[32m⚡ [/command]\033[0m        # Green
Success:    \033[32m✅\033[0m                   # Green
Error:      \033[31m❌\033[0m                   # Red
```

### Configuration Option
Allow users to customize or disable colors via settings:
```json
{
  "ui": {
    "colorizeComponents": true,
    "componentColors": {
      "skills": "blue",
      "agents": "purple",
      "commands": "green"
    }
  }
}
```

## Additional Context

- This would align with modern CLI tools (Docker, Kubernetes, etc.) that use colors for different log levels
- Icons already work in most modern terminals (Windows Terminal, iTerm2, VSCode integrated terminal)
- Could be extended to show execution time, status indicators, etc.

## Environment

- **Claude Code CLI version**: Latest
- **OS**: Windows 11 / macOS / Linux
- **Terminal**: Windows Terminal / iTerm2 / VSCode integrated terminal

## Related

This would complement the existing `<command-message>` system and make it more visually apparent to users.
