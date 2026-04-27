import React from 'react'
import '../styles/components/ExamCard.css'

export const ExamCard = ({ fecha, modalidad, onClick, isRegistered }) => {
    return (
        <div className='examCard'>
            <h3>{fecha}</h3>
            <p>Modalidad: {modalidad}</p>
            {isRegistered ? (
                <button type="button" className="cancel-button"
                    onClick={onClick}>
                    Cancelar Inscripción
                </button>
            ) : 1 > 0 ? (
                <button type="button" className="register-button"
                    onClick={onClick}>
                    Inscribirse
                </button>
            ) : (
                <button type="button" className="register-button" disabled>
                    Inscripción cerrada
                </button>
            )}
        </div>
    )
}