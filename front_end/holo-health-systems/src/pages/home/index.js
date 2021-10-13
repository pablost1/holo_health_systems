import Button from '../../sharable-components/button'
import HomeHeader from '../../sharable-components/home-header'
import './style.css'

import MainContainer from '../../sharable-components/main-container'
import ScheduleButton from '../../sharable-components/schedule-button/index';
import Subtitle from '../../sharable-components/subtitle';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import Consulta from '../../sharable-components/consulta';


export default function Home() {
    return (
        <div className="home-container">
            <HomeHeader />
            <MainContainer>
                <Subtitle>O que deseja fazer?</Subtitle>
                <div className="lista-afazeres">
                    <ScheduleButton>Minhas consultas</ScheduleButton>
                    <ScheduleButton>Minhas consultas</ScheduleButton>
                    <ScheduleButton>Minhas consultas</ScheduleButton>  
                </div>
                <Subtitle>Próxima consulta</Subtitle>
                <Consulta />
                <Subtitle>Consultas anteriores</Subtitle>
                <div className="lista-consulta">
                    <Consulta />
                    <Consulta />
                    <Consulta />
                </div>
            </MainContainer>
        </div>
    )
}