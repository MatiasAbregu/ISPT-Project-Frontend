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
import toast from 'react-hot-toast'
import '../../styles/pages/careers/ScheduleTemplates.css';

export const ScheduleTemplates = () => {
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

    }, []);

    const getScheduleTemplates = async () => {
        try
        {
            const res = await DivisionTemplateService.getBySubject(idSubject);
            if(res.data.statusCode >= 200 && res.data.statusCode < 300){
                setData(res.data.object);
            }
        } catch (error) 
        {
            if (error.response && error.response.data) {
                const backendResponse = error.response.data;
                console.error(backendResponse.message);
            } else {
                console.error("No se pudo conectar con el servidor.");
            }
        }
    }


    return (
        <article className='scheduleTemplatesPage'>
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <div className="scheduleTemplatesPageContainer">
                <PathInfo />
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    <button type="button" className="add-button"
                        onClick={() => {
                           
                        }}>
                        <span className="material-symbols-outlined">add_circle</span>Añadir módulo
                    </button>
                </div>
                <Table
                    columns={[
                        {
                            name: "Hora de Inicio",
                            width: 100
                        },
                        {
                            name: "Hora de Fin",
                            width: 100
                        }
                    ]}
                    options={[{ value: "edit", onclick: (obj) => navigate() }]}
                    data={[
                        {
                            id: 1,
                            startTime: "08:00",
                            endTime: "09:00"
                        },
                        {
                            id: 2,
                            startTime: "09:00",
                            endTime: "10:00"
                        }
                    ]}
                    showId={false}
                />
                <Footer />
            </div>
        </article>
    )
}