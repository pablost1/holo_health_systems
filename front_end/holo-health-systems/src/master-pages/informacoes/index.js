
import './style.css'
import DescriptionHeader from '../../sharable-components/description-header'
import Button from '../../sharable-components/button/index';
import http from '../../http/index';
import { useState, useEffect } from 'react';






function Informacao(props) {

    if(props.type === 'estado') {
        return (
            <div className="informacao">
                <h3 className="nome">Estado</h3>
                <Button
                    size="small"  
                    status="danger"
                    style={{ marginLeft: 'auto', marginRight: '.5rem' }}
                >
                    Cancelar
                </Button>
            </div>
        )
    }


    if(props.type === 'cidade') {
        return (
            <div className="informacao-cidade">
                <h3 className="nome">{props.cidade}</h3>
                <span>{props.estado}</span>
                <Button
                    size="small"  
                    status="danger"
                    style={{ marginLeft: 'auto', marginRight: '.5rem' }}
                >
                    Cancelar
                </Button>
            </div>
        )

    }
}

export default function Informacoes() {

    
    const [ cidade, setcidade ] = useState([])


    

    async function CarregarCidades() {


        try {
            const { data } = await http.get('/cidade')
            setcidade(data.cidades)
        }
    
        catch(err) {
            alert(err.response.data.mensagem)
        }
     
    }

    function DefinirCidades() {



    }

    

    

    useEffect(() => {
        CarregarCidades()

        
    }, [])


    console.log(cidade)

    return (
        <div className="informacoes-container">
            <DescriptionHeader path="/master-home">Informações</DescriptionHeader>
            <div className="informacoes">
                <h2>Estados</h2>
                <div className="lista-informacoes">
                    {
                        cidade ? cidade.map( cidade => (
                            <Informacao cidade={cidade.nome} estado={cidade}type="cidade"/>
                        ) ) : ''
                    }
                    
                    
                </div>
                <h2>Cidades</h2>
                <div className="lista-informacoes">
                    <Informacao type="cidade"/>
                    <Informacao type="cidade"/>
                    <Informacao type="cidade"/>
                    <Informacao type="cidade"/>
                    <Informacao type="cidade"/>
                    <Informacao type="cidade"/>
                    <Informacao type="cidade"/>s
                </div>
            </div>
        </div>
    )
}