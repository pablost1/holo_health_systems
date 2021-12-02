import './style.css'
import LoginForm from '../../sharable-components/login-form'
import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';




function LoginPage() {

    const { isLoggedin, userType } = useContext(AuthContext)
    const history = useHistory()

    

    // useEffect(() => {
    //     if(isLoggedin) {
    //         // switch (userType) {
    //         //     case 'paciente':
    //         //         history.push('/home')
    //         //     case 'gerente':
    //         //         console.log('é gerente krl')
    //         //         history.push('/home-manager')
    //         //     case 'mestre':
    //         //         history.push('/master-home')
    //         // }

    //     }
    // })
    

    

    
    return (
        <div className="login-page">
            <div className="hero-container">
                <p >Frase de efeito que ainda vou decidir qual será</p>
                <img className="img"src="https://www.healthpeople.org/wp-content/uploads/2015/01/HLtop.jpg" />
            </div>
            
            <div className="login-container">
                
                <LoginForm />
                
            </div>
            
        </div>
    )
}

export default LoginPage