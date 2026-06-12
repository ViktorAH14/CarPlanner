const { sequelize } = require('../src/config/database');

beforeAll(async () => {
  console.log('🧪 Подготовка тестовой БД (очистка и создание таблиц)...');
  await sequelize.sync({ force: true });
  console.log('✅ Тестовые таблицы готовы!');
});

afterAll(async () => {
  console.log('🏁 Тесты завершены. Закрываем соединение с БД...');
  await sequelize.close();
});
