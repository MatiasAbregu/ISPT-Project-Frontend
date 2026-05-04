import React from 'react'
import { InputControl } from '../../components/InputControl'
import { DateControl } from '../../components/DateControl'
import '../../styles/pages/schoolYear/SchoolYearModal.css'
import { ComboControl } from '../../components/ComboControl'

export const SchoolYearModal = ({ setModal }) => {

    return (
        <article className="schoolYearModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Crear ciclo lectivo</h4>
            <div className="schoolYearFormContainer">
                <form className="schoolYearForm">
                    <ComboControl options={[{ key: 1, value: "Profesorado" }, { key: 2, value: "Trayecto" }]} icon={"history_edu"}>
                        Seleccione una carrera
                    </ComboControl>
                    <ComboControl options={[{ key: 1, value: "Plan 2024 (Res. EE/11)" }, { key: 2, value: "Plan 2025 (Res. EE/25)" }]}
                        icon={"two_pager"}>
                        Seleccione plan de estudio
                    </ComboControl>
                    <InputControl label={"Carrera"} icon={"badge"} type={"textbox"}>
                        Nombre de la carrera
                    </InputControl>
                    <button type="button" className="add-button"
                        onClick={() => setModal(false)}>
                        <span className="material-symbols-outlined">save</span> Guardar cambios
                    </button>
                </form>
            </div>
        </article>
    )
}