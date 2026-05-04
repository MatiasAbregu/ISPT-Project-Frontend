import React, { useContext, useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import { UserContext } from '../../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/schoolYear/SchoolYear.css';
import { SchoolYearModal } from './SchoolYearModal';

export const SchoolYear = () => {

    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const { user } = useContext(UserContext);

    useEffect(() => {
        document.title = "ISPT - Gestión de ciclos lectivos";
    }, []);

    return (
        <article className='schoolYearPage'>
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <div className='schoolYearPageContainer'>
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    <button type="button" className="add-button"
                        onClick={() => {
                            setTypeModal(<SchoolYearModal setModal={setModal} />);
                            setModal(true);
                        }}>
                        <span className="material-symbols-outlined">add_circle</span>Añadir ciclo lectivo
                    </button>
                </div>
                <Table
                    columns={[
                        {
                            name: "Carrera",
                            width: 120
                        },
                        {
                            name: "Plan de estudio",
                            width: 120
                        },
                        {
                            name: "Año lectivo",
                            width: 120
                        }
                    ]}
                    options={[
                        { value: "eye", onclick: () => { navigate(`/ciclos-lectivos/1/comisiones`) } }
                    ]}
                    data={[
                        {
                            carrera: "Profesorado",
                            plan: "Plan 2024 (Res. EE/11)",
                            anio: "2026"
                        },
                        {
                            carrera: "Trayecto",
                            plan: "Plan 2025 (Res. EE/25)",
                            anio: "2026"
                        }
                    ]}
                />
                <Footer />
            </div>
        </article>
    )
}