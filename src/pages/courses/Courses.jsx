import React, { useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import '../../styles/pages/courses/Courses.css';
import { useNavigate } from 'react-router-dom';
import { PathInfo } from '../../components/PathInfo';
import { ScheduleModal } from '../modals/ScheduleModal';

export const Courses = () => {
    useEffect(() => {
        document.title = "ISPT - Gestión de Cursos";
    }, []);

    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();

    const navigate = useNavigate();

     const schedules = [
        {
            division: "Turno Mañana A",
            horarios: [
                { dia: "Lunes", desde: "08:00", hasta: "10:00" },
                { dia: "Miércoles", desde: "08:00", hasta: "10:00" },
            ]
        }
    ]

    return (

        <article className="coursesPage">
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <div className="coursesPageContainer">
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                </div>
                <Table
                    columns={[
                        {
                            name: "Carrera",
                            width: 100
                        },
                        {
                            name: "Materia",
                            width: 120
                        },
                        {
                            name: "Año Lectivo",
                            width: 120
                        },
                        {
                            name: "División",
                            width: 120
                        }
                    ]} options={[{ value: "eye", onclick: () => { navigate(`/cursos/1/alumnos`) } },
                    { value: "schedule", onclick: () => { setTypeModal(<ScheduleModal setModal={setModal} schedules={schedules} />); setModal(true); } },
                    { value: "exams", onclick: () => { navigate(`/cursos/1/evaluaciones`) } },
                    { value: "attendance", onclick: () => { navigate(`/cursos/1/asistencia`) } },
                    { value: "finalExams", onclick: () => { navigate(`/cursos/1/mesas-examenes`) } }]}
                    data={[
                        {
                            carrera: "Profesorado",
                            materia: "Materia 1",
                            anio: 2026,
                            comision: "Mañana - A"
                        },
                        {
                            carrera: "Profesorado",
                            materia: "Materia 2",
                            anio: 2026,
                            comision: "Mañana - B"
                        },
                        {
                            carrera: "Trayecto",
                            materia: "Materia 3",
                            anio: 2026,
                            comision: "Tarde - A"
                        }
                    ]} />
                <Footer />
            </div>
        </article>
    );
}