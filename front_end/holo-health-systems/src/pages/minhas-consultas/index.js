import './style.css'
import DescriptionHeader from '../../sharable-components/description-header/index';
import Consulta from '../../sharable-components/consulta';
import http from '../../http/index';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../auth/authContext';



export default function MinhasConsultas(props) {

    const { handleError } = useContext(AuthContext)

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

    async function DeletarConsultas(consulta) {
        try {
            const { data } = await http.delete('/paciente/cancelar_consulta', {data: consulta})
            handleError(data.mensagem)
            CarregarConsultas()
            
        }

        catch(err) {
            console.log(err)
        }
        
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
                        <Consulta type="delete" hasDeleteButton={true} consulta={consulta} deletarConsulta={DeletarConsultas} />
                    )) : ''
                }
                
                
            </div>
        </div>
    )
}