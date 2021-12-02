import {  ArrowBackIos } from "@material-ui/icons"
import { Link } from 'react-router-dom';
import './style.css'


export default function DescriptionHeader(props) {
    return (
        <div className="description-header">
            <Link to={props.path} style={{ color: 'white'}}>
                <ArrowBackIos />
            </Link>
            
            <h2>{props.children}</h2>
        </div>
    )
}