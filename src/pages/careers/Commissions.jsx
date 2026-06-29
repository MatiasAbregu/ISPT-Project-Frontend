import React, { useEffect, useState } from 'react'
import { Sidebar } from '../../components/Sidebar';
import { PathInfo } from '../../components/PathInfo';
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import DivisionTemplateService from '../../services/careers/DivisionTemplateService';

export const Commissions = () => {
    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const { id } = useParams();
    const { idCurriculum } = useParams();
    const { idSubject } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);


    useEffect(() => {
        document.title = "ISPT - División";
        getDivisionTemplates();
    }, []);

    const getDivisionTemplates = async () => {
        const response = await DivisionTemplateService.getBySubject(idSubject);
        setData(response.object);
    }

    const handleAddDivision = async () => {
        try {
            const response = await DivisionTemplateService.create(idSubject);
            if (response.statusCode === 201) {
                getDivisionTemplates();
            }
        } catch (error) {
            console.error(error);
        }
    };

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
                            handleAddDivision();
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
                    options={[{ value: "teacher", onclick: (obj) => navigate(`/carreras/${id}/plan-de-estudio/${idCurriculum}/espacios-curriculares/${idSubject}/divisiones/${obj.year}/asignaciones`) }]}
                    data={data}
                    showId={false}
                />
                <Footer />
            </div>
        </article>
    )
}