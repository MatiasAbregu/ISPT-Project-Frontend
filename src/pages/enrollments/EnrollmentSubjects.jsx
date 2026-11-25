import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import '../../styles/pages/enrollments/EnrollmentSubjects.css'
import { Sidebar } from '../../components/Sidebar'
import { Footer } from '../../components/Footer'
import { Table } from '../../components/Table'
import { CorrelativesModal } from './CorrelativesModal'
import { ScheduleModal } from '../modals/ScheduleModal'
import { ComboControl } from '../../components/ComboControl'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router'
import EnrollmentService from '../../services/courses/EnrollmentService'
import StudentInscriptionYUP from '../../schemas/enrollments/StudentInscriptionYUP'

export const EnrollmentSubjects = () => {

    const yearNames = ["Primer Año", "Segundo Año", "Tercer Año", "Cuarto Año", "Quinto Año"];

    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();

    const { curriculumId } = useParams();
    const { schoolYearNumber } = useParams();
    const navigate = useNavigate();

    const [dataInscription, setDataInscription] = useState();
    const [loadError, setLoadError] = useState("");
    const { handleSubmit, watch, getValues, setValue, formState: { isSubmitting } } = useForm({
        resolver: yupResolver(StudentInscriptionYUP),
        defaultValues: { requestedDivisions: [] }
    });
    const requestedDivisions = watch('requestedDivisions') ?? [];

    useEffect(() => {
        document.title = "ISPT - Inscripciones";
        getAllSubjectsByCurriculumId(curriculumId, schoolYearNumber);
    }, [])

    const getComision = (subject) => {
        if (subject.isAvailable !== 3) {
            return (
                <span
                    className="material-symbols-outlined disabledDropdown"
                    title="No es posible inscribirse"
                >
                    lock
                </span>
            );
        }

        const subjectDivisionIds = (subject.divisions ?? []).map(division => Number(division.divisionId));
        const selectedDivision = requestedDivisions.find(selection =>
            subjectDivisionIds.includes(Number(selection.divisionId)))?.divisionId;
        const subjectDivisionContext = subjectDivisionIds.join(',');
        return (
            <ComboControl key={subject.subjectId} icon={"groups"}
                options={subject.divisions.map(division => ({
                    key: division.divisionId,
                    value: division.divisionName
                }))}
                value={selectedDivision}
                returnKey={true}
                setOption={setSelectedDivision}
                optionContext={subjectDivisionContext}>
                Seleccione la división a inscribirse
            </ComboControl>
        );
    };

    const setSelectedDivision = useCallback((divisionId, subjectDivisionContext) => {
        const current = getValues('requestedDivisions') ?? [];
        const subjectDivisionIds = subjectDivisionContext.split(',').filter(Boolean).map(Number);
        if (current.some(item => Number(item.divisionId) === Number(divisionId))) return;
        const next = current.filter(item => !subjectDivisionIds.includes(Number(item.divisionId)));
        if (divisionId != null) next.push({ divisionId: Number(divisionId) });
        setValue('requestedDivisions', next, { shouldDirty: true, shouldValidate: true });
    }, [getValues, setValue]);

    const removeSelectedDivision = useCallback((divisionId) => {
        const current = getValues('requestedDivisions') ?? [];
        const next = current.filter(item => Number(item.divisionId) !== Number(divisionId));
        setValue('requestedDivisions', next, { shouldDirty: true, shouldValidate: true });
    }, [getValues, setValue]);

    const showValidationToast = validationErrors => {
        toast.error(validationErrors.requestedDivisions?.message
            ?? 'Selecciona al menos una comisión para enviar la solicitud.');
    };

    const getSubjectSpanStatus = (subject) => {
        if (subject.isAvailable === 1) return (
            <span className="approved">Aprobada</span>
        );
        if (subject.isAvailable === 2) return (
            <span className="not-available">No disponible (faltan <span className="warning"
                onClick={() => { setTypeModal(<CorrelativesModal setModal={setModal} missingSubjects={subject.missingCorrelatives ?? []} />); setModal(true); }}
            >espacios curriculares correlativos</span>)</span>
        );
        if (subject.isAvailable === 4) return <span className="requested">Solicitud pendiente</span>;
        if (subject.isAvailable === 5) return <span className="requested">Inscripción aceptada</span>;
        if (subject.isAvailable === 6) return <span className="not-available">Solicitud rechazada</span>;
        if (subject.isAvailable === 3) return (
            <span className="available">Disponible</span>
        );
    }

    const sendInscription = async ({ requestedDivisions: selectedDivisions }) => {
        try {
            const response = await EnrollmentService.submitInscription(selectedDivisions.map(item => item.divisionId));
            if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
                toast.success(response.data.message || 'Solicitud enviada a preceptoría.');
                navigate('/inscripciones-carreras');
            }
        } catch (error) {
            const response = error.response?.data;
            toast.error(response?.message ?? response?.Message ?? response?.detail ?? response?.title
                ?? 'No se pudo enviar la solicitud de inscripción.');
        }
    };

    // HTTP
    const getAllSubjectsByCurriculumId = async (curriculumId, schoolYear) => {
        try {
            const res = await EnrollmentService.getAllSubjectsByCurriculumId(curriculumId, schoolYear);
            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                const subjectsData = res.data.object;
                if (!subjectsData) {
                    setLoadError(res.data.message || "No hay espacios curriculares disponibles para este legajo.");
                    return;
                }

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
                setLoadError(backendResponse.message || "No tenés un legajo activo habilitado para este plan de estudios.");
            } else {
                setLoadError("No se pudo conectar con el servidor.");
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
                        loadError ? <p>{loadError}</p> : dataInscription ?
                            Array.from({ length: dataInscription.yearsAvailable }).map((_, index) => {
                                const yearNumber = index + 1;
                                const yearTitle = yearNames[index] || `${yearNumber}° Año`;

                                const yearSubjects = dataInscription.subjects?.[yearNumber] || [];

                                const tableData = yearSubjects.map(sub => ({
                                    subjectId: sub.subjectId,
                                    selectedDivisionId: sub.divisions?.find(division => requestedDivisions.some(selection =>
                                        Number(selection.divisionId) === Number(division.divisionId)))?.divisionId,
                                    "Espacio Curricular": sub.subjectName,
                                    "Estado": getSubjectSpanStatus(sub),
                                    "División": getComision(sub)
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
                                                        const currentSubject = yearSubjects.find(sub => sub.subjectId === obj.subjectId);

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
                                                },
                                                {
                                                    value: "cancel",
                                                    show: obj => obj.selectedDivisionId != null,
                                                    onclick: obj => removeSelectedDivision(obj.selectedDivisionId)
                                                }
                                            ]}
                                            data={tableData}
                                            hiddenColumns={["subjectId", "selectedDivisionId"]}
                                            paginate={false}
                                        />
                                    </Fragment>
                                );
                            })
                            : <p>¡No se ha podido recuperar la información de inscripción! Contacte con preceptoría</p>
                    }
                    <button type="button" className="add-button" disabled={isSubmitting || Boolean(loadError)}
                        onClick={handleSubmit(sendInscription, showValidationToast)}>
                        {isSubmitting ? 'Enviando solicitud...' : 'Enviar solicitud de inscripción'}
                    </button>
                </div>
                <Footer />
            </div>
        </div>
    )
}
