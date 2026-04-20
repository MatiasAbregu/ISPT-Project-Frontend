import React from "react";
import '../styles/components/PathInfo.css';
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export const PathInfo = ({}) => {

    const url = useLocation();

    const translations = {
        cursos: "Cursos",
        evaluaciones: "Evaluaciones",
        "mesas-examenes": "Mesas de Exámenes",
        notas: "Notas",
        alumnos: "Alumnos",
        asistencia: "Asistencia",
        "mis-materias": "Materias"
    };

    const segments = url.pathname.split("/").filter(Boolean);

 return (
        <div className="pathInfo">
            {segments.map((s, i) => {

                const isId = !isNaN(s);
                if (isId) return;

                const label = translations[s] || s;

                const pathTo = "/" + segments
                    .slice(0, i + 1)
                    .join("/");

                const isLast = i === segments.length - 1;

                return (
                    <span key={i}>
                        {i > 0 && " > "}

                        {isLast ? (
                            <span>{label}</span>
                        ) : (
                            <Link to={pathTo}>{label}</Link>
                        )}
                    </span>
                );
            })}
        </div>
);
}
