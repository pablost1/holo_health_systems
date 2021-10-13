import { AccountCircle } from "@material-ui/icons";
import { ReactComponent as Logo } from '../../media/logo.svg';
import './style.css';

import Icon from '@material-ui/core/Icon';



function HomeHeader() {
    return (
        <div className="home-header-container">   
            <header>
                <AccountCircle fontSize="large"className="home-header__icon"/>
                <input  className="home-header__input" type="text" placeholder="Buscar consulta . . ."/>
                <a className="home-header__logout-button">Sair</a>
                
            </header>
        </div>
    )
}


export default HomeHeader