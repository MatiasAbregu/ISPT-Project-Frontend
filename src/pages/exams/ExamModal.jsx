import React, { useEffect, useState, useCallback, useContext } from 'react'
import { InputControl } from '../../components/InputControl'
import '../../styles/pages/exams/ExamModal.css'
import { ComboControl } from '../../components/ComboControl'
import { StepsControl } from '../../components/StepsControl'
import { DateControl } from '../../components/DateControl'
import { TimeControl } from '../../components/TimeControl'
import SubjectsService from '../../services/careers/SubjectsService'
import FinalExamService from '../../services/exams/FinalExamService'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FinalExamYUP from '../../schemas/exams/FinalExamYUP'
import { UserContext } from '../../context/UserProvider'
import { ExamTribunalModal } from './ExamTribunalModal'

export const ExamModal = ({ setModal, getAll, examId, readOnly = false }) => {

    const { register, handleSubmit, formState: { errors }, reset, setValue, getValues, watch } =
        useForm({
            resolver: yupResolver(FinalExamYUP),
            defaultValues: {
                RecordBook: 0,
                PageNumber: 0,
                Tribunal: null,
                subjectId: null,
                Date: null,
                Time: null
            }
        });

    const [step, setStep] = useState(0);
    const [dataSubjects, setDataSubjects] = useState([]);
    const [tribunal, setTribunal] = useState(null);
    const [tribunalModal, setTribunalModal] = useState(false);
    const { user } = useContext(UserContext);

    const handleSubjectChange = useCallback((value) => {
        setValue("subjectId", value, { shouldValidate: true });
    }, [setValue]);

    const handleSetTribunal = (newTribunalData) => {
        setTribunal(newTribunalData);
        setValue("Tribunal", newTribunalData, { shouldValidate: true });
    };

    const onSubmit = async (data) => {
        try {
            if (examId) {
                const finalData = {
                    ...data,
                    Id: examId,
                    UpdatedById: user.id || user.ID
                };
                await FinalExamService.updateExam(finalData);
                toast.success("¡Mesa de examen actualizada con éxito!");
            } else {
                const finalData = {
                    ...data,
                    createdById: user.id || user.ID
                };
                await FinalExamService.create(finalData);
                toast.success("¡Mesa de examen creada con éxito!");
            }
            setModal(false);
            await getAll();
        } catch (error) {
            if (error.response?.data) {
                toast.error(error.response.data.message);
            }
        }
    };

    const getAllSubjects = async () => {
        try {
            const res = await SubjectsService.getAll();
            if (res.data?.statusCode >= 200 && res.data?.statusCode < 300) {
                const subjects = res.data.object.map(element => ({
                    key: element.id,
                    value: element.name
                }));
                setDataSubjects(subjects);
            }
        } catch (error) {
            if (error.response?.data) {
                toast.error(error.response.data.message);
            }
        }
    };

    const getFinalExamById = async (id) => {
        if (!id) return;

        try {
            const res = await FinalExamService.getFinalExamById(id);
            if (res.data?.statusCode >= 200 && res.data?.statusCode < 300) {
                const data = res.data.object;

                const tribunalData = {
                    PresidentId: data.tribunal?.presidentId ?? data.tribunal?.PresidentId ?? null,
                    Vocal1Id: data.tribunal?.vocal1Id ?? data.tribunal?.Vocal1Id ?? null,
                    Vocal2Id: data.tribunal?.vocal2Id ?? data.tribunal?.Vocal2Id ?? null
                };

                const formattedDate = data.date ? data.date.split('T')[0] : '';
                setTribunal(tribunalData);

                reset({
                    Id: data.id,
                    Date: formattedDate,
                    Time: data.time,
                    PageNumber: data.pageNumber ?? 0,
                    RecordBook: data.recordBook ?? 0,
                    subjectId: data.subjectId,
                    Tribunal: tribunalData
                });
            }
        } catch (error) {
            if (error.response?.data) {
                toast.error(error.response.data.message);
            }
        }
    };

    useEffect(() => {
        getAllSubjects();
    }, []);

    useEffect(() => {
        if (examId) {
            getFinalExamById(examId);
        }
    }, [examId]);

    const currentSubjectId = watch("subjectId");
    const currentDate = watch("Date");
    const currentTime = watch("Time");

    return (
        <article className="examModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>{readOnly ? "Ver datos de mesa de examen" : examId ? "Editar mesa de examen" : "Crear mesa de examen"}</h4>
            <div className="examFormContainer">
                {
                    !tribunalModal ?
                        <>
                            <p className="arrow" onClick={() => {
                                if (step > 0) setStep(prev => prev - 1);
                            }}>&lt;</p>
                            <form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
                                {
                                    step === 0 ?
                                        <>
                                            <ComboControl
                                                icon={"signature"}
                                                options={dataSubjects}
                                                returnKey={true}
                                                value={currentSubjectId}
                                                setOption={handleSubjectChange}
                                                error={errors.subjectId}
                                                readOnly={readOnly}
                                            >
                                                Seleccione la materia *
                                            </ComboControl>

                                            <button className='tribunal-btn' type='button' onClick={() => setTribunalModal(true)}>
                                                <span className="material-symbols-outlined">
                                                    balance
                                                </span>
                                                {readOnly ?
                                                    "Ver tribunal" :
                                                    tribunal ? "Modificar tribunal seleccionado" : "Seleccionar docentes del tribunal *"
                                                }
                                            </button>
                                            {errors.Tribunal && <span className="error-text">Debe seleccionar el tribunal</span>}

                                            <DateControl
                                                icon={"calendar_month"}
                                                data={"Date"}
                                                register={register}
                                                error={errors.Date}
                                                key={3}
                                                setValue={setValue}
                                                getValues={getValues}
                                                value={currentDate}
                                                readOnly={readOnly}
                                            >
                                                Seleccione la fecha del examen *
                                            </DateControl>

                                            <TimeControl
                                                icon={"schedule"}
                                                data={"Time"}
                                                register={register}
                                                error={errors.Time}
                                                key={4}
                                                setValue={setValue}
                                                getValues={getValues}
                                                value={currentTime}
                                                readOnly={readOnly}
                                            >
                                                Seleccione la hora del examen *
                                            </TimeControl>
                                        </>
                                        : step === 1 ?
                                            <>
                                                <InputControl
                                                    type={"number"}
                                                    icon={"counter_1"}
                                                    key={5}
                                                    data={"RecordBook"}
                                                    register={register}
                                                    error={errors.RecordBook}
                                                    readonly={readOnly}
                                                >
                                                    Ingrese el número del libro
                                                </InputControl>

                                                <InputControl
                                                    type={"number"}
                                                    icon={"counter_1"}
                                                    key={6}
                                                    data={"PageNumber"}
                                                    register={register}
                                                    error={errors.PageNumber}
                                                    readonly={readOnly}
                                                >
                                                    Ingrese el número del folio
                                                </InputControl>

                                                {
                                                    !readOnly ?
                                                        <button type="submit" className="add-button">
                                                            <span className="material-symbols-outlined">save</span>
                                                            {examId ? "Guardar cambios" : "Crear mesa de examen"}
                                                        </button> : undefined
                                                }
                                            </>
                                            : undefined
                                }
                            </form>
                            <p className="arrow" onClick={() => {
                                if (step < 1) setStep(prev => prev + 1);
                            }}>&gt;</p>
                        </>
                        : <ExamTribunalModal readOnly={readOnly} setModal={setTribunalModal} setData={handleSetTribunal}
                            initialData={tribunal} />
                }
            </div>
            <StepsControl stepsQuantity={2} setStep={setStep} step={step} />
        </article>
    )
}