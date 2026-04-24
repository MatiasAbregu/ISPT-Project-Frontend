import React, { useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import '../../styles/pages/attendance/Attendance.css';
import { useNavigate } from 'react-router-dom';
import { ScheduleModal } from '../modals/ScheduleModal';

export const Attendance = () => {
    useEffect(() => {
        document.title = "ISPT - Gestión de Asistencias";
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

        <article className="attendancePage">
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <div className="attendancePageContainer">
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                </div>
                <Table
                    columns={[
                        {
                            name: "Materia",
                            width: 120
                        },
                        {
                            name: "Docente",
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
                    ]} options={[{ value: "attendance", onclick: () => { navigate(`/asistencias-cursos/1/dias`) } },
                    { value: "schedule", onclick: () => { setTypeModal(<ScheduleModal setModal={setModal} schedules={schedules} />); setModal(true); } }
                    ]}
                    data={[
                        {
                            materia: "Materia 1",
                            docente: "Juan Pérez",
                            anio: 2025,
                            comision: "Mañana - A"
                        },
                        {
                            materia: "Materia 2",
                            docente: "María García",
                            anio: 2025,
                            comision: "Mañana - B"
                        },
                        {
                            materia: "Materia 3",
                            docente: "Carlos López",
                            anio: 2025,
                            comision: "Tarde - A"
                        }
                    ]} />
                <Footer />
            </div>
        </article>
    );
}