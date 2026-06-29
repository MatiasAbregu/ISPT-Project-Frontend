import React from 'react'
import { InputControl } from '../../components/InputControl'
import { ComboControl } from '../../components/ComboControl'
import PersonWithCUILYUP from '../../schemas/person-schemas/PersonWithCUILYUP'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import PositionService from '../../services/positions/PositionService'
import TeacherService from '../../services/teachers/TeacherService'
import StudentService from '../../services/students/StudentService'

import '../../styles/pages/students/AddExistentPersonModal.css'
import toast from 'react-hot-toast'

export const AddExistentPersonModal = ({ setModal, typeModal, getAll }) => {

    const { register, handleSubmit, formState: { errors }, setValue, getValues, clearErrors, reset, watch } = useForm({
        resolver: yupResolver(PersonWithCUILYUP(typeModal == "position" ? true : false)),
        shouldUnregister: false
    });

    const sendForm = async (data) => {
        let finalData = { ...data };
        if(typeModal == "teacher" || typeModal == "student") finalData.roleName = null;
        if (finalData.roleName == "Preceptor Auxiliar") finalData.roleName = "Preceptor_Auxiliar";

        try {
            const res = typeModal == "teacher" ?
                await TeacherService.addPersonInTeacher(finalData) :
                typeModal == "student" ? await StudentService.addPersonInStudent(finalData) :
                    await PositionService.addPersonInPosition(data);

            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                toast.success(res.data.object);
                setModal(false);
                getAll();
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
        <article className="addExistentPersonModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>{typeModal == "student" ? "Agregar una persona existente a estudiantes" :
                typeModal == "teacher" ? "Agregar una persona existente a docentes" :
                    "Asignarle un cargo a una persona existente"}</h4>
            <div className="addExistentPersonModalContainer">
                {typeModal == "student" ? <p className='legend'>
                    (Esta ventana solo es para agregar a un estudiante a partir del CUIL de una persona ya registrada <br /> en el sistema, ya sea en el apartado de cargos o docentes)
                </p> : typeModal == "teacher" ?
                    <p className='legend'>
                        (Esta ventana solo es para agregar a un docente a partir del CUIL de una persona ya registrada <br /> en el sistema, ya sea en el apartado de cargos o estudiantes)
                    </p>
                    :
                    <p className='legend'>
                        (Esta ventana solo es para asignar un cargo a una persona ya registrada a partir de su CUIL <br /> en el sistema, ya sea en el apartado de docentes o estudiantes)
                    </p>}
                <form onSubmit={handleSubmit(sendForm)}>
                    <InputControl type={"text"} icon={"person"} register={register} data={"cuil"} error={errors.cuil} key={1}>
                        Ingrese el CUIL de la persona *
                    </InputControl>
                    {
                        typeModal == "position" ?
                            <ComboControl icon={"person"} options={[{ key: 1, value: "Directivo" }, { key: 2, value: "Preceptor" }, { key: 3, value: "Preceptor Auxiliar" }]} setValue={setValue} data={"roleName"} getValues={getValues} clearErrors={clearErrors} error={errors.roleName} value={watch("roleName")} key={2}>
                                Seleccione el rol que se le asignará *
                            </ComboControl> : <></>
                    }
                    <button type="submit" className="add-button">
                        <span className="material-symbols-outlined">save</span>
                        {typeModal == "student" ? "Agregar persona a estudiantes" :
                            typeModal == "teacher" ? "Agregar persona a docentes" :
                                "Asignarle un cargo a la persona"}
                    </button>
                </form>
            </div>
        </article>
    )
}