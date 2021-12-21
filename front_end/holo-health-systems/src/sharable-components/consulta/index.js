import { LocationOn } from "@material-ui/icons"
import { CalendarToday } from "@material-ui/icons"
import { Timer } from "@material-ui/icons"
import Button from '../button/index'
import { useHistory } from 'react-router-dom'
import './style.css'
import moment from 'moment'
import { useState, useEffect } from "react"



export default function Consulta(props) {   
    const history = useHistory()


    const [ inicio, setInicio] = useState('')
    const [ fim, setFim] = useState('')
    const [ data, setData] = useState('')
    const [ hora, setHora ] = useState('')

    
    console.log(props.horario)
    function IrParaEmAndamento() {
        history.push({
            pathname: '/em-andamento',
            state: props.horario.id_reserva ? props.horario.id_reserva : ''
        })
    }

    useEffect(() => {

        if(props.type === 'doctor') {
            
            setInicio(moment(props.horario.hor_ini, 'HH:mm:ss').format('HH:mm'))
            setFim(moment(props.horario.hor_fin, 'HH:mm:ss').format('HH:mm'))
            setData(moment(props.horario.data, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD/MM/YYYY'))
        }

        if(props.type === 'delete') {
            setData(moment(props.consulta.data, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD/MM/YYYY'))
            setHora(moment(props.consulta.hor_marc, 'HH:mm:ss').format('HH:mm'))

        }

        if(props.type === 'onGoing') {
            setInicio(moment(props.consulta.hor_ini, 'HH:mm:ss').format('HH:mm'))
            setFim(moment(props.consulta.hor_fin, 'HH:mm:ss').format('HH:mm'))
            setData(moment(props.consulta.data, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD/MM/YYYY'))

        }
        
        
    }, [])

    if(props.type ===  'doctor') {

        return (

            <div className="consulta consulta-doctor" onClick={IrParaEmAndamento}>
                <div className="consulta__info">
                    <div className="consulta__local ">
                        <LocationOn fontSize="medium" />
                        <div className="local">
                            <h3>Local</h3>
                            <p>{props.horario.nome_consultorio}</p>
                        </div>
                    </div>
                    <div className="consulta__dia">
                        <CalendarToday fontSize="medium" />
                        <div className="dia">
                            <h3>Dia</h3>
                            <p>{data}</p>
                        </div>
                    </div>
                </div>
                <div className="consulta__actions">
                    <span className={`${props.type === 'doctor' ? 'consulta__horario-apagavel' : 'consulta__horario'}`}>
                        <Timer fontSize="small"/>
                        <span>{inicio} - {fim}</span>
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



    if(props.type === 'onGoing') {
        return (
            <div className="consulta" onClick={IrParaEmAndamento}>
                <div className="consulta__info">
                    <div className="consulta__local ">
                        <LocationOn fontSize="medium" />
                        <div className="local">
                            <h3>Local</h3>
                            <p>{props.consulta.nome_consultorio}</p>
                        </div>
                    </div>
                    <div className="consulta__dia">
                        <CalendarToday fontSize="medium" />
                        <div className="dia">
                            <h3>Dia</h3>
                            <p>{data}</p>
                        </div>
                    </div>
                </div>
                <div className="consulta__actions">
                    <span className={`${props.type === 'delete' ? 'consulta__horario-apagavel' : 'consulta__horario'}`}>
                        <Timer fontSize="small"/>
                        <span>{inicio} - {fim}</span>
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
                <h3 className="profissional">{props.consulta.especialidade}</h3>
                <span className="nome-profissional">{props.consulta.nome_medico} {props.consulta.sobrenome}</span>
            </div>
            <div className="consulta__info">
                <div className="consulta__local ">
                    <LocationOn fontSize="medium" />
                    <div className="local">
                        <h3>Local</h3>
                        <p>{props.consulta.consultorio}</p>
                    </div>
                </div>
                <div className="consulta__dia">
                    <CalendarToday fontSize="medium" />
                    <div className="dia">
                        <h3>Dia</h3>
                        <p>{data}</p>
                    </div>
                </div>
            </div>
            <div className="consulta__actions">
                <span className={`${props.type === 'delete' ? 'consulta__horario-apagavel' : 'consulta__horario'}`}>
                    <Timer fontSize="small"/>
                    <span>{hora}</span>
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

                    props.type === 'delete' && props.hasDeleteButton ? <Button hasEvent={true} onClick={() => props.deletarConsulta(props.consulta)} size="small" status="danger">Cancelar consulta</Button> : null
                }
                
                
            </div>
            
            
            
        </div>
    )
}