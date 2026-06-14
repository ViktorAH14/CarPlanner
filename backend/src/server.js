/**
 * Server Entry Point
 * Configures and starts the Express HTTP server.
 * Handles port configuration, startup logging, and environment validation.
 *
 * This file is the actual process entry point (e.g., run via `node src/server.js`).
 * It imports the configured app instance from `app.js` and binds it to a network port.
 *
 * @module server
 */

const app = require('./app.js');

/**
 * Determines the port number for the server to listen on.
 * Prioritizes the PORT environment variable; defaults to 3000 if not set.
 *
 * @type {number}
 */
const PORT = process.env.PORT || 3000;

/**
 * Starts the HTTP server and listens for incoming connections.
 * Logs a success message once the server is bound to the port.
 *
 * Note: Database connection is not verified here (lazy loading strategy).
 * The first request will trigger the DB connection attempt.
 */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Log database URL presence for quick debugging
console.log('🔗 DB URL configured:', !!process.env.DATABASE_URL ? 'YES' : 'NO');

/**
 * Validates the presence of the DATABASE_URL environment variable.
 * Prints a warning if missing, as the application will fail on the first DB query.
 *
 * This check is a development safeguard to catch misconfigured .env files early.
 */
if (!process.env.DATABASE_URL) {
  console.warn(
    '⚠️ WARNING: DATABASE_URL is not set! The server will start, but will crash on the first database request.'
  );
}
