
import Consulta from '../../sharable-components/consulta';
import DescriptionHeader from '../../sharable-components/description-header/index';
import './style.css'



export default function MeusHorarios() {

    return (
        <div className="horarios-container">
            <DescriptionHeader path="/medico-home">Meus horários</DescriptionHeader>
            <div className="lista-horarios">
                <Consulta type="doctor" onGoing={true}/>
            </div>
        </div>
    )
}