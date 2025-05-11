const express = require('express');
const Grocery = require('../Models/Grocery');

const router = express.Router();

// Create
router.post('/', async (req, res) => {
  try {
    const newGrocery = new Grocery(req.body);
    await newGrocery.save();
    res.status(201).json(newGrocery);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add grocery item' });
  }
});

// Read All
router.get('/', async (req, res) => {
  try {
    const groceries = await Grocery.find();
    res.json(groceries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch groceries' });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const updated = await Grocery.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update grocery item' });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    await Grocery.findByIdAndDelete(req.params.id);
    res.json({ message: 'Grocery item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete grocery item' });
  }
});

module.exports = router;
