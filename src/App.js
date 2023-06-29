import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component.js";
import ExerciseList from "./components/exercise-list.component.js";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";


function App() {
  return (
    <div className='container'>
      <Router>
        <Navbar />
        <br/>
        <Routes>
          <Route path="/" element = {<ExerciseList />} />
          <Route path="/edit/:id" element = {<EditExercise />} />
          <Route path="/create" element = {<CreateExercise />} />
          <Route path="/user" element = {<CreateUser />} />
        </Routes>
      </Router >
    </div>
  );
}

export default App;
