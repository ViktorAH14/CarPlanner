/**
 * Authentication Service
 * Handles user registration, login, and JWT token generation.
 * Uses standardized error codes for consistent API responses.
 *
 * @module services/auth.service
 */

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Standardized Error Codes
 * Defines error codes used across the application for uniform error handling.
 * @readonly
 * @enum {string}
 */
const ERRORS = {
  USER_EXISTS: 'CONFLICT_EMAIL_EXISTS',
  INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
};

/**
 * Generates a signed JWT token for a given user payload.
 * Reads JWT_SECRET from environment variables.
 *
 * @param {Object} payload - The data to be encoded in the token (e.g., { id, email }).
 * @returns {string} The signed JWT token.
 * @throws {Error} Throws an error if JWT_SECRET is not configured.
 */
const generateToken = payload => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not configured in environment variables');
  }

  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRE || '1h',
  });
};

/**
 * Registers a new user in the system.
 * Checks for email uniqueness, hashes the password, and creates a database record.
 *
 * @param {string} email - The unique email address for the new user.
 * @param {string} password - The plain text password provided by the user.
 * @param {string} [firstName] - Optional first name.
 * @param {string} [lastName] - Optional last name.
 * @returns {Promise<Object>} The created User instance (excluding sensitive data).
 * @throws {Error} Throws an error with code 'CONFLICT_EMAIL_EXISTS' if email is taken.
 */
const registerUser = async (email, password, firstName, lastName) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    const error = new Error('User with this email already exists');
    error.code = ERRORS.USER_EXISTS;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({
    email,
    passwordHash,
    firstName,
    lastName,
  });

  return user;
};

/**
 * Retrieves a user record from the database by email address.
 * Used internally for authentication.
 *
 * @param {string} email - The email address to search for.
 * @returns {Promise<Object|null>} The User object if found, otherwise null.
 */
const getUserByEmail = async email => {
  return await User.findOne({ where: { email } });
};

/**
 * Authenticates a user by verifying credentials and generating a JWT token.
 * Returns a sanitized object containing user details and the access token.
 *
 * @param {string} email - The email address used for login.
 * @param {string} password - The plain text password entered by the user.
 * @returns {Promise<Object>} An object containing { user: {...}, token: string }.
 * @throws {Error} Throws an authentication error with code 'AUTH_INVALID_CREDENTIALS' if invalid.
 */
const loginUser = async (email, password) => {
  const user = await getUserByEmail(email);

  // Security best practice: Do not reveal if the email exists.
  if (!user) {
    const error = new Error('Invalid email or password');
    error.code = ERRORS.INVALID_CREDENTIALS;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) {
    const error = new Error('Invalid email or password');
    error.code = ERRORS.INVALID_CREDENTIALS;
    throw error;
  }

  // Generate JWT token with minimal payload
  const token = generateToken({ id: user.id, email: user.email });

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    token,
  };
};

module.exports = { registerUser, getUserByEmail, loginUser, generateToken };
