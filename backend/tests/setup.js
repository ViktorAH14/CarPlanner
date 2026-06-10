const { sequelize } = require('../src/config/database');

beforeAll(async () => {
  console.log('🧪 Подготовка тестовой БД (синхронизация таблиц)...');
  await sequelize.sync({ force: true });
  console.log('✅ Тестовые таблицы готовы!');
});

afterAll(async () => {});
