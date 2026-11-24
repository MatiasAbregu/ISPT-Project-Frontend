import React, { useContext, useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import { UserContext } from '../../context/UserProvider';
import { IEFIModal } from './IEFIModal';
import '../../styles/pages/exams/ExamDates.css';
import IEFIService from '../../services/exams/IEFIService';
import toast from 'react-hot-toast';

export const IEFIs = () => {
    const [modal, setModal] = useState(false);
    const [typeModal, setTypeModal] = useState();
    const { user } = useContext(UserContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        document.title = "ISPT - IEFI";
        getAllIEFIs();
    }, []);

    const getAllIEFIs = async () => {
        try {
            const response = await IEFIService.getAll();
            if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
                setData(response.data.object ?? []);
            }
        } catch (error) {
            if (error.response?.data) toast.error(error.response.data.message);
            else toast.error("No se pudo conectar con el servidor.");
        }
    };

    const deleteIEFI = async (id) => {
        try {
            const response = await IEFIService.deleteIEFI(id);
            if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
                toast.success(response.data.object);
                await getAllIEFIs();
            }
        } catch (error) {
            if (error.response?.data) toast.error(error.response.data.message);
            else toast.error("No se pudo conectar con el servidor.");
        }
    };

    const openModal = (props = {}) => {
        setTypeModal(<IEFIModal {...props} setModal={setModal} getAll={getAllIEFIs} />);
        setModal(true);
    };

    const privileged = user.roles.includes("Directivo") || user.roles.includes("Preceptor");

    return (
        <article className="examDatesPage">
            <Sidebar />
            {modal ? <div className="modalBackground">{typeModal}</div> : null}
            <div className="examDatesPageContainer">
                <div className="controls">
                    <InputControl icon="search" type="search" />
                    {user.roles.includes("Directivo") && <button type="button" className="add-button" onClick={() => openModal()}>
                        <span className="material-symbols-outlined">add_circle</span>Añadir IEFI
                    </button>}
                </div>
                <Table
                    columns={[
                        { name: "Espacio curricular", width: 160 },
                        { name: "Fecha", width: 160 },
                        { name: "Hora", width: 160 },
                        { name: "Libro", width: 160 },
                        { name: "Folio", width: 160 }
                    ]}
                    options={privileged ? [
                        { value: "eye", onclick: obj => openModal({ readOnly: true, iefiId: obj.id }) },
                        { value: "edit", onclick: obj => openModal({ iefiId: obj.id }) },
                        { value: "delete", onclick: obj => deleteIEFI(obj.id) }
                    ] : [
                        { value: "eye", onclick: obj => openModal({ readOnly: true, iefiId: obj.id }) }
                    ]}
                    showId={false}
                    data={data}
                />
                <Footer />
            </div>
        </article>
    );
};
