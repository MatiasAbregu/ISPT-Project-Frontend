import React from 'react'
import '../../styles/pages/enrollments/CorrelativesModal.css'

export const CorrelativesModal = ({ setModal, missingSubjects = [] }) => {

  return (
    <article className="correlativesModal">
      <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
      <h4>Correlativas pendientes</h4>
      <div className="correlativesContainer">
        <p>Necesitás acreditar los siguientes espacios curriculares para inscribirte:</p>
        <ul>
          {missingSubjects.map((subject, index) => <li className='missing-item' key={`${subject}-${index}`}>{subject}</li>)}
        </ul>
      </div>
    </article >
  )
}
