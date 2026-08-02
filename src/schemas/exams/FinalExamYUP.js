import * as Yup from 'yup';

export default Yup.object().shape({
    Id: Yup.number().optional(),
    createdById: Yup.string().nullable(),
    SubjectId: Yup.number().required('El ID de la materia es requerido'),
    PersonId: Yup.number().required('El ID del profesor es requerido'),
    Date: Yup.date().required('La fecha es requerida'),
    Time: Yup.string().required('La hora es requerida'),
    RecordBook: Yup.number().nullable(),
    PageNumber: Yup.number().nullable()
})