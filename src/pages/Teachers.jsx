import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Table } from "../components/Table";
import { InputControl } from "../components/InputControl";
import { Sidebar } from "../components/Sidebar";
import { DegreesModal } from "./modals/general/DegreesModal";
import { TeacherModal } from "./modals/teachers/TeacherModal";
import { DocsModal } from "./modals/general/DocsModal";
import { ContactModal } from "./modals/general/ContactModal";
import { UbicationModal } from "./modals/general/UbicationModal";
import { ObservationModal } from "./modals/general/ObservationModal";
import "../styles/pages/Teachers.css";

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
                name: "Nombre",
                width: 130
              },
              {
                name: "Apellido",
                width: 130
              },
              {
                name: "Género",
                width: 100
              },
              {
                name: "Edad",
                width: 80
              },
            ]} options={[
              { value: "eye", onclick: () => { setTypeModal(<TeacherModal setModal={setModal} typeModal={2} />); setModal(true); } },
              { value: "docs", onclick: () => { setTypeModal(<DocsModal setModal={setModal} typeDoc={"teacher"} />); setModal(true); } },
              { value: "degrees", onclick: () => { setTypeModal(<DegreesModal setModal={setModal} />); setModal(true); } },
              { value: "edit", onclick: () => { setTypeModal(<TeacherModal setModal={setModal} typeModal={3} />); setModal(true); } },
              { value: "contact", onclick: () => { setTypeModal(<ContactModal setModal={setModal} />); setModal(true); } },
              { value: "ubication", onclick: () => { setTypeModal(<UbicationModal setModal={setModal} />); setModal(true); } },
              { value: "observation", onclick: () => { setTypeModal(<ObservationModal setModal={setModal} />); setModal(true); } },
              "delete"]}
            data={[
              {
                dni: 12345679,
                nombre: "Enrique",
                apellido: "Álvarez",
                genero: "Masculino",
                edad: 34,
              }
            ]} />
        </div>
        <Footer></Footer>
      </div>
    </article>
  );
}