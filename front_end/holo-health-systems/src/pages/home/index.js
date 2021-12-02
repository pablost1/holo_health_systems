import './style.css'
import HomeHeader from '../../sharable-components/home-header'
import MainContainer from '../../sharable-components/main-container'
import ScheduleButton from '../../sharable-components/schedule-button/index';
import Subtitle from '../../sharable-components/subtitle';
import Consulta from '../../sharable-components/consulta';
import { useHistory } from 'react-router-dom';







export default function Home() {
    
    const history = useHistory()


    function PaginaMarcarConsulta() {
        history.push('/marcar-consulta')
    }

    function PaginaMinhasConsultas() {
        history.push('minhas-consultas')
    }

    

    return (
        <div className="home-container">
            <HomeHeader />
            <MainContainer>
                <Subtitle>O que deseja fazer?</Subtitle>
                <div className="lista-afazeres">
                    <ScheduleButton onClick={PaginaMarcarConsulta}>Marcar consultas</ScheduleButton>
                    <ScheduleButton onClick={PaginaMinhasConsultas}>Minhas consultas</ScheduleButton>
                </div>
                <Subtitle>Próxima consulta</Subtitle>
                <Consulta />
                <Subtitle>Consultas anteriores</Subtitle>
                <div className="lista-consulta">
                    <Consulta />
                    <Consulta />
                    <Consulta />
                </div>
            </MainContainer>
        </div>
    )
}