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
                            name: "Año",
                            width: 160
                        },
                        {
                            name: "Llamado",
                            width: 160
                        },
                        {
                            name: "Turno",
                            width: 160
                        }
                    ]} options={[{ value: "degrees", onclick: () => { navigate("/cursos/1/mesas-examenes/1/notas") } }]}
                    data={[
                        {
                            materia: "Matemática",
                            año: "2026",
                            llamado: "Junio",
                            turno: "Mañana"
                        },
                        {
                            materia: "Física",
                            año: "2026",
                            llamado: "Junio",
                            turno: "Noche"
                        },
                        {
                            materia: "Química",
                            año: "2026",
                            llamado: "Diciembre",
                            turno: "Noche"
                        },
                        {
                            materia: "Biología",
                            año: "2026",
                            llamado: "Diciembre",
                            turno: "Mañana"
                        }
                    ]} />
                <Footer />
            </div>
        </article>
    );
}