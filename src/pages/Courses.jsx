import React, { useEffect, useState } from 'react'
import { InputControl } from '../components/InputControl';
import { Table } from '../components/Table';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import '../styles/pages/Courses.css';

export const Courses = () => {


    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();

    useEffect(() => {
        document.title = "ISPT - Gestión de Cursos";
    }, []);

    return (
        
        <article className="coursesPage">
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <Sidebar />
            <div className="coursesPageContainer">
            <div className="controls">
                <InputControl icon={"search"} type={"search"}></InputControl>
                <button type="button" className="add-button"
                    onClick={() => { setTypeModal(<UserAddModal setModal={setModal} typeModal={1}/>); setModal(true); }}>
                    <span className="material-symbols-outlined">add_circle</span>Añadir usuario
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
                        name: "Materia",
                        width: 120
                    },
                    {
                        name: "Año",
                        width: 100
                    },
                    {
                        name: "Condición",
                        width: 120
                    },
                    {
                        name: "Estado",
                        width: 120
                    },
                    {
                        name: "Riesgo",
                        width: 120
                    }
                ]} options={[{ value: "eye", onclick: () => { setTypeModal(<UserAddModal setModal={setModal} typeModal={2} />); setModal(true); } },
                    { value: "edit", onclick: () => { setTypeModal(<UserAddModal setModal={setModal} typeModal={3} />); setModal(true); } },
                     "delete",]}
                data={[
                    {
                        legajo: 12345678,
                        alumno: "Matias",
                        materia: "Matematica",
                        anio: 2025,
                        condicion: "Aprobado",
                        estado: "Activo",
                        riesgo: "Bajo"
                    },
                    {
                        legajo: 12345678,
                        alumno: "Maria",
                        materia: "Matematica",
                        anio: 2025,
                        condicion: "Aprobado",
                        estado: "Activo",
                        riesgo: "Bajo"
                    },
                    {
                        legajo: 12345678,
                        alumno: "Carlos",
                        materia: "Matematica",
                        anio: 2025,
                        condicion: "Aprobado",
                        estado: "Activo",
                        riesgo: "Bajo"
                    }
                ]} />
                 <Footer />
                </div>
        </article>
    );
}