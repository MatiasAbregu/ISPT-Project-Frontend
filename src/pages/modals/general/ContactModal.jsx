import React, { useContext, useState } from 'react'
import { InputControl } from '../../../components/InputControl'
import '../../../styles/pages/modals/general/ContactModal.css'
import { UserContext } from '../../../context/UserProvider';

export const ContactModal = ({ setModal }) => {

  const [showEdit, setShowEdit] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <article className="contactModal">
      <span class="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
      <h4>Contacto</h4>
      <div className="contactFormContainer">
        <form>
          <InputControl type={"tel"} icon={"local_hospital"}>
            Número de emergencias
          </InputControl>
          <InputControl type={"tel"} icon={"phone"} >
            Número de celular
          </InputControl>
          <InputControl type={"email"} icon={"email"}>
            Correo electrónico
          </InputControl>
          <div className='buttonContainer'>
            {
              user ?
                user.role == "Directivo" && user.role == "Preceptor" ?
                  <span class="material-symbols-outlined edit" onClick={() => setShowEdit(prev => !prev)}>edit</span>
                  : undefined
                : undefined
            }
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