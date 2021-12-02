import { Formik, Field, Form } from 'formik'
import './style.css'
import DescriptionHeader from '../../sharable-components/description-header/index.js'
import axios from 'axios'
import { useState } from 'react';
import FreeModal from '../../utils/free-modal/index';
import SelecionarConsulta from './selecionar-consulta/index';
import Reserva from './reserva/index';





axios.create({
    baseURL: 'http://locahost:3001'
})




// async function CarregarDropdown(para='estados') {
//     return await  axios.get(`/${para}`)
// }


function MarcarConsulta() {


    // const [ estado, setEstado ] = useState([])
    // const [cidade, setcidade] = useState([])
    // const [especialidade, setespecialidade] = useState([])


    // useEffect(async () => {
    //     let estados = CarregarDropdown()
    //     setEstado(estados)
    // })

    const [ modalState, setModalState ] = useState(true)
    // const [ consultorio, setConsultorio] = useState('')



    // function AbrirModal() {
    //     setModalState(true)
        
    // }

    function MarcaConsulta() {
        alert('consulta marcada com sucesso')
        setModalState(false)
    }


    // function SelecionarConsultorio(consultorio) {

    //     setConsultorio(consultorio)
    // }

    return (
        <div className="marcar-consulta">
            
            <DescriptionHeader path="/home">Marcar consulta</DescriptionHeader>
            
            <Formik
                initialValues={{
                    estado: '',
                    cidade: '',
                    especialidade: ''
                }}

            >
                {({  values, handleChange }) => (
                    <Form className="marcar-consulta__form">
                        <div className="form-group">
                            <label className="label-bigger">Selecione um estado estado</label>
                            <Field
                                name="estado"
                                as="select"
                                className="input"
                                onChange={ (e) => {
                                    handleChange(e)

                                    

                                }}
                                
                            >
                                <option value="" select="selected">Estado</option>
                                {
                                    
                                }
                                <option value="PE">Pernambuco</option>
                                <option value="PB">Paraiba</option>
                            </Field>
                        </div>
                        
                        <div className={`form-group ${values.estado ? '' : 'hidden'}`}>
                            <label className="label-bigger" >Cidade</label>
                            <Field name="cidade" as="select" className="input">
                                <option value="" select="selected">Escolha uma cidade</option>
                                <option value="Recife">Recife</option>
                                <option value="Paulista">Paulista</option>
                            </Field>
                        </div>
                        <div className={`form-group ${values.cidade ? '' : 'hidden'}`}>
                            <label className="label-bigger">Especialidade</label>
                            <Field name="especialidade" as="select" className="input">
                                <option value="" select="selected">Escolha uma especialidade</option>
                                <option value="otorrino">Otorrinolaringologia</option>
                                <option value="pediatria">Pediatria</option>
                            </Field>
                        </div>
                    </Form>
                )}
                 
            </Formik>
            <h2 className="unidades-disponiveis">Unidades disponíveis</h2>
            <div className="lista-reservas">
                <Reserva />
                <Reserva />
                <Reserva />
                <Reserva />
                <Reserva />
                <Reserva />
                <Reserva />
                <Reserva />
                <Reserva />
            </div>
            <FreeModal opened={modalState}  >
                <SelecionarConsulta  marcar={MarcaConsulta} />
            </FreeModal>
        </div>  
    )
}

export default MarcarConsulta