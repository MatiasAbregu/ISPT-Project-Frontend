import React, { useEffect, useState } from 'react'
import '../styles/pages/Home.css'
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';

export const Home = () => {
    const [user, setUser] = useState({ username: "Marcos", role: "Administrador" });

    useEffect(() => {
        document.title = "ISPT - Menú"
    }, []);

    return (
        <article className="homePage">
            <Sidebar />
            <div className='homePageContainer'>
                <h2>¡Bienvenido {user.username}!</h2>
                <div className="buttonContainer">

                </div>
                <Footer />
            </div>
        </article>
    );
}
