
import './style.css'
import Button from '../../../sharable-components/button/index';
import moment from 'moment'


export default function Reserva(props) {

    const { reserva } = props

    const dataFormatada = moment(reserva.data, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD/MM/YYYY')
    const horaFin = moment(reserva.hor_fin, 'HH:mm:ss').format('HH:mm')
    const horaIni = moment(reserva.hor_ini, 'HH:mm:ss').format('HH:mm')

    // console.log(`A data é${moment('2021-12-06T03:00:00.000Z', 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('MM/DD/YYYY')}`)

    function SelecionarReserva() {
        props.setReserva(props.reserva.id_reserva)
        props.setModal(true)
    }

    return (
        <div className="reserva-container">
            <div className="consultorio-doutor">
                <span>{reserva.nome_consultorio}</span>
                <span>{reserva.nome_medico} {reserva.sobrenome_medico}</span>
            </div>
            <div className="data-hora">
                <span>{dataFormatada}</span>
                <span>{horaIni} às {horaFin}</span>
            </div>
            <Button size="small" hasEvent={true} onClick={SelecionarReserva}>Marcar horário</Button>
        </div>
    )
}