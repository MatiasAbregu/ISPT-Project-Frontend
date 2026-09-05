import React, { useContext, useEffect, useState } from 'react'
import '../../styles/pages/schoolYear/SectionStudents.css';
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import { UserContext } from '../../context/UserProvider';
import { PathInfo } from '../../components/PathInfo';
import { SectionStudentsModal } from './SectionStudentsModal';
import SectionStudentsService from '../../services/schoolYears/SectionStudentsService';
import { useParams } from 'react-router';

export const SectionStudents = () => {

    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const { user } = useContext(UserContext);  
    const { idSection } = useParams();  
    const [data, setData] = useState([]);

    useEffect(() => {
        document.title = "ISPT - Gestión de ciclos lectivos";
        getSectionStudents();
    }, []);

    const getSectionStudents = async () => {
            try {
                const res = await SectionStudentsService.getByDivisionId(idSection);
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

    return (
        <article className='sectionStudentsPage'>
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <div className='sectionStudentsPageContainer'>
                <PathInfo />
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    <button type="button" className="add-button"
                        onClick={() => { 
                            setTypeModal(<SectionStudentsModal setModal={setModal} />);
                            setModal(true);
                        }}>
                        <span className="material-symbols-outlined">add_circle</span>Inscribir estudiante
                    </button>
                </div>
                <Table
                    columns={[
                        {
                            name: "Legajo",
                            width: 120
                        },
                        {
                            name: "Estudiante",
                            width: 120
                        },
                        {
                            name: "Estado",
                            width: 120
                        },
                        {
                            name: "Riesgo",
                            width: 120
                        }
                    ]}
                    options={[
                        "delete"
                    ]}
                    data={data}
                    showId={false}
                />
                <Footer />
            </div>
        </article>
    )
}