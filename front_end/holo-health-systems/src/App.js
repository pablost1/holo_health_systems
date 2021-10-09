
import './App.css';
import React, { useState, useContext } from 'react';


import { AuthorizationContext }  from './auth/authContext';
import Components from './pages/components';
import Home from './pages/home';


function App() {
  
  
  
  return (  
    <AuthorizationContext >
      <div className="App">
        <Home />
      </div>
    </AuthorizationContext>
    
  );
}





export default App;
