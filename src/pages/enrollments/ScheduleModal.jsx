import React from 'react'
import '../../styles/pages/enrollments/ScheduleModal.css'

export const ScheduleModal = ({ setModal }) => {

  return (
    <article className="scheduleModal">
      <span class="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
      <h4>Horarios de las divisiones:</h4>
      <div className="scheduleContainer">
        <div className="scheduleBlock">
          <h5>Turno Mañana A</h5>
          <ul>
            <li><p>Lunes | 08:00 - 10:00</p></li>
            <li><p>Miércoles | 08:00 - 10:00</p></li>
            <li><p>Viernes | 08:00 - 09:00</p></li>
          </ul>
        </div>

        <div className="scheduleBlock">
          <h5>Turno Mañana B</h5>
          <ul>
            <li><p>Martes | 08:00 - 10:00</p></li>
            <li><p>Jueves | 08:00 - 10:00</p></li>
          </ul>
        </div>

        <div className="scheduleBlock">
          <h5>Turno Tarde A</h5>
          <ul>
            <li><p>Lunes | 18:00 - 20:00</p></li>
            <li><p>Miércoles | 18:00 - 20:00</p></li>
          </ul>
        </div>

        <div className="scheduleBlock">
          <h5>Turno Tarde B</h5>
          <ul>
            <li><p>Martes | 18:00 - 20:00</p></li>
            <li><p>Jueves | 18:00 - 20:00</p></li>
          </ul>
        </div>
      </div>
    </article >
  )
}