import { AccountCircle } from "@material-ui/icons";
import './style.css';


import { useContext } from "react";

import { AuthContext } from "../../auth/authContext";






function HomeHeader() {



    const { handleLogout } =  useContext(AuthContext)

    


    
    
    return (
        <div className="home-header-container">   
            <header>
                <AccountCircle fontSize="large"className="home-header__icon"/>
                <input  className="home-header__input" type="text" placeholder="Buscar consulta . . ."/>
                <button className="home-header__logout-button" onClick={handleLogout} >Sair</button>
                
                
            </header>
        </div>
    )
}


export default HomeHeader