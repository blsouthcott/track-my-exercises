import React from 'react';
import ExercisesRow from './ExercisesRow';


function ExercisesTable ({ exercises, onDelete, onEdit}) {

    return (
        <div className='exercises-table'>
            <caption>Exercises</caption>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => <ExercisesRow exercise={exercise}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={i}/>)}
            </tbody>
       </div>
    )
};

export default ExercisesTable;
