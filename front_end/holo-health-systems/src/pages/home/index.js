import './style.css'
import HomeHeader from '../../sharable-components/home-header'
import MainContainer from '../../sharable-components/main-container'
import ScheduleButton from '../../sharable-components/schedule-button/index';
import Subtitle from '../../sharable-components/subtitle';
import Consulta from '../../sharable-components/consulta';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import http from '../../http/index';







export default function Home() {
    const [ proximaConsulta, setProximaConsulta] = useState(undefined)

    const history = useHistory()


    function PaginaMarcarConsulta() {
        history.push('/marcar-consulta')
    }

    function PaginaMinhasConsultas() {
        history.push('minhas-consultas')
    }

    async function CarregarProximaConsulta() {

        try {
            const { data } = await  http.get('/paciente/proxima_consulta')
            console.log(data)
        } 

        catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        CarregarProximaConsulta()
    }, [])


    

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
            </MainContainer>
        </div>
    )
}