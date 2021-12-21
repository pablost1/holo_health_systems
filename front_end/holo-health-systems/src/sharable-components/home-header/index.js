import { AccountCircle, Person } from "@material-ui/icons";
import './style.css';
import { useContext } from "react";
import { AuthContext } from "../../auth/authContext";







function HomeHeader() {



    const { handleLogout } =  useContext(AuthContext)

    


    
    
    return (
        <div className="home-header-container">   
            <header>
                <Person fontSize="large"className="home-header__icon"/>
                <div className="tipo-usuario">
                   <span>Cirlene Moreira</span> 
                   <h3 className="nome-paciente">Paciente</h3>
                </div>
                
                <span className="home-header__logout-button" onClick={handleLogout}>Sair</span>
            
                
                
            </header>
        </div>
    )
}


export default HomeHeader