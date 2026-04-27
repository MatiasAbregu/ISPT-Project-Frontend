import React from 'react'
import '../../styles/pages/studentSubjects/StudentExamModal.css'

export const StudentExamModal = ({ setModal }) => {


  const exam = {
    estado: "Aprobado",
    nota: 8,
    fecha: "18/06/2026",
    hora: "09:00",
    docente: "Juan Pérez",
    libro: "1",
    folio: "12"
  }

  return (
    <article className="studentExamModal">
      <span
        className="material-symbols-outlined close"
        onClick={() => setModal(false)}
      >
        cancel
      </span>

      <h4>Última mesa de examen</h4>

      <div className="examCard">
        <div className='examCardContainer'>
          <div className={`status ${exam.estado.toLowerCase()}`}>
            <span>{exam.estado}</span>
            <span>Nota: {exam.nota}</span>
          </div>

          <div className="examInfo">
            <div>
              <span className="label">Fecha:</span>
              <span>{exam.fecha}</span>
            </div>
            <div>
              <span className="label">Hora:</span>
              <span>{exam.hora}</span>
            </div>
            <div>
              <span className="label">Docente:</span>
              <span>{exam.docente}</span>
            </div>
            <div>
              <span className="label">Libro:</span>
              <span>{exam.libro}</span>
            </div>
            <div>
              <span className="label">Folio:</span>
              <span>{exam.folio}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}