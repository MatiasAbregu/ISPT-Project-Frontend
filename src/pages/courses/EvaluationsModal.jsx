import React, { useContext } from 'react'
import '../../styles/pages/courses/EvaluationsModal.css'
import { InputControl } from '../../components/InputControl'
import { DateControl } from '../../components/DateControl'
import { ComboControl } from '../../components/ComboControl'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'
import { UserContext } from '../../context/UserProvider'
import EvaluationsCourse from '../../services/courses/EvaluationsCourse'
import EvaluationYUP from '../../schemas/courses/EvaluationYUP'

export const EvaluationsModal = ({ setModal, divisionId, getAllEvaluations }) => {

    const { user } = useContext(UserContext);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        clearErrors,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(EvaluationYUP),
        defaultValues: {
            date: null,
            type: null,
            number: ""
        }
    });

    const onSubmit = async (formData) => {
        try {
            const payload = {
                createdById: user.id || user.ID,
                divisionId: Number(divisionId),
                date: formData.date,
                type: Number(formData.type),
                number: Number(formData.number)
            };

            const response = await EvaluationsCourse.createEvaluation(payload);
            if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
                toast.success(response.data.object || "¡Instancia evaluativa creada con éxito!");
                setModal(false);
                if (typeof getAllEvaluations === 'function') {
                    await getAllEvaluations();
                }
            }
        } catch (error) {
            console.error(error);
            if (error.response?.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error("No se pudo conectar con el servidor.");
            }
        }
    };

    return (
        <article className="evaluationsModal">
            <span className="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Agregar nueva instancia evaluativa</h4>
            <div className="evaluationsContainer">
                <form className="evaluationsForm" onSubmit={handleSubmit(onSubmit)}>
                    <DateControl
                        icon={"calendar_month"}
                        data={"date"}
                        setValue={setValue}
                        getValues={getValues}
                        clearErrors={clearErrors}
                        error={errors.date}
                    >
                        Seleccione la fecha *
                    </DateControl>

                    <ComboControl
                        icon={"quiz"}
                        data={"type"}
                        setValue={setValue}
                        getValues={getValues}
                        clearErrors={clearErrors}
                        error={errors.type}
                        returnKey={true}
                        options={[
                            { key: 1, value: "Práctico" },
                            { key: 2, value: "Parcial" },
                            { key: 4, value: "Recuperatorio" },
                            { key: 3, value: "Final" }
                        ]}
                    >
                        Ingrese el tipo *
                    </ComboControl>

                    <InputControl
                        type={"number"}
                        icon={"counter_1"}
                        data={"number"}
                        register={register}
                        error={errors.number}
                    >
                        Ingrese el número *
                    </InputControl>

                    <button type="submit" className="add-button">
                        <span className="material-symbols-outlined">save</span>
                        Crear instancia evaluativa
                    </button>
                </form>
            </div>
        </article>
    )
}