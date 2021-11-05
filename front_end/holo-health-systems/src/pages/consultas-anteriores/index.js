
import DescriptionHeader from '../../sharable-components/description-header/index';
import Consulta from '../../sharable-components/consulta/index';
import './style.css';


export default function ConsultasAnteriores() {
    return (
        <div className="consultas-anteriores">
            <DescriptionHeader>Consultas anteriores</DescriptionHeader>
            <div className="lista-consulta"  className="consultas-anteriores__consultas">
                <Consulta type="delete" hasDeleteButton={false} />
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