import React, { useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import '../../styles/pages/studentSubjects/StudentEvaluations.css';
import { PathInfo } from '../../components/PathInfo';
import { useParams } from 'react-router-dom';
import StudentService from '../../services/students/StudentService';
import toast from 'react-hot-toast';

const examTypes = {
    1: "Práctico",
    2: "Parcial",
    3: "Final",
    4: "Recuperatorio"
};

export const StudentEvaluations = () => {
    const { id: fileDivisionId } = useParams();
    const [evaluations, setEvaluations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "ISPT - Evaluaciones del Estudiante";
        const loadEvaluations = async () => {
            setLoading(true);
            try {
                const response = await StudentService.getMySubjectEvaluations(fileDivisionId);
                setEvaluations((response.data?.object ?? []).map(item => ({
                    fecha: item.date,
                    tipo: examTypes[item.type] ?? "Evaluación",
                    numero: item.number,
                    nota: item.grade
                })));
            } catch (error) {
                console.error("Error al cargar las evaluaciones del estudiante:", error);
                toast.error(error.response?.data?.message || "No se pudieron cargar las evaluaciones.");
                setEvaluations([]);
            } finally {
                setLoading(false);
            }
        };

        if (fileDivisionId) loadEvaluations();
        else setLoading(false);
    }, [fileDivisionId]);

    return (
        <article className="studentEvaluationsPage">
            <Sidebar />
            <div className="studentEvaluationsPageContainer">
                <div className="controls">
                    <InputControl icon={"search"} type={"search"} />
                    <PathInfo />
                </div>
                {loading ? <p>Cargando evaluaciones...</p> : (
                    <Table
                        columns={[
                            { name: "Fecha", width: 120 },
                            { name: "Tipo", width: 160 },
                            { name: "Número", width: 80 },
                            { name: "Nota", width: 80 }
                        ]}
                        data={evaluations}
                    />
                )}
                <Footer />
            </div>
        </article>
    );
}
