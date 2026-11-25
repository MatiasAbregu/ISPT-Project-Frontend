import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import '../styles/components/DateControl.css';

const normalizeDate = (value) => {
    if (!value) return null;

    if (value instanceof Date) {
        if (Number.isNaN(value.getTime())) return null;
        return new Date(value.getFullYear(), value.getMonth(), value.getDate());
    }

    if (typeof value === 'string') {
        const localIsoDate = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (localIsoDate) {
            const [, year, month, day] = localIsoDate;
            const parsed = new Date(Number(year), Number(month) - 1, Number(day));
            return isValidDateParts(parsed, Number(day), Number(month), Number(year)) ? parsed : null;
        }

        const formattedDate = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        if (formattedDate) {
            const [, day, month, year] = formattedDate;
            const parsed = new Date(Number(year), Number(month) - 1, Number(day));
            return isValidDateParts(parsed, Number(day), Number(month), Number(year)) ? parsed : null;
        }
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return null;
    return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
};

const isValidDateParts = (date, day, month, year) =>
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;

const isPossibleDateInput = (digits) => {
    if (digits.length >= 2) {
        const day = Number(digits.slice(0, 2));
        if (day < 1 || day > 31) return false;
    }
    if (digits.length >= 4) {
        const month = Number(digits.slice(2, 4));
        if (month < 1 || month > 12) return false;

        const day = Number(digits.slice(0, 2));
        const hasFullYear = digits.length === 8;
        const year = hasFullYear ? Number(digits.slice(4, 8)) : 2000;
        if (hasFullYear && year === 0) return false;
        const daysInMonth = new Date(year, month, 0).getDate();
        if (day > daysInMonth) return false;
    }
    return true;
};

const formatDate = (date) => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}/${date.getFullYear()}`;
};

const formatDateInput = (digits) => {
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
};

export const DateControl = ({ icon, children, setValue, data, getValues, readOnly, error, clearErrors, value }) => {
    const initialValue = value ?? (typeof getValues === 'function' ? getValues(data) : null);
    const initialDate = normalizeDate(initialValue);
    const [daySelected, setDaySelected] = useState(initialDate);
    const [dateInput, setDateInput] = useState(formatDate(initialDate));
    const [isOpen, setIsOpen] = useState(false);
    const [pickerOpensAbove, setPickerOpensAbove] = useState(false);
    const [currentDate, setCurrentDate] = useState(initialDate ?? new Date());
    const dateRef = useRef(null);
    const dateInputRef = useRef(null);
    const calendarPickerRef = useRef(null);

    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const weekend = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dateRef.current && !dateRef.current.contains(event.target)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    useEffect(() => {
        if (value === undefined || document.activeElement === dateInputRef.current) return;
        const incomingDate = normalizeDate(value);
        setDaySelected(incomingDate);
        setDateInput(formatDate(incomingDate));
        if (incomingDate) setCurrentDate(incomingDate);
    }, [value]);

    useLayoutEffect(() => {
        if (!isOpen) {
            setPickerOpensAbove(false);
            return undefined;
        }

        const adjustPickerDirection = () => {
            const control = dateRef.current;
            const picker = calendarPickerRef.current;
            if (!control || !picker) return;

            const controlRect = control.getBoundingClientRect();
            const pickerHeight = picker.getBoundingClientRect().height;
            const spaceBelow = window.innerHeight - controlRect.bottom;
            const spaceAbove = controlRect.top;
            setPickerOpensAbove(spaceBelow < pickerHeight + 8 && spaceAbove > 8);
        };

        adjustPickerDirection();
        window.addEventListener('resize', adjustPickerDirection);
        window.addEventListener('scroll', adjustPickerDirection, true);
        return () => {
            window.removeEventListener('resize', adjustPickerDirection);
            window.removeEventListener('scroll', adjustPickerDirection, true);
        };
    }, [isOpen]);

    useEffect(() => {
        if (typeof setValue !== 'function') return;
        const currentDateValue = typeof getValues === 'function' ? normalizeDate(getValues(data)) : null;
        if (daySelected && formatDate(currentDateValue) !== formatDate(daySelected)) {
            setValue(data, daySelected, { shouldValidate: true, shouldDirty: true });
            if (typeof clearErrors === 'function') clearErrors(data);
        }
    }, [daySelected, data, setValue, getValues, clearErrors]);

    const getDaysOfCalendar = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDayOfWeek = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const days = [];

        for (let offset = firstDayOfWeek - 1; offset >= 0; offset--) {
            const day = new Date(year, month, -offset);
            days.push({ day: day.getDate(), isCurrentMonth: false, date: day });
        }
        for (let day = 1; day <= daysInMonth; day++) {
            days.push({ day, isCurrentMonth: true, date: new Date(year, month, day) });
        }
        for (let day = 1; days.length < 42; day++) {
            days.push({ day, isCurrentMonth: false, date: new Date(year, month + 1, day) });
        }
        return days;
    };

    const handleDateInput = (event) => {
        const digits = event.target.value.replace(/\D/g, '').slice(0, 8);
        if (!isPossibleDateInput(digits)) return;
        const formatted = formatDateInput(digits);
        setDateInput(formatted);

        if (digits.length === 0) {
            setDaySelected(null);
            if (typeof setValue === 'function') setValue(data, null, { shouldValidate: true, shouldDirty: true });
            return;
        }

        setDaySelected(null);
        if (typeof setValue === 'function') setValue(data, null, { shouldValidate: true, shouldDirty: true });
        if (digits.length !== 8) return;

        const day = Number(digits.slice(0, 2));
        const month = Number(digits.slice(2, 4));
        const year = Number(digits.slice(4, 8));
        const parsedDate = new Date(year, month - 1, day);
        if (!isValidDateParts(parsedDate, day, month, year)) return;

        setDaySelected(parsedDate);
        setCurrentDate(parsedDate);
        setDateInput(formatDate(parsedDate));
        if (typeof setValue === 'function') setValue(data, parsedDate, { shouldValidate: true, shouldDirty: true });
        if (typeof clearErrors === 'function') clearErrors(data);
    };

    const daysArray = getDaysOfCalendar(currentDate);

    return (
        <div className={`dateControlContainer ${error?.message ? 'errorInput' : ''}`}>
            <div
                className={`dateControl ${error?.message ? 'errorInput' : ''}`}
                ref={dateRef}
                onClick={!readOnly ? () => setIsOpen((previous) => !previous) : undefined}
            >
                {icon && <span className="material-symbols-outlined dateControlIcon">{icon}</span>}
                {dateInput && <label className="labelInformative">{children}</label>}
                <label className="dateValueLabel">
                    <input
                        ref={dateInputRef}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9/]*"
                        maxLength={10}
                        placeholder={dateInput ? 'dd/mm/aaaa' : children}
                        aria-label={`${children}. Formato día/mes/año`}
                        value={dateInput}
                        readOnly={readOnly}
                        onClick={(event) => event.stopPropagation()}
                        onChange={handleDateInput}
                    />
                </label>
                <button
                    type="button"
                    className="material-symbols-outlined calendar"
                    aria-label="Abrir calendario"
                    disabled={readOnly}
                    onClick={(event) => {
                        event.stopPropagation();
                        if (!readOnly) setIsOpen((previous) => !previous);
                    }}
                >
                    calendar_month
                </button>

                {isOpen && !readOnly && (
                    <div
                        className={`calendarPicker ${pickerOpensAbove ? 'opensAbove' : ''}`}
                        ref={calendarPickerRef}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="calendarPickerHeader">
                            <button type="button" aria-label="Año anterior" onClick={() => setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1))}>&lt;&lt;</button>
                            <button type="button" aria-label="Mes anterior" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>&lt;</button>
                            <p>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</p>
                            <button type="button" aria-label="Mes siguiente" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>&gt;</button>
                            <button type="button" aria-label="Año siguiente" onClick={() => setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1))}>&gt;&gt;</button>
                        </div>
                        <div className="calendarPickerContainer">
                            <div className="datesName">
                                {weekend.map((dayName) => <span key={dayName}>{dayName}</span>)}
                            </div>
                            <div className="dates">
                                {daysArray.map((dayObject, index) => {
                                    const isSelected = daySelected
                                        && daySelected.getFullYear() === dayObject.date.getFullYear()
                                        && daySelected.getMonth() === dayObject.date.getMonth()
                                        && daySelected.getDate() === dayObject.date.getDate();
                                    return (
                                        <button
                                            type="button"
                                            key={`${dayObject.date.toISOString()}-${index}`}
                                            className={`${isSelected ? 'active' : ''} ${dayObject.isCurrentMonth ? '' : 'outsideMonth'}`}
                                            onClick={() => {
                                                setDaySelected(dayObject.date);
                                                setDateInput(formatDate(dayObject.date));
                                                setCurrentDate(dayObject.date);
                                                setIsOpen(false);
                                            }}
                                        >
                                            {dayObject.day}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {error?.message && <p className="errorInputMsg">{error.message}</p>}
        </div>
    );
};
