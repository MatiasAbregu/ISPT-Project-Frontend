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
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { UserContext } from '../../context/UserProvider'

export const SchoolYearModal = ({ setModal, getAll }) => {

    const { data, register, handleSubmit, formState: { errors }, reset, setValue } = useForm({ resolver: yupResolver(SchoolYearYUP) })
    const [dataCareers, setDataCareers] = useState([]);
    const [currentCareerId, setCurrentCareerId] = useState(null);
    const [dataCurriculums, setDataCurriculums] = useState([]);
    const { user } = useContext(UserContext);

    const onSubmit = async (data) => {
        let finalData = {
            ...data,
            createdById: user.id || user.ID
        }
        await SchoolYearService.create(finalData)
        setModal(false)
        await getAll()
    }

    const getAllCareers = async () => {
        try
        {
            const res = await CareersService.getAll();
            if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
                const careers = [];
                res.data.object.forEach(element => {
                    careers.push({ key: element.id, value: element.name });
                });
                setDataCareers(careers);
            }

        }
        catch(error)
        {
            if(error.response && error.response.data) {
                const backendResponse = error.response.data;
                toast.error(backendResponse.message);
            }
        }
    }


    const getAllCurriculums = async () => {
        try{
            const res = await CurriculumService.getByCareerId(currentCareerId);
            if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
                const curriculums = [];
                res.data.object.forEach(element => {
                    curriculums.push({ key: element.id, value: element.resolution });
                });
                setDataCurriculums(curriculums);
            }
        }
        catch(error){
            if(error.response && error.response.data) {
                const backendResponse = error.response.data;
                toast.error(backendResponse.message);
            }
        }
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