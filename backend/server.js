require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customers');
const leadRoutes = require('./routes/leads');

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed frontend origins
const allowedOrigins = [
  "https://crm-application-five.vercel.app", // Vercel frontend
  "http://localhost:5173" // local Vite frontend
];

// Dynamic CORS setup
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman or server-to-server requests
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/customers', leadRoutes); // leads nested under /api/customers/:customerId/leads

app.get('/', (req, res) => res.send({ ok: true }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mini-crm', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log('Server running on port', PORT));
  })
  .catch(err => {
    console.error('MongoDB connection error', err);
  });
