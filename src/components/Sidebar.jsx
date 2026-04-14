import React from 'react'
import '../styles/components/Sidebar.css'
import { useLocation } from 'react-router'

export const Sidebar = () => {

    const url = useLocation();

    return (
        /*
        - Plan de estudio
        - Materias
        - Correlatividades
        - Asistencias
        - Notas
        - Mesa de examenes
        - Inscripciones
        */
        <div className='sidebar'>
            <ul>
                <a href="/inicio" className={url.pathname == "/inicio" ? "activated" : ""}>
                    <span class="material-symbols-outlined">home</span><li>Inicio</li>
                </a>
                <a href="/estudiantes" className={url.pathname == "/estudiantes" ? "activated" : ""}>
                    <span class="material-symbols-outlined">school</span><li>Estudiantes</li>
                </a>
                <a href="/docentes" className={url.pathname == "/docentes" ? "activated" : ""}>
                    <span class="material-symbols-outlined">cast_for_education</span><li>Docentes</li>
                </a>
                <a href="/usuarios" className={url.pathname == "/usuarios" ? "activated" : ""}>
                    <span class="material-symbols-outlined">supervised_user_circle</span><li>Usuarios</li>
                </a>
                <a href="/carreras" className={url.pathname == "/carreras" ? "activated" : ""}>
                    <span class="material-symbols-outlined">history_edu</span><li>Carreras</li>
                </a>
                <a href="/" className={"logOut"}>
                   <span class="material-symbols-outlined">power_settings_circle</span><li>Cerrar Sesión</li>  
                </a>
            </ul>
        </div>
    )
}