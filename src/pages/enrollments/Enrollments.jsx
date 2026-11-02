import React, { useEffect, useState } from 'react'
import '../../styles/pages/enrollments/Enrollments.css'
import { Sidebar } from '../../components/Sidebar'
import { Footer } from '../../components/Footer'
import { CareerCard } from '../../components/CareerCard'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import EnrollmentService from '../../services/courses/EnrollmentService'

export const Enrollments = () => {
    const navigate = useNavigate()

    const [careers, setCareers] = useState([]);

    useEffect(() => {
        document.title = "ISPT - Inscripciones";
        getAllCareersForInscription();
    }, []);

    const getAllCareersForInscription = async () => {
        try {
            const res = await EnrollmentService.getAllCareersForInscription();
            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                setCareers(res.data.object);
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data) {
                const backendResponse = error.response.data;
                toast.error(backendResponse.message);
            } else {
                toast.error("No se pudo conectar con el servidor.");
            }
        }
    }

    return (
        <div className='enrollmentsPage'>
            <Sidebar />
            <div className='enrollmentsPageContainer'>
                <h2>Seleccione una carrera para inscribirse</h2>
                <div className='mainContent'>
                    {careers.length > 0 ?
                        careers.map((career) => (
                            <CareerCard key={career.curriculumId} name={career.careerName} duration={career.duration} title={career.title} vigencyDate={career.vigencyDate}
                                onClick={() => { navigate(`/inscripciones-carreras/${career.curriculumId}/espacios-curriculares/${career.schoolYearNumber}`) }} />
                        ))
                        :
                        <h3>¡No hay carreras disponibles para su inscripción en este momento!</h3>
                    }
                </div>
                <Footer />
            </div>
        </div>
    )
}