const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const customerSchema = new Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  company: String,
  ownerId: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
module.exports = mongoose.model('Customer', customerSchema);
