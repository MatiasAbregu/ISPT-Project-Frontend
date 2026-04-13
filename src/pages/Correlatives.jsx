import React, { useEffect } from 'react'
import { Table } from '../components/Table'
import { Footer } from '../components/Footer'
import '../styles/pages/Correlatives.css';
import { Sidebar } from '../components/Sidebar';

export const Correlatives = () => {

  useEffect(() => {
    document.title = "ISPT - Gestión de correlativas de plan de estudio";
  }, []);

  return (
    <article className='correlativesPage'>
      <Sidebar />
      <div className='correlativesPageContent'>
        <h4>Materias del plan de estudio:</h4>
        <p className='legend'>(Toque sobre el botón de las flechas de una materia para comenzar a asignar correlativas EN ESA MISMA MATERIA)</p>
        <div className='tableContainer'>
          <Table columns={[
            { name: "Código", width: 100 },
            { name: "Nombre", width: 150 },
            { name: "Año que se cursa", width: 150 },
            { name: "Turno", width: 125 },
            { name: "Formato", width: 150 }]}
            options={["correlatives2", "teacher"]}
            data={[
              { code: 1, name: "Matématicas I", year: "1 año", turn: "Mañana", format: "Asignatura" },
              { codigo: 2, name: "Matématicas II", year: "2 año", turn: "Mañana", format: "Asignatura" }]} />
        </div>
      </div>
      <Footer />
    </article >
  )
}