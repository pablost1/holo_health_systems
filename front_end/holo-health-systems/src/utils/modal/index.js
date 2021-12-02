import './style.css'
import Button from '../../sharable-components/button/index';
import { useContext } from 'react';
import { AuthContext } from '../../auth/authContext';








export default function Modal(props) {
    

    const { modalState , closeModal } = useContext(AuthContext)



    function close(e) {
        e.stopPropagation()
    }

    
    
    

    if(modalState.modalMode === 'register') {
        return (
            <div className="modal-container" onClick={close}>
                <div className="modal-message-child">
                   
                </div>
            </div>
        )
    }



    if(modalState.modalMode === 'error') {
        return (
            <div className="modal-container" onClick={close}>
                <div className="modal-message">
                    <p>{ modalState.errorMessage}</p>
                    <Button hasEvent={true} onClick={closeModal} size="small">Fechar</Button>
                </div>
            </div>
        )
    }

    if(modalState.modalMode === 'confirmable') {
        return (
            <div className="modal-container" onClick={close}>
                <div className="modal-message">
                    <p>{ modalState.errorMessage }</p>
                    <div className="modal-actions">
                        <Button hasEvent={true} onClick={closeModal} size="small">Sim</Button>
                        <Button status="danger" hasEvent={true} onClick={closeModal} size="small">Não</Button>
                    </div>
                </div>
                
            </div>
        )
    }

    return ''
    
}