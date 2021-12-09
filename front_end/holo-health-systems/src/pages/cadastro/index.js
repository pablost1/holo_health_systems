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
        cpf: Yup.string()
            .required('O cpf é necessário'),
        senha: Yup.string()
            .required('Uma senha é necessária')
            .min(8, 'Senha muito curta')
            .max(16, 'Senha muito longa'),
        email: Yup.string()
            .email('E-mail inválido').required('Um e-mail é necessário'),
        nome: Yup.string()
            .required('Um nome é necessário'),
        sobrenome: Yup.string()
            .required('Um sobrenome é necessário'),
        
        
    })

//     "cpf"              : String,  // Numero do CPF do novo usuário
//  *      "senha"            : String,   // Senha do usuario
//  *      "email"            : String,   // E-mail de cadastro do novo usuario
//  *      "nome"             : String,   // Nome principal do usuario
//  *      "sobrenome"        : String,   // Ultimo nome do usuario



    return (
        <div className="cadastro-container">
            <h1>Cadastro </h1>
            
            <Formik
                initialValues={{
                    cpf: '',
                    senha: '',
                    email: '',
                    nome: '',
                    sobrenome: '',
                    
                }}

                validationSchema={validation}

                onSubmit={ (value) => {
                    
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