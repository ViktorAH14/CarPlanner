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

const protectedRoutes = require('./routes/protected.routes');
app.use('/api/protected', protectedRoutes);

// Log server startup status
console.log(
  '✅ Server started. Routes mounted. DB check skipped (will happen on first request).'
);

/**
 * Global Error Handler Middleware
 * Catches errors thrown by services, controllers, or other middlewares.
 * Formats standardized error codes into JSON responses.
 * Must be the last middleware in the chain.
 *
 * @param {Error} err - The error object thrown.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Next function (not used here).
 * @returns {void}
 */
app.use((err, req, res, next) => {
  console.error('Global Error:', err);

  // If the error has a specific code, use it
  if (err.code) {
    switch (err.code) {
      case 'CONFLICT_EMAIL_EXISTS':
        return res.status(409).json({
          error: err.code,
          message: 'A user with this email already exists',
        });
      case 'AUTH_INVALID_CREDENTIALS':
        return res
          .status(401)
          .json({ error: err.code, message: 'Invalid email or password' });
      case 'AUTH_MISSING_TOKEN':
        return res
          .status(401)
          .json({ error: err.code, message: 'Access token is required' });
      case 'AUTH_INVALID_TOKEN':
        return res
          .status(401)
          .json({ error: err.code, message: 'Invalid or expired token' });
      default:
        // Fallback for unknown codes
        return res
          .status(500)
          .json({ error: 'INTERNAL_SERVER_ERROR', message: err.message });
    }
  }

  // Fallback for errors without codes
  res
    .status(500)
    .json({ error: 'INTERNAL_SERVER_ERROR', message: 'Something went wrong' });
});

/**
 * Exports the configured Express application instance.
 * Used by bin/www or server.js to actually listen on a port.
 *
 * @exports
 * @type {import('express').Application}
 */
module.exports = app;
