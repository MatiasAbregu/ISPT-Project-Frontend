import React, { useContext, useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import '../../styles/pages/courses/Courses.css';
import { useNavigate } from 'react-router-dom';
import { ScheduleModal } from '../modals/ScheduleModal';
import { UserContext } from '../../context/UserProvider';
import TeacherCourses from '../../services/courses/TeacherCourses';
import toast from 'react-hot-toast';

export const Courses = () => {

    const { user } = useContext(UserContext);
    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const [data, setData] = useState([]);
    const navigate = useNavigate();

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
                console.log(response.data.object)
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

    const getSchedules = async (id) => {
        try {
            const response = await TeacherCourses.getSchedules(id);
            if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
                return response.data.object;
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

    const closeDivision = async (course) => {
        if (!window.confirm(`¿Cerrar definitivamente ${course.subject} (${course.division})? Se calculará la regularidad de los estudiantes y no podrás deshacerlo.`)) return;
        try {
            const response = await TeacherCourses.closeDivision(course.divisionId);
            if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
                toast.success(response.data.object || "Curso cerrado.");
                getCourses();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "No se pudo cerrar el curso.");
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
                            name: "Espacio curricular",
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
                    ]}
                    options={[
                        { value: "eye", onclick: (obj) => { navigate(`/cursos/${obj.divisionId}/alumnos`) } },
                        {
                            value: "schedule", onclick: async (obj) => {
                                const schedules = await getSchedules(obj.divisionId);
                                setTypeModal(
                                    <ScheduleModal setModal={setModal} schedules={schedules} />);
                                setModal(true);
                            }
                        },
                        { value: "exams", onclick: (obj) => { navigate(`/cursos/${obj.divisionId}/evaluaciones`) } },
                        { value: "attendance", onclick: (obj) => { navigate(`/cursos/${obj.divisionId}/asistencia`) } },
                        { value: "iefi", onclick: (obj) => { navigate(`/cursos/${obj.divisionId}/iefi`) } },
                        { value: "lock", onclick: (obj) => closeDivision(obj), title: "Cerrar curso" }
                    ]}
                    data={data}
                    hiddenColumns={["divisionId", "isClosed"]}
                    showId={false} />
                <Footer />
            </div>
        </article>
    );
}
