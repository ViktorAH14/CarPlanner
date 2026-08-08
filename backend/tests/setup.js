/**
 * Global test setup for database initialization and cleanup.
 * This file configures the test environment before all tests run.
 *
 * @module tests/setup
 */

const { sequelize } = require('../src/config/database');
const { log } = require('../src/utils/logger');

// Global setup for all tests
beforeAll(async () => {
  try {
    log('🧪 Preparing test database (dropping and recreating tables)...');

    // Check database connection before synchronization
    await sequelize.authenticate();
    log('✅ Database connection established successfully');

    // Synchronize database schema with force=true to recreate tables
    await sequelize.sync({ force: true });
    log('✅ Test tables ready!');
  } catch (error) {
    log(`❌ Database setup failed: ${error.message}`);
    throw error;
  }
});

// Global teardown for all tests
afterAll(async () => {
  try {
    log('🏁 Tests finished. Closing database connection...');
    await sequelize.close();
  } catch (error) {
    log(`❌ Error closing database connection: ${error.message}`);
  }
});
