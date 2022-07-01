import React from 'react';
import { Link } from 'react-router-dom';

function Navigation () {
    return (
        <div>
            <nav>
                <Link className="link" to='/'>Go to Home Page</Link>
                <Link className="link" to='/createExercise'>Go to Add New Exercise Page</Link>
            </nav>
        </div>
    )
}

export default Navigation;