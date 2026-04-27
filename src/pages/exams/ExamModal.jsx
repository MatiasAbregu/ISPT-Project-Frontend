import React, { useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl'
import '../../styles/pages/exams/ExamModal.css'
import { ComboControl } from '../../components/ComboControl'
import { StepsControl } from '../../components/StepsControl'
import { DateControl } from '../../components/DateControl'
import { TimeControl } from '../../components/TimeControl'

export const ExamModal = ({ setModal }) => {

    const [step, setStep] = useState(0);

    return (
        <article className="examModal">
            <span class="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Crear mesa de examen</h4>
            <div className="examFormContainer">
                <p className="arrow" onClick={() => {
                    if (step > 0) setStep(prev => prev - 1);
                }}>&lt;</p>
                <form>
                    {
                        step == 0 ?
                            <>
                                <ComboControl icon={"signature"}
                                    options={[
                                        { key: 1, value: "Matemática I" },
                                        { key: 2, value: "Pedagogía" }]} key={1}>
                                    Seleccione la materia *
                                </ComboControl>
                                <ComboControl icon={"person"}
                                    options={[
                                        { key: 1, value: "Enrique Álvarez (DNI: 12345679)" },
                                        { key: 2, value: "Marta Pérez (DNI: 40365441)" }]} key={2}>
                                    Seleccione el docente titular de la mesa *
                                </ComboControl>
                                <DateControl icon={"calendar_month"} key={3}>
                                    Seleccione la fecha del examen *
                                </DateControl>
                                <TimeControl icon={"schedule"} key={4}>
                                    Seleccione la hora del examen *
                                </TimeControl>
                            </>
                            : step == 1 ?
                                <>
                                    <InputControl type={"number"} icon={"counter_1"} key={5}>
                                        Ingrese el número del libro
                                    </InputControl>
                                    <InputControl type={"number"} icon={"counter_1"} key={6}>
                                        Ingrese el número del folio
                                    </InputControl>
                                    <button type="button" className="add-button"
                                        onClick={() => setModal(false)}>
                                        <span className="material-symbols-outlined">save</span>
                                        Crear mesa de examen
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