
import './style.css'
import DescriptionHeader from '../../sharable-components/description-header/index';
import Sala from '../../sharable-components/sala/index';


export default function SalasConsultorio() {


    return (
        <div className="salas-consultorio">
            <DescriptionHeader path="/consultorio">Salas</DescriptionHeader>
            <div className="lista-salas">
                <Sala />
                <Sala />
                <Sala />
                <Sala />
                <Sala />
                <Sala />
                <Sala />
                <Sala />
            </div>
        </div>
    )
}