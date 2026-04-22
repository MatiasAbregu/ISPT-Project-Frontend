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
                    <ExamCard fecha="2026-06-18 | 09:00" modalidad="Presencial - Aula 1" cupos={10} isRegistered={true} onClick={() => { navigate('/inscripciones-examenes') }} />
                    <ExamCard fecha="2026-06-19 | 14:00" modalidad="Presencial - Aula 2" cupos={10} isRegistered={false} onClick={() => { navigate('/inscripciones-examenes') }} />
                </div>
                <Footer />
            </div>
        </div>
    )
}
