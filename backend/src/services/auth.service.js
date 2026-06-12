const User = require('../models/User');
const bcrypt = require('bcryptjs');

const registerUser = async (email, password, firstName, lastName) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('Пользователь с таким email уже существует');
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

const getUserByEmail = async email => {
  return await User.findOne({ where: { email } });
};

const loginUser = async (email, password) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error('Неверный email или пароль');
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) {
    throw new Error('Неверный email или пароль');
  }

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};

module.exports = { registerUser, getUserByEmail, loginUser };
