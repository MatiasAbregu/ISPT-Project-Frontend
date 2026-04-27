import React, { useEffect, useState, useContext } from 'react'
import { InputControl } from '../../components/InputControl';
import { DateControl } from '../../components/DateControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import '../../styles/pages/courses/CourseAttendance.css';
import { PathInfo } from '../../components/PathInfo';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserProvider';

export const CourseAttendance = () => {

    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    useEffect(() => {
        document.title = "ISPT - Asistencia de Curso";
    }, []);

    const getPath = () => {
        if (user?.role === "Docente") {
            return `/cursos/1/asistencia/03-10-2026`;
        }

        if (user?.role === "Preceptor_Auxiliar") {
            return `/asistencias-cursos/1/asistencia/03-10-2026`;
        }
    };

    const [data, setData] = useState([
        {
            fecha: "03/10/2026",
            asistencia: "17/20",
            estado: "Completa",
        },
        {
            fecha: "04/10/2026",
            asistencia: "15/20",
            estado: "Completa",
        },
        {
            fecha: "05/10/2026",
            asistencia: "0/20",
            estado: "Pendiente",
        }
    ]);

    const dataRender = data.map(row => ({
        ...row,
    }));

    return (

        <article className="courseAttendancePage">
            <Sidebar />
            <div className="courseAttendancePageContainer">
                <PathInfo />
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                    <button className="add-button">
                        Añadir día actual
                    </button>
                </div>
                <Table
                    columns={[
                        {
                            name: "Fecha",
                            width: 100
                        },
                        {
                            name: "Asistencia Total",
                            width: 120
                        },
                        {
                            name: "Estado",
                            width: 120
                        }
                    ]} options={[
                        { value: "edit", onclick: () => { navigate(getPath()) } }
                    ]}
                    data={dataRender} />
                <Footer />
            </div>
        </article>
    );
}