import React, { Fragment, useEffect, useState } from 'react'
import '../../styles/pages/enrollments/EnrollmentSubjects.css'
import { Sidebar } from '../../components/Sidebar'
import { Footer } from '../../components/Footer'
import { Table } from '../../components/Table'
import { CorrelativesModal } from './CorrelativesModal'
import { ScheduleModal } from '../modals/ScheduleModal'
import { ComboControl } from '../../components/ComboControl'
import toast from 'react-hot-toast'
import { useParams } from 'react-router'
import EnrollmentService from '../../services/courses/EnrollmentService'

export const EnrollmentSubjects = () => {

    const yearNames = ["Primer Año", "Segundo Año", "Tercer Año", "Cuarto Año", "Quinto Año"];

    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();

    const { curriculumId } = useParams();
    const { schoolYearNumber } = useParams();

    const [dataInscription, setDataInscription] = useState();

    useEffect(() => {
        document.title = "ISPT - Inscripciones";
        getAllSubjectsByCurriculumId(curriculumId, schoolYearNumber);
    }, [])

    const getComision = (estado, divisions) => {
        if (estado === 2 || estado === 1) {
            return (
                <span
                    className="material-symbols-outlined disabledDropdown"
                    title="No es posible inscribirse"
                >
                    lock
                </span>
            );
        }

        return (
            <ComboControl icon={"groups"}
                options={divisions.map(division => ({
                    value: division.divisionName
                }))}>
                Seleccione la división a inscribirse
            </ComboControl>
        );
    };

    const getSubjectSpanStatus = (estado) => {
        if (estado === 1) return (
            <span className="approved">Aprobada</span>
        );
        if (estado === 2) return (
            <span className="not-available">No disponible (Faltan <span className="warning"
                onClick={() => { setTypeModal(<CorrelativesModal setModal={setModal} />); setModal(true); }}
            >Correlativas</span>)</span>
        );
        if (estado === 3) return (
            <span className="available">Disponible</span>
        );
    }

    // HTTP
    const getAllSubjectsByCurriculumId = async (curriculumId, schoolYear) => {
        try {
            const res = await EnrollmentService.getAllSubjectsByCurriculumId(curriculumId, schoolYear);
            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                const subjectsData = res.data.object;

                const groupedSubjects = subjectsData.subjects.reduce((acc, item) => {
                    const year = item.yearAvailable;
                    if (!acc[year]) {
                        acc[year] = [];
                    }
                    acc[year].push(item);
                    return acc;
                }, {});

                setDataInscription({
                    yearsAvailable: subjectsData.yearsAvailable,
                    subjects: groupedSubjects
                });

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

    const getSchedules = async (divisionIds) => {
        try {
            const response = await EnrollmentService.getSchedules(divisionIds);
            if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
                console.log(response.data.object);
                return response.data.object;
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
        <div className='enrollmentSubjectsPage'>
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <div className='enrollmentSubjectsPageContainer'>
                <h2>Seleccione una división por espacio curricular</h2>
                <div className='mainContent'>
                    {
                        dataInscription ?
                            Array.from({ length: dataInscription.yearsAvailable }).map((_, index) => {
                                const yearNumber = index + 1;
                                const yearTitle = yearNames[index] || `${yearNumber}° Año`;

                                const yearSubjects = dataInscription.subjects?.[yearNumber] || [];

                                const tableData = yearSubjects.map(sub => ({
                                    "Espacio Curricular": sub.subjectName,
                                    "Estado": getSubjectSpanStatus(sub.isAvailable),
                                    "División": getComision(sub.isAvailable, sub.divisions)
                                }));

                                return (
                                    <Fragment key={yearNumber}>
                                        <h3>{yearTitle}</h3>
                                        <Table
                                            columns={[
                                                { name: "Espacio Curricular", width: 160 },
                                                { name: "Estado", width: 180 },
                                                { name: "División", width: 200 }
                                            ]}
                                            options={[
                                                {
                                                    value: "schedule",
                                                    onclick: async (obj) => {
                                                        const subjectName = obj["Espacio Curricular"];
                                                        const currentSubject = yearSubjects.find(sub => sub.subjectName === subjectName);

                                                        const divisionIds = currentSubject?.divisions
                                                            ? currentSubject.divisions.map(div => div.divisionId)
                                                            : [];

                                                        const schedules = await getSchedules(divisionIds);
                                                        if (schedules) {
                                                            setTypeModal(
                                                                <ScheduleModal setModal={setModal} schedules={schedules} />);
                                                            setModal(true);
                                                        }
                                                    }
                                                }
                                            ]}
                                            data={tableData}
                                        />
                                    </Fragment>
                                );
                            })
                            : <p>¡No se ha podido recuperar la información de inscripción! Contacte con preceptoría</p>
                    }
                    <button type="button" className="add-button"
                        onClick={() => { }}>
                        Confirmar Inscripción
                    </button>
                </div>
                <Footer />
            </div>
        </div>
    )
}
