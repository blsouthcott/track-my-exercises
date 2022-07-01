import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ExercisesTable from '../components/ExercisesTable';

function HomePage ({ setExerciseToEdit }) {
    const history = useHistory();
    const [exercises, setExercises] = useState([]);

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const exercises = await response.json();
        setExercises(exercises);
    };

    const onEdit = async exerciseToEdit => {
        setExerciseToEdit(exerciseToEdit);
        history.push('/editExercise');
    }

    useEffect(() => {
        loadExercises()
    }, []);

    const onDelete = async id => {
        const response = await fetch(`/exercises/${id}`, {method: 'DELETE'});
        if (response.status === 204) {
            const getResponse = await fetch('/exercises');
            const exercises = await getResponse.json();
            setExercises(exercises);
        } else {
            console.error(`Failed to delete exercise with id = ${id}, status code = ${response.status}`);
        };
    };

    return (
        <div>
            <ExercisesTable exercises={exercises} onDelete={onDelete} onEdit={onEdit}/>
        </div>
    )
};

export default HomePage;
