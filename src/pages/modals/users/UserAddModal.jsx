import React from 'react'
import '../../../styles/pages/modals/users/UserAddModal.css'
import { InputControl } from '../../../components/InputControl'
import { ComboControl } from '../../../components/ComboControl'



export const UserAddModal = ({ setModal }) => {
    return (
        <article className="userAddModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Agregar nuevo usuario</h4>
            <form className="userForm">
                <InputControl label={"Nombre"} icon={"badge"} type={"text"}>Ingrese el nombre del usuario</InputControl>
                <InputControl label={"DNI"} icon={"badge"} type={"text"}>Ingrese el DNI del usuario</InputControl>
                <ComboControl children={"Seleccione un rol"} icon={"badge"} options={[
                    { key: "1", value: "Administrador" },
                    { key: "2", value: "Preceptor" },
                    { key: "3", value: "Preceptor Auxiliar" }
                ]}></ComboControl>
            </form>
        </article>
    )
}