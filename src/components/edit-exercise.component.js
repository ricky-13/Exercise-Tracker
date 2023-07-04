import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useParams, useNavigate } from "react-router-dom";

const EditExercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/exercises/${id}`)
      .then((res) => {
        setUsername(res.data.username);
        setDescription(res.data.description);
        setDuration(res.data.duration);
        setDate(new Date(res.data.date));
        
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get("http://localhost:5000/users/")
    .then((res) => {
      if (res.data.length > 0) {
        setUsers(res.data.map((user) => user.username));
      }
    });
  }, [id]);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };

  const onChangeDate = (date) => {
    setDate(date);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username,
      description,
      duration,
      date
    };

    axios
      .post(`http://localhost:5000/exercises/update/${id}`, exercise)
      .then((res) => console.log(res.data));

    navigate("/");
  };


  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={username}
            onChange={onChangeUsername}
          >
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected = {formattedDate} onChange={onChangeDate} dateFormat="yyyy-MM-dd" />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EditExercise;


// import React, { Component } from 'react';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { Link, useParams } from 'react-router-dom';

// export default class EditExercise extends Component {
// // all react classes start with a constructor and they start with a super(props) call
//     constructor(props) {
//         super(props);

//         this.onChangeUsername = this.onChangeUsername.bind(this);
//         this.onChangeDescription = this.onChangeDescription.bind(this);
//         this.onChangeDuration = this.onChangeDuration.bind(this);
//         this.onChangeDate = this.onChangeDate.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);
// // 

// // setting the initial state of the component by assigning and obj to this.state
//         this.state = {
//             username: '',
//             description: '',
//             duration: 0,
//             date: new Date(),
//             users: []
//         }
//     }

// //react lifestyle method that react will automatically call 
// //eventually we'll have users directly coming from the mongoDB, but for now we'll hardcode a user
//     componentDidMount() { 
//         // const { id } = useParams();
        
//         // const {params} = this.props.match;
//         // console.log(params);
//         axios.get('http://localhost:5000/exercises/' + this.props.match.params.id)
//             .then(res => {
//                 this.setState({
//                     username: res.data.username,
//                     description: res.data.description,
//                     duration: res.data.duration,
//                     date: new Date(res.data.date)
//                 })
//             })
//             .catch(function (err) {
//                 console.log(err)
//             })

//         axios.get('http://localhost:5000/users/')
//             .then(res => {
//                 if(res.data.length > 0) {
//                     this.setState({
//                         users: res.data.map(user => user.username)
//                     })
//                 }
//             })
//             //do we need this????
//     }

// //adding methods to update the state properties 
//     onChangeUsername(e) {
//         this.setState({
//             username: e.target.value
//         });
//     }
// //whenever someone will change the usrname this method will be called. target is the textbox in this case 


//     onChangeDescription(e) {
//         this.setState({
//             description: e.target.value
//         });
//     }

//     onChangeDuration(e) {
//         this.setState({
//             duration: e.target.value
//         });
//     }

//     onChangeDate(date) {
//         this.setState({
//             date: date
//         });
//     }

//     onSubmit(e) {
//         e.preventDefault();
// // prevents the default behavior of form submission, which typically involves reloading the page

//         const exercise = {
//             username: this.state.username,
//             description: this.state.description,
//             duration: this.state.duration,
//             date: this.state.date
//         }

//         console.log(exercise);
//         // used for debugging, but cant see for long if the code line below is not commented. takes to different page

//         axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
//             .then(res => console.log(res.data));

//         window.location = '/';
// // redirects the user to the root URL ('/'). It's a way to navigate the user to a different page or route after the form submission
//     }

//     render() {
//         return (
//             <div>
//                 <h3>Edit Exercise Log</h3>
//                 <form onSubmit={this.onSubmit}>
//                     <div className='form-group'>
//                         <label>Username: </label>
//                         <select ref='userInput'
//                             required 
//                             className='form-control'
//                             value={this.state.username}
//                 // har jagah hi this.state.username dala hua h
//                             onChange={this.onChangeUsername}>
//                                 {
//                                     this.state.users.map(function(user){
//                                         return <option
//                                         key={user}
//                                         value={user}>{user}
//                                         </option>
//                                     })
//                                 }
//                 //      
//                         </select>
//                     </div>
//                     <div className="form-group">
//                         <label>Description: </label>
//                         <input type = 'text'
//                             required
//                             className='form-control'
//                             value={this.state.description}
//                             onChange={this.onChangeDescription}
//                             />
//                     </div>
//                     <div className="form-group">
//                         <label>Duration (in minutes): </label>
//                         <input type = 'text'
//                             className='form-control'
//                             value={this.state.duration}
//                             onChange={this.onChangeDuration}
//                             />
//                     </div>
//                     <div className="form-group">
//                         <label>Date: </label>
//                         <div>
//                             <DatePicker
//                                 selected={this.state.date}
//                                 onChange={this.onChangeDate}
//                                 />
//                         </div>
//                     </div>

//                     <div className="form-group">
//                         <input type='submit' value='Edit Exercise Log' className='btn btn-primary' />
//                     </div>
//                 </form>
//             </div>
//         )
//     }
// }