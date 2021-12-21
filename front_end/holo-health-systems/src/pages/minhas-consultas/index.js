import './style.css'
import DescriptionHeader from '../../sharable-components/description-header/index';
import Consulta from '../../sharable-components/consulta';
import http from '../../http/index';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../auth/authContext';
import Loading from '../../sharable-components/loading-animation';
import NadaEncontrado from '../../sharable-components/nada-encontrado';




export default function MinhasConsultas(props) {

    const { handleError } = useContext(AuthContext)
    const [ consultas, setConsultas] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    const [ nothingFound, setNothingFound ] = useState(false)


    async function CarregarConsultas() {
        try {
            setIsLoading(true)
            const { data } = await http.get('/paciente/minhas_consultas')
            setConsultas(data.Consultas)
            setIsLoading(false)
            console.log(data.Consultas)
            

            if(data.Consultas.length === 0 ) {
                setNothingFound(true)
                setIsLoading(false)
            }
        }

        catch(err) {

            setIsLoading(false)
        }
    }

    async function DeletarConsultas(consulta) {
        try {
            const { data } = await http.delete('/paciente/cancelar_consulta', {data: consulta})
            handleError(data.mensagem)
            CarregarConsultas()
            
        }

        catch(err) {
            
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

                {
                    isLoading ? <Loading big={true} /> : ''
                }
                
                {
                    nothingFound ? <NadaEncontrado /> : ''
                }
                
            </div>
        </div>
    )
}