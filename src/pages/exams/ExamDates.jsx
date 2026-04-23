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
                            name: "Hora",
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
                    ]} options={[{ value: "exams", onclick: () => { navigate("/mesas-examen/1/notas") } }]}
                    data={[
                        {
                            materia: "Matemática",
                            fecha: "15/06/2026",
                            turno: "10:00",
                            libro: "1",
                            folio: "1"
                        },
                        {
                            materia: "Química",
                            fecha: "15/12/2026",
                            turno: "10:00",
                            libro: "2",
                            folio: "1"
                        },
                        {
                            materia: "Física",
                            fecha: "16/06/2026",
                            turno: "14:00",
                            libro: "3",
                            folio: "1"
                        },
                        {
                            materia: "Biología",
                            fecha: "16/12/2026",
                            turno: "16:00",
                            libro: "4",
                            folio: "1"
                        }
                    ]} />
                <Footer />
            </div>
        </article>
    );
}