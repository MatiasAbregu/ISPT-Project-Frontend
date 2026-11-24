import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';
import { Footer } from '../../components/Footer';
import { PathInfo } from '../../components/PathInfo';
import { UserContext } from '../../context/UserProvider';
import IEFIService from '../../services/exams/IEFIService';
import toast from 'react-hot-toast';
import '../../styles/pages/exams/ExamDates.css';

export const IEFIDivision = () => {
    const params = useParams();
    const divisionId = params.id ?? params.idSection;
    const { user } = useContext(UserContext);
    const [students, setStudents] = useState([]);
    const [gradeDrafts, setGradeDrafts] = useState({});
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const isTeacher = user?.roles?.includes('Docente');

    const loadStudents = async () => {
        try {
            const response = await IEFIService.getDivisionStudents(divisionId);
            const rows = response.data?.object ?? [];
            setStudents(rows);
            setGradeDrafts(Object.fromEntries(rows.filter(student => student.registered).map(student => [student.fileDivisionId, student.grade == null ? (student.gradeState === 'NoAsistio' ? 'X' : '') : String(student.grade)])));
        } catch (error) {
            toast.error(error.response?.data?.message ?? 'No se pudo cargar el IEFI.');
        }
    };

    useEffect(() => { document.title = 'ISPT - IEFI'; loadStudents(); }, [divisionId]);

    const register = async (student) => {
        try {
            await IEFIService.registerStudent(divisionId, student.fileDivisionId);
            toast.success('Estudiante agregado al IEFI.');
            setSelectedStudentId('');
            await loadStudents();
        } catch (error) { toast.error(error.response?.data?.message ?? 'No se pudo agregar al estudiante.'); }
    };

    const saveGrade = async (student) => {
        const value = gradeDrafts[student.fileDivisionId] ?? '';
        const normalized = value.trim().toLowerCase();
        const grade = normalized === 'x' || normalized === '' ? null : Number(normalized);
        if (grade !== null && (!Number.isInteger(grade) || grade < 1 || grade > 10)) {
            toast.error('Ingresá una nota entre 1 y 10 o X si no asistió.'); return;
        }
        try {
            await IEFIService.saveGrade(divisionId, student.fileDivisionId, grade);
            toast.success(grade == null ? 'Ausencia registrada.' : 'Nota guardada.');
            await loadStudents();
        } catch (error) { toast.error(error.response?.data?.message ?? 'No se pudo guardar la nota.'); }
    };

    const registeredStudents = students.filter(student => student.registered);
    const candidates = students.filter(student => !student.registered);

    return <article className="examDatesPage"><Sidebar /><div className="examDatesPageContainer">
        <PathInfo />
        {isTeacher && candidates.length > 0 && <div className="controls">
            <select aria-label="Seleccionar estudiante para IEFI" value={selectedStudentId} onChange={event => setSelectedStudentId(event.target.value)}>
                <option value="">Seleccioná un estudiante</option>
                {candidates.map(student => <option key={student.fileDivisionId} value={student.fileDivisionId}>
                    {student.lastName}, {student.firstName} · Legajo {student.fileCode}
                </option>)}
            </select>
            <button type="button" className="add-button" disabled={!selectedStudentId}
                onClick={() => register(candidates.find(student => String(student.fileDivisionId) === selectedStudentId))}>
                <span className="material-symbols-outlined">person_add</span>Añadir estudiante
            </button>
        </div>}
        <div className="tableScrollContainer"><table className="table"><thead><tr>
            <th>Legajo</th><th>Estudiante</th><th>Nota</th><th>Opciones</th>
        </tr></thead><tbody>{registeredStudents.map(student => <tr key={student.fileDivisionId}>
            <td>{student.fileCode}</td>
            <td>{student.lastName}, {student.firstName}</td>
            <td>{isTeacher
                ? <input aria-label={`Nota de ${student.firstName}`} value={gradeDrafts[student.fileDivisionId] ?? ''} placeholder="Nota o X"
                    onChange={event => setGradeDrafts(current => ({ ...current, [student.fileDivisionId]: event.target.value }))} />
                : student.grade ?? (student.gradeState === 'NoAsistio' ? 'X' : '—')}</td>
            <td>{isTeacher && <button type="button" className="add-button" onClick={() => saveGrade(student)}>Guardar</button>}</td>
        </tr>)}{registeredStudents.length === 0 && <tr><td colSpan={4}>No hay estudiantes inscriptos a IEFI.</td></tr>}</tbody></table></div>
        <Footer /></div></article>;
};
