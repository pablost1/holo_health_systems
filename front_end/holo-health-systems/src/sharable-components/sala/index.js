
import Button from '../button/index';
import './style.css'
import { useHistory } from 'react-router-dom';

export default function Sala(props) {
    const history = useHistory()

    function IrParaScheduler() {
        history.push({
            pathname: '/scheduler',
            state: props.sala.id_sala
        })
    }

    if(props.ehMestre) {
        <div className="sala">
            <span>Número da sala</span>
            <Button size="small" style={{ marginLeft: 'auto', marginRight: '1em' }} status="danger">Apagar</Button>
        </div>
    }

    return (

        <div className="sala" onClick={IrParaScheduler} >
            <span>Sala {props.numero}</span>
            <Button size="small" style={{ marginLeft: 'auto', marginRight: '1em' }} status="danger">Apagar</Button>
        </div>
    )
}