import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import '../../styles/pages/students/FolderModal.css'

export const FolderModal = ({ setModal }) => {
    const navigate = useNavigate();
    const [creatingFile, setCreatingFile] = useState(false);

    const folders = [
        {
            legajo: 123,
            carrera: "Profesorado Tecnológico",
            plan: "2024",
            activo: true
        },
        {
            legajo: 456,
            carrera: "Tecnicatura",
            plan: "2023",
            activo: false
        },
    ];

    return (
        <article className="folderModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>
                cancel
            </span>

            <h4>Legajos del estudiante</h4>
            <div className="folderContainer">
                {
                    !creatingFile ?
                        <>
                            <button className='add-button' onClick={() => setCreatingFile(true)}>
                                <span className="material-symbols-outlined">add_circle</span>Añadir legajo
                            </button>
                            <div className='folderList'>
                                {folders.map((f, index) => (
                                    <div key={index} className={`folderCard ${!f.activo ? "inactive" : ""}`}>
                                        <div className="folderHeader">
                                            <span className="material-symbols-outlined folderIcon">folder</span>
                                            <h5>{f.carrera}</h5>
                                            {!f.activo && <span className="badge inactive">Inactivo</span>}
                                        </div>

                                        <div className="folderBody">
                                            <p><strong>Legajo:</strong> {f.legajo}</p>
                                            <p><strong>Plan:</strong> {f.plan}</p>
                                        </div>

                                        <button className="file-button" onClick={() => navigate(`/estudiantes/1/espacios-curriculares`)}>
                                            Ver espacios curriculares
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </> :
                        <>
                            <div className='btnContainer'>
                                <button className='cancel-button' onClick={() => setCreatingFile(false)}>
                                    <span className="material-symbols-outlined">cancel</span>Cancelar
                                </button>
                                <button className='add-button'>
                                    <span className="material-symbols-outlined">add_circle</span>Crear legajo
                                </button>
                            </div>
                            <form>
                                
                            </form>
                        </>
                }
            </div>
        </article>
    )
}