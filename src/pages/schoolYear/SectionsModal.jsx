import React, { useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl'
import '../../styles/pages/schoolYear/SectionsModal.css'
import { ComboControl } from '../../components/ComboControl'


export const SectionsModal = ({ setModal }) => {

    const [step, setStep] = useState(0);

    return (
        <article className="sectionsModal">
            <span class="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Crear comisión</h4>
            <div className="sectionsFormContainer">

                <form>

                    <ComboControl icon={"signature"}
                        options={[
                            { key: 1, value: "Matemática I" },
                            { key: 2, value: "Lengua I" }]}>
                        Seleccione la materia
                    </ComboControl>

                    <InputControl  icon={"group"} >
                        Ingrese la división
                    </InputControl>
                    
                    <button type="button" className="add-button"
                        onClick={() => setModal(false)}>
                        <span className="material-symbols-outlined">save</span>
                        Crear comisión
                    </button>

                </form>
            </div>

        </article>
    )
}