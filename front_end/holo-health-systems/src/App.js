
import './App.css';
import React from 'react';
import Modal from './utils/modal';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext, AuthorizationContext }  from './auth/authContext';
import { routes } from './routes';
import { useContext } from 'react';
import AcessoNegado from './utils/acesso-negado/index';
import moment from 'moment'
import Error404 from './utils/404';





moment.locale('pt-br')    
// import { AuthContext } from './auth/authContext' {  useContext };


const PrivateRoute = ({ component: Component, ...rest }) => {

  const { isLoggedin } = useContext(AuthContext)
  

  return (
    <Route {...rest} render={ props => {
      if(!isLoggedin) return <Redirect to="/login" />

      if(rest.privacy === rest.type) {

        return <Component />
      }

      if(rest.privacy === '') {
        return <Component />
      }


      return <Error404>Access denied! Do you think we are fools, idiot!!??</Error404>


    }} />
  )

  // return (
  //   <Route {...rest} render={props => (
  //     isLoggedin ? <Component /> : <Redirect to="/login"/>
  //   )}/>
  // )
}




function App() {

  const { userType, isLoggedin }  = useContext(AuthContext)
  

  
  return (   
    <Router>
      <div className="App">
        <Switch>
          <Route exact path={["/", "/login"]}>
            {
              isLoggedin && userType === 'gerente' && <Redirect to="home-manager" /> 
            }
            {
              isLoggedin && userType === 'paciente' && <Redirect to="home" /> 
            }
            
            {
              isLoggedin && userType === 'mestre' && <Redirect to="master-home" />
            }
            {
              !isLoggedin && <Redirect to="/login" />
            }
          </Route>
          {routes.map( (route, index) => (
            <PrivateRoute component={route.Component} privacy={route.privacy} path={route.path} type={userType}/>
          ))}
          <Route path="*" render={ props => <Error404>Error 404! This page doesn't exist, idiot!</Error404>}/>
        </Switch>
      </div>
      <Modal/>
    </Router>
      
  
  );
}

export default App
