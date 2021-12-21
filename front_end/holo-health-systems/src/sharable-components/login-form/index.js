import  './style.css'
import Button from '../button'
import { Lock } from '@material-ui/icons';

import { useContext } from 'react';
import { AuthContext } from '../../auth/authContext'
import { Formik, Field, Form } from 'formik'
import  * as Yup  from 'yup';
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom'



let schema = Yup.object().shape({
    cpf: Yup.string().required('Uma CPF é necessário'),
    senha: Yup.string()
        .required('Uma senha é necessária')
})

function LoginForm() {

    
    

    const {handleLogin} = useContext(AuthContext)
    
    
    return (
        <Formik
            initialValues={{
                cpf: '',
                senha: ''
            }}

            validationSchema={schema}

            onSubmit={(value, { setSubmitting }) => {
                
                handleLogin(value, setSubmitting)
                
            }}
        >
            {({values, touched, errors, isSubmitting, setSubmitting, handleChange }) => (

                <Form className="form">
                    <div className="form-group">
                        <label>CPF</label>
                        <Field 
                            name="cpf"
                            render={({field}) => (
                                <InputMask
                                    {...field}
                                    onChange={handleChange}
                                    mask="999.999.999-99"
                                />
                            )}
                        />
                        { errors.cpf && touched.cpf ? <p>{errors.cpf}</p> : '' }
                    </div>
                    <div className="form-group">
                        <label>Senha</label>
                        <Field name="senha" type="password"/>
                        { errors.senha && touched.senha ? <p>{errors.senha} </p> : '' }
                    </div>
                    <div className="form-login">
                        <Button loading={isSubmitting} size="medium">Login</Button>
                        <Link to="/cadastro">
                            <span className="has-account">Não tem uma conta? Cadastra-se.</span>
                        </Link>
                        
                       
                        
                        
                        
                    </div>
                    
            
                </Form>
            )}

            

        </Formik>
        
    )
}

export default LoginForm