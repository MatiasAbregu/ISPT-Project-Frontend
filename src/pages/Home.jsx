import React, { useEffect, useState } from 'react'
import '../styles/pages/Home.css'
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import { BarChart } from '../components/BarChart' 
import { Pie } from 'react-chartjs-2';
import { PieChart } from '../components/PieChart';

export const Home = () => {
    const [user, setUser] = useState({ username: "Marcos", role: "Estudiante" });

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
                            </>
                        )}
                        {user.role === "Profesor" && (<></>)}
                    </div>
                    <div className="enrollmentContainer">
                        <h3>Inscripciones</h3>
                        <p>Próximamente</p>
                    </div>
                </div>
                <Footer />
            </div>
        </article>
    );
}
