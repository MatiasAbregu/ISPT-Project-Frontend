import React, { useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import '../../styles/pages/courses/ExamGrades.css';
import { PathInfo } from '../../components/PathInfo';

export const ExamGrades = () => {
    useEffect(() => {
        document.title = "ISPT - Notas de Exámenes";
    }, []);

    const [gradesDraft, setGradesDraft] = useState({});

     const [data, setData] = useState([
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
                    ]);
    
        const uploadGrade = (legajo, newGrade) => {
            setData(prev =>
                prev.map(row =>
                    row.legajo === legajo
                        ? { ...row, 
                            notaFinal: newGrade,
                            resultado: newGrade >= 4 ? "Aprobado" : "Desaprobado" }
                        : row
                )
            );
        };

    return (

        <article className="examGradesPage">
            <Sidebar />
            <div className="examGradesPageContainer">
                <PathInfo />
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
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
                    ]} options={[{
                        value: "newGrade", onchange: (row, value) => {
                            setGradesDraft(prev => ({
                                ...prev,
                                [row.legajo]: value
                            }))
                        }
                    },
                    { value: "save", onclick: (row) => { uploadGrade(row.legajo, gradesDraft[row.legajo]) } }
                    ]}
                    data={data} />
                <Footer />
            </div>
        </article>
    );
}