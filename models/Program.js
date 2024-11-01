const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    name: { type: String, required: true },
    exercises: [
        {
            exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }, // Reference to Exercise model
            sets: { type: Number, required: true },
            reps: { type: Number, required: true },
            holdTime: { type: Number, default: 0 },
            weight: { type: Number, default: 0 },
        },
    ],
    daysOfWeek: { type: [String], required: true },
    dailyFrequency: { type: Number, required: true },
    notes: { type: String, default: '' },
});

module.exports = mongoose.model('Program', programSchema);
