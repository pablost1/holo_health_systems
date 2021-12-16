import './style.css'
import DescriptionHeader from '../../sharable-components/description-header/index';
import Consulta from '../../sharable-components/consulta';
import http from '../../http/index';
import { useEffect, useState } from 'react';




export default function MinhasConsultas(props) {

    const [ consultas, setConsultas] = useState([])

    async function CarregarConsultas() {
        try {
            const { data } = await http.get('/paciente/minhas_consultas')
            setConsultas(data.Consultas)
            console.log(data)
        }

        catch(err) {
            console.log(err)
        }
    }

    async function DeletarConsultas() {
        // Deleta consulta
        
    }


    useEffect(() => {
        CarregarConsultas()
    },[])

    return (
        <div className="minhas-consultas">
            <DescriptionHeader path="/home">Minhas Consultas</DescriptionHeader>
            <div className="minhas-consultas__lista">
                {
                    consultas.length > 0 ? consultas.map((consulta) => (
                        <Consulta type="delete" hasDeleteButton={true} consulta={consulta} />
                    )) : ''
                }
                
                
            </div>
        </div>
    )
}