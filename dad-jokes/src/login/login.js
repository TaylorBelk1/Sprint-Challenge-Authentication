import React, { Component } from 'react';
import axios from 'axios';


class Login extends Component {
    state = {
        username: "",
        password: ""
    }
    render() {
        return(
            <>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="username">Username: </label>
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
                        <label htmlFor="password">Password: </label>
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
                        <button>Login</button>
                    </div>
                </form>
            </>
        )
    }

    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const endpoint = 'http://localhost:3300/api/register';

        axios
            .post(endpoint, this.state)
            .then(res => {
                localStorage.setItem('jwt', res.data.token);
            }).catch(e => {
                console.error(e);
            });
    }
}

export default Login