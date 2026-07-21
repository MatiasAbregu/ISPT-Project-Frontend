import * as Yup from 'yup';

export default Yup.object().shape({
    Id: Yup.number().optional(),
    createdById: Yup.string().nullable(),
    CurriculumId: Yup.number().required('El ID del plan de estudios es requerido'),
    SchoolYearNumber: Yup.number().required('El número de año escolar es requerido')
})