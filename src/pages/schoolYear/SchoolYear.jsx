import React, { useContext, useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import { UserContext } from '../../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/schoolYear/SchoolYear.css';
import { SchoolYearModal } from './SchoolYearModal';
import SchoolYearService from '../../services/schoolYears/SchoolYearService';

export const SchoolYear = () => {

    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const { user } = useContext(UserContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        document.title = "ISPT - Gestión de ciclos lectivos";
        getAllSchoolYears();
    }, []);

    const getAllSchoolYears = async () => {
        const response = await SchoolYearService.getAll();
        setData(response.data.object);
    }

    return (
        <article className='schoolYearPage'>
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <div className='schoolYearPageContainer'>
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    <button type="button" className="add-button"
                        onClick={() => {
                            setTypeModal(<SchoolYearModal setModal={setModal} getAll={getAllSchoolYears}/>);
                            setModal(true);
                        }}>
                        <span className="material-symbols-outlined">add_circle</span>Añadir ciclo lectivo
                    </button>
                </div>
                <Table
                    columns={[
                        {
                            name: "Carrera",
                            width: 120
                        },
                        {
                            name: "Plan de estudio",
                            width: 120
                        },
                        {
                            name: "Año lectivo",
                            width: 120
                        }
                    ]}
                    options={[
                        { value: "eye", onclick: (obj) => { navigate(`/ciclos-lectivos/${obj.id}/espacios-curriculares`) } }
                    ]}
                    data={data}
                    showId={false}
                />
                <Footer />
            </div>
        </article>
    )
}