const authService = require('../services/auth.service');

exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email и пароль обязательны' });
    }

    const user = await authService.registerUser(
      email,
      password,
      firstName,
      lastName
    );

    return res.status(201).json({
      message: 'Пользователь успешно зарегистрирован',
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    if (error.message.includes('уже существует')) {
      return res
        .status(409)
        .json({ error: 'Пользователь с таким email уже существует' });
    }

    console.error(error);
    return res.status(500).json({ error: 'Ошибка сервера при регистрации' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: 'Email и пароль обязательны для входа' });
    }

    const result = await authService.loginUser(email, password);

    return res.json({
      message: 'Успешный вход',
      data: result,
    });
  } catch (error) {
    if (error.message === 'Неверный email или пароль') {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }
    console.error(error);
    return res.status(500).json({ error: 'Ошибка сервера при входе' });
  }
};
