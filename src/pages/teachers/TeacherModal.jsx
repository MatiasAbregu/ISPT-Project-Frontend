import React, { useContext, useEffect, useState } from 'react'
import '../../styles/pages/teachers/TeacherModal.css'
import { InputControl } from '../../components/InputControl'
import { DateControl } from '../../components/DateControl'
import { ComboControl } from '../../components/ComboControl'
import { StepsControl } from '../../components/StepsControl'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import PersonYUP from '../../schemas/person-schemas/PersonYUP'
import TeacherService from '../../services/teachers/TeacherService'
import toast from 'react-hot-toast'
import { UserContext } from "../../context/UserProvider";

const provinces = {
    "Argentina": [{ key: 1, value: "Córdoba" }, { key: 2, value: "Buenos Aires" }, { key: 3, value: "Mendoza" }],
    "Chile": [{ key: 1, value: "Santiago" }, { key: 2, value: "Valparaíso" }, { key: 3, value: "Concepción" }],
    "Perú": [{ key: 1, value: "Lima" }, { key: 2, value: "Arequipa" }, { key: 3, value: "Cusco" }],
    "Bolivia": [{ key: 1, value: "Andrés Ibáñez" }, { key: 2, value: "Murillo" }, { key: 3, value: "Cercado" }],
    "Paraguay": [{ key: 1, value: "Asunción" }, { key: 2, value: "Ciudad del Este" }, { key: 3, value: "Encarnación" }],
    "Uruguay": [{ key: 1, value: "Montevideo" }, { key: 2, value: "Canelones" }, { key: 3, value: "Maldonado" }],
    "Brasil": [{ key: 1, value: "São Paulo" }, { key: 2, value: "Río de Janeiro" }, { key: 3, value: "Minas Gerais" }],
    "Ecuador": [{ key: 1, value: "Quito" }, { key: 2, value: "Guayas" }, { key: 3, value: "Manabí" }],
    "Colombia": [{ key: 1, value: "Medellín" }, { key: 2, value: "Cali" }, { key: 3, value: "Bogota" }],
    "Venezuela": [{ key: 1, value: "Caracas" }, { key: 2, value: "Maracaibo" }, { key: 3, value: "Cumaná" }]
};

export const TeacherModal = ({ setModal, typeModal, teacherId = 0, getAllTeachers }) => {
    const [step, setStep] = useState(0);
    const [countrySelected, setCountrySelected] = useState("");
    const { user } = useContext(UserContext);

    const { register, handleSubmit, formState: { errors }, setValue, getValues, clearErrors, reset, watch } = useForm({
        resolver: yupResolver(PersonYUP),
        shouldUnregister: false
    });

    useEffect(() => {
        if (typeModal != 1) setCountrySelected(getValues("nativeCountry"));
    }, [typeModal])

    useEffect(() => {
        if (teacherId != 0) getTeacherById(teacherId);
    }, [teacherId]);

    // REQUESTS
    // POST
    const createOrUpdateTeacher = async (data) => {
        let finalData;
        if (typeModal == 1) {
            finalData = {
                ...data,
                createdById: user.id || user.ID
            }
        } else if (typeModal == 3) {
            finalData = {
                ...data,
                updatedById: user.id || user.ID,
                Id: teacherId
            }
        }

        try {
            const res = typeModal == 1 ? await TeacherService.createTeacher(finalData) : await TeacherService.updateTeacher(finalData)
            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                toast.success(res.data.object);
                setModal(false);
                getAllTeachers();
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

    // GET
    const getTeacherById = async (id) => {
        try {
            const res = await TeacherService.getTeacherById(id);

            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                const data = res.data.object;

                reset({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    birthdate: new Date(data.birthdate),
                    gender: data.gender,
                    typeDocument: data.typeDocument,
                    documentNumber: data.documentNumber,
                    cuil: data.cuil,
                    locationDTO: {
                        country: data.locationDTO.country,
                        province: data.locationDTO.province,
                        department: data.locationDTO.department,
                        address: data.locationDTO.address
                    },
                    contactDTO: {
                        phoneNumber: data.contactDTO.phoneNumber,
                        email: data.contactDTO.email,
                        emergencyNumber: data.contactDTO.emergencyNumber,
                        contactNameEmergency: data.contactDTO.contactNameEmergency
                    },
                    practicePlace: data.practicePlace,
                    observations: data.observations
                })
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
    //

    return (
        <article className="teacherModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>{typeModal == 1 ? "Agregar nuevo docente" : typeModal == 2 ? "Ver docente" : "Actualizar docente"}</h4>
            <div className="teacherFormContainer">
                <p className="arrow" onClick={() => {
                    if (step > 0) setStep(prev => prev - 1);
                }}>&lt;</p>
                <form onSubmit={handleSubmit(createOrUpdateTeacher, (e) => console.log(e))}>
                    {
                        step == 0 ?
                            <>
                                <InputControl type={"text"} icon={"person"} register={register} data={"firstname"} key={1}
                                    error={errors.firstname} readonly={typeModal == 2 ? true : false}>
                                    Ingrese el nombre *
                                </InputControl>
                                <InputControl type={"text"} icon={"person"} register={register} data={"lastname"} key={2}
                                    error={errors.lastname} readonly={typeModal == 2 ? true : false}>
                                    Ingrese el apellido *
                                </InputControl>
                                <DateControl icon={"cake"} setValue={setValue} data={"birthdate"} value={watch("birthdate")} getValues={getValues} key={3}
                                    error={errors.birthdate} clearErrors={clearErrors} readOnly={typeModal == 2 ? true : false}>
                                    Seleccione la fecha de nacimiento *
                                </DateControl>
                                <ComboControl icon={"diversity_1"} clearErrors={clearErrors} readOnly={typeModal == 2 ? true : false}
                                    options={[{ key: 1, value: "Masculino" }, { key: 2, value: "Femenino" }, { key: 3, value: "Otro" }]}
                                    setValue={setValue} data={"gender"} getValues={getValues} key={4} error={errors.gender}
                                    value={watch("gender")}>
                                    Seleccione un género *
                                </ComboControl>
                            </> :
                            step == 1 ?
                                <>
                                    <ComboControl icon={"id_card"} options={[{ key: 1, value: "DNI" }, { key: 2, value: "Pasaporte" }]}
                                        setValue={setValue} data={"typeDocument"} getValues={getValues} key={5} error={errors.typeDocument}
                                        readOnly={typeModal == 2 ? true : false} value={watch("typeDocument")}>
                                        Seleccione el tipo de documento *
                                    </ComboControl>
                                    <InputControl type={"text"} icon={"id_card"} register={register} data={"documentNumber"} key={6}
                                        error={errors.documentNumber} readonly={typeModal == 2 ? true : false}>
                                        Ingrese el N° de documento *
                                    </InputControl>
                                    <InputControl type={"text"} icon={"id_card"} register={register} data={"cuil"} key={7}
                                        readonly={typeModal == 2 ? true : false} error={errors.cuil}>
                                        Ingrese el CUIL *
                                    </InputControl>
                                </> :
                                step == 2 ?
                                    <>
                                        <ComboControl icon={"flag"} options={[{ key: 1, value: "Argentina" }, { key: 2, value: "Chile" }, { key: 3, value: "Perú" }, { key: 4, value: "Bolivia" }, { key: 5, value: "Paraguay" }, { key: 6, value: "Uruguay" }, { key: 7, value: "Brasil" }, { key: 8, value: "Ecuador" }, { key: 9, value: "Colombia" }, { key: 10, value: "Venezuela" }]} setOption={setCountrySelected} key={8}
                                            data={"locationDTO.country"} getValues={getValues} setValue={setValue}
                                            value={watch("locationDTO.country")} error={errors.locationDTO?.country} readOnly={typeModal == 2 ? true : false}>
                                            Seleccione país de origen *
                                        </ComboControl>
                                        <ComboControl icon={"flag_2"} options={provinces[countrySelected]} key={9} setValue={setValue}
                                            data={"locationDTO.province"} getValues={getValues} error={errors.locationDTO?.province} value={watch("locationDTO.province")} readOnly={typeModal == 2 ? true : false}>
                                            Seleccione provincia de origen *
                                        </ComboControl>
                                        <ComboControl icon={"domain"} options={[{ key: 1, value: "Calamuchita" }, { key: 2, value: "Capital" }, { key: 3, value: "Colón" }, { key: 4, value: "Cruz del Eje" }, { key: 5, value: "General Roca" }, { key: 6, value: "General San Martín" }, { key: 7, value: "Ischilín" }, { key: 8, value: "Juárez Celman" }, { key: 9, value: "Marcos Juárez" }, { key: 10, value: "Minas" }, { key: 11, value: "Pocho" }, { key: 12, value: "Presidente Roque Sáenz Peña" }, { key: 13, value: "Punilla" }, { key: 14, value: "Río Cuarto" }, { key: 15, value: "Río Primero" }, { key: 16, value: "Río Seco" }, { key: 17, value: "Río Segundo" }, { key: 18, value: "San Alberto" }, { key: 19, value: "San Javier" }, { key: 20, value: "San Justo" }, { key: 21, value: "Santa María" }, { key: 22, value: "Sobremonte" }, { key: 23, value: "Tercero Arriba" }, { key: 24, value: "Totoral" }, { key: 25, value: "Tulumba" }, { key: 26, value: "Unión" }]} key={10} setValue={setValue}
                                            data={"locationDTO.department"} getValues={getValues} error={errors.locationDTO?.department} readOnly={typeModal == 2 ? true : false} value={watch("locationDTO.department")}>
                                            Seleccione departamento de Córdoba donde reside *
                                        </ComboControl>
                                        <InputControl type={"text"} icon={"pin_drop"} key={11} register={register}
                                            readonly={typeModal == 2 ? true : false} data={"locationDTO.address"} error={errors.locationDTO?.address}>
                                            Domicilio donde reside *
                                        </InputControl>
                                    </>
                                    : step == 3 ?
                                        <>
                                            <InputControl type={"tel"} icon={"phone"} key={12} register={register} readonly={typeModal == 2 ? true : false} data={"contactDTO.phoneNumber"} error={errors.contactDTO?.phoneNumber}>
                                                Ingrese el número de celular
                                            </InputControl>
                                            <InputControl type={"email"} icon={"email"} key={13} register={register} readonly={typeModal == 2 ? true : false} data={"contactDTO.email"} error={errors.contactDTO?.email}>
                                                Ingrese el correo electrónico
                                            </InputControl>
                                            <InputControl type={"tel"} icon={"local_hospital"} key={14} register={register} readonly={typeModal == 2 ? true : false} data={"contactDTO.emergencyNumber"} error={errors.contactDTO?.emergencyNumber}>
                                                Ingrese el número de emergencias
                                            </InputControl>
                                            <InputControl type={"text"} icon={"person"} key={15} register={register} readonly={typeModal == 2 ? true : false} data={"contactDTO.contactNameEmergency"} error={errors.contactDTO?.contactNameEmergency}>
                                                Ingrese nombre/parentesco del contacto de emergencia
                                            </InputControl>
                                        </> : step == 4 ?
                                            <>
                                                <InputControl register={register} data={"observations"} type={"textarea"}
                                                    readonly={typeModal == 2 ? true : false} icon={"visibility"} key={16}
                                                    error={errors.observations}>
                                                    Observaciones
                                                </InputControl>
                                                {
                                                    typeModal == 2 ? <></> :
                                                        <button type="submit" className="add-button">
                                                            <span className="material-symbols-outlined">save</span>
                                                            {typeModal != 1 ? "Actualizar docente" : "Crear docente"}
                                                        </button>
                                                }
                                            </> : undefined
                    }
                </form>
                <p className="arrow" onClick={() => {
                    if (step < 4) setStep(prev => prev + 1);
                }}>&gt;</p>
            </div>
            <StepsControl stepsQuantity={5} setStep={setStep} step={step} />
        </article>
    )
}