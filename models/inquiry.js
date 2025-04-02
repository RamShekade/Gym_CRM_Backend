const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  age: Number,
  gender: String,
  status: { type: String, enum: ['pending', 'contacted'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', InquirySchema);
