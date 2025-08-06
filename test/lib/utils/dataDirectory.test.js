import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  getDataDir,
  getExpenseFilePath,
  getCategoriesFilePath
} from '../../../src/lib/utils/dataDirectory.js';

describe('Data Directory Utilities', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('getDataDir', () => {
    it('should return default data directory when no environment variable is set', () => {
      delete process.env.DATA_DIR;
      const result = getDataDir();
      expect(result).toMatch(/\/data$/);
    });

    it('should return custom data directory when DATA_DIR environment variable is set', () => {
      process.env.DATA_DIR = '/custom/data/path';
      const result = getDataDir();
      expect(result).toBe('/custom/data/path');
    });

    it('should handle relative paths in DATA_DIR', () => {
      process.env.DATA_DIR = './custom-data';
      const result = getDataDir();
      expect(result).toMatch(/\/custom-data$/);
    });
  });

  describe('getExpenseFilePath', () => {
    it('should generate correct expense file path with proper padding', () => {
      const result = getExpenseFilePath(2024, 3);
      expect(result).toMatch(/expenses_2024_03\.json$/);
    });

    it('should handle months without padding needed', () => {
      const result = getExpenseFilePath(2024, 12);
      expect(result).toMatch(/expenses_2024_12\.json$/);
    });

    it('should use custom data directory if set', () => {
      process.env.DATA_DIR = '/custom/path';
      const result = getExpenseFilePath(2025, 1);
      expect(result).toBe('/custom/path/expenses_2025_01.json');
    });
  });

  describe('getCategoriesFilePath', () => {
    it('should return correct categories file path', () => {
      const result = getCategoriesFilePath();
      expect(result).toMatch(/\/categories\.json$/);
    });

    it('should use custom data directory if set', () => {
      process.env.DATA_DIR = '/custom/categories';
      const result = getCategoriesFilePath();
      expect(result).toBe('/custom/categories/categories.json');
    });
  });
});