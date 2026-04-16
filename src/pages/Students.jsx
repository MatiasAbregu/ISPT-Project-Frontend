import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Table } from "../components/Table";
import { InputControl } from "../components/InputControl";
import { Sidebar } from "../components/Sidebar";
import "../styles/pages/Students.css";
import { StudentModal } from "./modals/students/StudentModal";
import { DocsModal } from "./modals/students/DocsModal";
import { DegreesModal } from "./modals/teach-stud/DegreesModal";

export const Students = () => {

    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();

    useEffect(() => {
        document.title = "ISPT - Gestión de estudiantes";
    }, []);

    return (
        <article className="studentsPage">
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <Sidebar />
            <div className="studentsPageContainer">
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    <button type="button" className="add-button"
                        onClick={() => { setTypeModal(<StudentModal setModal={setModal} typeModal={1} />); setModal(true); }}>
                        <span className="material-symbols-outlined">add_circle</span>Añadir estudiante
                    </button>
                </div>
                <div className="tableContainer">
                    <Table
                        columns={[
                            {
                                name: "Legajo",
                                width: 50
                            },
                            {
                                name: "Nombre",
                                width: 100
                            },
                            {
                                name: "Apellido",
                                width: 100
                            },
                            {
                                name: "Tipo de documento",
                                width: 80
                            },
                            {
                                name: "N° de documento",
                                width: 80
                            }
                        ]}
                        options={[{ value: "eye", onclick: () => { setTypeModal(<StudentModal setModal={setModal} typeModal={2} />); setModal(true); } },
                        { value: "docs", onclick: () => { setTypeModal(<DocsModal setModal={setModal} />); setModal(true); } },
                        { value: "degrees", onclick: () => { setTypeModal(<DegreesModal setModal={setModal} />); setModal(true); } },
                        { value: "edit", onclick: () => { setTypeModal(<StudentModal setModal={setModal} typeModal={3} />); setModal(true); } }, "delete"]}
                        data={[
                            {
                                legajo: "TR-2025",
                                firstname: "Felipe",
                                lastname: "Ferreyra",
                                documentType: "DNI",
                                documentNumber: 12345671
                            },
                            {
                                legajo: "TR-2026",
                                firstname: "Juan",
                                lastname: "Lopez",
                                documentType: "DNI",
                                documentNumber: 12345672
                            },
                            {
                                legajo: "PT-2023",
                                firstname: "María",
                                lastname: "Sanchez",
                                documentType: "DNI",
                                documentNumber: 12345673
                            },
                        ]} />
                </div>
                <Footer />
            </div>
        </article>
    );
}