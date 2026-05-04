import React, { useContext, useEffect, useState } from 'react'
import '../../styles/pages/schoolYear/SectionStudents.css';
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import { UserContext } from '../../context/UserProvider';
import { PathInfo } from '../../components/PathInfo';

export const SectionStudents = () => {

    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const { user } = useContext(UserContext);

    useEffect(() => {
        document.title = "ISPT - Gestión de ciclos lectivos";
    }, []);

    return (
        <article className='sectionStudentsPage'>
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <div className='sectionStudentsPageContainer'>
                <PathInfo />
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    <button type="button" className="add-button"
                        onClick={() => { }}>
                        <span className="material-symbols-outlined">add_circle</span>Inscribir estudiante
                    </button>
                </div>
                <Table
                    columns={[
                        {
                            name: "Legajo",
                            width: 120
                        },
                        {
                            name: "Estudiante",
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
                    ]}
                    options={[
                        { value: "eye", onclick: () => { } }
                    ]}
                    data={[
                        {
                            legajo: "12345",
                            estudiante: "Juan Pérez",
                            estado: "Regular",
                            riesgo: "Bajo"
                        },
                        {
                            legajo: "67890",
                            estudiante: "María García",
                            estado: "Libre",
                            riesgo: "Alto"
                        },
                        {
                            legajo: "11111",
                            estudiante: "Pedro López",
                            estado: "Aprobado",
                            riesgo: "-"
                        }
                    ]}
                />
                <Footer />
            </div>
        </article>
    )
}