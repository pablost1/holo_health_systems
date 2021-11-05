import './style.css'



function Button(props) {
    



    if(props.hasEvent) {
        return <button type="submit" onClick={props.onClick} style={props.style} className={`button  ${props.size ? props.size : ''} ${props.status ? props.status : ''}`}>{ props.children }</button>
    }
    
    return <button type="submit" style={props.style} className={`button  ${props.size ? props.size : ''} ${props.status ? props.status : ''}`}>{ props.children }</button>
}

export default Button