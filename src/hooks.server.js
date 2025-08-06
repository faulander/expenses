import { checkAndMigrate } from '$lib/utils/migration.js';

// Perform migration check on server startup
let migrationPerformed = false;

export async function handle({ event, resolve }) {
  // Only run migration once during server startup
  if (!migrationPerformed) {
    try {
      checkAndMigrate();
      migrationPerformed = true;
    } catch (error) {
      console.error('Migration check failed:', error);
    }
  }

  const response = await resolve(event);
  return response;
}