import './style.css'
import HomeHeader from '../../sharable-components/home-header'
import MainContainer from '../../sharable-components/main-container/index';
import Subtitle from '../../sharable-components/subtitle/index';
import ScheduleButton from '../../sharable-components/schedule-button/index';



export default function MasterHome() {
    return (
        <div className="master-home-container">
            <HomeHeader />
            <MainContainer>
                <Subtitle>O que deseja fazer?</Subtitle>
                <div className="lista-afazeres">
                    <ScheduleButton >Ver consultórios</ScheduleButton>
                    <ScheduleButton>Criar consultórios</ScheduleButton>
                    <ScheduleButton >Ver informações</ScheduleButton>
                    <ScheduleButton>Criar informações</ScheduleButton>
                </div>
            </MainContainer>

        </div>
    )
}