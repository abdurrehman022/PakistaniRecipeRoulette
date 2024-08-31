const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User registration
router.post('/register', userController.registerUser);

// User login
router.post('/login', userController.loginUser);

// Get user details
router.get('/:id', userController.getUserDetails);

// Update user details
router.put('/:id', userController.updateUserDetails);

// Delete a user
router.delete('/:id', userController.deleteUser);

module.exports = router;
