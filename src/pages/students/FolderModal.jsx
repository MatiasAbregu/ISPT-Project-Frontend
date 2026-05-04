import React from 'react'
import '../../styles/pages/students/FolderModal.css'

export const FolderModal = ({ setModal, onSelect }) => {

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
  }
];

    return (
        <article className="folderModal">
            <span 
                className="material-symbols-outlined close" 
                onClick={() => setModal(false)}
            >
                close
            </span>

            <h4>Legajos del estudiante</h4>
            <div className="folderList">
                {folders.map((f, index) => (
                    <div 
                        key={index} 
                        className={`folderCard ${!f.activo ? "inactive" : ""}`}
                        onClick={() => f.activo && onSelect(f)}
                    >
                        <div className="folderHeader">
                            <span className="material-symbols-outlined folderIcon">folder</span>
                            <h5>{f.carrera}</h5>
                            {!f.activo && <span className="badge inactive">Inactivo</span>}
                        </div>

                        <div className="folderBody">
                            <p><strong>Legajo:</strong> {f.legajo}</p>
                            <p><strong>Plan:</strong> {f.plan}</p>
                        </div>

                        <button className="add-button">
                            Ver comisiones
                        </button>
                    </div>
                ))}
            </div>
        </article>
    )
}