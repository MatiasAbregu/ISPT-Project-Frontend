import React from 'react'
import '../../../styles/pages/modals/career/CurriculumModal.css'
import { InputControl } from '../../../components/InputControl'

export const CurriculumModal = ({ setModal }) => {

      return(
        <article className="curriculumModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Agregar plan de estudio</h4>
            <div className="curriculumContainer">
                <form className="curriculumForm">
                    <InputControl label={"Plan de estudio"} icon={"badge"} type={"contract_edit"}>Ingrese la resolución</InputControl>
                    <InputControl label={"Duración"} icon={"schedule"} type={"timer"}>Ingrese la duración</InputControl>
                </form>
            </div>
        </article>
      )
}