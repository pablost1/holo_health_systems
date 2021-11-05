import './style.css'
import Button from '../../sharable-components/button/index';
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';

let http = axios.create({
    baseURL: 'http://localhost:3001',
})





function ValidationField({error}) {
    return (
        <div className="validation-field">
            <p>{ error }</p>
        </div>
    )
}

export default function Cadastro() {
    
    
    
    const validation = Yup.object().shape({
        nome: Yup.string()
            .min(2, 'Nome muito curto')
            .max(30, 'Nome muito longo')
            .required('O nome é necessário'),
        sobrenome: Yup.string()
            .min(2, 'Sobrenome muito curto')
            .max(30, 'Sobrenome muito longo')
            .required('Um sobrenome é necessário'),
        email: Yup.string()
            .email('E-mail inválido').required('Um e-mail é necessário'),
        cpf: Yup.number()
            .required('Um CPF é necessário'),
        senha: Yup.string()
            .required('Uma senha é necessária'),
        tipo: Yup.string()
            .required('Selecione um tipo de usuário')
        
    })


    return (
        <div className="cadastro-container">
            <h1>Cadastro </h1>
            
            <Formik
                initialValues={{
                    nome: '',
                    sobrenome: '',
                    email: '',
                    cpf: 0,
                    tipo: '',
                    senha: ''
                }}

                validationSchema={validation}

                onSubmit={ (value) => {
                    console.log(value)
                    http.post('/usuario/cadastro', value)
                        .then(res => console.log(res))
                }}
                
            >
                {({errors, touched}) => (
                    <Form className="cadastro-container__form">
                        <div className="form-group">
                            <label>Nome</label>
                            <Field className="input" name="nome" />
                            
                            {errors.nome && touched.nome ? <ValidationField error={errors.nome} /> : ''}
                        </div>
                        <div className="form-group">
                            <label>Sobrenome</label>
                            <Field className="input" name="sobrenome" />
                            {errors.sobrenome && touched.sobrenome ? <ValidationField error={errors.sobrenome} /> : ''}
                        </div>
                        <div className="form-group">
                            <label>E-mail</label>
                            <Field className="input" name="email" />
                            { errors.email && touched.email ? <ValidationField error={errors.email} /> : ''}
                        </div>
                        <div className="form-group">
                            <label>CPF</label>
                            <Field className="input" name="cpf" />
                            {errors.cpf && touched.cpf ? <ValidationField error={errors.cpf} /> : ''}
                        </div>
                        <div className="form-group">
                            <label>Tipo</label>
                            <Field defaultValue={'M'} as="select" className="input" name="tipo">
                                
                                <option value="M">Médico</option>
                                <option value="P">Paciente</option>
                            </Field>
                            {errors.tipo && touched.tipo ? <ValidationField error={errors.tipo} /> : ''}
                        </div>
                        <div className="form-group">
                            <label>Senha</label>
                            <Field className="input" name="senha" type="password" />
                            {errors.senha && touched.senha ? <ValidationField error={errors.senha} /> : ''}
                        </div>
                        <Button size="medium">Registrar</Button>
                    </Form>    
                )}
            </Formik>
        </div>
    )
}