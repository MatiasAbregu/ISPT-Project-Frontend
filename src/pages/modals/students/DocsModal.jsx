import React from 'react'
import { InputControl } from '../../../components/InputControl'
import '../../../styles/pages/modals/students/DocsModal.css'
import DocsYUP from "../../../schemas/DocsYUP";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const DocsModal = ({ setModal }) => {
    const { register, setValue, watch, data } = useForm({ resolver: yupResolver(DocsYUP) });

    return (
        <article className="docsModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Documentación del alumno</h4>
            <div className="docsContainer">
                <InputControl type={"checkbox"} setValue={setValue} data={"dni"} register={register} watch={watch}>Documento de Identidad Nacional</InputControl>
                <InputControl type={"checkbox"} setValue={setValue} data={"photo"} register={register} watch={watch}>Foto</InputControl>
                <InputControl type={"checkbox"} setValue={setValue} data={"birth"} register={register} watch={watch}>Acta de nacimiento</InputControl>
                <InputControl type={"checkbox"} setValue={setValue} data={"cus"} register={register} watch={watch}>Certificado Único de Salud</InputControl>
                <InputControl type={"checkbox"} setValue={setValue} data={"cds"} register={register} watch={watch}>Certifificado de no inscripción en el registro de delitos sexuales</InputControl>
                <InputControl type={"checkbox"} setValue={setValue} data={"cbc"} register={register} watch={watch}>Certificado de buena conducta</InputControl>
            </div>
        </article>
    )
}