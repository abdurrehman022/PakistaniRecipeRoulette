const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Ensure this is declared only once
require('dotenv').config();

const app = express();

app.use(cors({ origin: 'https://pakistani-recipe-roulette.vercel.app' }));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Import routes
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

// Import JWT authentication middleware
const { authenticateToken } = require('./middleware/authMiddleware');

// Use routes
app.use('/api/users', userRoutes);  // All user routes
app.use('/api/recipes', recipeRoutes);  // All recipe routes

// Example route (for testing)
app.get('/', (req, res) => res.send('Server running on port ' + (process.env.PORT || 5000)));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});