import React, { useEffect, useState } from 'react'
import '../../styles/pages/enrollments/EnrollmentSubjects.css'
import { Sidebar } from '../../components/Sidebar'
import { Footer } from '../../components/Footer'
import { Table } from '../../components/Table'
import { CorrelativesModal } from './CorrelativesModal'
import { ScheduleModal } from '../modals/ScheduleModal'
import { ComboControl } from '../../components/ComboControl'



export const EnrollmentSubjects = () => {

    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();

    const getComision = (estado) => {
        if (estado === "no_disponible" || estado === "aprobada") {
            return (
                <span
                    className="material-symbols-outlined disabledDropdown"
                    title="No es posible inscribirse"
                >
                    lock
                </span>
            );
        }

        return (
            <ComboControl icon={"groups"}
                options={[{ value: "Turno Mañana A" }, { value: "Turno Mañana B" },
                { value: "Turno Tarde A" }, { value: "Turno Tarde B" }, { value: "No Inscribirse" }]}>
                Seleccione la división a inscribirse
            </ComboControl>
        );
    };

    const schedules = [
        {
            division: "Turno Mañana A",
            horarios: [
                { dia: "Lunes", desde: "08:00", hasta: "10:00" },
                { dia: "Miércoles", desde: "08:00", hasta: "10:00" },
            ]
        },
        {
            division: "Turno Mañana B",
            horarios: [
                { dia: "Martes", desde: "08:00", hasta: "10:00" },
                { dia: "Jueves", desde: "08:00", hasta: "10:00" },
            ]
        },
        {
            division: "Turno Tarde A",
            horarios: [
                { dia: "Lunes", desde: "18:00", hasta: "20:00" },
                { dia: "Miércoles", desde: "18:00", hasta: "20:00" }
            ]
        },
        {
            division: "Turno Tarde B",
            horarios: [
                { dia: "Martes", desde: "18:00", hasta: "20:00" },
                { dia: "Jueves", desde: "18:00", hasta: "20:00" }
            ]
        }
    ];

    return (
        <div className='enrollmentSubjectsPage'>
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <div className='enrollmentSubjectsPageContainer'>
                <h2>Seleccione una división por espacio curricular</h2>
                <div className='mainContent'>
                    <h3>Primer Año</h3>

                    <Table
                        columns={[
                            {
                                name: "Espacio Curricular",
                                width: 160
                            },
                            {
                                name: "Estado",
                                width: 180
                            },
                            {
                                name: "División",
                                width: 200
                            }
                        ]} options={[{ value: "schedule", onclick: () => { setTypeModal(<ScheduleModal setModal={setModal} schedules={schedules} />); setModal(true); } }]}
                        data={[
                            {
                                materia: "Materia 1",
                                estado: <span className="available">Disponible</span>,
                                comision: getComision("disponible")
                            },
                            {
                                materia: "Materia 2",
                                estado: <span className="available">Disponible</span>,
                                comision: getComision("disponible")
                            },
                            {
                                materia: "Materia 3",
                                estado: <span className="approved">Aprobada</span>,
                                comision: getComision("aprobada")
                            }
                        ]} />
                    <h3>Segundo Año</h3>
                    <Table
                        columns={[
                            {
                                name: "Espacio Curricular",
                                width: 160
                            },
                            {
                                name: "Estado",
                                width: 180
                            },
                            {
                                name: "División",
                                width: 200
                            }
                        ]} options={[{ value: "schedule", onclick: () => { setTypeModal(<ScheduleModal setModal={setModal} schedules={schedules} />); setModal(true); } }]}
                        data={[
                            {
                                materia: "Materia 4",
                                estado: <span className="not-available">No Disponible (Faltan <span className="warning"
                                    onClick={() => { setTypeModal(<CorrelativesModal setModal={setModal} />); setModal(true); }}
                                >Correlativas</span>)</span>,
                                comision: getComision("no_disponible")
                            },
                            {
                                materia: "Materia 5",
                                estado: <span className="not-available">No Disponible (Faltan <span className="warning"
                                    onClick={() => { setTypeModal(<CorrelativesModal setModal={setModal} />); setModal(true); }}
                                >Correlativas</span>)</span>,
                                comision: getComision("no_disponible")
                            },
                            {
                                materia: "Materia 6",
                                estado: <span className="available">Disponible</span>,
                                comision: getComision("disponible")
                            }
                        ]} />
                    <h3>Tercer Año</h3>
                    <Table
                        columns={[
                            {
                                name: "Espacio Curricular",
                                width: 160
                            },
                            {
                                name: "Estado",
                                width: 180
                            },
                            {
                                name: "División",
                                width: 200
                            }
                        ]} options={[{ value: "schedule", onclick: () => { setTypeModal(<ScheduleModal setModal={setModal} schedules={schedules} />); setModal(true); } }]}
                        data={[
                            {
                                materia: "Materia 7",
                                estado: <span className="not-available">No Disponible (Faltan <span className="warning"
                                    onClick={() => { setTypeModal(<CorrelativesModal setModal={setModal} />); setModal(true); }}
                                >Correlativas</span>)</span>,
                                comision: getComision("no_disponible")
                            },
                            {
                                materia: "Materia 8",
                                estado: <span className="not-available">No Disponible (Faltan <span className="warning"
                                    onClick={() => { setTypeModal(<CorrelativesModal setModal={setModal} />); setModal(true); }}
                                >Correlativas</span>)</span>,
                                comision: getComision("no_disponible")
                            },
                            {
                                materia: "Materia 9",
                                estado: <span className="not-available">No Disponible (Faltan <span className="warning"
                                    onClick={() => { setTypeModal(<CorrelativesModal setModal={setModal} />); setModal(true); }}
                                >Correlativas</span>)</span>,
                                comision: getComision("no_disponible")
                            }
                        ]} />
                    <button type="button" className="add-button"
                        onClick={() => { }}>
                        Confirmar Inscripción
                    </button>
                </div>
                <Footer />
            </div>
        </div>
    )
}
