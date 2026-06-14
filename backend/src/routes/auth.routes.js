/**
 * Authentication Routes
 * Defines the public API endpoints for user authentication (registration and login).
 *
 * This module sets up Express routes that delegate business logic to auth.controller.
 *
 * @module routes/auth.routes
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

/**
 * POST /auth/register
 * Registers a new user in the system.
 * Expects JSON body: { email, password, firstName?, lastName? }
 * Returns 201 on success, 400/409 on validation/conflict errors.
 *
 * @route POST /register
 * @group Auth - Authentication
 * @param {string} email.body.required - User's email address.
 * @param {string} password.body.required - User's password (plain text).
 * @param {string} [firstName.body] - Optional first name.
 * @param {string} [lastName.body] - Optional last name.
 * @returns {Object} 201 - Success response with user data.
 * @returns {Error} 400 - Validation error (missing fields).
 * @returns {Error} 409 - Conflict error (email already exists).
 */
router.post('/register', authController.register);

/**
 * POST /auth/login
 * Authenticates an existing user and returns user data.
 * Expects JSON body: { email, password }
 * Returns 200 on success, 401 on invalid credentials.
 *
 * @route POST /login
 * @group Auth - Authentication
 * @param {string} email.body.required - User's email address for login.
 * @param {string} password.body.required - User's password for login.
 * @returns {Object} 200 - Success response with user data.
 * @returns {Error} 400 - Validation error (missing fields).
 * @returns {Error} 401 - Unauthorized error (invalid credentials).
 */
router.post('/login', authController.login);

module.exports = router;
