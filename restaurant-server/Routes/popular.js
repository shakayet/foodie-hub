const express = require('express');
const Popular = require('../Models/Popular')

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newPopular = new Popular(req.body);
    await newPopular.save();
    res.status(201).json(newPopular);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add Popular' });
  }
});

router.get('/', async (req, res) => {
  try {
    const Populars = await Popular.find();
    res.json(Populars);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Populars' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Popular.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update Popular' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Popular.findByIdAndDelete(req.params.id);
    res.json({ message: 'Popular deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete Popular' });
  }
});

module.exports = router;
