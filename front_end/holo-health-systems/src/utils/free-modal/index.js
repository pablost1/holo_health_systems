import './style.css'


export default function FreeModal(props) {


    
    return (
        <div className={`dark-container ${props.opened ? '' : 'closed'}`}>
            <div className="dark-container__content">
                {props.children}
            </div>
        </div>
    )


}