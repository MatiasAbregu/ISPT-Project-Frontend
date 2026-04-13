import React, { useState } from 'react'
import '../../../styles/pages/modals/users/UserAddModal.css'
import { InputControl } from '../../../components/InputControl'
import { ComboControl } from '../../../components/ComboControl'
import { DateControl } from '../../../components/DateControl'
import { StepsControl } from '../../../components/StepsControl'

export const UserAddModal = ({ setModal }) => {

    const [step, setStep] = useState(0);

    return (
        <article className="userAddModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Agregar nuevo usuario</h4>
            <div className="userFormContainer">
                <p className="arrow" onClick={() => {
                    if (step > 0) setStep(prev => prev - 1);
                }}>&lt;</p>
                <form className="userForm">
                    {
                        step == 0 ?
                            <>
                                <InputControl label={"Nombre"} icon={"badge"} type={"text"}>Ingrese el nombre</InputControl>
                                <InputControl label={"Apellido"} icon={"badge"} type={"text"}>Ingrese el apellido</InputControl>
                                <DateControl icon={"cake"}>Seleccione la fecha de nacimiento</DateControl>
                                <ComboControl icon={"person"} children={"Seleccione un género"}
                                    options={[{ key: 1, value: "Masculino" }, { key: 2, value: "Femenino" }, { key: 3, value: "Otro" }]} />
                            </> :
                            step == 1 ?
                                <>
                                    <InputControl label={"DNI"} icon={"badge"} type={"text"}>Ingrese el DNI del usuario</InputControl>
                                    <ComboControl children={"Seleccione un rol"} icon={"badge"} options={[
                                        { key: "1", value: "Administrador" },
                                        { key: "2", value: "Preceptor" },
                                        { key: "3", value: "Preceptor Auxiliar" }
                                    ]}></ComboControl>
                                    <ComboControl icon={"id_card"} children={"Seleccione el tipo de documento"}
                                        options={[{ key: 1, value: "DNI" }, { key: 2, value: "Pasaporte" }]} />
                                    <InputControl type={"text"} icon={"id_card"}>Ingrese el N° de documento</InputControl>
                                </> :
                                step == 2 ?
                                    <>
                                        <InputControl type={"text"} icon={"location_on"}>Ubicación</InputControl>
                                        <InputControl type={"text"} icon={"contact_phone"}>Contacto</InputControl>
                                        <InputControl type={"textarea"} icon={"visibility"}>Observaciones</InputControl>
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