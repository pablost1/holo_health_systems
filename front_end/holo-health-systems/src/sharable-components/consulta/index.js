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

    function IrParaEmAndamento() {
        history.push('/em-andamento')
    }

    const [ inicio, setInicio] = useState('')
    const [ fim, setFim] = useState('')
    const [ data, setData] = useState('')
    const [ hora, setHora ] = useState('')
    // console.log(`A data é${moment('2021-12-06T03:00:00.000Z', 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('MM/DD/YYYY')}`)

    
    
    // const inicio = moment(props.horario.hor_ini, 'HH:mm:ss').format('HH:mm')
    // const fim = moment(props.horario.hor_fin, 'HH:mm:ss').format('HH:mm')
    // const data = moment(props.horario.data, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD/MM/YYYY')

    useEffect(() => {

        if(props.type === 'doctor') {
            console.log(props)
            setInicio(moment(props.horario.hor_ini, 'HH:mm:ss').format('HH:mm'))
            setFim(moment(props.horario.hor_fin, 'HH:mm:ss').format('HH:mm'))
            setData(moment(props.horario.data, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD/MM/YYYY'))
        }

        if(props.type === 'delete') {
            setData(moment(props.consulta.data, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD/MM/YYYY'))
            setHora(moment(props.consulta.hor_marc, 'HH:mm:ss').format('HH:mm'))

        }
        
        
    }, [])
    
    if(props.type ===  'doctor') {

        return (

            <div onClick={IrParaEmAndamento} className="consulta consulta-doctor">
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

                    props.type === 'delete' && props.hasDeleteButton ? <Button size="small" status="danger">Cancelar consulta</Button> : null
                }
                
                
            </div>
            
            
            
        </div>
    )
}