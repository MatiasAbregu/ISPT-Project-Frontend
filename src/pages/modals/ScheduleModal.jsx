import React from 'react'
import '../../styles/pages/modals/ScheduleModal.css'

const dayOrder = ['lunes', 'martes', 'miércoles', 'miercoles', 'jueves', 'viernes', 'sábado', 'sabado', 'domingo']

export const ScheduleModal = ({ setModal, schedules = [] }) => {
  const scheduleList = Array.isArray(schedules) ? schedules : []
  const hasDivisions = scheduleList.some(item => item && item.division)

  const formatTime = (value) => {
    if (value == null || value === '') return '--:--'
    const timeMatch = String(value).match(/^(\d{1,2}:\d{2})(?::\d{2})?$/)
    if (timeMatch) return timeMatch[1].padStart(5, '0')

    const date = new Date(value)
    return Number.isNaN(date.getTime())
      ? String(value)
      : date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false })
  }

  const sortSchedules = (items) => [...items].sort((a, b) => {
    const aDay = dayOrder.indexOf(String(a?.day ?? '').toLocaleLowerCase())
    const bDay = dayOrder.indexOf(String(b?.day ?? '').toLocaleLowerCase())
    return (aDay < 0 ? dayOrder.length : aDay) - (bDay < 0 ? dayOrder.length : bDay)
      || formatTime(a?.startTime).localeCompare(formatTime(b?.startTime))
  })

  const renderSchedules = (items, keyPrefix = '') => sortSchedules(items).map((schedule, index) => (
    <div className="scheduleBlock" key={`${keyPrefix}${schedule?.id ?? index}`}>
      <h5>{schedule?.day || 'Día no especificado'}</h5>
      <p>{formatTime(schedule?.startTime)} - {formatTime(schedule?.endTime)}</p>
    </div>
  ))

  const divisions = hasDivisions
    ? scheduleList.reduce((groups, item) => {
      const name = item?.division || 'División sin nombre'
      groups[name] = [...(groups[name] || []), item]
      return groups
    }, {})
    : null

  return (
    <article className="scheduleModal" role="dialog" aria-modal="true" aria-labelledby="scheduleModalTitle">
      <button
        type="button"
        className="material-symbols-outlined close"
        onClick={() => setModal(false)}
        aria-label="Cerrar horarios"
      >
        cancel
      </button>

      <h4 id="scheduleModalTitle">Horarios del curso</h4>

      <div className="scheduleContainer">
        {scheduleList.length === 0 ? (
          <p className="scheduleEmpty">Este curso todavía no tiene horarios asignados.</p>
        ) : divisions ? (
          Object.entries(divisions).map(([divisionName, divisionSchedules]) => (
            <section className="divisionGroup" key={divisionName}>
              <h3>División: {divisionName}</h3>
              <div className="divisionSchedules">{renderSchedules(divisionSchedules, `${divisionName}-`)}</div>
            </section>
          ))
        ) : renderSchedules(scheduleList)}
      </div>
    </article>
  )
}
