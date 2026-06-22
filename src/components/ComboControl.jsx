import React, { useEffect, useRef, useState } from "react";
import '../styles/components/ComboControl.css';

export const ComboControl = ({ icon, children, options = [], setOption, setValue, data,
    getValues, readOnly, notShowLabel, value, error, clearErrors }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(() => {
        if (value) {
            return options?.find(x => x.value === value) || null;
        }
        return null;
    });
    const selectRef = useRef(null);
    const optionsRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (selectRef.current && !selectRef.current.contains(e.target))
                setIsOpen(false);
        }

        if (typeof getValues === "function" && getValues(data)) {
            const formVal = getValues(data);
            const found = options.find(x => x.value === formVal);
            if (found) setSelectedOption(found);
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (value) {
            if (!selectedOption || selectedOption.value !== value) {
                const found = options.find(x => x.value === value);
                if (found) {
                    setSelectedOption(found);
                }
            }
        } else {
            if (selectedOption !== null) setSelectedOption(null);
        }
    }, [value, options]);

    useEffect(() => {
        if (selectedOption && selectedOption.value !== undefined) {
            if (typeof setValue === "function" && typeof getValues === "function") {
                if (getValues(data) !== selectedOption.value) {
                    setValue(data, selectedOption.value);
                    if (typeof clearErrors === "function") {
                        clearErrors(data);
                    }
                }
            }

            if (typeof setOption === "function") {
                setOption(selectedOption.value);
            }
        }
    }, [selectedOption, data, setValue, getValues, clearErrors, setOption]);

    return (
        <div>
            <div className={`comboControl ${error?.message ? "errorInput" : ""}`} ref={selectRef}
                onClick={!readOnly ? () => setIsOpen(prev => !prev) : undefined}>
                {icon ? <span className="material-symbols-outlined icon">{icon}</span> : <></>}
                {selectedOption != null && (selectedOption.value != undefined || selectedOption.value != null) ?
                    notShowLabel ? <></> :
                        <label className="labelInformative">{children}</label> : undefined}
                <div className="optionsContainer">
                    {
                        selectedOption ? <label>{selectedOption.value}</label> : <label>{children}</label>
                    }
                    <span className={`material-symbols-outlined dropdown ${isOpen ? "open" : ""}`}>expand_circle_down</span>
                    {
                        isOpen ?
                            <div className="optionsOverflow" ref={optionsRef}>
                                <div className="options">
                                    {
                                        options ?
                                            options.map((v, i) => {
                                                return (<p key={i} onClick={() => {
                                                    setSelectedOption(
                                                        { key: v.key, value: v.value });
                                                }}>{v.value}</p>)
                                            }) : undefined
                                    }
                                </div>
                            </div> : undefined
                    }
                </div>
            </div>
            {error ? <p className="errorInputMsg">{error.message}</p> : undefined}
        </div>
    );
}