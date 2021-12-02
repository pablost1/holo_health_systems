import './style.css'
import Button from '../button/index';
import { Timer } from '@material-ui/icons';



export default function Paciente() {


    return (
        <div className="paciente">
            
            <span className="paciente__nome">Nome do paciente</span>
            <Timer />
            <span>14:30</span>
            <Button size="small" style={{marginLeft: 'auto', marginRight: '1rem'}}>Liberar</Button>
        </div>
    )
}