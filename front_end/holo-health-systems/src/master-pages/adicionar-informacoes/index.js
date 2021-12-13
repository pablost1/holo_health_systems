import './style.css'
import DescriptionHeader from '../../sharable-components/description-header/index';

import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import Button from '../../sharable-components/button/index';
import axios from 'axios'
import { useEffect, useState, useContext } from 'react';
import http from '../../http/index';
import { AuthContext } from '../../auth/authContext';






const EstadoValidation = Yup.object().shape({
    nome: Yup.string()
        .required('Um estado é necessário')
})


const CidadeValidation = Yup.object().shape({
    id_estado: Yup.string()
        .required('Selecione um estado'),
    nome: Yup.string()
        .required('Uma cidade é necessária')
    
})



export default function AdicionarInformacoes() {
    const { handleError } = useContext(AuthContext)
    const [estados, setestados] = useState([])

    async function CarregarEstados() {
        try {
            const { data } =  await http.get('/estado')
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
            <DescriptionHeader path="/master-home">Adicionar informações</DescriptionHeader>


            
            <div className="adicionar-informacoes">
                <h2>Cadastro de estado</h2>
                <Formik
                    validationSchema={EstadoValidation}
                    initialValues={{
                        nome: ''
                    }}

                    onSubmit={(value, { resetForm}) => {
                        http.post('/estado', value)
                            .then( res => {
//                                CarregarEstados()
                                handleError('Estado cadastrado com sucesso')
                                resetForm()
                            })
                            .catch( error => handleError(error.response.data.mensagem))
                        
                        
                    }}

                >
                    {({ errors, touched, values}) => (
                        <Form className="info-form">
                            <div className="form-group">
                                <label>Nome do estado</label>
                                <Field  name="nome" />
                                { errors.nome && touched.nome ? <p>{errors.nome}</p> : '' }
                            </div>
                            <Button style={{ alignSelf: 'baseline'}} size="small">Cadastrar</Button>
                        </Form>
                    )}
                </Formik>
                

                <h2>Cadastro de cidade</h2>
                <Formik
                    validationSchema={CidadeValidation}

                    initialValues={{
                        id_estado: '',
                        nome: ''
                    }}
                    onSubmit={(value, { resetForm}) => {
                        console.log(value)
                        http.post('/cidade', value)
                            .then( res => {
                                handleError("Cidade cadastrada com sucesso")
                                resetForm()
                            })
                            .catch( err => {
                                
                                handleError(err.response.data.mensagem)

                                
                            })
                        
                        
                    }}

                >
                    {({ errors, touched, values}) => (
                        <Form className="info-form">
                            <div className="form-group">
                                <label>Estado da cidade</label>
                                <Field as="select" name="id_estado" className="input">
                                    <option value="" selected>Selecione um estado</option>
                                    {
                                        estados.estados ? estados.estados.map( estado => (
                                            <option key={estado.id_estado} value={estado.id_estado}>{estado.nome}</option>
                                        )) : ''
                                    }
                                </Field >
                                { errors.estado && touched.estado ? <p>{errors.estado}</p> : '' }
                            </div>
                            <div className="form-group">
                                <label>Nome da cidade</label>
                                <Field name="nome" />
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