import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import TeacherYUP from '../../schemas/TeacherYUP'
import { InputControl } from '../../components/InputControl'
import '../../styles/pages/teachers/AssignationModal.css'
import { ComboControl } from '../../components/ComboControl'
import { StepsControl } from '../../components/StepsControl'
import { DateControl } from '../../components/DateControl'

export const AssignationModal = ({ setModal, typeModal }) => {

    const [step, setStep] = useState(0);

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
        resolver: yupResolver(TeacherYUP)
    });

    return (
        <article className="studentModal">
            <span class="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Asignar docente al espacio curricular</h4>
            <div className="studentFormContainer">
                <p className="arrow" onClick={() => {
                    if (step > 0) setStep(prev => prev - 1);
                }}>&lt;</p>
                <form>
                    {
                        step == 0 ?
                            <>
                                <ComboControl icon={"person"}
                                    options={[
                                        { key: 1, value: "Enrique Álvarez (DNI: 12345679)" },
                                        { key: 2, value: "Marta Pérez (DNI: 40365441)" }]}
                                    setValue={setValue} data={"subjectType"} getValues={getValues} key={1}>
                                    Seleccione el docente *
                                </ComboControl>
                                <ComboControl icon={"wb_twilight"}
                                    options={[{ key: 1, value: "Titular" }, { key: 2, value: "Suplente" },
                                    { key: 3, value: "Interino" }, { key: 4, value: "EACI" }]}
                                    setValue={setValue} data={"turn"} getValues={getValues} key={2}>
                                    Seleccione situación de revista *
                                </ComboControl>
                                <DateControl icon={"calendar_clock"}>
                                    Fecha de inicio *
                                </DateControl>
                                <DateControl icon={"schedule"}>
                                    Fecha de fin *
                                </DateControl>
                            </>
                            : step == 1 ?
                                <>
                                    <InputControl type={"textarea"} icon={"visibility"} key={10}>Observaciones</InputControl>
                                    <button type="button" className="add-button"
                                        onClick={() => setModal(false)}>
                                        <span className="material-symbols-outlined">save</span>
                                        Asignar docente al espacio curricular
                                    </button>
                                </>
                                : undefined
                    }
                </form>
                <p className="arrow" onClick={() => {
                    if (step < 1) setStep(prev => prev + 1);
                }}>&gt;</p>
            </div>
            <StepsControl stepsQuantity={2} setStep={setStep} step={step} />
        </article>
    )
}