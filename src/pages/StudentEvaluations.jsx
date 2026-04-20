import React, { useEffect} from 'react'
import { InputControl } from '../components/InputControl';
import { Table } from '../components/Table';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import '../styles/pages/StudentEvaluations.css';
import { PathInfo } from '../components/PathInfo';

export const StudentEvaluations = () => {

    useEffect(() => {
        document.title = "ISPT - Evaluaciones del Estudiante";
    }, []);

    return (

        <article className="studentEvaluationsPage">
            <Sidebar />
            <div className="studentEvaluationsPageContainer">
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    <PathInfo/>
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
                        },
                        {
                            name: "Nota",
                            width: 80
                        }
                    ]} 
                    data={[
                        {
                            fecha: "2025-10-15",
                            tipo: "Parcial",
                            numero: 1,
                            nota: 5.5
                        },
                        {
                            fecha: "2025-10-16",
                            tipo: "Parcial",
                            numero: 2,
                            nota: 9.0
                        },
                        {
                            fecha: "2025-10-17",
                            tipo: "Recuperatorio",
                            numero: 1,
                            nota: 7.5
                        }
                    ]} />
                <Footer />
            </div>
        </article>
    );
}