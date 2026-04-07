import React from 'react'
import '../styles/components/Sidebar.css'

export const Sidebar = () => {
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
            <a href=""><li>Estudiantes</li></a>
            <a href=""><li>Docentes</li></a>
            <a href=""><li>Usuarios</li></a>
            <a href=""><li>Carrreras</li></a>
        </ul>
    </div>
  )
}