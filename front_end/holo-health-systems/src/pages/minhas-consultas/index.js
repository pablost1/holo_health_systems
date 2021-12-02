import './style.css'
import DescriptionHeader from '../../sharable-components/description-header/index';
import Consulta from '../../sharable-components/consulta';



export default function MinhasConsultas(props) {
    return (
        <div className="minhas-consultas">
            <DescriptionHeader path="/home">Minhas Consultas</DescriptionHeader>
            <div className="minhas-consultas__lista">
                <Consulta type="delete" hasDeleteButton={true} />
                <Consulta type="delete" hasDeleteButton={true} />
                <Consulta type="delete" hasDeleteButton={true} />
                <Consulta type="delete" hasDeleteButton={true} />
                <Consulta type="delete" hasDeleteButton={true} />
                <Consulta type="delete" hasDeleteButton={true} />
                <Consulta type="delete" hasDeleteButton={true} />
                <Consulta type="delete" hasDeleteButton={true} />
            </div>
        </div>
    )
}