import React, { useState } from 'react'
import '../../styles/pages/enrollments/CorrelativesModal.css'

export const CorrelativesModal = ({ setModal }) => {

  return (
    <article className="correlativesModal">
      <span class="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
      <h4>Correlativas</h4>
      <div className="correlativesContainer">
        <p>Correlativas faltantes:</p>
        <ul>
          <li><p>Materia 1</p></li>
          <li><p>Materia 2</p></li>
        </ul>
        <p>Correlativas aprobadas:</p>
        <ul>
          <li><p>Materia 3</p></li>
        </ul>
      </div>
    </article >
  )
}