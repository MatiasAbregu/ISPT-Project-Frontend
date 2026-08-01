import * as Yup from 'yup';

export default Yup.object().shape({
    Id: Yup.number().optional(),
    createdById: Yup.string().nullable(),
    updatedById: Yup.string().nullable(),
    Name: Yup.string().required('El nombre es requerido'),
    Title: Yup.string().required('El título es requerido')
})