import React, { useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl'
import '../../styles/pages/exams/ExamModal.css'
import { ComboControl } from '../../components/ComboControl'
import { StepsControl } from '../../components/StepsControl'
import { DateControl } from '../../components/DateControl'
import { TimeControl } from '../../components/TimeControl'
import SubjectsService from '../../services/careers/SubjectsService'
import TeacherService from '../../services/teachers/TeacherService'
import FinalExamService from '../../services/exams/FinalExamService'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FinalExamYUP from '../../schemas/exams/FinalExamYUP'
import { useContext } from 'react'
import { UserContext } from '../../context/UserProvider'

export const ExamModal = ({ setModal, getAll }) => {

    const { data, register, handleSubmit, formState: { errors }, reset, setValue, getValues, watch } = useForm({ resolver: yupResolver(FinalExamYUP) })
    const [step, setStep] = useState(0);
    const [dataSubjects, setDataSubjects] = useState([]);
    const [dataTeachers, setDataTeachers] = useState([]);
    const { user } = useContext(UserContext);

    const onSubmit = async (data) => {
       let finalData = {
                   ...data,
                   createdById: user.id || user.ID
               }
               await FinalExamService.create(finalData)
               setModal(false)
               await getAll()
    }

    const getAllSubjects = async () => {
        try {
            const res = await SubjectsService.getAll();
            if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
                const subjects = [];
                res.data.object.forEach(element => {
                    subjects.push({ key: element.id, value: element.name });
                });
                setDataSubjects(subjects);
            }
        } catch (error) {
            if(error.response && error.response.data) {
                const backendResponse = error.response.data;
                toast.error(backendResponse.message);
            }
        }
    }
    
    const getAllTeachers = async () => {
        try {
            const res = await TeacherService.getAllTeachers();
            if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
                const teachers = [];
                res.data.object.forEach(element => {
                    teachers.push({ key: element.id, value: `${element.firstname} ${element.lastname}` });
                });
                setDataTeachers(teachers);
            }
        } catch (error) {
            if(error.response && error.response.data) {
                const backendResponse = error.response.data;
                toast.error(backendResponse.message);
            }
        }
    }

    useEffect(() => {
        getAllSubjects();
        getAllTeachers();
    }, []);

    return (
        <article className="examModal">
            <span class="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Crear mesa de examen</h4>
            <div className="examFormContainer">
                <p className="arrow" onClick={() => {
                    if (step > 0) setStep(prev => prev - 1);
                }}>&lt;</p>
                <form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
                    {
                        step == 0 ?
                            <>
                                <ComboControl icon={"signature"}
                                    options={dataSubjects} returnKey={true} setOption={(value) => {
                                        setValue("SubjectId", value);
                                    }}>
                                    Seleccione la materia *
                                </ComboControl>
                                <ComboControl icon={"person"}
                                    options={dataTeachers} returnKey={true} setOption={(value) => {
                                        setValue("PersonId", value);
                                    }}>
                                    Seleccione el docente titular de la mesa *
                                </ComboControl>
                                <DateControl icon={"calendar_month"} data={"Date"} register={register} error={errors.Date} key={3}
                                setValue={setValue} getValues={getValues} value={watch("Date")}>
                                    Seleccione la fecha del examen *
                                </DateControl>
                                <TimeControl icon={"schedule"} data={"Time"} register={register} error={errors.Time} key={4}
                                setValue={setValue} getValues={getValues} value={watch("Time")}>
                                    Seleccione la hora del examen *
                                </TimeControl>
                            </>
                            : step == 1 ?
                                <>
                                    <InputControl type={"number"} icon={"counter_1"} key={5} data={"RecordBook"} register={register} error={errors.RecordBook}>
                                        Ingrese el número del libro
                                    </InputControl>
                                    <InputControl type={"number"} icon={"counter_1"} key={6} data={"PageNumber"} register={register} error={errors.PageNumber}>
                                        Ingrese el número del folio
                                    </InputControl>
                                    <button type="submit" className="add-button">
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