import React, { useContext, useEffect } from 'react'
import '../styles/pages/Login.css';
import { useForm } from "react-hook-form";
import LoginYUP from "../schemas/LoginYUP";
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { InputControl } from "../components/InputControl";
import { UserContext } from '../context/UserProvider';

export const Login = () => {

    const navigate = useNavigate();
    const { user, login } = useContext(UserContext);

    useEffect(() => {
        document.title = "ISPT - Iniciar Sesión"
    }, []);

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({ resolver: yupResolver(LoginYUP) });

    const onHandle = (e) => {
        console.log(e);
        if (e.username.toLowerCase() == "directivo") login({ username: "Directivo", role: "Directivo" })
        else if (e.username.toLowerCase() == "preceptor") login({ username: "Preceptor", role: "Preceptor" })
        else if (e.username.toLowerCase() == "preceptor_auxiliar") login({ username: "Preceptor Auxiliar", role: "Preceptor_Auxiliar" })
        else if (e.username.toLowerCase() == "docente") login({ username: "Docente", role: "Docente" })
        else if (e.username.toLowerCase() == "estudiante") login({ username: "Estudiante", role: "Estudiante" })
        else return;
        navigate("/inicio");
    }

    return (
        <>
            <form className="loginForm" onSubmit={handleSubmit(onHandle)}>
                <div className="upForm">
                    <img src="logo.png" className="logoLogin" />
                    <div className="inputContainer">
                        <InputControl type={"text"} icon={"account_circle"}
                            register={register} data={"username"} error={errors["username"]}>Nombre de usuario</InputControl>
                        <InputControl type={"password"} icon={"key_vertical"}
                            register={register} data={"password"} error={errors["password"]} >Contraseña</InputControl>
                        <InputControl type={"checkbox"} register={register}
                            setValue={setValue} data={"sessiontype"} watch={watch} >Mantener sesión iniciada</InputControl>
                    </div>
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
            <Footer />
        </>
    );
}