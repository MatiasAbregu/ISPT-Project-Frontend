import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DateControl } from '../../components/DateControl';
import '../../styles/pages/courses/CourseAttendanceModal.css';

const getLocalToday = () => {
    const today = new Date();
    return [today.getFullYear(), String(today.getMonth() + 1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')].join('-');
};

export const CourseAttendanceModal = ({ setModal, onCreate }) => {
    const [saving, setSaving] = useState(false);
    const { handleSubmit, setValue, getValues, watch } = useForm({
        defaultValues: { attendanceDate: new Date() }
    });

    const createForDate = async (date) => {
        if (!date || saving) return;
        setSaving(true);
        try {
            const created = await onCreate(date);
            if (created) setModal(false);
        } finally {
            setSaving(false);
        }
    };

    const submitSelectedDate = ({ attendanceDate }) => {
        if (!(attendanceDate instanceof Date) || Number.isNaN(attendanceDate.getTime())) return;
        const date = [attendanceDate.getFullYear(), String(attendanceDate.getMonth() + 1).padStart(2, '0'), String(attendanceDate.getDate()).padStart(2, '0')].join('-');
        createForDate(date);
    };

    return (
        <article className="courseAttendanceModal" role="dialog" aria-modal="true" aria-labelledby="courseAttendanceModalTitle">
            <span className="courseAttendanceModalCloseArea">
                <button className="material-symbols-outlined close" type="button" aria-label="Cerrar" onClick={() => setModal(false)} disabled={saving}>
                    cancel
                </button>
            </span>
            <h4 id="courseAttendanceModalTitle">Añadir día de asistencia</h4>

            <div className="courseAttendanceModalContainer">
                <form onSubmit={handleSubmit(submitSelectedDate)}>
                    <div className="courseAttendanceDateField">
                        <DateControl
                            icon="calendar_month"
                            data="attendanceDate"
                            setValue={setValue}
                            getValues={getValues}
                            value={watch('attendanceDate')}
                        >
                            Seleccione la fecha específica
                        </DateControl>
                    </div>
                    <div className="courseAttendanceModalActions">
                        <button className="add-button" type="submit" disabled={saving}>
                            <span className="material-symbols-outlined">event</span>
                            {saving ? 'Cargando...' : 'Cargar fecha seleccionada'}
                        </button>
                        <button className="add-button currentDayButton" type="button" onClick={() => createForDate(getLocalToday())} disabled={saving}>
                            <span className="material-symbols-outlined">today</span>
                            Cargar día actual
                        </button>
                    </div>
                </form>
            </div>
        </article>
    );
};
