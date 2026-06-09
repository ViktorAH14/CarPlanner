const authService = require("../services/auth.service");

exports.register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Простая валидация на уровне контроллера (в будущем перенесем в middleware)
    if (!email || !password) {
      return res.status(400).json({ error: "Email и пароль обязательны" });
    }

    const user = await authService.registerUser(
      email,
      password,
      firstName,
      lastName,
    );

    // Возвращаем только нужные данные, скрывая пароль
    return res.status(201).json({
      message: "Пользователь успешно зарегистрирован",
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};
