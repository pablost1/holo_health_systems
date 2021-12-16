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

        const token = JSON.parse(localStorage.getItem('token'))
        const tipo = JSON.parse(localStorage.getItem('tipo'))
        http.defaults.headers.Authorization = `Bearer ${token}`
        if(token && tipo) {
            setisLoggedin(true)
            setUserType(tipo)
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
            console.log(data)
            localStorage.setItem('token', JSON.stringify(data.token))
            localStorage.setItem("tipo",JSON.stringify(data.tipo))
            setisLoggedin(true)
            setUserType(data.tipo)
            http.defaults.headers.Authorization = `Bearer ${data.token}`


            
            
        } catch(error) {
            if(error.response) {
                console.log(error.response.data)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
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

