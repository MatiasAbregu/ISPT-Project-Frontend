import React, { useEffect, useMemo, useState } from 'react';
import '../../styles/pages/studentSubjects/StudentAttendanceModal.css';
import StudentService from '../../services/students/StudentService';

const getMonthKey = (dateValue) => {
    const [year, month] = String(dateValue).slice(0, 10).split('-');
    return `${year}-${month}`;
};

const formatDate = (dateValue) => {
    const [year, month, day] = String(dateValue).slice(0, 10).split('-').map(Number);
    return new Intl.DateTimeFormat('es-AR', {
        weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
    }).format(new Date(year, month - 1, day));
};

const formatMonth = (monthKey) => {
    const [year, month] = monthKey.split('-').map(Number);
    const label = new Intl.DateTimeFormat('es-AR', { month: 'long', year: 'numeric' })
        .format(new Date(year, month - 1, 1));
    return label.charAt(0).toLocaleUpperCase('es-AR') + label.slice(1);
};

export const StudentAttendanceModal = ({ setModal, fileDivisionId, subject }) => {
    const [attendance, setAttendance] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let active = true;
        const loadAttendance = async () => {
            if (!fileDivisionId) {
                setError('No se recibió el identificador del cursado. Actualizá y reiniciá el servidor del back para cargar este dato.');
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const response = await StudentService.getMySubjectAttendance(fileDivisionId);
                if (!active) return;
                const rows = response.data?.object ?? [];
                setAttendance(rows);
                const months = [...new Set(rows.map(row => getMonthKey(row.date)))].sort();
                setSelectedMonth(months.at(-1) ?? '');
                setError('');
            } catch (requestError) {
                if (active) setError(requestError.response?.data?.message ?? 'No se pudieron cargar las asistencias.');
            } finally {
                if (active) setLoading(false);
            }
        };
        loadAttendance();
        return () => { active = false; };
    }, [fileDivisionId]);

    const months = useMemo(() => [...new Set(attendance.map(row => getMonthKey(row.date)))].sort(), [attendance]);
    const monthAttendance = useMemo(
        () => attendance.filter(row => getMonthKey(row.date) === selectedMonth),
        [attendance, selectedMonth]
    );
    const recorded = monthAttendance.filter(row => row.status !== 'Pendiente');
    const present = recorded.filter(row => row.status === 'Presente').length;
    const absent = recorded.filter(row => row.status === 'Ausente').length;
    const justified = recorded.filter(row => row.status === 'Justificado').length;
    const percentage = recorded.length ? Math.round(present * 100 / recorded.length) : null;

    return (
        <article className="studentAttendanceModal" role="dialog" aria-modal="true" aria-labelledby="studentAttendanceTitle">
            <header className="studentAttendanceHeader">
                <div>
                    <span className="studentAttendanceEyebrow">Detalle del cursado</span>
                    <h4 id="studentAttendanceTitle">Asistencia</h4>
                    {subject && <p>{subject}</p>}
                </div>
                <button className="studentAttendanceClose" type="button" aria-label="Cerrar" onClick={() => setModal(false)}>
                    <span className="material-symbols-outlined">close</span>
                </button>
            </header>

            <div className="studentAttendanceContent">
                {loading ? <p className="studentAttendanceMessage">Cargando asistencias…</p> : null}
                {!loading && error ? <p className="studentAttendanceMessage studentAttendanceError">{error}</p> : null}
                {!loading && !error && attendance.length === 0 ? (
                    <p className="studentAttendanceMessage">Todavía no hay días de asistencia cargados para este cursado.</p>
                ) : null}

                {!loading && !error && months.length > 0 && (
                    <>
                        <label className="attendanceMonthField">
                            <span>Mes de cursada</span>
                            <select value={selectedMonth} onChange={event => setSelectedMonth(event.target.value)}>
                                {months.map(month => <option key={month} value={month}>{formatMonth(month)}</option>)}
                            </select>
                        </label>

                        <section className="attendanceMonthSummary" aria-label="Resumen del mes">
                            <div className="attendancePercent">
                                <strong>{percentage == null ? '—' : `${percentage}%`}</strong>
                                <span>asistencia del mes</span>
                            </div>
                            <div className="attendanceCounts">
                                <span className="countPresent"><b>{present}</b> presentes</span>
                                <span className="countAbsent"><b>{absent}</b> ausentes</span>
                                <span className="countJustified"><b>{justified}</b> justificadas</span>
                            </div>
                        </section>

                        <ul className="attendanceList">
                            {monthAttendance.map(item => (
                                <li key={`${item.date}-${item.status}`} className={`attendanceEntry ${item.status.toLowerCase()}`}>
                                    <span className="attendanceDate">{formatDate(item.date)}</span>
                                    <span className={`attendanceStatus ${item.status.toLowerCase()}`}>{item.status}</span>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </article>
    );
};
