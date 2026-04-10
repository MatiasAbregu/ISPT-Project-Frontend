import React, { useState } from 'react'
import '../../../styles/pages/modals/students/StudentAddModal.css'
import { InputControl } from '../../../components/InputControl'
import { DateControl } from '../../../components/DateControl'
import { ComboControl } from '../../../components/ComboControl'
import { StepsControl } from '../../../components/StepsControl'

export const StudentAddModal = ({ setModal }) => {

    const [step, setStep] = useState(0);

    return (
        <article className="studentAddModal">
            <span class="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Agregar nuevo estudiante</h4>
            <div className="studentFormContainer">
                <p className="arrow" onClick={() => {
                    if (step > 0) setStep(prev => prev - 1);
                }}>&lt;</p>
                <form>
                    {
                        step == 0 ?
                            <>
                                <InputControl type={"text"} icon={"id_card"}>Ingrese el nombre</InputControl>
                                <InputControl type={"text"} icon={"id_card"}>Ingrese el apellido</InputControl>
                                <DateControl icon={"cake"}>Seleccione la fecha de nacimiento</DateControl>
                                <ComboControl icon={"person"} children={"Seleccione un género"}
                                    options={[{ key: 1, value: "Masculino" }, { key: 2, value: "Femenino" }, { key: 3, value: "Otro" }]} />
                            </> :
                            step == 1 ?
                                <>
                                    <ComboControl icon={"id_card"} children={"Seleccione el tipo de documento"}
                                        options={[{ key: 1, value: "DNI" }, { key: 2, value: "Pasaporte" }]} />
                                    <InputControl type={"text"} icon={"id_card"}>Ingrese el N° de documento</InputControl>
                                   {/*  <ButtonControl icon={"location_on"} url={`${URL}/users/add/ubication`}>Ubicación</ButtonControl>
                                    <ButtonControl icon={"contact_phone"} url={`${URL}/users/add/contact`}>Contacto</ButtonControl> */}
                                </> :
                                step == 2 ?
                                    <>
                                        <InputControl type={"textarea"} icon={"visibility"}>Observaciones</InputControl>
                                        <button type="button" className="add-button"
                                            onClick={() => setModal(false)}>
                                            <span className="material-symbols-outlined">save</span>Crear estudiante
                                        </button>
                                    </>
                                    : undefined
                    }
                </form>
                <p className="arrow" onClick={() => {
                    if (step < 2) setStep(prev => prev + 1);
                }}>&gt;</p>
            </div>
            <StepsControl stepsQuantity={3} setStep={setStep} step={step} />
        </article>
    )
}
