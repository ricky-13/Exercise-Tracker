import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

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

    deleteExercise(id){
        axios.delete('http://localhost:5000/exercises/'+id)
            .then(res => console.log(res.data));

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }
    render() {
        return (
            <div>
                <p>You are on the Exercises List component!</p>
            </div>
        )
    }
}