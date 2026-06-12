import React, { useEffect, useState } from 'react'
import '../../styles/pages/students/StudentModal.css'
import { InputControl } from '../../components/InputControl'
import { DateControl } from '../../components/DateControl'
import { ComboControl } from '../../components/ComboControl'
import { StepsControl } from '../../components/StepsControl'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import PersonYUP from '../../schemas/person-schemas/PersonYUP'

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

export const StudentModal = ({ setModal, typeModal }) => {

    const [step, setStep] = useState(0);
    const [countrySelected, setCountrySelected] = useState("");

    const { register, handleSubmit, formState: { errors }, setValue, getValues, clearErrors } = useForm({
        resolver: yupResolver(PersonYUP),
        shouldUnregister: false,
        defaultValues: typeModal != 1 ? {
            firstname: "",
            lastname: "",
            birthdate: new Date("2000-03-28"),
            gender: "",
            typeDocument: "",
            documentNumber: "",
            cuil: "",
            practicePlace: "",
            observations: ""
        } : {}
    });

    useEffect(() => {
        if (typeModal != 1) setCountrySelected(getValues("nativeCountry"));
    }, [typeModal])

    const createStudent = (data) => {
        console.log(data);
        setModal(false)
    }

    return (
        <article className="studentModal">
            <span class="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>{typeModal == 1 ? "Agregar nuevo estudiante" : typeModal == 2 ? "Ver estudiante" : "Actualizar estudiante"}</h4>
            <div className="studentFormContainer">
                <p className="arrow" onClick={() => {
                    if (step > 0) setStep(prev => prev - 1);
                }}>&lt;</p>
                <form onSubmit={handleSubmit(createStudent, (e) => console.log(e))}>
                    {
                        step == 0 ?
                            <>
                                <InputControl type={"text"} icon={"person"} register={register} data={"firstname"} key={1}
                                    error={errors.firstname}>
                                    Ingrese el nombre *
                                </InputControl>
                                <InputControl type={"text"} icon={"person"} register={register} data={"lastname"} key={2}
                                    error={errors.lastname}>
                                    Ingrese el apellido *
                                </InputControl>
                                <DateControl icon={"cake"} setValue={setValue} data={"birthdate"} getValues={getValues} key={3}
                                    error={errors.birthdate} clearErrors={clearErrors}>
                                    Seleccione la fecha de nacimiento *
                                </DateControl>
                                <ComboControl icon={"diversity_1"}
                                    options={[{ key: 1, value: "Masculino" }, { key: 2, value: "Femenino" }, { key: 3, value: "Otro" }]}
                                    setValue={setValue} data={"gender"} getValues={getValues} key={4} error={errors.gender}>
                                    Seleccione un género *
                                </ComboControl>
                            </> :
                            step == 1 ?
                                <>
                                    <ComboControl icon={"id_card"} options={[{ key: 1, value: "DNI" }, { key: 2, value: "Pasaporte" }]}
                                        setValue={setValue} data={"typeDocument"} getValues={getValues} key={5} error={errors.typeDocument}>
                                        Seleccione el tipo de documento *
                                    </ComboControl>
                                    <InputControl type={"text"} icon={"id_card"} register={register} data={"documentNumber"} key={6}
                                        error={errors.documentNumber}>
                                        Ingrese el N° de documento *
                                    </InputControl>
                                    <InputControl type={"text"} icon={"id_card"} register={register} data={"cuil"} key={7}
                                        error={errors.cuil}>
                                        Ingrese el CUIL *
                                    </InputControl>
                                </> :
                                step == 2 ?
                                    <>
                                        <ComboControl icon={"flag"} options={[{ key: 1, value: "Argentina" }, { key: 2, value: "Chile" }, { key: 3, value: "Perú" }, { key: 4, value: "Bolivia" }, { key: 5, value: "Paraguay" }, { key: 6, value: "Uruguay" }, { key: 7, value: "Brasil" }, { key: 8, value: "Ecuador" }, { key: 9, value: "Colombia" }, { key: 10, value: "Venezuela" }]} setOption={setCountrySelected} key={8}
                                            data={"locationDTO.country"} getValues={getValues} setValue={setValue}
                                            error={errors.locationDTO?.country}>
                                            Seleccione país de origen *
                                        </ComboControl>
                                        <ComboControl icon={"flag_2"} options={provinces[countrySelected]} key={9} setValue={setValue}
                                            data={"locationDTO.province"} getValues={getValues} error={errors.locationDTO?.province}>
                                            Seleccione provincia de origen *
                                        </ComboControl>
                                        <ComboControl icon={"domain"} options={[{ key: 1, value: "Calamuchita" }, { key: 2, value: "Capital" }, { key: 3, value: "Colón" }, { key: 4, value: "Cruz del Eje" }, { key: 5, value: "General Roca" }, { key: 6, value: "General San Martín" }, { key: 7, value: "Ischilín" }, { key: 8, value: "Juárez Celman" }, { key: 9, value: "Marcos Juárez" }, { key: 10, value: "Minas" }, { key: 11, value: "Pocho" }, { key: 12, value: "Presidente Roque Sáenz Peña" }, { key: 13, value: "Punilla" }, { key: 14, value: "Río Cuarto" }, { key: 15, value: "Río Primero" }, { key: 16, value: "Río Seco" }, { key: 17, value: "Río Segundo" }, { key: 18, value: "San Alberto" }, { key: 19, value: "San Javier" }, { key: 20, value: "San Justo" }, { key: 21, value: "Santa María" }, { key: 22, value: "Sobremonte" }, { key: 23, value: "Tercero Arriba" }, { key: 24, value: "Totoral" }, { key: 25, value: "Tulumba" }, { key: 26, value: "Unión" }]} key={10} setValue={setValue}
                                            data={"locationDTO.department"} getValues={getValues} error={errors.locationDTO?.department}>
                                            Seleccione departamento de Córdoba donde reside *
                                        </ComboControl>
                                        <InputControl type={"text"} icon={"pin_drop"} key={11} register={register}
                                            data={"locationDTO.address"} error={errors.locationDTO?.address}>
                                            Domicilio donde reside *
                                        </InputControl>
                                    </>
                                    : step == 3 ?
                                        <>
                                            <InputControl type={"tel"} icon={"phone"} key={12} register={register}
                                                data={"contactDTO.phoneNumber"} error={errors.contactDTO?.phoneNumber}>
                                                Ingrese el número de celular
                                            </InputControl>
                                            <InputControl type={"email"} icon={"email"} key={13} register={register}
                                                data={"contactDTO.email"} error={errors.contactDTO?.email}>
                                                Ingrese el correo electrónico
                                            </InputControl>
                                            <InputControl type={"tel"} icon={"local_hospital"} key={14} register={register}
                                                data={"contactDTO.emergencyNumber"} error={errors.contactDTO?.emergencyNumber}>
                                                Ingrese el número de emergencias
                                            </InputControl>
                                            <InputControl type={"text"} icon={"person"} key={15} register={register}
                                                data={"contactDTO.contactNameEmergency"} error={errors.contactDTO?.contactNameEmergency}>
                                                Ingrese nombre/parentesco del contacto de emergencia
                                            </InputControl>
                                        </> : step == 4 ?
                                            <>
                                                <InputControl type={"text"} icon={"person"} register={register} data={"practicePlace"}
                                                    key={16} error={errors.practicePlace}>
                                                    Ingrese el lugar de práctica (solo para alumnos de 3° y 4° año)
                                                </InputControl>
                                                <InputControl register={register} data={"observations"} type={"textarea"}
                                                    icon={"visibility"} key={17} error={errors.observations}>Observaciones</InputControl>
                                                {
                                                    typeModal == 2 ? <></> :
                                                        <button type="submit" className="add-button">
                                                            <span className="material-symbols-outlined">save</span>
                                                            {typeModal != 1 ? "Actualizar estudiante" : "Crear estudiante"}
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