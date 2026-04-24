import React, { useEffect } from 'react'
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import '../../styles/pages/studentExams/ExamRegistrations.css';
import { useNavigate } from 'react-router-dom';

export const ExamRegistrations = () => {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "ISPT - Inscripciones a Examenes";
    }, []);

    const getOption = (estadoInscripcion) => {
        if (estadoInscripcion === "disponible") {
            return (
                <span
                    className="material-symbols-outlined option tableBtnLightGreen"
                    title="Inscribirse"
                    onClick={() => navigate('/inscripciones-examenes/1/fechas')}
                >
                    add
                </span>
            );
        } else if (estadoInscripcion === "inscripto") {
            return (
                <span
                    className="material-symbols-outlined option tableBtnLightGreen"
                    title="Editar inscripción"
                    onClick={() => navigate('/inscripciones-examenes/1/fechas')}
                >
                    edit
                </span>
            );
        } else if (estadoInscripcion === "cerrada") {
            return (
                <span
                    className="material-symbols-outlined"
                    title="Inscripción cerrada"
                >
                    lock
                </span>
            );
        }
    }

    return (

        <article className="examRegistrationsPage">
            <Sidebar />
            <div className="examRegistrationsPageContainer">
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
                            name: "Estado del estudiante",
                            width: 160
                        },
                        {
                            name: "Estado de inscripción",
                            width: 160
                        },
                        {
                            name: "Opciones",
                            width: 80
                        }
                    ]}
                    data={[
                        {
                            materia: "Materia 1",
                            estadoEstudiante: "Regular",
                            estadoInscripcion: <span className="registered">Inscripto | 18 Jun - 09:00hs</span>,
                            opciones: (
                                <div className="optionsContainer">
                                    {getOption("inscripto")}
                                </div>
                            )
                        },
                        {
                            materia: "Materia 2",
                            estadoEstudiante: "Regular",
                            estadoInscripcion: <span className="available">Disponible</span>,
                            opciones: (
                                <div className="optionsContainer">
                                    {getOption("disponible")}
                                </div>
                            )
                        },
                        {
                            materia: "Materia 3",
                            estadoEstudiante: "Regular",
                            estadoInscripcion: <div><span className="closed">Cerrada: fecha de <br /></span><span className="closedUnder">inscripción vencida</span></div>,
                            opciones: (
                                <div className="optionsContainer">
                                    {getOption("cerrada")}
                                </div>
                            )
                        }
                    ]} />
                <Footer />
            </div>
        </article>
    );
}