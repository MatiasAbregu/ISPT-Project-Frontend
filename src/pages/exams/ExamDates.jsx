import React, { useContext, useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserProvider';
import { ExamModal } from './ExamModal';
import '../../styles/pages/exams/ExamDates.css';

export const ExamDates = () => {

    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        document.title = "ISPT - Fechas de Exámenes";
    }, []);

    return (
        <article className="examDatesPage">
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <div className="examDatesPageContainer">
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    {
                        user.role == "Directivo" ?
                            <button type="button" className="add-button"
                                onClick={() => { setTypeModal(<ExamModal setModal={setModal} />); setModal(true); }}>
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
                    ]} options={user.role == "Docente" ? [{ value: "exams", onclick: () => { navigate("/mesas-examen/1/notas") } }] : ["delete"]}
                    data={user.role == "Directivo" ?
                        [
                            {
                                materia: "Matemática I",
                                fecha: "15/06/2026",
                                turno: "10:00",
                                libro: "1",
                                folio: "1"
                            },
                            {
                                materia: "Química",
                                fecha: "15/12/2026",
                                turno: "10:00",
                                libro: "2",
                                folio: "1"
                            },
                            {
                                materia: "Física",
                                fecha: "16/06/2026",
                                turno: "14:00",
                                libro: "3",
                                folio: "1"
                            },
                            {
                                materia: "Biología",
                                fecha: "16/12/2026",
                                turno: "16:00",
                                libro: "4",
                                folio: "1"
                            }
                        ] :
                        [
                            {
                                materia: "Matemática",
                                fecha: "15/06/2026",
                                turno: "10:00",
                                libro: "1",
                                folio: "1"
                            }
                        ]
                    } />
                <Footer />
            </div>
        </article>
    );
}