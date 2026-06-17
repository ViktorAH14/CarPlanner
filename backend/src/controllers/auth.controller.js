/**
 * Auth Controller
 * Handles HTTP requests for authentication endpoints.
 * Maps routes to service layer logic and formats JSON responses with standardized error codes.
 *
 * @module controllers/auth.controller
 */

const authService = require('../services/auth.service');

/**
 * Handles user registration POST request.
 * Creates a new user and returns 201 Created.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'VALIDATION_EMAIL_PASSWORD_REQUIRED',
        message: 'Email and password are required',
      });
    }

    const user = await authService.registerUser(
      email,
      password,
      firstName,
      lastName
    );

    return res.status(201).json({
      message: 'User successfully registered',
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    if (error.code === 'CONFLICT_EMAIL_EXISTS') {
      return res.status(409).json({
        error: error.code,
        message: 'A user with this email already exists',
      });
    }

    console.error(error);
    return res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Something went wrong',
    });
  }
};

/**
 * Handles user login POST request.
 * Verifies credentials and returns user data with JWT token.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'VALIDATION_LOGIN_CREDENTIALS_REQUIRED',
        message: 'Email and password are required',
      });
    }

    // loginUser now returns { user, token }
    const result = await authService.loginUser(email, password);

    return res.json({
      message: 'Login successful',
      data: {
        user: result.user,
        token: result.token,
      },
    });
  } catch (error) {
    // Generic 401 for any auth failure (security best practice)
    if (error.code === 'AUTH_INVALID_CREDENTIALS') {
      return res.status(401).json({
        error: error.code,
        message: 'Invalid email or password',
      });
    }

    console.error(error);
    return res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Something went wrong',
    });
  }
};
