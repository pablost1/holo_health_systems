import './style.css'
import DescriptionHeader from '../../sharable-components/description-header/index';
import { Formik, Field, Form } from 'formik';
import * as Yup  from 'yup';




export default function VincularConsultorio() {


    return (
        <div className="vincular-consultorio-container">
            <DescriptionHeader>Vincular consultório</DescriptionHeader>
            <div className="formulario-vinculo"></div>
        </div>
    )
}