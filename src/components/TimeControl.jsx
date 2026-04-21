import React, { useEffect, useRef, useState } from 'react';
import '../styles/components/TimeControl.css';
import { ComboControl } from './ComboControl';

export const TimeControl = ({ icon, children, setValue, data, getValues, readOnly }) => {
    const [isOpen, setIsOpen] = useState(false);
    const timeRef = useRef(null);

    const initialVal = typeof getValues === "function" ? getValues(data) : null;
    const [timeSelected, setTimeSelected] = useState(initialVal || null);
    const [hours, setHours] = useState(initialVal ? initialVal.split(":")[0] : '12');
    const [minutes, setMinutes] = useState(initialVal ? initialVal.split(":")[1] : '00');

    useEffect(() => {
        const handleCursorOut = (e) => {
            if (timeRef.current && !timeRef.current.contains(e.target))
                setIsOpen(false);
        }

        document.addEventListener("mousedown", handleCursorOut);
        return () => document.removeEventListener("mousedown", handleCursorOut);
    }, []);

    useEffect(() => {
        const formattedTime = `${hours}:${minutes}`;
        setTimeSelected(formattedTime);
        
        if (typeof setValue === "function") {
            // Solo disparamos si el valor es distinto al que ya tiene el formulario
            const currentVal = typeof getValues === "function" ? getValues(data) : null;
            if (currentVal !== formattedTime) {
                setValue(data, formattedTime);
            }
        }
    }, [hours, minutes, data, setValue]);

    const generateOptions = (max) => {
        return Array.from({ length: max }, (_, i) => i.toString().padStart(2, '0'));
    }

    return (
        <div className='timeControl' ref={timeRef} onClick={!readOnly ? () => setIsOpen(prev => !prev) : undefined}>
            <span className="material-symbols-outlined">{icon}</span>

            {timeSelected != null && (timeSelected != undefined || timeSelected != null) ?
                <label className="labelInformative">{children}</label> : undefined}

            {timeSelected ? <label>{timeSelected}</label>
                : <label>{children}</label>}

            <span className={`material-symbols-outlined clock`}>schedule</span>

            {isOpen && (
                <div className='timePicker' onClick={(e) => e.stopPropagation()}>
                    <div className='timePickerHeader'>
                        <p>Seleccionar Hora</p>
                    </div>

                    <div className='timePickerSelectors'>
                        <div className='selectorColumn'>
                            <ComboControl setOption={setHours} options={generateOptions(24)
                                .map(h => {
                                    return { key: h, value: h };
                                })} />
                        </div>

                        <span className="separator">:</span>

                        <div className='selectorColumn'>
                            <ComboControl setOption={setMinutes} options={generateOptions(60)
                                .map(m => {
                                    return { key: m, value: m };
                                })} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}