import './style.css';
import DescriptionHeader from '../../sharable-components/description-header/index';
import Consulta from '../../sharable-components/consulta/index';



export default function ConsultasAnteriores() {
    return (
        <div className="consultas-anteriores">
            <DescriptionHeader path="/home">Consultas anteriores</DescriptionHeader>
            <div className="consultas-anteriores__consultas">
                
                <Consulta type="delete" hasDeleteButton={false} />
                <Consulta type="delete" hasDeleteButton={false} />
                <Consulta type="delete" hasDeleteButton={false} />
                <Consulta type="delete" hasDeleteButton={false} />
                <Consulta type="delete" hasDeleteButton={false} />
                <Consulta type="delete" hasDeleteButton={false} />
                <Consulta type="delete" hasDeleteButton={false} />
                <Consulta type="delete" hasDeleteButton={false} />        
            </div>
        </div>
    )
}