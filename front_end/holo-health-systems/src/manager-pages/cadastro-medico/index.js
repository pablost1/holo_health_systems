import './style.css'
import DescriptionHeader from '../../sharable-components/description-header/index';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from '../../sharable-components/button/index';


const validation = Yup.object().shape({
    nome: Yup.string()
        .required('Um nome é necessário'),
    sobrenome: Yup.string()
        .required('Um sobrenome é necessário'),
    cpf: Yup.string()
        .required('Um CPF é necessário'),
    crm: Yup.string()
        .required('Um CRM é necessário'),
    tipo: Yup.string()
        .required('Um tipo de profissional é necessário'),
    senha: Yup.string()
        .required('Uma senha é necessária'),
})

 

export default function CadastroMedico() {

    return (
        <div className="cadastro-medico-container">
            <DescriptionHeader path="/home">Cadastrar médico</DescriptionHeader>
            <div className="cadastro-medico">
                <Formik
                    initialValues={{
                        nome: '',
                        sobrenome: '',
                        cpf: '',
                        crm: '',
                        tipo: '',
                        senha: ''
                    }}


                    onSubmit={(value) => {
                        console.log(value)
                    }}

                    validationSchema={validation}
                >
                    {({errors, touched}) => (

                    
                        <Form className="medico-form">
                            <div className="form-group">
                                <label>Nome</label>
                                <Field name="nome"/>
                                { errors.nome && touched.nome ? <p>{errors.nome}</p> : ''}
                            </div>
                            <div className="form-group">
                                <label>Sobrenome</label>
                                <Field name="sobrenome"/>
                                { errors.sobrenome && touched.sobrenome ? <p>{errors.sobrenome}</p> : ''}
                            </div>
                            <div className="form-group">
                                <label>CPF</label>
                                <Field name="cpf"/>
                                { errors.cpf && touched.cpf ? <p>{errors.cpf}</p> : ''}
                            </div>
                            <div className="form-group">
                                <label>CRM</label>
                                <Field name="crm"/>
                                { errors.crm && touched.cpf ? <p>{errors.crm}</p> : ''}
                            </div>
                            <div className="form-group">
                                <label>Tipo</label>
                                <Field as="select" className="input" name="tipo">
                                    <option default value=""></option> 
                                    <option value="M">Médico</option>
                                    
                                </Field>
                                { errors.tipo && touched.tipo ? <p>{errors.tipo}</p> : ''}
                            </div>
                            <div className="form-group">
                                <label>Senha</label>
                                <Field name="senha"/>
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