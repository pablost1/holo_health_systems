import { ArrowBack, ArrowBackIos } from "@material-ui/icons"
import './style.css'


export default function DescriptionHeader() {
    return (
        <div className="description-header">
            <ArrowBackIos />
            <h2>Marcar consulta </h2>
        </div>
    )
}