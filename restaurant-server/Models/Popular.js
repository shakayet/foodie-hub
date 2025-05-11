const mongoose = require('mongoose');

const popularSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }
});

module.exports = mongoose.model('Popular', popularSchema);