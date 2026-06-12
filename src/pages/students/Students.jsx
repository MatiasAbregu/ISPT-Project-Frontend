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
import { FolderModal } from "./FolderModal";
import { AddPersonInStudenModal } from "./AddPersonInStudentModal";

export const Students = () => {

    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const [showCreateOptions, setShowCreateOptions] = useState(false);
    
    const [data, setData] = useState();

    useEffect(() => {
        document.title = "ISPT - Gestión de estudiantes";
    }, []);

    const getAllStudents = () => {

    }

    return (
        <article className="studentsPage">
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <Sidebar />
            <div className="studentsPageContainer">
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    <div className="createControl">
                        <button className="add-button-student" onClick={() => setShowCreateOptions(prev => !prev)}>
                            <span className="material-symbols-outlined">add_circle</span>Añadir estudiante
                        </button>
                        <div className={`btn-select ${showCreateOptions ? "show" : ""}`}>
                            <button type="button"
                                onClick={() => {
                                    setTypeModal(<StudentModal setModal={setModal} typeModal={1} />);
                                    setModal(true);
                                    setShowCreateOptions(false);
                                }}>
                                Añadir nueva persona al sistema
                            </button>
                            <button type="button"
                                onClick={() => {
                                    setTypeModal(<AddPersonInStudenModal setModal={setModal} />);
                                    setModal(true);
                                    setShowCreateOptions(false);
                                }}>
                                Añadir una persona existente a estudiantes
                            </button>
                        </div>
                    </div>
                </div>
                <div className="tableContainer">
                    <Table
                        columns={[
                            {
                                name: "N° de documento",
                                width: 80
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
                            }
                        ]}
                        options={[
                            { value: "eye", onclick: () => { setTypeModal(<StudentModal setModal={setModal} typeModal={2} />); setModal(true); } },
                            { value: "docs", onclick: () => { setTypeModal(<DocsModal setModal={setModal} />); setModal(true); } },
                            { value: "folder", onclick: () => { setTypeModal(<FolderModal setModal={setModal} />); setModal(true); } },
                            { value: "degrees", onclick: () => { setTypeModal(<DegreesModal setModal={setModal} />); setModal(true); } },
                            { value: "contact", onclick: () => { setTypeModal(<ContactModal setModal={setModal} />); setModal(true); } },
                            { value: "observation", onclick: () => { setTypeModal(<ObservationModal setModal={setModal} />); setModal(true); } },
                            { value: "edit", onclick: () => { setTypeModal(<StudentModal setModal={setModal} typeModal={3} />); setModal(true); } },
                        ]}
                        data={data} />
                </div>
                <Footer />
            </div>
        </article>
    );
}