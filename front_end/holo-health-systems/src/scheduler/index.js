import React from 'react'
import './style.css'
import moment from 'moment'
import { ArrowForwardIos } from '@material-ui/icons'
import { ArrowBackIos } from '@material-ui/icons';
import axios from 'axios'
import Column from './column/index';
// import { AuthContext } from '../auth/authContext'
import {  useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import http from '../http/index';
// useContext









let days = [
    {
        id: 0,
        day: 'Segunda'
    },
    {
        id: 1,
        day: 'Terça'
    },
    {
        id: 2,
        day: 'Quarta'
    },
    {
        id: 3,
        day: 'Quinta'
    },
    {
        id: 4,
        day: 'Sexta'
    },
    {
        id: 5,
        day: 'Sábado'
    }
    
]







function Scheduler() {

    const location = useLocation()
    
    moment.locale('pt-br') 
    const [schedules, setschedules] = useState([])
    // const authContext = useContext(AuthContext)
    const [initialDate, setinitialDate] = useState(moment())
    const [showInitialDate, setShowInitialDate] = useState('')
    const [registerCounter, setRegisterCounter ] = useState(1)

    

    async function fetchData() {
        setShowInitialDate(initialDate.format('LL'))
        try { 
            const { data }  = await http.post('/gerente/reservas_especificas', {id_sala: location.state})
            setschedules(data.reservas)
        }

        catch(err) {
            console.log(err)
        }

    }


    async function addSchedule(schedule) {
        try {
            const { data } = http.post('/gerente/reserva', schedule)
            console.log(data)
        }

        catch(err) {
            console.log(err)
        }
        

    }

    function deleteSchedule(id) {
        axios.delete(`http://localhost:3001/horarios/${id}`)
            .then( res => {
                alert('Deletado com sucesso')
                fetchData()
            })
            
            .catch( err => alert(err.err))
            
    }

    function goForward() {
        initialDate.add(7, 'days')
        setinitialDate(initialDate)
        setShowInitialDate(initialDate.format('LL'))
    }

    function goBackwards() {
        initialDate.add(-7, 'days')
        setinitialDate(initialDate)
        setShowInitialDate(initialDate.format('LL'))
    }

    

    function getMonday() {
        let newDate = initialDate.format()
        let newMoment  = moment(newDate)

        while(newMoment.format('dddd') !== 'Monday') {
            newMoment.add(-1, 'days')
        }

        return newMoment.format('L')
    }

    function addSchedule(schedule) {
        setschedules([...schedules, schedule])
    }


    useEffect( () => {
        fetchData()
   
    }, [showInitialDate, initialDate, registerCounter])

    return (
        <div>
            <div className="scheduler">
                <div className="scheduler-header">
                    <ArrowBackIos onClick={goBackwards} />
                    <h1 className="scheduler-date">{ showInitialDate}</h1>

                    
                    <ArrowForwardIos onClick={goForward} style={{
                        marginLeft: '1rem'
                    }} />
                </div>
                <div className="scheduler-table">

                    {
                        days.map( (day) => (
                            <Column
                                deleteSchedule={deleteSchedule}
                                loadData={fetchData}
                                dates={schedules} 
                                day={day} 
                                currentDate={initialDate}
                                findMonday={getMonday}
                                addSchedule={addSchedule}
                                idSala={location.state}
                                fetch={fetchData}
                                setRegisterCounter={setRegisterCounter}
                                registerCounter={registerCounter}
                            />
                        ))   
                    }
                    
                    
                </div>
                
            </div>
            
        </div>
    )

    

}





export default Scheduler

