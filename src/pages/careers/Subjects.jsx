import React, { useContext, useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl';
import { PathInfo } from '../../components/PathInfo';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import { SubjectModal } from './SubjectModal';
import { UserContext } from '../../context/UserProvider';
import '../../styles/pages/careers/Subjects.css';

export const Subjects = () => {

    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const [turn, setTurn] = useState("Mañana")
    const [academicYear, setAcademicYear] = useState(1);
    const { user } = useContext(UserContext);

    useEffect(() => {
        document.title = "ISPT - Gestión de espacios curriculares en plan de estudio";
    }, []);

    return (
        <article className='subjectsPage'>
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <div className="subjectsPageContainer">
                <PathInfo />
                <div className='controls'>
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    {
                        user.role == "Directivo" ?
                            <button type="button" className="add-button"
                                onClick={() => {
                                    setTypeModal(<SubjectModal typeModal={1} academicYear={academicYear} setModal={setModal} />);
                                    setModal(true);
                                }}>
                                <span className="material-symbols-outlined">add_circle</span>Añadir espacio curricular
                            </button> : undefined
                    }
                </div>
                {
                    turn ?
                        <Table columns={[
                            { name: "Código", width: 120 },
                            { name: "Nombre", width: 150 },
                            { name: "Formato", width: 150 }]}
                            options={user.role == "Directivo" ? [
                                {
                                    value: "eye", onclick: () => {
                                        setTypeModal(<SubjectModal typeModal={2} academicYear={academicYear} setModal={setModal} />);
                                        setModal(true);
                                    }
                                },
                                {
                                    value: "edit",
                                    onclick: () => {
                                        setTypeModal(<SubjectModal typeModal={3} academicYear={academicYear} setModal={setModal} />);
                                        setModal(true);
                                    }
                                },
                                "teacher",
                                { value: "correlatives" }
                            ] : [
                                {
                                    value: "eye", onclick: () => {
                                        setTypeModal(<SubjectModal typeModal={2} academicYear={academicYear} setModal={setModal} />);
                                        setModal(true);
                                    }
                                },
                                "teacher",
                                { value: "correlatives" }
                            ]}
                            data={[
                                { code: "MAT-01", name: "Matématicas I", format: "Asignatura" },
                                { codigo: "MAT-02", name: "Matématicas II", format: "Asignatura" },
                                { codigo: "PD-01", name: "Pedagogía", format: "Seminario" }
                            ]}
                        />
                        : undefined
                }
                <Footer />
            </div>
        </article >
    )
}