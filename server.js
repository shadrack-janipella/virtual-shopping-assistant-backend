require('./polyfills');

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const adminProductRoutes = require('./routes/adminProducts');

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());


console.log("Mongo URI:", process.env.MONGO_URI);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products')); 
app.use('/api/admin/products', require('./routes/adminProducts')); 
app.use('/api/chat', require('./routes/chat'));

app.get('/', (req, res) => {
  res.send('🚀 Server is running...');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
