import 'dotenv/config';
import express, { query } from 'express';
import bodyParser from 'body-parser';
import asyncHandler from 'express-async-handler';
import * as exercises from './models.mjs';

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
};

function bodyIsValid(body) {
    let filter = {};
    try {
        filter.name = body.name;
        filter.reps = parseInt(body.reps);
        filter.weight = parseInt(body.weight);
        filter.unit = body.unit;
        filter.date = body.date;
    } catch (e) {
        console.log(e);
        return undefined;
    };

    if (filter.name.length == 0 || filter.name === null || filter.name === undefined) {
        console.log('invalid name in request body');
        return undefined;
    };

    if (filter.reps <= 0 || isNaN(filter.reps) === true) {
        console.log('invalid reps in request body');
        return undefined;
    };
    if (filter.weight <= 0 || isNaN(filter.weight) === true) {
        console.log('invalid weight in request body');
        return undefined;
    };
    if (filter.unit !== 'kgs' && filter.unit !== 'lbs') {
        console.log('invalid unit in request body');
        return undefined;
    };
    if (isDateValid(filter.date) === false) {
        console.log('invalid date in request body');
        return undefined;
    };
    
    return filter;
};

app.post('/exercises', async (req, res) => {
    res.setHeader('content-type', 'application/json');
    console.log('Received body: ' + JSON.stringify(req.body));
    let filter = bodyIsValid(req.body);
    console.log('filter created from request body: ' + JSON.stringify(filter));
    if (filter === undefined) {
        return res.status(400).send({ Error: "Invalid request" });
    };
    const newExercise = await exercises.createExercise(filter.name, filter.reps, filter.weight, filter.unit, filter.date);
    console.log('New exercise created: ' + newExercise);
    res.status(201).send(newExercise);
});

app.get('/exercises/:id', async (req, res) => {
    res.setHeader('content-type', 'application/json');
    const filter = {'_id': req.params.id};
    console.log('searching for document with id: ' + filter._id);
    const savedExercise = await exercises.searchExercises(filter);
    if (savedExercise.length === 0) {
        return res.status(404).send({'Error': 'Not found'});
    };
    res.send(savedExercise);
});

app.get('/exercises', async (req, res) => {
    res.setHeader('content-type', 'application/json');
    const savedExercises = await exercises.searchExercises({});
    res.send(savedExercises);
});

app.put('/exercises/:id', async (req, res) => {
    res.setHeader('content-type', 'application/json');
    const update = bodyIsValid(req.body);
    if (update === undefined) {
        return res.status(400).send({ Error: "Invalid request"});
    };
    const filter = {'_id': req.params.id};
    const exerciseUpdate = await exercises.updateUser(filter, update);
    if (exerciseUpdate.modifiedCount === 0) {
        return res.status(404).send({ Error: 'Not found' });
    };
    res.send(exerciseUpdate.updatedDoc);
});

app.delete('/exercises/:id', async (req, res) => {
    const deletion = await exercises.deleteExercise({'_id': req.params.id});
    if (deletion.deletedCount === 0) {
        res.status(404).send({'Error': 'Not found'});
    }
    res.status(204).send();
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
