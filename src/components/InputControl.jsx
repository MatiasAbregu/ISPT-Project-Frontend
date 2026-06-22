import React, { useRef, useState } from "react";
import '../styles/components/InputControl.css';

export const InputControl = ({ children, type, icon, register,
    data, error, setValue, watch, typeCheckbox, className, readonly, checked }) => {

    if (type == "search") {
        const input = useRef();

        return (
            <>
                <div className={`inputControl ${className}`} onClick={() => input.current?.focus()}>
                    <label>{children}</label>
                    <div>
                        <span className="material-symbols-outlined">{icon}</span>
                        <input type={"text"} placeholder="Buscar..." ref={input} {...typeof register == "function" ? register(data) : {}} />
                    </div>
                </div>
            </>
        );
    } else if (type == "textarea") {
        const input = useRef();

        return (
            <>
                <div className={`textareaControl ${className} ${error?.message ? "errorInput" : ""}`} onClick={() => input.current?.focus()}>
                    <label>{children}</label>
                    <div className="textareaContainer">
                        <span className="material-symbols-outlined">{icon}</span>
                        <textarea placeholder=" " readOnly={readonly} {...typeof register == "function" ? register(data) : {}}></textarea>
                    </div>
                </div>
                {error ? <p className="errorInputMsg">{error.message}</p> : undefined}
            </>
        )
    }
    else if (type == "add_text") {
        const input = useRef();

        return (
            <>
                <div className={`inputControl ${error?.message ? "errorInput" : ""}`} onClick={() => input.current?.focus()}>
                    <label>{children}</label>
                    <div>
                        <span className="material-symbols-outlined">{icon}</span>
                        <input type={type} placeholder=" " ref={input}
                            {...typeof register == "function" ? register(data) : {}} />
                        <button class="material-symbols-outlined add_text" type="submit">add_circle</button>
                    </div>
                </div>
            </>
        );
    }
    else if (type !== "checkbox") {
        const input = useRef();

        if (type == "number") {
            return (
                <div className={`inputControl number ${className} ${error?.message ? "errorInput" : ""}`}>
                    <label>{children}</label>
                    <div>
                        <span className="material-symbols-outlined">{icon}</span>
                        <input type={type} readOnly={readonly} {...typeof register == "function" ? register(data) : {}} />
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
                        <input type={type} placeholder=" " readOnly={readonly} ref={input} {...typeof register == "function" ? register(data) : {}} />
                    </div>
                </div>
                {error ? <p className="errorInputMsg">{error.message}</p> : undefined}
            </>
        );
    } else { // Si no cumple ninguna condición anterior, es un checkbox
        if (typeCheckbox == 2) {
            const [check, setCheck] = useState(checked ?? false);

            return (
                <div className="checkControl" onClick={() => { const newValue = !check; setCheck(newValue); 
                if (typeof onclick === "function") onclick(newValue); }}>
                    <input type="checkbox" readOnly={readonly} style={{ display: "none" }} />
                    <span className="material-symbols-outlined" >{check ? "check_circle" : "circle"}</span>
                    <label>{children}</label>
                </div>
            );
        } else { //Checkbox con REGISTER
            const value = watch(data);

            return (
                <div className="checkControl" onClick={() => { setValue(data, !value) }}>
                    <input type="checkbox" readOnly={readonly} {...typeof register == "function" ? register(data) : {}}
                        style={{ display: "none" }} />
                    <span className="material-symbols-outlined" >{value ? "check_circle" : "circle"}</span>
                    <label>{children}</label>
                </div>
            );
        }
    }
}