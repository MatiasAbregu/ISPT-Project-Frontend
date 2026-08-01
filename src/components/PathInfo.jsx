import React from "react";
import '../styles/components/PathInfo.css';
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export const PathInfo = ({ }) => {

    const url = useLocation();

    const translations = {
        cursos: "Cursos",
        evaluaciones: "Evaluaciones",
        "mesas-examenes": "Mesas de Exámenes",
        notas: "Notas",
        alumnos: "Alumnos",
        asistencia: "Asistencia",
        "mis-materias": "Materias",
        carreras: "Carreras",
        "plan-de-estudio": "Plan de estudio",
        "ciclo-academico": "Ciclo académico",
        "espacios-curriculares": "Espacios curriculares",
        asignaciones: "Docentes asignados",
        correlativas: "Correlatividades",
        "asistencia-diaria": "Asistencia diaria",
        "asistencias-cursos": "Cursos",
        "dias": "Días",
        "mesas-examen": "Mesas de Examen",
        "comisiones": "Comisiones",
        "ciclos-lectivos": "Ciclos lectivos",
        estudiantes: "Estudiantes",
        divisiones: "Divisiones",
        horarios: "Horarios"
    };

    const rawSegments = url.pathname.split("/").filter(Boolean);

    const getLabel = (segment) => {
        const decoded = decodeURIComponent(segment);
        const match = decoded.match(/^(.+):([^:]+)$/)

        if (match) {
            const [, prefix, name] = match;
            const translatedPrefix = translations[prefix] || prefix;
            const formattedName = name.replace("_", "/");
            return `${translatedPrefix} (${formattedName})`;
        }

        return translations[decoded] || decoded;
    }

    const cleanSegment = (segment) => {
        const match = segment.match(/^(.+):([^:]+)$/);
        return match ? match[1] : segment;
    };

    const buildPathTo = (index) => {
        const slicedSegments = rawSegments.slice(0, index + 1).map(cleanSegment);

        return "/" + slicedSegments.join("/");
    };

    return (
        <div className="pathInfo">
            {rawSegments.map((s, i) => {

                const isId = !isNaN(s);
                const isInfo = s === "A";
                if (isId) return null;

                const label = getLabel(s);
                const pathTo = buildPathTo(i);
                const isLast = i === rawSegments.length - 1;

                return (
                    <span key={i}>
                        {i > 0 && " > "}

                        {isLast ? (
                            <span>{label}</span>
                        ) : (
                            isInfo ? (
                                <span>{label}</span>
                            ) : (
                                <Link to={pathTo}>{label}</Link>
                            )
                        )}
                    </span>
                );
            })}
        </div>
    );
}
