import React, { useEffect} from 'react'
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import '../../styles/pages/courses/Courses.css';
import { useNavigate } from 'react-router-dom';
import { PathInfo } from '../../components/PathInfo';

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
                        name: "Año Lectivo",
                        width: 120
                    },
                    {
                        name: "División",
                        width: 120
                    }
                ]} options={[{ value: "eye", onclick: () => { navigate(`/cursos/1/alumnos`) } }, 
                    { value: "degrees", onclick: () => { navigate(`/cursos/1/evaluaciones`) } }, 
                    { value: "docs", onclick: () => { navigate(`/cursos/1/asistencia`) } },
                    { value: "tables", onclick: () => { navigate(`/cursos/1/mesas-examenes`) } }]}
                data={[
                    {
                        materia: "Materia 1",
                        anio: 2025,
                        comision: "Mañana - A"
                    },
                    {
                        materia: "Materia 2",
                        anio: 2025,
                        comision: "Mañana - B"
                    },
                    {
                        materia: "Materia 3",
                        anio: 2025,
                        comision: "Tarde - A"
                    }
                ]} />
                 <Footer />
                </div>
        </article>
    );
}