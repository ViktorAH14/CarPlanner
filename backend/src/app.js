/**
 * Application Entry Point
 * Sets up the main Express application instance, configures middleware,
 * and mounts API routes.
 *
 * This file acts as the bootloader for the backend server.
 * Database connection is established lazily (on first request) to avoid
 * blocking the server startup if the database is temporarily unavailable.
 *
 * @module app
 */

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');

/**
 * Creates the main Express application instance.
 * @type {import('express').Application}
 */
const app = express();

/**
 * Enables Cross-Origin Resource Sharing (CORS).
 * Allows requests from different origins (e.g., frontend running on localhost:3000).
 * By default, allows all origins and methods in this development configuration.
 */
app.use(cors());

/**
 * Middleware to parse incoming JSON payloads.
 * Automatically populates req.body with parsed JSON data for all POST/PUT requests.
 */
app.use(express.json());

/**
 * Mounts the authentication routes under the '/api/auth' prefix.
 * All requests starting with '/api/auth' will be handled by auth.routes.js.
 *
 * Available endpoints:
 * - POST /api/auth/register
 * - POST /api/auth/login
 */
app.use('/api/auth', authRoutes);

// Log server startup status
console.log(
  '✅ Server started. Routes mounted. DB check skipped (will happen on first request).'
);

/**
 * Exports the configured Express application instance.
 * Used by bin/www or server.js to actually listen on a port.
 *
 * @exports
 * @type {import('express').Application}
 */
module.exports = app;
