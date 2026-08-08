/**
 * Logger utility module for consistent logging across the application.
 * Provides a simple log function with timestamp formatting.
 *
 * @module utils/logger
 */

/**
 * Logs a message with timestamp prefix
 * @param {string} message - The message to log
 */
const log = message => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};

module.exports = {
  log,
};
