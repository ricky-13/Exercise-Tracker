import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

//this file now has 2 components
//implemented as functional component, lack of lifecycle and state methods 
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        {/* used substring bcz date gives date time and timezone and we just need the date part */}
        <td>
            <Link to = {"/edit/" + props.exercise._id}>edit</Link> | <a href = "#" onClick = {() => { props.deleteExercise(props.exercise._id) }}>delete</a>
            {/* edit route is beind created, the path will be /edit/id */}
        </td>
    </tr>
)

//this component is a class component 
export default class ExerciseList extends Component {
    constructor(props){
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises')
            .then(res => {
                this.setState({ exercises: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    // lifecycle method that gets all the exercises from the backend and sets the exercises

    deleteExercise(id){
        axios.delete('http://localhost:5000/exercises/delete/'+id)
            .then(res => console.log(res.data));

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }
    //method to delete exercise by id 
    //and then also resets the state of exercises so that it doesnt still show on the page  

    exerciseList(){
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise = { currentexercise } deleteExercise = { this.deleteExercise } key = { currentexercise._id } />
            // might have to add semi colon at the end 
            //what does this do ????
        })
    }
    render() {
        return (
            <div>
                <h3> Logged Exercises </h3>
                <table className='table'>
                    <thead className='thead-light'>
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}