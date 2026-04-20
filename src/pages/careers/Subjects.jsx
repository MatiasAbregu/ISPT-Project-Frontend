import React, { useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import '../../styles/pages/careers/Subjects.css';

export const Subjects = () => {

    useEffect(() => {
        document.title = "ISPT - Gestión de materias en plan de estudio";
    }, []);

    return (
        <article className='subjectsPage'>
        <Sidebar />
        <div className="subjectsPageContainer">
            <div className='controls'>
            </div>
            <div>
                <h4>Materias de la carrera:</h4>
                <div className='tableContainer'>
                    <Table columns={[
                        { name: "Código", width: 100 },
                        { name: "Nombre", width: 150 },
                        { name: "Año que se cursa", width: 150 },
                        { name: "Turno", width: 125 },
                        { name: "Formato", width: 150 }]}
                        options={["teacher", "edit"]}
                        data={[
                            { code: 1, name: "Matématicas I", year: "1 año", turn: "Mañana", format: "Asignatura" },
                            { codigo: 2, name: "Matématicas II", year: "2 año", turn: "Mañana", format: "Asignatura" }]} />
                </div>
            </div>
            <div className='controlsSubjects'>
                <button>V</button>
                <button>Ʌ</button>
            </div>
            <div>
                <h4>Materias disponibles para agregar:</h4>
                <div className='tableContainer'>
                    <Table columns={[
                        { name: "Código", width: 100 },
                        { name: "Nombre", width: 150 },
                        { name: "Año que se cursa", width: 150 },
                        { name: "Turno", width: 125 },
                        { name: "Formato", width: 150 }]}
                        options={["teacher", "edit"]}
                        data={[
                            { code: 1, name: "Matématicas III", year: "3 año", turn: "Mañana", format: "Asignatura" },
                            { code: 2, name: "Lengua I", year: "1 año", turn: "Mañana", format: "Asignatura" }]} />
                </div>
                <button className='btnSaveChanges'>Guardar cambios</button>
            </div>
            <Footer />
        </div>
        </article >
    )
}