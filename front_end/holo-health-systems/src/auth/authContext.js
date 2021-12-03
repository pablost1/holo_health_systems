import  React, { createContext, useState } from 'react';
import http from '../http'
// import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';





const AuthContext = createContext()


function AuthorizationContext({children}) {
    const [isLoggedin, setisLoggedin] = useState(false)
    const [modalState, setmodalState] = useState({ modalMode: ''})
    const [ userType, setUserType ] = useState('')

    useEffect( () => {

        const token = localStorage.getItem('token')

        if(token) {
            setisLoggedin(true)
        }
    }, [])

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
            
            localStorage.setItem('token', JSON.stringify(data.token))
            setisLoggedin(true)
            setUserType(data.tipo)
            http.defaults.headers.Authorization = `Bearer ${data.token}`
            
            
        } catch(error) {
            const message = error.response.data.mensagem
            handleError(message)
        }

    }

    function handleLogout() {
        localStorage.removeItem('token')
        setisLoggedin(false)
        setUserType("")
        http.defaults.headers.Authorization = undefined

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

