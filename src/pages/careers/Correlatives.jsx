import React, { useContext, useEffect, useState } from 'react'
import { Table } from '../../components/Table'
import { Footer } from '../../components/Footer'
import { Sidebar } from '../../components/Sidebar';
import { PathInfo } from '../../components/PathInfo';
import { InputControl } from '../../components/InputControl';
import { ComboControl } from '../../components/ComboControl';

import '../../styles/pages/careers/Correlatives.css';
import { SubjectModal } from './SubjectModal';
import { UserContext } from '../../context/UserProvider';

export const Correlatives = () => {

  const [modal, setModal] = useState(false);
  const [typeModal, setTypeModal] = useState();
  const { user } = useContext(UserContext);

  useEffect(() => {
    document.title = "ISPT - Gestión de correlativas de plan de estudio";
  }, []);

  return (
    <article className='correlativesPage'>
      <Sidebar />
      {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
      <div className='correlativesPageContainer'>
        <PathInfo />
        <div className="controls">
          <InputControl icon={"search"} type={"search"}></InputControl>
          <h4>Espacio curricular: Matemáticas I</h4>
          {
            user.role == "Directivo" ?
              <button type="button" className="add-button"
                onClick={() => { }}>
                <span className="material-symbols-outlined">save</span>Guardar cambios
              </button> : undefined
          }
        </div>
        <div className='controls2'>
          <ComboControl icon={"today"} notShowLabel={true}
            options={[{ key: 1, value: "1° año" }, { key: 2, value: "2° año" }, { key: 3, value: "3° año" }]}>
            Año del plan
          </ComboControl>
        </div>
        <Table columns={[
          { name: "Código", width: 120 },
          { name: "Nombre", width: 150 },
          { name: "Formato", width: 150 },
          { name: "Correlativa", width: 100 }]}
          options={[
            {
              value: "eye", onclick: () => {
                setTypeModal(<SubjectModal typeModal={2} setModal={setModal} />);
                setModal(true);
              }
            },
            "teacher2"
          ]}
          checkboxs={true}
          data={[
            { codigo: "MAT-02", name: "Matématicas II", format: "Asignatura", c: { c: "¿Correlativa?", check: true } },
            { codigo: "PD-01", name: "Pedagogía", format: "Seminario", c: { c: "¿Correlativa?", check: true } }
          ]}
        />
        <Footer />
      </div>
    </article >
  )
}