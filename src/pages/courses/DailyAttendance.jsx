import React, { useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import '../../styles/pages/courses/DailyAttendance.css';
import { PathInfo } from '../../components/PathInfo';
import { useParams } from 'react-router-dom';
import TeacherCourses from '../../services/courses/TeacherCourses';
import toast from 'react-hot-toast';

export const DailyAttendance = () => {
    const { fecha } = useParams();
    const [data, setData] = useState([]);
    useEffect(() => { document.title = "ISPT - Asistencia Diaria"; }, []);
    useEffect(() => { loadAttendance(); }, [fecha]);

    const loadAttendance = async () => {
        try {
            const response = await TeacherCourses.getDailyAttendance(fecha);
            setData(response.data.object ?? []);
        } catch (error) {
            toast.error(error.response?.data?.message ?? "No se pudo cargar la asistencia diaria.");
        }
    };

    const changeStatus = async (row, status) => {
        try {
            await TeacherCourses.updateDailyAttendance(fecha, [{ fileDivisionId: row.fileDivisionId, status }]);
            setData(prev => prev.map(item => item.fileDivisionId === row.fileDivisionId ? { ...item, status } : item));
        } catch (error) {
            toast.error(error.response?.data?.message ?? "No se pudo guardar la asistencia.");
        }
    };

    const markHoliday = async () => {
        try {
            await TeacherCourses.updateDailyAttendance(fecha, data.map(row => ({ fileDivisionId: row.fileDivisionId, status: "Justificado" })));
            setData(prev => prev.map(row => ({ ...row, status: "Justificado" })));
            toast.success("Día marcado como feriado.");
        } catch (error) {
            toast.error(error.response?.data?.message ?? "No se pudo marcar el día como feriado.");
        }
    };

    const renderStatus = status => <span className={status.toLowerCase()}>{status}</span>;
    return (
        <article className="dailyAttendancePage">
            <Sidebar />
            <div className="dailyAttendancePageContainer">
                <PathInfo />
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    <button className="add-button" onClick={markHoliday}>Marcar día como feriado</button>
                </div>
                <Table columns={[{ name: "Legajo", width: 100 }, { name: "Alumno", width: 160 }, { name: "Asistencia", width: 120 }]}
                    options={[
                        { value: "present", onclick: row => changeStatus(row, "Presente") },
                        { value: "absent", onclick: row => changeStatus(row, "Ausente") },
                        { value: "justified", onclick: row => changeStatus(row, "Justificado") }
                    ]}
                    data={data.map(row => ({ ...row, legajo: row.fileCode, alumno: row.studentName, asistencia: renderStatus(row.status) }))}
                    hiddenColumns={["fileDivisionId", "fileCode", "studentName", "status"]} />
                <Footer />
            </div>
        </article>
    );
}
