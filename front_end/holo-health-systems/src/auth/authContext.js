import  React, { createContext, useState } from 'react';
import  axios  from 'axios';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';





const AuthContext = createContext()
const http = axios.create({
    baseURL: 'http://localhost:3001'
})




function AuthorizationContext({children}) {
    const [isLoggedin, setisLoggedin] = useState(false)
    const history = useHistory()


    useEffect( () => {

        const token = localStorage.getItem('token')

        if(token) {
            setisLoggedin(true)
        }
    })
    
    
    async function handleLogin(user) {
        const { data } = await http.post('/usuario/login', user)
        localStorage.setItem('token', JSON.stringify(data))
        setisLoggedin(true)





    }

    function handleLogout() {
        localStorage.removeItem('token')
        setisLoggedin(false)

    }

    return (
        <AuthContext.Provider value={{
            
            handleLogin,
            handleLogout,
            isLoggedin

        }}>
            { children }
        </AuthContext.Provider>
    )
}


export { AuthContext, AuthorizationContext } 



