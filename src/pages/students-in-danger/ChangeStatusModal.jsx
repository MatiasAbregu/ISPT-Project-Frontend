import React, { useEffect, useState } from 'react'
import '../../styles/pages/students-in-danger/ChangeStatusModal.css'
import { ComboControl } from '../../components/ComboControl'

export const ChangeStatusModal = ({ setModal }) => {
    return (
        <article className="changeStatusModal">
            <span class="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Cambiar estado de alumno en riesgo</h4>
            <div className="changeStatusFormContainer">
                <form>
                    <ComboControl icon={"person_check"}
                        options={[{ key: 1, value: "Por avisar" }, { key: 2, value: "Avisado" }, { key: 3, value: "Justificado" }]}
                        key={1}>
                        Seleccione el estado del alumno *
                    </ComboControl>
                    <button type="button" className="add-button"
                        onClick={() => setModal(false)}>
                        <span className="material-symbols-outlined">save</span>
                        Guardar estado
                    </button>
                </form>
            </div>
        </article>
    )
}