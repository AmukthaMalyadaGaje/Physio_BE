const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const exerciseController = require('../controllers/exerciseController');
const programController = require('../controllers/programController');

// Categories
console.log("Hello")
router.get('/categories', categoryController.getCategories);

// Exercises
router.post('/exercises', exerciseController.getExercises);

// Programs
router.post('/combos', programController.saveProgram);
router.get('/selcted_combo/:id', programController.getProgram);
router.get('/saved_combos', programController.getPrograms);

module.exports = router;
