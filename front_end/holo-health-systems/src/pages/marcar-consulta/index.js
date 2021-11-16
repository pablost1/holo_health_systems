import { Formik, Field, Form } from 'formik'
import './style.css'
import DescriptionHeader from '../../sharable-components/description-header/index.js'


import axios from 'axios'
import { useState } from 'react';



axios.create({
    baseURL: 'http://locahost:3001'
})




// async function CarregarDropdown(para='estados') {
//     return await  axios.get(`/${para}`)
// }


function MarcarConsulta() {


    // const [ estado, setEstado ] = useState([])
    // const [cidade, setcidade] = useState([])
    // const [especialidade, setespecialidade] = useState([])


    // useEffect(async () => {
    //     let estados = CarregarDropdown()
    //     setEstado(estados)
    // })




    console.log('loaded')

    return (
        <div className="marcar-consulta">
            
            <DescriptionHeader path="/home">Marcar consulta</DescriptionHeader>
            
            <Formik
                initialValues={{
                    estado: '',
                    cidade: '',
                    especialidade: ''
                }}

            >
                {({  values, handleChange }) => (
                    <Form className="marcar-consulta__form">
                        <div className="form-group">
                            <label className="label-bigger">Selecione um estado estado</label>
                            <Field
                                name="estado"
                                as="select"
                                className="input"
                                onChange={ (e) => {
                                    handleChange(e)

                                    

                                }}
                                
                            >
                                <option value="" select="selected">Estado</option>
                                {
                                    
                                }
                                <option value="PE">Pernambuco</option>
                                <option value="PB">Paraiba</option>
                            </Field>
                        </div>
                        
                        <div className={`form-group ${values.estado ? '' : 'hidden'}`}>
                            <label className="label-bigger" >Cidade</label>
                            <Field name="cidade" as="select" className="input">
                                <option value="" select="selected">Escolha uma cidade</option>
                                <option value="Recife">Recife</option>
                                <option value="Paulista">Paulista</option>
                            </Field>
                        </div>
                        <div className={`form-group ${values.cidade ? '' : 'hidden'}`}>
                            <label className="label-bigger">Especialidade</label>
                            <Field name="especialidade" as="select" className="input">
                                <option value="" select="selected">Escolha uma especialidade</option>
                                <option value="otorrino">Otorrinolaringologia</option>
                                <option value="pediatria">Pediatria</option>
                            </Field>


                        </div>
                    </Form>
                )}
                
            </Formik>
        </div>  
    )
}

export default MarcarConsulta