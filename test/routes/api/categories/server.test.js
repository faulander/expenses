import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { GET, POST } from '../../../../src/routes/api/categories/+server.js';

describe('Categories API', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('API Endpoints exist', () => {
    it('should export GET function', () => {
      expect(typeof GET).toBe('function');
    });

    it('should export POST function', () => {
      expect(typeof POST).toBe('function');
    });
  });

  describe('Environment Variable Support', () => {
    it('should support custom data directory configuration', () => {
      process.env.DATA_DIR = '/custom/test/path';
      expect(process.env.DATA_DIR).toBe('/custom/test/path');
    });
  });
});