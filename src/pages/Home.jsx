import React, { useEffect, useState } from 'react'
import '../styles/pages/Home.css'
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import { AverageGradesChart } from '../components/AverageGradesChart';
import { SubjectsChart } from '../components/SubjectsChart';

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
                            <AverageGradesChart materias={["Programación", "Matemática", "Física"]} notas={[8, 9, 7]} />
                            <SubjectsChart aprobadas={2} pendientes={1} />
                        </>
                    )}
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
