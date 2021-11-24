
import Button from '../button/index';
import './style.css'
import { useHistory } from 'react-router-dom';

export default function Sala() {
    const history = useHistory()

    function IrParaScheduler() {
        history.push('/scheduler')


    }

    return (

        <div className="sala" onClick={IrParaScheduler} >
            <span>Número da sala</span>
            <Button size="small" style={{ marginLeft: 'auto', marginRight: '1em' }} status="danger">Apagar</Button>
        </div>
    )
}