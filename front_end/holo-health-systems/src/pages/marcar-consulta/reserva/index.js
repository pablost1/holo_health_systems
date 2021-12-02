
import './style.css'
import Button from '../../../sharable-components/button/index';



export default function Reserva() {

    return (
        <div className="reserva-container">
            <div className="consultorio-doutor">
                <span>Nome do consultório</span>
                <span>Nome do médico</span>
            </div>
            <div className="data-hora">
                <span>26/08</span>
                <span>15:30 às 16:00</span>
            </div>
            <Button size="small">Marcar horário</Button>
        </div>
    )
}