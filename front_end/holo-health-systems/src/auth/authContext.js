import  React, { createContext, useState } from 'react';
import  axios  from 'axios';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';





const AuthContext = createContext()
const http = axios.create({
    baseURL: 'http://localhost:3001'
})




function AuthorizationContext({children}) {
    const [isLoggedin, setisLoggedin] = useState(true)
    const [modalState, setmodalState] = useState({ modalMode: ''})
    const [ userType, setUserType ] = useState('mestre')

    useEffect( () => {

        const token = localStorage.getItem('token')

        if(token) {
            setisLoggedin(true)
        }
    })

    function RegisteSchedule(component) {
        setmodalState({
            modalMode: 'register',
            childComponent: component
        })
    }

    function handleError(message) {

        setmodalState({
            modalMode: 'error',
            errorMessage: message
        })
    }

    function dismissable(action){
        setmodalState({
            modalMode: 'confirmable',
            message: 'Você tem certeza?',
            dismissFunction: action
        })
    }

    function closeModal() {
        setmodalState({ modalMode: '', errorMessage: ''})
    }


    
    
    
    async function handleLogin(user) {


        try {
            const { data } = await http.post('/usuario/login', user)
            localStorage.setItem('token', JSON.stringify(data))
            setisLoggedin(true)
            
        } catch(error) {
            const message = error.response.data.mensagem
            handleError(message)
        }

        
        





    }

    function handleLogout() {
        localStorage.removeItem('token')
        setisLoggedin(false)

    }



    return (
        <AuthContext.Provider value={{
            
            handleLogin,
            handleLogout,
            isLoggedin,
            handleError,
            closeModal,
            RegisteSchedule,
            modalState,
            dismissable,
            userType

        }}>
            { children }
        </AuthContext.Provider>
    )
}


export { AuthContext, AuthorizationContext } 



