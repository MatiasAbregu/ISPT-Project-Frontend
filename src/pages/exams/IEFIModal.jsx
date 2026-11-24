import React, { useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl'
import '../../styles/pages/exams/ExamModal.css'
import { ComboControl } from '../../components/ComboControl'
import { StepsControl } from '../../components/StepsControl'
import { DateControl } from '../../components/DateControl'
import { TimeControl } from '../../components/TimeControl'
import SubjectsService from '../../services/careers/SubjectsService'
import IEFIService from '../../services/exams/IEFIService'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import IEFISchema from '../../schemas/exams/IEFISchema'
import { UserContext } from '../../context/UserProvider'
import { useContext } from 'react'

export const IEFIModal = ({ setModal, getAll, iefiId, readOnly = false }) => {
    const { register, handleSubmit, formState: { errors }, reset, setValue, getValues, watch } = useForm({
        resolver: yupResolver(IEFISchema),
        defaultValues: {
            RecordBook: 0,
            PageNumber: 0,
            SubjectId: null,
            Date: null,
            Time: null
        }
    });

    const [step, setStep] = useState(0);
    const [dataSubjects, setDataSubjects] = useState([]);
    const { user } = useContext(UserContext);

    const onSubmit = async (data) => {
        try {
            if (iefiId) {
                await IEFIService.updateIEFI({
                    ...data,
                    Id: iefiId,
                    UpdatedById: user.id || user.ID
                });
                toast.success("¡IEFI actualizado con éxito!");
            } else {
                await IEFIService.create({
                    ...data,
                    CreatedById: user.id || user.ID
                });
                toast.success("¡IEFI creado con éxito!");
            }
            setModal(false);
            await getAll();
        } catch (error) {
            if (error.response?.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error("No se pudo conectar con el servidor.");
            }
        }
    };

    const getAllSubjects = async () => {
        try {
            const res = await SubjectsService.getAll();
            if (res.data?.statusCode >= 200 && res.data?.statusCode < 300) {
                setDataSubjects(res.data.object.map(subject => ({
                    key: subject.id,
                    value: subject.name
                })));
            }
        } catch (error) {
            if (error.response?.data) toast.error(error.response.data.message);
        }
    };

    const getIEFIById = async (id) => {
        try {
            const res = await IEFIService.getIEFIById(id);
            if (res.data?.statusCode >= 200 && res.data?.statusCode < 300) {
                const data = res.data.object;
                reset({
                    Id: data.id,
                    SubjectId: data.subjectId,
                    Date: data.date ? data.date.split('T')[0] : '',
                    Time: data.time,
                    RecordBook: data.recordBook ?? 0,
                    PageNumber: data.pageNumber ?? 0
                });
            }
        } catch (error) {
            if (error.response?.data) toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        getAllSubjects();
    }, []);

    useEffect(() => {
        if (iefiId) getIEFIById(iefiId);
    }, [iefiId]);

    const currentSubjectId = watch("SubjectId");
    const currentDate = watch("Date");
    const currentTime = watch("Time");

    return (
        <article className="examModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>{readOnly ? "Ver datos de IEFI" : iefiId ? "Editar IEFI" : "Crear IEFI"}</h4>
            <div className="examFormContainer">
                <p className="arrow" onClick={() => { if (step > 0) setStep(value => value - 1); }}>&lt;</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {step === 0 ? <>
                        <ComboControl
                            icon="signature"
                            options={dataSubjects}
                            returnKey={true}
                            value={currentSubjectId}
                            setOption={value => setValue("SubjectId", value, { shouldValidate: true })}
                            error={errors.SubjectId}
                            readOnly={readOnly}
                        >
                            Seleccione el espacio curricular *
                        </ComboControl>
                        <DateControl
                            icon="calendar_month"
                            data="Date"
                            register={register}
                            error={errors.Date}
                            key={3}
                            setValue={setValue}
                            getValues={getValues}
                            value={currentDate}
                            readOnly={readOnly}
                        >
                            Seleccione la fecha del IEFI *
                        </DateControl>
                        <TimeControl
                            icon="schedule"
                            data="Time"
                            register={register}
                            error={errors.Time}
                            key={4}
                            setValue={setValue}
                            getValues={getValues}
                            value={currentTime}
                            readOnly={readOnly}
                        >
                            Seleccione la hora del IEFI *
                        </TimeControl>
                    </> : <>
                        <InputControl type="number" icon="counter_1" data="RecordBook" register={register} error={errors.RecordBook} readonly={readOnly}>
                            Ingrese el número del libro
                        </InputControl>
                        <InputControl type="number" icon="counter_1" data="PageNumber" register={register} error={errors.PageNumber} readonly={readOnly}>
                            Ingrese el número del folio
                        </InputControl>
                        {!readOnly && <button type="submit" className="add-button">
                            <span className="material-symbols-outlined">save</span>
                            {iefiId ? "Guardar cambios" : "Crear IEFI"}
                        </button>}
                    </>}
                </form>
                <p className="arrow" onClick={() => { if (step < 1) setStep(value => value + 1); }}>&gt;</p>
            </div>
            <StepsControl stepsQuantity={2} setStep={setStep} step={step} />
        </article>
    );
};
