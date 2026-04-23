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
                    className="material-symbols-outlined option" 
                    title="Inscribirse"
                    onClick= {() => navigate('/inscripciones-examenes/1/fechas')}
                >
                    add <p className="tooltip">Inscribirse</p>
                </span>
            );
        } else if (estadoInscripcion === "inscripto") {
            return (
                <span
                    className="material-symbols-outlined option"
                    title="Editar inscripción"
                    onClick= {() => navigate('/inscripciones-examenes/1/fechas')}
                >
                 edit <p className="tooltip">Editar inscripción</p>
                </span>
            );
        } else if (estadoInscripcion === "cerrada") {
            return (
                <span
                    className="material-symbols-outlined option"
                    title="Inscripción cerrada"
                >
                    lock
                </span>
            );
        }}

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
                                opciones: getOption("inscripto")
                            },
                            {
                                materia: "Materia 2",
                                estadoEstudiante: "Regular",
                                estadoInscripcion: <span className="available">Disponible</span>,
                                opciones: getOption("disponible")
                            },
                            {
                                materia: "Materia 3",
                                estadoEstudiante: "Regular",
                                estadoInscripcion: <div><span className="closed">Cerrada: fecha de <br /></span><span className="closedUnder">inscripción vencida</span></div>,
                                opciones: getOption("cerrada")
                            }
                        ]} />
                    <Footer />
                </div>
            </article>
        );
    }