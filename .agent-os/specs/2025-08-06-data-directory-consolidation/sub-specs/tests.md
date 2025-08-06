# Tests Specification

This is the tests coverage details for the spec detailed in @.agent-os/specs/2025-08-06-data-directory-consolidation/spec.md

> Created: 2025-08-06
> Version: 1.0.0

## Test Coverage

### Unit Tests

**Data Path Resolution**
- Test DATA_DIR environment variable resolution with custom path
- Test default data directory fallback when DATA_DIR not set
- Test path construction for expense files with year/month parameters
- Test path construction for categories file

**Directory Management**
- Test automatic data directory creation when missing
- Test handling of existing data directory
- Test recursive directory creation for nested paths
- Test permission handling for directory creation failures

**Migration Logic**
- Test detection of existing JSON files in project root
- Test migration of expense files from root to data directory
- Test migration of categories.json from root to data directory
- Test skip migration when target files already exist
- Test migration logging and error handling

### Integration Tests

**API Endpoints with New Paths**
- Test GET /api/expenses reads from data directory
- Test POST /api/expenses saves to data directory
- Test PUT /api/expenses updates files in data directory
- Test DELETE /api/expenses modifies files in data directory
- Test GET /api/categories reads from data directory
- Test POST /api/categories saves to data directory

**Environment Variable Integration**
- Test application startup with custom DATA_DIR environment variable
- Test application startup with default data directory
- Test file operations respect DATA_DIR configuration throughout app lifecycle

**Migration Integration**
- Test full migration workflow from project root to data directory
- Test application functionality after migration completed
- Test no data loss during migration process
- Test application handles missing source files gracefully

### File System Tests

**Cross-Platform Compatibility**
- Test path construction on Unix-like systems
- Test path construction on Windows systems
- Test directory creation across different file systems
- Test file permissions on created directories and files

**Error Handling**
- Test behavior when data directory creation fails due to permissions
- Test behavior when data directory is read-only
- Test behavior when source files are corrupted during migration
- Test graceful handling of partial migration failures

## Mocking Requirements

### File System Operations
- Mock `fs.existsSync` to simulate different file system states
- Mock `fs.mkdirSync` to test directory creation scenarios and failures
- Mock `fs.readFileSync` and `fs.writeFileSync` for file operation testing
- Mock `process.env` to test different DATA_DIR configurations
- Mock `process.cwd()` to test relative path resolution in different contexts

### Migration Scenarios
- Mock existing JSON files in project root for migration testing
- Mock missing data directory to test automatic creation
- Mock existing data directory with conflicting files
- Mock file system errors during migration operations

### Environment Testing
- Mock environment variables for DATA_DIR configuration testing
- Mock different working directory contexts for path resolution testing
- Mock file system permissions for error scenario testing