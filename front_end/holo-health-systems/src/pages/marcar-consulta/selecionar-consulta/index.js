import './style.css'
import { useState } from 'react';
import Button from '../../../sharable-components/button/index';



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


    function SelecionaConsulta(consulta, e) {
        setSelected(consulta)
    }

    return (
        <div className="selecionar-container">
            <ul className="selecionar-consulta">
                {
                    consultas.map( (consulta, index) => (
                        <li 
                            onClick={() => SelecionaConsulta(consulta)}
                            className={`selectable ${consulta === selected ? 'is-selected' : ''}`}
                            key={index}     
                        >
                            {consulta}
                        </li>
                    ))
                }
            </ul>
            <Button hasEvent={true} onClick={() => props.marcar()} size="small">Marcar horário</Button>
        </div>
    )
}