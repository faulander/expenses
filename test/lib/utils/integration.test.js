import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { 
  getDataDir, 
  getExpenseFilePath, 
  getCategoriesFilePath,
  ensureDataDirectory 
} from '../../../src/lib/utils/dataDirectory.js';
import { 
  isMigrationNeeded, 
  performDataDirectoryMigration 
} from '../../../src/lib/utils/migration.js';

describe('Data Directory Integration', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('Complete Workflow', () => {
    it('should handle data directory setup with default configuration', () => {
      delete process.env.DATA_DIR;
      
      // Test data directory path resolution
      const dataDir = getDataDir();
      expect(dataDir).toMatch(/\/data$/);
      
      // Test file path generation
      const expensePath = getExpenseFilePath(2024, 3);
      expect(expensePath).toMatch(/\/data\/expenses_2024_03\.json$/);
      
      const categoriesPath = getCategoriesFilePath();
      expect(categoriesPath).toMatch(/\/data\/categories\.json$/);
      
      // Test directory creation function exists
      expect(typeof ensureDataDirectory).toBe('function');
    });

    it('should handle data directory setup with custom configuration', () => {
      process.env.DATA_DIR = '/custom/data/path';
      
      // Test custom data directory path resolution
      const dataDir = getDataDir();
      expect(dataDir).toBe('/custom/data/path');
      
      // Test file paths with custom directory
      const expensePath = getExpenseFilePath(2024, 12);
      expect(expensePath).toBe('/custom/data/path/expenses_2024_12.json');
      
      const categoriesPath = getCategoriesFilePath();
      expect(categoriesPath).toBe('/custom/data/path/categories.json');
    });

    it('should handle migration workflow', () => {
      // Test migration detection
      const migrationNeeded = isMigrationNeeded();
      expect(typeof migrationNeeded).toBe('boolean');
      
      // Test migration execution
      const migrationResults = performDataDirectoryMigration();
      expect(migrationResults).toHaveProperty('migrated');
      expect(migrationResults).toHaveProperty('errors');
      expect(Array.isArray(migrationResults.migrated)).toBe(true);
      expect(Array.isArray(migrationResults.errors)).toBe(true);
    });

    it('should maintain consistency across different modules', () => {
      process.env.DATA_DIR = './test/data';
      
      // All modules should resolve to the same data directory
      const dataDir = getDataDir();
      
      const expensePath = getExpenseFilePath(2025, 1);
      const categoriesPath = getCategoriesFilePath();
      
      // Both file paths should use the same base directory
      expect(expensePath.startsWith(dataDir)).toBe(true);
      expect(categoriesPath.startsWith(dataDir)).toBe(true);
    });
  });

  describe('Environment Variable Handling', () => {
    it('should handle various DATA_DIR formats consistently', () => {
      const testCases = [
        { input: '/absolute/path', expected: '/absolute/path' },
        { input: './relative/path', shouldContain: 'relative/path' },
        { input: '../parent/path', shouldContain: 'parent/path' }
      ];

      testCases.forEach(({ input, expected, shouldContain }) => {
        process.env.DATA_DIR = input;
        const result = getDataDir();
        
        if (expected) {
          expect(result).toBe(expected);
        } else if (shouldContain) {
          expect(result).toMatch(new RegExp(shouldContain));
        }
      });
    });
  });
});