import React, { useEffect, useState } from 'react'
import { Sidebar } from '../../components/Sidebar';
import { PathInfo } from '../../components/PathInfo';
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

export const Commissions = () => {
    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const { id } = useParams();
    const { idCurriculum } = useParams();
    const { idSubject } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "ISPT - División";
    }, []);

    return (
        <article className='curriculumPage'>
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <div className="curriculumPageContainer">
                <PathInfo />
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    <button type="button" className="add-button"
                        onClick={() => {
                            setTypeModal();
                            setModal(true);
                        }}>
                        <span className="material-symbols-outlined">add_circle</span>Añadir división
                    </button>
                </div>
                <Table
                    columns={[
                        {
                            name: "División",
                            width: 100
                        }
                    ]}
                    options={[{value: "teacher", onclick: (obj) => navigate(`/carreras/${id}/plan-de-estudio/${idCurriculum}/espacios-curriculares/${idSubject}/divisiones/${obj.year}/asignaciones`)}]}
                    data={[
                        {
                            year: "A",
                        },
                        {
                            year: "B",
                        },
                        {
                            year: "C",
                        }
                    ]}
                />
                <Footer />
            </div>
        </article>
    )
}