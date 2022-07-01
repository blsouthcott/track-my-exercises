import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';


function ExerciseRow ({ exercise, onDelete, onEdit}) {
    
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td id='edit-icon'><AiOutlineEdit onClick={ () => onEdit(exercise)}/></td>
            <td id='trash-can'><AiOutlineDelete onClick={ () => onDelete(exercise._id)}/></td>
        </tr>
    )
}

export default ExerciseRow;
