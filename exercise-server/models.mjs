import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

export async function createExercise(name, reps, weight, unit, date) {
    const exercise = await new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    return exercise.save();
};

export async function searchExercises(filter) {
    const query = await Exercise.find(filter);
    return query;
};

export async function updateUser(filter, update) {
    const exerciseUpdate = await Exercise.updateOne(filter, update);
    if (exerciseUpdate.modifiedCount === 1) {
        const updatedDoc = await searchExercises(filter);
        return {'updatedDoc': updatedDoc, 'modifiedCount': 1};
    }
    return {'updatedDoc': undefined, 'modifiedCount': 0};
};

export async function deleteExercise(filter) {
    let deletion;
    deletion = await Exercise.deleteOne(filter);
    return deletion;
    if (deletion.deletedCount === 0) {
        return {'Error': 'Not Found'};
    }
    return {'deletedCount': deletion.deletedCount};
}


db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});