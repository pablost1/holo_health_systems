import './style.css'
import DescriptionHeader from '../../sharable-components/description-header/index';

import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import Button from '../../sharable-components/button/index';
import axios from 'axios'
import { useEffect, useState } from 'react';



const http = axios.create({
    baseURL: 'http://localhost:3001'
})



const EstadoValidation = Yup.object().shape({
    estado: Yup.string()
        .required('Um estado é necessário')
})


const CidadeValidation = Yup.object().shape({
    estado: Yup.string()
        .required('Selecione um estado'),
    cidade: Yup.string()
        .required('Uma cidade é necessária')
    
})



export default function AdicionarInformacoes() {


    const [estados, setestados] = useState([])

    async function CarregarEstados() {
        try {
            const { data } =  await http.get('/estados')
            setestados(data)
            
        }

        catch(err) {
            alert(err)
        }
    }
    

    useEffect( () => {
        CarregarEstados()
    }, [])

    return (
        <div className="adicionar-informacoes-container">
            <DescriptionHeader>Adicionar informações</DescriptionHeader>


            
            <div className="adicionar-informacoes">
                <h2>Cadastro de estado</h2>
                <Formik
                    validationSchema={EstadoValidation}
                    initialValues={{
                        estado: ''
                    }}

                    onSubmit={(value, { resetForm}) => {
                        http.post('/estados', value)
                            .then( res => {
                                CarregarEstados()
                                alert('Estado cadastrado com sucesso')
                                resetForm()
                            })
                            .catch( error => alert(error.error))
                        
                        
                    }}

                >
                    {({ errors, touched, values}) => (
                        <Form className="info-form">
                            <div className="form-group">
                                <label>Nome do estado</label>
                                <Field  name="estado" />
                                { errors.estado && touched.estado ? <p>{errors.estado}</p> : '' }
                            </div>
                            <Button style={{ alignSelf: 'baseline'}} size="small">Cadastrar</Button>
                        </Form>
                    )}
                </Formik>
                

                <h2>Cadastro de cidade</h2>
                <Formik
                    validationSchema={CidadeValidation}

                    initialValues={{
                        estado: '',
                        cidade: ''
                    }}
                    onSubmit={(value, { resetForm}) => {
                        http.post('/cidades', value)
                            .then( res => {
                                alert("Cidade cadastrada com sucesso")
                                resetForm()
                            })
                        alert(`Estado: ${value.estado} e Cidade: ${value.cidade}`)
                        
                        
                    }}

                >
                    {({ errors, touched, values}) => (
                        <Form className="info-form">
                            <div className="form-group">
                                <label>Estado da cidade</label>
                                <Field as="select" name="estado" className="input">
                                    {
                                        estados.map( (estado, index) => (
                                            <option key={index} value={estado.estado}>{estado.estado}</option>
                                        ))
                                    }
                                </Field >
                                { errors.estado && touched.estado ? <p>{errors.estado}</p> : '' }
                            </div>
                            <div className="form-group">
                                <label>Nome da cidade</label>
                                <Field name="cidade" />
                                { errors.cidade && touched.cidade ? <p>{errors.cidade}</p> : '' }
                            </div>
                            <Button style={{ alignSelf: 'baseline'}} size="small">Cadastrar</Button>
                            
                        </Form>
                    )}
                </Formik>
            </div>
        </div>

    )
}