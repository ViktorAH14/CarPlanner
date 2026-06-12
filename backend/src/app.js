const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

console.log(
  '✅ Сервер запущен. Роуты подключены. Проверка БД пропущена (будет при первом запросе).'
);

module.exports = app;
