import React, { useContext, useEffect, useState } from 'react'
import '../../styles/pages/careers/Curriculum.css';
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import { CurriculumModal } from './CurriculumModal';
import { PathInfo } from '../../components/PathInfo';
import { UserContext } from '../../context/UserProvider';
import CurriculumService from '../../services/careers/curriculum';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

export const Curriculum = () => {

  const [modal, setModal] = useState(false);
  const [typeModal, setTypeModal] = useState();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    document.title = "ISPT - Gestión de plan de estudio";
    getAllCurriculums();
  }, []);

  const getAllCurriculums = async () => {
          const response = await CurriculumService.getByCareerId(id);
          setData(response.data);
      }


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
                onClick={() => { setTypeModal(<CurriculumModal setModal={setModal} typeModal="add" getByCareerId={getAllCurriculums} careerId={id}/>); setModal(true); }}>
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
            [{value: "academicYear", onclick: (obj) => navigate(`/carreras/${id}/plan-de-estudio/${obj.id}/espacios-curriculares`)},
              { value: "edit", onclick: (obj) => { setTypeModal(<CurriculumModal setModal={setModal} typeModal="edit" getByCareerId={getAllCurriculums} curriculumId={obj.id} />); setModal(true); } }]
            : ["academicYear"]
          }
          showId={false}
            data={data}
        />
        <Footer />
      </div>
    </article>
  )
}