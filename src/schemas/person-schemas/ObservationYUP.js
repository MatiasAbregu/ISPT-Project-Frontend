import * as Yup from 'yup';

export default Yup.object().shape({
    personId: Yup.number(),
    updatedById: Yup.string().nullable(),
    observation: Yup.string().nullable(),
});