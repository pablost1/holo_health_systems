import './style.css'
import { useState } from 'react'

function fool(e) {
    e.preventDefault()
}


function Button(props) {
    
    function Action(e) {
        if(props.onClick) props.onClick(e)
        
    }

    
    return <button type={props.type} onClick={Action} style={props.style} className={`button  ${props.size ? props.size : ''} ${props.status ? props.status : ''}`}>{ props.children }</button>
}

export default Button