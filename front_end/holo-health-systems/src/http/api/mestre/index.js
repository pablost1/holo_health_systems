import http from '../../index';


export async function CarregarCidades() {


    try {
        const { data } = await http.get('/cidade')
        
    }

    catch(err) {
        alert(err.response.data.mensagem)
    }
 
}



