import React, { useEffect, useState } from 'react'
import '../styles/pages/Curriculum.css';
import { InputControl } from '../components/InputControl';
import { Table } from '../components/Table';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import { CurriculumModal } from './modals/careers/CurriculumModal';

export const Curriculum = () => {

  const [modal, setModal] = useState(false);
  const [typeModal, setTypeModal] = useState();

  useEffect(() => {
    document.title = "ISPT - Gestión de plan de estudio";
  }, []);

  return (
    <article className='curriculumPage'>
      <Sidebar />
      {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
      <div className="curriculumPageContainer">
        <div className="controls">
          <InputControl icon={"search"} type={"search"}></InputControl>
          <button type="button" className="add-button"
            onClick={() => { setTypeModal(<CurriculumModal setModal={setModal} />); setModal(true); }}>
            <span className="material-symbols-outlined">add_circle</span>Añadir plan de estudio
          </button>
        </div>
        <Table
          columns={[{
            name: "Resolución",
            width: 100
          },
          {
            name: "Duración",
            width: 100
          }
          ]}
          options={["subjects",
            { value: "edit", onclick: () => { setTypeModal(<CurriculumModal setModal={setModal} />); setModal(true); } }]}
          data={[
            {
              resolucion: "EE/11",
              duracion: "3 años"
            },
            {
              resolucion: "EE/2025",
              duracion: "2 años"
            }
          ]}
        />
        <Footer />
      </div>
    </article>
  )
}