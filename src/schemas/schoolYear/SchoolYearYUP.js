import * as Yup from 'yup';

export default Yup.object().shape({
    Id: Yup.number().optional(),
    createdById: Yup.string().nullable(),
    CurriculumYear1: Yup.number().required('El ID del plan de estudios del año 1 es requerido'),
    CurriculumYear2: Yup.number().required('El ID del plan de estudios del año 2 es requerido'),
    CurriculumYear3: Yup.number().required('El ID del plan de estudios del año 3 es requerido'),
    SchoolYearNumber: Yup.number().required('El número de año escolar es requerido')
})