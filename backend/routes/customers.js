const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Customer = require('../models/Customer');
const { authenticate } = require('../middleware/auth');
const customerSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().allow(''),
  phone: Joi.string().allow(''),
  company: Joi.string().allow('')
});
// Create
router.post('/', authenticate, async (req,res) => {
  const { error } = customerSchema.validate(req.body);
  if(error) return res.status(400).json({ message: error.details[0].message });
  try {
    const customer = new Customer({ ...req.body, ownerId: req.user._id });
    await customer.save();
    res.json(customer);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});
// List with pagination & search
router.get('/', authenticate, async (req,res) => {
  try {
    const page = parseInt(req.query.page || '1');
    const limit = Math.min(parseInt(req.query.limit || '10'), 50);
    const q = req.query.q || '';
    const filter = {
      ownerId: req.user._id,
      $or: [ { name: new RegExp(q, 'i') }, { email: new RegExp(q,'i') } ]
    };
    const total = await Customer.countDocuments(filter);
    const customers = await Customer.find(filter).skip((page-1)*limit).limit(limit).sort({createdAt:-1});
    res.json({ data: customers, page, total, pages: Math.ceil(total/limit) });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});
// Get details (including leads via population)
router.get('/:id', authenticate, async (req,res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id, ownerId: req.user._id });
    if(!customer) return res.status(404).json({ message: 'Not found' });
    res.json(customer);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});
router.put('/:id', authenticate, async (req,res) => {
  const { error } = customerSchema.validate(req.body);
  if(error) return res.status(400).json({ message: error.details[0].message });
  try {
    const customer = await Customer.findOneAndUpdate({ _id: req.params.id, ownerId: req.user._id }, req.body, { new: true });
    if(!customer) return res.status(404).json({ message: 'Not found' });
    res.json(customer);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});
router.delete('/:id', authenticate, async (req,res) => {
  try {
    const customer = await Customer.findOneAndDelete({ _id: req.params.id, ownerId: req.user._id });
    if(!customer) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});
module.exports = router;
