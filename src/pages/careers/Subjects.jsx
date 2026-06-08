import React, { useContext, useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl';
import { PathInfo } from '../../components/PathInfo';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import { SubjectModal } from './SubjectModal';
import { UserContext } from '../../context/UserProvider';
import '../../styles/pages/careers/Subjects.css';
import SubjectService from '../../services/careers/subjects';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

export const Subjects = () => {

    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const [turn, setTurn] = useState("Mañana")
    const [academicYear, setAcademicYear] = useState(1);
    const { user } = useContext(UserContext);
    const { idCurriculum } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        document.title = "ISPT - Gestión de espacios curriculares en plan de estudio";
        getAllSubjects();
        
    });

    const getAllSubjects = async () => {
        const response = await SubjectService.getByCurriculumId(idCurriculum);
        setData(response.data);
    }
    
    const tableData = data.map(({ type, duration, ...rest }) => rest);
    ///carreras/:id/plan-de-estudio/:idCurriculum/espacios-curriculares  
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
                                    setTypeModal(<SubjectModal typeModal={"add"} setModal={setModal} curriculumId = {idCurriculum} getByCurriculumId={getAllSubjects} />);
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
                            { name: "Año académico", width: 150},
                            { name: "Formato", width: 150 }]}
                            options={user.role == "Directivo" ? [
                                {
                                    value: "eye", onclick: (obj) => {
                                        setTypeModal(<SubjectModal typeModal={"view"} setModal={setModal} curriculumId={idCurriculum} subjectId={obj.id} getByCurriculumId={getAllSubjects} />);
                                        setModal(true);
                                    }
                                },
                                {
                                    value: "edit",
                                    onclick: (obj) => {
                                        setTypeModal(<SubjectModal typeModal={"edit"} setModal={setModal} curriculumId={idCurriculum} subjectId={obj.id} getByCurriculumId={getAllSubjects} />);
                                        setModal(true);
                                    }
                                },
                                "commission",
                                { value: "correlatives" }
                            ] : [
                                {
                                    value: "eye", onclick: (obj) => {
                                        setTypeModal(<SubjectModal typeModal={"view"} setModal={setModal} curriculumId={idCurriculum} subjectId={obj.id} getByCurriculumId={getAllSubjects} />);
                                        setModal(true);
                                    }
                                },
                                "commission",
                                { value: "correlatives" }
                            ]}

                            showId={false}

                            data={tableData}
                        />
                        : undefined
                }
                <Footer />
            </div>
        </article >
    )
}