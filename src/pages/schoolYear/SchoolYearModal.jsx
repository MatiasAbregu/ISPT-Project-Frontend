import React, { useState, useEffect } from 'react'
import { InputControl } from '../../components/InputControl'
import { DateControl } from '../../components/DateControl'
import '../../styles/pages/schoolYear/SchoolYearModal.css'
import { ComboControl } from '../../components/ComboControl'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import SchoolYearYUP from '../../schemas/SchoolYearYUP'
import SchoolYearService from '../../services/schoolYears/SchoolYearService'
import CareersService from '../../services/careers/CareersService'
import CurriculumService from '../../services/careers/CurriculumService'

export const SchoolYearModal = ({ setModal, getAll }) => {

    const { data, register, handleSubmit, formState: { errors }, reset, setValue } = useForm({ resolver: yupResolver(SchoolYearYUP) })
    const [dataCareers, setDataCareers] = useState([]);
    const [currentCareerId, setCurrentCareerId] = useState(null);
    const [dataCurriculums, setDataCurriculums] = useState([]);

    const onSubmit = async (data) => {
        await SchoolYearService.create(data)
        setModal(false)
        await getAll()
    }

    const getAllCareers = async () => {
            const response = await CareersService.getAll();
            const careers = [];
            response.data.object.forEach(element => {
                careers.push({ key: element.id, value: element.name });
            });
            setDataCareers(careers);
        }

    const getAllCurriculums = async () => {
        let curriculums = [];
        if (!currentCareerId){
            curriculums = [{ key: null, value: 'Seleccione una carrera' }];
            setDataCurriculums(curriculums);
            return;
        }
        const response = await CurriculumService.getByCareerId(currentCareerId);
        curriculums = [];
        response.object.forEach(element => {
            curriculums.push({ key: element.id, value: element.resolution });
        });
        setDataCurriculums(curriculums);
    }
    
    useEffect(() => {
        getAllCareers();
        const currentYear = new Date().getFullYear();
        setValue('SchoolYearNumber', currentYear);
    }, []);

    useEffect(() => {
        getAllCurriculums();
    }, [currentCareerId]);

    return (
        <article className="schoolYearModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Crear ciclo lectivo</h4>
            <div className="schoolYearFormContainer">
                <form className="schoolYearForm" onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
                    <ComboControl options={dataCareers} icon={"history_edu"} returnKey={true} setOption={(value) => {
                        setCurrentCareerId(value);
                    }}>
                        Seleccione una carrera
                    </ComboControl>
                    <ComboControl options={dataCurriculums} key={currentCareerId} data={"CurriculumId"} setOption={(value) => {
                        setValue("CurriculumId", value);
                    }} returnKey={true}
                        icon={"two_pager"}>
                        Seleccione plan de estudio
                    </ComboControl>
                    <button type="submit" className="add-button">
                        <span className="material-symbols-outlined">save</span> Guardar cambios
                    </button>
                </form>
            </div>
        </article>
    )
}