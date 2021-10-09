import Button from '../../sharable-components/button'
import HomeHeader from '../../sharable-components/home-header'
import './style.css'

import MainContainer from '../../sharable-components/main-container'
import ScheduleButton from '../../sharable-components/schedule-button/index';
import Subtitle from '../../sharable-components/subtitle';




export default function Home() {
    return (
        <div className="home-container">
            <HomeHeader />
            <MainContainer>
                <Subtitle>O que deseja fazer?</Subtitle>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '1rem', padding: '0 .7rem'}}>
                    <ScheduleButton>Minhas consultas</ScheduleButton>
                    <ScheduleButton>Minhas consultas</ScheduleButton>
                    <ScheduleButton>Minhas consultas</ScheduleButton>
                </div>
            </MainContainer>
        </div>
    )
}