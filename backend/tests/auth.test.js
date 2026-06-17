const request = require('supertest');
const app = require('../src/app');

describe('Auth API Tests', () => {
  const validPassword = 'StrongPass123!';
  let registeredEmail;

  beforeAll(async () => {
    registeredEmail = `test_user_${Date.now()}@example.com`;

    // Register a user for login tests
    await request(app).post('/api/auth/register').send({
      email: registeredEmail,
      password: validPassword,
      firstName: 'Test',
      lastName: 'User',
    });
  });

  describe('Registration Tests', () => {
    it('should return 400 if email or password is missing', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ password: validPassword });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('VALIDATION_EMAIL_PASSWORD_REQUIRED');
    });

    it('should return 409 if user with the same email already exists', async () => {
      const duplicateEmail = `dup_test_${Date.now()}@example.com`;

      // First registration
      await request(app).post('/api/auth/register').send({
        email: duplicateEmail,
        password: validPassword,
        firstName: 'Dup',
        lastName: 'User',
      });

      // Second registration attempt
      const res = await request(app).post('/api/auth/register').send({
        email: duplicateEmail,
        password: 'AnotherPass',
        firstName: 'Other',
        lastName: 'Name',
      });

      expect(res.statusCode).toBe(409);
      expect(res.body.error).toBe('CONFLICT_EMAIL_EXISTS');
    });

    it('should successfully register a new user (201)', async () => {
      const newEmail = `new_user_${Date.now()}@example.com`;
      const res = await request(app).post('/api/auth/register').send({
        email: newEmail,
        password: validPassword,
        firstName: 'New',
        lastName: 'User',
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.data.email).toBe(newEmail);
      expect(res.body.data.firstName).toBe('New');
    });
  });

  describe('Login Tests', () => {
    it('should successfully login and return JWT token (200)', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: registeredEmail,
        password: validPassword,
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.data).toBeDefined();
      expect(res.body.data.user).toBeDefined();

      // Verify token exists and is a string
      expect(res.body.data.token).toBeDefined();
      expect(typeof res.body.data.token).toBe('string');

      // Basic sanity check: JWT has 3 parts (header.payload.signature)
      const tokenParts = res.body.data.token.split('.');
      expect(tokenParts.length).toBe(3);
    });

    it('should return 401 for incorrect password', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: registeredEmail,
        password: 'wrong_password_123',
      });

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('AUTH_INVALID_CREDENTIALS');
    });

    it('should return 401 for non-existent email', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'nonexistent_user@fake.com',
        password: validPassword,
      });

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('AUTH_INVALID_CREDENTIALS');
    });

    it('should return 400 if credentials are missing', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: registeredEmail });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('VALIDATION_LOGIN_CREDENTIALS_REQUIRED');
    });
  });
});
