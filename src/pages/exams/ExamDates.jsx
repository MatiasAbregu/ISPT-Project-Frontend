import React, { useContext, useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserProvider';
import { ExamModal } from './ExamModal';
import '../../styles/pages/exams/ExamDates.css';
import ExamService from '../../services/exams/FinalExamService';
import toast from 'react-hot-toast';

export const ExamDates = () => {

    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [data, setData] = useState();

    useEffect(() => {
        document.title = "ISPT - Fechas de Exámenes";
        getAllExams();
    }, []);

    const getAllExams = async () => {
        try {
            const response = await ExamService.getAll();
            if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
                setData(response.data.object);
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
        <article className="examDatesPage">
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <div className="examDatesPageContainer">
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    {
                        user.roles.includes("Directivo") ?
                            <button type="button" className="add-button"
                                onClick={() => { setTypeModal(<ExamModal setModal={setModal} getAll={getAllExams} />); setModal(true); }}>
                                <span className="material-symbols-outlined">add_circle</span>Añadir mesa de examen
                            </button> : undefined
                    }
                </div>
                <Table
                    columns={[
                        {
                            name: "Materia",
                            width: 160
                        },
                        {
                            name: "Fecha",
                            width: 160
                        },
                        {
                            name: "Hora",
                            width: 160
                        },
                        {
                            name: "Libro",
                            width: 160
                        },
                        {
                            name: "Folio",
                            width: 160
                        }
                    ]} options={
                        user.role == "Docente" ? [{ value: "exams", onclick: () => { navigate("/mesas-examen/1/notas") } }]
                            : [{ value: "exams", onclick: () => { navigate("/mesas-examen/1/notas") } }, "delete"]}
                    showId={false}
                    data={data} />
                <Footer />
            </div>
        </article>
    );
}