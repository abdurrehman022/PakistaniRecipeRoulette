const express = require('express');
const { 
  getAllRecipes, 
  getRecipeById, 
  searchRecipesByIngredients 
} = require('../controllers/recipeController');

const router = express.Router();

/**
 * @route   GET /api/recipes
 * @desc    Get all recipes
 * @access  Public
 */
router.get('/', getAllRecipes);

/**
 * @route   GET /api/recipes/:id
 * @desc    Get a recipe by ID
 * @access  Public
 */
router.get('/:id', getRecipeById);

/**
 * @route   POST /api/recipes/search
 * @desc    Search for recipes based on provided ingredients
 * @access  Public
 */
router.post('/search', searchRecipesByIngredients);

module.exports = router;
