const { DataTypes } = require("sequelize");
const sequelize = require("../config/database").sequelize;
const bcrypt = require("bcryptjs");

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Email должен быть уникальным
      validate: {
        isEmail: true, // Проверка формата email
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
    tableName: "users", // Явное имя таблицы
    timestamps: true, // Автоматически добавит createdAt и updatedAt
  },
);

// Метод для сравнения паролей
User.prototype.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.passwordHash);
};

module.exports = User;
