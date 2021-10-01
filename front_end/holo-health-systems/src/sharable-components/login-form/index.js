import  './style.css'
import Button from '../button'
import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
import { Lock } from '@material-ui/icons';


function LoginForm() {
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

                <Button size="medium"  style={{ marginLeft: '1em'}}>Login</Button>
            </div>
            
        </form>
    )
}

export default LoginForm