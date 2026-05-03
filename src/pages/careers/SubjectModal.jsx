import React, { useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl'
import { DateControl } from '../../components/DateControl'
import { ComboControl } from '../../components/ComboControl'
import { StepsControl } from '../../components/StepsControl'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import SubjectYUP from '../../schemas/SubjectYUP'
import { TimeControl } from '../../components/TimeControl'
import '../../styles/pages/careers/SubjectModal.css'

export const SubjectModal = ({ setModal, typeModal, academicYear = 1 }) => {

    const [step, setStep] = useState(0);

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
        resolver: yupResolver(SubjectYUP),
        defaultValues: typeModal != 1 ? {
            code: "MAT-01",
            academicYear: academicYear,
            nameSubject: "Matemáticas I",
            subjectType: "Asignatura",
            typeSemester: "Anual",
            turn: "Mañana",
            division: "A",
            startTime: "11:00",
            endTime: "13:00",
            professorship: 3,
            observations: ""
        } : { academicYear: academicYear }
    });

    return (
        <article className="subjectModal">
            <span class="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>{typeModal == 1 ? "Agregar nuevo espacio curricular" : typeModal == 2 ?
                "Ver espacio curricular" : "Actualizar espacio curricular"}</h4>
            <div className="subjectFormContainer">
                <p className="arrow" onClick={() => {
                    if (step > 0) setStep(prev => prev - 1);
                }}>&lt;</p>
                <form>
                    {
                        step == 0 ?
                            <>
                                <InputControl type={"text"} icon={"signature"} register={register} data={"cupof"} key={1}>
                                    Ingrese el código del espacio curricular *
                                </InputControl>
                                <InputControl type={"number"} icon={"today"} register={register} data={"academicYear"} key={2}
                                    readonly={true}>
                                    Año académico *
                                </InputControl>
                                <InputControl type={"text"} icon={"label"} register={register} data={"nameSubject"} key={3}>
                                    Ingrese el nombre del del espacio curricular *
                                </InputControl>
                            </>
                            : step == 1 ?
                                <>
                                    <ComboControl icon={"signature"}
                                        options={[{ key: 1, value: "Asignatura" }, { key: 2, value: "Seminario" }]}
                                        setValue={setValue} data={"subjectType"} getValues={getValues} key={4}>
                                        Seleccione tipo de espacio curricular *
                                    </ComboControl>
                                    <ComboControl icon={"signature"}
                                        options={[
                                            { key: 1, value: "Anual" },
                                            { key: 2, value: "Bimestral" },
                                            { key: 3, value: "Cuatrimestral" }
                                        ]}
                                        setValue={setValue} data={"typeSemester"} getValues={getValues} key={10}>
                                        Seleccione tipo de cursado *
                                    </ComboControl>
                                    <InputControl type={"number"} icon={"nest_clock_farsight_analog"} key={9}
                                        register={register} data={"professorship"}>
                                        Ingrese las horas cátedras *
                                    </InputControl>
                                    {
                                        typeModal == 2 ?
                                            <></>
                                            :
                                            <button type="button" className="add-button"
                                                onClick={() => setModal(false)}>
                                                <span className="material-symbols-outlined">save</span>
                                                {typeModal != 1 ? "Actualizar espacio curricular" : "Crear espacio curricular"}
                                            </button>
                                    }
                                </> : undefined
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