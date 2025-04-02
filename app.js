const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Import Routes (Ensure they are exported correctly)
const memberRoutes = require('./routes/members');
const membershipRoutes = require('./routes/memberships');
const attendanceRoutes = require('./routes/attendance');
const inquiryRoutes = require('./routes/inquiries');

// Use Routes (Make sure they are functions, not objects)
app.use('/api/members', memberRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/inquiries', inquiryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
