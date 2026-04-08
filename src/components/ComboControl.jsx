import React, { useEffect, useRef, useState } from "react";
import '../styles/components/ComboControl.css';

export const ComboControl = ({ icon, children, options, type }) => {

    const [isOpen, setIsOpen] = useState(false);

    if (type === "special") {
        const [optionsSelected, setOptionsSelected] = useState([]);

        return (
            <div className="comboControl multipleComboControl" onClick={() => setIsOpen(prev => !prev)}>
                <span className="material-symbols-outlined iconCombo">{icon}</span>
                <div className="optionsContainer">
                    {
                        optionsSelected.length > 0 ?
                            <div className="optionsLabelContainer">
                                {
                                    optionsSelected.map((v, i) =>
                                        <label key={i}>{v}</label>
                                    )
                                }
                            </div>
                            :
                            <label>{children}</label>
                    }
                    <span className={`material-symbols-outlined dropdown ${isOpen ? "open" : ""}`}>expand_circle_down</span>
                    {
                        isOpen ?
                            <div className="optionsOverflow" onClick={(e) => e.stopPropagation()}>
                                <div className="options">
                                    {
                                        options ?
                                            options.map((v, i) => {
                                                return (
                                                    <div className="optionCombo">
                                                        <p key={i} onClick={(e) => {
                                                            setOptionsSelected(
                                                                prev => {
                                                                    if (optionsSelected.includes(v.value)) {
                                                                        const newValue = [...prev];
                                                                        return newValue.filter(va => va !== v.value);
                                                                    } else return [...prev, v.value]
                                                                });
                                                            e.stopPropagation();
                                                        }} className={`${optionsSelected.includes(v.value) ? "selected" : ""}`}>
                                                            {
                                                                optionsSelected.includes(v.value) ?
                                                                    <span className="material-symbols-outlined checkIcon">
                                                                        check_circle
                                                                    </span>
                                                                    : undefined
                                                            }
                                                            {v.value}</p>
                                                    </div>
                                                );
                                            }) : undefined
                                    }
                                </div>
                            </div> : undefined
                    }
                </div>
            </div>
        );
    } else {
        const [selectedOption, setSelectedOption] = useState(null);
        const selectRef = useRef(null);

        useEffect(() => {
            const handleClickOutside = (e) => {
                if (selectRef.current && !selectRef.current.contains(e.target))
                    setIsOpen(false);
            }

            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);

        return (
            <div className="comboControl" ref={selectRef} onClick={() => setIsOpen(prev => !prev)}>
                <span className="material-symbols-outlined">{icon}</span>
                <div className="optionsContainer">
                    {
                        selectedOption ? <label>{selectedOption.value}</label> : <label>{children}</label>
                    }
                    <span className={`material-symbols-outlined dropdown ${isOpen ? "open" : ""}`}>expand_circle_down</span>
                    {
                        isOpen ?
                            <div className="optionsOverflow">
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
}