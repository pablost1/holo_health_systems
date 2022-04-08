import './style.css'
import Button from '../../sharable-components/button/index';
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import InputMask  from 'react-input-mask';
import http from '../../http/index';
import { useContext } from 'react';
import { AuthContext } from '../../auth/authContext';
import DescriptionHeader from '../../sharable-components/description-header';





function ValidationField({error}) {
    return (
        <div className="validation-field">
            <p>{ error }</p>
        </div>
    )
}

export default function Cadastro() {

    const { handleError } = useContext(AuthContext)
    
    
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
        dt_nascimento: Yup.string()
            .required('É necessário uma data de nascimento')
            .test('teste-data', 'Data de nascimento inválida', (value) => moment(value, 'DD/MM/YYYY').isValid())
        
        
    })


    async function CadastrarPaciente(value, reset, setSubmitting) {

        try {
            const { data }  = await http.post('/usuario/cadastro', value)
            
            handleError(data.mensagem)
            reset()
            setSubmitting(false)

        }

        catch(err) {
            
        }
    }

    return (
        <div className="cadastro-container">
            <DescriptionHeader path="login">
                Cadastro
            </DescriptionHeader>
            
            <Formik
                initialValues={{
                    cpf: '',
                    senha: '',
                    email: '',
                    nome: '',
                    sobrenome: '',
                    dt_nascimento: ''
                    
                }}

                validationSchema={validation}

                onSubmit={ (value, {resetForm, setSubmitting},) => {
                    
                    CadastrarPaciente(value, resetForm, setSubmitting)
                    
                }}
                
            >
                
                {({errors, touched, handleChange, values, isSubmitting}) => (
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
                            {errors.dt_nascimento && touched.dt_nascimento ? <ValidationField error={errors.dt_nascimento} /> : ''}
                        </div>
                        <div className="form-group">
                            <label>E-mail</label>
                            <Field className="input" name="email" />
                            { errors.email && touched.email ? <ValidationField error={errors.email} /> : ''}
                        </div>
                        <div className="form-group">
                            <label>CPF</label>
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
                            {errors.cpf && touched.cpf ? <ValidationField error={errors.cpf} /> : ''}
                        </div>
                        <div className="form-group">
                            <label>Senha</label>
                            <Field className="input" name="senha" type="password" />
                            {errors.senha && touched.senha ? <ValidationField error={errors.senha} /> : ''}
                        </div>
                        <Button loading={isSubmitting}size="medium">Registrar</Button>
                    </Form>    
                )}
            </Formik>
        </div>
    )
}