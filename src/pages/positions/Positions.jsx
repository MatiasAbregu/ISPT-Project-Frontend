import React, { useEffect, useState } from "react";
import '../../styles/pages/positions/Positions.css';
import { InputControl } from "../../components/InputControl";
import { Table } from "../../components/Table";
import { Footer } from "../../components/Footer";
import { Sidebar } from "../../components/Sidebar";
import { PositionModal } from "./PositionModal";

export const Positions = () => {

    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();

    useEffect(() => {
        document.title = "ISPT - Gestión de usuarios";
    }, []);

    return (
        <article className="positionsPage">
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <Sidebar />
            <div className="positionsPageContainer">
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    <button type="button" className="add-button-position"
                        onClick={() => { setTypeModal(<PositionModal setModal={setModal} typeModal={1} />); setModal(true); }}>
                        <span className="material-symbols-outlined">add_circle</span>Añadir persona con cargo
                    </button>
                </div>
                <Table
                    columns={[
                        {
                            name: "DNI",
                            width: 85
                        },
                        {
                            name: "Nombre",
                            width: 150
                        },
                        {
                            name: "Apellido",
                            width: 150
                        },
                        {
                            name: "Cargo",
                            width: 100
                        },
                        {
                            name: "Estado",
                            width: 80
                        }
                    ]} options={[{ value: "eye", onclick: () => { setTypeModal(<PositionModal setModal={setModal} typeModal={2} />); setModal(true); } },
                    { value: "edit", onclick: () => { setTypeModal(<PositionModal setModal={setModal} typeModal={3} />); setModal(true); } },
                        "delete",]}
                    data={[
                        {
                            dni: 12345678,
                            firstname: "María Eugenia",
                            lastname: "Danieli",
                            rol: "Directivo",
                            estado: "Activo",
                        },
                        {
                            dni: 12345678,
                            firstname: "Matías",
                            lastname: "Abregú",                       
                            rol: "Preceptor",
                            estado: "Activo",
                        },
                        {
                            dni: 12345678,
                            firstname: "Martín",
                            lastname: "Sobrero",                       
                            rol: "Preceptor",
                            estado: "Activo",
                        },
                    ]} />
                <Footer />
            </div>
        </article>
    );
}