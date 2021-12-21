import './style.css'
import DescriptionHeader from '../../sharable-components/description-header/index';
import Subtitle from '../../sharable-components/subtitle/index';
import Button from '../../sharable-components/button/index';
import {useLocation } from 'react-router-dom';



function Sala() {

    return (
        <div className="sala">
            <h3 className="numero-sala">Sala 1</h3>
        </div>
    )
}


export default function ConsultorioPage() {
    const location = useLocation()


    return (
        <div className="consultorio-page-container">
            <DescriptionHeader path="/consultorios"> Consultório</DescriptionHeader>
            <div className="consultorio-page">
                
                <Subtitle>Nome do consultório</Subtitle>
                
                <div className="lista-salas-add">
                    <Sala />
                    <Sala />
                    <Sala />
                    <Sala />
                    <Sala />
                    <Sala />
                    <Sala />
                </div>
            </div>
        </div>
    )
}