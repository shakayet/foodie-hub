const express = require('express');
const FastFood = require('../Models/FastFood');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newItem = new FastFood(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add fast food item' });
  }
});

router.get('/', async (req, res) => {
  try {
    const items = await FastFood.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch fast food items' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await FastFood.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update fast food item' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await FastFood.findByIdAndDelete(req.params.id);
    res.json({ message: 'Fast food item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete fast food item' });
  }
});

module.exports = router;
