import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Table } from "../components/Table";
import { InputControl } from "../components/InputControl";
import "../styles/pages/Teachers.css";
import { Sidebar } from "../components/Sidebar";

export const Teachers = () => {
  useEffect(() => {
    document.title = "ISPT - Gestión de docentes";
  }, []);

  return (
    <article className="teachersPage">
      <Sidebar />
      <div className="teachersPageContainer">
      <div className="controls">
        <InputControl icon={"search"} type={"search"}></InputControl>
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
              name: "Fecha de nacimiento",
              width: 200
            },
            {
              name: "Edad",
              width: 80
            },
          ]} options={["eye","ubication","contact", "edit", "delete"]}
          data={[
            {
              dni: 12345678,
              nombre: "Matias",
              apellido: "Abregu",
              genero: "Masculino",
              fecha_nacimiento: "01/01/1990",
              edad: 34,
            }
          ]} />
      </div>
      <Footer></Footer>
      </div>
    </article>
  );
}