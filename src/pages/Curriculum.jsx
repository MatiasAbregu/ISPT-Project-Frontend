import React, { useEffect, useState } from 'react'
import '../styles/pages/Curriculum.css';
import { InputControl } from '../components/InputControl';
import { Table } from '../components/Table';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';

export const Curriculum = () => {

  useEffect(() => {
    document.title = "ISPT - Gestión de plan de estudio";
  }, []);

  return (
    <article className='curriculumPage'>
      <Sidebar />
      <div className="curriculumPageContainer">
      <div className="controls">
        <InputControl icon={"search"} type={"search"}></InputControl>
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
        options={["subjects", "correlatives", "edit"]}
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