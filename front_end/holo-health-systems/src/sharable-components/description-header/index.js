import { ArrowBack, ArrowBackIos } from "@material-ui/icons"
import { Link } from 'react-router-dom';
import './style.css'


export default function DescriptionHeader({children}) {
    return (
        <div className="description-header">
            <Link to="/home" style={{ color: 'white'}}>
                <ArrowBackIos />
            </Link>
            
            <h2>{children}</h2>
        </div>
    )
}