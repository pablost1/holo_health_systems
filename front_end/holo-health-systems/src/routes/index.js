
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
import MedicoHome from '../medico-pages/home/index';
import MeusHorarios from '../medico-pages/meus-horarios';
import EmAndamento from '../medico-pages/em-andamento/index';
import SalasConsultorio from '../master-pages/salas-consultorio/index';



export const routes = [

    {
        path: '/login',
        Component: LoginPage,
        privacy: ''
        
    },
    {
        path: '/cadastro',
        Component: Cadastro,
        privacy: ''
    },
    {
        path: '/home',
        Component: Home,
        privacy: 'paciente'
    },
    {
        path: '/marcar-consulta',
        Component: MarcarConsulta,
        privacy: 'paciente'
    },
    {
        path: '/consultas-anteriores',
        Component: ConsultasAnteriores,
        privacy: 'paciente'
    },
    {
        path: '/minhas-consultas',
        Component: MinhasConsultas,
        privacy: 'paciente'
    },
    {
        path: '/consultorios',
        Component: Consultorios,
        privacy: 'mestre'
    },
    {
        path: '/novo-consultorio',
        Component: NovoConsultorio,
        privacy: 'mestre'
    },
    {
        path: '/consultorio',
        Component: ConsultorioPage,
        privacy: 'mestre'
        
    },
    {
        path: '/adicionar-informacoes',
        Component: AdicionarInformacoes,
        privacy: 'mestre'
    },
    {
        path: '/informacoes',
        Component: Informacoes,
        privacy: 'mestre'
    },
    {
        path: '/cadastro-medico',
        Component: CadastroMedico,
        privacy: 'gerente'
    },
    {
        path: '/home-manager',
        Component: HomeManager,
        privacy: 'gerente'
    },
    {
        path: '/scheduler',
        Component: Scheduler,
        privacy: 'gerente'
    },
    {
        path: '/master-home',
        Component: MasterHome,
        privacy: 'mestre'
    },
    {
        path: '/medico-home',
        Component: MedicoHome,
        privacy: 'medico'
    },
    {
        path: '/meus-horarios',
        Component: MeusHorarios,
        privacy: 'medico'
    },
    {
        path: '/em-andamento',
        Component: EmAndamento,
        privacy: 'medico'
    },
    {
        path: '/salas',
        Component: SalasConsultorio,
        privacy: 'mestre'
    }


    
]