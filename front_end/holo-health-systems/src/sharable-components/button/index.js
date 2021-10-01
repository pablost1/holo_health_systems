import './style.css'
import { useState } from 'react'

function fool(e) {
    e.preventDefault()
}


function Button(props) {
    return <button onClick={fool} style={props.style} className={`button  ${props.size ? props.size : ''} ${props.status ? props.status : ''}`}>{ props.children }</button>
    


}

export default Button