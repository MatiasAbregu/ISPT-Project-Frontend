import React, { useContext, useEffect, useState } from 'react'
import '../../styles/pages/schoolYear/SchoolYearSections.css';
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import { UserContext } from '../../context/UserProvider';
import { PathInfo } from '../../components/PathInfo';
import { useNavigate } from 'react-router-dom';

export const SchoolYearSections = () => {

    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "ISPT - Gestión de ciclos lectivos";
    }, []);

    return (
        <article className='schoolYearSectionsPage'>
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <div className='schoolYearSectionsPageContainer'>
                <PathInfo />
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    <button type="button" className="add-button"
                        onClick={() => {  }}>
                        <span className="material-symbols-outlined">add_circle</span>Añadir comisión
                    </button>
                </div>
                <Table
                    columns={[
                        {
                            name: "Espacio curricular",
                            width: 120
                        },
                        {
                            name: "División",
                            width: 80
                        },
                        {
                            name: "Docente",
                            width: 120
                        },
                        {
                            name: "Cantidad de alumnos",
                            width: 80
                        }
                    ]}
                    options={[
                        { value: "eye", onclick: () => { navigate(`/ciclos-lectivos/1/comisiones/1/estudiantes`) } }
                    ]}
                    data={[
                        {
                            materia: "Matemática",
                            division: "A",
                            docente: "Juan Pérez",
                            cantidadAlumnos: 30
                        },
                        {
                            materia: "Lengua",
                            division: "B",
                            docente: "María García",
                            cantidadAlumnos: 25
                        }
                    ]}
                />
                <Footer />
            </div>
        </article>
    )
}