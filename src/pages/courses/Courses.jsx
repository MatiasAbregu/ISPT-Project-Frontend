import React, { useContext, useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import '../../styles/pages/courses/Courses.css';
import { useNavigate } from 'react-router-dom';
import { PathInfo } from '../../components/PathInfo';
import { ScheduleModal } from '../modals/ScheduleModal';
import { UserContext } from '../../context/UserProvider';
import TeacherCourses from '../../services/courses/TeacherCourses';

export const Courses = () => {

    const { user } = useContext(UserContext);
    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const schedules = [
        {
            division: "Turno Mañana A",
            horarios: [
                { dia: "Lunes", desde: "08:00", hasta: "10:00" },
                { dia: "Miércoles", desde: "08:00", hasta: "10:00" },
            ]
        }
    ]

    useEffect(() => {
        document.title = "ISPT - Gestión de Cursos";
    }, []);

    useEffect(() => {
        getCourses();
    }, [user]);

    const getCourses = async () => {
        try {
            const response = await TeacherCourses.getCourses(user.personId);
            if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
                setData(response.data.object);
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data) {
                const backendResponse = error.response.data;
                toast.error(backendResponse.message);
            } else {
                toast.error("No se pudo conectar con el servidor.");
            }
        }
    }

    return (

        <article className="coursesPage">
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <div className="coursesPageContainer">
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                </div>
                <Table
                    columns={[
                        {
                            name: "Carrera",
                            width: 100
                        },
                        {
                            name: "Materia",
                            width: 120
                        },
                        {
                            name: "Año Lectivo",
                            width: 120
                        },
                        {
                            name: "División",
                            width: 120
                        }
                    ]} options={[{ value: "eye", onclick: () => { navigate(`/cursos/1/alumnos`) } },
                    { value: "schedule", onclick: () => { setTypeModal(<ScheduleModal setModal={setModal} schedules={schedules} />); setModal(true); } },
                    { value: "exams", onclick: () => { navigate(`/cursos/1/evaluaciones`) } },
                    { value: "attendance", onclick: () => { navigate(`/cursos/1/asistencia`) } }
                    ]}
                    data={data}
                    showId={false} />
                <Footer />
            </div>
        </article>
    );
}