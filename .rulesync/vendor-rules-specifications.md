---
root: false
targets: ['*']
description: "AI rule specifications for each vendor"
globs: []
---

# Each vendor rules specifications

## GitHub Copilot Custom Instructions

https://code.visualstudio.com/docs/copilot/copilot-customization

### Overview
A mechanism to provide custom instructions to GitHub Copilot in VS Code. Automatically applied to chat requests.

### File Format
- **Workspace**: `.github/copilot-instructions.md`
  - Automatically applied to all chat requests
  - Requires `github.copilot.chat.codeGeneration.useInstructionFiles` setting
- **Project**: `.github/instructions/*.instructions.md`
  - Can specify file application scope with glob patterns
  - Can reference other instruction files

### File Structure
```markdown
---
description: "Brief file description"
applyTo: "**"  # Glob pattern
---

Natural language instruction content
```

### Features
- Combine instructions from multiple files
- Support variables like `${workspaceFolder}`
- Not used in code completion (chat only)

### Best Practices
- Keep instructions short and specific
- Avoid references to external resources
- Split into multiple files by functionality

## Cursor Project Rules

https://docs.cursor.com/context/rules

### Overview
A mechanism to provide project-specific rules and context to Cursor's AI model.

### File Format
- **Location**: `.cursor/rules/` directory
- **Extension**: `.mdc` (Markdown with Context)
- Nested `.cursor/rules` in subdirectories is also possible

### Rule Types
1. **Always**: Always included in model context
2. **Auto Attached**: Applied when files matching glob pattern are referenced
3. **Agent Requested**: Applied when AI determines it's needed (description required)
4. **Manual**: Applied only when explicitly referenced with `@ruleName`

### File Structure
```markdown
---
description: "RPC Service boilerplate"
globs: "**/*.rpc.ts"
alwaysApply: false
---

- Use internal RPC pattern when defining services
- Always use snake_case for service names

@service-template.ts
```

### Features
- Can reference additional files with `@filename`
- Support project-wide and subdirectory-specific rules
- Used for recording domain knowledge, workflow automation, and coding standardization

### Best Practices
- Keep rules concise (500 lines or less recommended)
- Split large concepts into multiple rules
- Include specific examples

## Cline Rules

https://docs.cline.bot/features/cline-rules

### Overview
A mechanism to provide "system-level guidance" to Cline projects and conversations.

### File Format
- **Location**: `.clinerules/` directory or `Documents/Cline/Rules`
- **File Format**: Markdown files

### Creation Methods
1. Click the "+" button in Rules tab
2. Use `/newrule` slash command in chat
3. Manually create Markdown files

### File Structure Best Practices
- Use clear and concise language
- Focus on expected results
- Organize rules by concern (e.g., documentation, coding standards)
- Control file order with numeric prefixes (optional)

### Folder System Features
- Support multiple rule files within `.clinerules/`
- Can maintain inactive rule sets as "rules bank"
- Support context-specific rule activation
- Easy switching between project contexts

### Advanced Management Features
- Cline v3.13 introduces toggleable popover UI
- Instant display and switching of active rules
- Quick rule file creation and management functionality

### Implementation Tips
- Individual rule files should be focused
- Use descriptive file names
- Consider git-ignoring active `.clinerules/` folder
- Create team scripts for rule combinations

## Roo Code Rules

https://docs.roocode.com/features/custom-instructions

### Overview
A mechanism to provide custom instructions to Roo Code for personalized behavior regarding coding style, workflow, and decision-making processes.

### File Format
- **Workspace-Wide**: `.roo/rules/` directory (preferred) or `.roorules` file
- **Mode-Specific**: `.roo/rules-{modeSlug}/` directory (preferred) or `.roorules-{modeSlug}` file
- **File Types**: Markdown (`.md`) or text (`.txt`) files

### Instruction Hierarchy
1. Language Preference
2. Global Instructions (via Prompts tab)
3. Mode-Specific Instructions
4. Mode-Specific Rule Files
5. Workspace-Wide Rule Files

### File Structure
```
.roo/
├── rules/
│   ├── coding-style.md
│   ├── testing.md
│   └── documentation.md
└── rules-typescript/
    ├── specific-patterns.md
    └── type-safety.md
```

### Features
- Recursive file loading from directories
- Alphabetical file processing order
- Complementary rule interaction
- Team-standardized rule sharing via version control
- Mode-specific customization support

### Best Practices
- Use directory-based methods for team standardization
- Organize instructions into multiple focused files
- Provide clear, specific guidance
- Version control rule files for team consistency
- Combine with Custom Modes for specialized environments

## Claude Code Memories

https://docs.anthropic.com/en/docs/claude-code/memory

### Overview
A memory system that provides project-specific and user-specific context and instructions to Claude Code.

### Memory Types
1. **Project Memory** (`./CLAUDE.md`): Team-shared project instructions
2. **User Memory** (`~/.claude/CLAUDE.md`): Personal settings common to all projects
3. **Project Memory (Local)**: Deprecated

### Key Features
- Automatically loaded when Claude Code starts
- Can import other files using `@path/to/import` syntax
- Supports relative and absolute path imports
- Maximum import depth is 5 hops

### Memory File Best Practices
- Include specific instructions
- Use structured Markdown with bullet points
- Organize under descriptive headings
- Review and update regularly

### Quick Add Features
- Quick memory addition with `#` at the beginning of lines
- Edit memory files with system editor using `/memory` command

### Search Mechanism
- Recursive search from current working directory to root
- Discover CLAUDE.md files in subtrees when reading specific file regions
