
import DescriptionHeader from '../../sharable-components/description-header/index';
import Paciente from '../../sharable-components/paciente/index';
import './style.css'



export default function EmAndamento() {


    return (

        <div className="em-andamento-container">
            <DescriptionHeader path="/medico-home">Em andamento</DescriptionHeader>
            <div className="lista-pacientes">
                <Paciente />
                <Paciente />
                <Paciente />
                <Paciente />
                <Paciente />
                <Paciente />
                <Paciente />
                <Paciente />
            </div>
        </div>
    )
}