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

    const [gradesDraft, setGradesDraft] = useState({});

    return (

        <article className="courseGradesPage">
            <Sidebar />
            <div className="courseGradesPageContainer">
                <PathInfo />
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    <button type="button" className="add-button"
                        onClick={() => { }}>
                        <span className="material-symbols-outlined">save</span>Guardar cambios
                    </button>
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
                    ]} options={[{ value: "newGrade" }]}
                    data={data} />
                <Footer />
            </div>
        </article>
    );
}