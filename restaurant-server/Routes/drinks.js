const express = require('express');
const Drink = require('../Models/Drinks');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newDrink = new Drink(req.body);
    await newDrink.save();
    res.status(201).json(newDrink);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add drink' });
  }
});

router.get('/', async (req, res) => {
  try {
    const drinks = await Drink.find();
    res.json(drinks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch drinks' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Drink.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update drink' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Drink.findByIdAndDelete(req.params.id);
    res.json({ message: 'Drink deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete drink' });
  }
});

module.exports = router;
