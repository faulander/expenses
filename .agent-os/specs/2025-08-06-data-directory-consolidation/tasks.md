# Spec Tasks

These are the tasks to be completed for the spec detailed in @.agent-os/specs/2025-08-06-data-directory-consolidation/spec.md

> Created: 2025-08-06
> Status: Ready for Implementation

## Tasks

- [ ] 1. Create Data Directory Utility Module
  - [ ] 1.1 Write tests for data directory path resolution with environment variables
  - [ ] 1.2 Create src/lib/utils/dataPath.js with DATA_DIR resolution logic
  - [ ] 1.3 Implement automatic data directory creation with error handling
  - [ ] 1.4 Add cross-platform path construction utilities
  - [ ] 1.5 Verify all tests pass for data directory utilities

- [ ] 2. Implement Data Migration System
  - [ ] 2.1 Write tests for existing file detection and migration logic
  - [ ] 2.2 Create migration utility function to move files from root to data directory
  - [ ] 2.3 Implement safe migration with file existence checking and logging
  - [ ] 2.4 Add migration error handling and rollback safety
  - [ ] 2.5 Verify all tests pass for migration functionality

- [ ] 3. Update Expenses API for New Data Directory
  - [ ] 3.1 Write tests for updated expense file path resolution
  - [ ] 3.2 Update getExpenseFileName() function to use new data directory path
  - [ ] 3.3 Update loadExpenses() and saveExpenses() to use new paths
  - [ ] 3.4 Add migration check on API initialization to move existing files
  - [ ] 3.5 Verify all tests pass for expense API with new paths

- [ ] 4. Update Categories API for New Data Directory
  - [ ] 4.1 Write tests for updated categories file path resolution
  - [ ] 4.2 Update CATEGORIES_FILE constant to use new data directory path
  - [ ] 4.3 Update categories initialization to check data directory first
  - [ ] 4.4 Add migration logic for existing categories.json file
  - [ ] 4.5 Verify all tests pass for categories API with new paths

- [ ] 5. Environment Variable Configuration
  - [ ] 5.1 Write tests for DATA_DIR environment variable handling
  - [ ] 5.2 Add DATA_DIR environment variable documentation to README
  - [ ] 5.3 Update Docker configuration examples with DATA_DIR usage
  - [ ] 5.4 Test application startup with and without DATA_DIR set
  - [ ] 5.5 Verify all environment variable tests pass

- [ ] 6. Integration Testing and Documentation
  - [ ] 6.1 Write comprehensive integration tests for full data directory workflow
  - [ ] 6.2 Test Docker deployment with new data directory structure
  - [ ] 6.3 Update README with new data directory information and migration notes
  - [ ] 6.4 Add .gitignore entry for /data directory to exclude from version control
  - [ ] 6.5 Verify all integration tests pass and documentation is complete