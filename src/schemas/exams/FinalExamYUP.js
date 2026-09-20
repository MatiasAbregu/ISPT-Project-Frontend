import * as Yup from 'yup';
import TribunalFinalExamYUP from './TribunalFinalExamYUP';

const optionalNumber = Yup.number()
    .nullable()
    .notRequired()
    .transform((value, originalValue) => {
        return originalValue === '' || originalValue === undefined || Number.isNaN(value) ? null : value;
    });

export default Yup.object().shape({
    Id: Yup.number().optional(),
    createdById: Yup.string().nullable(),
    updatedById: Yup.string().nullable(),
    subjectId: Yup.number().required('El ID de la materia es requerido'),
    Date: Yup.date().required('La fecha es requerida'),
    Time: Yup.string().required('La hora es requerida'),
    RecordBook: Yup.number().nullable().default(0),
    PageNumber: Yup.number().nullable().default(0),
    Tribunal: TribunalFinalExamYUP
})