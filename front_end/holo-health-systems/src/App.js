
import './App.css';
import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


import { AuthorizationContext }  from './auth/authContext';
import Components from './pages/components';
import Home from './pages/home';
import Cadastro from './pages/cadastro';
import { render } from '@testing-library/react';
import LoginPage from './pages/login/index';
import MarcarConsulta from './pages/marcar-consulta';


function App() {
  
  
  
  return (  
    <AuthorizationContext >
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Redirect to="/login"/>
            </Route>
            <Route render={LoginPage} path="/login" />
            <Route render={Home} path="/home"/>
            <Route render={Cadastro} path="/cadastro"/>
            <Route render={MarcarConsulta} path="/marcar-consulta" />
          </Switch>

          
        </div>
      </Router>
    </AuthorizationContext>
    
  );
}





export default App;
