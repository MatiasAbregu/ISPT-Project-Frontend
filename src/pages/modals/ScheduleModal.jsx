import React from 'react'
import '../../styles/pages/modals/ScheduleModal.css'

export const ScheduleModal = ({ setModal, schedules }) => {

  return (
    <article className="scheduleModal">
      <span 
        className="material-symbols-outlined close" 
        onClick={() => setModal(false)}
      >
        cancel
      </span>

      <h4>Horarios</h4>

      <div className="scheduleContainer">
        {schedules.map((schedule, i) => (
          <div className="scheduleBlock" key={i}>
            <h5>{schedule.division}</h5>

            <ul>
              {schedule.horarios.map((h, j) => (
                <li key={j}>
                  <p>{h.dia} | {h.desde} - {h.hasta}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
};