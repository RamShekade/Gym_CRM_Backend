const express = require('express');
const router = express.Router();
const Membership = require('../models/membership'); // Assuming a Mongoose model

// GET all memberships
router.get('/', async (req, res) => {
    try {
        const memberships = await Membership.find();
        res.json(memberships);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new membership
router.post('/', async (req, res) => {
    const { memberId, planType, startDate, endDate } = req.body;

    try {
        const newMembership = new Membership({ memberId, planType, startDate, endDate });
        await newMembership.save();
        res.status(201).json(newMembership);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
