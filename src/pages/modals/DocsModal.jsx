import React from 'react'
import { InputControl } from '../../components/InputControl'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Table } from '../../components/Table';
import DocsYUP from "../../schemas/DocsYUP";
import '../../styles/pages/modals/DocsModal.css'

export const DocsModal = ({ setModal, typeDoc }) => {
    const { register, setValue, watch, data } = useForm({ resolver: yupResolver(DocsYUP) });

    return (
        <article className="docsModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Documentación {typeDoc == "teacher" ? " del docente" : "del alumno"}</h4>
            <div className="docsFormContainer">
                {
                    typeDoc != "teacher" ?
                        <>
                            <div className='docsOnlyOnce'>
                                <label className='titleDocs'>Entregables una vez</label>
                                <div className='docs'>
                                    <InputControl type={"checkbox"} setValue={setValue} data={"dni"} register={register} watch={watch}>Documento de Identidad Nacional</InputControl>
                                    <InputControl type={"checkbox"} setValue={setValue} data={"photo"} register={register} watch={watch}>Foto</InputControl>
                                    <InputControl type={"checkbox"} setValue={setValue} data={"birth"} register={register} watch={watch}>Acta de nacimiento</InputControl>
                                </div>
                            </div>
                        </> : <></>
                }
                <div className='docsPerYear'>
                    <label className='titleDocs'>Entregables anualmente</label>
                    <div className='docs'></div>
                    {typeDoc == "teacher" ?
                        <Table columns={[
                            { name: "Año", width: 100 },
                            { name: "Certificado de no inscripción en el registro de delitos sexuales", width: 150 },
                            { name: "Certificado de Antecedentes Penales", width: 150 },
                            { name: "Certificado de no inscripción en el registro de deudores alimentarios morosos", width: 125 },
                            { name: "Constancia de servicios", width: 125 }]}
                            checkboxs={true}
                            data={[
                                { year: "2025", cus: { cus: "¿Entregado?", check: true }, cds: { cds: "¿Entregado?", check: true }, cda: { cda: "¿Entregado?", check: true }, cs: { cs: "¿Entregado?", check: true } },
                                { year: "2026", cus: { cus: "¿Entregado?", check: true }, cds: { cds: "¿Entregado?", check: true }, cda: { cda: "¿Entregado?", check: true }, cs: { cs: "¿Entregado?", check: true } }]} />
                        :
                        <Table columns={[
                            { name: "Año", width: 100 },
                            { name: "Certificado Único de Salud", width: 150 },
                            { name: "Certificado de no inscripción en el registro de delitos sexuales", width: 150 },
                            { name: "Certificado de Antecedentes", width: 125 },]}
                            checkboxs={true}
                            data={[
                                { year: "2025", cus: { cus: "Entregado", check: true }, cds: { cds: "Entregado", check: true }, cda: { cda: "Entregado", check: true } },
                                { year: "2026", cus: { cus: "Entregado", check: true }, cds: { cds: "Entregado", check: true }, cda: { cda: "Entregado", check: true } }]} />}
                </div>
                <button type="button" className="add-button"
                    onClick={() => setModal(false)}>
                    <span className="material-symbols-outlined">save</span> Guardar cambios
                </button>
            </div>
        </article>
    )
}