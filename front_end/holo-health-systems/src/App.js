
import './App.css';
import React from 'react';
import Modal from './utils/modal';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthorizationContext }  from './auth/authContext';
import { routes } from './routes';
import moment from 'moment'

moment.locale('pt-br')    
// import { AuthContext } from './auth/authContext' {  useContext };
// const PrivateRoute = ({ component: Component, ...rest }) => {

//   const { isLoggedin } = useContext(AuthContext)

//   return (
//     <Route {...rest} render={props => (
//       isLoggedin ? <Component /> : <Redirect to="/login"/>
//     )}/>
//   )
// }



function App() {
  
  return (  
    <AuthorizationContext >
      <React.Suspense fallback={<p>Loading...</p>}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/">
                <Redirect to="/login"/>
              </Route>
              {routes.map( route => (
                <Route component={route.Component} path={route.path} />
              ))}
            </Switch>
          </div>
          <Modal/>
        </Router>
      </React.Suspense>
    </AuthorizationContext>
  );
}

export default App;
