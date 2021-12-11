import './style.css'
import DescriptionHeader from '../../sharable-components/description-header/index';
import  * as Yup from 'yup';
import { Formik, Form, Field } from 'formik'
import Button from '../../sharable-components/button/index';
import http from '../../http/index';
import { useState, useEffect, useRef } from 'react';





const validation = Yup.object().shape({
    nome: Yup.string()
        .required('Um nome é necessário'),
    id_cidade: Yup.string()
        .required('Uma cidade é necessária'),
    bairro: Yup.string()
        .required('Um bairro é necessário'),
    rua: Yup.string()
        .required('Uma rua é necessária'),
    numero: Yup.string()
        .required('Um número é necessário'),
    n_sala: Yup.string()
        .required('Um Número de salas é necessário'),
    
})




export default function  NovoConsultorio() {

    const formRef = useRef()
    const [ cidades, setcidades ] = useState([])
    const [ estado, setestado ] = useState([])
    const [ estadoSelecionado, setestadoSelecionado] = useState('')

    



    useEffect( () => {

        (async () => {
            try {
                const { data } = await http.get('/estado')
                setestado(data)
                
            }
    
            catch(err) {
                alert(err.response.data.mensagem)
            }
        })()
        

    },[])

    async function CarregarCidades(e) {
        setestadoSelecionado(e.target.value)

        try {
            const data  = await http.post('/especifica', {id_estado: estadoSelecionado})
            console.log(data)
        }

        catch(err) {
            console.log(err.response)
        }
    }

    


    return (
        <div className="novo-consultorio-container">
            <DescriptionHeader path="/master-home">Novo consultório</DescriptionHeader>
            <Formik
                initialValues={{
                    nome: '',
                    id_cidade: '',
                    bairro: '',
                    rua: '',
                    numero: '',
                    n_sala: '',
                    
                }}

                validationSchema={validation}

                onSubmit={(value) => {
                    console.log(value)
                }}

                innerRef={formRef}
            >
                {({errors, touched, values, handleChange}) => (
                    <Form className="consultorio-form">
                        <div className="form-group">
                            <label>Nome</label>
                            <Field name="nome" className="input"/>
                            { errors.nome && touched.nome ? <p>{ errors.nome}</p> : ''}
                        </div>
                        <div className="form-group">
                            <label>Estado</label>
                            <select className="input" onChange={CarregarCidades}>
                                {
                                    estado.estados ? estado.estados.map( (estado) => (
                                        <option key={estado.id_estado} value={estado.id_estado} >{estado.nome}</option> 
                                    )) : ''
                                }
                            </select>
                            { errors.id_cidade && touched.id_cidade ? <p>{ errors.id_cidade }</p> : ''}
                        </div>
                        <div className="form-group">
                            <label>Cidade</label>
                            <Field as="select" name="id_cidade" className="input">
                                {
                                    // cidades.map( (cidade) => (
                                    //     <option key={cidade.id_cidade}>{cidade.nome}</option>
                                    // ))
                                }
                            </Field>
                            { errors.id_cidade && touched.id_cidade ? <p>{ errors.id_cidade }</p> : ''}
                        </div>
                        <div className="form-group">
                            <label>Bairro</label>
                            <Field name="bairro"className="input"/>
                            { errors.bairro && touched.bairro ? <p>{ errors.bairro }</p> : ''}
                        </div>
                        <div className="form-group">
                            <label>Rua</label>
                            <Field name="rua"className="input"/>
                            { errors.rua && touched.rua ? <p>{ errors.rua }</p> : ''}
                        </div>
                        <div className="form-group">
                            <label>Número</label>
                            <Field name="numero"className="input"/>
                            { errors.numero && touched.numero ? <p>{ errors.numero }</p> : ''}
                        </div>
                        <div className="form-group">
                            <label>Número de salas</label>
                            <Field name="n_sala" className="input"/>
                            { errors.n_sala && touched.n_sala ? <p>{ errors.n_sala }</p> : ''}
                        </div>

                        
                        
                        <Button
                            size="medium"
                            style={{
                                alignSelf: 'baseline'
                            }}
                        >
                            Cadastrar
                        </Button>
                        
                    </Form>
                )}

            </Formik>
        </div>
    )

}