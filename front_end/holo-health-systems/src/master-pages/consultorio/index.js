import './style.css'
import DescriptionHeader from '../../sharable-components/description-header/index';
import Subtitle from '../../sharable-components/subtitle/index';
import Button from '../../sharable-components/button/index';



function Sala() {

    return (
        <div className="sala">
            <h3 className="numero-sala">Sala 1</h3>
            <Button 
                status="danger"
                size="small"
                style={{
                    marginLeft: 'auto',
                    marginRight: '20px'
                }}
            >
                Fechar
            </Button>
        </div>
    )
}


export default function ConsultorioPage() {

    return (
        <div className="consultorio-page-container">
            <DescriptionHeader> Consultório</DescriptionHeader>
            <div className="consultorio-page">
                
                <Subtitle>Nome do consultório</Subtitle>
                
                <div className="lista-salas">
                    <Sala />
                    <Sala />
                    <Sala />
                    <Sala />
                    <Sala />
                    <Sala />
                    <Sala />
                </div>
            </div>
        </div>
    )
}