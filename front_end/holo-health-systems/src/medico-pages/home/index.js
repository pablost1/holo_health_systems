import HomeHeader from "../../sharable-components/home-header"
import MainContainer from '../../sharable-components/main-container/index'
import Subtitle from '../../sharable-components/subtitle/index'
import ScheduleButton from '../../sharable-components/schedule-button/index'
import Consulta from '../../sharable-components/consulta/index'
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from "react"
import http from '../../http/index';





export default function MedicoHome() {

    const [ reservaEmAndamento, setReservaEmAndamento ] = useState(null)
    const [ nomeMedico, setNomeMedico ] = useState('')

    const history = useHistory()
    

    function IrParaHorarios() {
        history.push('/meus-horarios')
    }

    function IrParaVinculos() {
        history.push('/vincular-consultorio')
    }

    async function CarregarNome(){

        try {
            const { data } = await http.get('/medico/info')
            setNomeMedico(nomeMedico + data.sobrenome)
    
        }

        catch(err) {
            
        }
        
        
    }


    useEffect(() => {
        (async () => {

            try {
                const {data} = await http.get('/medico/reserva_em_andamento')
                setReservaEmAndamento(data.Reservas)
            }

            catch(err) {
                
            }
        })()
        CarregarNome()
    }, [])


    return (
        <div className="home-container">
            <HomeHeader usuario={nomeMedico} />
            <MainContainer>
            <Subtitle>O que deseja fazer?</Subtitle>
                <div className="lista-afazeres">
                    <ScheduleButton onClick={IrParaHorarios} >Meus horários</ScheduleButton>
                    <ScheduleButton onClick={IrParaVinculos} >Meus vínculos</ScheduleButton>
                    
                </div>
                {
                    reservaEmAndamento ? (<>
                        <Subtitle>Em andamento</Subtitle>
                        <Consulta consulta={reservaEmAndamento} onGoing={true} type="onGoing"/>
                    </>) : ''
                }
                

            </MainContainer>
        </div>
    )
}


