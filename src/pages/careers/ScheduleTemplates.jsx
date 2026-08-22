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
import { ScheduleTemplateModal } from './ScheduleTemplateModal';
import toast from 'react-hot-toast'
import '../../styles/pages/careers/ScheduleTemplates.css';
import ScheduleTemplateService from '../../services/careers/ScheduleTemplateService';

export const ScheduleTemplates = () => {
    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const { id } = useParams();
    const { idCurriculum } = useParams();
    const { idSubject } = useParams();
    const { idCommission } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        document.title = "ISPT - División";
        getScheduleTemplates();
    }, []);


    const getScheduleTemplates = async () => {
        try
        {
            const res = await ScheduleTemplateService.getByDivisionTemplate(idCommission);
            if(res.data.statusCode >= 200 && res.data.statusCode < 300){
                const formattedData = res.data.object.map(item => ({
                ...item,
                startTime: item.startTime ? item.startTime.slice(0, 5) : item.startTime,
                endTime: item.endTime ? item.endTime.slice(0, 5) : item.endTime
            }));
                setData(formattedData);
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
                           setTypeModal(<ScheduleTemplateModal setModal={setModal} typeModal={"add"} getAll={getScheduleTemplates}/>);
                           setModal(true);
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
                        },
                        {
                            name: "Día",
                            width: 100
                        }
                    ]}
                    options={[{ value: "edit", onclick: (obj) => {
                        setTypeModal(<ScheduleTemplateModal setModal={setModal} typeModal={"edit"} scheduleTemplateId={obj.id} getAll={getScheduleTemplates}/>);
                        setModal(true);
                    } }]}
                    data={data}
                    showId={false}
                />
                <Footer />
            </div>
        </article>
    )
}