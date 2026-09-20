import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { ComboControl } from '../../components/ComboControl'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import TribunalFinalExamYUP from '../../schemas/exams/TribunalFinalExamYUP'
import TeacherService from '../../services/teachers/TeacherService'
import PositionService from '../../services/positions/PositionService'
import toast from 'react-hot-toast'

import '../../styles/pages/exams/ExamTribunalModal.css'

export const ExamTribunalModal = ({ setModal, setData, initialData = {}, readOnly = false }) => {

    const parseId = (val) => (val !== null && val !== undefined && val !== '' ? Number(val) : null);

    const { handleSubmit, formState: { errors }, reset, setValue, watch } =
        useForm({
            resolver: yupResolver(TribunalFinalExamYUP),
            defaultValues: {
                PresidentId: null,
                Vocal1Id: null,
                Vocal2Id: null
            }
        });

    const [dataPersonal, setDataPersonal] = useState([]);
    const [loading, setLoading] = useState(true);

    const presidentId = watch("PresidentId");
    const vocal1Id = watch("Vocal1Id");
    const vocal2Id = watch("Vocal2Id");

    const getAllPersonal = async () => {
        try {
            setLoading(true);
            const uniquePersonalMap = new Map();

            const resTeachers = await TeacherService.getAllTeachers();
            if (resTeachers.data?.statusCode >= 200 && resTeachers.data?.statusCode < 300) {
                resTeachers.data.object.forEach(element => {
                    const personKey = element.personId ?? element.id ?? element.teacherId;
                    if (element.documentNumber && !uniquePersonalMap.has(element.documentNumber)) {
                        uniquePersonalMap.set(element.documentNumber, {
                            key: Number(personKey),
                            value: `${element.firstname} ${element.lastname} | DNI: ${element.documentNumber}`
                        });
                    }
                });
            }

            const resPersonal = await PositionService.getAllPersonal();
            if (resPersonal.data?.statusCode >= 200 && resPersonal.data?.statusCode < 300) {
                resPersonal.data.object.forEach(element => {
                    const personKey = element.personId ?? element.id ?? element.personalId;
                    if (element.documentNumber && !uniquePersonalMap.has(element.documentNumber)) {
                        uniquePersonalMap.set(element.documentNumber, {
                            key: Number(personKey),
                            value: `${element.firstname} ${element.lastname} | DNI: ${element.documentNumber}`
                        });
                    }
                });
            }

            setDataPersonal(Array.from(uniquePersonalMap.values()));
        } catch (error) {
            if (error.response?.data) {
                toast.error(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllPersonal();
    }, []);

    // Se cargan los valores extraídos directamente de initialData cuando termina de cargar el personal
    useEffect(() => {
        if (!loading && initialData) {
            const pres = parseId(initialData.presidentId ?? initialData.PresidentId);
            const voc1 = parseId(initialData.vocal1Id ?? initialData.Vocal1Id);
            const voc2 = parseId(initialData.vocal2Id ?? initialData.Vocal2Id);

            reset({
                PresidentId: pres,
                Vocal1Id: voc1,
                Vocal2Id: voc2
            });
        }
    }, [loading, initialData, reset]);

    const presidentOptions = useMemo(() =>
        dataPersonal.filter(p => p.key !== parseId(vocal1Id) && p.key !== parseId(vocal2Id)),
        [dataPersonal, vocal1Id, vocal2Id]);

    const vocal1Options = useMemo(() =>
        dataPersonal.filter(p => p.key !== parseId(presidentId) && p.key !== parseId(vocal2Id)),
        [dataPersonal, presidentId, vocal2Id]);

    const vocal2Options = useMemo(() =>
        dataPersonal.filter(p => p.key !== parseId(presidentId) && p.key !== parseId(vocal1Id)),
        [dataPersonal, presidentId, vocal1Id]);

    const handleSetPresident = useCallback((val) => {
        setValue("PresidentId", parseId(val), { shouldValidate: true });
    }, [setValue]);

    const handleSetVocal1 = useCallback((val) => {
        setValue("Vocal1Id", parseId(val), { shouldValidate: true });
    }, [setValue]);

    const handleSetVocal2 = useCallback((val) => {
        setValue("Vocal2Id", parseId(val), { shouldValidate: true });
    }, [setValue]);

    const handleClear = () => {
        reset({
            PresidentId: null,
            Vocal1Id: null,
            Vocal2Id: null
        });
    };

    const onSubmit = async (formData) => {
        setData({
            PresidentId: parseId(formData.PresidentId),
            Vocal1Id: parseId(formData.Vocal1Id),
            Vocal2Id: parseId(formData.Vocal2Id)
        });
        setModal(false);
    };

    return (
        <form className='formTribunal' onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}>
            <span className="material-symbols-outlined back" onClick={() => setModal(false)}>arrow_back</span>
            <ComboControl
                icon={"person"}
                options={presidentOptions}
                returnKey={true}
                value={presidentId}
                setOption={handleSetPresident}
                error={errors.PresidentId}
                readOnly={readOnly}
            >
                Seleccione el titular de la mesa *
            </ComboControl>
            <ComboControl
                icon={"person"}
                options={vocal1Options}
                returnKey={true}
                value={vocal1Id}
                setOption={handleSetVocal1}
                error={errors.Vocal1Id}
                readOnly={readOnly}
            >
                Seleccione el responsable vocal N°1 de la mesa
            </ComboControl>
            <ComboControl
                icon={"person"}
                options={vocal2Options}
                returnKey={true}
                value={vocal2Id}
                setOption={handleSetVocal2}
                error={errors.Vocal2Id}
                readOnly={readOnly}
            >
                Seleccione el responsable vocal N°2 de la mesa
            </ComboControl>
            {
                !readOnly ?
                    <div className='btn-box'>
                        <button className='cleanBtn' type="button" onClick={handleClear}>
                            <span className="material-symbols-outlined">
                                delete
                            </span>
                            Limpiar elecciones
                        </button>
                        <button className='saveBtn' type="submit">
                            <span className="material-symbols-outlined">
                                save
                            </span>
                            Registrar tribunal
                        </button>
                    </div> : undefined
            }
        </form>
    );
};