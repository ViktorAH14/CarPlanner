const request = require('supertest');
const app = require('../src/app'); // Твой главный файл сервера

describe('Auth API', () => {
  // Сначала регистрируем пользователя, чтобы было кого логинить
  beforeAll(async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test_user@example.com',
        password: 'StrongPass123!',
        firstName: 'Тестовый',
        lastName: 'Пользователь',
      })
      .expect(201);
  });

  describe('POST /api/auth/login', () => {
    it('должен успешно возвращать токен при верных данных', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'test_user@example.com',
        password: 'StrongPass123!',
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.token).toBeDefined();
      expect(res.body.data.email).toBe('test_user@example.com');
    });

    it('должен возвращать 401 при неверном пароле', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'test_user@example.com',
        password: 'wrong_password',
      });

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('Неверный email или пароль');
    });

    it('должен возвращать 400 при отсутствии email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ password: 'StrongPass123!' });

      expect(res.statusCode).toBe(400);
    });
  });
});
