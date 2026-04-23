import React, { useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl';
import { DateControl } from '../../components/DateControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import '../../styles/pages/courses/DailyAttendance.css';
import { PathInfo } from '../../components/PathInfo';  

export const DailyAttendance = () => {
    useEffect(() => {
        document.title = "ISPT - Asistencia Diaria";
    }, []);

    const [data, setData] = useState([
        {
            legajo: "12345",
            alumno: "Juan Pérez",
            asistencia: "Pendiente",
        },
        {
            legajo: "67890",
            alumno: "María García",
            asistencia: "Pendiente",
        },
        {
            legajo: "11111",
            alumno: "Pedro López",
            asistencia: "Pendiente",
        }
    ]);

    const cambiarAsistencia = (legajo, nuevoEstado) => {
        setData(prev =>
            prev.map(row =>
                row.legajo === legajo
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

    const marcarFeriado = () => {
    setData(prev =>
        prev.map(row => ({
            ...row,
            asistencia: "Justificado"
        }))
    );
};

    const dataRender = data.map(row => ({
        ...row,
        asistencia: getAsistencia(row.asistencia)
    }));

    return (

        <article className="dailyAttendancePage">
            <Sidebar />
            <div className="dailyAttendancePageContainer">
                <PathInfo />
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    <button className="add-button" onClick={marcarFeriado}>
                        Marcar día como feriado
                    </button>
                </div>
                <Table
                    columns={[
                        {
                            name: "Legajo",
                            width: 100
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
                        { value: "present", onclick: (row) => cambiarAsistencia(row.legajo, "Presente") },
                        { value: "absent", onclick: (row) => cambiarAsistencia(row.legajo, "Ausente") },
                        { value: "justified", onclick: (row) => cambiarAsistencia(row.legajo, "Justificado") }
                    ]}
                    data={dataRender} />
                <Footer />
            </div>
        </article>
    );
}