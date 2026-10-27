import React from 'react'
import '../../styles/pages/modals/ScheduleModal.css'

export const ScheduleModal = ({ setModal, schedules }) => {

  const formatDateTime = (value) => {
    if (value == null) return "----";

    if (typeof value === 'string') {
      const timeRegex = /^\d{2}:\d{2}(:\d{2})?$/;
      if (timeRegex.test(value)) {
        return value.substring(0, 5);
      }
    }

    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    }

    return value;
  };

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
            <h5>{schedule.day}</h5>

            <ul>
              <p>{formatDateTime(schedule.startTime)}h - {formatDateTime(schedule.endTime)}h</p>
            </ul>
          </div>
        ))}
      </div>
    </article>
  );
};