import React, { useContext } from 'react'
import '../styles/components/Sidebar.css'
import { NavLink, useLocation } from 'react-router'
import { UserContext } from '../context/UserProvider';

export const Sidebar = () => {

    const url = useLocation();
    const { user } = useContext(UserContext);

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
                {
                    user ?
                        user.role != "Preceptor_Auxiliar" ?
                            <NavLink to={"/inicio"} className={url.pathname.startsWith("/inicio") ? "activated" : ""}>
                                <span class="material-symbols-outlined">home</span><li>Inicio</li>
                            </NavLink>
                            : undefined
                        : undefined
                }
                {
                    user ?
                        user.role == "Estudiante" ?
                            <>
                                <NavLink to={"/inscripciones-carreras"} className={url.pathname.startsWith("/inscripciones-carreras") ? "activated" : ""}>
                                    <span class="material-symbols-outlined">assignment_turned_in</span><li>Inscripciones a <br /> carreras</li>
                                </NavLink>
                                <NavLink to={"/mis-materias"}>
                                    <span class="material-symbols-outlined">topic</span><li>Mis espacios<br />curriculares</li>
                                </NavLink>
                                <NavLink to={"/inscripciones-examenes"}>
                                    <span class="material-symbols-outlined">history_edu</span><li>Inscripciones a <br /> exámenes finales</li>
                                </NavLink>
                            </> : undefined
                        : undefined
                }
                {
                    user ?
                        user.role == "Directivo" || user.role == "Preceptor" ?
                            <>
                                <NavLink to={"/estudiantes"} className={url.pathname.startsWith("/estudiantes") ? "activated" : ""}>
                                    <span class="material-symbols-outlined">school</span><li>Estudiantes</li>
                                </NavLink>
                                <NavLink to={"/docentes"} className={url.pathname.startsWith("/docentes") ? "activated" : ""}>
                                    <span class="material-symbols-outlined">cast_for_education</span><li>Docentes</li>
                                </NavLink>
                            </> : undefined
                        : undefined
                }
                {
                    user ?
                        user.role == "Directivo" ?
                            <>
                                <NavLink to={"/cargos"} className={url.pathname.startsWith("/cargos") ? "activated" : ""}>
                                    <span class="material-symbols-outlined">supervised_user_circle</span><li>Cargos</li>
                                </NavLink>
                            </> : undefined
                        : undefined
                }
                {
                    user ?
                        user.role == "Directivo" || user.role == "Preceptor" ?
                            <>
                                <NavLink to={"/carreras"} className={url.pathname.startsWith("/carreras") ? "activated" : ""}>
                                    <span class="material-symbols-outlined">history_edu</span><li>Carreras</li>
                                </NavLink>
                                <NavLink to={"/ciclos-lectivos"} className={url.pathname.startsWith("/ciclos-lectivos") ? "activated" : ""}>
                                    <span class="material-symbols-outlined">groups</span><li>Ciclos lectivos</li>
                                </NavLink>
                                <NavLink to={"/alumnos-riesgo"} className={url.pathname.startsWith("/alumnos-riesgo") ? "activated" : ""}>
                                    <span class="material-symbols-outlined">person_alert</span><li>Estudiantes en <br /> riesgo</li>
                                </NavLink>
                            </> : undefined
                        : undefined
                }
                {
                    user ?
                        user.role == "Docente" ?
                            <>
                                <NavLink to={"/cursos"} className={url.pathname.startsWith("/cursos") ? "activated" : ""}>
                                    <span class="material-symbols-outlined">book_2</span><li>Mis cursos</li>
                                </NavLink>
                            </> : undefined
                        : undefined
                }
                {user ?
                    user.role == "Directivo" || user.role == "Docente" ?
                        <>
                            <NavLink to={"/mesas-examen"} className={url.pathname.startsWith("/mesas-examen") ? "activated" : ""}>
                                <span class="material-symbols-outlined">table_chart</span><li>
                                    {user.role == "Directivo" ? "Mesas" : "Mis mesas"} de <br /> examen</li>
                            </NavLink>
                        </> : undefined
                    : undefined}
                {
                    user ?
                        user.role == "Preceptor_Auxiliar" ?
                            <>
                                <NavLink to={"/asistencias-cursos"} className={url.pathname.startsWith("/asistencias-cursos") ? "activated" : ""}>
                                    <span class="material-symbols-outlined">book_2</span><li>Cursos</li>
                                </NavLink>
                            </> : undefined
                        : undefined
                }
                <a href="/" className={"logOut"}>
                    <span class="material-symbols-outlined">power_settings_circle</span><li>Cerrar Sesión</li>
                </a>
            </ul>
        </div>
    )
}