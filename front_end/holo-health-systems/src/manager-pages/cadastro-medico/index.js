import './style.css'
import DescriptionHeader from '../../sharable-components/description-header/index';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from '../../sharable-components/button/index';
import InputMask from 'react-input-mask';
import http from '../../http/index'
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../auth/authContext';


const validation = Yup.object().shape({
    nome: Yup.string()
        .required('Um nome é necessário'),
    sobrenome: Yup.string()
        .required('Um sobrenome é necessário'),
    cpf: Yup.string()
        .required('Um CPF é necessário'),
    crm: Yup.string()
        .required('Um CRM é necessário'),
    email: Yup.string()
        .email("Este e-mail é inválido")
        .required("Um e-mail é necessário"),
    senha: Yup.string()
        .required('Uma senha é necessária'),
    geral: Yup.boolean().required('Selecione se é clínico geral')
})

 

export default function CadastroMedico() {
    const {handleError} = useContext(AuthContext)
    const [especialidades, setEspecialidades] = useState([])

    async function EnviarMedico(value) {
        
        try {
            const { data } = await http.post('/usuario/cadastro/medico',value)
            handleError(data.mensagem)
        }

        catch(err) {
            const message = err.response.data.mensagem
            handleError(message)
        }
    }

    async function CarregarEspecialidades() {

        try {
            const { data } = await http.get('/especialidade')
            setEspecialidades(data.Especialidades)
        }

        catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        CarregarEspecialidades()
    }, [])
    

    return (
        <div className="cadastro-medico-container">
            <DescriptionHeader path="/home-manager">Cadastrar médico</DescriptionHeader>
            <div className="cadastro-medico">
                <Formik
                    initialValues={{
                        nome: '',
                        sobrenome: '',
                        cpf: '',
                        crm: '',
                        email:'',
                        dt_nascimento:'',
                        especialidade:'',
                        geral: '',
                        senha: ''
                    }}


                    onSubmit={(value) => {
                        console.log(value)
                        EnviarMedico(value)
                        
                    }}

                    validationSchema={validation}
                >
                    {({errors, touched, handleChange}) => (

                    
                        <Form className="medico-form">
                            <div className="form-group">
                                <label>Nome</label>
                                <Field name="nome"/>
                                { errors.nome && touched.nome ? <p>{errors.nome}</p> : ''}
                            </div>
                            <div className="form-group">
                                <label>Sobrenome</label>
                                <Field 
                                    name="sobrenome"
                                    
                                />
                                { errors.sobrenome && touched.sobrenome ? <p>{errors.sobrenome}</p> : ''}
                            </div>
                            <div className="form-group">
                                <label>Data de nascimento</label>
                                <Field 
                                    name="dt_nascimento"
                                    render={({field}) => (
                                        <InputMask 
                                            {...field}
                                            onChange={handleChange}
                                            mask="99/99/9999"
                                        />
                                    )}
                                    
                                />
                                { errors.sobrenome && touched.sobrenome ? <p>{errors.sobrenome}</p> : ''}
                            </div>
                            <div className="form-group">
                                <label>CPF</label>
                                <Field 
                                    name="cpf"
                                    render={({field}) => (
                                        <InputMask
                                            {...field}
                                            mask="999.999.999-99"
                                            onChange={handleChange}
                                        />
                                    )}
                                    
                                />
                                { errors.cpf && touched.cpf ? <p>{errors.cpf}</p> : ''}
                            </div>
                            <div className="form-group">
                                <label>CRM</label>
                                <Field name="crm"/>
                                { errors.crm && touched.cpf ? <p>{errors.crm}</p> : ''}
                            </div>
                            <div className="form-group">
                                <label>Especialidade</label>
                                <Field name="especialidade" as="select" className="input">
                                    <option value="" selected>Selecione uma especialidade</option>
                                    {
                                        especialidades.length > 0 ? especialidades.map((especialidade) => (
                                            <option value={especialidade.id_especialidade}>{especialidade.nome}</option>
                                        )) : ''
                                    }
                                </Field>
                                { errors.especialidade && touched.especialidade ? <p>{errors.especialidade}</p> : ''}
                            </div>
                            <div className="form-group">
                                <label>Clínico(a) geral</label>
                                <Field name="geral" as="select" className="input">
                                        <option value="" selected>Selecione uma opção</option>
                                        <option value={true}>Sim</option>
                                        <option value={false}>Não</option>
                                        
                                        
                                </Field>
                                { errors.geral && touched.geral ? <p>{errors.geral}</p> : ''}
                            </div>
                            <div className="form-group">
                                <label>E-mail</label>
                                <Field name="email"/>
                                { errors.email && touched.email ? <p>{errors.email}</p> : ''}
                            </div>
                            <div className="form-group">
                                <label>Senha</label>
                                <Field type="password" name="senha"/>
                                { errors.senha && touched.senha ? <p>{errors.senha}</p> : ''}
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
        </div>
    )
}