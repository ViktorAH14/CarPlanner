const request = require('supertest');
const app = require('../src/app');

describe('Auth API Full Coverage Tests', () => {
  const validPassword = 'StrongPass123!';

  describe('Registration Tests', () => {
    it('should return 400 if email is missing', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ password: validPassword });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toContain('обязательны'); // Keep error message in Russian as backend returns it
    });

    it('should return 400 if password is missing', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@example.com' });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toContain('обязательны');
    });

    it('should successfully register a new user (201)', async () => {
      const uniqueEmail = `unique_${Date.now()}@example.com`;

      const res = await request(app).post('/api/auth/register').send({
        email: uniqueEmail,
        password: validPassword,
        firstName: 'Max',
        lastName: 'Power',
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.data).toBeDefined();
      expect(res.body.data.email).toBe(uniqueEmail);
    });

    it('should return 409 if user with the same email already exists', async () => {
      const testEmail = `dup_test_${Date.now()}@example.com`;

      // First registration (should succeed)
      await request(app).post('/api/auth/register').send({
        email: testEmail,
        password: validPassword,
        firstName: 'Test',
        lastName: 'Case',
      });

      // Second registration with the same email (should fail with 409)
      const res = await request(app).post('/api/auth/register').send({
        email: testEmail,
        password: 'AnotherPass',
        firstName: 'Other',
        lastName: 'Name',
      });

      expect(res.statusCode).toBe(409);
      expect(res.body.error).toContain('уже существует');
    });
  });

  describe('Login Tests', () => {
    let registeredEmail;

    beforeAll(async () => {
      // Create a test user specifically for login tests
      registeredEmail = `login_test_${Date.now()}@example.com`;

      await request(app).post('/api/auth/register').send({
        email: registeredEmail,
        password: validPassword,
        firstName: 'Login',
        lastName: 'Tester',
      });
    });

    it('should successfully login with correct credentials (200)', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: registeredEmail,
        password: validPassword,
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.data).toBeDefined();
    });

    it('should return 401 for incorrect password', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: registeredEmail,
        password: 'wrong_password_123',
      });

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('Неверный email или пароль');
    });

    it('should return 401 for non-existent email', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'nonexistent_user@fake.com',
        password: validPassword,
      });

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('Неверный email или пароль');
    });

    it('should return 400 for empty request body', async () => {
      const res = await request(app).post('/api/auth/login').send({});

      expect(res.statusCode).toBe(400);
    });
  });
});
