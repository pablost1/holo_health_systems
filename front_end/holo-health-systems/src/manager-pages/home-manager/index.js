import './style.css'
import HomeHeader from '../../sharable-components/home-header/index';
import ScheduleButton from '../../sharable-components/schedule-button/index';
import MainContainer from '../../sharable-components/main-container/index';
import Subtitle from '../../sharable-components/subtitle';
import { useHistory } from 'react-router';

export default function HomeManager() {
    const hystory = useHistory();
    function redirecionarParaCadastro(){
        hystory.push("/cadastro-medico")

    }
    
    return (
        <div className="manager-home-container">
            <HomeHeader />
            <MainContainer>
                <Subtitle>O que deseja fazer?</Subtitle>
                <div className="lista-afazeres">
                    <ScheduleButton onClick={redirecionarParaCadastro}>Cadastrar Médico</ScheduleButton>
                    <ScheduleButton>Definir horário</ScheduleButton>
                </div>
            </MainContainer>
        </div>
    )
}