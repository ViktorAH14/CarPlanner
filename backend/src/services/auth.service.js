const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (email, password, firstName, lastName) => {
  // 1. Проверяем, нет ли уже такого пользователя
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Пользователь с таким email уже существует");
  }

  // 2. Хешируем пароль (никогда не храним пароли в открытом виде!)
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // 3. Создаем пользователя в базе
  const user = await User.create({
    email,
    passwordHash,
    firstName,
    lastName,
  });

  return user; // Возвращаем созданного пользователя (без пароля!)
};

const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

module.exports = { registerUser, getUserByEmail };
