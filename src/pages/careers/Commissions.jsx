import React, { useEffect, useState } from 'react'
import { Sidebar } from '../../components/Sidebar';
import { PathInfo } from '../../components/PathInfo';
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';

export const Commissions = () => {
    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();

    useEffect(() => {
        document.title = "ISPT - División";
    }, []);

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
                            setTypeModal();
                            setModal(true);
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
                    options={["teacher"]}
                    data={[
                        {
                            year: "A",
                        },
                        {
                            year: "B",
                        },
                        {
                            year: "C",
                        }
                    ]}
                />
                <Footer />
            </div>
        </article>
    )
}