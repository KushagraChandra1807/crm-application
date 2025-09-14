const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Lead = require('../models/Lead');
const Customer = require('../models/Customer');
const { authenticate } = require('../middleware/auth');
const leadSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  status: Joi.string().valid('New','Contacted','Converted','Lost').default('New'),
  value: Joi.number().min(0).default(0)
});
// Create lead for customer
router.post('/:customerId/leads', authenticate, async (req,res) => {
  const { error } = leadSchema.validate(req.body);
  if(error) return res.status(400).json({ message: error.details[0].message });
  try {
    const customer = await Customer.findOne({ _id: req.params.customerId, ownerId: req.user._id });
    if(!customer) return res.status(404).json({ message: 'Customer not found' });
    const lead = new Lead({ ...req.body, customerId: customer._id });
    await lead.save();
    res.json(lead);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});
// List leads for customer, with filter by status
router.get('/:customerId/leads', authenticate, async (req,res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.customerId, ownerId: req.user._id });
    if(!customer) return res.status(404).json({ message: 'Customer not found' });
    const status = req.query.status;
    const filter = { customerId: customer._id };
    if(status) filter.status = status;
    const leads = await Lead.find(filter).sort({createdAt:-1});
    res.json(leads);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});
router.get('/:customerId/leads/:leadId', authenticate, async (req,res) => {
  try {
    const lead = await Lead.findById(req.params.leadId);
    if(!lead) return res.status(404).json({ message: 'Not found' });
    // ensure owner
    const customer = await Customer.findOne({ _id: lead.customerId, ownerId: req.user._id });
    if(!customer) return res.status(403).json({ message: 'Forbidden' });
    res.json(lead);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});
router.put('/:customerId/leads/:leadId', authenticate, async (req,res) => {
  const { error } = leadSchema.validate(req.body);
  if(error) return res.status(400).json({ message: error.details[0].message });
  try {
    const lead = await Lead.findById(req.params.leadId);
    if(!lead) return res.status(404).json({ message: 'Not found' });
    const customer = await Customer.findOne({ _id: lead.customerId, ownerId: req.user._id });
    if(!customer) return res.status(403).json({ message: 'Forbidden' });
    Object.assign(lead, req.body);
    await lead.save();
    res.json(lead);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});
router.delete('/:customerId/leads/:leadId', authenticate, async (req,res) => {
  try {
    const lead = await Lead.findById(req.params.leadId);
    if(!lead) return res.status(404).json({ message: 'Not found' });
    const customer = await Customer.findOne({ _id: lead.customerId, ownerId: req.user._id });
    if(!customer) return res.status(403).json({ message: 'Forbidden' });
    await lead.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});
module.exports = router;
