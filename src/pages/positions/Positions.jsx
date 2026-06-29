import React, { useEffect, useState } from "react";
import { InputControl } from "../../components/InputControl";
import { Table } from "../../components/Table";
import { Footer } from "../../components/Footer";
import { Sidebar } from "../../components/Sidebar";
import { PositionModal } from "./PositionModal";
import { ContactModal } from "../modals/ContactModal";
import toast from "react-hot-toast";
import { AddExistentPersonModal } from "../modals/AddExistentPersonModal";
import PositionService from "../../services/positions/PositionService";
import { ObservationModal } from "../modals/ObservationModal";

import '../../styles/pages/positions/Positions.css';

export const Positions = () => {

    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const [showCreateOptions, setShowCreateOptions] = useState(false);

    const [data, setData] = useState([]);

    useEffect(() => {
        document.title = "ISPT - Gestión de personas con cargo";
        getAllPersonal();
    }, []);

    const getAllPersonal = async () => {
        try {
            const res = await PositionService.getAllPersonal();

            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                setData(res.data.object);
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data) {
                const backendResponse = error.response.data;
                toast.error(backendResponse.message);
            } else {
                toast.error("No se pudo conectar con el servidor.");
            }
        }
    }

    const removePersonal = async (id) => {
        try {
            const res = await PositionService.deletePosition(id);

            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                toast.success(res.data.message);
                await getAllPersonal();
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data) {
                const backendResponse = error.response.data;
                toast.error(backendResponse.message);
            } else {
                toast.error("No se pudo conectar con el servidor.");
            }
        }
    }

    return (
        <article className="positionsPage">
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <Sidebar />
            <div className="positionsPageContainer">
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    <div className="createControl">
                        <button className="add-button-position" onClick={() => setShowCreateOptions(prev => !prev)}>
                            <span className="material-symbols-outlined">add_circle</span>Añadir persona con cargo
                        </button>
                        <div className={`btn-select ${showCreateOptions ? "show" : ""}`}>
                            <button type="button"
                                onClick={() => {
                                    setTypeModal(<PositionModal setModal={setModal} typeModal={1} getAllPersonal={getAllPersonal} />);
                                    setModal(true);
                                    setShowCreateOptions(false);
                                }}>
                                Añadir nueva persona al sistema
                            </button>
                            <button type="button"
                                onClick={() => {
                                    setTypeModal(<AddExistentPersonModal setModal={setModal} typeModal={"position"} getAll={getAllPersonal} />);
                                    setModal(true);
                                    setShowCreateOptions(false);
                                }}>
                                Asignar un cargo a una persona existente
                            </button>
                        </div>
                    </div>
                </div>
                <Table
                    columns={[
                        {
                            name: "DNI",
                            width: 85
                        },
                        {
                            name: "Apellido",
                            width: 150
                        },
                        {
                            name: "Nombre",
                            width: 150
                        },
                        {
                            name: "Cargo",
                            width: 100
                        }
                    ]} options={[
                        {
                            value: "eye", onclick: (obj) => {
                                setTypeModal(<PositionModal setModal={setModal} typeModal={2} personId={obj.id} />);
                                setModal(true);
                            }
                        },
                        {
                            value: "edit", onclick: (obj) => {
                                setTypeModal(<PositionModal setModal={setModal} typeModal={3} getAllPersonal={getAllPersonal}
                                    personId={obj.id} />);
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
                        {
                            value: "delete", onclick: (obj) => {
                                removePersonal(obj.id);
                            }
                        }]}
                    showId={false}
                    data={data} />
                <Footer />
            </div>
        </article>
    );
}