import React, { useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import '../../styles/pages/courses/CourseAttendance.css';
import { PathInfo } from '../../components/PathInfo';
import { useNavigate, useParams } from 'react-router-dom';
import TeacherCourses from '../../services/courses/TeacherCourses';
import toast from 'react-hot-toast';
import { CourseAttendanceModal } from './CourseAttendanceModal';

export const CourseAttendance = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => { document.title = "ISPT - Asistencia de Curso"; }, []);
    useEffect(() => { loadDays(); }, [id]);

    const loadDays = async () => {
        try {
            const response = await TeacherCourses.getAttendanceDays(id);
            setData(response.data.object ?? []);
        } catch (error) {
            toast.error(error.response?.data?.message ?? "No se pudieron cargar los días de asistencia.");
        }
    };

    const createAttendanceDay = async (date) => {
        try {
            const response = await TeacherCourses.createAttendanceDay(id, date);
            toast.success(response.data.message);
            await loadDays();
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message ?? "No se pudo añadir el día de asistencia.");
            return false;
        }
    };

    const deleteAttendanceDay = async (row) => {
        const dateLabel = new Intl.DateTimeFormat('es-AR').format(new Date(`${String(row.fecha).slice(0, 10)}T12:00:00`));
        if (!window.confirm(`¿Eliminar la asistencia del ${dateLabel}? Se quitarán también las marcas de todos los alumnos.`)) return;
        try {
            const response = await TeacherCourses.deleteAttendanceDay(row.id);
            toast.success(response.data.message);
            await loadDays();
        } catch (error) {
            toast.error(error.response?.data?.message ?? "No se pudo eliminar el día de asistencia.");
        }
    };

    return (
        <article className="courseAttendancePage">
            <Sidebar />
            {isModalOpen && <div className="modalBackground">
                <CourseAttendanceModal setModal={setIsModalOpen} onCreate={createAttendanceDay} />
            </div>}
            <div className="courseAttendancePageContainer">
                <PathInfo />
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    <button className="add-button" onClick={() => setIsModalOpen(true)}>Añadir día</button>
                </div>
                <Table columns={[{ name: "Fecha", width: 100 }, { name: "Asistencia Total", width: 120 }, { name: "Estado", width: 120 }]}
                    options={[
                        { value: "edit", onclick: (row) => navigate(`/cursos/${id}/asistencia/${row.id}`) },
                        { value: "delete", onclick: deleteAttendanceDay }
                    ]}
                    data={data.map(row => ({ id: row.id, fecha: row.date, asistencia: `${row.present}/${row.total}`, estado: row.state }))}
                    hiddenColumns={["id"]} />
                <Footer />
            </div>
        </article>
    );
}
