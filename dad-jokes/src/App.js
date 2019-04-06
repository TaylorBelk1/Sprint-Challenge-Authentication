import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import './App.css';
import Login from './login/login';
import DadJokes from './dadjokes/djokes';

class App extends Component {
  render() {
    return (
      <>
      <header>
        <nav>
          <NavLink to="/login">Login</NavLink>
          &nbsp; | &nbsp;
          <NavLink to="/dad-jokes">Dad-Jokes</NavLink>
        </nav>
      </header>
      <main>
        <Route path="/login" component={Login} />
        <Route path="/dad-jokes" component={DadJokes} />
      </main>
      </>
    );
  }
}

export default App;
