import * as Yup from 'yup';

export default Yup.object().shape({
    fileId: Yup.number(),
    updatedById: Yup.string().nullable(),
    dni: Yup.boolean().nullable(),
    picture: Yup.boolean().nullable(),
    birthdateDocument: Yup.boolean().nullable()
})