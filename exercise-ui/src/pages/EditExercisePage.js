import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navigation from '../components/Navigation';

function EditExercisePage ({ exerciseToEdit }) {

    console.log(JSON.stringify(exerciseToEdit));

    const history = useHistory();

    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const editExercise = async () => {
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify({ 'name': name, 'reps': reps, 'weight': weight, 'unit': unit, 'date': date }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            alert(`Successfully updated exercise with id = ${exerciseToEdit._id}`);
        } else {
            alert(`Unable to update exercise with id = ${exerciseToEdit._id}`)
        };
        history.push('/');
    };

    return (
        <div>
            <h1>Edit Exercise</h1>
            <input type='text' value={name}
                onChange={e => setName(e.target.value)}/><br/>
            <input type='number' value={reps}
                onChange={e => setReps(e.target.value)}/><br/>
            <span id='weight-input'>
            <input type='number' value={weight}
                onChange={e => setWeight(e.target.value)}/>
            <select value={unit} onChange={e => setUnit(e.target.value)}>
                <option value='lbs'>lbs</option>
                <option value='kgs'>kgs</option>
            </select><br/>
            </span>
            <input type='text' value={date}
                onChange={e => setDate(e.target.value)}/><br/>
            <button
                onClick={editExercise}
            >Save</button>
        </div>
    )
};

export default EditExercisePage;
