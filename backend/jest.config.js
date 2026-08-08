module.exports = {
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testMatch: ['**/tests/**/*.test.js'],
  // One worker: all suites share carplanner_test_db and sync({ force: true }).
  maxWorkers: 1,
};
