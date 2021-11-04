import './style.css'
import moment from 'moment'
import { Add } from '@material-ui/icons';
import { useContext, useState } from 'react';
import { AuthContext } from '../../auth/authContext';
import Modal from '../../utils/modal';

import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik';
import Button from '../../sharable-components/button/index';





function Horario(props) {
    return (
        <div className="horario">
            <div className="horario__items">
                <span className="medico">{props.schedule.medico}</span>
                <span className="especialidade-horario">{props.schedule.especialidade}</span>
                <span className="especialidade-horario">{props.schedule.horario}</span>
            </div>
            
        </div>
    )
}



const validation = Yup.object().shape({
    profissional: Yup.string()
        .required('Um profissional é necessário'),
    especialidade: Yup.string()
        .required('Uma especialidade é necessária'),
    horarioInicial: Yup.string()
        .required('O horário inicial é necessário'),
    horarioFinal: Yup.string()
        .required('O horário final é necessário')
    
})




function ScheduleForm(props) {
    return ( 
        <div className={`schedule-form ${props.isOpend ? '' : 'closed'}`} >
            <div style={{
                padding: '2rem',
                backgroundColor: '#ffffff',
                color: 'black',
                borderRadius: '5px',
                minWidth: '300px'
            }}>
                <Formik
                    initialValues={{
                        data: props.thisDay,
                        profissional: '',
                        especialidade: '',
                        horarioInicial: '400',
                        horarioFinal: '320'
                    }}

                    validationSchema={validation}
                    onSubmit={ () => {
                        alert('submited')
                    }}
                >
                    {({errors, touched}) => (
                        <Form style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px'
                        }}>
                            <div className="form-group">
                                <label>Data</label>
                                <Field
                                    name="data"
                                    
                                />
                                { errors.profissional && touched.profissional ? <p>{errors.profissional}</p> : ''  }
                            </div>
                            <div className="form-group">
                                <label>Profissional</label>
                                <Field
                                    name="profissional"
                                    as="select"
                                    className="input" 
                                />
                                { errors.profissional && touched.profissional ? <p>{errors.profissional}</p> : ''  }
                            </div>
                            <div className="form-group">
                                <label>Especialidade</label>
                                <Field
                                    name="especialidade"
                                    as="select"
                                    className="input" 
                                />
                                { errors.especialidade && touched.especialidade ? <p>{errors.especialidade}</p> : ''  }
                            </div>
                            <div className="form-group">
                                <label>Horário inicial</label>
                                <Field
                                    name="horarioInicial"
                                />
                                { errors.horarioInicial && touched.horarioInicial ? <p>{errors.horarioInicial}</p> : ''  }
                        
                            </div>
                            <div className="form-group">
                                <label>Horário final</label>
                                <Field
                                    name="horarioFinal"
                                />
                                { errors.horarioFinal && touched.horarioFinal ? <p>{errors.horarioFinal}</p> : ''  }
                            </div>
                            <Button hasEvent="true" size="medium">Marcar horário</Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}


export default function Column(props) {


    const [ isOpened, setisOpened]  =  useState(false)
    const { RegisteSchedule, handleError } =   useContext(AuthContext)
    const monday = props.findMonday()
    const columnMoment = moment(monday).add(props.day.id, 'days').format('L')
    let thisDaySchedules = props.dates.filter( (schedule) => schedule.data === columnMoment )
    


    function openRegister() {
        setisOpened(true)
    }

    function closeRegister() {
        setisOpened(false)
    }

    return (
        <div className="scheduler-column">
            <span>{ moment(columnMoment).format('D') }</span>
            <div className="scheduler-column__description">
                <h3 className="day-description">{props.day.day}</h3>
                <Add className="add-button" onClick={openRegister}  />
            </div>
            
            {
                thisDaySchedules.map( (schedule) => (
                    <Horario schedule={schedule} />
                    
                ))
                
            }
            
        <ScheduleForm isOpend={isOpened}thisDay={columnMoment} />
        </div>
    )
}