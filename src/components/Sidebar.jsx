import React, { useContext } from 'react'
import '../styles/components/Sidebar.css'
import { useLocation } from 'react-router'
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
                <a href="/inicio" className={url.pathname.startsWith("/inicio") ? "activated" : ""}>
                    <span class="material-symbols-outlined">home</span><li>Inicio</li>
                </a>
                {
                    user ?
                        user.role == "Estudiante" ?
                            <>
                                <a href="/inscripciones-carreras" className={url.pathname.startsWith("/inscripciones-carreras") ? "activated" : ""}>
                                    <span class="material-symbols-outlined">assignment_turned_in</span><li>Inscripciones a <br/> Carreras</li>
                                </a>
                                <a href="/mis-materias" className={url.pathname.startsWith("/mis-materias")  ? "activated" : ""}>
                                    <span class="material-symbols-outlined">topic</span><li>Mis Espacios<br/>Curriculares</li>
                                </a>
                                <a href="/inscripciones-examenes" className={url.pathname.startsWith("/inscripciones-examenes") ? "activated" : ""}>
                                    <span class="material-symbols-outlined">history_edu</span><li>Inscripciones a <br/> Exámenes Finales</li>
                                </a>
                            </> : undefined
                        : undefined
                }
                {
                    user ?
                        user.role == "Directivo" || user.role == "Preceptor" ?
                            <>
                                <a href="/estudiantes" className={url.pathname.startsWith("/estudiantes") ? "activated" : ""}>
                                    <span class="material-symbols-outlined">school</span><li>Estudiantes</li>
                                </a>
                                <a href="/docentes" className={url.pathname.startsWith("/docentes") ? "activated" : ""}>
                                    <span class="material-symbols-outlined">cast_for_education</span><li>Docentes</li>
                                </a>
                            </> : undefined
                        : undefined
                }
                {
                    user ?
                        user.role == "Directivo" ?
                            <>
                                <a href="/cargos" className={url.pathname.startsWith("/cargos") ? "activated" : ""}>
                                    <span class="material-symbols-outlined">supervised_user_circle</span><li>Cargos</li>
                                </a>
                                <a href="/carreras" className={url.pathname.startsWith("/carreras") ? "activated" : ""}>
                                    <span class="material-symbols-outlined">history_edu</span><li>Carreras</li>
                                </a>
                                <a href="/alumnos-riesgo" className={url.pathname.startsWith("/alumnos-riesgo") ? "activated" : ""}>
                                    <span class="material-symbols-outlined">person_alert</span><li>Alumnos en <br /> riesgo</li>
                                </a>
                            </> : undefined
                        : undefined
                }
                {
                    user ?
                        user.role == "Docente" ?
                            <>
                                <a href="/cursos" className={url.pathname.startsWith("/cursos") ? "activated" : ""}>
                                    <span class="material-symbols-outlined">book_2</span><li>Mis Cursos</li>
                                </a></> : undefined
                        : undefined
                }
                <a href="/" className={"logOut"}>
                    <span class="material-symbols-outlined">power_settings_circle</span><li>Cerrar Sesión</li>
                </a>
            </ul>
        </div>
    )
}