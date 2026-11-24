import * as Yup from 'yup';

const optionalNumber = Yup.number()
    .nullable()
    .notRequired()
    .transform((value, originalValue) => (
        originalValue === '' || originalValue === undefined || Number.isNaN(value) ? null : value
    ));

export default Yup.object().shape({
    Id: Yup.number().optional(),
    CreatedById: Yup.string().nullable(),
    UpdatedById: Yup.string().nullable(),
    SubjectId: Yup.number().required('El ID del espacio curricular es requerido'),
    Date: Yup.date().required('La fecha es requerida'),
    Time: Yup.string().required('La hora es requerida'),
    RecordBook: optionalNumber,
    PageNumber: optionalNumber
});
