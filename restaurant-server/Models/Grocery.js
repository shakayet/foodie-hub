const mongoose = require('mongoose');

const grocerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }
});

module.exports = mongoose.model('Grocery', grocerySchema);

