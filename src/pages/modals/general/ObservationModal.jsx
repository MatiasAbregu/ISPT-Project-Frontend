import React, { useState } from 'react'
import { InputControl } from '../../../components/InputControl'
import '../../../styles/pages/modals/general/ObservationModal.css'

export const ObservationModal = ({ setModal }) => {

  const [showEdit, setShowEdit] = useState(false);

  return (
    <article className="observationModal">
      <span class="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
      <h4>Observaciones</h4>
      <div className="observationFormContainer">
        <form>
          <InputControl type={"textarea"} icon={"visibility"}>Observaciones</InputControl>
          <div className='buttonContainer'>
            <span class="material-symbols-outlined edit" onClick={() => setShowEdit(prev => !prev)}>edit</span>
            {
              showEdit ?
                <button type="button" className="add-button"
                  onClick={() => setModal(false)}>
                  <span className="material-symbols-outlined">save</span> Guardar cambios
                </button> : <></>
            }
          </div>
        </form>
      </div>
    </article >
  )
}