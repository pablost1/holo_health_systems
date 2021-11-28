import './style.css'
import DescriptionHeader from '../../sharable-components/description-header/index';
import Button from '../../sharable-components/button/index';
import { useHistory } from 'react-router-dom';


function Consultorio() {
    const history =  useHistory()

    function IrParaSalas() {
        history.push('/salas')
    }
    return (
        <div className="consultorio" onClick={IrParaSalas}>
            <h3>Nome consultório</h3>
            <span>Cidade</span>
            <span>Estado</span>
            <Button 
                size="small"
                status="danger"
                style={{
                    marginLeft: 'auto'
                }}
                >
                    Fechar
            </Button>
            
        </div>
    )
}





export default function Consultorios() {

    return(
        <div className="consultorios-container">
            <DescriptionHeader>Consultórios</DescriptionHeader>
            <div className="consultorios">
                <Consultorio />
                <Consultorio />
                <Consultorio />
                <Consultorio />
                <Consultorio />
                <Consultorio />
                <Consultorio />
                <Consultorio />
            </div>
        </div>
    )
}