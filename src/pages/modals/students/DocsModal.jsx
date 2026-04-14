import React from 'react'
import { InputControl } from '../../../components/InputControl'
import '../../../styles/pages/modals/students/DocsModal.css'
import DocsYUP from "../../../schemas/DocsYUP";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const DocsModal = ({ setModal }) => {
    const { register, handleSubmit, formState: { errors }, setValue, watch, data } = useForm({ resolver: yupResolver(DocsYUP) });

    return (
        <article className="docsModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Documentación del alumno</h4>
            <div className="docsContainer">
                <InputControl type={"checkbox"} setValue={setValue} data={"dni"} typeCheckbox={2}>Documento de Identidad Nacional</InputControl>
                <InputControl type={"checkbox"} setValue={setValue} data={"photo"} typeCheckbox={2}>Foto</InputControl>
                <InputControl type={"checkbox"} setValue={setValue} data={"birth"} typeCheckbox={2}>Acta de nacimiento</InputControl>
                <InputControl type={"checkbox"} setValue={setValue} data={"cus"} typeCheckbox={2}>Certificado Único de Salud</InputControl>
                <InputControl type={"checkbox"} setValue={setValue} data={"cds"} typeCheckbox={2}>Certificado de delitos sexuales</InputControl>
                <InputControl type={"checkbox"} setValue={setValue} data={"cbc"} typeCheckbox={2}>Certificado de buena conducta</InputControl>
            </div>
        </article>
    )
}