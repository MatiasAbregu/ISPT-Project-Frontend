import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { InputControl } from '../../components/InputControl'
import { ComboControl } from '../../components/ComboControl'
import { StepsControl } from '../../components/StepsControl'
import { DateControl } from '../../components/DateControl'
import { UserContext } from '../../context/UserProvider'
import TeacherService from '../../services/teachers/TeacherService'
import TeacherAssignationYUP from '../../schemas/teachers/TeacherAssignationYUP'

import '../../styles/pages/teachers/AssignationModal.css'
import toast from 'react-hot-toast'
import TeacherAssignationService from '../../services/teachers/TeacherAssignationService'

export const AssignationModal = ({ setModal, typeModal, teacherDivisionId = 0, getAllTeachersByDivision, divisionId }) => {

    const [step, setStep] = useState(0);
    const { user } = useContext(UserContext);
    const [teachers, setTeachers] = useState([]);

    const { register, handleSubmit, formState: { errors }, setValue, getValues, clearErrors, watch, reset } = useForm({
        resolver: yupResolver(TeacherAssignationYUP), defaultValues: {
            divisionId: divisionId
        }
    });

    useEffect(() => {
        if (teacherDivisionId != 0) getTeacherDivisionById(teacherDivisionId);
    }, [teacherDivisionId]);

    useEffect(() => {
        getTeachers();
    }, [])

    const parseValidDate = (dateString) => {
        if (!dateString) return null;

        const date = new Date(dateString);
        return !isNaN(date.getTime()) && date.getFullYear() > 1100 ? date : null;
    };

    // REQUESTS
    // POST
    const createOrUpdateStudent = async (data) => {
        let finalData;
        if (typeModal == 1) {
            finalData = {
                ...data,
                createdById: user.id || user.ID
            }
        } else if (typeModal == 3) {
            finalData = {
                ...data,
                updatedById: user.id || user.ID,
                Id: teacherDivisionId
            }
        }

        try {
            const res = typeModal == 1 ? await TeacherAssignationService.assignTeacher(finalData)
                : await TeacherAssignationService.updateAssignation(finalData);
            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                toast.success(res.data.object);
                setModal(false);
                getAllTeachersByDivision();
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

    // GET
    const getTeacherDivisionById = async (id) => {
        try {
            const res = await TeacherAssignationService.getTeacherDivisionById(id);

            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                const data = res.data.object;

                reset({
                    teacherId: data.teacherId,
                    divisionId: data.divisionId,
                    teacherStatus: data.teacherStatus,
                    startDate: new Date(data.startDate),
                    endDate: parseValidDate(data.endDate),
                    observations: data.observations,
                })
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

    const getTeachers = async () => {
        try {
            const res = await TeacherService.getAllTeachers();

            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                const data = res.data.object;
                const teachersData = data.map((d, i) => {
                    return { key: d.id, value: `${d.firstname} ${d.lastname} (DNI: ${d.documentNumber})` }
                });
                setTeachers(teachersData);
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
    //

    return (
        <article className="assignationModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>{typeModal == 1 ? "Asignar docente a la división" :
                typeModal == 2 ? "Ver docente asignado a la división" : "Actualizar docente asignado a la división"}</h4>
            <div className="assignationFormContainer">
                <p className="arrow" onClick={() => {
                    if (step > 0) setStep(prev => prev - 1);
                }}>&lt;</p>
                <form onSubmit={handleSubmit(createOrUpdateStudent, (e) => console.log(e))}>
                    {
                        step == 0 ?
                            <>
                                <ComboControl icon={"person"} readOnly={typeModal == 2 ? true : false} options={teachers}
                                    setValue={setValue} data={"teacherId"} getValues={getValues} error={errors.teacherId}
                                    value={watch("teacherId")} clearErrors={clearErrors} returnKey={true} key={1}>
                                    Seleccione el docente *
                                </ComboControl>
                                <ComboControl icon={"wb_twilight"} readOnly={typeModal == 2 ? true : false} returnKey={true}
                                    options={[{ key: 1, value: "Titular" }, { key: 2, value: "Suplente" }, { key: 3, value: "Interino" },
                                    { key: 4, value: "EACI" }]} setValue={setValue} data={"teacherStatus"} getValues={getValues}
                                    error={errors.teacherStatus} value={watch("teacherStatus")} clearErrors={clearErrors} key={2}>
                                    Seleccione situación de revista *
                                </ComboControl>
                                <DateControl icon={"calendar_clock"} readOnly={typeModal == 2 ? true : false}
                                    setValue={setValue} data={"startDate"} value={watch("startDate")} getValues={getValues}
                                    error={errors.startDate} clearErrors={clearErrors} key={3}>
                                    Fecha de inicio *
                                </DateControl>
                                <DateControl icon={"schedule"} readOnly={typeModal == 2 ? true : false}
                                    setValue={setValue} data={"endDate"} value={watch("endDate")} getValues={getValues}
                                    error={errors.endDate} clearErrors={clearErrors} key={4}>
                                    Fecha de fin
                                </DateControl>
                            </>
                            : step == 1 ?
                                <>
                                    <InputControl type={"textarea"} icon={"visibility"} register={register} data={"observations"}
                                        readonly={typeModal == 2 ? true : false} error={errors.observations} key={5}>
                                        Observaciones
                                    </InputControl>
                                    {
                                        typeModal == 2 ? <></> :
                                            <button type="submit" className="add-button">
                                                <span className="material-symbols-outlined">save</span>
                                                {typeModal != 1 ? "Actualizar docente asignado a la división"
                                                    : "Asignar docente a la división"}
                                            </button>
                                    }
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