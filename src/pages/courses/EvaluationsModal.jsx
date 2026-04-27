import React from 'react'
import '../../styles/pages/courses/EvaluationsModal.css'
import { InputControl } from '../../components/InputControl'
import { DateControl } from '../../components/DateControl'
import { ComboControl } from '../../components/ComboControl'

export const EvaluationsModal = ({ setModal }) => {

    return (
        <article className="evaluationsModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Agregar nueva instancia evaluativa</h4>
            <div className="evaluationsContainer">
                <form className="evaluationsForm">
                    <DateControl icon={"calendar_month"}>
                        Seleccione la fecha *
                    </DateControl>
                    <ComboControl icon={"quiz"} options={[{ key: 1, value: "Parcial" },
                    { key: 2, value: "Recuperatorio" },
                    { key: 3, value: "Práctico" }]} >
                        Ingrese el tipo *
                    </ComboControl>
                    <InputControl type={"number"} icon={"counter_1"}>
                        Ingrese el número *
                    </InputControl>
                    <button type="button" className="add-button"
                        onClick={() => setModal(false)}>
                        <span className="material-symbols-outlined">save</span>
                        Crear instancia evaluativa
                    </button>
                </form>
            </div>
        </article>
    )
}