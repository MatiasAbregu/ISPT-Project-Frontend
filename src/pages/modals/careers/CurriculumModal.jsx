import React from 'react'
import '../../../styles/pages/modals/career/CurriculumModal.css'
import { InputControl } from '../../../components/InputControl'

export const CurriculumModal = ({ setModal }) => {

      return(
        <article className="curriculumModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Agregar plan de estudio</h4>
            <div className="curriculumFormContainer">
                <form className="curriculumForm">
                    <InputControl label={"Plan de estudio"} icon={"contract_edit"}>Ingrese la resolución</InputControl>
                    <InputControl label={"Duración"} icon={"timer"} type={"number"}>Ingrese la duración</InputControl>
                    <button type="button" className="add-button"
                        onClick={() => setModal(false)}>
                        <span className="material-symbols-outlined">save</span> Guardar cambios
                    </button>
                </form>
            </div>
        </article>
      )
}