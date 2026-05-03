import React, { useEffect, useState } from 'react'
import '../../styles/pages/teachers/SubjectsAssignationsModal.css'
import { InputControl } from '../../components/InputControl'

export const SubjectsAssignationsModal = ({ setModal }) => {

    const [subjects, setSubjects] = useState([
        { career: "Profesorado", subject: "Matemática I", al: "2026" },
        { career: "Profesorado", subject: "Matemática II", al: "2026" }
    ]);

    return (
        <article className="subjectAssignationModal">
            <span class="material-symbols-outlined close" onClick={() => setModal(false)}>cancel</span>
            <h4>Espacios curriculares dónde dicta clases el docente</h4>
            <div className="subjectAssignationFormContainer">
                <form>
                    <div className='badge-container'>
                        {subjects && subjects.length > 0 ?
                            subjects.map((v, k) => {
                                return (
                                    <div className='cardSA' key={k}>
                                        <span class="material-symbols-outlined icon">signature</span>
                                        <hr />
                                        <ul>
                                            <li><span className='underline'>Carrera</span>: {v.career}</li>
                                            <li><span className='underline'>Espacio curricular</span>: {v.subject}</li>
                                            <li><span className='underline'>Año lectivo</span>: {v.al}</li>
                                        </ul>
                                    </div>);
                            })
                            : <p>Aún no hay títulos registrados a esta persona.</p>}
                    </div>
                </form>
            </div>
        </article>
    )
}