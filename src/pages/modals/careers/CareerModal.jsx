import React from 'react'
import '../../../styles/pages/modals/careers/CareerModal.css'
import { InputControl } from '../../../components/InputControl'

export const CareerModal = ({ setModal }) => {

      return(
        <article className="careerModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Agregar carrera</h4>
            <div className="careerContainer">
                <InputControl type={"textbox"}>Nombre de la carrera</InputControl>
            </div>
        </article>
      )
}