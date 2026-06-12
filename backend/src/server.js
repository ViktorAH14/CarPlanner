const app = require('./app.js');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
});

console.log('🔗 DB URL получен:', !!process.env.DATABASE_URL ? 'ДА' : 'НЕТ');
if (!process.env.DATABASE_URL) {
  console.warn(
    '⚠️ ВНИМАНИЕ: DATABASE_URL не установлен! Сервер запустится, но упадет при запросе к БД.'
  );
}
