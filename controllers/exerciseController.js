const Exercise = require('../models/Exercise');
const mongoose = require('mongoose');

exports.getExercises = async (req, res) => {
    try {
        const { category, exercises } = req.body;

        // Validate that exercises is an array
        if (!Array.isArray(exercises)) {
            return res.status(400).json({ error: 'Exercises must be an array.' });
        }

        // Trim and filter valid exercise names
        const validExercises = exercises
            .map(ex => ex.trim()) // Remove whitespace
            .filter(ex => ex.length > 0); // Keep only non-empty strings

        // Check if validExercises array is not empty
        if (validExercises.length === 0) {
            return res.status(400).json({ error: 'Invalid exercise names provided.' });
        }
        console.log("Category", category)

        // Construct the query to find exercises by category and names
        const query = {
            category: category, // category is a string
            name: { $in: validExercises } // Filter by names of the selected exercises
        };

        // Find the exercises matching the query
        const filteredExercises = await Exercise.find(query).populate('category');

        // Send the filtered exercises as a response
        res.json(filteredExercises);
    } catch (error) {
        console.error("Error fetching exercises:", error);
        res.status(500).json({ error: 'Server Error' });
    }
};
