import React, { useContext, useEffect, useState } from 'react'
import '../styles/pages/Home.css'
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import { BarChart } from '../components/BarChart'
import { ComboControl } from '../components/ComboControl'
import { PieChart } from '../components/PieChart';
import { UserContext } from '../context/UserProvider';

export const Home = () => {

    const { user } = useContext(UserContext);

    useEffect(() => {
        document.title = "ISPT - Menú"
    }, []);

    return (
        <article className="homePage">
            <Sidebar />
            <div className='homePageContainer'>
                <h2>¡Bienvenido {user.username}!</h2>

                {/* Componente para docente */}
                {user.role === "Docente" &&
                    <ComboControl options={[{ key: 1, value: "Matemática I" }, { key: 2, value: "Inglés" }]} notShowLabel={true}>
                        Materia
                    </ComboControl>}

                <div className="chartsContainer">
                    {user.role === "Directivo" && (
                        <>
                            <BarChart fields={["Profesorado", "Trayecto"]} values={[40, 15]} label={"Alumnos"}
                                text={"Total de matriculados en cada carrera"} stepSize={1} />
                            <BarChart fields={["Alto", "Medio", "Baja"]} values={[4, 10, 50]} label={"Alumnos"}
                                text={"Total de alumnos en riesgo"} stepSize={1} />
                            <PieChart labels={["Alto", "Medio", "Bajo"]}
                                title={"Porcentaje de alumnos en riesgo"} isPercentage={true} values={[4, 10, 50]}
                                colors={[
                                    'rgb(255, 68, 68)',
                                    'rgb(233, 255, 108)',
                                    'rgb(75, 211, 89)']
                                } />
                            <BarChart fields={["Titular", "Suplentes", "Interino", "EACI"]} values={[10, 1, 1, 0]} label={"Docentes"}
                                text={"Docentes por situación de revista"} stepSize={1} />
                        </>)

                    }
                    {user.role === "Estudiante" && (
                        <>
                            <BarChart fields={["Materia 1", "Materia 2", "Materia 3"]} values={[8, 9, 7]} label={"Notas"}
                                text={"Notas promedio de las materias"} stepSize={1} minY={1} maxY={10} />
                            <PieChart title={"Estado de mis materias"}
                                text={"Materias"} labels={["Aprobadas", "Pendientes"]} values={[2, 1]}
                                colors={['rgba(0, 230, 118, 0.5)',
                                    'rgba(255, 82, 82, 0.5)']} />
                            <div className="enrollmentContainer">
                                <h3>Inscripciones</h3>
                                <p>Próximamente</p>
                            </div>
                        </>
                    )}
                    {user.role === "Docente" && (
                        <>
                            <div className='stadisticContainer'>
                                <BarChart label={"%"} text={"Porcentajes de las asistencias de los alumnos"}
                                    fields={["Marcos", "Juan", "Pepe"]} values={[10, 50, 90]} stepSize={10} minY={0} maxY={100} />
                                <div className="studentsInDangerGraphic">
                                    <PieChart labels={["Alto", "Medio", "Bajo"]}
                                        title={"Porcentaje de alumnos en riesgo"} isPercentage={true} values={[1, 0, 25]}
                                        colors={[
                                            'rgb(255, 68, 68)',
                                            'rgb(233, 255, 108)',
                                            'rgb(75, 211, 89)']
                                        } />
                                    <div className="riskCard">
                                        <p>Alumnos en riesgo = 1</p>
                                        <button>Ver más</button>
                                    </div>
                                </div>
                            </div>
                        </>)}
                </div>
                <Footer />
            </div>
        </article>
    );
}
