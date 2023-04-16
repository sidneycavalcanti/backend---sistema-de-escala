import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Militar from'./pages/Militar';

import User from'./pages/User';


export default function App() {
  return (
    <Router>
      <Switch>
        <Route component={ User } path ="/user" exact />

        <Route component={ Militar } path ="/militar" exact />
        <Route component = { MainPage } path="/principal" exact />  
        <Route component = { Login } path="/" exact />
      </Switch>
    </Router>
    );
};
