import axios from 'axios'
import { createBrowserHistory } from 'history'

const http = axios.create({
    baseURL: 'http://localhost:3001'
})

export const history = createBrowserHistory()



const responseErrorHandler = (error) => {

    if(error.response.status === 401) {
        
        if(history.location.pathname === '/login') {
            alert(error.response.data.mensagem)
        }



        else {

            alert(`Sua sessão expirou! Retornando para o início`)
            localStorage.removeItem('token')
            history.push('/login')
        }
        
    }

    if(error.response.status === 404) {

        alert('Nada foi encontrado')
    }

    if(error.response.status === 500) {
        alert('Erro desconhecido')
    }




}

http.interceptors.response.use(undefined,
    error => responseErrorHandler(error)
)

export default http
