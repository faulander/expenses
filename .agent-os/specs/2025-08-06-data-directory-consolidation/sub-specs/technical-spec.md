# Technical Specification

This is the technical specification for the spec detailed in @.agent-os/specs/2025-08-06-data-directory-consolidation/spec.md

> Created: 2025-08-06
> Version: 1.0.0

## Technical Requirements

### File Path Updates

- **Expense Files**: Change from `process.cwd()/expenses_YYYY_MM.json` to `${DATA_DIR}/expenses_YYYY_MM.json`
- **Categories File**: Change from `process.cwd()/categories.json` to `${DATA_DIR}/categories.json`
- **Environment Variable**: Support `DATA_DIR` env var with default fallback to `./data`
- **Directory Creation**: Automatically create data directory if it doesn't exist
- **Cross-Platform Compatibility**: Use Node.js path.join() for all path construction

### API Layer Changes

- **No Breaking Changes**: All existing API endpoints (`/api/expenses`, `/api/categories`) remain unchanged
- **Path Resolution**: Update `getExpenseFileName()` function to use new data directory
- **Error Handling**: Add proper error handling for directory creation and file access
- **Backward Compatibility**: Detect and migrate existing JSON files from project root

### Migration Logic

- **Automatic Migration**: On first startup, detect existing JSON files in project root
- **Safe Migration**: Move files only if they don't already exist in data directory
- **Migration Logging**: Console log successful migrations for transparency
- **Rollback Safety**: Never delete original files until migration is confirmed successful

## Approach Options

**Option A: Environment Variable with Default** (Selected)
- Pros: Configurable for different environments, maintains Docker compatibility, allows development flexibility
- Cons: Requires environment variable management

**Option B: Hard-coded ./data Path**
- Pros: Simple, no configuration needed
- Cons: Less flexible for different deployment scenarios

**Option C: Configuration File Approach**
- Pros: More configuration options
- Cons: Adds complexity, requires additional file management

**Rationale:** Option A provides the best balance of simplicity and flexibility. The DATA_DIR environment variable allows Docker deployments to easily configure data location while defaulting to a sensible `./data` location for development.

## External Dependencies

No new external dependencies required. All functionality uses existing Node.js built-in modules:
- `fs` (existsSync, readFileSync, writeFileSync, mkdirSync)
- `path` (join, resolve)
- `process` (env, cwd)

## Implementation Details

### Data Directory Resolution
```javascript
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');
```

### Directory Initialization
```javascript
if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true });
}
```

### Migration Strategy
1. Check for existing files in project root
2. If found and data directory versions don't exist, move them
3. Log migration actions
4. Update all file operations to use new paths

### File Operation Pattern
All file operations will follow this pattern:
```javascript
const filePath = path.join(DATA_DIR, filename);
```

## Configuration Updates

### Docker Compose
Volume mount remains: `./data:/app/data` (already correct)

### Environment Variables
- `DATA_DIR`: Custom data directory path (default: `./data`)
- Backward compatible: existing deployments continue working without changes