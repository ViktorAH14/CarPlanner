/**
 * User Model
 * Defines the structure of the users table in PostgreSQL and provides authentication helpers.
 *
 * @typedef {Object} UserAttributes
 * @property {number} id - Unique identifier for the user.
 * @property {string} email - User's email address (unique, validated format).
 * @property {string} passwordHash - Hashed password stored in the database.
 * @property {string} [firstName] - Optional first name.
 * @property {string} [lastName] - Optional last name.
 * @property {Date} createdAt - Timestamp of record creation.
 * @property {Date} updatedAt - Timestamp of last update.
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize;
const bcrypt = require('bcryptjs');

/**
 * Defines the User model in Sequelize.
 * Includes schema definition and instance methods for authentication logic.
 *
 * @type {import('sequelize').Model}
 */
const User = sequelize.define(
  'User',
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Email must be unique across the system
      validate: {
        isEmail: true, // Enforces valid email format
      },
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'users', // Explicit table name in the database
    timestamps: true, // Automatically adds createdAt and updatedAt columns
  }
);

/**
 * Instance method to compare a candidate password with the stored hash.
 * Uses bcrypt to securely verify the password.
 *
 * @param {string} candidatePassword - The plain text password to verify.
 * @returns {Promise<boolean>} Resolves to true if the password matches, false otherwise.
 */
User.prototype.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.passwordHash);
};

module.exports = User;
