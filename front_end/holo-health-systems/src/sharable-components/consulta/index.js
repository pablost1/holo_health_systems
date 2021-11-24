import { LocationOn } from "@material-ui/icons"
import { CalendarToday } from "@material-ui/icons"
import { Timer } from "@material-ui/icons"
import Button from '../button/index'
import { useHistory } from 'react-router-dom'
import './style.css'



export default function Consulta(props) {   
    const history = useHistory()

    function IrParaEmAndamento() {
        history.push('/em-andamento')
    }
    
    if(props.type ===  'doctor') {

        return (

            <div onClick={IrParaEmAndamento} className={`${props.type === 'doctor'? 'consulta' : 'consulta'}`}>
                <div className="consulta__profissional">
                    <h3 className="profissional">Otorrinolaringologia</h3>
                    <span className="nome-profissional">Maria de fátima bezerra</span>
                </div>
                <div className="consulta__info">
                    <div className="consulta__local ">
                        <LocationOn fontSize="medium" />
                        <div className="local">
                            <h3>Local</h3>
                            <p>Descrição do local</p>
                        </div>
                    </div>
                    <div className="consulta__dia">
                        <CalendarToday fontSize="medium" />
                        <div className="dia">
                            <h3>Dia</h3>
                            <p>23/08/2020</p>
                        </div>
                    </div>
                </div>
                <div className="consulta__actions">
                    <span className={`${props.type === 'doctor' ? 'consulta__horario-apagavel' : 'consulta__horario'}`}>
                        <Timer fontSize="small"/>
                        <span>9:30 - 12:00</span>
                    </span>
                    {
                        props.onGoing === true  ?
                            (
                                <span className="consulta__em-andamento consulta__horario">
                                    <Timer fontSize="small"/>
                                    <span>Em andamento</span>
                                </span>
                            ) :  ''
                    }
                    
                    
                    
                </div>
                
                
                
            </div>
        )
    }




    return (
        <div className={`${props.type === 'delete'? 'consulta-apagavel' : 'consulta'}`}>
            <div className="consulta__profissional">
                <h3 className="profissional">Otorrinolaringologia</h3>
                <span className="nome-profissional">Maria de fátima bezerra</span>
            </div>
            <div className="consulta__info">
                <div className="consulta__local ">
                    <LocationOn fontSize="medium" />
                    <div className="local">
                        <h3>Local</h3>
                        <p>Descrição do local</p>
                    </div>
                </div>
                <div className="consulta__dia">
                    <CalendarToday fontSize="medium" />
                    <div className="dia">
                        <h3>Dia</h3>
                        <p>23/08/2020</p>
                    </div>
                </div>
            </div>
            <div className="consulta__actions">
                <span className={`${props.type === 'delete' ? 'consulta__horario-apagavel' : 'consulta__horario'}`}>
                    <Timer fontSize="small"/>
                    <span>9:30 - 12:00</span>
                </span>
                {
                    props.onGoing === true  ?
                         (
                            <span className="consulta__em-andamento consulta__horario">
                                <Timer fontSize="small"/>
                                <span>Em andamento</span>
                            </span>
                        ) :  ''
                }
                
                {

                    props.type === 'delete' && props.hasDeleteButton ? <Button size="small" status="danger">Cancelar consulta</Button> : null
                }
                
                
            </div>
            
            
            
        </div>
    )
}