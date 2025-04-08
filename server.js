// server.js

// ✅ Polyfills must be loaded first
require('./polyfills');

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express(); // ✅ Must be declared before routes

// ✅ Load .env configuration
dotenv.config();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// ✅ Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products')); // <-- Products fetch
app.use('/api/admin/products', require('./routes/adminProducts')); // <-- Admin actions
app.use('/api/chat', require('./routes/chat'));

// ✅ Home route to test server
app.get('/', (req, res) => {
  res.send('🚀 Server is running...');
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
