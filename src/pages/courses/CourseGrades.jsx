import React, { useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import '../../styles/pages/courses/CourseGrades.css';
import { PathInfo } from '../../components/PathInfo';

export const CourseGrades = () => {

    useEffect(() => {
        document.title = "ISPT - Detalle de Curso";
    }, []);

    const [data, setData] = useState([
        {
            legajo: "12345",
            alumno: "Juan Pérez",
            nota: 8
        },
        {
            legajo: "12346",
            alumno: "María García",
            nota: 9
        },
        {
            legajo: "12347",
            alumno: "Pedro López",
            nota: 7
        },
        {
            legajo: "12348",
            alumno: "Ana Martínez",
            nota: 10
        }
    ]);

    const uploadGrade = (legajo, newGrade) => {
        setData(prev =>
            prev.map(row =>
                row.legajo === legajo
                    ? { ...row, nota: newGrade }
                    : row
            )
        );
    };

    const [gradesDraft, setGradesDraft] = useState({});

    return (

        <article className="courseGradesPage">
            <Sidebar />
            <div className="courseGradesPageContainer">
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    <PathInfo />
                </div>
                <Table
                    columns={[
                        {
                            name: "Legajo",
                            width: 120
                        },
                        {
                            name: "Alumno",
                            width: 160
                        },
                        {
                            name: "Nota",
                            width: 40
                        }
                    ]} options={[{ value: "newGrade", onchange: (row, value) => { setGradesDraft(prev => ({
                        ...prev,
                        [row.legajo]: value
                    })) } },
                    { value: "save", onclick: (row) => { uploadGrade(row.legajo, gradesDraft[row.legajo]) } }
                    ]}
                    data={data} />
                <Footer />
            </div>
        </article>
    );
}