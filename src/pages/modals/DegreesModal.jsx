import React, { useEffect, useState } from 'react'
import '../../styles/pages/modals/DegreesModal.css'
import { InputControl } from '../../components/InputControl'
import toast from 'react-hot-toast';
import DegreeService from '../../services/students/DegreeService';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DegreeYUP from '../../schemas/students/DegreeYUP';

export const DegreesModal = ({ setModal, personId }) => {

    const [degrees, setDegrees] = useState(["Ingeniero en sistemas"]);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(DegreeYUP),
        shouldUnregister: false,
        defaultValues: {
            personId: personId
        }
    });

    /*     const addValue = (text) => {
            setDegrees(prev => { return [...prev, text.trim()] })
        } */

    useEffect(() => {
        degreeList(personId);
    }, [personId])

    const degreeList = async (id) => {
        try {
            const res = await DegreeService.getDegreesByPersonId(id);

            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                setDegrees(res.data.object);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const backendResponse = error.response.data;
                toast.error(backendResponse.message);
            } else {
                toast.error("No se pudo conectar con el servidor.");
            }
        }
    }

    const degreeCreate = async (data) => {
        try {
            const res = await DegreeService.createDegree(data);

            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                toast.success(res.data.object);
                await degreeList(personId)
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const backendResponse = error.response.data;
                toast.error(backendResponse.message);
            } else {
                toast.error("No se pudo conectar con el servidor.");
            }
        }
    }

    const degreeDelete = async (degreeId) => {
        try {
            const res = await DegreeService.deleteDegree(degreeId);

            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                toast.success(res.data.object);
                await degreeList(personId)
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const backendResponse = error.response.data;
                toast.error(backendResponse.message);
            } else {
                toast.error("No se pudo conectar con el servidor.");
            }
        }
    }

    return (
        <article className="degreesModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Gestionar títulos de nivel superior/secundaria</h4>
            <div className="degreesFormContainer">
                <form onSubmit={handleSubmit(degreeCreate, e => console.log(e))}>
                    <InputControl type={"add_text"} icon={"history_edu"} register={register} data={"Name"}>
                        Escribe el título a añadir
                    </InputControl>
                    <div className='badge-container'>
                        {degrees && degrees.length > 0 ?
                            degrees.map((v, k) => {
                                return (<p key={v.id} className='badge-title'><span onClick={async () => {
                                    await degreeDelete(v.id);
                                }}>x</span> {v.name}</p>);
                            })
                            : <p className='textInfo'>Aún no hay títulos registrados a esta persona.</p>}
                    </div>
                    <button type="button" className="add-button"
                        onClick={() => setModal(false)}>
                        <span className="material-symbols-outlined">save</span> Guardar cambios
                    </button>
                </form>
            </div>
        </article>
    )
}