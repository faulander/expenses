# Spec Requirements Document

> Spec: Data Directory Consolidation for Docker Compatibility
> Created: 2025-08-06
> Status: Planning

## Overview

Consolidate all JSON data files into a centralized root-level `./data/` directory to improve Docker volume mounting and simplify data management. This change will move expense files (expenses_YYYY_MM.json) and categories.json from the project root to a dedicated data directory while maintaining full backward compatibility during migration.

## User Stories

### Data Management Simplification

As a **system administrator**, I want to mount a single data directory as a Docker volume, so that all persistent data is centralized and easily manageable for backups and deployments.

**Workflow:** Admin configures docker-compose.yml to mount `./data:/app/data` and all expense and category data persists in one location. Backups become as simple as copying the data directory, and different environments can use different data directories without affecting the application code.

### Development Environment Consistency

As a **developer**, I want data files organized in a predictable directory structure, so that I can easily locate, backup, and manage application data across different deployment scenarios.

**Workflow:** Developer can run the app locally with data stored in `./data/`, deploy with Docker using the same path structure, and migrate between environments by simply copying the data directory.

## Spec Scope

1. **Create data directory structure** - Establish `./data/` as the root-level data storage location
2. **Update expense file paths** - Modify expense API to use `./data/expenses_YYYY_MM.json` pattern
3. **Update categories file path** - Move categories.json to `./data/categories.json`
4. **Environment variable support** - Add DATA_DIR environment variable for configurable data location
5. **Migration script** - Create utility to migrate existing JSON files to new structure
6. **Docker configuration update** - Update Dockerfile and docker-compose.yml for new data directory

## Out of Scope

- Database migration (this remains in Phase 1 of roadmap)
- Data format changes (JSON structure remains identical)
- API endpoint changes (endpoints remain the same, only file paths change)
- User interface modifications (no UI changes needed)

## Expected Deliverable

1. **All data files consolidated** - Browser can save and retrieve expenses with data stored in `./data/` directory
2. **Docker volume mounting works seamlessly** - Docker compose can mount external data directory for data persistence
3. **Backward compatibility maintained** - Existing JSON files are automatically migrated without data loss
4. **Environment configurability** - DATA_DIR environment variable allows custom data directory location

## Spec Documentation

- Tasks: @.agent-os/specs/2025-08-06-data-directory-consolidation/tasks.md
- Technical Specification: @.agent-os/specs/2025-08-06-data-directory-consolidation/sub-specs/technical-spec.md
- Tests Specification: @.agent-os/specs/2025-08-06-data-directory-consolidation/sub-specs/tests.md