const { Sequelize } = require('sequelize');

const dbUrl =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  logging: process.env.NODE_ENV !== 'test' ? console.log : false,
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
});

const testConnection = async () => {
  try {
    await sequelize.sync({ force: false });
    await sequelize.authenticate();
    console.log('✅ Подключение к БД успешно!');
  } catch (error) {
    console.error('❌ Ошибка подключения:', error.message);
    throw error;
  }
};

module.exports = { sequelize, testConnection };
