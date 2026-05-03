import React, { useEffect, useState } from "react";
import { Footer } from "../../components/Footer";
import { Table } from "../../components/Table";
import { InputControl } from "../../components/InputControl";
import { Sidebar } from "../../components/Sidebar";
import { DegreesModal } from "../modals/DegreesModal";
import { TeacherModal } from "./TeacherModal";
import { DocsModal } from "../modals/DocsModal";
import { ContactModal } from "../modals/ContactModal";
import { UbicationModal } from "../modals/UbicationModal";
import { ObservationModal } from "../modals/ObservationModal";
import "../../styles/pages/teachers/Teachers.css";
import { SubjectsAssignationsModal } from "./SubjectsAssignationsModal";

export const Teachers = () => {

  const [modal, setModal] = useState(false);
  const [typeModal, setTypeModal] = useState();

  useEffect(() => {
    document.title = "ISPT - Gestión de docentes";
  }, []);

  return (
    <article className="teachersPage">
      {modal ? <div className="modalBackground">{typeModal}</div> : <></>}
      <Sidebar />
      <div className="teachersPageContainer">
        <div className="controls">
          <InputControl icon={"search"} type={"search"}></InputControl>
          <button type="button" className="add-button-teacher"
            onClick={() => { setTypeModal(<TeacherModal setModal={setModal} typeModal={1} />); setModal(true); }}>
            <span className="material-symbols-outlined">add_circle</span>Añadir docente
          </button>
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
              { value: "eye", onclick: () => { setTypeModal(<TeacherModal setModal={setModal} typeModal={2} />); setModal(true); } },
              { value: "docs", onclick: () => { setTypeModal(<DocsModal setModal={setModal} typeDoc={"teacher"} />); setModal(true); } },
              { value: "degrees", onclick: () => { setTypeModal(<DegreesModal setModal={setModal} />); setModal(true); } },
              { value: "subjectsTeacher", onclick: () => { setTypeModal(<SubjectsAssignationsModal setModal={setModal} typeModal={3} />); setModal(true); } },
              { value: "contact", onclick: () => { setTypeModal(<ContactModal setModal={setModal} />); setModal(true); } },
              { value: "observation", onclick: () => { setTypeModal(<ObservationModal setModal={setModal} />); setModal(true); } },
              { value: "edit", onclick: () => { setTypeModal(<TeacherModal setModal={setModal} typeModal={3} />); setModal(true); } },
              "delete"]}
            data={[
              {
                dni: 12345679,
                apellido: "Álvarez",
                nombre: "Enrique"
              }
            ]} />
        </div>
        <Footer></Footer>
      </div>
    </article>
  );
}