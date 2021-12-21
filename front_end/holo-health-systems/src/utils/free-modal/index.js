import './style.css'


export default function FreeModal(props) {

    function CloseModal(e) {
        e.stopPropagation()
        props.setModal(false)
    }



    if(props.marcarConsulta) {
        return (
            <div className={`dark-container ${props.opened ? '' : 'closed'}`} onClick={CloseModal}>
                <div className="dark-container__content" onClick={(e) => e.stopPropagation()}>
                    {props.children}
                </div>
            </div>
        )
    }
    
    return (
        <div className={`dark-container ${props.opened ? '' : 'closed'}`}>
            <div className="dark-container__content">
                {props.children}
            </div>
        </div>
    )


}