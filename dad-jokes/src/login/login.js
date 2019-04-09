import React, { Component } from 'react';
import axios from 'axios';


class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
        }
    }
    
    render() {
        return(
            <>
                <h2>Login</h2>
                
                    <div>
                        <h4>Username: </h4>
                        <br />
                        <input 
                            name="username"
                            id="username"
                            value={this.state.username}
                            onChange={this.handleInputChange}
                            type="text"
                        />
                    </div>
                        <br></br>
                    <div>
                        <h4>Password: </h4>
                        <br />
                        <input 
                            name="password"
                            id="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            type="password"
                        />
                    </div>
                        <br></br>
                    <div>
                        <button onClick={this.handleSubmit}>Login</button>
                    </div>
            </>
        )
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        axios
            .post('http://localhost:3300/api/login', this.state)
            .then(res => {
                localStorage.setItem('jwt', res.data.token);
            }).catch(e => {
                console.error(e);
            });
    }
}

export default Login