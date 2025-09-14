require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customers');
const leadRoutes = require('./routes/leads');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/customers', leadRoutes); // leads nested under /api/customers/:customerId/leads
app.get('/', (req,res)=> res.send({ ok: true }));
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mini-crm', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=> console.log('Server running on port', PORT));
  })
  .catch(err=> {
    console.error('MongoDB connection error', err);
  });
