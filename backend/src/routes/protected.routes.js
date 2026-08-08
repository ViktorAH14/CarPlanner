/**
 * Protected Routes
 * Example routes that require valid JWT authentication.
 * Demonstrates how to attach the auth middleware to specific endpoints.
 *
 * @module routes/protected.routes
 */

const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth.middleware');

/**
 * GET /api/profile
 * Returns user data from the token payload.
 * Requires valid Authorization header.
 *
 * @returns {Object} JSON response with user details from the token.
 */
router.get('/profile', authenticateToken, (req, res) => {
  // req.user is populated by the middleware
  return res.json({
    message: 'Profile accessed successfully',
    data: {
      id: req.user.id,
      email: req.user.email,
    },
  });
});

/**
 * POST /api/data
 * Example write operation requiring authentication.
 *
 * @returns {Object} Success message.
 */
router.post('/data', authenticateToken, (req, res) => {
  return res.json({
    message: 'Data created successfully',
    userId: req.user.id, // Accessing user ID from token
  });
});

module.exports = router;
