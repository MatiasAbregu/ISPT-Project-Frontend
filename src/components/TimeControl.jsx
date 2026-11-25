import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import '../styles/components/TimeControl.css';
import { ComboControl } from './ComboControl';

const readTimeParts = (value) => {
    if (typeof value !== 'string' || !value) return { hours: '', minutes: '' };
    const match = value.match(/^(\d{2}):(\d{2})$/);
    if (!match) return { hours: '', minutes: '' };
    return { hours: match[1].padStart(2, '0'), minutes: match[2] };
};

const validTime = (hours, minutes) => {
    const hourNumber = Number(hours);
    const minuteNumber = Number(minutes);
    return /^\d{1,2}$/.test(hours) && /^\d{1,2}$/.test(minutes)
        && hourNumber >= 0 && hourNumber <= 23
        && minuteNumber >= 0 && minuteNumber <= 59;
};

const isPossibleTimeInput = (digits) => {
    if (digits.length >= 2 && Number(digits.slice(0, 2)) > 23) return false;
    if (digits.length === 4 && Number(digits.slice(2, 4)) > 59) return false;
    return true;
};

const getOptions = (amount) => Array.from({ length: amount }, (_, index) => {
    const value = index.toString().padStart(2, '0');
    return { key: value, value };
});

export const TimeControl = ({ icon, children, setValue, data, getValues, clearErrors, readOnly, value, error }) => {
    const timeRef = useRef(null);
    const timeInputRef = useRef(null);
    const timePickerRef = useRef(null);
    const isTypingRef = useRef(false);
    const initialValue = value ?? (typeof getValues === 'function' ? getValues(data) : null);
    const initialParts = readTimeParts(initialValue);
    const [isOpen, setIsOpen] = useState(false);
    const [pickerOpensAbove, setPickerOpensAbove] = useState(false);
    const [hours, setHours] = useState(initialParts.hours);
    const [minutes, setMinutes] = useState(initialParts.minutes);
    const [timeText, setTimeText] = useState(initialParts.hours && initialParts.minutes
        ? `${initialParts.hours}:${initialParts.minutes}` : '');

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (timeRef.current && !timeRef.current.contains(event.target)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    useEffect(() => {
        if (value === undefined || isTypingRef.current) return;
        const parts = readTimeParts(value);
        setHours(parts.hours);
        setMinutes(parts.minutes);
        setTimeText(parts.hours && parts.minutes ? `${parts.hours}:${parts.minutes}` : '');
    }, [value]);

    useLayoutEffect(() => {
        if (!isOpen) {
            setPickerOpensAbove(false);
            return undefined;
        }

        const adjustPickerDirection = () => {
            const control = timeRef.current;
            const picker = timePickerRef.current;
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

    const commitTime = useCallback((nextHours, nextMinutes) => {
        if (!validTime(nextHours, nextMinutes)) return;
        const formattedTime = `${nextHours.padStart(2, '0')}:${nextMinutes.padStart(2, '0')}`;
        setTimeText(formattedTime);
        setHours(formattedTime.slice(0, 2));
        setMinutes(formattedTime.slice(3, 5));
        if (typeof setValue === 'function') setValue(data, formattedTime, { shouldValidate: true, shouldDirty: true });
        if (typeof clearErrors === 'function') clearErrors(data);
    }, [setValue, data, clearErrors]);

    const handleTimeTextChange = (event) => {
        const digits = event.target.value.replace(/\D/g, '').slice(0, 4);
        if (!isPossibleTimeInput(digits)) return;
        const formattedText = digits.length > 2
            ? `${digits.slice(0, 2)}:${digits.slice(2)}`
            : digits;
        setTimeText(formattedText);
        setHours(digits.slice(0, 2));
        setMinutes(digits.length > 2 ? digits.slice(2) : '');

        if (digits.length === 4) {
            const nextHours = digits.slice(0, 2);
            const nextMinutes = digits.slice(2, 4);
            if (validTime(nextHours, nextMinutes)) {
                commitTime(nextHours, nextMinutes);
                return;
            }
        }
        if (typeof setValue === 'function') setValue(data, null, { shouldValidate: true, shouldDirty: true });
    };

    const handleHourSelect = useCallback((selectedHour) => {
        const nextHours = String(selectedHour).padStart(2, '0');
        setHours(nextHours);
        setTimeText(minutes ? `${nextHours}:${minutes}` : nextHours);
        if (minutes && validTime(nextHours, minutes)) commitTime(nextHours, minutes);
        else if (typeof setValue === 'function') setValue(data, null, { shouldValidate: true, shouldDirty: true });
    }, [minutes, commitTime, setValue, data]);

    const handleMinuteSelect = useCallback((selectedMinute) => {
        const nextMinutes = String(selectedMinute).padStart(2, '0');
        setMinutes(nextMinutes);
        setTimeText(hours ? `${hours}:${nextMinutes}` : nextMinutes);
        if (hours && validTime(hours, nextMinutes)) commitTime(hours, nextMinutes);
        else if (typeof setValue === 'function') setValue(data, null, { shouldValidate: true, shouldDirty: true });
    }, [hours, commitTime, setValue, data]);

    const handleInputBlur = () => {
        isTypingRef.current = false;
        const digits = timeText.replace(/\D/g, '');
        if (digits.length === 4) {
            const nextHours = digits.slice(0, 2);
            const nextMinutes = digits.slice(2, 4);
            if (validTime(nextHours, nextMinutes)) commitTime(nextHours, nextMinutes);
        }
    };

    return (
        <div className={`timeControl ${error?.message ? 'errorInput' : ''}`} ref={timeRef}>
            {icon && <span className="material-symbols-outlined timeControlIcon">{icon}</span>}
            {timeText && <label className="labelInformative">{children}</label>}
            <input
                ref={timeInputRef}
                className="timeValueInput"
                type="text"
                inputMode="numeric"
                pattern="[0-9:]*"
                maxLength={5}
                placeholder={timeText ? 'HH:mm' : children}
                aria-label={`${children}. Formato hora:minutos`}
                value={timeText}
                readOnly={readOnly}
                onFocus={() => { isTypingRef.current = true; }}
                onBlur={handleInputBlur}
                onChange={handleTimeTextChange}
                onClick={(event) => event.stopPropagation()}
            />
            <button
                type="button"
                className="material-symbols-outlined clock"
                aria-label="Elegir hora"
                disabled={readOnly}
                onClick={() => {
                    if (!readOnly) setIsOpen((previous) => !previous);
                }}
            >
                schedule
            </button>

            {isOpen && !readOnly && (
                <div
                    className={`timePicker ${pickerOpensAbove ? 'opensAbove' : ''}`}
                    ref={timePickerRef}
                    onClick={(event) => event.stopPropagation()}
                >
                    <div className="timePickerHeader"><p>Seleccionar hora</p></div>
                    <div className="timePickerSelectors">
                        <div className="selectorColumn">
                            <ComboControl
                                value={hours || undefined}
                                returnKey
                                labelPlacement="above"
                                placeholderText=""
                                setOption={handleHourSelect}
                                options={getOptions(24)}
                            >
                                Hora
                            </ComboControl>
                        </div>
                        <span className="separator">:</span>
                        <div className="selectorColumn">
                            <ComboControl
                                value={minutes || undefined}
                                returnKey
                                labelPlacement="above"
                                placeholderText=""
                                setOption={handleMinuteSelect}
                                options={getOptions(60)}
                            >
                                Minutos
                            </ComboControl>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
