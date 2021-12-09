import  './style.css'
import Button from '../button'
import { Lock } from '@material-ui/icons';

import { useContext } from 'react';
import { AuthContext } from '../../auth/authContext'
import { Formik, Field, Form } from 'formik'
import  * as Yup  from 'yup';
import InputMask from 'react-input-mask';









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

            onSubmit={(value) => {
                
                handleLogin(value)
                
            }}
        >
            {({values, touched, errors }) => (

                <Form className="form">
                    <div className="form-group">
                        <label>CPF</label>
                        <Field 
                            name="cpf"
                        />
                        { errors.email && touched.email ? <p>{errors.email}</p> : '' }
                    </div>
                    <div className="form-group">
                        <label>Senha</label>
                        <Field name="senha" type="password"/>
                        { errors.senha && touched.senha ? <p>{errors.senha} </p> : '' }
                    </div>
                    <div className="form-login">
                        <Button size="medium">Login</Button>
                       
                        
                        
                        
                    </div>
                    
            
                </Form>
            )}

            

        </Formik>
        
    )
}

export default LoginForm