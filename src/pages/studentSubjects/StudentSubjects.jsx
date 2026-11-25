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
import EnrollmentService from '../../services/courses/EnrollmentService';
import toast from 'react-hot-toast';

const getSubjectStatusLabel = (status) => ({
    SinCursar: "Sin cursar",
    Regular: "Regular",
    Aprobado: "Promocional",
    Libre: "Libre",
    Recursando: "Recursando"
}[status] || status || "Sin datos");

export const StudentSubjects = () => {


    const [subjects, setSubjects] = useState([]);
    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();

    useEffect(() => {
        document.title = "ISPT - Mis espacios curriculares";
        const loadSubjects = async () => {
            try {
                const response = await StudentService.getMySubjects();
                const rows = response.data?.object ?? [];
                setSubjects(rows.map((row) => ({
                    fileDivisionId: row.fileDivisionId ?? row.FileDivisionId,
                    divisionId: row.divisionId ?? row.DivisionId,
                    materia: row.subject,
                    anio: row.schoolYear,
                    division: row.division,
                    promedio: row.average == null ? "Sin datos" : row.average,
                    asistencia: row.attendancePercentage == null ? "Sin datos" : `${row.attendancePercentage}%`,
                    estado: getSubjectStatusLabel(row.status ?? row.Status)
                })));
            } catch (error) {
                console.error("Error al cargar los espacios curriculares del estudiante:", error);
                setSubjects([]);
            }
        };
        loadSubjects();
    }, []);

    const navigate = useNavigate();

    const showSchedules = async (row) => {
        try {
            const response = await EnrollmentService.getSchedules([row.divisionId]);
            const schedules = response.data?.object ?? [];
            setTypeModal(<ScheduleModal setModal={setModal} schedules={schedules} />);
            setModal(true);
        } catch (error) {
            console.error("Error al cargar los horarios de la materia:", error);
            toast.error(error.response?.data?.message || "No se pudieron cargar los horarios.");
        }
    };

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
                ]} options={[{ value: "degrees", onclick: (row) => { navigate(`/mis-materias/${row.fileDivisionId}/evaluaciones`) } },
                    { value: "schedule", onclick: showSchedules },
                    { value: "finalExams", onclick: () => { setTypeModal(<StudentExamModal setModal={setModal} />); setModal(true); } },
                    { value: "attendance", onclick: (row) => { setTypeModal(<StudentAttendanceModal setModal={setModal} fileDivisionId={row.fileDivisionId} subject={row.materia} />); setModal(true); } },
                    { value: "iefi", onclick: (obj) => { navigate(`/mis-materias/${obj.divisionId}/iefi`) } }]}
                    data={subjects}
                    hiddenColumns={["fileDivisionId", "divisionId"]}/>
                <Footer />
            </div>
        </article>
    );
}
