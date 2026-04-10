import React from 'react'
import '../../../styles/pages/modals/students/StudentAddModal.css'
import { InputControl } from '../../../components/InputControl'
import { DateControl } from '../../../components/DateControl'
import { StepsControl } from '../../../components/StepsControl'

export const StudentAddModal = ({ setModal }) => {
    
    const [step, setStep] = useState(0);

    return (
        <article className="userForm">
            <p className="btn-close" onClick={() => setModal(false)}>X</p>
            <h3>Rellene los campos del nuevo usuario:</h3>
            <div className="userFormContainer">
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
                                <ComboControl icon={"add_moderator"} children={"Selecciona un rol"} type={"special"}
                                    options={[
                                        { key: "1", value: "Administrador" },
                                        { key: "2", value: "Docente" },
                                        { key: "3", value: "Estudiante" },
                                        { key: "4", value: "Estudiante" },
                                        { key: "5", value: "Estudiante" }]} />
                            </> :
                            step == 1 ?
                                <>
                                    <ComboControl icon={"id_card"} children={"Seleccione el tipo de documento"}
                                        options={[{ key: 1, value: "DNI" }, { key: 2, value: "Pasaporte" }]} />
                                    <InputControl type={"text"} icon={"id_card"}>Ingrese el N° de documento</InputControl>
                                    <ButtonControl icon={"location_on"} url={`${URL}/users/add/ubication`}>Ubicación</ButtonControl>
                                    <ButtonControl icon={"contact_phone"} url={`${URL}/users/add/contact`}>Contacto</ButtonControl>
                                </> :
                                step == 2 ?
                                    <>
                                        <InputControl type={"textarea"} icon={"visibility"}>Observaciones</InputControl>
                                        <ButtonControl icon={"save"} setModal={setModal} type={"submit"}>Crear usuario</ButtonControl>
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