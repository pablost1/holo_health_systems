import './style.css'
import moment from 'moment'
import * as Yup from 'yup'
import { Add, Delete } from '@material-ui/icons';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Button from '../../sharable-components/button/index';
import axios from 'axios'
import TimePicker from 'react-time-picker'







function Horario(props) {
    return (
        <div className="horario">
            <div className="horario__items">
                <span className="medico">{props.schedule.profissional}</span>
                <span className="especialidade-horario">{props.schedule.especialidade}</span>
                <span className="especialidade-horario">{props.schedule.horarioInicial} - {props.schedule.horarioFinal}</span>
                <Delete
                    style={{
                        
                        alignSelf: 'flex-end',
                        marginRight: '10px',
                        color: 'red'
                    }}
                    onClick={() => props.deleteSchedule(props.schedule.id)}
                />
                
            </div>
            
        </div>
    )
}



const validation = Yup.object().shape({
    profissional: Yup.string(),
        // .required('Um profissional é necessário'),
    especialidade: Yup.string(),
        // .required('Uma especialidade é necessária'),
    horarioInicial: Yup.string()
        .required('O horário inicial é necessário'),
    horarioFinal: Yup.string()
        .required('O horário final é necessário')
    
})




function ScheduleForm(props) {

    const [ initialTime, setInitialTime] = useState('00:00')
    const [ finalTime, setFinalTime] = useState('00:00')
    

    return ( 
        <div className={`schedule-form`} >
            
            <div style={{
                padding: '2rem',
                backgroundColor: '#ffffff',
                color: 'black',
                borderRadius: '5px',
                minWidth: '300px'
            }}>
                <Button size="small" hasEvent={true} readonly={true} onClick={props.close}>fechar</Button>
                <Formik
                    initialValues={{
                        data: props.thisDay,
                        profissional: 'Maria José',
                        especialidade: 'Proctologia',
                        horarioInicial: initialTime,
                        horarioFinal: finalTime
                    }}

                    validationSchema={validation}
                    onSubmit={ (value) => {
                        
                        const moment = moment()

                        moment(value.horario)

                        value.horarioInicial = initialTime
                        value.horarioFinal = finalTime
                        

                        

                        axios.post('http://localhost:3001/horarios', value)
                            .then( res => {
                                alert(res.statusText)
                                props.close()
                                props.loadData()
                            })
                        
                        
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
                                    readOnly
                                />
                                { errors.profissional && touched.profissional ? <p>{errors.profissional}</p> : ''  }
                            </div>
                            <label>Início</label>
                            <TimePicker
                                className="time-picker"
                                onChange={setInitialTime}
                                value={initialTime}

                            />
                            <label>Fim</label>
                            <TimePicker
                                className="time-picker"
                                onChange={setFinalTime}
                                value={finalTime}

                            />
                            <div className="form-group">
                                <label>Profissional</label>
                                <Field
                                    name="profissional"
                                    as="select"
                                    className="input" 
                                >
                                    <option value="otorrino">Otorrino</option>
                                </Field>
                                
                                { errors.profissional && touched.profissional ? <p>{errors.profissional}</p> : ''  }
                            </div>
                            <div className="form-group">
                                <label>Especialidade</label>
                                <Field
                                    name="especialidade"
                                    as="select"
                                    className="input" 
                                >
                                    <option value="otorrino">Otorrino</option>
                                </Field>
                                
                                { errors.especialidade && touched.especialidade ? <p>{errors.especialidade}</p> : ''  }
                            </div>
                            {/* <div className="form-group">
                                <label>Horário inicial</label>
                                <Field
                                    name="horarioInicial"
                                />
                                { errors.horarioInicial && touched.horarioInicial ? <p>{errors.horarioInicial}</p> : ''  }
                        
                            </div> */}
                            { errors.horarioFinal && touched.horarioFinal ? <p>{errors.horarioFinal}</p> : ''  }
                            {/* <div className="form-group">
                                <label>Horário final</label>
                                <Field
                                    name="horarioFinal"
                                />
                                
                            </div> */}
                            <Button size="medium">Marcar horário</Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}


export default function Column(props) {
    // const [monday, setmonday] = useState('')

    // useEffect(() => {
    //     setmonday(props.findMonday())
    // }, [props.findMonday()])

    const [ isOpened, setisOpened]  =  useState(false)
    let monday
    let columnMoment
    let thisDaySchedules
    // const { RegisteSchedule, handleError } =   useContext(AuthContext)  
        
    monday = props.findMonday()
    columnMoment = moment(monday).add(props.day.id, 'days').format('L')
    thisDaySchedules = props.dates.filter( (schedule) => schedule.data === columnMoment )
    

    
    function openRegister() {
        setisOpened(true)
    }

    function closeRegister() {
        setisOpened(false)
    }

    return (
        <div className="scheduler-column">
            
            <div className="scheduler-column__description">
                <span>{ moment(columnMoment).format('D') }</span>
                <h3 className="day-description">{props.day.day}</h3>
                <Add className="add-button" onClick={openRegister}  />
            </div>
            <div className="scheduler-column__schedules">
                {
                    thisDaySchedules.map( (schedule) => (
                        <Horario
                            schedule={schedule}
                            key={schedule.id} 
                            deleteSchedule={props.deleteSchedule}
                            loadData={props.loadData}
                        />
                        
                    ))
                    
                }
            </div>
            
        {
            isOpened ? (
                <ScheduleForm
                    
                    loadData={props.loadData}
                    close={closeRegister}
                    isOpend={isOpened}
                    thisDay={columnMoment}
                    toSchedule={props.addSchedule}
                    
                />
            )
            :
            
            ''
        }
        



        </div>
    )
}