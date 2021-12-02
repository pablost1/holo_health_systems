import './style.css'
import dwight from '../../media/b5b7L_At_400x400.jpg'

export default function Error404({children}) {

    return (
        <div className="error-404">
            <img alt="dwight" className="dwight-pic" src={dwight} />
            <h1>{children}</h1>
        </div>
    )
}