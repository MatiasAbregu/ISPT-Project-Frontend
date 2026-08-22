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
import '../../styles/pages/schoolYear/SectionSchedules.css';
import SectionScheduleService from '../../services/schoolYears/SectionScheduleService';

export const SectionSchedules = () => {
    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const { idSection } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        document.title = "ISPT - División";
        getSchedules();
    }, []);


    const getSchedules = async () => {
        try
        {
            const res = await SectionScheduleService.getByDivisionId(idSection);
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
        <article className='sectionSchedulesPage'>
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <div className="sectionSchedulesPageContainer">
                <PathInfo />
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
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
                    data={data}
                    showId={false}
                />
                <Footer />
            </div>
        </article>
    )
}