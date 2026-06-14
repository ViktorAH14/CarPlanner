/**
 * Auth API Full Coverage Tests
 * Integration tests for user registration and login endpoints.
 * Uses Supertest to simulate HTTP requests against the Express app.
 *
 * Note: Currently asserts against Russian error messages returned by the backend.
 * If switching to standardized error codes (e.g., VALIDATION_...), update the
 * expect().toContain() assertions accordingly.
 *
 * @module tests/auth.test
 */

const request = require('supertest');
const app = require('../src/app');

describe('Auth API Full Coverage Tests', () => {
  // Define a strong password to be used across all tests
  const validPassword = 'StrongPass123!';

  describe('Registration Tests', () => {
    /**
     * Test Case: Missing Email Field
     * Verifies that the API returns a 400 Bad Request when the email is omitted.
     */
    it('should return 400 if email is missing', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ password: validPassword });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toContain('VALIDATION_EMAIL_PASSWORD_REQUIRED');
    });

    /**
     * Test Case: Missing Password Field
     * Verifies that the API returns a 400 Bad Request when the password is omitted.
     */
    it('should return 400 if password is missing', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@example.com' });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toContain('VALIDATION_EMAIL_PASSWORD_REQUIRED');
    });

    /**
     * Test Case: Successful User Registration
     * Verifies that a new unique user can be created and receives a 201 Created response.
     * Generates a unique email using a timestamp to avoid conflicts.
     */
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

    /**
     * Test Case: Duplicate Email Conflict
     * Verifies that attempting to register with an existing email returns 409 Conflict.
     * First registers a user, then attempts to register again with the same email.
     */
    it('should return 409 if user with the same email already exists', async () => {
      const testEmail = `dup_test_${Date.now()}@example.com`;

      // Step 1: First registration (should succeed)
      await request(app).post('/api/auth/register').send({
        email: testEmail,
        password: validPassword,
        firstName: 'Test',
        lastName: 'Case',
      });

      // Step 2: Second registration with the same email (should fail with 409)
      const res = await request(app).post('/api/auth/register').send({
        email: testEmail,
        password: 'AnotherPass',
        firstName: 'Other',
        lastName: 'Name',
      });

      expect(res.statusCode).toBe(409);
      expect(res.body.error).toContain('CONFLICT_EMAIL_EXISTS');
    });
  });

  describe('Login Tests', () => {
    let registeredEmail;

    /**
     * Setup: Create a test user before running login tests.
     * Ensures we have a valid user to authenticate against.
     */
    beforeAll(async () => {
      registeredEmail = `login_test_${Date.now()}@example.com`;

      await request(app).post('/api/auth/register').send({
        email: registeredEmail,
        password: validPassword,
        firstName: 'Login',
        lastName: 'Tester',
      });
    });

    /**
     * Test Case: Successful Login
     * Verifies that valid credentials return a 200 OK response and user data.
     */
    it('should successfully login with correct credentials (200)', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: registeredEmail,
        password: validPassword,
      });

      expect(res.statusCode).toBe(200);
      expect(res.body.data).toBeDefined();
    });

    /**
     * Test Case: Invalid Password
     * Verifies that an incorrect password returns a 401 Unauthorized response.
     * Security note: The error message is generic ("Invalid email or password")
     * to prevent revealing whether the email exists or not.
     */
    it('should return 401 for incorrect password', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: registeredEmail,
        password: 'wrong_password_123',
      });

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('AUTH_INVALID_CREDENTIALS');
    });

    /**
     * Test Case: Non-existent User
     * Verifies that logging in with a non-existent email returns 401.
     * Maintains security by using the same error message as invalid password.
     */
    it('should return 401 for non-existent email', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'nonexistent_user@fake.com',
        password: validPassword,
      });

      expect(res.statusCode).toBe(401);
      expect(res.body.error).toBe('AUTH_INVALID_CREDENTIALS');
    });

    /**
     * Test Case: Empty Request Body
     * Verifies that sending an empty JSON body returns a 400 Bad Request.
     */
    it('should return 400 for empty request body', async () => {
      const res = await request(app).post('/api/auth/login').send({});

      expect(res.statusCode).toBe(400);
    });
  });
});
