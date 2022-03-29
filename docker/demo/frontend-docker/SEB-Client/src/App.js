import React, { Component } from 'react';
import { HashRouter as Router, Route,Switch } from 'react-router-dom';

import './App.css';

import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';


class App extends Component {
  render() {
    return (
      <div>
        <Router>
          
        <Route exact path="/" component={Home} /> 
            <Route exact path="/register" component={Register} /> 
            <Route exact path="/login" component={Login} />
          
          
        </Router>
        </div>
    );
  }
}

export default App;
