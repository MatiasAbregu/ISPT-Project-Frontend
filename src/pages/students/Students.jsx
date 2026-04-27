import React, { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { Table } from "../../components/Table";
import { InputControl } from "../../components/InputControl";
import { Sidebar } from "../../components/Sidebar";
import "../../styles/pages/students/Students.css";
import { StudentModal } from "./StudentModal";
import { DocsModal } from "../modals/DocsModal";
import { DegreesModal } from "../modals/DegreesModal";
import { ContactModal } from "../modals/ContactModal";
import { UbicationModal } from "../modals/UbicationModal";
import { ObservationModal } from "../modals/ObservationModal";

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
                    <button type="button" className="add-button-student"
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
                                name: "Apellido",
                                width: 100
                            },
                            {
                                name: "Nombre",
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
                        options={[
                            { value: "eye", onclick: () => { setTypeModal(<StudentModal setModal={setModal} typeModal={2} />); setModal(true); } },
                            { value: "docs", onclick: () => { setTypeModal(<DocsModal setModal={setModal} />); setModal(true); } },
                            { value: "degrees", onclick: () => { setTypeModal(<DegreesModal setModal={setModal} />); setModal(true); } },
                            { value: "contact", onclick: () => { setTypeModal(<ContactModal setModal={setModal} />); setModal(true); } },
                            { value: "ubication", onclick: () => { setTypeModal(<UbicationModal setModal={setModal} />); setModal(true); } },
                            { value: "observation", onclick: () => { setTypeModal(<ObservationModal setModal={setModal} />); setModal(true); } },
                            { value: "edit", onclick: () => { setTypeModal(<StudentModal setModal={setModal} typeModal={3} />); setModal(true); } },
                            "delete"]}
                        data={[
                            {
                                legajo: "TR-2025",
                                lastname: "Ferreyra",
                                firstname: "Felipe",
                                documentType: "DNI",
                                documentNumber: 12345671
                            },
                            {
                                legajo: "TR-2026",
                                lastname: "Lopez",
                                firstname: "Juan",
                                documentType: "DNI",
                                documentNumber: 12345672
                            },
                            {
                                legajo: "PT-2023",
                                lastname: "Sanchez",
                                firstname: "María",
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