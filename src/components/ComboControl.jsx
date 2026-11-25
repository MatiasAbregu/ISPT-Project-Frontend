import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import '../styles/components/ComboControl.css';

export const ComboControl = ({ icon, children, options = [], setOption, optionContext, setValue, data,
    getValues, readOnly, notShowLabel, value, error, clearErrors, returnKey, labelPlacement = "informative",
    placeholderText }) => {

    const [isOpen, setIsOpen] = useState(false);
    const findOption = (val) => {
        if (val === undefined || val === null) return null;
        return options.find(x => returnKey ? x.key === val : x.value === val) || null;
    };

    const [selectedOption, setSelectedOption] = useState(() => findOption(value));
    const [opensUpward, setOpensUpward] = useState(false);
    const selectRef = useRef(null);
    const optionsRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (selectRef.current && !selectRef.current.contains(e.target))
                setIsOpen(false);
        }

        if (typeof getValues === "function" && getValues(data)) {
            const formVal = getValues(data);
            const found = findOption(formVal);
            if (found) setSelectedOption(found);
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (value !== undefined && value !== null) {
            const currentTargetValue = returnKey ? selectedOption?.key : selectedOption?.value;

            if (!selectedOption || currentTargetValue !== value) {
                const found = findOption(value);
                if (found) setSelectedOption(found);
            }
        } else if (selectedOption !== null) {
            setSelectedOption(null);
        }
    }, [value, returnKey]);

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
                setOption(returnKey ? selectedOption.key : selectedOption.value, optionContext);
            }
        }
    }, [selectedOption, data, setValue, getValues, clearErrors, setOption, returnKey, optionContext]);

    useLayoutEffect(() => {
        if (!isOpen) {
            setOpensUpward(false);
            return undefined;
        }

        const adjustDropdownDirection = () => {
            const menu = optionsRef.current;
            const anchor = menu?.parentElement;
            if (!menu || !anchor) return;

            const anchorRect = anchor.getBoundingClientRect();
            const menuHeight = menu.getBoundingClientRect().height;
            const spaceBelow = window.innerHeight - anchorRect.bottom;
            const spaceAbove = anchorRect.top;
            setOpensUpward(spaceBelow < menuHeight + 8 && spaceAbove > 8);
        };

        adjustDropdownDirection();
        window.addEventListener("resize", adjustDropdownDirection);
        window.addEventListener("scroll", adjustDropdownDirection, true);
        return () => {
            window.removeEventListener("resize", adjustDropdownDirection);
            window.removeEventListener("scroll", adjustDropdownDirection, true);
        };
    }, [isOpen]);

    return (
        <div>
            <div className={`comboControl ${labelPlacement === "above" ? "comboControlLabelAbove" : ""} ${error?.message ? "errorInput" : ""}`} ref={selectRef}
                onClick={!readOnly ? () => setIsOpen(prev => !prev) : undefined}>
                {icon ? <span className="material-symbols-outlined icon">{icon}</span> : <></>}
                {labelPlacement === "above" && !notShowLabel ? <label className="labelAbove">{children}</label> : undefined}
                {labelPlacement !== "above" && selectedOption != null && (selectedOption.value != undefined || selectedOption.value != null) ?
                    notShowLabel ? <></> :
                        <label className="labelInformative">{children}</label> : undefined}
                <div className="optionsContainer">
                    {
                        selectedOption
                            ? <label className={labelPlacement === "above" ? "selectedOptionLabel" : undefined}>{selectedOption.value}</label>
                            : <label className={labelPlacement === "above" ? "selectedOptionLabel" : undefined}>
                                {placeholderText !== undefined ? placeholderText : labelPlacement === "above" ? "Seleccione una opción" : children}
                            </label>
                    }
                    <span className={`material-symbols-outlined dropdown ${isOpen ? "open" : ""}`}>expand_circle_down</span>
                    {
                        isOpen ?
                            <div className={`optionsOverflow ${opensUpward ? "opensUpward" : ""}`} ref={optionsRef}>
                                <div className="options">
                                    {
                                        options ?
                                            options.map((v, i) => {
                                                return (<p key={i} onClick={() => {
                                                    const nextOption = { key: v.key, value: v.value };
                                                    const nextValue = returnKey ? nextOption.key : nextOption.value;
                                                    setSelectedOption(nextOption);
                                                    if (typeof setValue === "function") {
                                                        setValue(data, nextValue, { shouldValidate: true, shouldDirty: true });
                                                    }
                                                    if (typeof clearErrors === "function") clearErrors(data);
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
