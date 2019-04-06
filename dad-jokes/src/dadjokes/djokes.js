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
                        <li key={joke.id}>{joke.jokename}</li>
                    ))}
                </ul>
            </>
        )
    }
    
    componentDidMount() {
        const headers = { authorization: localStorage.getItem('jwt') };
        const endpoint = 'http://localhost:3300/api/jokes';
        axios
        .get(endpoint, {headers})
            .then(res => {
                this.setState({ jokes: res.data })
            })
            .catch(e => {
                console.error(e);
            })
    }
}

export default DadJokes