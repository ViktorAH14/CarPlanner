/**
 * Authentication Controller
 * Handles user registration and login.
 * Returns standardized error codes (e.g., VALIDATION_...) instead of human-readable messages
 * to allow frontend localization.
 *
 * @module controllers/auth.controller
 */

const authService = require('../services/auth.service');

/**
 * Handles user registration requests.
 *
 * Expected Body: { email: string, password: string, firstName?: string, lastName?: string }
 *
 * Success Response (201):
 * {
 *   message: "User successfully registered", // Technical message (can be localized too)
 *   data: { id, email, firstName, lastName }
 * }
 *
 * Error Responses:
 * - 400: { error: "VALIDATION_EMAIL_PASSWORD_REQUIRED" }
 * - 409: { error: "CONFLICT_EMAIL_EXISTS" }
 * - 500: { error: "INTERNAL_SERVER_ERROR" }
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {void}
 */
exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'VALIDATION_EMAIL_PASSWORD_REQUIRED',
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
    // Handle duplicate email
    if (
      error.message.includes('already exists') ||
      error.message.includes('уже существует')
    ) {
      return res.status(409).json({
        error: 'CONFLICT_EMAIL_EXISTS',
      });
    }

    console.error(error);
    return res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
    });
  }
};

/**
 * Handles user login requests.
 *
 * Expected Body: { email: string, password: string }
 *
 * Error Responses:
 * - 400: { error: "VALIDATION_LOGIN_CREDENTIALS_REQUIRED" }
 * - 401: { error: "AUTH_INVALID_CREDENTIALS" }
 * - 500: { error: "INTERNAL_SERVER_ERROR" }
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {void}
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'VALIDATION_LOGIN_CREDENTIALS_REQUIRED',
      });
    }

    const result = await authService.loginUser(email, password);

    return res.json({
      message: 'Login successful',
      data: result,
    });
  } catch (error) {
    if (error.message === 'Неверный email или пароль') {
      return res.status(401).json({
        error: 'AUTH_INVALID_CREDENTIALS',
      });
    }

    console.error(error);
    return res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
    });
  }
};
