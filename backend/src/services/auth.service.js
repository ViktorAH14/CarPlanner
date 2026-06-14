/**
 * Authentication Service
 * Contains business logic for user registration and authentication.
 * Handles password hashing with bcrypt and database interactions via the User model.
 *
 * @module services/auth.service
 */

const User = require('../models/User');
const bcrypt = require('bcryptjs');

/**
 * Registers a new user in the system.
 * Checks for email uniqueness, hashes the password, and creates a database record.
 *
 * @param {string} email - The unique email address for the new user.
 * @param {string} password - The plain text password provided by the user.
 * @param {string} [firstName] - Optional first name.
 * @param {string} [lastName] - Optional last name.
 * @returns {Promise<Object>} The created User instance (excluding sensitive data like passwordHash).
 * @throws {Error} Throws an error if a user with the provided email already exists.
 */
const registerUser = async (email, password, firstName, lastName) => {
  // Check if user already exists to prevent duplicate accounts
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('Пользователь с таким email уже существует');
  }

  // Generate salt and hash the password securely
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // Create the user record in the database
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
 * Used internally by other service methods to find a user before authentication.
 *
 * @param {string} email - The email address to search for.
 * @returns {Promise<Object|null>} The User object if found, otherwise null.
 */
const getUserByEmail = async email => {
  return await User.findOne({ where: { email } });
};

/**
 * Authenticates a user by verifying their email and password.
 * Uses bcrypt to compare the provided password against the stored hash.
 * Returns a sanitized user object without sensitive data.
 *
 * @param {string} email - The email address used for login.
 * @param {string} password - The plain text password entered by the user.
 * @returns {Promise<Object>} An object containing user's id, email, firstName, and lastName.
 * @throws {Error} Throws an authentication error if the user is not found or the password is invalid.
 *                 Note: The error message is generic to avoid revealing whether the email or password was wrong.
 */
const loginUser = async (email, password) => {
  const user = await getUserByEmail(email);

  // If user not found, throw a generic error for security reasons
  if (!user) {
    throw new Error('Неверный email или пароль');
  }

  // Compare the provided password with the stored hash
  const isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) {
    throw new Error('Неверный email или пароль');
  }

  // Return a sanitized object without the passwordHash
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};

module.exports = { registerUser, getUserByEmail, loginUser };
