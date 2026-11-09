import React, { useContext, useState } from 'react'
import '../styles/components/Sidebar.css'
import { NavLink, useLocation, useNavigate } from 'react-router'
import { UserContext } from '../context/UserProvider';

export const Sidebar = () => {

    const url = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useContext(UserContext);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const roleLabels = {
        Directivo: "Administrador",
        Preceptor_Auxiliar: "Preceptor auxiliar",
    };
    const displayName = user?.username || user?.fullname || "Usuario";
    const displayRoles = user?.roles?.map(role => roleLabels[role] || role).join(", ") || "Sin rol";

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };

    return (
        <div className={`sidebar${isCollapsed ? ' collapsed' : ''}`}>
            <button
                type="button"
                className="sidebarToggle"
                onClick={() => setIsCollapsed(value => !value)}
                aria-label={isCollapsed ? "Expandir menú" : "Minimizar menú"}
                title={isCollapsed ? "Expandir menú" : "Minimizar menú"}
            >
                <span className="material-symbols-outlined" aria-hidden="true">
                    {isCollapsed ? "chevron_right" : "chevron_left"}
                </span>
                <span className="sidebarToggleLabel">{isCollapsed ? "Expandir" : "Minimizar"}</span>
            </button>
            <ul>
                {
                    user ?
                        !user.roles.includes("Preceptor_Auxiliar") ?
                            <NavLink to={"/inicio"} className={url.pathname.startsWith("/inicio") ? "activated" : ""}>
                                <span className="material-symbols-outlined">home</span><li>Inicio</li>
                            </NavLink>
                            : undefined
                        : undefined
                }
                {
                    user ?
                        user.roles.includes("Estudiante") ?
                            <>
                                <NavLink to={"/novedades"} className={url.pathname.startsWith("/novedades") ? "activated" : ""}>
                                    <span className="material-symbols-outlined">campaign</span><li>Novedades</li>
                                </NavLink>
                                <NavLink to={"/inscripciones-carreras"} className={url.pathname.startsWith("/inscripciones-carreras") ? "activated" : ""}>
                                    <span className="material-symbols-outlined">assignment_turned_in</span><li>Inscripciones a <br /> carreras</li>
                                </NavLink>
                                <NavLink to={"/mis-materias"}>
                                    <span className="material-symbols-outlined">topic</span><li>Mis espacios<br />curriculares</li>
                                </NavLink>
                                <NavLink to={"/inscripciones-examenes"}>
                                    <span className="material-symbols-outlined">history_edu</span><li>Inscripciones a <br /> exámenes finales</li>
                                </NavLink>
                            </> : undefined
                        : undefined
                }
                {
                    user ?
                        user.roles.includes("Directivo") || user.roles.includes("Preceptor") ?
                            <>
                                <NavLink to={"/novedades"} className={url.pathname.startsWith("/novedades") ? "activated" : ""}>
                                    <span className="material-symbols-outlined">campaign</span><li>Novedades</li>
                                </NavLink>
                                <NavLink to={"/estudiantes"} className={url.pathname.startsWith("/estudiantes") ? "activated" : ""}>
                                    <span className="material-symbols-outlined">school</span><li>Estudiantes</li>
                                </NavLink>
                                <NavLink to={"/docentes"} className={url.pathname.startsWith("/docentes") ? "activated" : ""}>
                                    <span className="material-symbols-outlined">cast_for_education</span><li>Docentes</li>
                                </NavLink>
                            </> : undefined
                        : undefined
                }
                {
                    user ?
                        user.roles.includes("Directivo") ?
                            <>
                                <NavLink to={"/cargos"} className={url.pathname.startsWith("/cargos") ? "activated" : ""}>
                                    <span className="material-symbols-outlined">supervised_user_circle</span><li>Cargos</li>
                                </NavLink>
                            </> : undefined
                        : undefined
                }
                {
                    user ?
                        user.roles.includes("Directivo") || user.roles.includes("Preceptor") ?
                            <>
                                <NavLink to={"/carreras"} className={url.pathname.startsWith("/carreras") ? "activated" : ""}>
                                    <span className="material-symbols-outlined">history_edu</span><li>Carreras</li>
                                </NavLink>
                                <NavLink to={"/ciclos-lectivos"} className={url.pathname.startsWith("/ciclos-lectivos") ? "activated" : ""}>
                                    <span className="material-symbols-outlined">groups</span><li>Ciclos lectivos</li>
                                </NavLink>
                                <NavLink to={"/alumnos-riesgo"} className={url.pathname.startsWith("/alumnos-riesgo") ? "activated" : ""}>
                                    <span className="material-symbols-outlined">person_alert</span><li>Estudiantes en <br /> riesgo</li>
                                </NavLink>
                            </> : undefined
                        : undefined
                }
                {
                    user ?
                        user.roles.includes("Docente") ?
                            <>
                                <NavLink to={"/cursos"} className={url.pathname.startsWith("/cursos") ? "activated" : ""}>
                                    <span className="material-symbols-outlined">book_2</span><li>Mis cursos</li>
                                </NavLink>
                            </> : undefined
                        : undefined
                }
                {user ?
                    user.roles.includes("Directivo") || user.roles.includes("Docente") ?
                        <>
                            <NavLink to={"/mesas-examen"} className={url.pathname.startsWith("/mesas-examen") ? "activated" : ""}>
                                <span className="material-symbols-outlined">table_chart</span><li>
                                    Mesas de <br /> examen</li>
                            </NavLink>
                        </> : undefined
                    : undefined}
                {
                    user ?
                        user.roles.includes("Preceptor_Auxiliar") ?
                            <>
                                <NavLink to={"/asistencias-cursos"} className={url.pathname.startsWith("/asistencias-cursos") ? "activated" : ""}>
                                    <span className="material-symbols-outlined">book_2</span><li>Cursos</li>
                                </NavLink>
                            </> : undefined
                        : undefined
                }
                {user ? <div className="sidebarAccount">
                    <div className="sidebarUserCard" title={`${displayName} · ${displayRoles}`}>
                        <span className="material-symbols-outlined">person</span>
                        <span className="sidebarUserText">
                            <strong>{displayName}</strong>
                            <small>{displayRoles}</small>
                        </span>
                    </div>
                    <button type="button" className="sidebarLogout" onClick={handleLogout}>
                        <span className="material-symbols-outlined">door_open</span>
                        <span>Cerrar sesión</span>
                    </button>
                </div> : null}
            </ul>
        </div>
    )
}
