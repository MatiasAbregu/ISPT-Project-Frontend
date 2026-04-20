import React from 'react'
import { InputControl } from '../../components/InputControl'
import { DateControl } from '../../components/DateControl'
import '../../styles/pages/careers/CareerModal.css'

export const CareerModal = ({ setModal }) => {

    return (
        <article className="careerModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Agregar carrera</h4>
            <div className="careerFormContainer">
                <form className="careerForm">
                    <InputControl label={"Carrera"} icon={"badge"} type={"textbox"}>Nombre de la carrera</InputControl>
                    <DateControl icon={"alarm"}>Fecha de lanzamiento</DateControl>
                    <button type="button" className="add-button"
                        onClick={() => setModal(false)}>
                        <span className="material-symbols-outlined">save</span> Guardar cambios
                    </button>
                </form>
            </div>
        </article>
    )
}