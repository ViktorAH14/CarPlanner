const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const { testConnection } = require('./config/database');
const app = express();

// Middleware
app.use(cors()); // Разрешаем запросы с Flutter (фронтенд)
app.use(express.json()); // Парсим JSON в теле запроса

// Подключаем роуты
app.use('/api/auth', authRoutes);

// Проверка подключения к БД при старте
testConnection();

module.exports = app;
