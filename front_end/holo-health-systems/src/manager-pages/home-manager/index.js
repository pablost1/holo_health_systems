import './style.css'
import HomeHeader from '../../sharable-components/home-header/index';
import ScheduleButton from '../../sharable-components/schedule-button/index';
import MainContainer from '../../sharable-components/main-container/index';
import Subtitle from '../../sharable-components/subtitle';
import { useHistory } from 'react-router';
import http from '../../http/index';
import { useEffect, useState } from 'react';



export default function HomeManager() {
    const [ consultorio, setConsultorio] = useState({})

    const history = useHistory();
    function redirecionarParaCadastro(){
        history.push("/cadastro-medico")

    }
    
    function redirecionarParaSalas() {
        history.push('/salas')
    }


    useEffect(() => {
        (
            async () => {

                try {
                    const { data } = await http.get('/consultorio/meu_consultorio')
                    setConsultorio(data)
                    console.log(data)
                }
                
                catch(err) {
                    console.log(err)
                }
            }
        )()
    },[])

    return (
        <div className="manager-home-container">
            <HomeHeader />
            <MainContainer>
                <Subtitle>O que deseja fazer?</Subtitle>
                <p>Gerência do consultório </p>
                <p></p>
                <div className="lista-afazeres">
                    <ScheduleButton onClick={redirecionarParaCadastro}>Cadastrar Médico</ScheduleButton>
                    <ScheduleButton onClick={redirecionarParaSalas}>Definir horário</ScheduleButton>
                </div>
            </MainContainer>
        </div>
    )
}