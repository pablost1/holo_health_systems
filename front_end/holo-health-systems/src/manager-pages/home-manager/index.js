import './style.css'
import HomeHeader from '../../sharable-components/home-header/index';
import ScheduleButton from '../../sharable-components/schedule-button/index';
import MainContainer from '../../sharable-components/main-container/index';
import Subtitle from '../../sharable-components/subtitle';


export default function HomeManager() {
    return (
        <div className="manager-home-container">
            <HomeHeader />
            <MainContainer>
                <Subtitle>O que deseja fazer?</Subtitle>
                <div className="lista-afazeres">
                    <ScheduleButton >Cadastrar Médico</ScheduleButton>
                    <ScheduleButton>Definir horário</ScheduleButton>
                </div>
            </MainContainer>
        </div>
    )
}