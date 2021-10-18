import  './style.css'
import Button from '../button'
import { ErrorSharp, Lock } from '@material-ui/icons';

import { useContext, useEffect } from 'react';
import { AuthContext } from '../../auth/authContext'
import { Formik, Field, Form } from 'formik'
import axios from 'axios';
import  * as Yup  from 'yup';
import { useHistory } from 'react-router-dom';






let http = axios.create({
    baseURL: 'http://localhost:3001'
})


let schema = Yup.object().shape({
    email: Yup.string()
        .email().required('Um e-mail é necessário'),
    password: Yup.string()
        .required('Uma senha é necessária')
})







function LoginForm() {

    
    const { handleLogin  } = useContext(AuthContext)

    
    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}

            validationSchema={schema}

            onSubmit={(value) => {
               handleLogin(value)
            }}
        >
            {({values, touched, errors }) => (

                <Form className="form">
                    <div className="form-group">
                        <label>Usuário</label>
                        <Field name="email" class="input"/>
                        { errors.email && touched.email ? <p>{errors.email}</p> : '' }
                    </div>
                    <div className="form-group">
                        <label>Senha</label>
                        <Field name="password" class="input"/>
                        { errors.password && touched.password ? <p>{errors.password} </p> : '' }
                    </div>
                    <div className="form-login">
                        <span style={{fontSize: '.8rem'}}>
                            Esqueci minha senha
                        </span>
                        <Lock style={{fontSize: '1.1rem'}}/>

                        <Button size="medium"  style={{ marginLeft: '1em'}}>Login</Button>
                    </div>
            
                </Form>
            )}

            

        </Formik>
        
    )
}

export default LoginForm