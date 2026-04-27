import React, { useContext, useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl';
import { PathInfo } from '../../components/PathInfo';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import { TeacherModal } from './TeacherModal';
import { AssignationModal } from './AssignationModal';
import '../../styles/pages/teachers/Assignations.css';
import { UserContext } from '../../context/UserProvider';

export const Assignations = () => {

    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const [academicYear, setAcademicYear] = useState(1);
    const { user } = useContext(UserContext);

    useEffect(() => {
        document.title = "ISPT - Gestión de espacios curriculares en plan de estudio";
    }, []);

    return (
        <article className='assignationsPage'>
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <div className="assignationsPageContainer">
                <PathInfo />
                <div className='controls'>
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    {user.role == "Directivo" ?
                        <button type="button" className="add-button"
                            onClick={() => {
                                setTypeModal(<AssignationModal setModal={setModal} />);
                                setModal(true);
                            }}>
                            <span className="material-symbols-outlined">add_circle</span>Asignar docente a la materia
                        </button> : undefined}
                </div>
                <Table columns={[
                    { name: "DNI", width: 100 },
                    { name: "Docente", width: 160 },
                    { name: "Situación revista", width: 100 },
                    { name: "Fecha de inicio", width: 80 },
                    { name: "Fecha de fin", width: 80 }]}
                    options={user.role == "Directivo" ?
                        [
                            {
                                value: "eye", onclick: () => {
                                    setTypeModal(<TeacherModal typeModal={2} setModal={setModal} />);
                                    setModal(true);
                                }
                            },
                            { value: "edit" },
                            { value: "observation" }
                        ] : [
                            {
                                value: "eye", onclick: () => {
                                    setTypeModal(<TeacherModal typeModal={2} setModal={setModal} />);
                                    setModal(true);
                                }
                            },
                            { value: "observation" }
                        ]
                    }
                    data={[
                        { code: 12345679, name: "Enrique Álvarez", status: "Titular", fi: "10/02/2002", ff: "---" },
                        { codigo: 40365441, name: "Marta Pérez", format: "Suplente", fi: "10/04/2026", ff: "31/04/2026" },
                    ]}
                />
                <Footer />
            </div>
        </article >
    )
}