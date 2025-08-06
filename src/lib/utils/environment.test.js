import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getDataDir } from './dataDirectory.js';

describe('Environment Configuration', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('DATA_DIR Environment Variable', () => {
    it('should use default data directory when DATA_DIR is not set', () => {
      delete process.env.DATA_DIR;
      const result = getDataDir();
      expect(result).toMatch(/\/data$/);
    });

    it('should use absolute DATA_DIR path when provided', () => {
      process.env.DATA_DIR = '/custom/absolute/path';
      const result = getDataDir();
      expect(result).toBe('/custom/absolute/path');
    });

    it('should resolve relative DATA_DIR path from cwd', () => {
      process.env.DATA_DIR = './relative/path';
      const result = getDataDir();
      expect(result).toMatch(/\/relative\/path$/);
      expect(result).toMatch(new RegExp(`${process.cwd().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/relative/path$`));
    });

    it('should handle DATA_DIR with trailing slash', () => {
      process.env.DATA_DIR = '/custom/path/';
      const result = getDataDir();
      expect(result).toBe('/custom/path/');
    });

    it('should handle empty DATA_DIR by falling back to default', () => {
      process.env.DATA_DIR = '';
      const result = getDataDir();
      expect(result).toMatch(/\/data$/);
    });
  });
});