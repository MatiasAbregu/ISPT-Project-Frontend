import React, { useContext, useEffect, useState } from 'react'
import '../../styles/pages/schoolYear/SchoolYearSections.css';
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import { UserContext } from '../../context/UserProvider';
import { PathInfo } from '../../components/PathInfo';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import DivisionService from '../../services/careers/DivisionService';

export const SchoolYearSections = () => {

    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const { id } = useParams();
    const { idSubject } = useParams();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    
    useEffect(() => {
        document.title = "ISPT - Gestión de ciclos lectivos";
        getBySchoolYearSubject();
    }, []);

    const getBySchoolYearSubject = async () => {
        try {
            const response = await DivisionService.getBySchoolYearSubject(id, idSubject);
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
    };

    return (
        <article className='schoolYearSectionsPage'>
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <div className='schoolYearSectionsPageContainer'>
                <PathInfo />
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                </div>
                <Table
                    columns={[
                        {
                            name: "División",
                            width: 120
                        },
                        {
                            name: "Docente",
                            width: 120
                        },
                        {
                            name: "Cantidad de alumnos",
                            width: 120
                        }
                    ]}
                    options={[
                        { value: "eye", onclick: (obj) => { navigate(`/ciclos-lectivos/${id}/espacios-curriculares/${idSubject}/divisiones/${obj.id}/estudiantes`) } },
                        { value: "schedule"}
                    ]}
                    data={data}
                    showId={false}
                />
                <Footer />
            </div>
        </article>
    )
}