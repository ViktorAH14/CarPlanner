const { Sequelize } = require('sequelize');

// Логика выбора URL: если NODE_ENV=test -> берем TEST_DATABASE_URL, иначе DATABASE_URL
const dbUrl =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error(
    '❌ Ошибка конфигурации: не найдена переменная DATABASE_URL или TEST_DATABASE_URL'
  );
}

const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  // В тестах выключаем логи SQL, чтобы отчет Jest был чистым. В dev/prod оставляем.
  logging: process.env.NODE_ENV !== 'test' ? console.log : false,
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
});

module.exports = { sequelize };
