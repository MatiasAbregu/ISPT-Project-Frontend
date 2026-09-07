import React, { useContext, useEffect, useState } from 'react'
import { InputControl } from '../../components/InputControl'
import { yupResolver } from '@hookform/resolvers/yup';
import { get, useForm } from 'react-hook-form';
import { Table } from '../../components/Table';
import { ComboControl } from '../../components/ComboControl';
import DocsYUP from "../../schemas/students/DocsYUP";
import DocsService from '../../services/students/DocsService';
import toast from 'react-hot-toast';

import '../../styles/pages/modals/DocsModal.css'
import { UserContext } from '../../context/UserProvider';

export const DocsModal = ({ setModal, fileId }) => {
    const { register, setValue, watch, handleSubmit, reset, getValues } = useForm({
        resolver: yupResolver(DocsYUP),
        defaultValues: {
            fileId: fileId
        }
    });
    const [docsPerYear, setDocsPerYear] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const { user } = useContext(UserContext);

    useEffect(() => {
        getDocumentsByFileId(fileId);
    }, [fileId]);

    // HTTP PETITION
    const getDocumentsByFileId = async (fileId) => {
        try {
            const res = await DocsService.getAllDocumentsByFileId(fileId);

            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                const data = res.data.object;
                reset({
                    fileId: data.fileId,
                    dni: data.dni,
                    picture: data.picture,
                    birthdateDocument: data.birthdateDocument
                });
                setDocsPerYear(reorderRows(data.rows));
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

    const reloadDocumentsDeliverableByYear = async () => {
        try {
            const res = await DocsService.reloadDocumentsDeliverableByYear(fileId);

            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                const data = res.data.object;
                setDocsPerYear(reorderRows(data));
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

    const saveFileDocuments = async (data) => {
        try {
            const rows = docsPerYear.map(row => ({
                id: row.id,
                fileId: fileId,
                updatedById: user.id || user.ID,
                cus: row.cus.check,
                cnirds: row.cds.check,
                cda: row.cda.check,
                cooperative: row.co.check,
                date: parseInt(row.year, 10)
            }));

            const finalData = {
                fileId: fileId,
                dni: data.dni,
                picture: data.picture,
                birthdateDocument: data.birthdateDocument,
                updatedById: user.id || user.ID,
                rows: rows
            };

            const res = await DocsService.changeDocumentsStatus(finalData);

            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                toast.success(res.data.object);
                await getDocumentsByFileId(fileId);
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

    const addYearInDeliverableDocumentsPerYear = async () => {
        try {
            const res = await DocsService.addYearInDeliverableDocumentsPerYear({
                fileId: fileId,
                year: selectedYear,
                createdById: user.id || user.ID,
            });

            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                toast.success(res.data.object);
                await reloadDocumentsDeliverableByYear();
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

    const deleteYearInDeliverableDocumentsPerYear = async (id) => {
        try {
            const res = await DocsService.deleteYearInDeliverableDocumentsPerYear(id);

            if (res.data.statusCode >= 200 && res.data.statusCode < 300) {
                toast.success(res.data.object);
                await reloadDocumentsDeliverableByYear();
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
    //

    const getAllYears = () => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: currentYear - 1960 + 1 }, (_, i) => { return { key: currentYear - i, value: currentYear - i } });
    }

    const reorderRows = (data) => {
        return data.map(item => ({
            id: item.id,
            year: item.date.toString(),
            cus: {
                cus: item.cus ? "Entregado" : "Pendiente",
                check: item.cus
            },
            cds: {
                cds: item.cnirds ? "Entregado" : "Pendiente",
                check: item.cnirds
            },
            cda: {
                cda: item.cda ? "Entregado" : "Pendiente",
                check: item.cda
            },
            co: {
                co: item.cooperative ? "Pagada" : "No pagada",
                check: item.cooperative
            }
        }));
    }

    const handleCheckboxChange = (row, columnKey, checked) => {
        const labels = {
            cus: checked ? "Entregado" : "Pendiente",
            cds: checked ? "Entregado" : "Pendiente",
            cda: checked ? "Entregado" : "Pendiente",
            co: checked ? "Pagada" : "No pagada"
        };

        setDocsPerYear(prevDocs =>
            prevDocs.map(item => {
                if (item.id === row.id) {
                    return {
                        ...item,
                        [columnKey]: {
                            [columnKey]: labels[columnKey],
                            check: checked
                        }
                    };
                }
                return item;
            })
        );
    };

    return (
        <form className='docsModal' onSubmit={handleSubmit(saveFileDocuments, e => console.log(e))}>
            <span className="material-symbols-outlined back" onClick={() => setModal(false)}>arrow_back</span>
            <div className='docsOnlyOnce'>
                <label className='titleDocs'>Entregables una vez</label>
                <div className='docs'>
                    <InputControl type={"checkbox"} setValue={setValue} data={"dni"} register={register} watch={watch}>
                        Documento de Identidad Nacional
                    </InputControl>
                    <InputControl type={"checkbox"} setValue={setValue} data={"picture"} register={register} watch={watch}>
                        Foto
                    </InputControl>
                    <InputControl type={"checkbox"} setValue={setValue} data={"birthdateDocument"} register={register}
                        watch={watch}>
                        Acta de nacimiento
                    </InputControl>
                </div>
            </div>
            <div className='docsPerYear'>
                <div className='deliverablePerYearTitleBox'>
                    <label className='titleDocs'>Entregables anualmente</label>
                    <div className='deliverablePerYearBtns'>
                        <button type='button' className='add-button' onClick={async () => {
                            await addYearInDeliverableDocumentsPerYear();
                        }}>
                            <span className="material-symbols-outlined">add_circle</span>Añadir año
                        </button>
                        <div className='deliverableYearAdd'>
                            <p>Año a añadir</p>
                            <ComboControl options={getAllYears()} setOption={setSelectedYear} value={selectedYear} />
                        </div>
                    </div>
                </div>
                <div className='tableOverflow'>
                    <Table columns={[
                        { name: "Año", width: 100 },
                        { name: "Certificado Único de Salud", width: 150 },
                        { name: "Certificado de no inscripción en el registro de delitos sexuales", width: 150 },
                        { name: "Certificado de Antecedentes", width: 125 },
                        { name: "Pago de cooperadora", width: 100 }]}
                        checkboxs={true}
                        showId={false}
                        options={[{
                            value: "delete", onclick: async (obj) => {
                                await deleteYearInDeliverableDocumentsPerYear(obj.id);
                            }
                        }]}
                        onCheckboxChange={(row, columnKey, checked) => handleCheckboxChange(row, columnKey, checked)}
                        data={docsPerYear} />
                </div>
            </div>
            <button type="submit" className="add-button">
                <span className="material-symbols-outlined">save</span> Guardar cambios
            </button>
        </form>
    )
}