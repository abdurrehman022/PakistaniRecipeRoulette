const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGO_URI
  }),
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Import and use routes
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

// Example route (for testing)
app.get('/', (req, res) => res.send('Server running on port ' + (process.env.PORT || 5003)));

// Start server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
