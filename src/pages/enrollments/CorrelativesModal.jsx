import React, { useState } from 'react'
import '../../styles/pages/enrollments/CorrelativesModal.css'

export const CorrelativesModal = ({ setModal }) => {

  return (
    <article className="correlativesModal">
      <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
      <h4>Correlativas del espacio curricular</h4>
      <div className="correlativesContainer">
        <p>Correlativas faltantes:</p>
        <ul>
          <li className='missing-item'>Materia 1</li>
          <li className='missing-item'>Materia 2</li>
        </ul>
        <p>Correlativas aprobadas:</p>
        <ul>
          <li className='approved-item'>Materia 3</li>
        </ul>
      </div>
    </article >
  )
}