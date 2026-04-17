import React, { useEffect, useState } from 'react'
import '../../../styles/pages/modals/users/UserModal.css'
import { InputControl } from '../../../components/InputControl'
import { ComboControl } from '../../../components/ComboControl'
import { DateControl } from '../../../components/DateControl'
import { StepsControl } from '../../../components/StepsControl'
import { yupResolver } from '@hookform/resolvers/yup'
import UserYUP from '../../../schemas/UserYUP'
import { useForm } from 'react-hook-form'

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

export const UserModal = ({ setModal, typeModal }) => {

    const [step, setStep] = useState(0);
    const [countrySelected, setCountrySelected] = useState("");

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
        resolver: yupResolver(UserYUP),
        defaultValues: typeModal != 1 ? {
            firstname: "Felipe",
            lastname: "Ferreya",
            birthdate: new Date("2025-03-28"),
            genre: "Masculino",
            role: "Administrador",
            typeDocument: "DNI",
            documentNumber: "12345678",
            nativeCountry: "Argentina",
            nativeProvince: "Córdoba",
            actualDeparment: "Capital",
            address: "Spilimbergo 4524",
            phoneNumber: "3515543671",
            email: "felipe@gmail.com"
        } : {}
    });

    useEffect(() => {
        if (typeModal != 1) setCountrySelected(getValues("nativeCountry"));
    }, [typeModal])

    return (
        <article className="userAddModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>{typeModal == 1 ? "Agregar nuevo usuario" : typeModal == 2 ? "Ver usuario" : "Actualizar usuario"}</h4>
            <div className="userFormContainer">
                <p className="arrow" onClick={() => {
                    if (step > 0) setStep(prev => prev - 1);
                }}>&lt;</p>
                <form className="userForm">
                    {
                        step == 0 ?
                            <>
                                <InputControl type={"text"} icon={"id_card"} register={register} data={"firstname"} key={1}>
                                    Ingrese el nombre
                                </InputControl>
                                <InputControl type={"text"} icon={"id_card"} register={register} data={"lastname"} key={2}>
                                    Ingrese el apellido
                                </InputControl>
                                <DateControl icon={"cake"} setValue={setValue} data={"birthdate"}
                                    getValues={getValues} key={3}>
                                    Seleccione la fecha de nacimiento
                                </DateControl>
                                <ComboControl icon={"person"}
                                    options={[{ key: 1, value: "Masculino" }, { key: 2, value: "Femenino" }, { key: 3, value: "Otro" }]} setValue={setValue} data={"genre"} getValues={getValues} key={4}>
                                    Seleccione un género
                                </ComboControl>
                            </> :
                            step == 1 ?
                                <>
                                    <ComboControl icon={"person"}
                                        options={[{ key: 1, value: "Administrador" }, { key: 2, value: "Preceptor" }, { key: 3, value: "Preceptor Auxiliar" }]} setValue={setValue} data={"role"} getValues={getValues} key={5}>
                                        Seleccione un rol
                                    </ComboControl>
                                    <ComboControl icon={"id_card"} options={[{ key: 1, value: "DNI" }, { key: 2, value: "Pasaporte" }]}
                                        register={register} data={"typeDocument"} getValues={getValues}
                                        key={6}>
                                        Seleccione el tipo de documento
                                    </ComboControl>
                                    <InputControl type={"text"} icon={"id_card"} register={register} data={"documentNumber"} key={7}>
                                        Ingrese el N° de documento
                                    </InputControl>
                                    <ComboControl icon={"flag"} options={[{ key: 1, value: "Argentina" }, { key: 2, value: "Chile" }, { key: 3, value: "Perú" }, { key: 4, value: "Bolivia" }, { key: 5, value: "Paraguay" }, { key: 6, value: "Uruguay" }, { key: 7, value: "Brasil" }, { key: 8, value: "Ecuador" }, { key: 9, value: "Colombia" }, { key: 10, value: "Venezuela" }]} setOption={setCountrySelected} key={8}
                                        register={register} data={"nativeCountry"} getValues={getValues}>
                                        Seleccione país de origen
                                    </ComboControl>
                                </> :
                                step == 2 ?
                                    <>
                                        <ComboControl icon={"flag_2"} options={provinces[countrySelected]} key={9}
                                            register={register} data={"nativeProvince"} getValues={getValues}>
                                            Seleccione provincia de origen
                                        </ComboControl>
                                        <ComboControl icon={"domain"} options={[{ key: 1, value: "Calamuchita" }, { key: 2, value: "Capital" }, { key: 3, value: "Colón" }, { key: 4, value: "Cruz del Eje" }, { key: 5, value: "General Roca" }, { key: 6, value: "General San Martín" }, { key: 7, value: "Ischilín" }, { key: 8, value: "Juárez Celman" }, { key: 9, value: "Marcos Juárez" }, { key: 10, value: "Minas" }, { key: 11, value: "Pocho" }, { key: 12, value: "Presidente Roque Sáenz Peña" }, { key: 13, value: "Punilla" }, { key: 14, value: "Río Cuarto" }, { key: 15, value: "Río Primero" }, { key: 16, value: "Río Seco" }, { key: 17, value: "Río Segundo" }, { key: 18, value: "San Alberto" }, { key: 19, value: "San Javier" }, { key: 20, value: "San Justo" }, { key: 21, value: "Santa María" }, { key: 22, value: "Sobremonte" }, { key: 23, value: "Tercero Arriba" }, { key: 24, value: "Totoral" }, { key: 25, value: "Tulumba" }, { key: 26, value: "Unión" }]} key={10}
                                            register={register} data={"actualDeparment"} getValues={getValues}>
                                            Seleccione departamento de Córdoba donde reside
                                        </ComboControl>
                                        <InputControl type={"text"} icon={"pin_drop"} key={11} register={register}
                                            data={"address"}>
                                            Domicilio donde reside:
                                        </InputControl>
                                        <InputControl type={"tel"} icon={"phone"} key={12} register={register}
                                            data={"phoneNumber"}>
                                            Ingrese el número de celular:
                                        </InputControl>
                                    </> :
                                    step == 3 ?
                                        <>
                                            <InputControl type={"email"} icon={"email"} key={13} register={register}
                                                data={"email"}>
                                                Ingrese el email:
                                            </InputControl>
                                            <InputControl type={"password"} icon={"password"} key={14} register={register}
                                                data={"password"}>
                                                Ingrese la contraseña:
                                            </InputControl>
                                            <InputControl type={"textarea"} icon={"visibility"} key={15}>Observaciones</InputControl>
                                            {
                                                typeModal == 2 ? <></> :
                                                    <button type="button" className="add-button"
                                                        onClick={() => setModal(false)}>
                                                        <span className="material-symbols-outlined">save</span>
                                                        {typeModal != 1 ? "Actualizar usuario" : "Crear usuario"}
                                                    </button>
                                            }
                                        </> : undefined
                    }
                </form>
                <p className="arrow" onClick={() => {
                    if (step < 3) setStep(prev => prev + 1);
                }}>&gt;</p>
            </div>
            <StepsControl stepsQuantity={4} setStep={setStep} step={step} />
        </article>
    )
}