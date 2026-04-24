import React, { useEffect, useRef, useState } from "react";
import '../styles/components/ComboControl.css';

export const ComboControl = ({ icon, children, options, setOption, setValue, data, getValues, readOnly, notShowLabel, value }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(value ? value : null);
    const selectRef = useRef(null);
    const optionsRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (selectRef.current && !selectRef.current.contains(e.target))
                setIsOpen(false);
        }

        if (getValues != undefined && typeof getValues === "function")
            if (getValues(data) != null || getValues(data) != undefined)
                setSelectedOption(options.find(x => x.value == getValues(data)));

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (typeof setValue == "function" && selectedOption != null && selectedOption != undefined)
            setValue(data, selectedOption.value);
        if (typeof setOption == "function" && selectedOption != null && selectedOption != undefined)
            setOption(selectedOption.value != undefined && selectedOption.value != null ? selectedOption.value : selectedOption)
    }, [selectedOption]);

    return (
        <div className="comboControl" ref={selectRef} onClick={!readOnly ? () => setIsOpen(prev => !prev) : {}}>
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
    );
}