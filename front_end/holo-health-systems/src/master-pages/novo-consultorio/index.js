import './style.css'
import DescriptionHeader from '../../sharable-components/description-header/index';
import  * as Yup from 'yup';
import { Formik, Form, Field } from 'formik'
import Button from '../../sharable-components/button/index';
import http from '../../http/index';
import { useState, useEffect } from 'react';





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

    const [ cidades, setcidades ] = useState([])
    const [ estado, setestado ] = useState([])
    const [ estadoSelecionado, setestadoSelecionado] = useState('')

    async function CarregarEstados() {

        try {
            const { data } = await http.get('/estado')
            setestado(data.estados)
        }

        catch(err) {
            alert(err.response.data.mensagem)
        }
    }



    useEffect( () => {

        (async function CarregarCidades(){
            try {
                const response = await http.get('/cidade')
                setcidades(response.data.cidades)
                
            }
    
            catch(err){
                console.log(err.response)
            }
        })()

    },[])

    


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
            >
                {({errors, touched, values}) => (
                    <Form className="consultorio-form">
                        <div className="form-group">
                            <label>Nome</label>
                            <Field name="nome" className="input"/>
                            { errors.nome && touched.nome ? <p>{ errors.nome}</p> : ''}
                        </div>
                        <div className="form-group">
                            <label>Estado</label>
                            <Field as="select" name="id_cidade" className="input">
                                {
                                    
                                }
                            </Field>
                            { errors.id_cidade && touched.id_cidade ? <p>{ errors.id_cidade }</p> : ''}
                        </div>
                        <div className="form-group">
                            <label>Cidade</label>
                            <Field as="select" name="id_cidade" className="input">
                                {
                                    console.log(cidades)
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