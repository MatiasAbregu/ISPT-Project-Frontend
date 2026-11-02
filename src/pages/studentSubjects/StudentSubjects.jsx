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
import StudentService from '../../services/students/StudentService';

export const StudentSubjects = () => {


    const [subjects, setSubjects] = useState([]);
    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();

    useEffect(() => {
        document.title = "ISPT - Mis Materias";
        const loadSubjects = async () => {
            try {
                const response = await StudentService.getMySubjects();
                const rows = response.data?.object ?? [];
                setSubjects(rows.map((row) => ({
                    materia: row.subject,
                    anio: row.schoolYear,
                    division: row.division,
                    promedio: row.average == null ? "Sin datos" : row.average,
                    asistencia: row.attendancePercentage == null ? "Sin datos" : `${row.attendancePercentage}%`,
                    estado: "Sin datos"
                })));
            } catch (error) {
                console.error("Error al cargar los espacios curriculares del estudiante:", error);
                setSubjects([]);
            }
        };
        loadSubjects();
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
                            width: 220
                        },
                        {
                            name: "Año Lectivo",
                            width: 130
                        },
                        {
                            name: "División",
                            width: 130
                        },
                        {
                            name: "Promedio",
                            width: 130
                        },
                        {
                            name: "% Asistencia",
                            width: 130
                        },
                        {
                            name: "Estado",
                            width: 130
                        }
                    ]} options={[{ value: "degrees", onclick: () => { navigate("/mis-materias/1/evaluaciones") } },
                    { value: "schedule", onclick: () => { setTypeModal(<ScheduleModal setModal={setModal} schedules={schedules} />); setModal(true); } },
                    { value: "finalExams", onclick: () => { setTypeModal(<StudentExamModal setModal={setModal} />); setModal(true); } },
                    { value: "attendance", onclick: () => { setTypeModal(<StudentAttendanceModal setModal={setModal} />); setModal(true); } }]}
                    data={subjects} />
                <Footer />
            </div>
        </article>
    );
}
