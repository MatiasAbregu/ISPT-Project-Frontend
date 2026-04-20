import React, { useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import '../../styles/pages/courses/CourseEvaluations.css';
import { useNavigate } from 'react-router-dom';
import { EvaluationsModal } from './EvaluationsModal';
import { PathInfo } from '../../components/PathInfo';

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
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    <PathInfo/>
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
                            name: "Número",
                            width: 40
                        }
                    ]} options={[{ value: "degrees", onclick: () => { navigate(`/cursos/1/evaluaciones/1/notas`) } }]}
                    data={[
                        {
                            fecha: "2025-10-15",
                            tipo: "Parcial",
                            numero: 1
                        },
                        {
                            fecha: "2025-10-16",
                            tipo: "Parcial",
                            numero: 2
                        },
                        {
                            fecha: "2025-10-17",
                            tipo: "Recuperatorio",
                            numero: 1
                        },
                        {
                            fecha: "2025-10-18",
                            tipo: "Recuperatorio",
                            numero: 2
                        }
                    ]} />
                <Footer />
            </div>
        </article>
    );
}