import React, { useEffect, useState } from 'react'
import '../styles/pages/Curriculum.css';
import { InputControl } from '../components/InputControl';
import { Table } from '../components/Table';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import { CurriculumModal } from './modals/careers/CurriculumModal';
import { PathInfo } from '../components/PathInfo';

export const AcademicYear = () => {

    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();

    useEffect(() => {
        document.title = "ISPT - Gestión de plan de estudio";
    }, []);

    return (
        <article className='curriculumPage'>
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}          
            <div className="curriculumPageContainer">
                <PathInfo />
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                </div>
                <Table
                    columns={[
                        {
                            name: "Año",
                            width: 100
                        }
                    ]}
                    options={["subjects",
                        { value: "edit", onclick: () => { setTypeModal(<CurriculumModal setModal={setModal} />); setModal(true); } }]}
                    data={[
                        {
                            year: "1°",
                        },
                        {
                            year: "2°",
                        },
                        {
                            year: "3°",
                        },
                        {
                            year: "4°",
                        }
                    ]}
                />
                <Footer />
            </div>
        </article>
    )
}