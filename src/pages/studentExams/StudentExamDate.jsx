import React from 'react'
import '../../styles/pages/studentExams/StudentExamDate.css'
import { Sidebar } from '../../components/Sidebar'
import { Footer } from '../../components/Footer'
import { ExamCard } from '../../components/ExamCard'
import { useNavigate } from 'react-router-dom'

export const StudentExamDate = () => {
    const navigate = useNavigate()
    return (
        <div className='studentExamDatePage'>
            <Sidebar />
            <div className='studentExamDatePageContainer'>
                <h2>Seleccione una fecha para inscribirse</h2>
                <div className='mainContent'>
                    <ExamCard fecha="Fecha: 06/18/26 | Hora: 09:00hs" modalidad="Presencial - Aula 1" isRegistered={true} onClick={() => { navigate('/inscripciones-examenes') }} />
                    <ExamCard fecha="Fecha: 06/19/26 | Hora: 14:00hs" modalidad="Presencial - Aula 2" isRegistered={false} onClick={() => { navigate('/inscripciones-examenes') }} />
                </div>
                <Footer />
            </div>
        </div>
    )
}
