import React, { useContext, useEffect, useState } from 'react'
import '../../styles/pages/careers/Careers.css';
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import { CareerModal } from './CareerModal';
import { UserContext } from '../../context/UserProvider';
import CareersService from '../../services/careers/CareersService';
import { useNavigate } from 'react-router-dom';

export const Careers = () => {

    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const { user } = useContext(UserContext);
    const [data, setData] = useState();

    useEffect(() => {
        document.title = "ISPT - Gestión de carreras";
        getAllCareers();
    }, []);

    const getAllCareers = async () => {
        const response = await CareersService.getAll();
        setData(response.object);
    }

    return (
        <article className='careersPage'>
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <div className='careersPageContainer'>
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    {user?.roles.includes("Directivo") ? <button type="button" className="add-button"
                        onClick={() => { setTypeModal(<CareerModal setModal={setModal} typeModal="add" getAll={getAllCareers} />); setModal(true); }}>
                        <span className="material-symbols-outlined">add_circle</span>Añadir carrera
                    </button> : undefined}
                </div>
                <Table
                    columns={[
                        {
                            name: "Código",
                            width: 60
                        },
                        {
                            name: "Carrera",
                            width: 180
                        },
                        {
                            name: "Titulo",
                            width: 180
                        }
                    ]}
                    options={
                        user?.roles.includes("Directivo") ?
                            [{ value: "curriculum", onclick: (obj) => { navigate(`/carreras/${obj.id}/plan-de-estudio`) }},
                                {
                                value: "edit",
                                onclick: (obj) => {
                                    setTypeModal(
                                        <CareerModal
                                            setModal={setModal}
                                            typeModal="edit"
                                            careerId={obj.id}
                                            getAll={getAllCareers}
                                        />
                                    );
                                    setModal(true);
                                }
                            }]
                            :
                            ["curriculum"]}
                    data={data}
                />
                <Footer />
            </div>
        </article>
    )
}