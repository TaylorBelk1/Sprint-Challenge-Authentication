import React, { Component } from 'react';
import axios from 'axios';

class DadJokes extends Component {
    state = {
        jokes: []
    };

    render() {
        return(
            <>
                <h2>Dad Jokes</h2>
                <ul>
                    {this.state.jokes.map(joke => (
                        <li key={joke.id}>{joke.joke}</li>
                    ))}
                </ul>
            </>
        )
    }
    
    componentDidMount() {
        const headers = { authorization: localStorage.getItem('jwt') };
        axios
        .get('http://localhost:3300/api/jokes', {headers})
            .then(res => {
                this.setState({ jokes: res.data })
            })
            .catch(err => err)
    }
}

export default DadJokes