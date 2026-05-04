import React, { useContext, useEffect, useState } from 'react'
import '../../styles/pages/schoolYear/SchoolYearSubjects.css';
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import { UserContext } from '../../context/UserProvider';
import { PathInfo } from '../../components/PathInfo';
import { useNavigate } from 'react-router-dom';

export const SchoolYearSubjects = () => {

    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "ISPT - Gestión de ciclos lectivos";
    }, []);

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
                        { value: "eye", onclick: () => { navigate(`/ciclos-lectivos/1/espacios-curriculares/1/divisiones`) } }
                    ]}
                    data={[
                        {
                            materia: "Matemática I",
                            año: "1°",
                            comisiones: "3"
                        },
                        {
                            materia: "Lengua",
                            año: "1°",
                            comisiones: "2"
                        },
                        {
                            materia: "Matemática II",
                            año: "2°",
                            comisiones: "2"
                        }
                    ]}
                />
                <Footer />
            </div>
        </article>
    )
}