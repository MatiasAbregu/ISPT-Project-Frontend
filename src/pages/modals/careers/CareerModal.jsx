import React from 'react'
import '../../../styles/pages/modals/career/CareerModal.css'
import { InputControl } from '../../../components/InputControl'

export const CareerModal = ({ setModal }) => {

      return(
        <article className="careerModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Agregar carrera</h4>
            <div className="careerContainer">
                <form className="careerForm">
                    <InputControl label={"Carrera"} icon={"badge"} type={"textbox"}>Nombre de la carrera</InputControl>
                </form>
            </div>
        </article>
      )
}