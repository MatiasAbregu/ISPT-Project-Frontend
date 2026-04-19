import React, { useEffect, useState } from 'react'
import '../../../styles/pages/modals/general/DegreesModal.css'
import { InputControl } from '../../../components/InputControl'

export const DegreesModal = ({ setModal }) => {

    const [degrees, setDegrees] = useState(["Ingeniero en sistemas"]);

    const addValue = (text) => {
        setDegrees(prev => { return [...prev, text.trim()] })
    }

    return (
        <article className="degreesModal">
            <span class="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Gestionar títulos de nivel superior/secundaria</h4>
            <div className="degreesFormContainer">
                <form>
                    <InputControl type={"add_text"} icon={"history_edu"} onclick={addValue}>
                        Escribe el título a añadir
                    </InputControl>
                    <div className='badge-container'>
                        {degrees && degrees.length > 0 ?
                            degrees.map((v, k) => {
                                return (<p key={k} className='badge-title' onClick={() => {
                                    setDegrees(prev => prev.filter((_, i) => i !== k))
                                }}><span>x</span> {v}</p>);
                            })
                            : <p>Aún no hay títulos registrados a esta persona.</p>}
                    </div>
                    <button type="button" className="add-button"
                        onClick={() => setModal(false)}>
                        <span className="material-symbols-outlined">save</span> Guardar cambios
                    </button>
                </form>
            </div>
        </article>
    )
}