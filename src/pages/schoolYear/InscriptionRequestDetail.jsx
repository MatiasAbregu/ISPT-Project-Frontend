import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Sidebar } from '../../components/Sidebar';
import { Footer } from '../../components/Footer';
import { PathInfo } from '../../components/PathInfo';
import { Table } from '../../components/Table';
import InscriptionRequestsService from '../../services/schoolYears/InscriptionRequestsService';
import '../../styles/pages/schoolYear/InscriptionRequests.css';

const PENDING = 0;
const ACCEPTED = 1;
const REJECTED = 2;

const statusLabels = {
    [PENDING]: 'Pendiente',
    [ACCEPTED]: 'Aceptado',
    [REJECTED]: 'Rechazado'
};

export const InscriptionRequestDetail = () => {
    const { id: schoolYearId, fileCurriculumId } = useParams();
    const [requests, setRequests] = useState([]);
    const [decisions, setDecisions] = useState({});
    const [savedDecisions, setSavedDecisions] = useState({});
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = 'ISPT - Detalle de solicitud de inscripción';
        const loadRequests = async () => {
            try {
                const response = await InscriptionRequestsService.getBySchoolYear(schoolYearId);
                const rows = response.data?.object ?? [];
                setRequests(rows);
                const student = rows.find(item => String(item.fileCurriculumId) === String(fileCurriculumId));
                const initial = Object.fromEntries((student?.divisions ?? []).map(item => [item.fileDivisionId, item.status]));
                setDecisions(initial);
                setSavedDecisions(initial);
            } catch (error) {
                toast.error(error.response?.data?.message ?? 'No se pudo cargar la solicitud.');
            } finally {
                setLoading(false);
            }
        };
        loadRequests();
    }, [schoolYearId, fileCurriculumId]);

    const student = requests.find(item => String(item.fileCurriculumId) === String(fileCurriculumId));
    const divisions = student?.divisions ?? [];
    const changedDecisions = useMemo(() => divisions
        .filter(item => decisions[item.fileDivisionId] !== savedDecisions[item.fileDivisionId])
        .map(item => ({ fileDivisionId: item.fileDivisionId, status: decisions[item.fileDivisionId] })),
    [divisions, decisions, savedDecisions]);

    const setDecision = (fileDivisionId, status) => {
        setDecisions(current => ({ ...current, [fileDivisionId]: status }));
    };

    const setDecisionForAll = status => {
        setDecisions(current => ({
            ...current,
            ...Object.fromEntries(divisions.map(item => [item.fileDivisionId, status]))
        }));
    };

    const saveDecisions = async () => {
        if (changedDecisions.length === 0) return;
        setSaving(true);
        try {
            const response = await InscriptionRequestsService.review(schoolYearId, changedDecisions);
            if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
                setSavedDecisions(current => ({ ...current, ...Object.fromEntries(changedDecisions.map(item => [item.fileDivisionId, item.status])) }));
                toast.success(response.data.message || 'Cambios guardados.');
            }
        } catch (error) {
            toast.error(error.response?.data?.message ?? 'No se pudieron guardar las decisiones.');
        } finally {
            setSaving(false);
        }
    };

    const tableData = divisions.map(item => ({
        fileDivisionId: item.fileDivisionId,
        decisionStatus: decisions[item.fileDivisionId] ?? item.status,
        'Espacio curricular': item.subjectName,
        'División': item.divisionName,
        'Estado': statusLabels[decisions[item.fileDivisionId] ?? item.status] ?? 'Pendiente'
    }));

    return <article className="inscriptionRequestsPage">
        <Sidebar />
        <div className="inscriptionRequestsPageContainer">
            <PathInfo />
            {loading ? <p className="emptyInscriptionRequests">Cargando solicitud...</p> : !student ? <p className="emptyInscriptionRequests">No se encontró la solicitud de este estudiante.</p> : <>
                <h2 className="inscriptionRequestStudentTitle">Legajo {student.fileCode} - {student.lastName}, {student.firstName}</h2>
                <Table
                    columns={[
                        { name: 'Espacio curricular', width: 280 },
                        { name: 'División', width: 180 },
                        { name: 'Estado', width: 160 }
                    ]}
                    options={[
                        { value: 'absent', title: 'Rechazar', onclick: item => setDecision(item.fileDivisionId, REJECTED) },
                        { value: 'present', title: 'Aceptar', onclick: item => setDecision(item.fileDivisionId, ACCEPTED) },
                        { value: 'resetDecision', title: 'Cancelar decisión', show: item => item.decisionStatus !== PENDING, onclick: item => setDecision(item.fileDivisionId, PENDING) }
                    ]}
                    data={tableData}
                    hiddenColumns={['fileDivisionId', 'decisionStatus']}
                />
                <div className="inscriptionRequestsControls">
                    <button type="button" className="add-button acceptAllButton" disabled={saving || divisions.length === 0} onClick={() => setDecisionForAll(ACCEPTED)}>
                        Aceptar todas
                    </button>
                    <button type="button" className="add-button rejectAllButton" disabled={saving || divisions.length === 0} onClick={() => setDecisionForAll(REJECTED)}>
                        Rechazar todas
                    </button>
                    <button type="button" className="add-button saveInscriptionDecisionsButton" disabled={saving || changedDecisions.length === 0} onClick={saveDecisions}>
                        {saving ? 'Guardando...' : 'Guardar cambios'}
                    </button>
                </div>
            </>}
            <Footer />
        </div>
    </article>;
};
