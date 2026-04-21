import React, { useEffect } from 'react'
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import '../../styles/pages/courses/ExamDates.css';
import { PathInfo } from '../../components/PathInfo';
import { useNavigate } from 'react-router-dom';

export const ExamDates = () => {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "ISPT - Fechas de Exámenes";
    }, []);

    return (

        <article className="examDatesPage">
            <Sidebar />
            <div className="examDatesPageContainer">
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    <PathInfo/>
                </div>
                <Table
                    columns={[
                        {
                            name: "Materia",
                            width: 160
                        },
                        {
                            name: "Fecha",
                            width: 160
                        },
                        {
                            name: "Turno",
                            width: 160
                        },
                        {
                            name: "Libro",
                            width: 160
                        },
                        {
                            name: "Folio",
                            width: 160
                        }
                    ]} options={[{ value: "degrees", onclick: () => { navigate("/cursos/1/mesas-examenes/1/notas") } }]}
                    data={[
                        {
                            materia: "Matemática",
                            fecha: "2026-06-15",
                            turno: "Mañana",
                            libro: "1",
                            folio: "1"
                        },
                        {
                            materia: "Física",
                            fecha: "2026-06-16",
                            turno: "Noche",
                            libro: "2",
                            folio: "2"
                        },
                        {
                            materia: "Química",
                            fecha: "2026-12-15",
                            turno: "Noche",
                            libro: "3",
                            folio: "3"
                        },
                        {
                            materia: "Biología",
                            fecha: "2026-12-16",
                            turno: "Mañana",
                            libro: "4",
                            folio: "4"
                        }
                    ]} />
                <Footer />
            </div>
        </article>
    );
}