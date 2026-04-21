import React, { useEffect, useRef, useState } from 'react'
import '../styles/components/DateControl.css';

export const DateControl = ({ icon, children, setValue, data, getValues, readOnly }) => {

    const [daySelected, setDaySelected] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const dateRef = useRef(null);

    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const weekend = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    useEffect(() => {
        const handleCursorOut = (e) => {
            if (dateRef.current && !dateRef.current.contains(e.target))
                setIsOpen(false);
        }

        if (typeof getValues == "function" && (getValues(data) != null || getValues(data) != undefined))
            setDaySelected(new Date(getValues(data)));

        document.addEventListener("mousedown", handleCursorOut);
        return () => document.removeEventListener("mousedown", handleCursorOut);
    }, [])

    const formatDate = (date) => {
        if (!date) return "";

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    const getDaysOfCalendar = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        const prevMonth = new Date(year, month - 1, 0);
        const daysInPrevMonth = prevMonth.getDate();
        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            days.push({
                day: daysInPrevMonth - i,
                isCurrentMonth: false,
                date: new Date(year, month - 1, daysInPrevMonth - i)
            });
        }

        for (let day = 1; day <= daysInMonth; day++) {
            days.push({
                day,
                isCurrentMonth: true,
                date: new Date(year, month, day)
            });
        }

        const totalCells = 42;
        const remainingCells = totalCells - days.length;
        for (let day = 1; day <= remainingCells; day++) {
            days.push({
                day,
                isCurrentMonth: false,
                date: new Date(year, month + 1, day)
            });
        }

        return days;
    }

    useEffect(() => {
        if (typeof setValue == "function" && daySelected != null && daySelected != undefined) 
            setValue(data, daySelected);
    }, [daySelected]);

    const daysArray = getDaysOfCalendar(currentDate);

    return (
        <div className='dateControl' ref={dateRef} onClick={!readOnly ? () => setIsOpen(prev => !prev) : {}}>
            <span className="material-symbols-outlined">{icon}</span>
            {daySelected != null && (daySelected != undefined || daySelected != null) ?
                <label className="labelInformative">{children}</label> : undefined}
            {daySelected ? <label>{formatDate(daySelected)}</label> : <label>{children}</label>}
            <span className={`material-symbols-outlined calendar`}>calendar_month</span>
            {
                isOpen ?
                    <div className='calendarPicker'>
                        <div className='calendarPickerHeader' onClick={(e) => e.stopPropagation()}>
                            <button onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
                            }}>&lt;&lt;</button>
                            <button onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
                            }}>&lt;</button>
                            <p>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</p>
                            <button onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
                            }}>&gt;</button>
                            <button onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));
                            }}>&gt;&gt;</button>
                        </div>
                        <div className='calendarPickerContainer'>
                            <div className='datesName' onClick={(e) => e.stopPropagation()}>
                                {
                                    weekend.map((d, i) => (<span key={i}>{d}</span>))
                                }
                            </div>
                            <div className='dates'>
                                {
                                    daysArray.map((dayObj, i) => {
                                        return (
                                            <button key={i} className={`${daySelected ?
                                                dayObj.date.getTime() == daySelected.getTime() ? "active" : ""
                                                : ""}`}
                                                onClick={(e) => {
                                                    setDaySelected(dayObj.date);
                                                    e.preventDefault();
                                                }}>
                                                {dayObj.day}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div> : undefined
            }
        </div>
    )
}