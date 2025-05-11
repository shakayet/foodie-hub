// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../Models/User');

// ✅ 1. Check if user is admin
router.get('/admin/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (user) {
      res.json({ isAdmin: user.role === 'admin' });
    } else {
      res.json({ isAdmin: false });
    }
  } catch (error) {
    console.error('Admin check error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ 2. Save user to DB if not already exists
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user) {
      const newUser = new User({ email, role: 'user' }); // default role
      await newUser.save();
    }

    res.json({ message: 'User saved or already exists' });
  } catch (error) {
    console.error('User save error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
