const mongoose = require('mongoose');

const riceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }
});

module.exports = mongoose.model('Rice', riceSchema);
