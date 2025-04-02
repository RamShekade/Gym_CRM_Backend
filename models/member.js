const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    membershipType: { type: String, enum: ['Basic', 'Premium', 'VIP'], required: true },
    gymId: { type: Number, unique: true }, // Incremental Gym ID
    joiningDate: { type: Date, default: Date.now },
    expiryDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    price: { type: Number, required: true }, 
});

module.exports = mongoose.model('Member', MemberSchema);
