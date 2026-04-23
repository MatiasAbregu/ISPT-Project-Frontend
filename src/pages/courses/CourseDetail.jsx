import React, { useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import '../../styles/pages/courses/CourseDetail.css';
import { PathInfo } from '../../components/PathInfo';
import { ContactModal } from '../modals/ContactModal';
import { ObservationModal } from '../modals/ObservationModal';

export const CourseDetail = () => {

    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();

    useEffect(() => {
        document.title = "ISPT - Detalle de Curso";
    }, []);

    return (
        
        <article className="courseDetailPage">
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <Sidebar />
            <div className="courseDetailPageContainer">
                <PathInfo/>
            <div className="controls">
                <InputControl icon={"search"} type={"search"}></InputControl>
            </div>
            <Table
                columns={[
                    {
                        name: "Legajo",
                        width: 120
                    },
                    {
                        name: "Alumno",
                        width: 160
                    },
                    {
                        name: "Estado",
                        width: 120
                    },
                    {
                        name: "Riesgo",
                        width: 120
                    },
                    {
                        name: "% Asistencia",
                        width: 120
                    },
                    {
                        name: "Promedio",
                        width: 120
                    }
                ]} options={[{ value: "docs", onclick: () => { setTypeModal(<ObservationModal setModal={setModal} />); setModal(true); } },
                      { value: "contact", onclick: () => { setTypeModal(<ContactModal setModal={setModal} />); setModal(true); } }
                ]}
                data={[
                    {
                        legajo: "123456",
                        alumno: "Juan Pérez",
                        estado: "Promocional",
                        riesgo: "Bajo",
                        asistencia: "85%",
                        promedio: "8.5"
                    },
                    {
                        legajo: "123457",
                        alumno: "María García",
                        estado: "Regular",
                        riesgo: "Medio",
                        asistencia: "75%",
                        promedio: "6.5"
                    },
                    {
                        legajo: "123458",
                        alumno: "Pedro López",
                        estado: "Libre",
                        riesgo: "Alto",
                        asistencia: "65%",
                        promedio: "3"
                    }
                ]} />
                 <Footer />
                </div>
        </article>
    );
}