import React, { useContext, useEffect, useState } from 'react'
import '../../styles/pages/schoolYear/SchoolYearSubjects.css';
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import { UserContext } from '../../context/UserProvider';
import { PathInfo } from '../../components/PathInfo';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import SubjectService from '../../services/careers/SubjectsService';
import toast from 'react-hot-toast';

export const SchoolYearSubjects = () => {

    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        document.title = "ISPT - Gestión de ciclos lectivos";
        getBySchoolYear();
    }, []);

    const getBySchoolYear = async () => {
        try {
            const response = await SubjectService.getBySchoolYear(id);
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


    const tableData = data.map(({ code, type, duration, isCorrelative, ...rest }) => rest);

    return (
        <article className='schoolYearSubjectsPage'>
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <div className='schoolYearSubjectsPageContainer'>
                <PathInfo />
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                </div>
                <Table
                    columns={[
                        {
                            name: "Espacio curricular",
                            width: 120
                        },
                        {
                            name: "Año",
                            width: 80
                        },
                        {
                            name: "Cantidad de comisiones",
                            width: 80
                        }
                    ]}
                    options={[
                        { value: "eye", onclick: (obj) => { navigate(`/ciclos-lectivos/${id}/espacios-curriculares/${obj.id}/divisiones`) } }
                    ]}
                    showId={false}
                    data={tableData}
                />
                <Footer />
            </div>
        </article>
    )
}