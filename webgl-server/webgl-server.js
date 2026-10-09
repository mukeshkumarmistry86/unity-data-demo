const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

// Serve Unity WebGL build with CORS headers
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.static(path.join(__dirname, '../unity-webgl')));

app.listen(PORT, () => {
  console.log(`Unity WebGL served at http://localhost:${PORT}`);
});