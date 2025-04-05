const express = require('express');
const router = express.Router();
const Member = require('../models/member');

// GET all members
router.get('/', async (req, res) => {
    try {
        const members = await Member.find();
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Function to get the next Gym ID
const getNextGymId = async () => {
    const lastMember = await Member.findOne().sort({ gymId: -1 }).select("gymId"); // Get last gymId
    return lastMember ? lastMember.gymId + 1 : 101; // Start from 101
};

// Add a new member
router.post("/", async (req, res) => {
    try {
        const { name, email, phone, address, membershipType } = req.body;

        if (!name || !email || !phone || !address || !membershipType) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Define membership plans with prices and durations in months
        const membershipPlans = {
            Monthly: { price: 999, months: 1 },
            Quarterly: { price: 2499, months: 3 },
            Yearly: { price: 8999, months: 12 }
        };

        const plan = membershipPlans[membershipType];

        if (!plan) {
            return res.status(400).json({ error: "Invalid membership type." });
        }

        const gymId = await getNextGymId();
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + plan.months);

        const newMember = new Member({
            name,
            email,
            phone,
            address,
            membershipType,
            expiryDate,
            gymId,
            price: plan.price
        });

        await newMember.save();

        res.status(201).json({ message: "Member added successfully!", gymId, price: plan.price });
    } catch (error) {
        console.error("Error Adding Member:", error);
        res.status(500).json({ error: "Server error. Check logs." });
    }
});

router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedMember = await Member.findByIdAndDelete(id);
      if (!deletedMember) {
        return res.status(404).json({ error: "Member not found" });
      }
      res.json({ message: "Member deleted successfully" });
    } catch (error) {
      console.error("Error deleting member:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  



module.exports = router;
