import React, { useEffect, useState } from "react";
import '../styles/pages/Users.css';
import { InputControl } from "../components/InputControl";
import { Table } from "../components/Table";
import { Footer } from "../components/Footer";
import {Sidebar} from "../components/Sidebar";
import { UserAddModal } from "./modals/users/UserAddModal";

export const Users = () => {


    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();

    useEffect(() => {
        document.title = "ISPT - Gestión de usuarios";
    }, []);

    return (
        
        <article className="usersPage">
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <Sidebar />
            <div className="usersPageContainer">
            <div className="controls">
                <InputControl icon={"search"} type={"search"}></InputControl>
                <button type="button" className="add-button"
                    onClick={() => { setTypeModal(<UserAddModal setModal={setModal} typeModal={1}/>); setModal(true); }}>
                    <span className="material-symbols-outlined">add_circle</span>Añadir usuario
                </button>
            </div>
            <Table
                columns={[
                    {
                        name: "DNI",
                        width: 120
                    },
                    {
                        name: "Nombre de usuario",
                        width: 160
                    },
                    {
                        name: "Rol",
                        width: 120
                    },
                    {
                        name: "Estado",
                        width: 100
                    }
                ]} options={["person", "edit", "delete", "switch"]}
                data={[
                    {
                        dni: 12345678,
                        username: "Matias",
                        rol: "Admin",
                        estado: "Activo",
                    },
                    {
                        dni: 12345678,
                        username: "Maria",
                        rol: "Admin",
                        estado: "Activo",
                    },
                    {
                        dni: 12345678,
                        username: "Carlos",
                        rol: "Docente",
                        estado: "Inactivo"
                    }
                ]} />
                 <Footer />
                </div>
        </article>
    );
}