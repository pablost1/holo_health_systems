import './style.css'
import { useEffect, useState, useContext } from 'react';
import Button from '../../../sharable-components/button/index';
import http from '../../../http/index';
import { AuthContext } from '../../../auth/authContext';



const consultas = [
    '12:40',
    '12:50',
    '13:00',
    '13:10',
    '13:20',
    '13:30'
]

export default function SelecionarConsulta(props) {

    const [selected, setSelected] =  useState('')
    const [ horarios, setHorarios ] = useState([])
    const { handleError } = useContext(AuthContext)


    async function GetConsultas() {
        
        try {
            const { data } = await http.post('/gerente/horarios_reserva', {id_reserva: props.reservaSelecionada})
            setHorarios(data.Horarios)
            console.log(data.Horarios)
        }

        catch(err) {
            console.log(err)
        }
    }

    async function MarcarConsulta(e) {
        e.stopPropagation()

        try {
            const { data } = await http.post('/paciente/marcar_consulta', {id_reserva: props.reservaSelecionada, hor_marc: selected[0]})
            handleError(data.mensagem)
            props.modalState(false)
            
        }

        catch(err) {
            handleError(err.response.data.mensagem)
        }
    }


    function SelecionaConsulta(consulta, e) {
        e.stopPropagation()
        setSelected(consulta)
    }



    // useEffect( () => {
    //     console.log(props.reservaSelecioanda)
    // }, [props.reservaSelecioanda])

    useEffect(() => {
        GetConsultas()
    }, [])

    return (
        <div className="selecionar-container">
            <ul className="selecionar-consulta">
                {
                    horarios.length > 0 ? horarios.map( (consulta, index) => (
                        <li 
                            onClick={(e) => SelecionaConsulta(consulta, e)}
                            className={`selectable ${consulta === selected ? 'is-selected' : ''} ${consulta[1] === 1 ? 'is-reserved' : ''}`}
                            key={index}


                        >
                            {consulta[0]}
                        </li>
                    )): ''
                }
            </ul>
            <Button hasEvent={true} onClick={MarcarConsulta} size="small">Marcar horário</Button>
        </div>
    )
}