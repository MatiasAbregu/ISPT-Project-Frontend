import React, { useEffect} from 'react'
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import '../../styles/pages/studentSubjects/StudentSubjects.css';
import { useNavigate } from 'react-router-dom';

export const StudentSubjects = () => {
    useEffect(() => {
        document.title = "ISPT - Mis Materias";
    }, []);

    const navigate = useNavigate();

    return (
        
        <article className="studentSubjectsPage">
            <Sidebar />
            <div className="studentSubjectsPageContainer">
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
                    },
                    {
                        name: "Promedio",
                        width: 120
                    },
                    {
                        name: "Estado",
                        width: 120
                    }
                ]} options={[{ value: "degrees", onclick: () => { navigate("/mis-materias/1/evaluaciones") } }]}
                data={[
                    {
                        materia: "Materia 1",
                        anio: 2025,
                        comision: "A",
                        promedio: 8,
                        estado: "Aprobada"
                    },
                    {
                        materia: "Materia 2",
                        anio: 2025,
                        comision: "B",
                        promedio: 5,
                        estado: "Libre"
                    },
                    {
                        materia: "Materia 3",
                        anio: 2025,
                        comision: "A",
                        promedio: 9,
                        estado: "Aprobada"
                    }
                ]} />
                 <Footer />
                </div>
        </article>
    );
}