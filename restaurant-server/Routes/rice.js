const express = require('express');
const Rice = require('../Models/Rice');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newRice = new Rice(req.body);
    await newRice.save();
    res.status(201).json(newRice);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add rice item' });
  }
});

router.get('/', async (req, res) => {
  try {
    const riceItems = await Rice.find();
    res.json(riceItems);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rice items' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Rice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update rice item' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Rice.findByIdAndDelete(req.params.id);
    res.json({ message: 'Rice item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete rice item' });
  }
});

module.exports = router;
