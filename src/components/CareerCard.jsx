import React from 'react'
import '../styles/components/CareerCard.css'

export const CareerCard = ({ name, duration, title, vigencyDate, onClick }) => {
    return (
        <div className='careerCard'>
            <h3>{name}</h3>
            <p>Duración: {duration}</p>
            <p>Título: {title}</p>
            <p style={{ textAlign: "center" }}>Fecha límite de inscripción: <br /> {vigencyDate}</p>
            <button type="button" className="add-button"
                onClick={onClick}>
                Seleccionar
            </button>
        </div>
    )
}