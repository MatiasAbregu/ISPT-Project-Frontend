import React, { useEffect, useState } from 'react';
import '../../styles/pages/students/StudentSections.css';
import { InputControl } from '../../components/InputControl';
import { Table } from '../../components/Table';
import { Footer } from '../../components/Footer';
import { Sidebar } from '../../components/Sidebar';
import { PathInfo } from '../../components/PathInfo';
import { useParams } from 'react-router-dom';
import StudentService from '../../services/students/StudentService';
import toast from 'react-hot-toast';

const statusLabels = {
    SinCursar: 'Sin cursar',
    Regular: 'Regular',
    Aprobado: 'Aprobado',
    Libre: 'Libre',
    Recursando: 'Recursando'
};

const getRisk = (average, attendance) => {
    if (average == null && attendance == null) return 'Sin datos';
    if ((attendance != null && attendance < 75) || (average != null && average < 4)) return 'Alto';
    if ((attendance != null && attendance < 85) || (average != null && average < 6)) return 'Medio';
    return 'Bajo';
};

export const StudentSections = () => {
    const { id: fileId } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        document.title = 'ISPT - Espacios curriculares del legajo';
        let active = true;

        const loadCourses = async () => {
            try {
                const response = await StudentService.getCoursesByFileId(fileId);
                const rows = response.data?.object ?? [];
                if (active) {
                    setData(rows.map(row => {
                        const average = row.average ?? row.Average;
                        const attendance = row.attendancePercentage ?? row.AttendancePercentage;
                        return {
                            espacioCurricular: row.subject ?? row.Subject,
                            division: row.division ?? row.Division,
                            anioLectivo: row.schoolYear ?? row.SchoolYear,
                            estado: statusLabels[row.status ?? row.Status] ?? (row.status ?? row.Status ?? 'Sin datos'),
                            riesgo: getRisk(average, attendance)
                        };
                    }));
                }
            } catch (error) {
                if (active) {
                    setData([]);
                    toast.error(error.response?.data?.message || 'No se pudieron cargar los espacios curriculares del legajo.');
                }
            }
        };

        if (fileId) loadCourses();
        return () => { active = false; };
    }, [fileId]);

    return (
        <article className='studentSectionsPage'>
            <Sidebar />
            <div className='studentSectionsPageContainer'>
                <PathInfo />
                <div className="controls">
                    <InputControl icon="search" type="search" />
                </div>
                <Table
                    columns={[
                        { name: 'Espacio curricular', width: 180 },
                        { name: 'División', width: 120 },
                        { name: 'Año lectivo', width: 120 },
                        { name: 'Estado', width: 120 },
                        { name: 'Riesgo', width: 120 }
                    ]}
                    data={data}
                />
                <Footer />
            </div>
        </article>
    );
};
