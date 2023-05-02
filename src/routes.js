import React from 'react';
import {BrowserRouter as  Router, Route, Switch} from 'react-router-dom';

import Login from './pages/Login';
import Servico from './pages/Servico';
import Militar from'./pages/Militar';
import Principal from './pages/MainPage'
import User from'./pages/User';

export default function App() {
  return (
    <Router>
      <Switch>      
        <Route component = { Login } path="/" exact />
        <Route component={ Principal } path ="/principal" exact />
        <Route component = { Servico } path="/servico" exact />  
        <Route component={ Militar } path ="/militar" exact />
        <Route component={ User } path ="/user" exact />
      </Switch>
    </Router>
    );
};
