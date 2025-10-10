const request = require('supertest');
const express = require('express');
const mockMongoose = require('mongoose');
const userRouter = require('../routes/userRoutes');
const userModel = require('../models/userModel');

// We need to create an express app to test the router
const app = express();
app.use(express.json());
app.use('/api/user', userRouter);

// Mock the authMiddleware since we are not testing authentication here
jest.mock('../middleware/authMiddleware', () => (req, res, next) => {
    // Mock a user on the request object
    req.user = { _id: new mockMongoose.Types.ObjectId().toString() };
    next();
});

describe('User Routes', () => {

  describe('POST /api/user/register', () => {

    it('should register a new user successfully', async () => {
      const res = await request(app)
        .post('/api/user/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('token');

      // Verify user was created in the database
      const user = await userModel.findOne({ email: 'test@example.com' });
      expect(user).not.toBeNull();
      expect(user.email).toBe('test@example.com');
    });

    it('should return 400 if user already exists', async () => {
      // First, create a user
      await request(app)
        .post('/api/user/register')
        .send({
          email: 'existing@example.com',
          password: 'password123',
        });

      // Then, try to register again with the same email
      const res = await request(app)
        .post('/api/user/register')
        .send({
          email: 'existing@example.com',
          password: 'password123',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message', 'User already exists');
    });

    it('should return 400 for an invalid email format', async () => {
      const res = await request(app)
        .post('/api/user/register')
        .send({
          email: 'not-an-email',
          password: 'password123',
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Invalid email format');
    });

  });

  // You can add more describe blocks for /login, /getUser, etc.
});
