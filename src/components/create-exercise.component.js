import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateExercises extends Component {
// all react classes start with a constructor and they start with a super(props) call
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
// 

// setting the initial state of the component by assigning and obj to this.state
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

//react lifestyle method that react will automatically call 
//eventually we'll have users directly coming from the mongoDB, but for now we'll hardcode a user
    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(res => {
                if(res.data.length > 0) {
                    this.setState({
                        users: res.data.map(user => user.username),
                        username: res.data[0].username
                    })
                }
            })
    }

//adding methods to update the state properties 
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
//whenever someone will change the usrname this method will be called. target is the textbox in this case 


    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();
// prevents the default behavior of form submission, which typically involves reloading the page

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);
        // used for debugging, but cant see for long if the code line below is not commented. takes to different page

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data));

        // window.location = '/';
// redirects the user to the root URL ('/'). It's a way to navigate the user to a different page or route after the form submission
    }

    render() {
        return (
            // <div>
            //     <form>
            //         <div class="form-group">
            //             <label for="exampleInputEmail1">Email address</label>
            //             <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            //             <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            //         </div>
            //         <div class="form-group">
            //             <label for="exampleInputPassword1">Password</label>
            //             <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
            //         </div>
            //         <div class="form-check">
            //             <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
            //             <label class="form-check-label" for="exampleCheck1">Check me out</label>
            //         </div>
            //         <button type="submit" class="btn btn-primary">Submit</button>
            //     </form>
            // </div>
             <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Username: </label>
                        <select ref='userInput'
                            required 
                            className='form-control'
                            value={this.state.username}
                // har jagah hi this.state.username dala hua h
                            onChange={this.onChangeUsername}>
                                {
                                    this.state.users.map(function(user){
                                        return <option
                                        key={user}
                                        value={user}>{user}
                                        </option>
                                    })
                                }
                //      
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type = 'text'
                            required
                            className='form-control'
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input type = 'text'
                            className='form-control'
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                            />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                                />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type='submit' value='Create Exercise Log' className='btn btn-primary' />
                    </div>
                </form>
            </div> 
        )
    }
}