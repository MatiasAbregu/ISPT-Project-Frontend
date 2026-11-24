import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Sidebar } from '../../components/Sidebar';
import { Footer } from '../../components/Footer';
import { PathInfo } from '../../components/PathInfo';
import { Table } from '../../components/Table';
import { ComboControl } from '../../components/ComboControl';
import InscriptionRequestsService from '../../services/schoolYears/InscriptionRequestsService';
import '../../styles/pages/schoolYear/InscriptionRequests.css';

export const InscriptionRequests = () => {
    const { id: schoolYearId, ciclosLectivosSlug } = useParams();
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [requestView, setRequestView] = useState('pending');

    useEffect(() => {
        document.title = 'ISPT - Solicitudes de inscripción';
        const loadRequests = async () => {
            try {
                const response = await InscriptionRequestsService.getBySchoolYear(schoolYearId);
                setRequests(response.data?.object ?? []);
            } catch (error) {
                toast.error(error.response?.data?.message ?? 'No se pudieron cargar las solicitudes.');
            } finally {
                setLoading(false);
            }
        };
        loadRequests();
    }, [schoolYearId]);

    const visibleRequests = requests.filter(student => {
        const hasPendingSubjects = typeof student.pendingDivisionsCount === 'number'
            ? student.pendingDivisionsCount > 0
            : student.divisions.some(division => Number(division.status) === 0 || String(division.status).toLowerCase() === 'pendiente');
        const isCompleted = typeof student.isCompleted === 'boolean'
            ? student.isCompleted
            : student.divisions.length > 0 && !hasPendingSubjects;
        return requestView === 'pending' ? hasPendingSubjects : isCompleted;
    });

    const tableData = visibleRequests.map(student => ({
        fileCurriculumId: student.fileCurriculumId,
        'Legajo': student.fileCode,
        'Estudiante': `${student.lastName}, ${student.firstName}`,
        'Espacios curriculares solicitados': student.divisions.length
    }));

    return <article className="inscriptionRequestsPage">
        <Sidebar />
        <div className="inscriptionRequestsPageContainer">
            <PathInfo />
            <div className="inscriptionRequestsFilter">
                <ComboControl
                    options={[
                        { key: 'pending', value: 'Solicitudes pendientes' },
                        { key: 'completed', value: 'Solicitudes completadas' }
                    ]}
                    value={requestView}
                    returnKey={true}
                    setOption={setRequestView}
                    labelPlacement="above"
                >
                    Estado de las solicitudes
                </ComboControl>
            </div>
            {loading ? <p className="emptyInscriptionRequests">Cargando solicitudes...</p> : visibleRequests.length === 0 ? <p className="emptyInscriptionRequests">
                {requestView === 'pending' ? 'No hay solicitudes pendientes.' : 'No hay solicitudes completadas.'}
            </p> :
                <Table
                    columns={[
                        { name: 'Legajo', width: 150 },
                        { name: 'Estudiante', width: 260 },
                        { name: 'Espacios curriculares solicitados', width: 250 }
                    ]}
                    options={[{
                        value: 'eye',
                        onclick: student => navigate(`/${ciclosLectivosSlug}/${schoolYearId}/solicitudes-inscripcion/estudiante/${student.fileCurriculumId}`)
                    }]}
                    data={tableData}
                    hiddenColumns={['fileCurriculumId']}
                />}
            <Footer />
        </div>
    </article>;
};
