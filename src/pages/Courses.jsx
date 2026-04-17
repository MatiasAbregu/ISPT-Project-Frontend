import React, { useEffect} from 'react'
import { InputControl } from '../components/InputControl';
import { Table } from '../components/Table';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import '../styles/pages/Courses.css';
import { useNavigate } from 'react-router-dom';

export const Courses = () => {
    useEffect(() => {
        document.title = "ISPT - Gestión de Cursos";
    }, []);

    const navigate = useNavigate();

    return (
        
        <article className="coursesPage">
            <Sidebar />
            <div className="coursesPageContainer">
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
                        name: "Año",
                        width: 160
                    },
                    {
                        name: "Comisión",
                        width: 120
                    }
                ]} options={[{ value: "eye", onclick: () => { navigate(`/cursos/1`) } }, { value: "degrees", onclick: () => { navigate(`/cursos/1/evaluaciones`) } }, , { value: "docs", onclick: () => { navigate(`/cursos/1/asistencia`) } }]}
                data={[
                    {
                        materia: "Materia 1",
                        anio: 2025,
                        comision: "A"
                    },
                    {
                        materia: "Materia 2",
                        anio: 2025,
                        comision: "B"
                    },
                    {
                        materia: "Materia 3",
                        anio: 2025,
                        comision: "A"
                    }
                ]} />
                 <Footer />
                </div>
        </article>
    );
}