import React, { useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl'
import { DateControl } from '../../components/DateControl'
import { ComboControl } from '../../components/ComboControl'
import { StepsControl } from '../../components/StepsControl'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import SubjectYUP from '../../schemas/SubjectYUP'
import { TimeControl } from '../../components/TimeControl'
import SubjectService from '../../services/careers/SubjectsService'
import { useParams } from 'react-router'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { UserContext } from '../../context/UserProvider'

import '../../styles/pages/careers/SubjectModal.css'

export const SubjectModal = ({ setModal, typeModal, curriculumId, subjectId, getByCurriculumId }) => {

    const { user } = useContext(UserContext);
    const [step, setStep] = useState(0);


    const { register, handleSubmit, formState: { errors }, setValue, getValues, reset } = useForm({ resolver: yupResolver(SubjectYUP) });

    useEffect(() => {
        if (typeModal === "add" || !subjectId) return;

        loadSubject();
    }, [subjectId, typeModal]);

    const onSubmit = async (data) => {
        try {
            let res;
            if (typeModal === "add") {
                let finalData = {
                    ...data,
                    CurriculumId: curriculumId,
                    createdById: user.id || user.ID
                }
                res = await SubjectService.create(finalData)
            } else {
                let finalData = {
                    ...data,
                    CurriculumId: curriculumId,
                    updatedById: user.id || user.ID,
                    Id: subjectId
                }
                res = await SubjectService.update(subjectId, finalData);
            }

            toast.success(res.data?.message || "¡Operación éxitosa!");
            setModal(false)
            await getByCurriculumId(curriculumId)
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data) {
                const backendResponse = error.response.data;
                toast.error(backendResponse.message);
            } else {
                toast.error("No se pudo conectar con el servidor.");
            }
        }
    }

    const loadSubject = async () => {
        try {
            const res = await SubjectService.getById(subjectId);
            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                const subject = res.data.object;
                console.log(subject);
                reset({
                    Code: subject.code,
                    Year: subject.year,
                    Name: subject.name,
                    Format: subject.format,
                    Type: subject.type,
                    ContactHour: subject.contactHour
                });
            }

        } catch (error) {
            if (error.response && error.response.data) {
                const backendResponse = error.response.data;
                toast.error(backendResponse.message);
            } else {
                toast.error("No se pudo conectar con el servidor.");
            }
        }

    }

    const isView = typeModal === "view";

    return (
        <article className="subjectModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>{typeModal == "add" ? "Agregar nuevo espacio curricular" : typeModal == "view" ?
                "Ver espacio curricular" : "Actualizar espacio curricular"}</h4>
            <div className="subjectFormContainer">
                <p className="arrow" onClick={() => {
                    if (step > 0) setStep(prev => prev - 1);
                }}>&lt;</p>
                <form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
                    {
                        step == 0 ?
                            <>
                                <InputControl type={"text"} icon={"signature"} register={register} data={"Code"} error={errors.Code} key={1} readonly={isView}>
                                    Ingrese el código del espacio curricular *
                                </InputControl>
                                <InputControl type={"number"} icon={"today"} register={register} data={"Year"} key={2} error={errors.Year} readonly={isView}>
                                    Año académico *
                                </InputControl>
                                <InputControl type={"text"} icon={"label"} register={register} data={"Name"} key={3} error={errors.Name} readonly={isView}>
                                    Ingrese el nombre del del espacio curricular *
                                </InputControl>
                            </>
                            : step == 1 ?
                                <>
                                    <ComboControl icon={"signature"}
                                        options={[{ key: 1, value: "Asignatura" }, { key: 2, value: "Seminario" }]}
                                        setValue={setValue} data={"Format"} register={register} error={errors.Format} getValues={getValues} key={4} readOnly={isView}>
                                        Seleccione tipo de espacio curricular *
                                    </ComboControl>
                                    <ComboControl icon={"signature"}
                                        options={[
                                            { key: 1, value: "Anual" },
                                            { key: 2, value: "Bimestral" },
                                            { key: 3, value: "Cuatrimestral" }
                                        ]}
                                        setValue={setValue} data={"Type"} register={register} error={errors.Type} getValues={getValues} key={5} readOnly={isView}>
                                        Seleccione tipo de cursado *
                                    </ComboControl>
                                    <InputControl type={"number"} icon={"nest_clock_farsight_analog"} key={6}
                                        register={register} data={"ContactHour"} error={errors.ContactHour} readonly={isView}>
                                        Ingrese las horas cátedras *
                                    </InputControl>
                                    {
                                        isView ?
                                            <></>
                                            :
                                            <button type="submit" className="add-button">
                                                <span className="material-symbols-outlined">save</span>
                                                {typeModal != "add" ? "Actualizar espacio curricular" : "Crear espacio curricular"}
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