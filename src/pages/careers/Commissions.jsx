import React, { useEffect, useState } from 'react'
import { Sidebar } from '../../components/Sidebar';
import { PathInfo } from '../../components/PathInfo';
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserProvider';
import DivisionTemplateService from '../../services/careers/DivisionTemplateService';
import toast from 'react-hot-toast'
import '../../styles/pages/careers/Commissions.css';

export const Commissions = () => {
    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const { id } = useParams();
    const { idCurriculum } = useParams();
    const { idSubject } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        document.title = "ISPT - División";
        getDivisionTemplates();
    }, []);

    const getDivisionTemplates = async () => {
        try {
            const res = await DivisionTemplateService.getBySubject(idSubject);
            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                setData(res.data.object);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const backendResponse = error.response.data;
                console.error(backendResponse.message);
            } else {
                console.error("No se pudo conectar con el servidor.");
            }
        }
    }

    const handleAddDivision = async () => {
        try {
            const response = await DivisionTemplateService.create(idSubject, user.id || user.ID);
            if (response.data.statusCode === 201) {
                toast.success(response.data?.object || "¡Operación éxitosa!");
                getDivisionTemplates();
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const backendResponse = error.response.data;
                toast.error(backendResponse.message);
            } else {
                toast.error("No se pudo conectar con el servidor.");
            }
        }
    };

    const changeStatus = async (id) => {
        try {
            const res = await DivisionTemplateService.changeDivisionStatus(id);
            toast.success(res.data?.object || "¡Operación éxitosa!");
        } catch (error) {
            if (error.response && error.response.data) {
                const backendResponse = error.response.data;
                toast.error(backendResponse.message);
            } else {
                toast.error("No se pudo conectar con el servidor.");
            }
        }
    }

    return (
        <article className='commissionsPage'>
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <div className="commissionsPageContainer">
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
                    options={[{ value: "teacher", onclick: (obj) => navigate(`/carreras/${id}/plan-de-estudio/${idCurriculum}/espacios-curriculares/${idSubject}/divisiones/${obj.year}/asignaciones`) },
                    { value: "schedule", onclick: (obj) => navigate(`/carreras/${id}/plan-de-estudio/${idCurriculum}/espacios-curriculares/${idSubject}/divisiones/${obj.id}/horarios`) },
                    {
                        value: "switch", onclick: async (obj) => {
                            await changeStatus(obj.id);
                            await getDivisionTemplates();
                        }        
                    }
                    ]}
                    data={data}
                    showId={false}
                />
                <Footer />
            </div>
        </article>
    )
}