import { useState, useEffect, useContext } from 'react'

import DescriptionHeader from '../../sharable-components/description-header/index';
import MainContainer from '../../sharable-components/main-container/index';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from '../../sharable-components/button/index';
import InputMask from 'react-input-mask';
import moment from 'moment'
import { cpf } from 'cpf-cnpj-validator'
import http from '../../http/index';
import { AuthContext } from '../../auth/authContext';


console.log(cpf.strip('701.861.504-66'))

const validationSchema = Yup.object().shape({
    cpf: Yup.string().required('Insira seu CPF'),
    nome: Yup.string().required('Insira seu nome'),
    sobrenome: Yup.string().required('Insira seu sobrenome'),
    dt_nascimento: Yup.string()
                    .required('insira sua data de nascimento')
                    .test('teste-data', 'Data de nascimento inválida', (value) => moment(value, 'DD/MM/YYYY').isValid())
        
    ,
    email: Yup.string().email('E-mail inválido').required('Um e-mail é necessário'),
    senha: Yup.string().required('Uma senha é necessária'),
    id_consultorio: Yup.string()
                        .required('Um consultório é necessário')
                        
})




export default function CadastroGerente() {

    const [ consultorios, setConsultorios ] = useState([])
    const { handleError } = useContext(AuthContext)

    async function CarregarConsultorios() {
        try {
            const { data } = await http.get('/consultorio')
            setConsultorios(data.consultorio)

        }

        catch(err) {
            handleError(err.response.data.mensagem)
        }
        
    }

    async function CadastrarGerente(value) {
        try {
            const gerente = {...value, id_consultorio: parseInt(value.id_consultorio), cpf: cpf.strip(value.cpf), dt_nascimento: moment(value.dt_nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD'),}
            const { data } = await http.post('/usuario/cadastro/gerente', gerente)
            handleError(data.mensagem)
            
        }

        catch(err) {
            handleError(err.response.data.mensagem)
        }
    }
    
    useEffect(() => {
        CarregarConsultorios()
    },[])

    
    return (
        <div className="cadastro-gerente">
            <DescriptionHeader path="master-home">Cadastro do gerente</DescriptionHeader>
            <MainContainer>
                <Formik
                    initialValues={{
                        cpf: '',
                        nome: '',
                        sobrenome: '',
                        dt_nascimento: '',
                        email: '',
                        senha: '',
                        id_consultorio: ''

                    }}

                    onSubmit={(values) => {
                        CadastrarGerente(values)
                    }}

                    validationSchema={validationSchema}
                >
                    {({errors, touched, value, handleChange}) => (
                        <Form className="form" style={{
                            paddingTop: '3rem',
                            paddingBottom: '3rem'
                        }}>
                            <div className="form-group">
                                <label>Nome</label>
                                <Field  name="nome"/>
                                {errors.nome && touched.nome? <p>{errors.nome}</p> : ''}
                            </div>
                            <div className="form-group">
                                <label>Sobrenome</label>
                                <Field  name="sobrenome"/>
                                {errors.sobrenome && touched.sobrenome? <p>{errors.sobrenome}</p> : ''}
                            </div>
                            <div className="form-group">
                                <label>Cpf</label>
                                <Field 
                                className="input"
                                name="cpf" 
                                render={({field}) => (
                                    <InputMask 
                                        {...field}
                                        mask="999.999.999-99"
                                        onChange={handleChange}
                                    />
                                )}
                                />
                                {errors.cpf && touched.cpf ? <p>{errors.cpf}</p> : ''}
                            </div>
                            <div className="form-group">
                                <label>Data de nascimento</label>
                                <Field  
                                className="input" 
                                name="dt_nascimento"
                                render={({field}) => (
                                    <InputMask 
                                        {...field}
                                        onChange={handleChange}
                                        mask="99/99/9999"

                                    />
                                )}
                                
                                />
                                { errors.dt_nascimento && touched.dt_nascimento ? <p>{errors.dt_nascimento}</p> : ''}
                            </div>
                            <div className="form-group">
                                <label>E-mail</label>
                                <Field  name="email"/>
                                {errors.email && touched.email? <p>{errors.email}</p> : ''}
                            </div>
                            
                            <div className="form-group">
                                <label>Senha</label>
                                <Field  name="senha"/>
                                {errors.senha && touched.senha? <p>{errors.senha}</p> : ''}
                            </div>
                            <div className="form-group">
                                <label>Consultório</label>
                                <Field  name="id_consultorio" as="select" className="input">
                                    <option value="" defaultValue>Selecione um consultório</option>
                                    {
                                        consultorios.length > 0 ? consultorios.map( (consultorio) => (
                                            <option value={consultorio.id_consultorio} key={consultorio.id_consultorio}>{consultorio.nome}</option>
                                        )) : ''
                                    }

                                </Field>
                                {errors.id_consultorio && touched.id_consultorio? <p>{errors.id_consultorio}</p> : ''}
                            </div>
                            <Button 
                                size="medium"
                            >Cadastrar</Button>
                        </Form>
                    )}
                    
                </Formik>
            </MainContainer>
        </div>
    )
}