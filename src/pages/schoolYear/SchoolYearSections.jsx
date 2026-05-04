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
                        onClick={() => { }}>
                        <span className="material-symbols-outlined">add_circle</span>Añadir comisión
                    </button>
                </div>
                <Table
                    columns={[
                        {
                            name: "División",
                            width: 120
                        },
                        {
                            name: "Docente",
                            width: 120
                        },
                        {
                            name: "Cantidad de alumnos",
                            width: 120
                        }
                    ]}
                    options={[
                        { value: "eye", onclick: () => { navigate(`/ciclos-lectivos/1/espacios-curriculares/1/divisiones/1/estudiantes`) } }
                    ]}
                    data={[
                        {
                            division: "A",
                            docente: "Juan Pérez",
                            alumnos: "30"
                        },
                        {
                            division: "B",
                            docente: "María García",
                            alumnos: "25"
                        },
                        {
                            division: "C",
                            docente: "Pedro López",
                            alumnos: "28"
                        }
                    ]}
                />
                <Footer />
            </div>
        </article>
    )
}