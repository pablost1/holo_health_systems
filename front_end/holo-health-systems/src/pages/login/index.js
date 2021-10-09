import './style.css'
import LoginForm from '../../sharable-components/login-form'
import { ReactComponent as Logo } from '../../media/logo.svg'
import { useContext } from 'react';


function LoginPage() {
    
    return (
        <div className="login-page">
            <div className="hero-container">
                <p >Frase de efeito que ainda vou decidir qual será</p>
                <img className="img"src="https://www.healthpeople.org/wp-content/uploads/2015/01/HLtop.jpg" />
            </div>
            
            <div className="login-container">
                <Logo className="logo"/>
                <LoginForm />
                
            </div>
            
        </div>
    )
}

export default LoginPage