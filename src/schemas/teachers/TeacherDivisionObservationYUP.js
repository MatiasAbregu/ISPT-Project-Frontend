import * as Yup from 'yup';

export default Yup.object().shape({
    teacherDivisionId: Yup.number(),
    updatedById: Yup.string().nullable(),
    observation: Yup.string().nullable(),
});