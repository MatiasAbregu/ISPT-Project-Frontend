import React, { useRef } from "react";
import '../styles/components/InputControl.css';

export const InputControl = ({ children, type, icon, register,
    data, error, setValue, watch, typeCheckbox, setChangeCheckbox2 }) => {

    if (type == "search") {
        const input = useRef();

        return (
            <>
                <div className={`inputControl`} onClick={() => input.current?.focus()}>
                    <label>{children}</label>
                    <div>
                        <span className="material-symbols-outlined">{icon}</span>
                        <input type={"text"} placeholder="Buscar por filtro" ref={input} {...typeof register == "function" ? register(data) : {}} />
                    </div>
                </div>
            </>
        );
    } else if (type == "textarea") {
        return (
            <>
                <div className={`textareaControl ${error?.message ? "errorInput" : ""}`} onClick={() => input.current?.focus()}>
                    <label>{children}</label>
                    <div>
                        <span className="material-symbols-outlined">{icon}</span>
                        <textarea placeholder=" "></textarea>
                    </div>
                </div>
                {error ? <p className="errorInputMsg">{error.message}</p> : undefined}
            </>
        )
    }
    else if (type !== "checkbox") {
        const input = useRef();

        if (type == "number") {
            return (
                <div className={`inputControl number ${error?.message ? "errorInput" : ""}`}>
                    <label>{children}</label>
                    <div>
                        <span className="material-symbols-outlined">{icon}</span>
                        <input type={type} {...typeof register == "function" ? register(data) : {}} />
                    </div>
                </div>
            );
        }

        return (
            <>
                <div className={`inputControl ${error?.message ? "errorInput" : ""}`} onClick={() => input.current?.focus()}>
                    <label>{children}</label>
                    <div>
                        <span className="material-symbols-outlined">{icon}</span>
                        <input type={type} placeholder=" " ref={input} {...typeof register == "function" ? register(data) : {}} />
                    </div>
                </div>
                {error ? <p className="errorInputMsg">{error.message}</p> : undefined}
            </>
        );
    } else { // Si no cumple ninguna condición anterior, es un checkbox
        if (typeCheckbox == 2) {
            return (
                <div className="checkControl" onClick={() => { setChangeCheckbox2(prev => !prev) }}>
                    <input type="checkbox" style={{ display: "none" }} />
                    <span className="material-symbols-outlined" >{data ? "check_circle" : "circle"}</span>
                    <label>{children}</label>
                </div>
            );
        } else {
            const value = watch(data);

            return (
                <div className="checkControl" onClick={() => { setValue(data, !value) }}>
                    <input type="checkbox" {...typeof register == "function" ? register(data) : {}} style={{ display: "none" }} />
                    <span className="material-symbols-outlined" >{value ? "check_circle" : "circle"}</span>
                    <label>{children}</label>
                </div>
            );
        }
    }
}