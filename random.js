const { MongoClient } = require('mongodb');

// Replace the following with your MongoDB connection string
const uri = 'mongodb://localhost:27017'; // Adjust based on your MongoDB setup
const dbName = 'fitness'; // Your database name
const collectionName = 'exercises'; // Your collection name

// Dummy exercise data
const exercises = [
    {
        "name": "Squats",
        "category": "Lower Body",
        "description": "A strength exercise that involves bending the knees and lowering the body.",
        "difficulty": "Intermediate",
        "duration": 30,          // Duration in seconds
        "sets": 3,
        "reps": 12,
        "holdTime": 0,          // Hold time in seconds
        "weights": 0             // Weights in kg (0 for bodyweight)
    },
    {
        "name": "Lunges",
        "category": "Lower Body",
        "description": "A leg exercise where one leg is positioned forward and bent.",
        "difficulty": "Beginner",
        "duration": 30,
        "sets": 3,
        "reps": 10,
        "holdTime": 0,
        "weights": 5
    },
    {
        "name": "Deadlifts",
        "category": "Lower Body",
        "description": "A compound exercise that involves lifting weights from the ground.",
        "difficulty": "Advanced",
        "duration": 30,
        "sets": 4,
        "reps": 8,
        "holdTime": 2,          // Hold time in seconds at the top
        "weights": 20
    },
    {
        "name": "Leg Press",
        "category": "Lower Body",
        "description": "A machine exercise for lower body strength.",
        "difficulty": "Intermediate",
        "duration": 30,
        "sets": 3,
        "reps": 10,
        "holdTime": 0,
        "weights": 50
    },
    {
        "name": "Calf Raises",
        "category": "Lower Body",
        "description": "An exercise to strengthen the calf muscles.",
        "difficulty": "Beginner",
        "duration": 30,
        "sets": 3,
        "reps": 15,
        "holdTime": 0,
        "weights": 10
    },
    {
        "name": "Push-Ups",
        "category": "Upper Body",
        "description": "A strength exercise for the chest and arms.",
        "difficulty": "Intermediate",
        "duration": 30,
        "sets": 3,
        "reps": 12,
        "holdTime": 0,
        "weights": 0
    },
    {
        "name": "Pull-Ups",
        "category": "Upper Body",
        "description": "A compound exercise that targets the back and arms.",
        "difficulty": "Advanced",
        "duration": 30,
        "sets": 3,
        "reps": 8,
        "holdTime": 0,
        "weights": 0
    },
    {
        "name": "Dumbbell Shoulder Press",
        "category": "Upper Body",
        "description": "An exercise for shoulder strength using dumbbells.",
        "difficulty": "Intermediate",
        "duration": 30,
        "sets": 3,
        "reps": 10,
        "holdTime": 0,
        "weights": 10
    },
    {
        "name": "Bent Over Rows",
        "category": "Upper Body",
        "description": "A compound exercise for back muscles.",
        "difficulty": "Intermediate",
        "duration": 30,
        "sets": 3,
        "reps": 10,
        "holdTime": 0,
        "weights": 15
    },
    {
        "name": "Tricep Dips",
        "category": "Upper Body",
        "description": "An exercise targeting the triceps.",
        "difficulty": "Intermediate",
        "duration": 30,
        "sets": 3,
        "reps": 12,
        "holdTime": 0,
        "weights": 0
    },
    {
        "name": "Plank",
        "category": "Core",
        "description": "A core strength exercise that involves holding a position.",
        "difficulty": "Intermediate",
        "duration": 60,
        "sets": 3,
        "reps": 1,
        "holdTime": 30,         // Hold time in seconds
        "weights": 0
    },
    {
        "name": "Russian Twists",
        "category": "Core",
        "description": "A core exercise that targets the obliques.",
        "difficulty": "Intermediate",
        "duration": 30,
        "sets": 3,
        "reps": 15,
        "holdTime": 0,
        "weights": 5
    },
    {
        "name": "Bicycle Crunches",
        "category": "Core",
        "description": "A core exercise that targets the abs.",
        "difficulty": "Intermediate",
        "duration": 30,
        "sets": 3,
        "reps": 15,
        "holdTime": 0,
        "weights": 0
    },
    {
        "name": "Dead Bugs",
        "category": "Core",
        "description": "A core stability exercise.",
        "difficulty": "Beginner",
        "duration": 30,
        "sets": 3,
        "reps": 10,
        "holdTime": 0,
        "weights": 0
    },
    {
        "name": "Bridges",
        "category": "Core",
        "description": "An exercise that strengthens the glutes.",
        "difficulty": "Beginner",
        "duration": 30,
        "sets": 3,
        "reps": 12,
        "holdTime": 0,
        "weights": 0
    },
    {
        "name": "Running",
        "category": "Cardio",
        "description": "A cardio exercise that involves running.",
        "difficulty": "Intermediate",
        "duration": 30,
        "sets": 1,
        "reps": 1,
        "holdTime": 0,
        "weights": 0
    },
    {
        "name": "Cycling",
        "category": "Cardio",
        "description": "A cardio exercise that involves cycling.",
        "difficulty": "Beginner",
        "duration": 30,
        "sets": 1,
        "reps": 1,
        "holdTime": 0,
        "weights": 0
    },
    {
        "name": "Jump Rope",
        "category": "Cardio",
        "description": "A cardio exercise that involves jumping rope.",
        "difficulty": "Beginner",
        "duration": 30,
        "sets": 1,
        "reps": 1,
        "holdTime": 0,
        "weights": 0
    },
    {
        "name": "HIIT",
        "category": "Cardio",
        "description": "High-intensity interval training.",
        "difficulty": "Advanced",
        "duration": 30,
        "sets": 1,
        "reps": 1,
        "holdTime": 0,
        "weights": 0
    },
    {
        "name": "Rowing",
        "category": "Cardio",
        "description": "A cardio exercise that involves rowing.",
        "difficulty": "Intermediate",
        "duration": 30,
        "sets": 1,
        "reps": 1,
        "holdTime": 0,
        "weights": 0
    },
    {
        "name": "Hamstring Stretch",
        "category": "Flexibility",
        "description": "A stretching exercise for the hamstrings.",
        "difficulty": "Beginner",
        "duration": 30,
        "sets": 1,
        "reps": 1,
        "holdTime": 30,
        "weights": 0
    },
    {
        "name": "Quadriceps Stretch",
        "category": "Flexibility",
        "description": "A stretching exercise for the quadriceps.",
        "difficulty": "Beginner",
        "duration": 30,
        "sets": 1,
        "reps": 1,
        "holdTime": 30,
        "weights": 0
    },
    {
        "name": "Shoulder Stretch",
        "category": "Flexibility",
        "description": "A stretching exercise for the shoulders.",
        "difficulty": "Beginner",
        "duration": 30,
        "sets": 1,
        "reps": 1,
        "holdTime": 30,
        "weights": 0
    },
    {
        "name": "Hip Flexor Stretch",
        "category": "Flexibility",
        "description": "A stretching exercise for the hip flexors.",
        "difficulty": "Beginner",
        "duration": 30,
        "sets": 1,
        "reps": 1,
        "holdTime": 30,
        "weights": 0
    },
    {
        "name": "Cat-Cow Stretch",
        "category": "Flexibility",
        "description": "A yoga stretch that promotes flexibility.",
        "difficulty": "Beginner",
        "duration": 30,
        "sets": 1,
        "reps": 1,
        "holdTime": 30,
        "weights": 0
    }
]


async function run() {
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Access the database and collection
        const database = client.db(dbName);
        const collection = database.collection(collectionName);

        // Insert the exercise data into the collection
        const result = await collection.insertMany(exercises);
        console.log(`${result.insertedCount} exercises were inserted.`);
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        // Close the connection
        await client.close();
    }
}

// Run the function
run().catch(console.dir);
