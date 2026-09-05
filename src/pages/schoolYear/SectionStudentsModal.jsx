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
import SchoolYearYUP from '../../schemas/schoolYear/SchoolYearYUP'
import StudentService from '../../services/students/StudentService'

export const SectionStudentsModal = ({ setModal, getAll }) => {
    const { data, register, handleSubmit, formState: { errors }, reset, setValue } = useForm({ resolver: yupResolver(SchoolYearYUP) })
    const [dataCareers, setDataCareers] = useState([]);
    const [currentCareerId, setCurrentCareerId] = useState(null);
    const [dataCurriculums, setDataCurriculums] = useState([]);
    const [currentStudentId, setCurrentStudentId] = useState(null);
    const [dataStudents, setDataStudents] = useState([]);
    const { user } = useContext(UserContext);
    const { id } = useParams();

    const onSubmit = async (data) => {

    }

    const getStudentsBySchoolYearId = async () => {
        try{
            const res = await StudentService.getStudentsBySchoolYearId(id);
            console.log(res.data);
            if(res.data.statusCode >= 200 && res.data.statusCode < 300) {
               const students = [];
               res.data.object.forEach(element => {
                students.push({ key: element.id, value: `${element.firstName} ${element.lastName} - ${element.documentNumber}` });
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
                    <ComboControl options={dataStudents} icon={"history_edu"} returnKey={true} setOption={(value) => {
                        setCurrentStudentId(value);
                    }}>
                        Seleccione un estudiante
                    </ComboControl>
                    <button type="submit" className="add-button">
                        <span className="material-symbols-outlined">save</span> Guardar cambios
                    </button>
                </form>
            </div>
        </article>
    )
}