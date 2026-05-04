import React, { useContext, useEffect, useState } from 'react'
import '../../styles/pages/careers/Curriculum.css';
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import { CurriculumModal } from './CurriculumModal';
import { PathInfo } from '../../components/PathInfo';
import { UserContext } from '../../context/UserProvider';

export const Curriculum = () => {

  const [modal, setModal] = useState(false);
  const [typeModal, setTypeModal] = useState();
  const { user } = useContext(UserContext);

  useEffect(() => {
    document.title = "ISPT - Gestión de plan de estudio";
  }, []);

  return (
    <article className='curriculumPage'>
      <Sidebar />
      {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
      <div className="curriculumPageContainer">
        <PathInfo />
        <div className="controls">
          <InputControl icon={"search"} type={"search"}></InputControl>
          {
            user.role == "Directivo" ?
              <button type="button" className="add-button"
                onClick={() => { setTypeModal(<CurriculumModal setModal={setModal} />); setModal(true); }}>
                <span className="material-symbols-outlined">add_circle</span>Añadir plan de estudio
              </button> : undefined
          }
        </div>
        <Table
          columns={[{
            name: "Resolución",
            width: 100
          },
          {
            name: "Duración",
            width: 100
          },
          {
            name: "Fecha de lanzamiento",
            width: 110
          },
          {
            name: "Fecha en qué entro en vigencia",
            width: 100
          },
          {
            name: "Fecha dónde terminó",
            width: 110
          }
          ]}
          options={user.role == "Directivo" ?
            ["academicYear",
              { value: "edit", onclick: () => { setTypeModal(<CurriculumModal setModal={setModal} />); setModal(true); } }]
            : ["academicYear"]
          }
          data={[
            {
              resolucion: "EE/11",
              duracion: "3 años",
              dateStart: "01/03/2011",
              dateOk: "04/04/2011",
              dateEnd: "31/12/2020"
            },
            {
              resolucion: "EE/2025",
              duracion: "2 años",
              dateStart: "01/02/2025",
              dateOk: "03/02/2025",
              dateEnd: "----"
            }
          ]}
        />
        <Footer />
      </div>
    </article>
  )
}