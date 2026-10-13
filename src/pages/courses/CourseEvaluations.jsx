import React, { useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { EvaluationsModal } from './EvaluationsModal';
import { PathInfo } from '../../components/PathInfo';
import toast from 'react-hot-toast';
import EvaluationsCourse from '../../services/courses/EvaluationsCourse';
import '../../styles/pages/courses/CourseEvaluations.css';

export const CourseEvaluations = () => {

    const { id } = useParams();
    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const typeLabels = {
        Practical: "Práctico",
        Midterm: "Parcial",
        Recovery: "Recuperatorio",
        Final: "Final"
    };

    useEffect(() => {
        document.title = "ISPT - Detalle de Curso";
        if (id) {
            getAllEvaluations();
        }
    }, [id]);

    const getAllEvaluations = async () => {
        try {
            const response = await EvaluationsCourse.getAllEvaluations(id);
            if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
                const formatted = response.data.object.map(item => ({
                    id: item.id,
                    date: item.date,
                    type: typeLabels[item.type] || item.type,
                    number: item.number
                }));
                setData(formatted);
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error("No se pudo conectar con el servidor.");
            }
        }
    };

    const handleDeleteEvaluation = async (evaluationId) => {
        try {
            const response = await EvaluationsCourse.deleteEvaluation(evaluationId);
            if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
                toast.success(response.data.object || "¡Instancia evaluativa eliminada con éxito!");
                await getAllEvaluations();
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error("No se pudo conectar con el servidor.");
            }
        }
    };

    return (

        <article className="courseEvaluationsPage">
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <div className="courseEvaluationsPageContainer">
                <PathInfo />
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    <button type="button" className="add-button"
                        onClick={() => {
                            setTypeModal(
                                <EvaluationsModal
                                    setModal={setModal}
                                    divisionId={id}
                                    getAllEvaluations={getAllEvaluations}
                                />
                            );
                            setModal(true);
                        }}>
                        <span className="material-symbols-outlined">add_circle</span>Añadir instancia evaluativa
                    </button>
                </div>
                <Table
                    columns={[
                        {
                            name: "Fecha",
                            width: 120
                        },
                        {
                            name: "Tipo",
                            width: 160
                        },
                        {
                            name: "Número de instancia evaluativa",
                            width: 40
                        }
                    ]}
                    options={[
                        {
                            value: "edit",
                            onclick: (obj) => { navigate(`/cursos/${id}/evaluaciones/${obj.id}/notas`); }
                        },
                        {
                            value: "delete",
                            onclick: async (obj) => { await handleDeleteEvaluation(obj.id); }
                        }
                    ]}
                    data={data}
                    showId={false}
                />
                <Footer />
            </div>
        </article>
    );
}