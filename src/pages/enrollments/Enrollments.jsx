import React from 'react'
import '../../styles/pages/enrollments/Enrollments.css'
import { Sidebar } from '../../components/Sidebar'
import { Footer } from '../../components/Footer'
import { CareerCard } from '../../components/CareerCard'
import { useNavigate } from 'react-router-dom'

export const Enrollments = () => {
    const navigate = useNavigate()
    return (
        <div className='enrollmentsPage'>
            <Sidebar />
            <div className='enrollmentsPageContainer'>
                <h2>Seleccione una carrera para inscribirse</h2>
                <div className='mainContent'>
                    <CareerCard name="Carrera 1" duration="3 años" title="Técnico Superior" onClick={() => { navigate('/inscripciones-carreras/1/materias') }} />
                    <CareerCard name="Carrera 2" duration="4 años" title="Técnico Muy Superior" onClick={() => { navigate('/inscripciones-carreras/1/materias') }} />
                </div>
                <Footer />
            </div>
        </div>
    )
}
