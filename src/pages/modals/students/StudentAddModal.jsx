import React from 'react'
import '../../../styles/pages/modals/students/StudentAddModal.css'
import { InputControl } from '../../../components/InputControl'

export const StudentAddModal = ({ setModal }) => {
    return (
        <article className="studentAddModal">
            <span class="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Agregar nuevo estudiante</h4>
            <form className="studentForm">
                <InputControl label={"Nombre"} icon={"badge"} type={"text"}>Ingrese el nombre del estudiante</InputControl>
                <InputControl label={"Apellido"} icon={"badge"} type={"text"}>Ingrese el apellido del estudiante</InputControl>
                <InputControl label={"DNI"} icon={"badge"} type={"text"}>Ingrese el DNI del estudiante</InputControl>
                <InputControl label={"CUIL"} icon={"badge"} type={"text"}>Ingrese el CUIL del estudiante</InputControl>
                <InputControl label={"Género"} icon={"badge"} type={"text"}>Ingrese el género del estudiante</InputControl>
                <InputControl label={"Fecha de nacimiento"} icon={"calendar_today"} type={"date"} placeholder={"Ingrese la fecha de nacimiento del estudiante"} />
                <InputControl label={"Ubicación"} icon={"location_on"} type={"text"} placeholder={"Ingrese la ubicación del estudiante"} />
            </form>
        </article>
    )
}