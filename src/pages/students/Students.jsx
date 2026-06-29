import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { Table } from "../../components/Table";
import { InputControl } from "../../components/InputControl";
import { Sidebar } from "../../components/Sidebar";
import { StudentModal } from "./StudentModal";
import { DocsModal } from "../modals/DocsModal";
import { DegreesModal } from "../modals/DegreesModal";
import { ContactModal } from "../modals/ContactModal";
import { ObservationModal } from "../modals/ObservationModal";
import { FolderModal } from "./FolderModal";
import StudentService from "../../services/students/StudentService";
import toast from "react-hot-toast";
import { AddExistentPersonModal } from '../modals/AddExistentPersonModal'

import "../../styles/pages/students/Students.css";

export const Students = () => {

    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const [showCreateOptions, setShowCreateOptions] = useState(false);

    const [data, setData] = useState([]);

    useEffect(() => {
        document.title = "ISPT - Gestión de estudiantes";
        getAllStudents();
    }, []);

    const getAllStudents = async () => {
        try {
            const res = await StudentService.getAllStudents();

            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                setData(res.data.object);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const backendResponse = error.response.data;
                toast.error(backendResponse.message);
            } else {
                toast.error("No se pudo conectar con el servidor.");
            }
        }
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
                                    setTypeModal(<StudentModal setModal={setModal} typeModal={1} getAllStudents={getAllStudents} />);
                                    setModal(true);
                                    setShowCreateOptions(false);
                                }}>
                                Añadir nueva persona al sistema
                            </button>
                            <button type="button"
                                onClick={() => {
                                    setTypeModal(<AddExistentPersonModal setModal={setModal} typeModal={"student"} getAll={getAllStudents} />);
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
                                name: "Tipo de documento",
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
                        ]} showId={false}
                        options={[
                            {
                                value: "eye", onclick: (obj) => {
                                    setTypeModal(<StudentModal setModal={setModal} typeModal={2} studentId={obj.id} />);
                                    setModal(true);
                                }
                            },
                            {
                                value: "edit", onclick: (obj) => {
                                    setTypeModal(<StudentModal setModal={setModal} typeModal={3} studentId={obj.id}
                                        getAllStudents={getAllStudents} />);
                                    setModal(true);
                                }
                            },
                            // EN FOLDER FALTA DOCS
                            { value: "folder", onclick: () => { setTypeModal(<FolderModal setModal={setModal} />); setModal(true); } },
                            {
                                value: "degrees", onclick: (obj) => {
                                    setTypeModal(<DegreesModal setModal={setModal} personId={obj.id} />);
                                    setModal(true);
                                }
                            },
                            {
                                value: "contact", onclick: (obj) => {
                                    setTypeModal(<ContactModal setModal={setModal} personId={obj.id} />);
                                    setModal(true);
                                }
                            },
                            {
                                value: "observation", onclick: (obj) => {
                                    setTypeModal(<ObservationModal setModal={setModal} requestId={obj.id} sendTo={"person"} />);
                                    setModal(true);
                                }
                            },
                        ]}
                        data={data} />
                </div>
                <Footer />
            </div>
        </article>
    );
}