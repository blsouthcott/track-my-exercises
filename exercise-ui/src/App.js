import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditExercisePage from './pages/EditExercisePage';
import CreateExercisePage from './pages/CreateExercisePage';
import Navigation from './components/Navigation';

function App() {
    const [exerciseToEdit, setExerciseToEdit] = useState([]);
    return (
        <div className="App">
            <header className="App-header">
                <h1>
                    Exercises Database
                </h1>
                <p>
                    App which allows you to keep track of all your exercises.
                </p>
            </header>
            <Router>
                <Navigation />
                <Route path='/' exact>
                    <HomePage setExerciseToEdit={setExerciseToEdit}/>
                </Route>
                <Route path='/editExercise'>
                    <EditExercisePage exerciseToEdit={exerciseToEdit}/>
                </Route>
                <Route path='/createExercise'>
                    <CreateExercisePage />
                </Route>
            </Router>
            <div>
            <footer>
                © 2022 Ben Southcott
            </footer>
            </div>
        </div>
    );
}

export default App;
