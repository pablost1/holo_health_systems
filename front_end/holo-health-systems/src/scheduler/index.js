import React from 'react'
import './style.css'
import moment from 'moment'
import { Add, ArrowForwardIos } from '@material-ui/icons'
import { ArrowBackIos } from '@material-ui/icons';
import axios from 'axios'
import Column from './column/index';
import Modal from '../utils/modal';
import { AuthContext } from '../auth/authContext'
import { useContext, useEffect, useState } from 'react';






moment.locale('pt-br')


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

    const [schedules, setschedules] = useState([])
    const authContext = useContext(AuthContext)
    const [initialDate, setinitialDate] = useState(moment())
    const [showInitialDate, setShowInitialDate] = useState('')

    useEffect( () => {

        async function fetchData() {
            const { data }  = await axios.get('http://localhost:3001/horarios')

            setschedules(data)
            setShowInitialDate(initialDate.format('LL'))
        }

        fetchData()

        console.log('parent mounted')
        
        
        
        
    }, [showInitialDate])


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









    return (
        <div>
            <div className="scheduler">
                <div className="scheduler-header">
                    <ArrowBackIos onClick={goBackwards} />
                    <h1 className="scheduler-date">{ showInitialDate}</h1>

                    
                    <ArrowForwardIos onClick={goForward} style={{
                        marginLeft: 'auto'
                    }} />
                </div>
                <div className="scheduler-table">

                    {
                        days.map( (day) => (
                            <Column 
                                dates={schedules} 
                                day={day} 
                                currentDate={initialDate}
                                findMonday={getMonday}
                                addSchedule={addSchedule}
                            />
                        ))   
                    }
                    
                    
                </div>
                
            </div>
            
        </div>
    )

    

}





export default Scheduler

