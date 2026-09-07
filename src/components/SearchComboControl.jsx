import React, { useEffect, useRef, useState } from "react";
import '../styles/components/SearchComboControl.css';

export const SearchComboControl = ({ icon, children, options = [], setOption, setValue, data,
    getValues, readOnly, notShowLabel, value, error, clearErrors, returnKey }) => {

    const [isOpen, setIsOpen] = useState(false);
    
    const [searchTerm, setSearchTerm] = useState("");

    const findOption = (val) => {
        if (val === undefined || val === null) return null;
        return options.find(x => returnKey ? x.key === val : x.value === val) || null;
    };

    const [selectedOption, setSelectedOption] = useState(() => findOption(value));
    const selectRef = useRef(null);
    const optionsRef = useRef(null);

    const filteredOptions = options.filter(opt => 
        opt.value ? opt.value.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false
    );

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (selectRef.current && !selectRef.current.contains(e.target))
                setIsOpen(false);
        }

        if (typeof getValues === "function" && getValues(data)) {
            const formVal = getValues(data);
            const found = findOption(formVal);
            if (found) {
                setSelectedOption(found);
                setSearchTerm(found.value); 
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const currentTargetValue = returnKey ? selectedOption?.key : selectedOption?.value;

        if (value !== undefined && value !== null) {
            if (!selectedOption || currentTargetValue !== value) {
                const found = findOption(value);
                if (found) {
                    setSelectedOption(found);
                    setSearchTerm(found.value); 
                }
            }
        } else if (selectedOption !== null) {
            setSelectedOption(null);
            setSearchTerm("");
        }
    }, [value, options, returnKey]);

    useEffect(() => {
        if (selectedOption && selectedOption.value !== undefined) {
            if (typeof setValue === "function" && typeof getValues === "function") {
                if (getValues(data) !== selectedOption.value) {
                    setValue(data, returnKey ? selectedOption.key : selectedOption.value);
                    if (typeof clearErrors === "function") {
                        clearErrors(data);
                    }
                }
            }

            if (typeof setOption === "function") {
                setOption(returnKey ? selectedOption.key : selectedOption.value);
            }
        }
    }, [selectedOption, data, setValue, getValues, clearErrors, setOption, returnKey]);

    return (
        <div>
            <div className={`searchComboControl ${error?.message ? "errorInput" : ""}`} ref={selectRef}>
                {icon ? <span className="material-symbols-outlined icon">{icon}</span> : <></>}
                
                {searchTerm ? (
                    notShowLabel ? <></> : <label className="labelInformative">{children}</label>
                ) : undefined}
            
                <div className="optionsContainer">
                    
                    <input
                        type="text"
                        value={searchTerm}
                        placeholder={children}
                        readOnly={readOnly}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setIsOpen(true); 
                            
                            if (selectedOption && e.target.value !== selectedOption.value) {
                                setSelectedOption(null);
                            }
                        }}
                        onFocus={() => {
                            if (!readOnly) setIsOpen(true);
                        }}
                    />    

                    {isOpen ? (
                        <div className="optionsOverflow" ref={optionsRef}>
                            <div className="options">
                                {filteredOptions.length > 0 ? (
                                    filteredOptions.map((v, i) => (
                                        <p key={i} onClick={() => {
                                            setSelectedOption({ key: v.key, value: v.value });
                                            setSearchTerm(v.value);
                                            setIsOpen(false); 
                                        }}>
                                            {v.value}
                                        </p>
                                    ))
                                ) : (
                                    <p className="notFound">No se encontraron resultados</p>
                                )}
                            </div>
                        </div>
                    ) : undefined}
                </div>
            </div>
            {error ? <p className="errorInputMsg">{error.message}</p> : undefined}
        </div>
    );
};