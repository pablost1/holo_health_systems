
import Consulta from '../../sharable-components/consulta';
import DescriptionHeader from '../../sharable-components/description-header/index';

import './style.css'
import http from '../../http/index';
import { useEffect, useState } from 'react';



export default function MeusHorarios() {
    const [ horarios, setHorarios ] = useState([])

    async function CarregarHorarios() {


        try {
            const { data } = await http.get('/medico/minhas_reservas')
            setHorarios(data.Reservas)
        }

        catch(err) {

            console.log(err)
        }
    }

    useEffect(() => {
        CarregarHorarios()
    }, [])

    return (
        <div className="horarios-container">
            <DescriptionHeader path="/medico-home">Meus horários</DescriptionHeader>
            <div className="lista-horarios">
                <Consulta />
            </div>
        </div>
    )
}