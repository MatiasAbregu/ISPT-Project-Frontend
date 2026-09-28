import React, { useContext, useEffect, useState } from 'react';
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import { UserContext } from '../../context/UserProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { PathInfo } from '../../components/PathInfo';
import '../../styles/pages/schoolYear/SchoolYearGrades.css';
import SchoolYearService from '../../services/schoolYears/SchoolYearService';

export const SchoolYearGrades = () => {
    const navigate = useNavigate();
    const { ciclosLectivosSlug, id } = useParams();
    const { user } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        document.title = "ISPT - Años del Ciclo Lectivo";
        getCurriculumsBySchoolYearId();
    }, [id]);

    const getCurriculumsBySchoolYearId = async () => {
        try {
            const response = await SchoolYearService.getCurriculumsBySchoolYearId(id);
            if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
                setData(response.data.object);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <article className='schoolYearGradesPage'>
            <Sidebar />
            <div className='schoolYearGradesPageContainer'>
                <PathInfo />
                <div className="controls">
                    <InputControl 
                        icon={"search"} 
                        type={"search"} />
                </div>
                <Table
                    columns={[
                        {
                            name: "Año",
                            width: 150
                        },
                        {
                            name: "Resolución del Plan",
                            width: 150
                        }
                    ]}
                    options={[
                        { 
                            value: "eye", 
                            onclick: (obj) => { 
                                navigate(`/${ciclosLectivosSlug}/${id}/anios:${obj.academicYear}/${obj.id}/espacios-curriculares`);
                            } 
                        }
                    ]}
                    data={data}
                    showId={false}
                />
                <Footer />
            </div>
        </article>
    );
};