import './style.css'
import HomeHeader from '../../sharable-components/home-header'
import MainContainer from '../../sharable-components/main-container/index';
import Subtitle from '../../sharable-components/subtitle/index';
import ScheduleButton from '../../sharable-components/schedule-button/index';
import { useHistory } from 'react-router-dom';



export default function MasterHome() {
    const history = useHistory()


    function IrParaVerConsultorios() {
        history.push('/consultorios')
    }


    function IrParaCriarConsultorios() {
        history.push('/novo-consultorio')
    }

    function IrParaVerInformacoes() {
        history.push('/informacoes')
    }


    function IrParaCriarInformacoes() {
        history.push('/adicionar-informacoes')
    }

    function IrParaCadastrarGerente() {

        history.push('/cadastro-gerente')
    }

    return (
        <div className="master-home-container">
            <HomeHeader />
            <MainContainer>
                <Subtitle>O que deseja fazer?</Subtitle>
                <div className="lista-afazeres">
                    <ScheduleButton onClick={IrParaVerConsultorios} >Ver consultórios</ScheduleButton>
                    <ScheduleButton onClick={IrParaCriarConsultorios}>Criar consultórios</ScheduleButton>
                    <ScheduleButton onClick={IrParaCriarInformacoes}>Criar informações</ScheduleButton>
                    <ScheduleButton onClick={IrParaCadastrarGerente}>Cadastrar gerente</ScheduleButton>
                </div>
            </MainContainer>

        </div>
    )
}