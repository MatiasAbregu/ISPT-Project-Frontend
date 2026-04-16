import React, { useEffect, useState } from 'react'
import '../../../styles/pages/modals/students/StudentModal.css'
import { InputControl } from '../../../components/InputControl'
import { DateControl } from '../../../components/DateControl'
import { ComboControl } from '../../../components/ComboControl'
import { StepsControl } from '../../../components/StepsControl'
import StudentYUP from '../../../schemas/StudentYUP'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

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

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
        resolver: yupResolver(StudentYUP),
        defaultValues: typeModal != 1 ? {
            file: "TR-2025",
            status: "Activo",
            firstname: "Felipe",
            lastname: "Ferreya",
            birthdate: new Date("2000-03-28"),
            startDate: new Date("2020-04-4"),
            gender: "Masculino",
            typeDocument: "DNI",
            documentNumber: "12345678",
            cuil: "20-12345678-9",
            nativeCountry: "Argentina",
            nativeProvince: "Córdoba",
            actualDeparment: "Capital",
            address: "Spilimbergo 4524",
            phoneNumber: "3515543671",
            email: "felipe@gmail.com",
            practicePlace: "",
            observations: ""
        } : {}
    });

    useEffect(() => {
        if (typeModal != 1) setCountrySelected(getValues("nativeCountry"));
    }, [typeModal])

    return (
        <article className="studentModal">
            <span class="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>{typeModal == 1 ? "Agregar nuevo estudiante" : typeModal == 2 ? "Ver estudiante" : "Actualizar estudiante"}</h4>
            <div className="studentFormContainer">
                <p className="arrow" onClick={() => {
                    if (step > 0) setStep(prev => prev - 1);
                }}>&lt;</p>
                <form>
                    {
                        step == 0 ?
                            <>
                                <InputControl type={"text"} icon={"id_card"} register={register} data={"file"} key={1}>
                                    Ingrese el legajo del estudiante *
                                </InputControl>
                                <ComboControl icon={"person_check"}
                                    options={[{ key: 1, value: "Activo" }, { key: 2, value: "Inactivo" }, { key: 3, value: "Egresado" }]} setValue={setValue} data={"status"} getValues={getValues} key={2}>
                                    Seleccione el estado del alumno *
                                </ComboControl>
                                <DateControl icon={"calendar_month"} setValue={setValue} data={"startDate"}
                                    getValues={getValues} key={3}>
                                    Seleccione fecha cuando inició a cursar *
                                </DateControl>
                            </>
                            : step == 1 ?
                                <>
                                    <InputControl type={"text"} icon={"person"} register={register} data={"firstname"} key={4}>
                                        Ingrese el nombre *
                                    </InputControl>
                                    <InputControl type={"text"} icon={"person"} register={register} data={"lastname"} key={5}>
                                        Ingrese el apellido *
                                    </InputControl>
                                    <DateControl icon={"cake"} setValue={setValue} data={"birthdate"}
                                        getValues={getValues} key={6}>
                                        Seleccione la fecha de nacimiento *
                                    </DateControl>
                                    <ComboControl icon={"diversity_1"}
                                        options={[{ key: 1, value: "Masculino" }, { key: 2, value: "Femenino" }, { key: 3, value: "Otro" }]} setValue={setValue} data={"gender"} getValues={getValues} key={7}>
                                        Seleccione un género *
                                    </ComboControl>
                                </> :
                                step == 2 ?
                                    <>
                                        <ComboControl icon={"id_card"} options={[{ key: 1, value: "DNI" }, { key: 2, value: "Pasaporte" }]}
                                            register={register} data={"typeDocument"} getValues={getValues}
                                            key={8}>
                                            Seleccione el tipo de documento *
                                        </ComboControl>
                                        <InputControl type={"text"} icon={"id_card"} register={register} data={"documentNumber"} key={9}>
                                            Ingrese el N° de documento *
                                        </InputControl>
                                        <InputControl type={"text"} icon={"id_card"} register={register} data={"cuil"} key={10}>
                                            Ingrese el CUIL *
                                        </InputControl>
                                    </> :
                                    step == 3 ?
                                        <>
                                            <ComboControl icon={"flag"} options={[{ key: 1, value: "Argentina" }, { key: 2, value: "Chile" }, { key: 3, value: "Perú" }, { key: 4, value: "Bolivia" }, { key: 5, value: "Paraguay" }, { key: 6, value: "Uruguay" }, { key: 7, value: "Brasil" }, { key: 8, value: "Ecuador" }, { key: 9, value: "Colombia" }, { key: 10, value: "Venezuela" }]} setOption={setCountrySelected} key={11}
                                                register={register} data={"nativeCountry"} getValues={getValues}>
                                                Seleccione país de origen *
                                            </ComboControl>
                                            <ComboControl icon={"flag_2"} options={provinces[countrySelected]} key={12}
                                                register={register} data={"nativeProvince"} getValues={getValues}>
                                                Seleccione provincia de origen *
                                            </ComboControl>
                                            <ComboControl icon={"domain"} options={[{ key: 1, value: "Calamuchita" }, { key: 2, value: "Capital" }, { key: 3, value: "Colón" }, { key: 4, value: "Cruz del Eje" }, { key: 5, value: "General Roca" }, { key: 6, value: "General San Martín" }, { key: 7, value: "Ischilín" }, { key: 8, value: "Juárez Celman" }, { key: 9, value: "Marcos Juárez" }, { key: 10, value: "Minas" }, { key: 11, value: "Pocho" }, { key: 12, value: "Presidente Roque Sáenz Peña" }, { key: 13, value: "Punilla" }, { key: 14, value: "Río Cuarto" }, { key: 15, value: "Río Primero" }, { key: 16, value: "Río Seco" }, { key: 17, value: "Río Segundo" }, { key: 18, value: "San Alberto" }, { key: 19, value: "San Javier" }, { key: 20, value: "San Justo" }, { key: 21, value: "Santa María" }, { key: 22, value: "Sobremonte" }, { key: 23, value: "Tercero Arriba" }, { key: 24, value: "Totoral" }, { key: 25, value: "Tulumba" }, { key: 26, value: "Unión" }]} key={13}
                                                register={register} data={"actualDeparment"} getValues={getValues}>
                                                Seleccione departamento de Córdoba donde reside *
                                            </ComboControl>
                                            <InputControl type={"text"} icon={"pin_drop"} key={14} register={register}
                                                data={"address"}>
                                                Domicilio donde reside *
                                            </InputControl>
                                        </>
                                        : step == 4 ?
                                            <>
                                                <InputControl type={"tel"} icon={"phone"} key={15} register={register}
                                                    data={"phoneNumber"}>
                                                    Ingrese el número de celular
                                                </InputControl>
                                                <InputControl type={"email"} icon={"email"} key={16} register={register}
                                                    data={"email"}>
                                                    Ingrese el email
                                                </InputControl>
                                                <InputControl type={"text"} icon={"person"} register={register} data={"practicePlace"} 
                                                key={17}>
                                                    Ingrese el lugar de práctica (solo para alumnos de 3° y 4° año)
                                                </InputControl>
                                            </> : step == 5 ?
                                                <>
                                                    <InputControl type={"textarea"} icon={"visibility"} key={18}>Observaciones</InputControl>
                                                    {
                                                        typeModal == 2 ? <></> :
                                                            <button type="button" className="add-button"
                                                                onClick={() => setModal(false)}>
                                                                <span className="material-symbols-outlined">save</span>
                                                                {typeModal != 1 ? "Actualizar estudiante" : "Crear estudiante"}
                                                            </button>
                                                    }
                                                </> : undefined
                    }
                </form>
                <p className="arrow" onClick={() => {
                    if (step < 5) setStep(prev => prev + 1);
                }}>&gt;</p>
            </div>
            <StepsControl stepsQuantity={6} setStep={setStep} step={step} />
        </article>
    )
}