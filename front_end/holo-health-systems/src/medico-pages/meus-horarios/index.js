
import Consulta from '../../sharable-components/consulta';
import DescriptionHeader from '../../sharable-components/description-header/index';
import './style.css'
import http from '../../http/index';
import { useEffect, useState } from 'react';
import Loading from '../../sharable-components/loading-animation/index'
import NadaEncontrado from '../../sharable-components/nada-encontrado'


export default function MeusHorarios() {
    const [ horarios, setHorarios ] = useState([])
    const [nadaEncontrado, setNadaEncontrado ] = useState(false)

    async function CarregarHorarios() {


        try {
            const { data } = await http.get('/medico/minhas_reservas')
            setHorarios(data.Reservas)


            if(data.Reservas.length === 0) {
                setNadaEncontrado(true)
            }

            if(data.Reservas.length > 0) {
                setNadaEncontrado(false)
            }
        }

        catch(err) {

            
        }
    }

    useEffect(() => {
        CarregarHorarios()
    }, [])

    return (
        <div className="horarios-container">
            <DescriptionHeader path="/medico-home">Meus horários</DescriptionHeader>
            <div className="lista-horarios">
                {
                    horarios.length > 0 ? horarios.map( (horario) => (
                        <Consulta type="doctor" horario={horario} key={horario.id_reserva} />
                    )) : <Loading big={true}/>
                }

                {
                    nadaEncontrado ? <NadaEncontrado /> : ''
                }
                
            </div>
        </div>
    )
}