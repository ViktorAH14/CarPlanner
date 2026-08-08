const request = require('supertest');
const app = require('../src/app');

describe('Auth Middleware & Protected Routes', () => {
  let validToken;
  const userPayload = { id: 1, email: 'test@example.com' };
  const secret = 'dummy_secret'; // Matches the one in your package.json test script

  beforeAll(() => {
    // Manually sign a valid token for testing purposes
    // We use the same secret that jest runs with
    const jwt = require('jsonwebtoken');
    validToken = jwt.sign(userPayload, secret, { expiresIn: '1h' });
  });

  describe('Protected Route: /api/protected/profile', () => {
    it('should return 401 if no token is provided', async () => {
      const res = await request(app).get('/api/protected/profile');

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('AUTH_MISSING_TOKEN');
    });

    it('should return 401 if token is invalid (wrong signature)', async () => {
      // Create a token with a different secret
      const jwt = require('jsonwebtoken');
      const badToken = jwt.sign(userPayload, 'wrong_secret', {
        expiresIn: '1h',
      });

      const res = await request(app)
        .get('/api/protected/profile')
        .set('Authorization', `Bearer ${badToken}`);

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('AUTH_INVALID_TOKEN');
    });

    it('should return 401 if token is expired', async () => {
      const jwt = require('jsonwebtoken');
      // Sign a token that expired 1 hour ago
      const expiredToken = jwt.sign(userPayload, secret, { expiresIn: '-1h' });

      const res = await request(app)
        .get('/api/protected/profile')
        .set('Authorization', `Bearer ${expiredToken}`);

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('AUTH_INVALID_TOKEN');
    });

    it('should successfully access protected route with valid token', async () => {
      const res = await request(app)
        .get('/api/protected/profile')
        .set('Authorization', `Bearer ${validToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data.id).toBe(userPayload.id);
      expect(res.body.data.email).toBe(userPayload.email);
    });
  });

  describe('Protected Route: /api/protected/data (POST)', () => {
    it('should allow POST request with valid token and include userId', async () => {
      const res = await request(app)
        .post('/api/protected/data')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ title: 'Test Item' });

      expect(res.statusCode).toBe(200);
      expect(res.body.userId).toBe(userPayload.id);
    });

    it('should reject POST request without token', async () => {
      const res = await request(app)
        .post('/api/protected/data')
        .send({ title: 'Test Item' });

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('AUTH_MISSING_TOKEN');
    });
  });
});
