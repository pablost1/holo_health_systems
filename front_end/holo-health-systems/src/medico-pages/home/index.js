import HomeHeader from "../../sharable-components/home-header"
import MainContainer from '../../sharable-components/main-container/index'
import Subtitle from '../../sharable-components/subtitle/index'
import ScheduleButton from '../../sharable-components/schedule-button/index'
import Consulta from '../../sharable-components/consulta/index'
import { useHistory } from 'react-router-dom';
import { useEffect } from "react"
import http from '../../http/index';





export default function MedicoHome() {

    const history = useHistory()
    

    function IrParaHorarios() {
        history.push('/meus-horarios')
    }

    function IrParaVinculos() {
        history.push('/vincular-consultorio')
    }


    useEffect(() => {
        (async () => {

            try {
                const { data } = await http.get('/medico/reserva_em_andamento')
                console.log(data)
            }

            catch(err) {
                console.log(err)
            }
        })()
    }, [])


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
            </MainContainer>
        </div>
    )
}


