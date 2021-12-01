import './style.css'
import DescriptionHeader from '../../sharable-components/description-header/index';


import  * as Yup from 'yup';
import { Formik, Form, Field } from 'formik'
import Button from '../../sharable-components/button/index';






const validation = Yup.object().shape({
    NomeConsultorio: Yup.string()
        .required('Um nome é necessário'),
    Estado: Yup.string()
        .required('Um Estado é necessário'),
    Cidade: Yup.string()
        .required('Uma cidade é necessária'),
    Bairro: Yup.string()
        .required('Um bairro é necessário'),
    Rua: Yup.string()
        .required('Uma rua é necessária'),
    Numero: Yup.string()
        .required('Um Número é necessário'),
    NumeroSalas: Yup.string()
        .required('O número de salas é necessáiro')
    
})




export default function  NovoConsultorio() {

    return (
        <div className="novo-consultorio-container">
            <DescriptionHeader>Novo consultório</DescriptionHeader>
            <Formik
                initialValues={{
                    NomeConsultorio: '',
                    Estado: '',
                    Cidade: '',
                    Bairro: '',
                    Rua: '',
                    Numero: '',
                    NumeroSalas: ''
                }}

                validationSchema={validation}

                onSubmit={(value) => {
                    alert(value.Estado)
                }}
            >
                {({errors, touched, values}) => (
                    <Form className="consultorio-form">
                        <div className="form-group">
                            <label>Nome do consultório</label>
                            <Field name="NomeConsultorio" className="input"/>
                            { errors.NomeConsultorio && touched.NomeConsultorio ? <p>{ errors.NomeConsultorio }</p> : ''}
                        </div>
                        <div className="form-group">
                            <label>Estado</label>
                            <Field name="Estado" className="input"/>
                            { errors.Estado && touched.Estado ? <p>{ errors.Estado }</p> : ''}
                        </div>
                        <div className="form-group">
                            <label>Cidade</label>
                            <Field name="Cidade"className="input"/>
                            { errors.Cidade && touched.Cidade ? <p>{ errors.Cidade }</p> : ''}
                        </div>
                        <div className="form-group">
                            <label>Bairro</label>
                            <Field name="Bairro"className="input"/>
                            { errors.Bairro && touched.Bairro ? <p>{ errors.Bairro }</p> : ''}
                        </div>
                        <div className="form-group">
                            <label>Rua</label>
                            <Field name="Rua"className="input"/>
                            { errors.Rua && touched.Bairro ? <p>{ errors.Bairro }</p> : ''}
                        </div>
                        <div className="form-group">
                            <label>Número</label>
                            <Field name="Numero" className="input"/>
                            { errors.Numero && touched.Numero ? <p>{ errors.Numero }</p> : ''}
                        </div>

                        <div className="form-group">
                            <label>Número de Salas</label>
                            <Field name="NumeroSalas"className="input"/>
                            { errors.NumeroSalas && touched.NumeroSalas ? <p>{ errors.NumeroSalas }</p> : ''}
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