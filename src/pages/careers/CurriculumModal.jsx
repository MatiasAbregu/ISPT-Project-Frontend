import React, { useEffect } from 'react'
import '../../styles/pages/careers/CurriculumModal.css'
import { InputControl } from '../../components/InputControl'
import CurriculumYUP from '../../schemas/CurriculumYUP'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CurriculumService from '../../services/careers/CurriculumService'
import { DateControl } from '../../components/DateControl'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { UserContext } from '../../context/UserProvider'

export const CurriculumModal = ({ setModal, typeModal, careerId, curriculumId, getByCareerId}) => {

    const { register, handleSubmit, setValue, getValues, formState: { errors }, reset, watch } = useForm({ resolver: yupResolver(CurriculumYUP) })
    const { user } = useContext(UserContext);

  useEffect(() => {
    register("StartDate");
    register("EndDate");
    register("VigencyDate");

    if (typeModal === "add" || !curriculumId) return;
    loadCurriculum();
}, [register, curriculumId, typeModal]);

    const onSubmit = async (data) => {

        data = {
            ...data,
            CareerId: careerId
        }

        console.log(data);
        if (typeModal === "add") {
            let finalData = {
                ...data,
                createdById: user.id || user.ID
            }
            await CurriculumService.create(finalData)
        } else {
            let finalData = {
                ...data,
                updatedById: user.id || user.ID,
                Id: curriculumId
            }
            await CurriculumService.update(curriculumId, finalData)
        }
        setModal(false)
        await getByCareerId(careerId)
    }

 const loadCurriculum = async () => {
        try{
            const res = await CurriculumService.getById(curriculumId)
            if(res.data.statusCode >= 200 && res.data.statusCode < 300){
                const curriculum = res.data.object
                reset({
                    Resolution: curriculum.resolution,
                    Duration: curriculum.duration,
                    StartDate: curriculum.startDate ? new Date(curriculum.startDate) : null,
                    EndDate: curriculum.endDate ? new Date(curriculum.endDate) : null,
                    VigencyDate: curriculum.vigencyDate ? new Date(curriculum.vigencyDate) : null
                });
            }
        } 
        catch (error) {
            if (error.response && error.response.data) {
                const backendResponse = error.response.data;
                toast.error(backendResponse.message);
            } else {
                toast.error("Error al cargar el plan de estudios");
            }
        }

    }


    return (
        <article className="curriculumModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>{typeModal === "add" ? "Agregar plan de estudio" : "Editar plan de estudio"}</h4>
            <div className="curriculumFormContainer">
                <form className="curriculumForm" onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
                    <InputControl label={"Plan de estudio"} icon={"contract_edit"} data={"Resolution"} register={register} error={errors.Resolution}>Ingrese la resolución</InputControl>
                    <InputControl label={"Duración"} icon={"timer"} type={"number"} data={"Duration"} register={register} error={errors.Duration}>Ingrese la duración</InputControl>
                    <DateControl icon={"calendar_month"} data={"StartDate"} register={register} error={errors.StartDate}
                    setValue={setValue} getValues={getValues} value={watch("StartDate")}>
                        Seleccione la fecha de inicio de la carrera *
                    </DateControl>
                    <DateControl icon={"calendar_month"} data={"EndDate"} register={register} error={errors.EndDate}
                    setValue={setValue} getValues={getValues} value={watch("EndDate")}>
                        Seleccione la fecha de fin de la carrera *
                    </DateControl>
                    <DateControl icon={"calendar_month"} data={"VigencyDate"} register={register} error={errors.VigencyDate}
                    setValue={setValue} getValues={getValues} value={watch("VigencyDate")}>
                        Seleccione la fecha de vigencia de la carrera *
                    </DateControl>
                    <button type="submit" className="add-button">
                        <span className="material-symbols-outlined">save</span> {typeModal === "add" ? "Guardar cambios" : "Actualizar cambios"}
                    </button>
                </form>
            </div>
        </article>
    )
}