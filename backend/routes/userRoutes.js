const express = require('express');
const { check } = require('express-validator');
const { 
  registerUser, 
  loginUser, 
  getUserDetails, 
  updateUserDetails, 
  deleteUser, 
  addFavoriteRecipe, 
  removeFavoriteRecipe, 
  getFavoriteRecipes 
} = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @route   POST /api/users/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', [
  check('firstname').not().isEmpty().withMessage('First name is required'),
  check('lastname').not().isEmpty().withMessage('Last name is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], registerUser);

/**
 * @route   POST /api/users/login
 * @desc    Log in an existing user
 * @access  Public
 */
router.post('/login', [
  check('email').isEmail().withMessage('Valid email is required'),
  check('password').not().isEmpty().withMessage('Password is required')
], loginUser);

/**
 * @route   GET /api/users/me
 * @desc    Get the details of the authenticated user
 * @access  Private
 */
router.get('/me', authenticateToken, getUserDetails);

/**
 * @route   PUT /api/users/me
 * @desc    Update the details of the authenticated user
 * @access  Private
 */
router.put('/me', authenticateToken, [
  check('firstname').optional().not().isEmpty().withMessage('First name cannot be empty'),
  check('lastname').optional().not().isEmpty().withMessage('Last name cannot be empty'),
  check('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], updateUserDetails);

/**
 * @route   DELETE /api/users/me
 * @desc    Delete the authenticated user
 * @access  Private
 */
router.delete('/me', authenticateToken, deleteUser);

/**
 * @route   POST /api/users/favourites
 * @desc    Add a recipe to the authenticated user's favorites
 * @access  Private
 */
router.post('/favourites', authenticateToken, addFavoriteRecipe);

/**
 * @route   DELETE /api/users/favourites
 * @desc    Remove a recipe from the authenticated user's favorites
 * @access  Private
 */
router.delete('/favourites', authenticateToken, removeFavoriteRecipe);

/**
 * @route   GET /api/users/favourites
 * @desc    Get all favorite recipes of the authenticated user
 * @access  Private
 */
router.get('/favourites', authenticateToken, getFavoriteRecipes);

module.exports = router;
