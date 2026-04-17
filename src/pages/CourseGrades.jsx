import React, { useEffect} from 'react'
import { InputControl } from '../components/InputControl';
import { Table } from '../components/Table';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import '../styles/pages/CourseGrades.css';

export const CourseGrades = () => {
    useEffect(() => {
        document.title = "ISPT - Detalle de Curso";
    }, []);

    return (
        
        <article className="courseGradesPage">
            <Sidebar />
            <div className="courseGradesPageContainer">
            <div className="controls">
                <InputControl icon={"search"} type={"search"}></InputControl>
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
                        name: "P1",
                        width: 40
                    },
                    {
                        name: "R1",
                        width: 40
                    },
                    {
                        name: "P2",
                        width: 40
                    },
                    {
                        name: "R2",
                        width: 40
                    },
                    {
                        name: "P3",
                        width: 40
                    },
                    {
                        name: "R3",
                        width: 40
                    },
                    {
                        name: "P4",
                        width: 40
                    },
                    {
                        name: "R4",
                        width: 40
                    },
                    {
                        name: "Promedio",
                        width: 40
                    }
                ]} options={[{ value: "docs", onclick: () => {  } }]}
                data={[
                    {
                        legajo: "123456",
                        alumno: "Juan Pérez",
                        p1: "8.5",
                        r1: "0",
                        p2: "7.5",
                        r2: "0",
                        p3: "0",
                        r3: "0",
                        p4: "0",
                        r4: "0",
                        promedio: "8.0"
                    },
                    {
                        legajo: "123457",
                        alumno: "María García",
                        p1: "7.0",
                        r1: "0",
                        p2: "6.5",
                        r2: "0",
                        p3: "0",
                        r3: "0",
                        p4: "0",
                        r4: "0",
                        promedio: "6.75"
                    },
                    {
                        legajo: "123458",
                        alumno: "Pedro López",
                        p1: "6.0",
                        r1: "0",
                        p2: "5.5",
                        r2: "0",
                        p3: "0",
                        r3: "0",
                        p4: "0",
                        r4: "0",
                        promedio: "5.75"
                    }
                ]} />
                 <Footer />
                </div>
        </article>
    );
}