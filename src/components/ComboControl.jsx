import React, { useEffect, useRef, useState } from "react";
import '../styles/components/ComboControl.css';

export const ComboControl = ({ icon, children, options }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const selectRef = useRef(null);
    const optionsRef = useRef(null);

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