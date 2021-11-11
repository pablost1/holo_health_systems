
import './App.css';
import React, {  useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


import { AuthorizationContext }  from './auth/authContext';
import Home from './pages/home';
import Cadastro from './pages/cadastro';
import LoginPage from './pages/login/index';
import MarcarConsulta from './pages/marcar-consulta';
import Scheduler from './scheduler';
import NovoConsultorio from './master-pages/novo-consultorio';
import AdicionarInformacoes from './master-pages/adicionar-informacoes';




import { AuthContext } from './auth/authContext';
import ConsultasAnteriores from './pages/consultas-anteriores/index';
import Modal from './utils/modal';

import MinhasConsultas from './pages/minhas-consultas';
import MasterHome from './master-pages/home/index';
import Consultorios from './master-pages/consultorios/index';
import ConsultorioPage from './master-pages/consultorio/index';








const PrivateRoute = ({ component: Component, ...rest }) => {

  const { isLoggedin } = useContext(AuthContext)

  return (
    <Route {...rest} render={props => (
      isLoggedin ? <Component /> : <Redirect to="/login"/>
    )}/>
  )
}




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
            <Route component={Cadastro} path="/cadastro"/>
            <Route component={Home} path="/home"  />
            <Route component={MarcarConsulta} path="/marcar-consulta" />
            <Route component={ConsultasAnteriores} path="/consultas-anteriores" />
            <Route component={MinhasConsultas} path="/minhas-consultas" />
            <Route component={Scheduler} path="/definir-horario" />
            <Route component={MasterHome} path="/master-home" />
            <Route component={NovoConsultorio} path="/novo-consultorio"/>
            <Route component={Consultorios} path="/consultorios" />
            <Route component={ConsultorioPage} path="/consultorio" />
            <Route component={AdicionarInformacoes} path="/adicionar-informacoes" />
            
            

            {/* <PrivateRoute component={ConsultasAnteriores} path="/consultas-anteriores"  /> */}
          </Switch>

          
        </div>
        <Modal/>
      </Router>
    </AuthorizationContext>
    
  );
}





export default App;
