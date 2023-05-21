import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import Login from './pages/Login';
import Servico from './pages/Servico';
import Militar from './pages/Militar';
import Principal from './pages/MainPage';
import User from './pages/User';

import { Spinner } from 'react-bootstrap';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [redirected, setRedirected] = useState(false);
  

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/verifyToken', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            setAuthenticated(true);
           
          } else {
            setAuthenticated(false);
          }      
        } catch (error) {
          console.error(error);
          setAuthenticated(false);
        }
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    };
    if (!redirected) { // Verificar se o redirecionamento já ocorreu antes de executar a verificação do token
      checkTokenValidity();
      setRedirected(true); // Marcar o redirecionamento como ocorrido
    } 
  }, [redirected]);

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          authenticated ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />

        <PrivateRoute component={Principal} path="/principal" exact />
        <PrivateRoute component={Servico} path="/servico" exact />
        <PrivateRoute component={Militar} path="/militar" exact />
        <PrivateRoute component={User} path="/user" exact />

        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;