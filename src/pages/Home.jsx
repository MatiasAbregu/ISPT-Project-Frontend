import React, { useEffect, useState } from 'react'
import '../styles/pages/Home.css'
import { Footer } from '../components/Footer';

export const Home = () => {
  const [user, setUser] = useState("Marcos");

    useEffect(() => {
        document.title = "ISPT - Menú"
    }, []);

    return (
        <article className="homePage">
            <h2>¡Bienvenido {user}!</h2>
            <div className="buttonContainer">
                
            </div>
            <Footer />
        </article>
    );
}
