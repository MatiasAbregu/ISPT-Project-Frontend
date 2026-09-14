import React, { useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl'
import { ComboControl } from '../../components/ComboControl'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FinalExamYUP from '../../schemas/exams/FinalExamYUP'
import TeacherService from '../../services/teachers/TeacherService'
import PositionService from '../../services/positions/PositionService'
import toast from 'react-hot-toast'

import '../../styles/pages/exams/ExamTribunalModal.css'

export const ExamTribuanlModal = ({ setModal, setData }) => {

    const { data, register, handleSubmit, formState: { errors }, reset, setValue, getValues, watch } =
        useForm({ resolver: yupResolver(FinalExamYUP) })
    const [step, setStep] = useState(0);
    const [dataPersonal, setDataPersonal] = useState([]);

    const getAllPersonal = async () => {
        try {
            const uniquePersonalMap = new Map();

            const resTeachers = await TeacherService.getAllTeachers();
            if (resTeachers.data?.statusCode >= 200 && resTeachers.data?.statusCode < 300) {
                resTeachers.data.object.forEach(element => {
                    if (element.documentNumber && !uniquePersonalMap.has(element.documentNumber)) {
                        uniquePersonalMap.set(element.documentNumber, {
                            key: element.id,
                            value: `${element.firstname} ${element.lastname} | DNI: ${element.documentNumber}`
                        });
                    }
                });
            }

            const resPersonal = await PositionService.getAllPersonal();
            if (resPersonal.data?.statusCode >= 200 && resPersonal.data?.statusCode < 300) {
                resPersonal.data.object.forEach(element => {
                    if (element.documentNumber && !uniquePersonalMap.has(element.documentNumber)) {
                        uniquePersonalMap.set(element.documentNumber, {
                            key: element.id,
                            value: `${element.firstname} ${element.lastname} | DNI: ${element.documentNumber}`
                        });
                    }
                });
            }

            setDataPersonal(Array.from(uniquePersonalMap.values()));
        } catch (error) {
            if (error.response && error.response.data) {
                const backendResponse = error.response.data;
                toast.error(backendResponse.message);
            }
        }
    }

    useEffect(() => {
        getAllPersonal();
    }, [])

    const onSubmit = async (data) => {

    }

    return (
        <form className='formTribunal' onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
            <span className="material-symbols-outlined back" onClick={() => setModal(false)}>arrow_back</span>
            <ComboControl icon={"person"}
                options={dataPersonal} returnKey={true} setOption={(value) => {
                    setValue("PersonId", value);
                }}>
                Seleccione el titular de la mesa *
            </ComboControl>
            <ComboControl icon={"person"}
                options={dataPersonal} returnKey={true} setOption={(value) => {
                    setValue("PersonId", value);
                }}>
                Seleccione el responsable vocal N°1 de la mesa
            </ComboControl>
            <ComboControl icon={"person"}
                options={dataPersonal} returnKey={true} setOption={(value) => {
                    setValue("PersonId", value);
                }}>
                Seleccione el responsable vocal N°2 de la mesa
            </ComboControl>
        </form>
    )
}