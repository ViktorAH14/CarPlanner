module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.js$': 'babel-jest', // Если используешь Babel, иначе можно убрать
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'], // Подключаем настройку БД перед тестами
  testMatch: ['**/*.test.js'],
};
