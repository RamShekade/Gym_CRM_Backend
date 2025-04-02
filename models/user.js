const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  age: Number,
  gender: String,
  membershipStatus: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
