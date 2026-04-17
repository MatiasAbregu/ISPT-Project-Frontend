import React from 'react'
import '../../../styles/pages/modals/courses/EvaluationsModal.css'
import { InputControl } from '../../../components/InputControl'
import { DateControl } from '../../../components/DateControl'


export const EvaluationsModal = ({ setModal }) => {

    return (
        <article className="evaluationsModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Agregar nueva instancia evaluativa</h4>
            <div className="evaluationsContainer">
                <form className="evaluationsForm">
                    <DateControl icon={"cake"} data={"birthdate"}>
                        Seleccione la fecha
                    </DateControl>
                    <InputControl type={"text"} icon={"id_card"}>
                        Ingrese el tipo
                    </InputControl>
                    <InputControl type={"text"} icon={"id_card"}>
                        Ingrese el número
                    </InputControl>
                    <button type="button" className="add-button"
                        onClick={() => setModal(false)}>
                        <span className="material-symbols-outlined">save</span>
                        Crear instancia
                    </button>
                </form>
            </div>
        </article>
    )
}