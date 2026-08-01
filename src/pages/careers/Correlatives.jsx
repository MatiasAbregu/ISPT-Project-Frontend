import React, { useContext, useEffect, useState } from 'react'
import { Table } from '../../components/Table'
import { Footer } from '../../components/Footer'
import { Sidebar } from '../../components/Sidebar';
import { PathInfo } from '../../components/PathInfo';
import { InputControl } from '../../components/InputControl';
import { ComboControl } from '../../components/ComboControl';
import { SubjectModal } from './SubjectModal';
import { UserContext } from '../../context/UserProvider';
import SubjectsService from '../../services/careers/SubjectsService';
import { useParams } from 'react-router';
import CorrelativesService from '../../services/careers/CorrelativeService';

import '../../styles/pages/careers/Correlatives.css';
import toast from 'react-hot-toast';

export const Correlatives = () => {

  const [modal, setModal] = useState(false);
  const [typeModal, setTypeModal] = useState();
  const { user } = useContext(UserContext);
  const { idCurriculum } = useParams();
  const { idSubject } = useParams();
  const [data, setData] = useState([]);
  const [pendingChanges, setPendingChanges] = useState([]);

  useEffect(() => {
    document.title = "ISPT - Gestión de correlativas de plan de estudio";
    getPossibleCorrelatives();
  }, []);


  const getPossibleCorrelatives = async () => {
    try {
      const res = await SubjectsService.getPossibleCorrelatives(idCurriculum, idSubject);
      if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
        setData(res.data.object);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const backendResponse = error.response.data;
        toast.error(backendResponse.message);
      } else {
        toast.error("No se pudo conectar con el servidor.");
      }
    }
  }

  const tableData = data.map(({ isCorrelative, ...rest }) => ({
    ...rest,
    c: {
      c: "¿Correlativa?",
      check: isCorrelative
    }
  }));

  const saveChanges = async () => {
    if (pendingChanges.length === 0)
      return;

    try {
      const res = await CorrelativesService.saveChanges(idSubject, pendingChanges);
      if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
        toast.success(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const backendResponse = error.response.data;
        toast.error(backendResponse.message);
      } else {
        toast.error("No se pudo conectar con el servidor.");
      }
    }

    setPendingChanges([]);
    getPossibleCorrelatives();
  }

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
            user?.roles.includes("Directivo") ?
              <button type="button" className="add-button"
                onClick={() => { saveChanges() }}>
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
            }
          ]}
          showId={false}
          checkboxs={true}
          data={tableData}
          onCheckboxChange={(row, checked) => {
            setData(prev => prev.map(item =>
              item.id === row.id
                ? { ...item, isCorrelative: checked }
                : item
            ));

            setPendingChanges(prev => {
              const exists = prev.find(x => x.subjectCorrelativeId == row.id);

              if (exists) {
                return prev.map(x =>
                  x.subjectCorrelativeId === row.id
                    ? { ...x, isCorrelative: checked, createdById: user.id || user.ID }
                    : x
                )
              }

              return [...prev, { subjectCorrelativeId: row.id, isCorrelative: checked, createdById: user.id || user.ID }];
            })

          }}
        />
        <Footer />
      </div>
    </article >
  )
}