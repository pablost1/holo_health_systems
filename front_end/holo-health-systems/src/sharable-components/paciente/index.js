import './style.css'
import Button from '../button/index';
import { Timer } from '@material-ui/icons';
import moment from 'moment'
import http from '../../http';
import { AuthContext } from '../../auth/authContext'
import { useContext } from 'react';


export default function Paciente(props) {
    const { handleError } = useContext(AuthContext)

    async function LiberarPaciente() {
        try {
            const { data } = await http.patch('medico/concluir_consulta', {id_consulta: props.reserva.id_consulta})
            handleError(data.mensagem)
            props.refresh()

        }

        catch(err) {

        }
    }


    const hora = moment(props.reserva.hor_marc, 'HH:mm:ss').format('HH:mm')


    return (
        <div className="paciente">
            
            <span className="paciente__nome">{props.reserva.nome} {props.reserva.sobrenome}</span>
            <Timer />
            <span>{hora}</span>
            <Button size="small" style={{marginLeft: 'auto', marginRight: '1rem'}} hasEvent={true} onClick={LiberarPaciente}>Liberar</Button>
        </div>
    )
}