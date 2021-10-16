import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import './style.css'
import DescriptionHeader from '../../sharable-components/description-header/index.js'
import { useState } from 'react';

import axios from 'axios'




const http = axios.create({
    baseURL: 'urlbaseaqui',
})






async function CarregarDropdown() {
    const estados = await axios.get('/estados')
    return estados     
}


export default function MarcarConsulta() {

    
    // const [cidades, setcidades] = useState([])
    // const [especialidade, setespecialidade] = useState([])
     


    return (
        <div class="marcar-consulta">
            
            <DescriptionHeader />
            
            <Formik
                initialValues={{
                    estado: '',
                    cidade: '',
                    especialidade: ''
                }}

            >
                {({ errors, touched, values }) => (
                    <Form className="marcar-consulta__form">
                        <div className="form-group">
                            <label className="label-bigger">Selecione um estado estado</label>
                            <Field
                                name="estado"
                                as="select"
                                className="input"  
                                
                            >
                                <option value="" select="selected">Estado</option>
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
        </div>  
    )
}