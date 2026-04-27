import React, { useEffect, useState } from 'react'
import { Sidebar } from '../../components/Sidebar'
import { InputControl } from '../../components/InputControl'
import { Table } from '../../components/Table'
import { Footer } from '../../components/Footer'
import { ContactModal } from '../modals/ContactModal'
import { ObservationModal } from '../modals/ObservationModal'
import { ChangeStatusModal } from './ChangeStatusModal'
import '../../styles/pages/students-in-danger/StudentsInDanger.css'

export const StudentsInDanger = () => {

    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();

    useEffect(() => {
        document.title = "ISPT - Alumnos en riesgo";
    }, []);

    return (
        <article className='studentsInDangerPage'>
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
            <div className="studentsInDangerPageContainer">
                <div className='controls'>
                    <InputControl icon={"search"} type={"search"}></InputControl>
                </div>
                <Table columns={[
                    { name: "DNI", width: 80 },
                    { name: "Estudiante", width: 130 },
                    { name: "Espacio curricular", width: 120 },
                    { name: "Riesgo", width: 80 },
                    { name: "Causa/s", width: 80 },
                    { name: "Estado", width: 80 }]}
                    options={[
                        { value: "contact", onclick: () => { setTypeModal(<ContactModal setModal={setModal} />); setModal(true); } },
                        { value: "observation", onclick: () => { setTypeModal(<ObservationModal setModal={setModal} />); setModal(true); } },
                        { value: "change_status_student_in_danger", onclick: () => { setTypeModal(<ChangeStatusModal setModal={setModal} />); setModal(true); } }
                    ]}
                    // POR AVISAR, AVISADO, JUSTIFICADO
                    data={[
                        {
                            dni: 12345671, name: "Felipe Ferreyra", status: "Matemática I", fi: "Alto",
                            r: "80% de faltas y 2 parciales desaprobados", e: "Por avisar"
                        },
                        {
                            dni: 12345672, name: "Juan Lopez", format: "Inglés", fi: "Medio",
                            r: "40% de faltas y 1 parcial desaprobado", e: "Avisado"
                        },
                    ]}
                />
                <Footer />
            </div>
        </article >
    )
}