
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import http from '../../http';
import DescriptionHeader from '../../sharable-components/description-header/index';
import Loading from '../../sharable-components/loading-animation';
import NadaEncontrado from '../../sharable-components/nada-encontrado';
import Paciente from '../../sharable-components/paciente/index';
import './style.css'







export default function EmAndamento() {
    const [ isLoading, setIsLoading ] = useState(false)
    const [ nadaEncontrado, setNadaEncontrado ] = useState(false)
    const [ reservas, setReservas ] = useState([])

    const location = useLocation()
    

    async function CarregarReservas() {
        
        try {
            setIsLoading(true)
            const { data } = await http.post('/medico/minhas_consultas', {id_reserva: location.state})
            setReservas(data.Consultas)
            console.log(data.Consultas)
            setIsLoading(false)


            if(data.Consultas.length === 0) {
                setNadaEncontrado(true)
            }
        }

        catch(err) {
            setIsLoading(false)
            setNadaEncontrado(true)
        }


    }

    useEffect(() => {
        CarregarReservas()
    }, [])

    return (

        <div className="em-andamento-container">
            <DescriptionHeader path="/meus-horarios">Em andamento</DescriptionHeader>
            <div className="lista-pacientes">
                {
                    reservas.length > 0 ? reservas.map((reserva) => (
                        <Paciente reserva={reserva} refresh={CarregarReservas} />
                    )) : ''
                }
                {
                    isLoading ? <Loading /> : ''
                }
                {
                    nadaEncontrado ? <NadaEncontrado  /> : ''
                }
            </div>
        </div>
    )
}