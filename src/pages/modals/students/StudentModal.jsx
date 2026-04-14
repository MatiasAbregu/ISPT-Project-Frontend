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
    const [provinceName, setProvinceName] = useState("");

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(StudentYUP),
        defaultValues: typeModal != 1 ? {
            firstname: "Felipe",
            lastname: "Ferreya"
        } : {}
    });

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
                                <InputControl type={"text"} icon={"id_card"} register={register} data={"firstname"}>
                                    Ingrese el nombre
                                </InputControl>
                                <InputControl type={"text"} icon={"id_card"} register={register} data={"lastname"}>
                                    Ingrese el apellido
                                </InputControl>
                                <DateControl icon={"cake"}>Seleccione la fecha de nacimiento</DateControl>
                                <ComboControl icon={"person"} children={"Seleccione un género"}
                                    options={[{ key: 1, value: "Masculino" }, { key: 2, value: "Femenino" }, { key: 3, value: "Otro" }]} />
                            </> :
                            step == 1 ?
                                <>
                                    <ComboControl icon={"id_card"} children={"Seleccione el tipo de documento"}
                                        options={[{ key: 1, value: "DNI" }, { key: 2, value: "Pasaporte" }]} />
                                    <InputControl type={"text"} icon={"id_card"}>Ingrese el N° de documento</InputControl>
                                    <ComboControl icon={"flag"} options={[{ key: 1, value: "Argentina" }, { key: 2, value: "Chile" }, { key: 3, value: "Perú" }, { key: 4, value: "Bolivia" }, { key: 5, value: "Paraguay" }, { key: 6, value: "Uruguay" }, { key: 7, value: "Brasil" }, { key: 8, value: "Ecuador" }, { key: 9, value: "Colombia" }, { key: 10, value: "Venezuela" }]} children={"Seleccione país de origen"} setOption={setProvinceName} />
                                    <ComboControl icon={"flag_2"} options={provinces[provinceName]} children={"Seleccione provincia de origen"} />
                                </> :
                                step == 2 ?
                                    <>
                                        <ComboControl icon={"domain"} options={[{ key: 1, value: "Calamuchita" }, { key: 2, value: "Capital" }, { key: 3, value: "Colón" }, { key: 4, value: "Cruz del Eje" }, { key: 5, value: "General Roca" }, { key: 6, value: "General San Martín" }, { key: 7, value: "Ischilín" }, { key: 8, value: "Juárez Celman" }, { key: 9, value: "Marcos Juárez" }, { key: 10, value: "Minas" }, { key: 11, value: "Pocho" }, { key: 12, value: "Presidente Roque Sáenz Peña" }, { key: 13, value: "Punilla" }, { key: 14, value: "Río Cuarto" }, { key: 15, value: "Río Primero" }, { key: 16, value: "Río Seco" }, { key: 17, value: "Río Segundo" }, { key: 18, value: "San Alberto" }, { key: 19, value: "San Javier" }, { key: 20, value: "San Justo" }, { key: 21, value: "Santa María" }, { key: 22, value: "Sobremonte" }, { key: 23, value: "Tercero Arriba" }, { key: 24, value: "Totoral" }, { key: 25, value: "Tulumba" }, { key: 26, value: "Unión" }]} children={"Seleccione departamento de Córdoba donde reside"} />
                                        <InputControl type={"text"} icon={"pin_drop"}>Domicilio donde reside:</InputControl>
                                        <InputControl type={"tel"} icon={"phone"}>Ingrese el número de celular:</InputControl>
                                        <InputControl type={"email"} icon={"email"}>Ingrese el email:</InputControl>
                                    </>
                                    : step == 3 ?
                                        <>
                                            <InputControl type={"textarea"} icon={"visibility"}>Observaciones</InputControl>
                                            <button type="button" className="add-button"
                                                onClick={() => setModal(false)}>
                                                <span className="material-symbols-outlined">save</span>
                                                {typeModal != 1 ? "Actualizar estudiante" : "Crear estudiante"}
                                            </button>
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