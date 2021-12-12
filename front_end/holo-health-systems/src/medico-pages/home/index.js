import HomeHeader from "../../sharable-components/home-header"
import MainContainer from '../../sharable-components/main-container/index'
import Subtitle from '../../sharable-components/subtitle/index'
import ScheduleButton from '../../sharable-components/schedule-button/index'
import Consulta from '../../sharable-components/consulta/index'
import { useHistory } from 'react-router-dom';






export default function MedicoHome() {

    const history = useHistory()


    function IrParaHorarios() {
        history.push('/meus-horarios')
    }

    function IrParaVinculos() {
        history.push('/vincular-consultorio')
    }

    return (
        <div className="home-container">
            <HomeHeader />
            <MainContainer>
            <Subtitle>O que deseja fazer?</Subtitle>
                <div className="lista-afazeres">
                    <ScheduleButton onClick={IrParaHorarios} >Meus horários</ScheduleButton>
                    <ScheduleButton onClick={IrParaVinculos} >Meus vínculos</ScheduleButton>
                    
                </div>
                <Subtitle>Em andamento</Subtitle>
                <Consulta type="doctor" onGoing={true} />
                <Subtitle>Próximos horários</Subtitle>
                <div className="lista-consulta">
                    <Consulta type="doctor" onGoing={true} />
                    <Consulta onGoing={true} />
                    <Consulta onGoing={true} />
                </div>
            </MainContainer>
        </div>
    )
}


