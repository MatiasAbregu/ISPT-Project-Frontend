import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { InputControl } from '../../components/InputControl';
import { ComboControl } from '../../components/ComboControl';
import CareersService from '../../services/careers/CareersService'
import CurriculumService from '../../services/careers/CurriculumService'
import toast from 'react-hot-toast';
import { UserContext } from '../../context/UserProvider'

import '../../styles/pages/students/FolderModal.css'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FileYUP from '../../schemas/students/FileYUP';
import FileService from '../../services/students/FileService';
import { DocsModal } from '../modals/DocsModal';

export const FolderModal = ({ setModal, studentId }) => {
    const navigate = useNavigate();
    const [creatingFile, setCreatingFile] = useState(0);
    const [files, setFiles] = useState([]);
    const [careers, setCareers] = useState([]);
    const [careerDBId, setCareerDBId] = useState(0);
    const [curriculums, setCurriculums] = useState([]);
    const { user } = useContext(UserContext);

    const [docsModal, setDocsModal] = useState(false);
    const [selectedFileId, setSelectedFileId] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue, getValues, clearErrors, reset, watch } = useForm({
        resolver: yupResolver(FileYUP),
        shouldUnregister: false,
        defaultValues: {
            studentId: studentId
        }
    });

    useEffect(() => {
        getFilesByStudentId(studentId);
    }, [studentId])

    useEffect(() => {
        getCarreers();
        setCareerDBId(0);
        setCurriculums([]);
        reset({
            Id: undefined,
            code: "",
            curriculumId: null,
            studentId: studentId,
            status: null
        });
    }, [creatingFile])

    useEffect(() => {
        if (careerDBId != 0) getCurriculums(careerDBId);
    }, [careerDBId]);

    // CRUD METHODS
    const getCarreers = async () => {
        try {
            const response = await CareersService.getAll();
            if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
                const data = response.data.object;
                const careersData = data.map((v, k) => {
                    return { key: v.id, value: v.name };
                })
                setCareers(careersData);
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

    const getCurriculums = async (careerId) => {
        try {
            const response = await CurriculumService.getByCareerId(careerId);
            if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
                const data = response.data.object;
                const curriculumData = data.map((v, k) => {
                    return { key: v.id, value: v.resolution };
                })
                setCurriculums(curriculumData);
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

    const getFilesByStudentId = async (id) => {
        try {
            const res = await FileService.getFilesByStudentId(id);
            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                const data = res.data.object;
                setFiles(data);
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data) {
                const backendResponse = error.response.data;
                toast.error(backendResponse.message);
            } else {
                toast.error("No se pudo conectar con el servidor.");
            }
        }
    }

    const getFileById = async (id) => {
        try {
            const res = await FileService.getFileById(id);
            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                const data = res.data.object;
                setCareerDBId(data.careerId);
                reset({
                    Id: data.id,
                    code: data.code,
                    curriculumId: data.curriculumId,
                    studentId: studentId,
                    status: data.status
                })
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data) {
                const backendResponse = error.response.data;
                toast.error(backendResponse.message);
            } else {
                toast.error("No se pudo conectar con el servidor.");
            }
        }
    }

    const createOrUpdateFile = async (data) => {
        let finalData;
        if (creatingFile == 1) {
            finalData = {
                ...data,
                createdById: user.id || user.ID
            }
        } else if (creatingFile == 2) {
            finalData = {
                ...data,
                updatedById: user.id || user.ID,
            }
        }

        try {
            const res = creatingFile == 1 ? await FileService.createFile(finalData) : await FileService.updateFile(finalData);
            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                toast.success(res.data.object);
                setCreatingFile(0);
                await getFilesByStudentId(studentId);
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

    // *************

    return (
        <article className="folderModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>
                cancel
            </span>

            <h3>{!docsModal ? "Legajos del estudiante" : "Documentos del legajo"}</h3>
            <div className="folderContainer">
                {
                    !docsModal ?
                        creatingFile == 0 ?
                            <>
                                <button className='add-button' onClick={() => setCreatingFile(1)}>
                                    <span className="material-symbols-outlined">add_circle</span>Añadir legajo
                                </button>
                                <div className='folderList'>
                                    {files && files.length > 0 ?
                                        files.map((f, index) => (
                                            <div key={index} className={`folderCard ${f.status == "Activo" ? "" : "inactive"}`}>
                                                <div className="folderHeader">
                                                    <span className="material-symbols-outlined folderIcon">folder</span>
                                                    <h5>{f.career}</h5>
                                                    <span className={`badge ${f.status.toLowerCase()}`}>{f.status}</span>
                                                </div>

                                                <div className="folderBody">
                                                    <p><strong>Legajo:</strong> {f.code}</p>
                                                    <p><strong>Plan:</strong> {f.curriculum}</p>
                                                </div>

                                                <div className='folderBtnContainer'>
                                                    <span className="material-symbols-outlined editBtn" onClick={async () => {
                                                        setSelectedFileId(f.id);
                                                        setDocsModal(true);
                                                    }}>
                                                        docs
                                                    </span>
                                                    <span className="material-symbols-outlined editBtn" onClick={async () => {
                                                        setCreatingFile(2);
                                                        await getFileById(f.id);
                                                    }}>
                                                        edit
                                                    </span>
                                                    <button className="file-button"
                                                        onClick={() => navigate(`/estudiantes/${f.id}/espacios-curriculares`)}>
                                                        <span className="material-symbols-outlined">
                                                            visibility
                                                        </span>
                                                        Ver espacios curriculares
                                                    </button>
                                                </div>
                                            </div>
                                        )) :
                                        <div className='infoDiv'>
                                            <hr />
                                            <h4>¡Este estudiante aún no cuenta con legajos!</h4>
                                        </div>}
                                </div>
                            </> :
                            <>
                                <form onSubmit={handleSubmit(createOrUpdateFile, e => console.log(e))}>
                                    <div className='btnContainer'>
                                        <button className='cancel-button' onClick={() => setCreatingFile(0)}>
                                            <span className="material-symbols-outlined">cancel</span>Cancelar
                                        </button>
                                        <button className='add-button'>
                                            <span className="material-symbols-outlined">add_circle</span>
                                            {creatingFile == 1 ? "Crear legajo" : "Actualizar legajo"}
                                        </button>
                                    </div>
                                    <div className='formContainer'>
                                        <InputControl type={"text"} register={register} data={"code"} icon={"id_card"} error={errors.code}
                                            key={1}>
                                            Ingrese el código del legajo *
                                        </InputControl>
                                        <ComboControl returnKey={true} icon={"signature"} options={careers} value={careerDBId} setOption={setCareerDBId}
                                            key={2}>
                                            Seleccione una carrera *
                                        </ComboControl>
                                        <ComboControl returnKey={true} clearErrors={clearErrors} icon={"contract_edit"} options={curriculums} setValue={setValue} data={"curriculumId"} getValues={getValues} error={errors.curriculumId} value={watch("curriculumId")} key={3}>
                                            Seleccione el plan de estudio *
                                        </ComboControl>
                                        <ComboControl returnKey={true} clearErrors={clearErrors} icon={"person_alert"}
                                            options={[{ key: 1, value: "Activo" }, { key: 2, value: "Inactivo" }, { key: 3, value: "Egresado" }]} setValue={setValue} data={"status"} getValues={getValues} error={errors.status} value={watch("status")} key={4}>
                                            Seleccione el estado del legajo *
                                        </ComboControl>
                                    </div>
                                </form>
                            </>
                        : <DocsModal fileId={selectedFileId} setModal={setDocsModal} />
                }
            </div>
        </article>
    )
}