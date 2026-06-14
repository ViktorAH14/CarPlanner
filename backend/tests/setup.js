/**
 * Test Environment Setup & Teardown
 * Configures the database connection for the test suite lifecycle.
 *
 * This file handles the global setup (beforeAll) and cleanup (afterAll) hooks
 * for all integration tests. It ensures a clean database state before tests run
 * and properly closes the connection afterwards.
 *
 * Strategy:
 * - beforeAll: Syncs the database with { force: true }, dropping and recreating
 *   all tables. This guarantees a pristine environment for every test run.
 * - afterAll: Closes the Sequelize connection to prevent hanging processes.
 *
 * @module tests/setup
 */

const { sequelize } = require('../src/config/database');

/**
 * Executed once before all tests in the suite.
 * Initializes the test database by forcing a schema sync.
 *
 * ⚠️ WARNING: { force: true } drops all existing tables in the connected database.
 * Ensure DATABASE_URL points to a dedicated TEST database, never to production.
 */
beforeAll(async () => {
  console.log('🧪 Preparing test database (dropping and recreating tables)...');

  // Force sync recreates the schema, ensuring tests start with a clean slate.
  // In a real production scenario, never use { force: true }.
  await sequelize.sync({ force: true });

  console.log('✅ Test tables ready!');
});

/**
 * Executed once after all tests in the suite have completed.
 * Properly closes the database connection to allow the Node process to exit cleanly.
 */
afterAll(async () => {
  console.log('🏁 Tests finished. Closing database connection...');
  await sequelize.close();
});
