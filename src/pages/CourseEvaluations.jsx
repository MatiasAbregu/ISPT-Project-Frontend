import React, { useEffect } from 'react'
import { InputControl } from '../components/InputControl';
import { Table } from '../components/Table';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import '../styles/pages/CourseEvaluations.css';
import { useNavigate } from 'react-router-dom';

export const CourseEvaluations = () => {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "ISPT - Detalle de Curso";
    }, []);

    return (

        <article className="courseEvaluationsPage">
            <Sidebar />
            <div className="courseEvaluationsPageContainer">
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    <button type="button" className="add-button"
                        onClick={() => {  }}>
                        <span className="material-symbols-outlined">add_circle</span>Añadir instancia evaluativa
                    </button>
                </div>
                <Table
                    columns={[
                        {
                            name: "Fecha",
                            width: 120
                        },
                        {
                            name: "Tipo",
                            width: 160
                        },
                        {
                            name: "Número",
                            width: 40
                        }
                    ]} options={[{ value: "degrees", onclick: () => { navigate(`/cursos/1/evaluaciones/1`) } }]}
                    data={[
                        {
                            fecha: "2025-10-15",
                            tipo: "Parcial",
                            numero: 1
                        },
                        {
                            fecha: "2025-10-16",
                            tipo: "Parcial",
                            numero: 2
                        },
                        {
                            fecha: "2025-10-17",
                            tipo: "Recuperatorio",
                            numero: 1
                        },
                        {
                            fecha: "2025-10-18",
                            tipo: "Recuperatorio",
                            numero: 2
                        }
                    ]} />
                <Footer />
            </div>
        </article>
    );
}