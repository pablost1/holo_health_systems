import './style.css'
import moment from 'moment'
import * as Yup from 'yup'
import { Add, Delete } from '@material-ui/icons';
import { useState, useEffect, useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import Button from '../../sharable-components/button/index';
import axios from 'axios'
import TimePicker from 'react-time-picker'
import http from '../../http/index';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';





function Horario(props) { 

    const { handleError } = useContext(AuthContext)

    
    const { setRegisterCounter, registerCounter, schedule } = props

    async function ApagarReserva() {
        console.log(props.schedule.id_reserva)
        try {
            const { data } = await http.delete('/gerente/deletar_reserva', { data: { id_reserva:  props.schedule.id_reserva}})
            setRegisterCounter(registerCounter+1)
            handleError(data.mensagem)

        }

        catch(err) {
            handleError(err.response.data.mensagem)
        }
    }

    const horaInicial = moment(schedule.hor_ini, 'HH:mm:ss').format('HH:mm')
    const horaFinal = moment(schedule.hor_fin, 'HH:mm:ss').format('HH:mm')

    return (
        <div className="horario">
            <div className="horario__items">
                <span className="medico">{props.schedule.nome_medico} {props.schedule.sobrenome_medico}</span>
                <span className="especialidade-horario">{props.schedule.especialidade}</span>
                <span className="especialidade-horario">{horaInicial} - {horaFinal}</span>
                <Delete
                    style={{
                        
                        alignSelf: 'flex-end',
                        marginRight: '10px',
                        color: 'red',
                        cursor: 'pointer'
                    }}

                    onClick={() => ApagarReserva()}
                    
                />
                
            </div>
            
        </div>
    )
}



const validation = Yup.object().shape({
    id_medico: Yup.string()
        .required('Selecione um profissional'),
    data: Yup.string()
        .required('Uma especialidade é necessária'),
    hor_ini: Yup.string()
        .required('O horário inicial é necessário'),
    hor_fin: Yup.string()
        .required('O horário final é necessário'),
    especialidade: Yup.string()
        .required('É necessário uma especialidade')
    
})




function ScheduleForm(props) {

    const { registerCounter, setRegisterCounter } = props
    
    const { handleError } = useContext(AuthContext)
    const location = useLocation()
    

    const [ initialTime, setInitialTime] = useState('00:00')
    const [ finalTime, setFinalTime] = useState('00:00')
    const [ medicos, setMedicos] = useState([])
    const [ especialidades, setEspecialidades] = useState([])


    async function CarregarEspecialidades() {
        try {
            const { data } = await http.get('/especialidade')
            setEspecialidades(data.Especialidades)
        }

        catch(err) {
            console.log(err)
        }
    }

    async function CarregarMedicos(id) {

        try {
            const { data } = await http.post('/gerente/medicos_consultorio_especialidade', {id_especialidade: id})
            setMedicos(data.medicos)
            

        }

        catch(err) {
            console.log(err)
        }
    }

    async function CadastrarReserva(reserva) {

        const novaReserva = {...reserva, data: moment(reserva.data, 'MM/DD/YYYY').format('YYYY-MM-DD')}
        
        try {
            const { data } =  await http.post('/gerente/nova_reserva', novaReserva)
            handleError(data.mensagem)
            setRegisterCounter(registerCounter + 1)
        }

        catch(err) {
            handleError(err.response.data.mensagem)
        }
    }

    async function ApagarReserva() {


    }


    useEffect(() => {
        CarregarEspecialidades()
    }, [])
    

    return ( 
        <div className={`schedule-form`} >
            
            <div className="scheduler-form-inner-container">
                <Button size="small" hasEvent={true} readonly={true} onClick={props.close}>fechar</Button>
                <Formik
                    initialValues={{
                        data: props.thisDay,
                        hor_ini: initialTime,
                        hor_fin: finalTime,
                        id_sala: location.state,
                        id_medico: '',
                        especialidade: ''
                    }}

                    validationSchema={validation}
                    onSubmit={ (value) => {
                        
                        

                        value.hor_ini = initialTime
                        value.hor_fin = finalTime
                        

                        CadastrarReserva(value)

                        
                        
                    }}
                >
                    {({errors, touched, values, handleChange, setFieldValue}) => (
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
                                <label>Especialidade</label>
                                <Field
                                    name="especialidade"
                                    as="select"
                                    className="input"
                                    onChange={ (e) => {
                                        handleChange(e)


                                        if(e.target.value !== '') {

                                            const idEmInteiro = parseInt(e.target.value)
                                            CarregarMedicos(idEmInteiro)
                                        }

                                        else {
                                            setFieldValue('id_medico', '')
                                        }

                                        
                                    }}
                                    

                                >
                                    <option value="" selected>Selecione uma especialidade</option>
                                    {
                                        especialidades.length > 0 ? especialidades.map( (especialidade) => (
                                            <option
                                                key={especialidade.id_especialidade}
                                                value={especialidade.id_especialidade}
                                            >
                                                {especialidade.nome}
                                            </option>
                                        )) : ''
                                    }
                                </Field>
                                
                                { errors.especialidade && touched.especialidade ? <p>{errors.especialidade}</p> : ''  }
                            </div>

                            {
                                values.especialidade ?  (<div className="form-group">
                                    <label>Profissional</label>
                                    <Field
                                        name="id_medico"
                                        as="select"
                                        className="input" 
                                    >
                                        <option value="">Selecione um médico</option>
                                        {
                                            medicos.length > 0 ? medicos.map( (medico, index) => (
                                                <option value={medico.crm} key={index} >{`${medico.nome} ${medico.sobrenome}`}</option>
                                            )) : ''
                                        }
                                    </Field>
                                    
                                    { errors.profissional && touched.profissional ? <p>{errors.profissional}</p> : ''  }
                                </div>) : ''
                            }
                            
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
    // ''YYYY-MM-DDTHH:mm:ss.SSSZ''
    // console.log(`A data é${moment('2021-12-06T03:00:00.000Z', 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('MM/DD/YYYY')}`)
    const [ isOpened, setisOpened]  =  useState(false)
    let monday
    let columnMoment
    let thisDaySchedules
    // const { RegisteSchedule, handleError } =   useContext(AuthContext)  
        
    monday = props.findMonday()
    columnMoment = moment(monday).add(props.day.id, 'days').format('L')
    
    thisDaySchedules = props.dates.filter( (schedule) => {
        
        return moment(schedule.data, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('MM/DD/YYYY') === columnMoment
    })
    

    
    function openRegister() {
        setisOpened(true)
    }

    function closeRegister() {
        setisOpened(false)
    }

    useEffect(() => {
    }, [])

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
                            idSala={props.idSala}
                            setRegisterCounter={props.setRegisterCounter}
                            registerCounter={props.registerCounter}
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
                    fetchData={props.fetch}
                    setRegisterCounter={props.setRegisterCounter}
                    registerCounter={props.registerCounter}
                    
                />
            )
            :
            
            ''
        }
        



        </div>
    )
}