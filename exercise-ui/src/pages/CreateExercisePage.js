import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navigation from '../components/Navigation';

function CreateExercisePage () {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const history = useHistory();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert('Successfully added new exercise!')
        } else {
            alert(`Failed to add new exercise, status code = ${response.status}`);
        }
        history.push('/');
    }

    return (

        
        <div>
            <h1>Add New Exercise</h1>
            <form className='add-exercise-form'>
                <fieldset>
                    <legend>Add New Exercise</legend><br/>
                    <input type='text' value={name} placeholder='Exercise Name'
                        onChange={e => setName(e.target.value)}/><br/>
                    <input type='number' value={reps} placeholder='Total Reps'
                        onChange={e => setReps(e.target.value)}/><br/>
                    <span id='weight-input'>
                    <input type='number' value={weight} placeholder='Total Weight'
                        onChange={e => setWeight(e.target.value)}/>
                    <select value={unit} onChange={e => setUnit(e.target.value)}>
                        <option value='lbs'>lbs</option>
                        <option value='kgs'>kgs</option>
                    </select><br/>
                    </span>
                    <input type='text' value={date} placeholder='Date'
                        onChange={e => setDate(e.target.value)}/>
                    
                </fieldset>
                <button id='add-exercise-button' onClick={e => {
                    addExercise();
                    e.preventDefault();
                }}>Add New Exercise</button>
            </form>
        </div>
    )
};

export default CreateExercisePage;
