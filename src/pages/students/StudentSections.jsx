import React from 'react'
import '../../styles/pages/students/StudentSections.css';
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { PathInfo } from '../../components/PathInfo';

export const StudentSections = () => {

    const navigate = useNavigate();

    return (
        <article className='studentSectionsPage'>
            <Sidebar />
            <div className='studentSectionsPageContainer'>
                <PathInfo />
                <div className="controls">
                    <InputControl icon={"search"} type={"search"}></InputControl>
                </div>
                <Table
                    columns={[
                        {
                            name: "Espacio curricular",
                            width: 120
                        },
                        {
                            name: "División",
                            width: 120
                        },
                        {
                            name: "Año lectivo",
                            width: 120
                        },
                        {
                            name: "Estado",
                            width: 120
                        }
                    ]}
                    options={[
                        { value: "eye", onclick: () => { } }
                    ]}
                    data={[
                        {
                            espacioCurricular: "Matemática I",
                            division: "A",
                            anioLectivo: "2026",
                            estado: "Regular"
                        },
                        {
                            espacioCurricular: "Lengua",
                            division: "A",
                            anioLectivo: "2026",
                            estado: "Libre"
                        }
                    ]}
                />
                <Footer />
            </div>
        </article>
    )
}