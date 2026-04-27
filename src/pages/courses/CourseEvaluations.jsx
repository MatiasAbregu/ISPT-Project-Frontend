import React, { useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { EvaluationsModal } from './EvaluationsModal';
import { PathInfo } from '../../components/PathInfo';
import '../../styles/pages/courses/CourseEvaluations.css';

export const CourseEvaluations = () => {

    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "ISPT - Detalle de Curso";
    }, []);

    return (

        <article className="courseEvaluationsPage">
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <div className="courseEvaluationsPageContainer">
                <PathInfo />
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    <button type="button" className="add-button"
                        onClick={() => { setTypeModal(<EvaluationsModal setModal={setModal} />); setModal(true); }}>
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
                    ]} options={[{ value: "edit", onclick: () => { navigate(`/cursos/1/evaluaciones/1/notas`) } },
                    "delete"
                    ]}
                    data={[
                        {
                            fecha: "15/10/2026",
                            tipo: "Parcial",
                            numero: 1
                        },
                        {
                            fecha: "16/10/2026",
                            tipo: "Parcial",
                            numero: 2
                        },
                        {
                            fecha: "17/10/2026",
                            tipo: "Recuperatorio",
                            numero: 1
                        },
                        {
                            fecha: "18/10/2026",
                            tipo: "Recuperatorio",
                            numero: 2
                        }
                    ]} />
                <Footer />
            </div>
        </article>
    );
}