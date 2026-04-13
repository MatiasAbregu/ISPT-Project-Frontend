import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Table } from "../components/Table";
import { InputControl } from "../components/InputControl";
import { Sidebar } from "../components/Sidebar";
import "../styles/pages/Students.css";
import { StudentAddModal } from "./modals/students/StudentAddModal";

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
                        onClick={() => { setTypeModal(<StudentAddModal setModal={setModal} />); setModal(true); }}>
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
                        ]} options={["eye", "edit", "delete"]}
                        data={[
                            {
                                legajo: "TR-2025",
                                firstname: "Felipe",
                                lastname: "Ferreyra",
                                documentType: "DNI",
                                documentNumber: 12345678
                            },
                            {
                                legajo: "TR-2026",
                                firstname: "Juan",
                                lastname: "Lopez",
                                documentType: "DNI",
                                documentNumber: 12345678
                            },
                            {
                                legajo: "PT-2023",
                                firstname: "María",
                                lastname: "Sanchez",
                                documentType: "DNI",
                                documentNumber: 12345678
                            },
                        ]} />
                </div>
                <Footer />
            </div>
        </article>
    );
}