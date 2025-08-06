import { existsSync, readFileSync, writeFileSync, mkdirSync, unlinkSync } from 'fs';
import { join } from 'path';

/**
 * Get the data directory path based on environment variable or default
 * @returns {string} The data directory path
 */
export function getDataDir() {
  const customDataDir = process.env.DATA_DIR;
  if (customDataDir) {
    // If DATA_DIR is absolute, use it as is; otherwise, join with cwd
    return customDataDir.startsWith('/') ? customDataDir : join(process.cwd(), customDataDir);
  }
  return join(process.cwd(), 'data');
}

/**
 * Get the full path for an expense file
 * @param {number} year - The year
 * @param {number} month - The month (1-12)
 * @returns {string} The full path to the expense file
 */
export function getExpenseFilePath(year, month) {
  const fileName = `expenses_${year}_${month.toString().padStart(2, '0')}.json`;
  return join(getDataDir(), fileName);
}

/**
 * Get the full path for the categories file
 * @returns {string} The full path to the categories file
 */
export function getCategoriesFilePath() {
  return join(getDataDir(), 'categories.json');
}

/**
 * Ensure the data directory exists, create it if it doesn't
 */
export function ensureDataDirectory() {
  const dataDir = getDataDir();
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }
}

/**
 * Migrate a file from old path to new path in data directory
 * @param {string} oldPath - The current file path
 * @param {string} newPath - The new file path in data directory
 * @returns {boolean} True if migration was successful, false otherwise
 */
export function migrateFileToDataDir(oldPath, newPath) {
  try {
    // Check if old file exists and new file doesn't exist
    if (!existsSync(oldPath) || existsSync(newPath)) {
      return false;
    }

    // Read the old file content
    const fileContent = readFileSync(oldPath, 'utf-8');
    
    // Ensure data directory exists
    ensureDataDirectory();
    
    // Write to new location
    writeFileSync(newPath, fileContent);
    
    // Optionally remove old file (commented out for safety during migration)
    // unlinkSync(oldPath);
    
    return true;
  } catch (error) {
    console.error(`Migration failed from ${oldPath} to ${newPath}:`, error);
    return false;
  }
}

/**
 * Get the old expense file path (for migration purposes)
 * @param {number} year - The year
 * @param {number} month - The month (1-12)
 * @returns {string} The old expense file path
 */
export function getOldExpenseFilePath(year, month) {
  const fileName = `expenses_${year}_${month.toString().padStart(2, '0')}.json`;
  return join(process.cwd(), fileName);
}

/**
 * Get the old categories file path (for migration purposes)
 * @returns {string} The old categories file path
 */
export function getOldCategoriesFilePath() {
  return join(process.cwd(), 'categories.json');
}