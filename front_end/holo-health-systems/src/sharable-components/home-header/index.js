import { AccountCircle } from "@material-ui/icons";
import { ReactComponent as Logo } from '../../media/logo.svg';
import './style.css';

import Icon from '@material-ui/core/Icon';
import { useEffect, useContext } from "react";

import { useHistory } from 'react-router-dom';
import { AuthContext } from "../../auth/authContext";






function HomeHeader() {



    const { handleLogout } =  useContext(AuthContext)

    

    function checkToken() {
        const token = localStorage.getItem('token')
        console.log(token)
    }

    

    return (
        <div className="home-header-container">   
            <header>
                <AccountCircle fontSize="large"className="home-header__icon"/>
                <input  className="home-header__input" type="text" placeholder="Buscar consulta . . ."/>
                <a className="home-header__logout-button" onClick={handleLogout} >Sair</a>
                <a className="home-header__logout-button" onClick={checkToken} >Check Token</a>
                
            </header>
        </div>
    )
}


export default HomeHeader