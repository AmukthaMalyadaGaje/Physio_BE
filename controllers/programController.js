const Program = require('../models/Program');

exports.saveProgram = async (req, res) => {
    try {

        const { exercises, days, frequency, notes, name } = req.body.combos;

        if (!name || !exercises || !Array.isArray(days) || frequency === undefined) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const exercisesArray = Object.entries(exercises).map(([key, value]) => {
            const exerciseData = JSON.parse(value);
            return {
                exercise: exerciseData._id,
                sets: Number(exerciseData.sets),
                reps: Number(exerciseData.reps),
                holdTime: Number(exerciseData.holdTime),
                weight: Number(exerciseData.weights),
            };
        });

        const newProgram = new Program({
            name,
            exercises: exercisesArray,
            daysOfWeek: days,
            dailyFrequency: frequency,
            notes
        });

        await newProgram.save();
        res.json({ message: 'Program saved successfully' });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Server Error' });
    }
};
exports.getPrograms = async (req, res) => {
    try {
        const programs = await Program.find().select('name');

        const comboNames = programs.map(program => program.name);

        res.json(comboNames);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Server Error' });
    }
};
exports.getProgram = async (req, res) => {
    try {
        const name = req.params.id;
        const programs = await Program.find({ name: name });

        if (!programs.length) {
            return res.status(404).json({ error: "No programs found with that name" });
        }


        res.json(programs);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
};
