const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  gymId: { type: String, required: true, ref: 'Member' }, // Reference Gym ID
  checkIn: { type: Date, required: true },
  checkOut: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);
