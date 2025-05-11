const express = require('express');
const Cookie = require('../Models/Cookies');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newCookie = new Cookie(req.body);
    await newCookie.save();
    res.status(201).json(newCookie);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add cookie' });
  }
});

router.get('/', async (req, res) => {
  try {
    const cookies = await Cookie.find();
    res.json(cookies);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cookies' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Cookie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update cookie' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Cookie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cookie deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete cookie' });
  }
});

module.exports = router;
