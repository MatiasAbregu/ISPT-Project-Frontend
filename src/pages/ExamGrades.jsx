import React, { useEffect } from 'react'
import { InputControl } from '../components/InputControl';
import { Table } from '../components/Table';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import '../styles/pages/ExamGrades.css';
import { PathInfo } from '../components/PathInfo';

export const ExamGrades = () => {
    useEffect(() => {
        document.title = "ISPT - Notas de Exámenes";
    }, []);

    return (

        <article className="examGradesPage">
            <Sidebar />
            <div className="examGradesPageContainer">
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    <PathInfo/>
                </div>
                <Table
                                       columns={[
                        {
                            name: "Legajo",
                            width: 160
                        },
                        {
                            name: "Alumno",
                            width: 160
                        },
                        {
                            name: "Condición",
                            width: 160
                        },
                        {
                            name: "Nota Final",
                            width: 160
                        },
                        {
                            name: "Resultado",
                            width: 160
                        }
                    ]} options={[{ value: "edit", onclick: () => { } }]}
                    data={[
                        {
                            legajo: "12345",
                            alumno: "Juan Pérez",
                            condicion: "Regular",
                            notaFinal: "8",
                            resultado: "Aprobado"
                        },
                        {
                            legajo: "67890",
                            alumno: "María García",
                            condicion: "Libre",
                            notaFinal: "4",
                            resultado: "Desaprobado"
                        },
                        {
                            legajo: "11111",
                            alumno: "Pedro López",
                            condicion: "Regular",
                            notaFinal: "6",
                            resultado: "Aprobado"
                        },
                        {
                            legajo: "22222",
                            alumno: "Ana Martínez",
                            condicion: "Libre",
                            notaFinal: "-",
                            resultado: "Ausente"
                        }
                    ]} />
                <Footer />
            </div>
        </article>
    );
}