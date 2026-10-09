// server/models/City.js
const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  population: { type: Number, required: true },
  imageUrl: { type: String, required: true }, // Path to uploaded image
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('City', CitySchema);