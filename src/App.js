/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from './containers/Register';
import Update from './containers/Update';
import Menu from './components/Menu';
import Account from './components/Account';

const accounts = () => (
  <div className="content">
    <div className="Menu">
      <Menu />
    </div>
    <div className="User">
      <Account />
    </div>
    <div className="footer">
      <p>&copy; 2019 Raev</p>
    </div>
  </div>
);

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/register" component={Register} />
        <Route path="/account" component={accounts} />
        <Route path="/editUser" component={Update} />
      </Router>
    );
  }
}

export default App;
