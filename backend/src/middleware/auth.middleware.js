/**
 * Authentication Middleware
 * Validates JWT tokens attached to incoming requests.
 * Attaches decoded user payload to req.user for downstream controllers.
 * Uses standardized error codes for consistent API responses.
 *
 * @module middleware/auth.middleware
 */

const jwt = require('jsonwebtoken');

/**
 * Standardized Error Codes for Auth Middleware
 * @readonly
 * @enum {string}
 */
const ERRORS = {
  MISSING_TOKEN: 'AUTH_MISSING_TOKEN',
  INVALID_TOKEN: 'AUTH_INVALID_TOKEN',
};

/**
 * Express middleware function to verify JWT token.
 *
 * Expected Header Format: Authorization: Bearer <token>
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Next middleware function.
 * @returns {void}
 */
const authenticateToken = (req, res, next) => {
  // 1. Check if Authorization header exists
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Split 'Bearer <token>'

  if (!token) {
    const error = new Error('Access token is missing');
    error.code = ERRORS.MISSING_TOKEN;
    return next(error);
  }

  try {
    // 2. Verify token signature using JWT_SECRET from environment variables
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT_SECRET is not configured');
    }

    const payload = jwt.verify(token, secret);

    // 3. Attach payload to req.user for subsequent handlers
    req.user = payload;

    // Token is valid, proceed to next middleware/controller
    next();
  } catch (error) {
    // Handle invalid or expired tokens
    const authError = new Error('Invalid or expired access token');
    authError.code = ERRORS.INVALID_TOKEN;
    return next(authError);
  }
};

module.exports = { authenticateToken };
