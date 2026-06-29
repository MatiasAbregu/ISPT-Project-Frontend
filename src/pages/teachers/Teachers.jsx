import React, { useContext, useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { Table } from "../../components/Table";
import { InputControl } from "../../components/InputControl";
import { Sidebar } from "../../components/Sidebar";
import { DegreesModal } from "../modals/DegreesModal";
import { TeacherModal } from "./TeacherModal";
import { ContactModal } from "../modals/ContactModal";
import { ObservationModal } from "../modals/ObservationModal";
import "../../styles/pages/teachers/Teachers.css";
import { SubjectsAssignationsModal } from "./SubjectsAssignationsModal";
import TeacherService from "../../services/teachers/TeacherService";
import { AddExistentPersonModal } from "../modals/AddExistentPersonModal";

export const Teachers = () => {

  const [modal, setModal] = useState(false);
  const [typeModal, setTypeModal] = useState();
  const [showCreateOptions, setShowCreateOptions] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    document.title = "ISPT - Gestión de docentes";
    getAllTeachers();
  }, []);

  const getAllTeachers = async () => {
    try {
      const res = await TeacherService.getAllTeachers();

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

  return (
    <article className="teachersPage">
      {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
      <Sidebar />
      <div className="teachersPageContainer">
        <div className="controls">
          <InputControl icon={"search"} type={"search"}></InputControl>
          <div className="createControl">
            <button className="add-button-teacher" onClick={() => setShowCreateOptions(prev => !prev)}>
              <span className="material-symbols-outlined">add_circle</span>Añadir docente
            </button>
            <div className={`btn-select ${showCreateOptions ? "show" : ""}`}>
              <button type="button"
                onClick={() => {
                  setTypeModal(<TeacherModal setModal={setModal} typeModal={1} getAllTeachers={getAllTeachers} />);
                  setModal(true);
                  setShowCreateOptions(false);
                }}>
                Añadir nueva persona al sistema
              </button>
              <button type="button"
                onClick={() => {
                  setTypeModal(<AddExistentPersonModal setModal={setModal} typeModal={"teacher"} getAll={getAllTeachers} />);
                  setModal(true);
                  setShowCreateOptions(false);
                }}>
                Añadir una persona existente a docentes
              </button>
            </div>
          </div>
        </div>
        <div className="tableContainer">
          <Table
            columns={[
              {
                name: "DNI",
                width: 120
              },
              {
                name: "Apellido",
                width: 130
              },
              {
                name: "Nombre",
                width: 130
              }
            ]} options={[
              {
                value: "eye", onclick: (obj) => {
                  setTypeModal(<TeacherModal setModal={setModal} typeModal={2} teacherId={obj.id} />);
                  setModal(true);
                }
              },
              {
                value: "edit", onclick: (obj) => {
                  setTypeModal(<TeacherModal setModal={setModal} typeModal={3} teacherId={obj.id} getAllTeachers={getAllTeachers} />);
                  setModal(true);
                }
              },
              {
                value: "degrees", onclick: (obj) => {
                  setTypeModal(<DegreesModal setModal={setModal} personId={obj.id} />);
                  setModal(true);
                }
              },
              {
                value: "subjectsTeacher", onclick: () => {
                  setTypeModal(<SubjectsAssignationsModal setModal={setModal} typeModal={3} />);
                  setModal(true);
                }
              },
              {
                value: "contact", onclick: (obj) => {
                  setTypeModal(<ContactModal setModal={setModal} personId={obj.id} />);
                  setModal(true);
                }
              },
              {
                value: "observation", onclick: (obj) => {
                  setTypeModal(<ObservationModal setModal={setModal} sendTo={"person"} requestId={obj.id} />);
                  setModal(true);
                }
              }
            ]}
            showId={false}
            data={data} />
        </div>
        <Footer></Footer>
      </div>
    </article>
  );
}