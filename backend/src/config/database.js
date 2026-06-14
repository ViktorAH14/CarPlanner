/**
 * Database Configuration Module
 * Sets up the Sequelize connection instance with environment-aware settings.
 *
 * Automatically selects the correct database URL based on NODE_ENV:
 * - 'test': Uses TEST_DATABASE_URL for isolated testing.
 * - Otherwise: Uses DATABASE_URL for development or production.
 *
 * @module config/database
 */

const { Sequelize } = require('sequelize');

/**
 * Determines the database connection URL based on the current environment.
 * Prioritizes TEST_DATABASE_URL when running tests to avoid polluting the main DB.
 *
 * @type {string}
 * @throws {Error} Throws an error if neither DATABASE_URL nor TEST_DATABASE_URL is defined.
 */
const dbUrl =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error(
    '❌ Configuration Error: DATABASE_URL or TEST_DATABASE_URL environment variable is missing'
  );
}
/**
 * Creates and configures the Sequelize instance for PostgreSQL.
 *
 * Configuration details:
 * - logging: Disabled during tests (NODE_ENV=test) to keep Jest output clean.
 *   Enabled in dev/prod for debugging SQL queries.
 * - pool: Connection pool settings to manage concurrent connections efficiently.
 *
 * @type {Sequelize}
 */
const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  /**
   * Controls SQL query logging.
   * Set to false in test mode to prevent noise in test reports.
   */
  logging: process.env.NODE_ENV !== 'test' ? console.log : false,

  /**
   * Connection pool configuration.
   * @typedef {Object} PoolConfig
   * @property {number} max - Maximum number of connections in the pool.
   * @property {number} min - Minimum number of connections to maintain.
   * @property {number} acquire - Maximum time (ms) to acquire a connection.
   * @property {number} idle - Maximum time (ms) a connection can sit idle.
   */
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
});

/**
 * Exports the configured Sequelize instance.
 * Import this module as: const { sequelize } = require('../config/database');
 *
 * @exports
 * @type {{ sequelize: Sequelize }}
 */
module.exports = { sequelize };
