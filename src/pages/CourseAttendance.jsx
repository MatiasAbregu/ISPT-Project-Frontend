import React, { useEffect, useState } from 'react'
import { InputControl } from '../components/InputControl';
import { DateControl } from '../components/DateControl';
import { Table } from '../components/Table';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import '../styles/pages/CourseAttendance.css';

export const CourseAttendance = () => {
    useEffect(() => {
        document.title = "ISPT - Asistencia de Curso";
    }, []);

    const [data, setData] = useState([
        {
            legajo: "12345",
            fecha: "2025-10-03",
            alumno: "Juan Pérez",
            asistencia: "Pendiente",
        },
        {
            legajo: "67890",
            fecha: "2025-10-03",
            alumno: "María García",
            asistencia: "Pendiente",
        },
        {
            legajo: "11111",
            fecha: "2025-10-03",
            alumno: "Pedro López",
            asistencia: "Pendiente",
        }
    ]);

    const cambiarAsistencia = (legajo, fecha, nuevoEstado) => {
        setData(prev =>
            prev.map(row =>
                row.legajo === legajo && row.fecha === fecha
                    ? { ...row, asistencia: nuevoEstado }
                    : row
            )
        );
    };

    const getAsistencia = (estado) => (
        <span className={estado.toLowerCase()}>
            {estado}
        </span>
    );

    const dataRender = data.map(row => ({
        ...row,
        asistencia: getAsistencia(row.asistencia)
    }));

    return (

        <article className="courseAttendancePage">
            <Sidebar />
            <div className="courseAttendancePageContainer">
                <div className="controls">
                    <DateControl icon={"edit_calendar"}>
                        Seleccione la fecha
                    </DateControl>
                </div>
                <Table
                    columns={[
                        {
                            name: "Legajo",
                            width: 100
                        },
                        {
                            name: "Fecha",
                            width: 120
                        },
                        {
                            name: "Alumno",
                            width: 160
                        },
                        {
                            name: "Asistencia",
                            width: 120
                        }
                    ]} options={[
                        { value: "present", onclick: (row) => cambiarAsistencia(row.legajo, row.fecha, "Presente") },
                        { value: "absent", onclick: (row) => cambiarAsistencia(row.legajo, row.fecha, "Ausente") }
                    ]}
                    data={dataRender} />
                <Footer />
            </div>
        </article>
    );
}