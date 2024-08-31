const User = require('../models/User'); 
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Register a new user
exports.registerUser = async (req, res) => {
  const { firstname, lastname, email, password, profilepic, favouriterecipes } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      profilepic,
      favouriterecipes
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    req.session.userId = user._id;
    res.json({ message: 'User logged in successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Get user details
exports.getUserDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user details', error });
  }
};

// Update user details
exports.updateUserDetails = async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, profilepic, favouriterecipes } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, {
      firstname,
      lastname,
      email,
      profilepic,
      favouriterecipes
    }, { new: true });

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};
