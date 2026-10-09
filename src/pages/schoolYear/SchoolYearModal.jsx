import React, { useState, useEffect, useContext } from 'react'
import { InputControl } from '../../components/InputControl'
import { DateControl } from '../../components/DateControl'
import '../../styles/pages/schoolYear/SchoolYearModal.css'
import { ComboControl } from '../../components/ComboControl'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import SchoolYearYUP from '../../schemas/schoolYear/SchoolYearYUP'
import SchoolYearService from '../../services/schoolYears/SchoolYearService'
import CareersService from '../../services/careers/CareersService'
import CurriculumService from '../../services/careers/CurriculumService'
import toast from 'react-hot-toast'
import { UserContext } from '../../context/UserProvider'

export const SchoolYearModal = ({ setModal, getAll }) => {
    const { register, handleSubmit, formState: { errors }, reset, setValue, watch, getValues } = useForm({ 
        resolver: yupResolver(SchoolYearYUP) 
    });

    const [dataCareers, setDataCareers] = useState([]);
    const [currentCareerId, setCurrentCareerId] = useState(null);
    const [dataCurriculums, setDataCurriculums] = useState([]);
    const [selectedCurriculum, setSelectedCurriculum] = useState(null);
    const [curriculumDuration, setCurriculumDuration] = useState(0); 

    const { user } = useContext(UserContext);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name && name.startsWith("year_")) {
                const selectedYears = [];
                for (let i = 1; i <= curriculumDuration; i++) {
                    if (value[`year_${i}`]) {
                        selectedYears.push(i);
                    }
                }
                setValue("years", selectedYears, { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, curriculumDuration, setValue]);

    const onSubmit = async (data) => {
        let finalData = {
            ...data,
            createdById: user.id || user.ID
        };

        Object.keys(finalData).forEach(key => {
            if (key.startsWith("year_")) {
                delete finalData[key];
            }
        });

        await SchoolYearService.create(finalData);
        setModal(false);
        await getAll();
    };

    const getAllCareers = async () => {
        try {
            const res = await CareersService.getAll();
            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                const careers = [];
                res.data.object.forEach(element => {
                    careers.push({ key: element.id, value: element.name });
                });
                setDataCareers(careers);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            }
        }
    }

    const getAllCurriculums = async () => {
        try {
            const res = await CurriculumService.getByCareerId(currentCareerId);
            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                const curriculums = [];
                res.data.object.forEach(element => {
                    curriculums.push({ 
                        key: element.id, 
                        value: element.resolution,
                        duration: element.duration
                    });
                });
                setDataCurriculums(curriculums);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            }
        }
    }

    const currentYear = new Date().getFullYear();

    const schoolYearsOptions = [
        { key: (currentYear - 2).toString(), value: (currentYear - 2).toString() },
        { key: (currentYear - 1).toString(), value: (currentYear - 1).toString() },
        { key: (currentYear).toString(), value: (currentYear).toString() },
        { key: (currentYear + 1).toString(), value: (currentYear + 1).toString() },
        { key: (currentYear + 2).toString(), value: (currentYear + 2).toString() }
    ];

    useEffect(() => {
        getAllCareers();
    }, []);

    useEffect(() => {
        if (currentCareerId) {
            getAllCurriculums();
        } else {
            setDataCurriculums([]);
            setSelectedCurriculum(null);
            setCurriculumDuration(0);
        }
    }, [currentCareerId]);

    return (
        <article className="schoolYearModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Crear ciclo lectivo</h4>
            <div className="schoolYearFormContainer">
                <form className="schoolYearForm" onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>

                    <ComboControl 
                        options={schoolYearsOptions} 
                        icon={"history_edu"} 
                        data={"SchoolYearNumber"} 
                        returnKey={true} 
                        setOption={(value) => {
                            setValue("SchoolYearNumber", value);
                        }}
                    >
                        Seleccione un año lectivo
                    </ComboControl>

                    <DateControl 
                        icon={"calendar_month"} 
                        data={"StartDate"} 
                        register={register} 
                        error={errors.StartDate}
                        setValue={setValue} 
                        getValues={getValues} 
                        value={watch("StartDate")}
                    >
                        Seleccione fecha de inicio de inscripción
                    </DateControl>

                    <DateControl 
                        icon={"calendar_month"} 
                        data={"EndDate"} 
                        register={register} 
                        error={errors.EndDate}
                        setValue={setValue} 
                        getValues={getValues} 
                        value={watch("EndDate")}
                    >
                        Seleccione fecha de fin de inscripción
                    </DateControl>

                    <ComboControl 
                        options={dataCareers} 
                        icon={"history_edu"} 
                        returnKey={true} 
                        setOption={(value) => {
                            setCurrentCareerId(value);
                            setSelectedCurriculum(null);
                            setCurriculumDuration(0);
                        }}
                    >
                        Seleccione una carrera
                    </ComboControl>

                    <ComboControl 
                        options={dataCurriculums} 
                        key={currentCareerId} 
                        data={"CurriculumId"} 
                        setOption={(value) => {
                            setValue("CurriculumId", value);
                            setSelectedCurriculum(value);
                            const selected = dataCurriculums.find(c => c.key === value);
                            setCurriculumDuration(selected ? selected.duration : 0);
                        }} 
                        returnKey={true} 
                        icon={"two_pager"}
                    >
                        Seleccione plan de estudio
                    </ComboControl>

                    {selectedCurriculum && curriculumDuration > 0 && (
                        <div className="yearsCheckboxContainer">
                            <label className="labelCheckbox">Seleccione los años:</label>
                            <div>
                                {Array.from({ length: curriculumDuration }, (_, index) => index + 1).map((yearNum) => (
                                    <InputControl
                                        key={yearNum}
                                        className="schoolYearModalCheckbox"
                                        type="checkbox"
                                        setValue={setValue}
                                        data={`year_${yearNum}`}
                                        value={yearNum}
                                        register={register}
                                        watch={watch}
                                    >
                                        {yearNum}°
                                    </InputControl>
                                ))}
                            </div>
                        </div>
                    )}

                    <button type="submit" className="add-button">
                        <span className="material-symbols-outlined">save</span> Guardar cambios
                    </button>
                </form>
            </div>
        </article>
    );
};