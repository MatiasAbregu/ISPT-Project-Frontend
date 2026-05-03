import React, { useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import '../../styles/pages/studentSubjects/StudentSubjects.css';
import { useNavigate } from 'react-router-dom';
import { ScheduleModal } from '../modals/ScheduleModal';
import { StudentExamModal } from './StudentExamModal';
import { StudentAttendanceModal } from './StudentAttendanceModal';

export const StudentSubjects = () => {


    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();

    useEffect(() => {
        document.title = "ISPT - Mis Materias";
    }, []);

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

        <article className="studentSubjectsPage">
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <div className="studentSubjectsPageContainer">
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                </div>
                <Table
                    columns={[
                        {
                            name: "Espacio Curricular",
                            width: 120
                        },
                        {
                            name: "Año Lectivo",
                            width: 120
                        },
                        {
                            name: "División",
                            width: 120
                        },
                        {
                            name: "Promedio",
                            width: 120
                        },
                        {
                            name: "% Asistencia",
                            width: 120
                        },
                        {
                            name: "Estado",
                            width: 120
                        }
                    ]} options={[{ value: "degrees", onclick: () => { navigate("/mis-materias/1/evaluaciones") } },
                    { value: "schedule", onclick: () => { setTypeModal(<ScheduleModal setModal={setModal} schedules={schedules} />); setModal(true); } },
                    { value: "finalExams", onclick: () => { setTypeModal(<StudentExamModal setModal={setModal} />); setModal(true); } },
                    { value: "attendance", onclick: () => { setTypeModal(<StudentAttendanceModal setModal={setModal} />); setModal(true); } }]}
                    data={[
                        {
                            materia: "Materia 1",
                            anio: 2025,
                            division: "Mañana - A",
                            promedio: 8,
                            asistencia: 90,
                            estado: "Aprobada (Promoción)"
                        },
                        {
                            materia: "Materia 2",
                            anio: 2025,
                            division: "Tarde - A",
                            promedio: 3,
                            asistencia: 60,
                            estado: "Libre"
                        },
                        {
                            materia: "Materia 3",
                            anio: 2025,
                            division: "Tarde - B",
                            promedio: 9,
                            asistencia: 85,
                            estado: "Aprobada (Examen Final)"
                        }
                    ]} />
                <Footer />
            </div>
        </article>
    );
}