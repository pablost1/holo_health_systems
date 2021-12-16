import { Formik, Field, Form } from 'formik'
import './style.css'
import DescriptionHeader from '../../sharable-components/description-header/index.js'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react';
import FreeModal from '../../utils/free-modal/index';
import SelecionarConsulta from './selecionar-consulta/index';
import Reserva from './reserva/index';
import http from '../../http/index';
import Button from '../../sharable-components/button/index';

function MarcarConsulta() {

    const [ estado, setEstado ] = useState([])
    const [cidade, setcidade] = useState([])
    const [especialidade, setespecialidade] = useState([])
    const [ reservas, setReservas ] = useState([])
    const [ modalState, setModalState ] = useState(false)
    const [ horarios, setHorarios ] = useState([])
    const [ reservaSelecionada, setReservaSelecionada ] = useState(undefined)
    


    async function CarregarEstados() {

         try {
             const  { data }  = await http.get('/estado')
             setEstado(data.estados)
            
         }

         catch(err) {
            console.log(err)
         }
    }

    async function CarregarCidades(estado) {

        try {

            const { data } = await http.post('/cidade/especifica', estado)
            setcidade(data.cidades)

        }

        catch(err) {
            console.log(err)
        }
    }

    async function CarregarEspecialidades() {

        try {
            const { data } = await http.get('/especialidade')
            setespecialidade(data.Especialidades)
            
        }

        catch(err) {
            console.log(err)
        }
    }

    async function CarregarReservas(filtro) {

        const filtroAjustado = {id_especialidade: parseInt(filtro.id_especialidade), id_cidade: parseInt(filtro.id_cidade)}

        try {

            const { data } = await http.post('/paciente/reservas_disponiveis', filtroAjustado)
            setReservas(data.Reservas)
            
        }

        catch(err) {
            console.log(err)
        }
    }

    async function CarregarHorarios() {

    }

    useEffect(() => {
        CarregarEstados()
        
        
    }, [])

    
   

    function MarcaConsulta() {
        alert('consulta marcada com sucesso')
        setModalState(false)
    }


    return (
        <div className="marcar-consulta">
            
            <DescriptionHeader path="/home">Marcar consulta</DescriptionHeader>
            
            <Formik
                initialValues={{
                    estado: '',
                    id_cidade: '',
                    id_especialidade: ''
                }}

                onSubmit={(value) => {
                    CarregarReservas(value)
                }}

            >
                {({  values, handleChange, setFieldValue }) => (
                    <Form className="marcar-consulta__form">
                        <div className="form-group">
                            <label className="label-bigger">Selecione um estado estado</label>
                            <Field
                                name="estado"
                                as="select"
                                className="input"
                                onChange={ (e) => {


                                    handleChange(e)

                                    console.log(e.target.value)

                                    if(e.target.value === '') {
                                        setFieldValue('id_cidade', '')
                                        setFieldValue('id_especialidade', '')
                                    } 

                                    else {

                                        const estado = {id_estado: parseInt(e.target.value)}
                                        CarregarCidades(estado)
                                    }


                                    

                                }}
                                
                            >
                                <option value="" select="selected">Selecione um estado</option>
                                {
                                    estado.length > 0 ? estado.map((estado) => (
                                        <option value={estado.id_estado} key={estado.id_estado}>{estado.nome}</option>
                                    )) : ''
                                }
                                
                            </Field>
                        </div>
                        {
                            values.estado ? (<div className="form-group">
                                <label className="label-bigger" >Cidade</label>
                                <Field 
                                    name="id_cidade"
                                    as="select" 
                                    className="input"
                                    onChange={(e) => {


                                        handleChange(e)

                                        

                                        if(e.target.value === '') {

                                            setFieldValue('id_especialidade', '') 
                                        } 

                                        else {
                                            CarregarEspecialidades()
                                        }
                                    }}
                                    >
                                    

                                    <option value="" select="selected">Escolha uma cidade</option>
                                    {
                                        cidade.length > 0 ? cidade.map((cidade) => (
                                            <option value={cidade.id_cidade} key={cidade.id_cidade}>{cidade.nome}</option>
                                        )) : ''
                                    }
                                    
                                </Field>
                            </div>) : ''
                        }
                        
                        {
                            values.id_cidade ?(<div className="form-group">
                                <label className="label-bigger">Especialidade</label>
                                <Field 
                                    name="id_especialidade" 
                                    as="select" 
                                    className="input"
                                    onChange={(e) => {

                                        

                                        handleChange(e)            

                                    
                                    }}
                                    >
                                    
                                    <option value="" select="selected">Escolha uma especialidade</option>
                                    
                                    {
                                        especialidade.length > 0 ? especialidade.map((especialidade) => (
                                            <option value={especialidade.id_especialidade} key={especialidade.id_especialidade}>{especialidade.nome}</option>
                                        )) : ''
                                    }
                                </Field>
                            </div>) : ''
                        }
                        <Button size="medium" style={{
                            alignSelf: 'baseline'
                        }}>Pesquisar</Button>
                    </Form>
                )}
                 
            </Formik>
            {
                reservas.length > 0 ? (<div>
                    <h2 className="unidades-disponiveis">Unidades disponíveis</h2>
                    <div className="lista-reservas">
                        {
                            reservas.map((reserva) => (
                                <Reserva
                                    reserva={reserva} 
                                    key={reserva.id_reserva}
                                    setReserva={setReservaSelecionada} 
                                    getReserva={reservaSelecionada}
                                    setModal={setModalState}
                                
                                />
                            ))
                        }
                        
                    
                    </div>
                    {
                        modalState ? (
                            <FreeModal opened={modalState} setModal={setModalState} marcarConsulta={true} >
                                <SelecionarConsulta 
                                    horarios={horarios}  
                                    marcar={MarcaConsulta} 
                                    reservaSelecionada={reservaSelecionada}
                                    modalState={setModalState}
                                    />
                            </FreeModal>
                        ) : ''
                    }
                    
                </div>) : ''
            }
            
        </div>  
    )
}


function SelecionarReserva() {


}


export default MarcarConsulta