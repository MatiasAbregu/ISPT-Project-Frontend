import '../../styles/pages/schoolYear/SectionStudentsModal.css';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/UserProvider';
import { InputControl } from '../../components/InputControl'
import { DateControl } from '../../components/DateControl'
import '../../styles/pages/schoolYear/SchoolYearModal.css'
import { ComboControl } from '../../components/ComboControl'
import CareersService from '../../services/careers/CareersService'
import CurriculumService from '../../services/careers/CurriculumService'
import toast from 'react-hot-toast'
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import StudentService from '../../services/students/StudentService'
import { SearchComboControl } from '../../components/SearchComboControl'
import SectionStudentYUP from '../../schemas/schoolYear/SectionStudentYUP'
import SectionStudentsService from '../../services/schoolYears/SectionStudentsService'

export const SectionStudentsModal = ({ setModal, getAll }) => {
    const { data, register, handleSubmit, formState: { errors }, reset, setValue } = useForm({ resolver: yupResolver(SectionStudentYUP) })
    //const [currentStudentId, setCurrentStudentId] = useState(null);
    const [dataStudents, setDataStudents] = useState([]);
    const { user } = useContext(UserContext);
    const { id } = useParams();
    const { idSection } = useParams();

    const onSubmit = async (data) => {
        let finalData = {
            ...data,
            schoolYearId: id,
            divisionId: idSection,
            createdById: user.id || user.ID
        }
        console.log(finalData);
        await SectionStudentsService.PostFileDivision(finalData)
        setModal(false)
        await getAll()
    }

    const getStudentsBySchoolYearId = async () => {
        try{
            const res = await StudentService.getStudentsBySchoolYearId(id);
            if(res.data.statusCode >= 200 && res.data.statusCode < 300) {

               const students = [];
               res.data.object.forEach(element => {
                students.push({ key: element.fileId, value: `${element.lastName}, ${element.firstName} | DNI: ${element.documentNumber} | Legajo: ${element.fileCode}` });
               })
               setDataStudents(students);
            }
        }
        catch(error)
        {
            console.log(error);
            if(error.response && error.response.data) {
                const backendResponse = error.response.data;
                toast.error(backendResponse.message);
            }
        }
    }   

    
    useEffect(() => {
        getStudentsBySchoolYearId();
    }, []);

    return (
         <article className="sectionStudentsModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Inscribir estudiante</h4>
            <div className="sectionStudentsFormContainer">
                <form className="sectionStudentsForm" onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
                    
                    <SearchComboControl options={dataStudents} data={"FileId"} icon={"history_edu"} returnKey={true} setOption={(value) => {
                        setValue("FileId", value);
                    }}>
                        Seleccione un estudiante
                    </SearchComboControl>

                    <button type="submit" className="add-button">
                        <span className="material-symbols-outlined">save</span> Inscribir estudiante
                    </button>
                </form>
            </div>
        </article>
    )
}