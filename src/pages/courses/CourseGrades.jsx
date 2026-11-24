import React, { useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import '../../styles/pages/courses/CourseGrades.css';
import { PathInfo } from '../../components/PathInfo';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import EvaluationsCourse from '../../services/courses/EvaluationsCourse';

export const CourseGrades = () => {
    const { evaluationId } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        document.title = "ISPT - Notas de instancia evaluativa";
        if (evaluationId) getGrades();
    }, [evaluationId]);

    const getGrades = async () => {
        setLoading(true);
        try {
            const response = await EvaluationsCourse.getGrades(evaluationId);
            if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
                setData((response.data.object ?? []).map(item => ({
                    fileDivisionId: item.fileDivisionId,
                    legajo: item.fileCode,
                    alumno: item.studentName,
                    nota: item.grade ?? ""
                })));
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "No se pudieron cargar los alumnos.");
        } finally {
            setLoading(false);
        }
    };

    const updateGrade = (student, value) => {
        if (value !== "" && (!Number.isInteger(Number(value)) || Number(value) < 1 || Number(value) > 10)) return;
        setData(current => current.map(item => item.fileDivisionId === student.fileDivisionId
            ? { ...item, nota: value === "" ? "" : Number(value) }
            : item));
    };

    const saveGrades = async () => {
        setSaving(true);
        try {
            const grades = data.map(item => ({
                fileDivisionId: item.fileDivisionId,
                grade: item.nota === "" ? null : Number(item.nota)
            }));
            const response = await EvaluationsCourse.saveGrades(evaluationId, grades);
            if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
                toast.success(response.data.message || "Notas guardadas correctamente.");
                await getGrades();
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "No se pudieron guardar las notas.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <article className="courseGradesPage">
            <Sidebar />
            <div className="courseGradesPageContainer">
                <PathInfo />
                <div className="controls">
                    <InputControl icon={"search"} type={"search"} />
                    <button type="button" className="add-button" onClick={saveGrades} disabled={saving || loading}>
                        <span className="material-symbols-outlined">save</span>{saving ? "Guardando..." : "Guardar cambios"}
                    </button>
                </div>
                {loading ? <p className="courseGradesStatus">Cargando alumnos...</p> : (
                    <Table
                        columns={[{ name: "Legajo", width: 120 }, { name: "Alumno", width: 260 }, { name: "Nota", width: 100 }]}
                        data={data}
                        showId={false}
                        hiddenColumns={["fileDivisionId"]}
                        renderCell={(student, key) => key === "nota" ? (
                            <InputControl
                                className="gradeInputControl"
                                type="number"
                                min="1"
                                max="10"
                                step="1"
                                value={student.nota}
                                ariaLabel={`Nota de ${student.alumno}`}
                                onChange={(event) => updateGrade(student, event.target.value)}
                            />
                        ) : undefined}
                    />
                )}
                <Footer />
            </div>
        </article>
    );
}
