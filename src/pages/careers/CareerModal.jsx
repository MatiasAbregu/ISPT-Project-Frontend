import React, { useEffect } from 'react'
import { InputControl } from '../../components/InputControl'
import { DateControl } from '../../components/DateControl'
import '../../styles/pages/careers/CareerModal.css'
import CareerYUP from '../../schemas/CareerYUP'
import { set, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CareersService from '../../services/careers/CareersService'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { UserContext } from '../../context/UserProvider'

export const CareerModal = ({ setModal, typeModal, careerId, getAll }) => {

    const { data, register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(CareerYUP) })

    const { user } = useContext(UserContext);

    const onSubmit = async (data) => {
        try {
            let res;
            if (typeModal === "add") {
                let finalData = {
                    ...data,
                    createdById: user.id || user.ID
                }
                res = await CareersService.create(finalData)
            } else {
                let finalData = {
                    ...data,
                    updatedById: user.id || user.ID,
                    Id: careerId
                }
                res = await CareersService.update(careerId, finalData)
            }

            toast.success(res.data?.message || "¡Operación éxitosa!");
            setModal(false)
            await getAll()
        } catch (error) {
            if (error.response && error.response.data) {
                const backendResponse = error.response.data;
                toast.error(backendResponse.message);
            } else {
                toast.error("No se pudo conectar con el servidor.");
            }
        }
    }

    const loadCareer = async () => {
        try {
            const response = await CareersService.getById(careerId);
            if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
                const career = response.data.object;
                reset({
                    Name: career.name,
                    Title: career.title
                });
            }
        }
        catch (error) {
            if (error.response && error.response.data) {
                const backendResponse = error.response.data;
                toast.error(backendResponse.message);
            } else {
                toast.error("No se pudo conectar con el servidor.");
            }
        }
    }

    useEffect(() => {
        if (typeModal === "edit") {
            loadCareer();
        }
    }, [typeModal]);

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