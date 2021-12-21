import './style.css'
import Loading from '../loading-animation/index';




function Button(props) {
    



    if(props.hasEvent) {
        return <button disabled={props.disabled} type="submit" onClick={props.onClick} style={props.style} className={`button  ${props.size ? props.size : ''} ${props.status ? props.status : ''}`}>
            {
                props.loading ? <Loading /> : props.children 
            }
        </button>
    }
    
    return <button disabled={props.disabled} type="submit" style={props.style} className={`button  ${props.size ? props.size : ''} ${props.status ? props.status : ''}`}>
            {
                props.loading ? <Loading /> : props.children 
            }
    </button>
}

export default Button