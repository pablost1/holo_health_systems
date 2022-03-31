import axios from 'axios'
import { createBrowserHistory } from 'history'

const http = axios.create({
    baseURL: 'https://holo-health-back.herokuapp.com'
})

const history = createBrowserHistory()


function OpenModalInterceptor(mensagem) {

    const component = `<div id="interceptor-modal" class="modal-container"><div class="modal-message"><p>${mensagem}</p></div></div>`
    const body = document.body 
    body.innerHTML = component + body.innerHTML

    setTimeout(() => {
        document.getElementById('interceptor-modal').remove()
    }, 2000)
}



const responseErrorHandler = (error) => {

    // if(error.response === null || error.response === undefined) {
    //     alert(error.response.status)
    // }

    if(!error.response) {
        alert('Sem conexão')

    }

    if(error.response.status === 401) {

        if(window.location.pathname === '/login' || window.location.pathname === '/') {
            alert(error.response.data.mensagem)
            


        }

        else {

            alert(`Sua sessão expirou! Retornando para o início`)
            localStorage.removeItem('token')
            window.location.reload()

        }
        
    }

    

    if(error.response.status === 404) {

        alert('Nada foi encontrado')
    }

    if(error.response.status === 500) {
        alert('Erro desconhecido')
    }

    if(error.response.status === 409) {
        

        alert(error.response.data.mensagem)

        return error
    }

    if(error.response.status === 406) {
        alert(error.response.data.mensagem)

        return error
    }




}

http.interceptors.response.use(undefined,
    error => responseErrorHandler(error)
)

export default http
export { history }

