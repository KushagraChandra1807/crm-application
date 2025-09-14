const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const registerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});
router.post('/register', async (req,res) => {
  const { error } = registerSchema.validate(req.body);
  if(error) return res.status(400).json({ message: error.details[0].message });
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if(user) return res.status(400).json({ message: 'Email already registered' });
    const passwordHash = await bcrypt.hash(password, 10);
    user = new User({ name, email, passwordHash, role: 'user' });
    await user.save();
    return res.json({ message: 'Registered' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
router.post('/login', async (req,res) => {
  const { error } = loginSchema.validate(req.body);
  if(error) return res.status(400).json({ message: error.details[0].message });
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.passwordHash);
    if(!valid) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role }});
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
