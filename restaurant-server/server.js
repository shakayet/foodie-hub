const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Route imports
const drinkRoutes = require('./Routes/drinks');
const groceryRoutes = require('./Routes/groceries');
const riceRoutes = require('./Routes/rice');
const cookieRoutes = require('./Routes/cookies');
const fastFoodRoutes = require('./Routes/fastFood');
const adminUserRoutes = require('./Routes/user');
const popularRoutes = require('./Routes/popular');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());



// Routes
app.use('/api/drinks', drinkRoutes);
app.use('/api/drinks/:id', drinkRoutes);
app.use('/api/groceries', groceryRoutes);
app.use('/api/groceries/:id', groceryRoutes);
app.use('/api/rice', riceRoutes);
app.use('/api/rice/:id', riceRoutes);
app.use('/api/cookies', cookieRoutes);
app.use('/api/cookies/:id', cookieRoutes);
app.use('/api/fastfood', fastFoodRoutes);
app.use('/api/fastfood/:id', fastFoodRoutes);
app.use('/api/user', adminUserRoutes);
app.use('/api/user/:id', adminUserRoutes);
app.use('/api/user', popularRoutes);
app.use('/api/user/:id', popularRoutes);

  

// MongoDB connection.
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection failed:', err.message);
});
