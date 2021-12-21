
import './style.css'
import DescriptionHeader from '../../sharable-components/description-header/index';
import Sala from '../../sharable-components/sala/index';
import { useEffect, useState } from 'react';
import http from '../../http/index';


export default function SalasConsultorio() {

    const [ salas, setSalas ] = useState([])

    useEffect(() => {
        (async () => {

            try {
                const  { data } = await http.get('/sala/consultorio')
                setSalas(data.salas)
            }

            catch(err) {
                
            }
            
            
        })()
    }, [])


    return (
        <div className="salas-consultorio">
            <DescriptionHeader path="/home-manager">Salas</DescriptionHeader>
            <div className="lista-salas">
                {
                    salas.length > 0 ? salas.map((sala, index) => (
                        <Sala sala={sala} numero={index + 1} key={index}/>
                    )) : ''
                }
            </div>
        </div>
    )
}