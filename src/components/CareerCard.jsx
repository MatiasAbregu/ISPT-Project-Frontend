import React from 'react'
import '../styles/components/CareerCard.css'

export const CareerCard = ({ name, duration, title }) => {
    return (
        <div className='careerCard'>
            <h3>{name}</h3>
            <p>Duración: {duration}</p>
            <p>Título: {title}</p>
            <button type="button" className="add-button"
                onClick={() => { }}>
                Seleccionar
            </button>
        </div>
    )
}