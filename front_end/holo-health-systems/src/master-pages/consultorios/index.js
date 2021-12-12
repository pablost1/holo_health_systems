import './style.css'
import DescriptionHeader from '../../sharable-components/description-header/index';
import Button from '../../sharable-components/button/index';
import { useHistory } from 'react-router-dom';
import http from '../../http/index';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../auth/authContext'


function Consultorio(props) {
    
    const history =  useHistory()

    function IrParaSalas() {

        
        history.push({
            pathname: '/consultorio',
            state: props.consultorio.id_consultorio
        })
    }

    function Deletar() {
        const identificador = { id_consultorio: props.consultorio.id_consultorio}
        props.delete(identificador)
        
    }
    return (
        <div className="consultorio" onClick={IrParaSalas}>
            <h3>{props.consultorio.nome}</h3>
            
            <Button 
                size="small"
                status="danger"
                style={{
                    marginLeft: 'auto'
                }}
                hasEvent={true}
                onClick={Deletar}
                >
                    Fechar
            </Button>
            
        </div>
    )
}





export default function Consultorios() {

    const { handleError } = AuthContext
    const [ consultorios, setconsultorios] = useState([])
    
    async function CarregarConsultorios() {
        try {
            const { data } = await http.get('consultorio')
            setconsultorios(data.consultorio)
            
        }

        catch(err) {
            console.log(err)
        }
        
        
    }

    async function DeletarConsultorio(id) {    
        const payload = id
        try {
            const data = await http.delete('/consultorio', {data: payload })
            CarregarConsultorios()
            console.log(data)
        }

        catch(err) {
            console.log(err.response.data)
        }
        
        
    }

    

    

    useEffect(() => {
        CarregarConsultorios()
    }, [])
    return(
        <div className="consultorios-container">
            <DescriptionHeader path="/master-home">Consultórios</DescriptionHeader>
            <div className="consultorios">
                {
                    consultorios.length > 0 ? consultorios.map( (consultorio) => (
                        <Consultorio key={consultorio.id_consultorio} delete={DeletarConsultorio} consultorio={consultorio}/> 
                    )) : ''
                }
                
            </div>
        </div>
    )
}