import  './style.css'
import Button from '../button'
import { Lock } from '@material-ui/icons';

import { useContext } from 'react';
import { AuthContext } from '../../auth/authContext'



function LoginForm() {

    const { checkLocalStorage } = useContext(AuthContext)
    

    return (
        <form className="form">
            <div className="form-group">
                <label>Usuário</label>
                <input type="text" />
            </div>
            <div className="form-group">
                <label>Senha</label>
                <input type="password" />
            </div>
            <div className="form-login">
                <span style={{fontSize: '.8rem'}}>
                    Esqueci minha senha
                </span>
                <Lock style={{fontSize: '1.1rem'}}/>

                <Button onClick={checkLocalStorage} size="medium"  style={{ marginLeft: '1em'}}>Login</Button>
            </div>
            
        </form>
    )
}

export default LoginForm