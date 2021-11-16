
import LoginPage from '../pages/login/index';
import Cadastro from '../pages/cadastro/index';
import Home from '../pages/home/index';
import MarcarConsulta from '../pages/marcar-consulta/index';
import ConsultasAnteriores from '../pages/consultas-anteriores/index';
import MinhasConsultas from '../pages/minhas-consultas/index';
import Scheduler from '../scheduler/index';
import MasterHome from '../master-pages/home/index';
import Consultorios from '../master-pages/consultorios/index';
import ConsultorioPage from '../master-pages/consultorio/index';
import AdicionarInformacoes from '../master-pages/adicionar-informacoes/index';
import Informacoes from '../master-pages/informacoes/index';
import CadastroMedico from '../manager-pages/cadastro-medico/index';
import HomeManager from '../manager-pages/home-manager/index';
import NovoConsultorio from '../master-pages/novo-consultorio';


export const routes = [

    {
        path: '/login',
        Component: LoginPage,
        
    },
    {
        path: '/cadastro',
        Component: Cadastro,
        privacy: ''
    },
    {
        path: '/home',
        Component: Home,
        privacy: 'pacient'
    },
    {
        path: '/marcar-consulta',
        Component: MarcarConsulta,
        privacy: 'pacient'
    },
    {
        path: '/consultas-anteriores',
        Component: ConsultasAnteriores,
        privacy: 'pacient'
    },
    {
        path: '/minhas-consultas',
        Component: MinhasConsultas,
        privacy: 'pacient'
    },
    {
        path: '/consultorios',
        Component: Consultorios,
        privacy: 'b'
    },
    {
        path: '/novo-consultorio',
        Component: NovoConsultorio,
        privacy: 'b'
    },
    {
        path: '/consultorio',
        Component: ConsultorioPage,
        privacy: 'b'
        
    },
    {
        path: '/adicionar-informacoes',
        Component: AdicionarInformacoes,
        privacy: 'b'
    },
    {
        path: '/informacoes',
        Component: Informacoes,
        privacy: 'b'
    },
    {
        path: '/cadastro-medico',
        Component: CadastroMedico,
        privacy: 'b'
    },
    {
        path: '/home-manager',
        Component: HomeManager,
        privacy: 'm'
    },
    {
        path: '/scheduler',
        Component: Scheduler,
        privacy: 'm'
    },
    {
        path: '/master-home',
        Component: MasterHome,
        privacy: 'm'
    },
    
]