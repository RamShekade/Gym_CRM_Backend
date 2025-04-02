const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startDate: Date,
  expiryDate: Date,
  amountPaid: Number,
  status: { type: String, enum: ['active', 'expired'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Membership', MembershipSchema);
