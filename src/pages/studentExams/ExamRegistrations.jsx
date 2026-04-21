import React, { useEffect} from 'react'
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import '../../styles/pages/studentExams/ExamRegistrations.css';
import { useNavigate } from 'react-router-dom';

export const ExamRegistrations = () => {
    useEffect(() => {
        document.title = "ISPT - Inscripciones a Examenes";
    }, []);

    return (
        
        <article className="examRegistrationsPage">
            <Sidebar />
            <div className="examRegistrationsPageContainer">
            <div className="controls">
                <InputControl icon={"search"} type={"search"}></InputControl>
            </div>
            <Table
                columns={[
                    {
                        name: "Materia",
                        width: 120
                    },
                    {
                        name: "Fecha",
                        width: 160
                    },
                    {
                        name: "Estado",
                        width: 120
                    }
                ]} 
                data={[
                    {
                        materia: "Materia 1",
                        fecha: "2025-10-15",
                        estado: "Regular"

                    },
                    {
                        materia: "Materia 2",
                        fecha: "2025-10-16",
                        estado: "Regular"
                    },
                    {
                        materia: "Materia 3",
                        fecha: "2025-10-17",
                        estado: "Regular"
                    }
                ]} />
                 <Footer />
                </div>
        </article>
    );
}