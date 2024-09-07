const User = require('../models/User');
const Recipe = require('../models/Recipe');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Register a new user
exports.registerUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  // Validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstname, lastname, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.setHeader('Authorization', `Bearer ${token}`);
    res.json({ success: true, message: 'User logged in successfully', token });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// Get user details
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favouriterecipes');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// Update user details (excluding email)
exports.updateUserDetails = async (req, res) => {
  const { firstname, lastname, password } = req.body;

  // Validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.json({ success: true, message: 'User details updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// Add favorite recipe
exports.addFavoriteRecipe = async (req, res) => {
  const { recipeId } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }

    if (!user.favouriterecipes.includes(recipeId)) {
      user.favouriterecipes.push(recipeId);
      await user.save();
      res.json({ success: true, message: 'Recipe added to favorites' });
    } else {
      res.json({ success: false, message: 'Recipe already in favorites' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// Remove favorite recipe
exports.removeFavoriteRecipe = async (req, res) => {
  const { recipeId } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const index = user.favouriterecipes.indexOf(recipeId);
    if (index > -1) {
      user.favouriterecipes.splice(index, 1);
      await user.save();
      res.json({ success: true, message: 'Recipe removed from favorites' });
    } else {
      res.json({ success: false, message: 'Recipe not found in favorites' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// Get favorite recipes
exports.getFavoriteRecipes = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favouriterecipes');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user.favouriterecipes });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};
