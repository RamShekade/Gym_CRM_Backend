const express = require('express');
const router = express.Router();
const Inquiry = require('../models/inquiry'); // Assuming a Mongoose model

// GET all inquiries
router.get('/', async (req, res) => {
    try {
        const inquiries = await Inquiry.find();
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new inquiry
router.post('/', async (req, res) => {
    const { name, phone, email, age, gender } = req.body;

    try {
        const newInquiry = new Inquiry({ name, phone, email, age, gender });
        await newInquiry.save();
        res.status(201).json(newInquiry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
