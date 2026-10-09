// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const City = require('./models/City');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/unity_demo';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (Admin panel and Uploaded images)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// ---------- REST API for Unity ----------

// GET all cities
app.get('/api/cities', async (req, res) => {
  try {
    const cities = await City.find().sort({ createdAt: -1 });
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create city (Admin panel uses this)
app.post('/api/cities', upload.single('image'), async (req, res) => {
  try {
    const cityData = {
      name: req.body.name,
      country: req.body.country,
      description: req.body.description,
      population: parseInt(req.body.population),
      imageUrl: req.file ? `/uploads/${req.file.filename}` : ''
    };
    const city = new City(cityData);
    await city.save();
    res.status(201).json(city);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE city
app.delete('/api/cities/:id', async (req, res) => {
  try {
    await City.findByIdAndDelete(req.params.id);
    res.json({ message: 'City deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});