import React, { useEffect, useState } from 'react'
import '../styles/pages/Careers.css';
import { InputControl } from '../components/InputControl';
import { Table } from '../components/Table';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import { CareerModal } from './modals/careers/CareerModal';

export const Careers = () => {

    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();

    useEffect(() => {
        document.title = "ISPT - Gestión de carreras";
    }, []);

    return (
        <article className='careersPage'>
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <div className='careersPageContainer'>
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    <button type="button" className="add-button"
                        onClick={() => { setTypeModal(<CareerModal setModal={setModal} />); setModal(true); }}>
                        <span className="material-symbols-outlined">add_circle</span>Añadir carrera
                    </button>
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
                            name: "Fecha de lanzamiento",
                            width: 180
                        }]}
                    options={["curriculum",
                        { value: "edit", onclick: () => { setTypeModal(<CareerModal setModal={setModal} />); setModal(true); } }]}
                    data={[
                        {
                            codigo: "1",
                            carrera: "Profesorado",
                            fechaLanza: "1/4/2000"
                        },
                        {
                            codigo: "2",
                            carrera: "Trayecto",
                            fechaLanza: "4/8/2018"
                        }
                    ]}
                />
                <Footer />
            </div>
        </article>
    )
}