import React, { useEffect } from 'react'
import { InputControl } from '../../components/InputControl'
import { DateControl } from '../../components/DateControl'
import '../../styles/pages/careers/CareerModal.css'
import CareerYUP from '../../schemas/CareerYUP'
import { set, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CareersService from '../../services/careers/careers'

export const CareerModal = ({ setModal, typeModal, careerId, getAll }) => {

    const { data, register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(CareerYUP) })

    const onSubmit = async (data) => {
        if (typeModal === "add") {
            await CareersService.create(data)
        } else {
            data = { ...data, Id: careerId }
            await CareersService.update(careerId, data)
        }
        setModal(false)
        await getAll()
    }

    return (
        <article className="careerModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>{typeModal === "add" ? "Agregar carrera" : "Editar carrera"}</h4>
            <div className="careerFormContainer">
                <form className="careerForm" onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
                    <InputControl label={"Carrera"} icon={"badge"} type={"textbox"} data={"Name"} register={register} error={errors.Name}>Nombre de la carrera</InputControl>
                    <InputControl label={"Título"} icon={"alarm"} type={"textbox"} data={"Title"} register={register} error={errors.Title}>Título con el que se recibe</InputControl>
                    <button type="submit" className="add-button">
                        <span className="material-symbols-outlined">save</span> {typeModal === "add" ? "Guardar cambios" : "Actualizar cambios"}
                    </button>
                </form>
            </div>
        </article>
    )
}