import React, { useState } from 'react'
import '../../styles/pages/studentSubjects/StudentAttendanceModal.css'
import { ComboControl } from '../../components/ComboControl'

export const StudentAttendanceModal = ({ setModal }) => {

    const [month, setMonth] = useState("Marzo");

    const attendanceData = [
        { fecha: "02/03", estado: "Presente" },
        { fecha: "04/03", estado: "Presente" },
        { fecha: "09/03", estado: "Ausente" },
        { fecha: "01/04", estado: "Presente" },
        { fecha: "03/04", estado: "Justificado" },
        { fecha: "05/04", estado: "Ausente" },
        { fecha: "01/05", estado: "Presente" },
        { fecha: "03/05", estado: "Ausente" },
        { fecha: "05/05", estado: "Justificado" }
    ];

    const monthIndex = {
        "Marzo": 3,
        "Abril": 4,
        "Mayo": 5
    };

    const data = attendanceData.filter(item => {
        const monthNumber = Number(item.fecha.split("/")[1]);
        return monthNumber === monthIndex[month];
    });

    return (
        <article className="studentAttendanceModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>
                cancel
            </span>

            <h4>Asistencia</h4>

            <div className="attendanceCard">
                <ComboControl
                    icon="calendar_month"
                    children="Seleccione un mes"
                    options={[{ value: "Marzo" }, { value: "Abril" }, { value: "Mayo" }]}
                    setOption={setMonth}
                />

                <div className="attendanceSummary">
                    <span className='spanAttendance'>Asistencia: {(attendanceData.filter(item => item.estado === "Presente").length / attendanceData.length * 100).toFixed(0)}%</span>
                    <span className='spanPresent'>Presentes: {attendanceData.filter(item => item.estado === "Presente").length}</span>
                    <span className='spanAbsent'>Ausentes: {attendanceData.filter(item => item.estado === "Ausente").length}</span>
                    <span className='spanJustified'>Justificados: {attendanceData.filter(item => item.estado === "Justificado").length}</span>
                </div>


                <ul className="attendanceList">
                    {data.map(item => (
                        <li key={item.fecha} className={item.estado.toLowerCase()}>
                            <span>{item.fecha}</span>
                            <span>: {item.estado}</span>
                        </li>
                    ))}
                </ul>

            </div>
        </article>
    );
};