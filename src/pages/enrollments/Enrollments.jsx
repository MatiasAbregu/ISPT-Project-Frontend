import React from 'react'
import '../../styles/pages/enrollments/Enrollments.css'
import { Sidebar } from '../../components/Sidebar'
import { Footer } from '../../components/Footer'
import { CareerCard } from '../../components/CareerCard'

export const Enrollments = () => {
    return (
        <div className='enrollmentsPage'>
            <Sidebar />
            <div className='enrollmentsPageContainer'>
                <h1>Enrollments</h1>
                <div className='mainContent'>
                    <CareerCard name="Carrera 1" duration="3 años" title="Técnico Superior" />
                    <CareerCard name="Carrera 2" duration="4 años" title="Técnico Muy Superior" />
                    <CareerCard name="Carrera 3" duration="2 años" title="Técnico Inferior" />
                </div>
                <Footer />
            </div>
        </div>
    )
}
