import React, { useEffect, useState } from 'react'
import '../styles/pages/Careers.css';
import { InputControl } from '../components/InputControl';
import { Table } from '../components/Table';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';

export const Careers = () => {

    useEffect(() => {
        document.title = "ISPT - Gestión de carreras";
    }, []);

    return (
        <article className='careersPage'>
            <Sidebar />
            <div className='careersPageContainer'>
            <div className="controls">
                <InputControl icon={"search"} type={"search"}></InputControl>
            </div>
            <Table
                columns={[
                    {
                        name: "Código",
                        width: 60
                    },
                    {
                        name: "Carrera",
                        width: 180
                    }]}
                options={["curriculum", "edit"]}
                data={[
                    {
                        codigo: "1",
                        carrera: "Profesorado"
                    },
                    {
                        codigo: "2",
                        carrera: "Trayecto"
                    }
                ]}
            />
            <Footer />
            </div>
        </article>
    )
}