import React, { useEffect, useState } from 'react'
import '../styles/pages/Home.css'
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import { BarChart } from '../components/BarChart' 
import { Pie } from 'react-chartjs-2';
import { PieChart } from '../components/PieChart';

export const Home = () => {
    // 1. Docente , 2. Estudiante
    const [user, setUser] = useState({ username: "Marcos", role: "Docente" });
    
    useEffect(() => {
        document.title = "ISPT - Menú"
    }, []);

    return (
        <article className="homePage">
            <Sidebar />
            <div className='homePageContainer'>
                <h2>¡Bienvenido {user.username}!</h2>
                <div className='mainContent'>
                    <div className="chartsContainer">
                        {user.role === "Estudiante" && (
                            <>
                                <BarChart fields={["Materia 1", "Materia 2", "Materia 3"]} values={[8, 9, 7]} label={"Notas"}
                                 text={"Notas promedio de las materias"} stepSize={1} minY={1} maxY={10}/>
                                <PieChart text={"Materias"} labels={["Aprobadas", "Pendientes"]} values={[2, 1]} 
                                colors={['rgba(0, 230, 118, 0.5)',
                                'rgba(255, 82, 82, 0.5)']}/>
                                <div className="enrollmentContainer">
                                    <h3>Inscripciones</h3>
                                    <p>Próximamente</p>
                                </div>
                            </>
                        )}
                        {user.role === "Docente" && (
                            <>
                                <BarChart label={"%"} text={"Porcentajes de las asistencias de los alumnos"} 
                                fields={["Marcos", "Juan", "Pepe"]} values={[10, 50, 90]} stepSize={10} minY={0} maxY={100}/>
                                <div className="riskContainer">
                                
                                <div className="riskContainer">
                                <PieChart text={"Porcentaje de alumnos en riesgo"} labels={["No Riesgo", "Riesgo"]} isPercentage={true} values={[2, 1]} 
                                colors={['rgba(0, 230, 118, 0.5)',
                                'rgba(255, 82, 82, 0.5)']}/>
                                <div className="riskCard">
                                    <p>Estudiantes en riesgo = 1</p>
                                    <button>Ver más</button>
                                </div>
                                </div>
                                </div>
                            </>)}
                    </div>
                    
                </div>
                <Footer />
            </div>
        </article>
    );
}
