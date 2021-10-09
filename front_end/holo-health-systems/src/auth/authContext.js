import  React, { createContext } from 'react';
import  axios  from 'axios';



const AuthContext = createContext()
const url = 'http://localhost:3001'



function AuthorizationContext({children}) {
    
    
    async function handleLogin(user) {
        try {
            const { data } = await axios.post(`${url}/register`, user)
            localStorage.setItem('token', JSON.stringify(data.accessToken))
        }

        
        catch(err) {
            alert(err)
        }
    }

    function checkLocalStorage() {
        console.log(localStorage.getItem('token'))
    }
    return (
        <AuthContext.Provider value={{name: 'carlos', checkLocalStorage, handleLogin}}>
            { children }
        </AuthContext.Provider>
    )
}


export { AuthContext, AuthorizationContext } 



