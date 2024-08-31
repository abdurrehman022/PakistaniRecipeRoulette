const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Get all recipes
router.get('/', recipeController.getAllRecipes);

// Get a specific recipe
router.get('/:id', recipeController.getRecipeById);

// Add a new recipe
router.post('/', recipeController.addRecipe);

// Update a recipe
router.put('/:id', recipeController.updateRecipe);

// Delete a recipe
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;
