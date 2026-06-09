import React from 'react'
import { InputControl } from '../../components/InputControl'
import '../../styles/pages/students/AddPersonStudentModal.css'

export const AddPersonInStudenModal = ({ setModal }) => {
    return (
        <article className="addPersonStudentModal">
            <span class="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Agregar una persona existente a estudiantes</h4>
            <div className="addPersonStudentModalContainer">
                <p className='legend'>(Esta ventana solo es para agregar a un estudiante a partir del CUIL de una persona ya registrada <br /> en el sistema, ya sea en el apartado de cargos o docentes)</p>
                <form>
                    <InputControl type={"text"} icon={"person"} key={1}>
                        Ingrese el CUIL de la persona
                    </InputControl>
                    <button type="button" className="add-button"
                        onClick={() => setModal(false)}>
                        <span className="material-symbols-outlined">save</span>
                        Agregar persona a la tabla estudiantes
                    </button>
                </form>
            </div>
        </article>
    )
}