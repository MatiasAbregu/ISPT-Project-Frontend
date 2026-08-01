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
import { useNavigate, useParams } from 'react-router';
import TeacherAssignationService from '../../services/teachers/TeacherAssignationService';
import toast from 'react-hot-toast';
import { ObservationModal } from '../modals/ObservationModal';

export const Assignations = () => {

    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const [academicYear, setAcademicYear] = useState(1);

    const { id } = useParams();
    const { idCurriculum } = useParams();
    const { idSubject } = useParams();
    const { idCommission } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        document.title = "ISPT - Gestión de espacios curriculares en plan de estudio";
        gettAllTeacherByDivisionId();
    }, []);

    const gettAllTeacherByDivisionId = async (id) => {
        try {
            const res = await TeacherAssignationService.getAllTeachersByDivisionId(idCommission);

            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                const data = res.data.object;
                setData(data);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const backendResponse = error.response.data;
                toast.error(backendResponse.message);
            } else {
                toast.error("No se pudo conectar con el servidor.");
            }
        }
    }

    return (
        <article className='assignationsPage'>
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <div className="assignationsPageContainer">
                <PathInfo />
                <div className='controls'>
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    {user?.roles.includes("Directivo") ?
                        <button type="button" className="add-button"
                            onClick={() => {
                                setTypeModal(<AssignationModal setModal={setModal} typeModal={1} divisionId={idCommission}
                                    getAllTeachersByDivision={gettAllTeacherByDivisionId} />);
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
                    options={user?.roles.includes("Directivo") ?
                        [
                            {
                                value: "eye", onclick: (obj) => {
                                    setTypeModal(<AssignationModal setModal={setModal} typeModal={2} divisionId={idCommission}
                                        teacherDivisionId={obj.id} getAllTeachersByDivision={gettAllTeacherByDivisionId} />);
                                    setModal(true);
                                }
                            },
                            {
                                value: "edit", onclick: (obj) => {
                                    setTypeModal(<AssignationModal setModal={setModal} typeModal={3} divisionId={idCommission}
                                        teacherDivisionId={obj.id} getAllTeachersByDivision={gettAllTeacherByDivisionId} />);
                                    setModal(true);
                                }
                            },
                            {
                                value: "observation", onclick: (obj) => {
                                    setTypeModal(<ObservationModal setModal={setModal} requestId={obj.id} sendTo={"teacherDivision"} />);
                                    setModal(true);
                                }
                            }
                        ] : [
                            {
                                value: "eye", onclick: (obj) => {
                                    setTypeModal(<AssignationModal setModal={setModal} typeModal={2} divisionId={idCommission}
                                        teacherDivisionId={obj.id} getAllTeachersByDivision={gettAllTeacherByDivisionId} />);
                                    setModal(true);
                                }
                            },
                            {
                                value: "observation", onclick: (obj) => {
                                    setTypeModal(<ObservationModal setModal={setModal} requestId={obj.id} sendTo={"teacherDivision"} />);
                                    setModal(true);
                                }
                            }
                        ]
                    }
                    data={data} showId={false} />
                <Footer />
            </div>
        </article >
    )
}