
import './App.css';
import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


import { AuthorizationContext }  from './auth/authContext';
import Home from './pages/home';
import Cadastro from './pages/cadastro';
import LoginPage from './pages/login/index';
import MarcarConsulta from './pages/marcar-consulta';


import { AuthContext } from './auth/authContext';





function App() {
  
  
  
  
  return (  
    <AuthorizationContext >
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Redirect to="/login"/>
            </Route>
            <Route component={LoginPage} path="/login" />
            <Route component={Home} path="/home"/>
            <Route component={Cadastro} path="/cadastro"/>
            <Route component={MarcarConsulta} path="/marcar-consulta" />
          </Switch>

          
        </div>
      </Router>
    </AuthorizationContext>
    
  );
}





export default App;
