const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: console.log, // Видим SQL
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
});

const testConnection = async () => {
  try {
    // 1. Сначала синхронизируем модели (создадим таблицы, если их нет)
    await sequelize.sync({ force: false }); // force: false = создать только если нет

    // 2. Потом проверяем подключение (теперь таблица точно есть)
    await sequelize.authenticate();

    console.log('✅ Модели синхронизированы и подключение успешно!');

    if (process.env.DATABASE_URL) {
      const urlParts = new URL(process.env.DATABASE_URL);
      console.log(`🗄 База: ${urlParts.pathname.substring(1)}`);
    }
  } catch (error) {
    console.error('❌ Критическая ошибка:', error.message);
    throw error; // Важно пробросить ошибку, чтобы сервер упал, если БД не готова
  }
};

module.exports = { sequelize, testConnection };
