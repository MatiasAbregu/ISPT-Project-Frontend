import React, { useState, useEffect } from 'react'
import { InputControl } from '../../components/InputControl'
import { DateControl } from '../../components/DateControl'
import '../../styles/pages/careers/ScheduleTemplateModal.css'
import { ComboControl } from '../../components/ComboControl'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import ScheduleTemplateYUP from '../../schemas/careers/ScheduleTemplateYUP'
import { useContext } from 'react'
import { UserContext } from '../../context/UserProvider'
import { TimeControl } from '../../components/TimeControl'
import ScheduleTemplateService from '../../services/careers/ScheduleTemplateService'
import { useParams } from 'react-router'

export const ScheduleTemplateModal = ({ setModal, typeModal, scheduleTemplateId, getAll }) => {

    const { idCommission } = useParams();

    const { data, register, handleSubmit, formState: { errors }, reset, setValue, getValues} = useForm({
        resolver: yupResolver(ScheduleTemplateYUP)
    })

    const { user } = useContext(UserContext);

    const onSubmit = async (data) => {
        try{
            let res;
            if(typeModal == "add"){
                let finalData = {
                    ...data,
                    createdById: user.id || user.ID
                }
                res = await ScheduleTemplateService.create(idCommission, finalData)
            } else {
                let finalData = {
                    ...data,
                    updatedById: user.id || user.ID,
                    Id: scheduleTemplateId
                }
                /*res = await ScheduleTemplateService.update(scheduleTemplateId, finalData)*/
            }
            toast.success(res.data?.object || "¡Operación éxitosa!")
            setModal(false)
            await getAll()
        } catch (error) {
            if(error.response && error.response.data){
                const backendResponse = error.response.data
                toast.error(backendResponse.message)
            } else {
                toast.error("No se pudo conectar con el servidor")
            }
        }
        
    }

    const daysOfWeek = [
        { key: '1', value: 'Lunes' },
        { key: '2', value: 'Martes' },
        { key: '3', value: 'Miércoles' },
        { key: '4', value: 'Jueves' },
        { key: '5', value: 'Viernes' },
        { key: '6', value: 'Sábado' }
    ]

    const loadScheduleTemplate = async () => {
        try{
            const response = await ScheduleTemplateService.getById(scheduleTemplateId)
            if(response.data.statusCode >= 200 && response.data.statusCode < 300){
                const scheduleTemplate = response.data.object

                
                reset({
                    Day: scheduleTemplate.day,
                    StartTime: scheduleTemplate.startTime,
                    EndTime: scheduleTemplate.endTime
                })
                console.log("Schedule template loaded", scheduleTemplate);
            }
        } catch (error) {
            if(error.response && error.response.data){
                const backendResponse = error.response.data
                toast.error(backendResponse.message)
            } else {
                toast.error("No se pudo conectar con el servidor")
            }
        }
    }

    useEffect(() => {
        if (typeModal === "edit") {
            loadScheduleTemplate();
        }
    }, [typeModal]);

    return (
        <article className="scheduleTemplateModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>{typeModal === "add" ? "Crear plantilla de horario" : "Editar plantilla de horario"}</h4>
            <div className="scheduleTemplateFormContainer">
                <form className="scheduleTemplateForm" onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
                    <ComboControl key={1} options={daysOfWeek} icon={"history_edu"} data={"Day"} getValues={getValues} setOption={(value) => {
                        setValue("Day", value);
                    }}>
                        Seleccione un día
                    </ComboControl>
                    <TimeControl key={2} icon={"schedule"} setValue={setValue} register={register} errors={errors.StartTime} getValues={getValues} data="StartTime">
                        Hora de inicio
                    </TimeControl>
                    <TimeControl key={3} icon={"schedule"} setValue={setValue} register={register} errors={errors.EndTime} getValues={getValues} data="EndTime">
                        Hora de fin
                    </TimeControl>
                    <button type="submit" className="add-button">
                        <span className="material-symbols-outlined">save</span>
                        {typeModal === "add" ? "Crear plantilla" : "Actualizar plantilla"}
                    </button>
                </form>
            </div>
        </article>
    )
}