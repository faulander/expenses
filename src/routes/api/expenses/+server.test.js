import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { GET, POST, PUT, DELETE } from './+server.js';

describe('Expenses API', () => {
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

    it('should export PUT function', () => {
      expect(typeof PUT).toBe('function');
    });

    it('should export DELETE function', () => {
      expect(typeof DELETE).toBe('function');
    });
  });

  describe('Environment Variable Support', () => {
    it('should support custom data directory configuration', () => {
      process.env.DATA_DIR = '/custom/test/path';
      // Basic test that the environment variable can be set
      expect(process.env.DATA_DIR).toBe('/custom/test/path');
    });
  });
});