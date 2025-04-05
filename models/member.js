const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true, unique: true },
  address: { type: String, required: true },

  // Updated to match frontend values
  membershipType: { 
    type: String, 
    enum: ['Monthly', 'Quarterly', 'Yearly'], 
    required: true 
  },

  gymId: { type: Number, unique: true }, // Should be auto-incremented on backend
  startDate: { type: Date, default: Date.now }, // Changed from joiningDate for consistency
  expiryDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Member', MemberSchema);
