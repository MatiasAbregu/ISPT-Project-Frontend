import React, { useContext, useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl';
import { ComboControl } from '../../components/ComboControl';
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
    const [turn, setTurn] = useState({ key: 1, value: "Mañana" })
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
                    <div className='controlsInputs'>
                        <ComboControl icon={"schedule"} options={[{ key: 1, value: "Mañana" }, { key: 2, value: "Tarde" }]}
                            setOption={setTurn} value={{ key: 1, value: "Mañana" }}>
                            Turno
                        </ComboControl>
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
                </div>
                {
                    turn ?
                        turn == "Mañana" ?
                            <Table columns={[
                                { name: "CUPOF", width: 120 },
                                { name: "Nombre", width: 150 },
                                { name: "División", width: 100 },
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
                                    { code: 123456789123, name: "Matématicas I", division: "A", format: "Asignatura" },
                                    { codigo: 123456789124, name: "Matématicas II", division: "A", format: "Asignatura" },
                                    { codigo: 123456789125, name: "Pedagogía", division: "A", format: "Seminario" }
                                ]}
                            />
                            :
                            turn == "Tarde" ?
                                <Table columns={[
                                    { name: "CUPOF", width: 120 },
                                    { name: "Nombre", width: 150 },
                                    { name: "División", width: 100 },
                                    { name: "Formato", width: 150 }]}
                                    options={[
                                        {
                                            value: "eye", onclick: () => {
                                                setTypeModal(<SubjectModal typeModal={2} academicYear={academicYear} setModal={setModal} />);
                                                setModal(true);
                                            }
                                        },
                                        "teacher",
                                        { value: "edit", onclick: () => { setTypeModal(<SubjectModal setModal={setModal} />); setModal(true); } },
                                        { value: "correlatives" }
                                    ]}
                                    data={[
                                        { code: 123456789123, name: "Matématicas I", division: "A", format: "Asignatura" },
                                        { code: 123456789123, name: "Matématicas I", division: "B", format: "Asignatura" },
                                        { code: 123456789123, name: "Matématicas I", division: "C", format: "Asignatura" },
                                        { codigo: 123456789124, name: "Matématicas II", division: "A", format: "Asignatura" },
                                        { codigo: 123456789125, name: "Pedagogía", division: "A", format: "Seminario" }
                                    ]}
                                /> : undefined
                        : undefined
                }
                <Footer />
            </div>
        </article >
    )
}