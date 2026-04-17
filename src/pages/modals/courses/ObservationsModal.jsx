import React from 'react'
import '../../../styles/pages/modals/courses/ObservationsModal.css'
import { InputControl } from '../../../components/InputControl'

export const ObservationsModal = ({ setModal }) => {

    return (
        <article className="observationsModal">
            <span class="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Observaciones del estudiante</h4>
            <div className="observationsFormContainer">
                <form>
                    {
                        <>
                            <InputControl type={"textarea"} icon={"visibility"}>Observaciones</InputControl>
                            <button type="button" className="add-button"
                                onClick={() => setModal(false)}>
                                <span className="material-symbols-outlined">save</span>
                                Guardar
                            </button>
                        </>
                    }
                </form>
            </div>
        </article>
    )
}