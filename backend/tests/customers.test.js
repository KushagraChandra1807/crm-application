const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../testServer'); // small test server wrapper
const User = require('../models/User');
const bcrypt = require('bcryptjs');
let token;
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mini-crm-test', { useNewUrlParser:true, useUnifiedTopology:true });
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('password123',10);
  const user = new User({ name: 'Tester', email: 'test@example.com', passwordHash, role: 'user' });
  await user.save();
  const res = await request(app).post('/api/auth/login').send({ email: 'test@example.com', password: 'password123' });
  token = res.body.token;
});
afterAll(async () => {
  await mongoose.connection.close();
});
test('GET /api/customers returns empty list initially', async () => {
  const res = await request(app).get('/api/customers').set('Authorization', 'Bearer ' + token);
  expect(res.statusCode).toBe(200);
  expect(res.body.data).toBeDefined();
});
