import React, { useEffect } from 'react'
import '../../styles/pages/careers/CurriculumModal.css'
import { InputControl } from '../../components/InputControl'
import CurriculumYUP from '../../schemas/CurriculumYUP'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CurriculumService from '../../services/careers/curriculum'
import { DateControl } from '../../components/DateControl'

export const CurriculumModal = ({ setModal, typeModal, careerId, curriculumId, getByCareerId}) => {

    const { register, handleSubmit, setValue, getValues, formState: { errors }, reset } = useForm({ resolver: yupResolver(CurriculumYUP) })

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
            await CurriculumService.create(data)
        } else {
            data = { ...data, Id: curriculumId }
            await CurriculumService.update(curriculumId, data)
        }
        setModal(false)
        await getByCareerId(careerId)
    }

 const loadCurriculum = async () => {
        const response = await CurriculumService.getById(curriculumId);

        const curriculum = response.data;

        reset({
            Resolution: curriculum.resolution,
            Duration: curriculum.duration,
            StartDate: curriculum.startDate ? new Date(curriculum.startDate) : null,
            EndDate: curriculum.endDate ? new Date(curriculum.endDate) : null,
            VigencyDate: curriculum.vigencyDate ? new Date(curriculum.vigencyDate) : null
        });

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
                    setValue={setValue} getValues={getValues} >
                        Seleccione la fecha de inicio de la carrera *
                    </DateControl>
                    <DateControl icon={"calendar_month"} data={"EndDate"} register={register} error={errors.EndDate}
                    setValue={setValue} getValues={getValues} >
                        Seleccione la fecha de fin de la carrera *
                    </DateControl>
                    <DateControl icon={"calendar_month"} data={"VigencyDate"} register={register} error={errors.VigencyDate}
                    setValue={setValue} getValues={getValues} >
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