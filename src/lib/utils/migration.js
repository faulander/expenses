import { existsSync, readdirSync } from 'fs';
import { join } from 'path';
import {
  getOldCategoriesFilePath,
  getCategoriesFilePath,
  getOldExpenseFilePath,
  getExpenseFilePath,
  migrateFileToDataDir,
  ensureDataDirectory
} from './dataDirectory.js';

/**
 * Check if data directory migration is needed
 * @returns {boolean} True if migration is needed
 */
export function isMigrationNeeded() {
  // Check if categories.json exists in root
  const oldCategoriesPath = getOldCategoriesFilePath();
  if (existsSync(oldCategoriesPath)) {
    return true;
  }

  // Check for any expense files in root
  const rootDir = process.cwd();
  try {
    const files = readdirSync(rootDir);
    const expenseFiles = files.filter(file => 
      file.match(/^expenses_\d{4}_\d{2}\.json$/)
    );
    return expenseFiles.length > 0;
  } catch (error) {
    console.error('Error reading root directory:', error);
    return false;
  }
}

/**
 * Perform data directory migration for all files
 * @returns {Object} Migration results with migrated files and errors
 */
export function performDataDirectoryMigration() {
  const results = {
    migrated: [],
    errors: []
  };

  try {
    // Ensure data directory exists
    ensureDataDirectory();

    // Migrate categories.json
    const oldCategoriesPath = getOldCategoriesFilePath();
    const newCategoriesPath = getCategoriesFilePath();
    
    if (migrateFileToDataDir(oldCategoriesPath, newCategoriesPath)) {
      results.migrated.push('categories.json');
      console.log('✅ Migrated categories.json to data directory');
    }

    // Find and migrate expense files
    const rootDir = process.cwd();
    try {
      const files = readdirSync(rootDir);
      const expenseFiles = files.filter(file => 
        file.match(/^expenses_(\d{4})_(\d{2})\.json$/)
      );

      for (const filename of expenseFiles) {
        const match = filename.match(/^expenses_(\d{4})_(\d{2})\.json$/);
        if (match) {
          const year = parseInt(match[1]);
          const month = parseInt(match[2]);
          
          const oldPath = getOldExpenseFilePath(year, month);
          const newPath = getExpenseFilePath(year, month);
          
          if (migrateFileToDataDir(oldPath, newPath)) {
            results.migrated.push(filename);
            console.log(`✅ Migrated ${filename} to data directory`);
          } else {
            results.errors.push(`Failed to migrate ${filename}`);
            console.error(`❌ Failed to migrate ${filename}`);
          }
        }
      }
    } catch (error) {
      results.errors.push(`Error reading directory: ${error.message}`);
      console.error('Error reading root directory during migration:', error);
    }

  } catch (error) {
    results.errors.push(`Migration setup error: ${error.message}`);
    console.error('Error during migration setup:', error);
  }

  return results;
}

/**
 * Check and perform migration if needed during app startup
 * @returns {Object} Migration results or null if no migration was needed
 */
export function checkAndMigrate() {
  if (!isMigrationNeeded()) {
    return null;
  }

  console.log('🔄 Data directory migration needed. Starting migration...');
  const results = performDataDirectoryMigration();

  if (results.migrated.length > 0) {
    console.log(`✅ Migration completed. ${results.migrated.length} files migrated.`);
    if (results.migrated.length > 0) {
      console.log('Migrated files:', results.migrated.join(', '));
    }
  }

  if (results.errors.length > 0) {
    console.warn('⚠️  Some migration errors occurred:');
    results.errors.forEach(error => console.warn(`  - ${error}`));
  }

  return results;
}