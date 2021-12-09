
import './App.css';
import React from 'react';
import Modal from './utils/modal';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext }  from './auth/authContext';
import { routes } from './routes';
import { useContext } from 'react';
import moment from 'moment'
import Error404 from './utils/404';
import LoginPage from './pages/login';
import { useEffect } from "react"






moment.locale('pt-br')    
// import { AuthContext } from './auth/authContext' {  useContext };




const PrivateRoute = ({ component: Component, ...rest }) => {

  const { isLoggedin } = useContext(AuthContext)
  

  return (
    <Route {...rest} render={ props => {
      console.log('private route')

      if(!isLoggedin && rest.privacy !== '') return <Redirect to="/login" />

      if(rest.privacy === rest.type) {

        return <Component />
      }

      if(rest.privacy === '') {
        return <Component />
      }


      return <Error404>Acesso negado!</Error404>


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
          <Route exact path={["/", "/login"]} render={(props) => {
            
            

            if(isLoggedin && userType === 'Gerente') {

              
              return <Redirect to="home-manager" /> 
            }
            
            if(isLoggedin && userType === 'Paciente') {
              return <Redirect to="home" /> 
            }

            if(isLoggedin && userType === 'Mestre' ) {
              return <Redirect to="master-home" />
            }

            return <LoginPage />
          }}/>
            
          {routes.map( (route, index) => (
            <PrivateRoute key={index} component={route.Component} privacy={route.privacy} path={route.path} type={userType}/>
          ))}
          <Route path="*" render={ props => <Error404>Erro 404! Página não encontrada!</Error404>}/>
        </Switch>
      </div>
      <Modal/>
    </Router>
  
  
  );
}

export default App
