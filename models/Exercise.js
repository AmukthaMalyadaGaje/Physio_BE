const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true }, // Changed to String based on provided data
    description: { type: String }, // Added a description field
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'], // Enum for difficulty levels
        default: 'Beginner' // Default difficulty level
    },
    duration: { type: Number, default: 0 }, // Duration in seconds
    sets: { type: Number, required: true }, // Number of sets
    reps: { type: Number, required: true }, // Number of repetitions
    holdTime: { type: Number, default: 0 }, // Hold time in seconds
    weights: { type: Number, default: 0 }, // Weights in kilograms or pounds
});

module.exports = mongoose.model('Exercise', exerciseSchema);
